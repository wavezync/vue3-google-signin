import type { InjectionKey, Ref } from "vue";

export const GoogleClientIdKey = Symbol() as InjectionKey<Ref<string>>;
