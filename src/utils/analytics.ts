export function track(event: string, payload?: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    // Placeholder for privacy-friendly analytics integration.
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, payload ?? {});
  }
}
