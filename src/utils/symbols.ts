import { inject, unref, type InjectionKey } from "vue";
import type { MaybeRef } from "./types";

export const GoogleClientIdKey = Symbol() as InjectionKey<
  MaybeRef<string | undefined>
>;

/** Resolves the client ID to use: the caller's own, else the plugin's. */
export const useClientId = (own?: MaybeRef<string | undefined>) => {
  const fromPlugin = inject(GoogleClientIdKey, undefined);
  return () => unref(own) || unref(fromPlugin);
};
