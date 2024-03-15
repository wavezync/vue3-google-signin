import { googleClientIdRef } from "@/states";

export const setGoogleClientId = (id: string) => {
  googleClientIdRef.value = id;
};
