// Line icons for the home page: 24×24, drawn with currentColor strokes
// (see LineIcon.astro). Kept in one place so they share a style.
export const icons = {
  // Flows
  button:
    '<rect x="2.5" y="6" width="15" height="8.5" rx="4.25"/><path d="M14.5 12.5l6.5 2.6-2.8 1.1-1.1 2.8z"/>',
  oneTap:
    '<rect x="2.5" y="3.5" width="19" height="17" rx="2.5"/><rect x="11.5" y="6.5" width="7" height="5" rx="1.25"/>',
  key: '<circle cx="7.5" cy="15.5" r="4"/><path d="M10.4 12.6L20 3M16.5 6.5l2.5 2.5M18.5 4.5l1.5 1.5"/>',
  server:
    '<rect x="3" y="3.5" width="18" height="7" rx="2"/><rect x="3" y="13.5" width="18" height="7" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
  // Features
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  braces:
    '<path d="M8 4C6 4 5.5 5 5.5 6.5v3C5.5 11 4.5 12 3 12c1.5 0 2.5 1 2.5 2.5v3C5.5 19 6 20 8 20M16 4c2 0 2.5 1 2.5 2.5v3c0 1.5 1 2.5 2.5 2.5-1.5 0-2.5 1-2.5 2.5v3c0 1.5-.5 2.5-2.5 2.5"/>',
  cloudDown:
    '<path d="M7 17.5A4.5 4.5 0 1 1 8 8.6a6 6 0 0 1 11.3 2.2A3.5 3.5 0 0 1 18 17.5"/><path d="M12 11.5v9M9 17.5l3 3 3-3"/>',
  popupClosed:
    '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M10 12.5l4 4M14 12.5l-4 4"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
  // How sign-in works
  vue: '<path d="M2.5 4h4L12 13.5 17.5 4h4L12 20.5z"/><path d="M7.5 4L12 11.5 16.5 4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/>',
  token:
    '<rect x="2" y="8" width="5.5" height="8" rx="1.5" class="seg-h"/><rect x="9.25" y="8" width="5.5" height="8" rx="1.5" class="seg-p"/><rect x="16.5" y="8" width="5.5" height="8" rx="1.5" class="seg-s"/>',
  shield:
    '<path d="M12 3l7.5 3v5.5c0 4.7-3.2 8-7.5 9.5-4.3-1.5-7.5-4.8-7.5-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
} as const;

export type IconName = keyof typeof icons;
