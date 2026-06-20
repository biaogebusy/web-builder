export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

export interface JsonObject {
  [key: string]: JsonValue | undefined;
}

export type CssClassValue = string | string[] | Record<string, boolean>;

export type CssStyleValue = Record<string, string | number | null | undefined>;
