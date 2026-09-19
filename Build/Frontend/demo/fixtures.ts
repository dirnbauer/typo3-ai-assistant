/** Realistic TYPO3 content for the examples; nothing here is fetched. */

export const PAGES = [
  { uid: 1, title: 'Home', slug: '/', doktype: 'Standard', hidden: false, updated: 'Today, 09:12' },
  { uid: 12, title: 'About us', slug: '/about', doktype: 'Standard', hidden: false, updated: 'Yesterday' },
  { uid: 14, title: 'Team', slug: '/about/team', doktype: 'Standard', hidden: true, updated: '3 days ago' },
  { uid: 27, title: 'News', slug: '/news', doktype: 'Standard', hidden: false, updated: '1 week ago' },
  { uid: 40, title: 'Imprint', slug: '/imprint', doktype: 'Standard', hidden: false, updated: '2 months ago' },
  { uid: 41, title: 'Downloads', slug: '/downloads', doktype: 'Folder', hidden: false, updated: '4 months ago' },
];

export const EDITORS = [
  { name: 'Anna Berger', initials: 'AB', role: 'Editor', online: true },
  { name: 'Jonas Weber', initials: 'JW', role: 'Admin', online: false },
  { name: 'Mira Holzer', initials: 'MH', role: 'Reviewer', online: true },
];

export const LANGUAGES = [
  { value: '0', label: 'English (default)' },
  { value: '1', label: 'Deutsch' },
  { value: '2', label: 'Français' },
];

export const REDIRECT_STATUSES = [
  { value: '301', label: '301 · Moved permanently' },
  { value: '302', label: '302 · Found' },
  { value: '307', label: '307 · Temporary redirect' },
];

export const RECENT_RECORDS = [
  { table: 'pages', uid: 12, title: 'About us', action: 'Edited', when: '09:12' },
  { table: 'tt_content', uid: 388, title: 'Hero: Autumn campaign', action: 'Created', when: '08:51' },
  { table: 'sys_redirect', uid: 19, title: '/old-team → /about/team', action: 'Created', when: 'Yesterday' },
];

export const TRANSCRIPT = [
  { role: 'user', text: 'Which pages still link to /old-team?' },
  {
    role: 'assistant',
    text: 'Two pages link to **/old-team**: *About us* (12) in the intro text and *News* (27) in a teaser. Both links can point to `/about/team` instead. Want me to update them?',
  },
  { role: 'user', text: 'Yes, both.' },
] as const;
