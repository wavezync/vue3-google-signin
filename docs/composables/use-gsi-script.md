---
title: useGsiScript
---

# useGsiScript

This composable loads the [Google Client Library](https://developers.google.com/identity/gsi/web/guides/client-library). It make sure to
load the library only once. So multiple calls wont add multiple script tags to the page.

::: info
  This is automatically called when you use any of
  the provided composables such as `useOneTap` or using the `GoogleSignInButton` component.
:::

## Usage

<<< @/composables/snippets/use-gsi-script/use-gsi-script.vue

## Returns

```ts
export type UseGsiScriptReturn = {
  /**
   * Script loaded successfully
   *
   * @type {Readonly<Ref<boolean>>}
   */
  scriptLoaded: Readonly<Ref<boolean>>;

  /**
   * Failed to load the GSI script
   *
   * @type {Readonly<Ref<boolean>>}
   */
  scriptLoadError: Readonly<Ref<boolean>>;
};
```
