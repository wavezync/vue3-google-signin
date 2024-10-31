import { toPluginError } from "./logs";

export const validateLoginSetup = (isReady: boolean, clientId?: string) => {
  if (!isReady) {
    if (!clientId) {
      throw new Error(
        toPluginError(
          "Set clientId in options or use setClientId to initialize.",
        ),
      );
    }

    return false;
  }

  return true;
};

export const validateInitializeSetup = (
  isScriptLoad: boolean,
  clientId?: string,
) => isScriptLoad && !!clientId;
