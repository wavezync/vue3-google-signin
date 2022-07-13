---
title: One Tap Login
---

<script setup lang="ts">
import { shallowRef, onMounted } from "vue"

const automaticLoginDemo = shallowRef(null)
const triggerManualDemo = shallowRef(null)

onMounted(async () => {
  const automaticLoginDemoComponent = await import("./demo/one-tap-login/automatic-login.vue")
  const triggerManualDemoComponent = await import("./demo/one-tap-login/trigger-manual.vue")

  automaticLoginDemo.value = automaticLoginDemoComponent.default
  triggerManualDemo.value = triggerManualDemoComponent.default
})
</script>


# One Tap Login

## Automatically

Google [One Tap](https://developers.google.com/identity/gsi/web/guides/display-google-one-tap) login is another way to quickly onboard users into an application. This displays a little dialog to the side or a popup if the visibility of the dialog is limited.

You can easily use One Tap login using `useOneTap` composable. This will trigger the one tap prompt automatically once the Google API loaded.

<<< @/guide/snippets/one-tap-login/automatic-login.ts

<ClientOnly>
 <component
    v-if="automaticLoginDemo"
    :is="automaticLoginDemo">
  </component>
</ClientOnly>

::: info
If you close down the automatic one tap login displayed before, you might not see it for a while because
Google enforces an [exponential cooldown](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown)
:::

## Manually

You may want to trigger One Tap flow manually. This can be achived by using the returns of `useOneTap`.

::: tip
:bulb: To disable automatic prompt you can set `disableAutomaticPrompt: true` property.
:::

<<< @/guide/snippets/one-tap-login/trigger-manual.vue

<ClientOnly>
 <component
    v-if="triggerManualDemo"
    :is="triggerManualDemo">
  </component>
</ClientOnly>

::: info
If you close down one tap login displayed before, you might not see it for a while because
Google enforces an [exponential cooldown](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown).

Even you click the button it may not trigger due to cooldown.
:::
