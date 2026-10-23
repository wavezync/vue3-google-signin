<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  GoogleSignInButton,
  decodeCredential,
  type CredentialSuccessResponse,
} from "vue3-google-signin";

// Google's defaults, so the generated code only lists what changed
const DEFAULTS = {
  type: "standard",
  theme: "outline",
  size: "large",
  text: "signin_with",
  shape: "rectangular",
  logoAlignment: "left",
} as const;

const CHOICES = {
  theme: ["outline", "filled_blue", "filled_black"],
  size: ["large", "medium", "small"],
  shape: ["rectangular", "pill", "circle", "square"],
  text: ["signin_with", "signup_with", "continue_with", "signin"],
  type: ["standard", "icon"],
  logoAlignment: ["left", "center"],
} as const;
type Choice = keyof typeof CHOICES;

const LABELS: Record<Choice, string> = {
  theme: "Theme",
  size: "Size",
  shape: "Shape",
  text: "Text",
  type: "Type",
  logoAlignment: "Logo",
};

const LOCALES = ["", "en", "de", "es", "fr", "ja", "pt-BR", "si", "zh-CN"];

const state = reactive<Record<Choice, string>>({ ...DEFAULTS });
// The slider's lowest notch means no width, so Google sizes the button
const AUTO_WIDTH = 180;
const width = ref(AUTO_WIDTH);
const locale = ref("");
const darkPage = ref(false);
const signedIn = ref("");

const kebab = (key: string) =>
  key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const code = computed(() => {
  const attrs = (Object.keys(DEFAULTS) as Choice[])
    .filter((key) => state[key] !== DEFAULTS[key])
    .map((key) => `${kebab(key)}="${state[key]}"`);
  if (width.value > AUTO_WIDTH) attrs.push(`:width="${width.value}"`);
  if (locale.value) attrs.push(`locale="${locale.value}"`);
  attrs.push('@success="onSuccess"');
  return attrs.length > 1
    ? `<GoogleSignInButton\n  ${attrs.join("\n  ")}\n/>`
    : `<GoogleSignInButton ${attrs[0]} />`;
});

const copied = ref(false);
const copy = async () => {
  await navigator.clipboard.writeText(code.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1600);
};

const onSuccess = ({ credential }: CredentialSuccessResponse) => {
  signedIn.value = decodeCredential(credential).email;
};
</script>

<template>
  <div class="playground not-content">
    <div class="stage" :class="{ dark: darkPage }">
      <GoogleSignInButton
        :type="state.type as 'standard' | 'icon'"
        :theme="state.theme as 'outline' | 'filled_blue' | 'filled_black'"
        :size="state.size as 'large' | 'medium' | 'small'"
        :text="state.text as 'signin_with'"
        :shape="state.shape as 'rectangular'"
        :logo-alignment="state.logoAlignment as 'left' | 'center'"
        :width="width > AUTO_WIDTH ? width : undefined"
        :locale="locale || undefined"
        @success="onSuccess"
      />
      <p class="status" aria-live="polite">
        {{
          signedIn
            ? `Signed in as ${signedIn}`
            : "This is Google's real button. Change it below."
        }}
      </p>
      <div class="page-toggle" role="group" aria-label="Preview page">
        <button
          type="button"
          :aria-pressed="!darkPage"
          @click="darkPage = false"
        >
          Light page
        </button>
        <button type="button" :aria-pressed="darkPage" @click="darkPage = true">
          Dark page
        </button>
      </div>
    </div>

    <div class="controls">
      <fieldset v-for="(values, key) in CHOICES" :key="key">
        <legend>{{ LABELS[key] }}</legend>
        <div class="options">
          <button
            v-for="value in values"
            :key="value"
            type="button"
            :aria-pressed="state[key] === value"
            @click="state[key] = value"
          >
            {{ value }}
          </button>
        </div>
      </fieldset>
      <label class="field">
        <span>Width {{ width > AUTO_WIDTH ? `${width}px` : "(auto)" }}</span>
        <input
          v-model.number="width"
          type="range"
          :min="AUTO_WIDTH"
          max="400"
          step="20"
        />
      </label>
      <label class="field">
        <span>Language</span>
        <select v-model="locale">
          <option v-for="code in LOCALES" :key="code" :value="code">
            {{ code || "Browser default" }}
          </option>
        </select>
      </label>
    </div>

    <div class="code">
      <pre><code>{{ code }}</code></pre>
      <button type="button" class="copy" @click="copy">
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.playground {
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--sl-color-gray-6) 40%, transparent);
  overflow: hidden;
}

