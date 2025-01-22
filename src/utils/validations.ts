import { toPluginError } from "./logs";

export function isClientIdValid(isReady: boolean, clientId?: string) {
  if (!clientId)
    throw new Error(
      toPluginError(
        "Set clientId in options or use setClientId to initialize.",
      ),
    );

  return isReady;
}

export function validateInitializeSetup(
  isScriptLoad: boolean,
  clientId?: string,
) {
  return isScriptLoad && !!clientId;
}
