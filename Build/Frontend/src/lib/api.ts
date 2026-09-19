import { readEventStream } from '@/lib/sse';
import { ajaxUrls } from '@/lib/typo3';
import type {
  AttachmentInfo,
  ChatStatus,
  ConversationSummary,
  MessageRow,
  SequencedEvent,
  TurnContext,
  TurnJsonResponse,
} from '@/state/types';

/**
 * The chat API, as the browser reaches it.
 *
 * Every URL comes from `TYPO3.settings.ajaxUrls`: a backend AJAX route carries a
 * per-session token and a hand-built path arrives without it. A missing key
 * fails loudly here instead of as a 404 somewhere downstream.
 */

export const ROUTES = {
  status: 'shadcn_ui_chat_status',
  conversations: 'shadcn_ui_chat_conversations',
  conversationGet: 'shadcn_ui_chat_conversation_get',
  conversationEvents: 'shadcn_ui_chat_conversation_events',
  fileInfo: 'shadcn_ui_chat_file_info',
  conversationCreate: 'shadcn_ui_chat_conversation_create',
  conversationTurn: 'shadcn_ui_chat_conversation_turn',
  conversationApproval: 'shadcn_ui_chat_conversation_approval',
  conversationInput: 'shadcn_ui_chat_conversation_input',
  conversationCancel: 'shadcn_ui_chat_conversation_cancel',
  conversationArchive: 'shadcn_ui_chat_conversation_archive',
  conversationPin: 'shadcn_ui_chat_conversation_pin',
  conversationRename: 'shadcn_ui_chat_conversation_rename',
  conversationDelete: 'shadcn_ui_chat_conversation_delete',
  fileUpload: 'shadcn_ui_chat_file_upload',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];

/** The three routes that answer with the turn's event list. */
export type StreamRoute =
  | typeof ROUTES.conversationTurn
  | typeof ROUTES.conversationApproval
  | typeof ROUTES.conversationInput;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  /** What the status code MEANS, as one sentence the user can act on. */
  get hint(): string {
    switch (this.status) {
      case 0:
        return 'The backend could not be reached. Check your connection and try again.';
      case 400:
        return 'The message could not be sent as written.';
      case 403:
        return 'Your account is not allowed to use the AI chat.';
      case 404:
        return 'This conversation no longer exists.';
      case 409:
        return 'This conversation is busy, or the decision no longer applies to the run it was made for.';
      case 413:
        return 'The file is too large.';
      case 422:
        return 'That file cannot be read as text.';
      case 429:
        return 'You have reached a limit. Wait a moment, or finish a running conversation first.';
      default:
        return this.status >= 500 ? 'The backend failed while handling the request.' : '';
    }
  }
}

/** One sentence from whatever went wrong: the server's message plus what the code means. */
export function describeError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.hint === '' ? error.message : `${error.message} ${error.hint}`;
  }
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}

export function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

export function routeUrl(name: RouteName): string {
  const url = ajaxUrls()[name];
  if (typeof url !== 'string' || url === '') {
    throw new ApiError(`The backend route "${name}" is not registered.`, 0);
  }

  return url;
}

type Query = Record<string, string | number | undefined>;