.stage {
  position: relative;
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 1rem;
  min-height: 15rem;
  padding: 3rem 1.5rem 3.5rem;
  border-bottom: 1px solid var(--sl-color-gray-5);
  background-color: #f8f9fa;
  background-image: radial-gradient(circle, #d5d8dc 1px, transparent 1.4px);
  background-size: 18px 18px;
  /* Google's button iframe is light; a dark color-scheme paints a box around it */
  color-scheme: light;
  transition: background-color 0.25s;
}
.stage.dark {
  background-color: #131314;
  background-image: radial-gradient(circle, #34363b 1px, transparent 1.4px);
}
.status {
  margin: 0;
  font-size: 0.85rem;
  color: #5f6368;
}
.dark .status {
  color: #9aa0a6;
}
.page-toggle {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  padding: 0.2rem;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.06);
}
.dark .page-toggle {
  background: rgb(255 255 255 / 0.08);
}
.page-toggle button {
  padding: 0.25rem 0.7rem;
  border: 0;
  border-radius: 999px;
  background: none;
  font: inherit;
  font-size: 0.75rem;
  color: #5f6368;
  cursor: pointer;
}
.dark .page-toggle button {
  color: #9aa0a6;
}
.page-toggle button[aria-pressed="true"] {
  background: #fff;
  color: #1f1f1f;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.15);
}
.dark .page-toggle button[aria-pressed="true"] {
  background: #3c4043;
  color: #e8eaed;
}

.controls {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem 1.5rem;
  padding: 1.25rem 1.5rem 1.5rem;
}
fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
legend,
.field > span {
  margin-bottom: 0.45rem;
  padding: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--sl-color-gray-2);
}
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.2rem;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 0.7rem;
  background: var(--sl-color-black);
}
.options button {
  flex: 1 1 auto;
  padding: 0.35rem 0.55rem;
  border: 0;
  border-radius: 0.5rem;
  background: none;
  font-family: var(--__sl-font-mono);
  font-size: 0.75rem;
  color: var(--sl-color-gray-3);
  cursor: pointer;
}
.options button:hover {
  color: var(--sl-color-white);
}
.options button[aria-pressed="true"] {
  background: var(--sl-color-gray-5);
  color: var(--sl-color-white);
}
button:focus-visible,
select:focus-visible,
input:focus-visible {
  outline: 2px solid var(--sl-color-accent);
  outline-offset: 2px;
}
.field {
  display: flex;
  flex-direction: column;
}
.field input[type="range"] {
  width: 100%;
  accent-color: var(--sl-color-accent);
}
.field select {
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 0.6rem;
  background: var(--sl-color-black);
  color: var(--sl-color-white);
  font: inherit;
  font-size: 0.85rem;
}

.code {
  position: relative;
  border-top: 1px solid var(--sl-color-gray-5);
  background: var(--sl-color-black);
}
.code pre {
  margin: 0;
  padding: 1rem 1.5rem;
  overflow-x: auto;
  font-family: var(--__sl-font-mono);
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--sl-color-gray-2);
}
.copy {
  position: absolute;
  top: 0.65rem;
  right: 0.75rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 999px;
  background: var(--sl-color-gray-6);
  font: inherit;
  font-size: 0.75rem;
  color: var(--sl-color-gray-2);
  cursor: pointer;
}
.copy:hover {
  color: var(--sl-color-white);
}

@media (max-width: 40rem) {
  .controls {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
