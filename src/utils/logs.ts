import { PLUGIN_NAME } from "./constants";

export const toPluginError = (err: string) => `[${PLUGIN_NAME}]: ${err}`;
