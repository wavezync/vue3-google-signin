// Scenarios report what the library handed them; tests read window.__events.
export const log = (event: string, payload?: unknown) => {
  const w = window as unknown as { __events?: unknown[] };
  (w.__events ??= []).push(
    payload === undefined ? { event } : { event, payload },
  );
};
