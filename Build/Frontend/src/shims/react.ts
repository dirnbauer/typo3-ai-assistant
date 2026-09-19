/**
 * `@webconsulting/shadcn-ui/react.js` — the one React, re-exported.
 *
 * An app built against the runtime leaves `react` external and maps it here
 * (see CONTRACT.md), so its hooks come from the same copy the shell renders
 * with. Two copies of React on one page is the failure this file prevents.
 */
export * from 'react';
export { default } from 'react';