function withQuery(url: string, query: Query): string {
  const entries = Object.entries(query).filter(([, value]) => value !== undefined && value !== '');
  if (entries.length === 0) {
    return url;
  }
  const separator = url.includes('?') ? '&' : '?';

  return url + separator + entries.map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`).join('&');
}

async function failure(response: Response): Promise<ApiError> {
  let message = `Request failed with status ${response.status}.`;
  try {
    const body = (await response.json()) as { error?: unknown };
    if (typeof body.error === 'string' && body.error !== '') {
      message = body.error;
    }
  } catch {
    // A non-JSON error body has nothing to add.
  }

  return new ApiError(message, response.status);
}

async function getJson<T>(name: RouteName, query: Query = {}, signal?: AbortSignal): Promise<T> {
  const response = await fetch(withQuery(routeUrl(name), query), {
    method: 'GET',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
    ...(signal ? { signal } : {}),
  });
  if (!response.ok) {
    throw await failure(response);
  }

  return (await response.json()) as T;
}

async function postJson<T>(name: RouteName, body: unknown, signal?: AbortSignal): Promise<T> {
  const response = await fetch(routeUrl(name), {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
    ...(signal ? { signal } : {}),
  });
  if (!response.ok) {
    throw await failure(response);
  }

  return (await response.json()) as T;
}

// ------------------------------------------------------------------- reads

/**
 * The installation's readiness, tools, limits, instructions and context. The
 * page and app are sent along so `context` can be answered for this shell.
 */
export async function fetchStatus(context: TurnContext, signal?: AbortSignal): Promise<ChatStatus> {
  const raw = await getJson<Partial<ChatStatus>>(
    ROUTES.status,
    { pageId: context.pageId, appName: context.appName },
    signal,
  );

  // One boundary: the rest of the client may rely on every field existing.
  return {
    available: raw.available === true,
    issues: raw.issues ?? [],
    configuration: raw.configuration ?? null,
    tools: raw.tools ?? [],
    budget: raw.budget ?? { allowed: true, reason: null },
    limits: raw.limits ?? {
      maxMessageLength: 0,
      maxIterations: 0,
      turnsPerHour: 0,
      turnsRemaining: -1,
      activeConversations: 0,
    },
    suggestions: raw.suggestions ?? [],
    features: raw.features ?? { sse: true, approvals: true, input: true, attachments: true, writes: false },
    instructions: raw.instructions ?? [],
    context: raw.context ?? { pageId: 0, pageTitle: '', workspace: '', appName: '' },
  };
}

export const fetchConversations = (
  includeArchived: boolean,
  signal?: AbortSignal,
): Promise<{ conversations: ConversationSummary[] }> =>
  getJson(ROUTES.conversations, includeArchived ? { archived: '1' } : {}, signal);

export const fetchConversation = (
  conversation: number,
  after = 0,
  signal?: AbortSignal,
): Promise<{ conversation: ConversationSummary; messages: MessageRow[] }> =>
  getJson(ROUTES.conversationGet, { conversation, after: after || undefined }, signal);

export interface RunTraceEvent {
  sequence: number;
  kind: string;
  round: number;
  durationMs: number;
  payload: Record<string, unknown>;
  createdAt: number;
}

export const fetchRunEvents = (
  conversation: number,
  runUuid: string,
  after = -1,
  signal?: AbortSignal,
): Promise<{ runUuid: string; events: RunTraceEvent[] }> =>
  getJson(ROUTES.conversationEvents, { conversation, runUuid, after }, signal);

export const fetchFileInfo = (fileUid: number, signal?: AbortSignal): Promise<AttachmentInfo> =>
  getJson(ROUTES.fileInfo, { fileUid }, signal);

// ------------------------------------------------------------------ writes

export interface CreateConversationRequest {
  title?: string;
  systemPrompt?: string;
  appName?: string;
  pageId?: number;
}

export const createConversation = (
  request: CreateConversationRequest = {},
): Promise<{ conversation: ConversationSummary }> =>
  postJson(ROUTES.conversationCreate, {
    title: request.title ?? '',
    systemPrompt: request.systemPrompt ?? '',
    ...(request.appName === undefined ? {} : { appName: request.appName }),
    ...(request.pageId === undefined ? {} : { pageId: request.pageId }),
  });

export const cancelTurn = (conversation: number): Promise<{ cancelled: boolean }> =>
  postJson(ROUTES.conversationCancel, { conversation });

export const archiveConversation = (conversation: number, archived: boolean): Promise<{ archived: boolean }> =>
  postJson(ROUTES.conversationArchive, { conversation, archived });

export const pinConversation = (conversation: number, pinned: boolean): Promise<{ pinned: boolean }> =>
  postJson(ROUTES.conversationPin, { conversation, pinned });

export const renameConversation = (
  conversation: number,
  title: string,
  autoApproveTools?: boolean,
): Promise<{ title: string }> =>
  postJson(ROUTES.conversationRename, {
    conversation,
    title,
    ...(autoApproveTools === undefined ? {} : { autoApproveTools }),
  });

export const deleteConversation = (conversation: number): Promise<{ deleted: boolean }> =>
  postJson(ROUTES.conversationDelete, { conversation });

export async function uploadFile(conversation: number, file: File): Promise<AttachmentInfo> {
  const form = new FormData();
  form.append('conversation', String(conversation));
  form.append('file', file);

  const response = await fetch(routeUrl(ROUTES.fileUpload), {
    method: 'POST',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
    body: form,
  });
  if (!response.ok) {
    throw await failure(response);
  }

  return (await response.json()) as AttachmentInfo;
}

// -------------------------------------------------------------------- turns

export interface TurnRequest {
  conversation: number;
  content: string;
  attachments: { fileUid: number }[];
  context: TurnContext;
}

export interface ApprovalRequest {
  conversation: number;
  approved: boolean;
  /** Echoed back exactly as it arrived. See `PendingApproval.turnDigest`. */
  turnDigest: string;
}

export interface InputRequest {
  conversation: number;
  runUuid: string;
  /** Echoed back exactly as it arrived. See `PendingInput.turnDigest`. */
  turnDigest: string;
  answer: string;
}

/**
 * Run one turn and report it as it happens.
 *
 * Two transports, one route, negotiated by `Accept`: server-sent events when
 * the response says so, otherwise one JSON document carrying the same event
 * list. The caller is handed events either way.
 */
export async function runTurn(
  route: StreamRoute,
  body: TurnRequest | ApprovalRequest | InputRequest,
  onEvent: (event: SequencedEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  const response = await fetch(routeUrl(route), {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify(body),
    ...(signal ? { signal } : {}),
  });

  if (!response.ok) {
    throw await failure(response);
  }

  const contentType = response.headers.get('Content-Type') ?? '';
  if (response.body !== null && contentType.includes('text/event-stream')) {
    await readEventStream(response.body, onEvent, signal);

    return;
  }

  const document = (await response.json()) as TurnJsonResponse;
  for (const event of document.events ?? []) {
    onEvent({ event: event.event, data: event.data });
  }
}
