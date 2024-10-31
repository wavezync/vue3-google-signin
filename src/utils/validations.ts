import { toPluginError } from "./logs";

export const isClientIdValid = (isReady: boolean, clientId?: string) => {
  if (!clientId)
    throw new Error(
      toPluginError(
        "Set clientId in options or use setClientId to initialize.",
      ),
    );

  return isReady;
};

export const validateInitializeSetup = (
  isScriptLoad: boolean,
  clientId?: string,
) => isScriptLoad && !!clientId;
