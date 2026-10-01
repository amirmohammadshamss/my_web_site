import en from './en.json';

/*
 * Every piece of interface text lives in a locale file. The person's own
 * content - summary, experience, education, portfolio items - stays in
 * data/resume.json, since that is data rather than chrome. Adding a second
 * language therefore means a second file here AND a translated copy of the
 * resume data; see the README.
 */

export type Messages = typeof en;

export const messages: Messages = en;

/** Shorthand, so components read `t.nav.home`. */
export const t = messages;

export const locale = messages.locale;

/**
 * Fills `{placeholders}` in a message.
 *
 *   format(t.a11y.portrait, { name: 'Ada' }) -> 'Portrait of Ada'
 *
 * An unknown placeholder is left alone rather than printed as "undefined", so
 * a missing value shows up in review instead of shipping silently.
 */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
