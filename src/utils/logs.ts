import { PLUGIN_NAME } from "@/constant";

export function toPluginError(err: string) {
  return `[${PLUGIN_NAME}]: ${err}`;
}
