<script setup lang="ts">
import GoogleSignInButton from "./components/GoogleSignInButton.vue";
import type { CredentialResponse } from "./interfaces/accounts";
import useCodeClient from "./composables/useCodeClient";
import { ref } from "vue";
import useTokenClient from "./composables/useTokenClient";
import useOneTap from "./composables/useOneTap";
import { setGoogleClientId } from "@/methods";

const scope = ref("");

// Dynamic setting GoogleClientId
(async () => {
  await new Promise((r) => setTimeout(r, 3000));
  setGoogleClientId(import.meta.env.VITE_GOOGLE_CLIENT_ID);
})();

const onLoginSuccess = (resp: CredentialResponse) => {
  console.log("Login successful", resp);
};

const onLoginError = () => {
  console.error("Login failed");
};

const { isReady: isCodeClientReady, login: loginCodeClient } = useCodeClient({
  scope,
  onSuccess: (resp) => console.log(resp),
  onError: (resp) => console.error(resp),
  ux_mode: "popup",
});

const { isReady: isTokenClientReady, login: loginTokenClient } = useTokenClient(
  {
    scope,
    onSuccess: (resp) => console.log(resp),
    onError: (resp) => console.error(resp),
    prompt: "consent",
  }
);

useOneTap({
  onSuccess: (resp) => {
    console.log(resp);
  },
  onError: () => console.error("e"),
});
</script>

<template>
  <div class="container center">
    <div class="col">
      <div class="row"><h1>Vue3 Google Oauth</h1></div>
      <div class="row">
        <GoogleSignInButton
          @success="onLoginSuccess"
          @error="onLoginError"
          size="large"
        ></GoogleSignInButton>
      </div>

      <div class="row">
        <input placeholder="Scopes" v-model="scope" />

        <div class="row">
          <button @click="loginCodeClient" :disabled="!isCodeClientReady">
            Login Code Client
          </button>

          <button
            @click="() => loginTokenClient()"
            :disabled="!isTokenClientReady"
          >
            Login Token Client
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* color palette from <https://github.com/vuejs/theme> */
:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-indigo: #2c3e50;

  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

  --vt-c-text-light-1: var(--vt-c-indigo);
  --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* semantic color variables for this project */
:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);

  --section-gap: 160px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--vt-c-black);
    --color-background-soft: var(--vt-c-black-soft);
    --color-background-mute: var(--vt-c-black-mute);

    --color-border: var(--vt-c-divider-dark-2);
    --color-border-hover: var(--vt-c-divider-dark-1);

    --color-heading: var(--vt-c-text-dark-1);
    --color-text: var(--vt-c-text-dark-2);
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.container {
  display: flex;
}

.row {
  flex-direction: row;
}

.col {
  flex-direction: column;
}

.center {
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
}
</style>
