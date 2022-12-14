/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Types
import type { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

// deno-lint-ignore no-explicit-any
export type TRet = any;
export type TObject = { [k: string]: TRet };

// Types
export type TResponse = {
  status: number,
  message?: string,
  data: TObject 
};

// Schemas
export interface CategorySchema {
  _id?: ObjectId,
  name: string,
  slug: string,
  description: string,
  updated: number
}

export interface PostSchema {
  _id?: ObjectId,
  website: string,
  slug: string,
  domains: string[],
  summary: string,
  title?: string,
  content?: string,
  views?: number,
  category: string
}

export interface SettingsSchema {
  _id?: ObjectId,
  motd: string
}

// External Types
export type { RequestEvent } from "https://deno.land/x/nhttp@1.1.9/mod.ts";
export type { Collection } from "https://deno.land/x/mongo@v0.31.1/mod.ts";