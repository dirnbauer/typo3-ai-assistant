import AjaxRequest from '@typo3/core/ajax/ajax-request.js';
import { AjaxResponse } from '@typo3/core/ajax/ajax-response.js';
import { readEventStream } from './sse-parser.js';

/**
 * The chat API, as the browser reaches it — through the core's AjaxRequest,
 * against the routes the backend published in `TYPO3.settings.ajaxUrls`.
 *
 * A backend AJAX route carries a per-session token, and a hand-built path
 * arrives without it, so a route that is not published fails loudly here
 * instead of as a 404 somewhere downstream.
 */

export const ROUTES = Object.freeze({
  status: 'webcon_ai_assistant_status',
  conversations: 'webcon_ai_assistant_conversations',
  conversationGet: 'webcon_ai_assistant_conversation_get',
  conversationEvents: 'webcon_ai_assistant_conversation_events',
  fileInfo: 'webcon_ai_assistant_file_info',
  conversationCreate: 'webcon_ai_assistant_conversation_create',
  conversationTurn: 'webcon_ai_assistant_conversation_turn',
  conversationApproval: 'webcon_ai_assistant_conversation_approval',
  conversationInput: 'webcon_ai_assistant_conversation_input',
  conversationCancel: 'webcon_ai_assistant_conversation_cancel',
  conversationArchive: 'webcon_ai_assistant_conversation_archive',
  conversationPin: 'webcon_ai_assistant_conversation_pin',
  conversationRename: 'webcon_ai_assistant_conversation_rename',
  conversationDelete: 'webcon_ai_assistant_conversation_delete',
  fileUpload: 'webcon_ai_assistant_file_upload',
});

/** A refusal from the chat API: the message is the server's, already in the user's language. */
export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} status 0 when the backend could not be reached at all
   */
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** @param {unknown} error */
export function isAbort(error) {
  return error instanceof DOMException && error.name === 'AbortError';
}

/**
 * The published AJAX URLs: the local document's first, then the top frame's.
 * The module runs in the content iframe and the toolbar panel in the top
 * document; both are same-origin, but only one is guaranteed to carry them.
 *
 * @returns {Record<string, string>}
 */
function ajaxUrls() {
  const candidates = [window.TYPO3];
  try {
    if (window.top !== null && window.top !== window) {
      candidates.push(window.top.TYPO3);
    }
  } catch {
    // A cross-origin top frame: the local object is all there is.
  }
  for (const typo3 of candidates) {
    const urls = typo3?.settings?.ajaxUrls;
    if (urls !== undefined && Object.keys(urls).length > 0) {
      return urls;
    }
  }

  return {};
}

/** @param {string} name */
function routeUrl(name) {
  const url = ajaxUrls()[name];
  if (typeof url !== 'string' || url === '') {
    throw new ApiError(`The backend route "${name}" is not registered.`, 0);
  }

  return url;
}

/**
 * Turn whatever a request threw into an ApiError, keeping aborts as they are.
 *
 * @param {unknown} error
 * @returns {Promise<never>}
 */
async function rethrow(error) {
  if (isAbort(error) || error instanceof ApiError) {
    throw error;
  }
  if (error instanceof AjaxResponse) {
    const response = error.raw();
    let message = '';
    try {
      const body = await response.json();
      message = typeof body?.error === 'string' ? body.error : '';
    } catch {
      // A body that is not JSON has nothing to add.
    }
    throw new ApiError(message, response.status);
  }
  throw new ApiError(error instanceof Error ? error.message : '', 0);
}

/**
 * @param {string} name
 * @param {Record<string, string|number|undefined>} [query]
 * @param {AbortSignal} [signal]
 */
async function getJson(name, query = {}, signal = undefined) {
  const defined = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== undefined && value !== ''));
  try {
    const response = await new AjaxRequest(routeUrl(name))
      .withQueryArguments(defined)
      .get({ cache: 'no-cache', headers: { Accept: 'application/json' }, ...(signal ? { signal } : {}) });

    return await response.resolve('json');
  } catch (error) {
    return rethrow(error);
  }
}

