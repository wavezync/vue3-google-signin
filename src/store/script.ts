import { reactive } from "vue";

export const state = reactive({
  loaded: false,
  error: false,
  isLoading: false,
  subscriberCount: 0,
});
