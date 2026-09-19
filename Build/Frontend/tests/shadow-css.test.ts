import { describe, expect, it } from 'vitest';
import tailwind from '@/styles/tailwind.css?inline';
import { shadowSafeCss } from '@/styles/shadow-css';

/**
 * The trap this whole file exists for: Tailwind v4 registers its `--tw-*`
 * custom properties with `@property`, which registers into the DOCUMENT. A
 * stylesheet adopted only by a shadow root never registers them, so
 * `var(--tw-border-style)` resolves to nothing and every border, ring, shadow
 * and transform silently disappears.
 *
 * These tests run against the REAL Tailwind output — the vitest config runs
 * the Tailwind plugin — so a Tailwind release that changes the shape of its
 * fallback block fails here instead of in a backend.
 */

describe('shadowSafeCss over real Tailwind output', () => {
  it('leaves Tailwind with the @property fallback it needs and no @supports gate around it', () => {
    expect(tailwind).toContain('@layer properties');
    expect(tailwind).toContain('@supports');

    const safe = shadowSafeCss(tailwind);

    expect(safe).toContain('--tw-border-style');
    expect(safe).not.toContain('@supports (((-webkit-hyphens:none))');
  });

  it('keeps the rest of the stylesheet byte for byte', () => {
    const safe = shadowSafeCss(tailwind);
    const propertiesBlockStart = /@layer\s+properties\s*\{/.exec(tailwind)?.index ?? -1;

    expect(propertiesBlockStart).toBeGreaterThan(-1);
    expect(safe.slice(0, propertiesBlockStart)).toBe(tailwind.slice(0, propertiesBlockStart));
    expect(safe.length).toBeLessThan(tailwind.length);
  });
});

describe('shadowSafeCss on hand-written input', () => {
  it('unwraps the supports block and keeps its declarations', () => {
    const css = '.a{color:red}@layer properties{@supports (x:y){*,::before{--tw-border-style:solid}}}.b{color:blue}';

    expect(shadowSafeCss(css)).toBe('.a{color:red}@layer properties{*,::before{--tw-border-style:solid}}.b{color:blue}');
  });

  it('leaves a stylesheet with no properties layer alone', () => {
    const css = '.a{color:red}@supports (x:y){.b{color:blue}}';

    expect(shadowSafeCss(css)).toBe(css);
  });

  it('is not fooled by the @layer STATEMENT Tailwind writes to fix the layer order', () => {
    const css = '@layer properties, theme, base;.a{color:red}';

    expect(shadowSafeCss(css)).toBe(css);
  });

  it('leaves an @supports that sits outside the properties layer alone', () => {
    const css = '@layer properties{*{--tw-x:1}}@supports (x:y){.b{color:blue}}';

    expect(shadowSafeCss(css)).toBe(css);
  });

  it('survives an unbalanced stylesheet rather than truncating it', () => {
    const css = '@layer properties{@supports (x:y){*{--tw-x:1}';

    expect(shadowSafeCss(css)).toBe(css);
  });
});