/**
 * @param {string} name
 * @param {Record<string, unknown>} body
 * @param {AbortSignal} [signal]
 */
async function postJson(name, body, signal = undefined) {
  try {
    const response = await new AjaxRequest(routeUrl(name)).post(body, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      ...(signal ? { signal } : {}),
    });

    return await response.resolve('json');
  } catch (error) {
    return rethrow(error);
  }
}

// ------------------------------------------------------------------- reads

/**
 * Readiness, tools, limits, instructions and the context the backend resolved
 * for the page the user is on.
 *
 * @param {{appName?: string, pageId?: number}} context
 * @param {AbortSignal} [signal]
 */
export const fetchStatus = (context, signal) =>
  getJson(ROUTES.status, { appName: context.appName, pageId: context.pageId }, signal);

/**
 * @param {boolean} includeArchived
 * @param {AbortSignal} [signal]
 */
export const fetchConversations = (includeArchived, signal) =>
  getJson(ROUTES.conversations, includeArchived ? { archived: '1' } : {}, signal);

/**
 * @param {number} conversation
 * @param {AbortSignal} [signal]
 */
export const fetchConversation = (conversation, signal) => getJson(ROUTES.conversationGet, { conversation }, signal);

// ------------------------------------------------------------------ writes

/** @param {{title?: string, appName?: string, pageId?: number}} request */
export const createConversation = (request = {}) =>
  postJson(ROUTES.conversationCreate, {
    title: request.title ?? '',
    systemPrompt: '',
    appName: request.appName ?? '',
    pageId: request.pageId ?? 0,
  });

/** @param {number} conversation */
export const cancelTurn = (conversation) => postJson(ROUTES.conversationCancel, { conversation });

/** @param {number} conversation @param {boolean} archived */
export const archiveConversation = (conversation, archived) =>
  postJson(ROUTES.conversationArchive, { conversation, archived });

/** @param {number} conversation @param {boolean} pinned */
export const pinConversation = (conversation, pinned) => postJson(ROUTES.conversationPin, { conversation, pinned });

/**
 * @param {number} conversation
 * @param {string} title
 * @param {boolean} [autoApproveTools]
 */
export const renameConversation = (conversation, title, autoApproveTools = undefined) =>
  postJson(ROUTES.conversationRename, {
    conversation,
    title,
    ...(autoApproveTools === undefined ? {} : { autoApproveTools }),
  });

/** @param {number} conversation */
export const deleteConversation = (conversation) => postJson(ROUTES.conversationDelete, { conversation });

/**
 * @param {number} conversation
 * @param {File} file
 */
export async function uploadFile(conversation, file) {
  const form = new FormData();
  form.append('conversation', String(conversation));
  form.append('file', file);
  try {
    const response = await new AjaxRequest(routeUrl(ROUTES.fileUpload)).post(form, { headers: { Accept: 'application/json' } });

    return await response.resolve('json');
  } catch (error) {
    return rethrow(error);
  }
}

// -------------------------------------------------------------------- turns

/**
 * Run one turn and report it as it happens.
 *
 * Two transports, one route, negotiated by `Accept`: server-sent events when
 * the response says so, otherwise one JSON document carrying the same event
 * list. The caller is handed events either way.
 *
 * @param {string} route one of ROUTES.conversationTurn, conversationApproval, conversationInput
 * @param {Record<string, unknown>} body
 * @param {(event: {event: string, data: unknown, id?: number}) => void} onEvent
 * @param {AbortSignal} [signal]
 */
export async function runTurn(route, body, onEvent, signal) {
  let response;
  try {
    response = (
      await new AjaxRequest(routeUrl(route)).post(body, {
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        ...(signal ? { signal } : {}),
      })
    ).raw();
  } catch (error) {
    return rethrow(error);
  }

  const contentType = response.headers.get('Content-Type') ?? '';
  if (response.body !== null && contentType.includes('text/event-stream')) {
    await readEventStream(response.body, onEvent, signal);

    return;
  }

  const document = await response.json();
  for (const event of Array.isArray(document?.events) ? document.events : []) {
    onEvent({ event: String(event.event), data: event.data });
  }
}
