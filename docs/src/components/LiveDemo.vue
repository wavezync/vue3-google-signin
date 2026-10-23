<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  GoogleSignInButton,
  decodeCredential,
  type CredentialResponse,
} from "vue3-google-signin";

// A well-formed but fake ID token shown until the visitor signs in.
const EXAMPLE_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImV4YW1wbGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJzdWIiOiIxMTAyNDg0OTU5MjEyMzg5ODY0MjAiLCJlbWFpbCI6ImFkYUBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQWRhIExvdmVsYWNlIiwiZ2l2ZW5fbmFtZSI6IkFkYSIsImZhbWlseV9uYW1lIjoiTG92ZWxhY2UiLCJpYXQiOjE3NjEyMDAwMDAsImV4cCI6MTc2MTIwMzYwMH0.ZXhhbXBsZS1zaWduYXR1cmUtbm90LWEtcmVhbC1vbmU";

const credential = ref<string | null>(null);
const failed = ref(false);
const dark = ref(false);

// Match Google's button to Starlight's theme, including later toggles.
// Browser-only, so the demo also renders on the server.
let themeObserver: MutationObserver | undefined;
const syncTheme = () => {
  dark.value = document.documentElement.dataset.theme === "dark";
};
onMounted(() => {
  syncTheme();
  themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });
});
onUnmounted(() => themeObserver?.disconnect());

const token = computed(() => credential.value ?? EXAMPLE_TOKEN);
const segments = computed(() => token.value.split("."));
const user = computed(() => decodeCredential(token.value));
const initials = computed(() =>
  user.value.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2),
);

const shorten = (segment: string) =>
  segment.length > 44 ? `${segment.slice(0, 44)}…` : segment;

const onSuccess = (response: CredentialResponse) => {
  failed.value = false;
  credential.value = response.credential;
};
const signOut = () => {
  credential.value = null;
};
</script>

<template>
  <div class="live" :class="{ signed: credential }">
    <div class="stage">
      <template v-if="!credential">
        <GoogleSignInButton
          :theme="dark ? 'filled_black' : 'outline'"
          size="large"
          shape="pill"
          text="signin_with"
          @success="onSuccess"
          @error="failed = true"
        />
        <p class="hint">
          {{
            failed
              ? "Sign-in didn't complete. Try again, or read on with the example token below."
              : "This button is live. Sign in to see the token your app receives."
          }}
        </p>
      </template>
      <template v-else>
        <p class="hint">
          Signed in as <strong>{{ user.email }}</strong
          >.
          <button type="button" class="link" @click="signOut">
            Show the example again
          </button>
        </p>
      </template>
    </div>

    <figure class="token" :key="token" aria-label="ID token">
      <figcaption>
        {{ credential ? "Your ID token" : "Example ID token" }}
        <span class="legend">
          <span class="h">header</span>
          <span class="p">payload</span>
          <span class="s">signature</span>
        </span>
      </figcaption>
      <code class="jwt">
        <span class="h">{{ shorten(segments[0]) }}</span
        >.<span class="p">{{ shorten(segments[1]) }}</span
        >.<span class="s">{{ shorten(segments[2]) }}</span>
      </code>
    </figure>

    <div class="claims" :key="`claims-${token}`">
      <img v-if="user.picture" :src="user.picture" alt="" class="avatar" />
      <span v-else class="avatar" aria-hidden="true">{{ initials }}</span>
      <dl>
        <dt>name</dt>
        <dd>{{ user.name }}</dd>
        <dt>email</dt>
        <dd>
          {{ user.email }}
          <span v-if="user.email_verified" class="verified">verified</span>
        </dd>
        <dt>sub</dt>
        <dd class="mono">{{ user.id }}</dd>
      </dl>
    </div>

    <p class="note">
      Decoded in your browser with <code>decodeCredential()</code>. Nothing is
      sent to a server.
    </p>
  </div>
</template>

<style scoped>
.live {
  --text: var(--sl-color-white);
  --muted: var(--sl-color-gray-3);
  --leaf: var(--sl-color-accent);
  --violet: var(--sl-color-purple);
  --sky: var(--sl-color-blue);
  --well: var(--sl-color-gray-6);
  --paper: var(--sl-color-black);
  --mono: var(--__sl-font-mono);
  display: grid;
  gap: 1.25rem;
}
.stage {
  display: grid;
  justify-items: start;
  gap: 0.75rem;
  min-height: 5.5rem;
  /* Google's button iframe is light; a dark color-scheme paints a box around it */
  color-scheme: light;
}
.signed .stage {
  min-height: 0;
}
.hint {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
}
.hint strong {
  color: var(--text);
  font-weight: 600;
}
.link {
  margin-left: 0.25rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--leaf);
  font: inherit;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}
.token {
  margin: 0;
  padding: 1rem 1.1rem;
  border-radius: 10px;
  background: var(--well);
}
.token figcaption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
  color: var(--muted);
}
.legend {
  display: flex;
  gap: 0.85rem;
}
.legend span::before {
  content: "";
  display: inline-block;
  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.35rem;
  border-radius: 2px;
  background: currentColor;
}
.jwt {
  display: block;
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.6;
  word-break: break-all;
  color: var(--muted);
}
.h {
  color: var(--violet);
}
.p {
  color: var(--leaf);
}
.s {
  color: var(--sky);
}
.claims {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
}
.avatar {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--leaf);
  color: var(--paper);
  font-weight: 700;
  object-fit: cover;
}
dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.3rem 1rem;
  margin: 0;
  font-size: 0.95rem;
}
dt {
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.7;
  color: var(--leaf);
}
dd {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}
.mono {
  font-family: var(--mono);
  font-size: 0.86rem;
}
.verified {
  margin-left: 0.4rem;
  font-size: 0.8rem;
  color: var(--muted);
}
.note {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}
.note code {
  font-family: var(--mono);
  font-size: 0.82rem;
}

/* The page's one orchestrated moment: the token lights up segment by
   segment, then decodes into the user. Replays when a real token arrives,
   since both blocks are keyed by the token. */
@media (prefers-reduced-motion: no-preference) {
  .jwt span {
    animation: lit 0.5s ease-out 0.4s both;
  }
  .jwt .p {
    animation-delay: 0.85s;
  }
  .jwt .s {
    animation-delay: 1.3s;
  }
  .claims {
    animation: rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 1.8s both;
  }
}
@keyframes lit {
  from {
    color: var(--sl-color-gray-5);
  }
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
