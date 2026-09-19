/**
 * The one thing Tailwind v4 cannot do inside a Shadow DOM, undone.
 *
 * Tailwind registers its `--tw-*` custom properties with `@property`, which
 * registers into the DOCUMENT. A stylesheet adopted only by a shadow root never
 * registers them, `var(--tw-border-style)` has no value, and `border-width`
 * with no style computes to 0px: borders, rings, shadows, transforms and
 * gradients all silently vanish.
 *
 * Tailwind already ships the cure: a `@layer properties` block that assigns
 * every property its initial value on `*, ::before, ::after`, gated behind an
 * `@supports` only old browsers satisfy. A shadow root is the case nobody wrote
 * a query for, so the gate is removed and the fallback applies always.
 */

export function shadowSafeCss(css: string): string {
  const block = propertiesBlock(css);
  if (block === null) {
    return css;
  }

  const supports = css.indexOf('@supports', block.open);
  if (supports === -1 || supports > block.close) {
    return css;
  }

  const open = css.indexOf('{', supports);
  if (open === -1 || open > block.close) {
    return css;
  }

  const close = matchingBrace(css, open);
  if (close === -1) {
    return css;
  }

  return css.slice(0, supports) + css.slice(open + 1, close) + css.slice(close + 1);
}

/**
 * The `@layer properties { … }` BLOCK, not the `@layer properties, theme, …;`
 * statement Tailwind writes first to fix the layer order.
 */
function propertiesBlock(css: string): { open: number; close: number } | null {
  const match = /@layer\s+properties\s*\{/g.exec(css);
  if (match === null) {
    return null;
  }

  const open = match.index + match[0].length - 1;
  const close = matchingBrace(css, open);

  return close === -1 ? null : { open, close };
}

function matchingBrace(css: string, open: number): number {
  let depth = 0;
  for (let index = open; index < css.length; index += 1) {
    const character = css[index];
    if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}
