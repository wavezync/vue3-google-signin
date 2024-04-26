import type { Ref } from "vue";

export type MaybeRef<T> = T | Ref<T>;

export interface DecodedGoogleUser {
  email: string;
  email_verified: boolean;
  hd: string;
  family_name: string;
  given_name: string;
  name: string;
  id: string;
  picture: string;
  iat: number;
  exp: number;
}
