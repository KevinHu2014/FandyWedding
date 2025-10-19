import baseContent from '@/content/data.json';
import enOverrides from '@/content/en.json';
import zhOverrides from '@/content/zh-Hant.json';
import type { Language, WeddingContent } from '@/types/content';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends JsonValue | undefined
    ? T[K]
    : T[K] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[K]>;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return source !== undefined ? (source as T) : target;
  }

  const output: Record<string, unknown> = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const existing = (target as Record<string, unknown>)[key];
    if (Array.isArray(existing) && Array.isArray(value)) {
      output[key] = value;
      continue;
    }
    if (isPlainObject(existing) && isPlainObject(value)) {
      output[key] = deepMerge(existing, value as DeepPartial<typeof existing>);
      continue;
    }
    output[key] = value;
  }

  return output as T;
}

function cloneContent(content: WeddingContent): WeddingContent {
  return JSON.parse(JSON.stringify(content));
}

export function loadContent(lang: Language): WeddingContent {
  const base = cloneContent(baseContent as WeddingContent);
  const overrides = lang === 'en' ? enOverrides : zhOverrides;
  return deepMerge(base, overrides as DeepPartial<WeddingContent>);
}

export const supportedLanguages: Language[] = ['en', 'zh-Hant'];
