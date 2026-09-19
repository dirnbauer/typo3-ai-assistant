import { describe, expect, it } from 'vitest';
import { ATTACHMENT_KINDS, acceptAttribute, checkFile, kindOf } from '@/lib/attachments';
import { readBoolean, readNumber, readSetting, writeBoolean, writeSetting } from '@/lib/storage';
import { cn, formatBytes, formatDuration, toolDisplayName } from '@/lib/utils';
import { colorSchemeValue, readScheme, resolveTheme } from '@/lib/theme';
import { pendingApprovalOf, pendingInputOf, writeKindOf, writeTargetOf, writeTargetsOf } from '@/state/decode';

function file(name: string, type: string, size: number): File {
  const handle = new File(['x'], name, { type });
  Object.defineProperty(handle, 'size', { value: size });

  return handle;
}

describe('attachments', () => {
  it('recognises a kind by MIME type or by extension', () => {
    expect(kindOf(file('notes.txt', '', 10))?.id).toBe('text');
    expect(kindOf(file('scan', 'application/pdf', 10))?.id).toBe('pdf');
    expect(kindOf(file('image.png', 'image/png', 10))).toBeNull();
  });

  it('refuses a file larger than its own kind allows, naming the limit', () => {
    const pdf = ATTACHMENT_KINDS.find((kind) => kind.id === 'pdf');
    const check = checkFile(file('huge.pdf', 'application/pdf', (pdf?.maxBytes ?? 0) + 1));

    expect(check.ok).toBe(false);
    expect(check.ok === false && check.reason).toContain('20 MB');
  });

  it('refuses a kind the server cannot read at all, by name', () => {
    const check = checkFile(file('clip.mp4', 'video/mp4', 10));

    expect(check.ok === false && check.reason).toContain('clip.mp4');
  });

  it('accepts a file at exactly the limit', () => {
    const text = ATTACHMENT_KINDS.find((kind) => kind.id === 'text');

    expect(checkFile(file('notes.txt', 'text/plain', text?.maxBytes ?? 0)).ok).toBe(true);
  });

  it('offers the picker every extension and MIME type it accepts', () => {
    const accept = acceptAttribute();

    expect(accept).toContain('.xlsx');
    expect(accept).toContain('application/pdf');
  });
});

describe('storage', () => {
  it('namespaces what it writes and reads it back typed', () => {
    writeSetting('rail.width', '380');
    writeBoolean('rail.collapsed', true);

    expect(window.localStorage.getItem('shadcnUi.rail.width')).toBe('380');
    expect(readNumber('rail.width', 320)).toBe(380);
    expect(readBoolean('rail.collapsed', false)).toBe(true);
  });

  it('falls back rather than trusting a value it cannot use', () => {
    writeSetting('rail.width', 'wide, please');

    expect(readNumber('rail.width', 320)).toBe(320);
    expect(readNumber('never.written', 320)).toBe(320);
    expect(readSetting('never.written')).toBeNull();
  });
});

describe('formatting', () => {
  it('merges class names with Tailwind precedence', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-sm', undefined, null)).toBe('text-sm');
  });

  it('states sizes and durations the way a person reads them', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(2048)).toBe('2.0 kB');
    expect(formatBytes(1_572_864)).toBe('1.5 MB');
    expect(formatDuration(340)).toBe('340 ms');
    expect(formatDuration(1500)).toBe('1.5 s');
  });

  it('drops the MCP prefix and leaves the name the integrator recognises', () => {
    expect(toolDisplayName('typo3_GetPageTree')).toBe('GetPageTree');
    expect(toolDisplayName('ask_user')).toBe('ask_user');
  });
});

describe('theme', () => {
  it('reads the backend DOCUMENT\'s attribute, wherever in it the shell sits', () => {
    const element = document.createElement('div');
    const root = document.documentElement;
    root.removeAttribute('data-color-scheme');
    expect(readScheme(element)).toBe('auto');

    root.setAttribute('data-color-scheme', 'dark');
    expect(readScheme(element)).toBe('dark');

    root.setAttribute('data-color-scheme', 'nonsense');
    expect(readScheme(element)).toBe('auto');
    root.removeAttribute('data-color-scheme');
  });

  it('maps a scheme onto the CSS value and onto a resolved theme', () => {
    // `only dark` rather than `dark`, so `light-dark()` inside the shadow root
    // resolves the way the backend document resolved it outside.
    expect(colorSchemeValue('auto')).toBe('light dark');
    expect(colorSchemeValue('dark')).toBe('only dark');
    expect(colorSchemeValue('light')).toBe('only light');
    expect(resolveTheme('dark', window)).toBe('dark');
    // jsdom's matchMedia stub reports no preference, which is "light".
    expect(resolveTheme('auto', window)).toBe('light');
  });
});

describe('decoding what the server sent', () => {
  it('keeps a write target only when it names a real record', () => {
    expect(writeTargetOf({ table: 'pages', uid: 42, kind: 'created' })).toEqual({ table: 'pages', uid: 42, kind: 'created' });
    expect(writeTargetOf({ table: '', uid: 42 })).toBeNull();
    expect(writeTargetOf({ table: 'pages', uid: 0 })).toBeNull();
    expect(writeTargetOf('pages:42')).toBeNull();
    expect(writeKindOf('renamed')).toBe('other');
  });

  it('drops the unusable entries of a list instead of the list', () => {
    expect(writeTargetsOf([{ table: 'pages', uid: 1, kind: 'updated' }, null, { table: '', uid: 2 }])).toEqual([
      { table: 'pages', uid: 1, kind: 'updated' },
    ]);
    expect(writeTargetsOf('nope')).toEqual([]);
  });

  it('refuses an approval that carries no digest, because it could not be answered', () => {
    expect(pendingApprovalOf({ runUuid: 'r1', calls: [] })).toBeNull();
    expect(pendingApprovalOf({ runUuid: 'r1', turnDigest: 'd1', calls: [{ name: 'typo3_WriteTable' }] })?.calls[0]).toEqual({
      index: 0,
      callId: '',
      name: 'typo3_WriteTable',
      arguments: {},
    });
  });

  it('lets a question with no options be answered in free text, whatever the flag says', () => {
    expect(pendingInputOf({ question: 'Which one?', allowFreeText: false })?.allowFreeText).toBe(true);
    expect(pendingInputOf({ question: 'Which one?', options: ['a', 'b'], allowFreeText: false })?.allowFreeText).toBe(false);
    expect(pendingInputOf({ options: ['a'] })).toBeNull();
  });

  it('falls back to the run it belongs to when the frame omits the uuid', () => {
    expect(pendingInputOf({ question: 'Which one?' }, 'r9')?.runUuid).toBe('r9');
  });
});
