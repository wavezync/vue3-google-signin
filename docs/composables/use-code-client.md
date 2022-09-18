---
title: useCodeClient
---

# useCodeClient

Initiate login with [implicit flow](https://developers.google.com/identity/oauth2/web/guides/use-code-model) using code client. Return values of the composable can be used
to trigger the login flow and determine the readiness of the client.
It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.

## Usage

<<< @/guide/snippets/creating-custom-buttons/with-code-client-snippet.vue

## Options

```ts
/**
 * Options for Implicit flow
 *
 * @export
 * @interface ImplicitFlowOptions
 * @extends {(Omit<CodeClientConfig, "client_id" | "scope" | "callback">)}
 */
export interface ImplicitFlowOptions
  extends Omit<CodeClientConfig, "client_id" | "scope" | "callback"> {
  /**
   * On success callback
   *
   * @memberof ImplicitFlowOptions
   */
  onSuccess?: (response: ImplicitFlowSuccessResponse) => void;

  /**
   * On error callback
   *
   * @memberof ImplicitFlowOptions
   */
  onError?: (errorResponse: ImplicitFlowErrorResponse) => void;

  /**
   * Authorization scopes
   *
   * @type {(MaybeRef<string> | MaybeRef<string[]>)}
   * @see https://developers.google.com/identity/protocols/oauth2/scopes
   * @memberof ImplicitFlowOptions
   */
  scope?: MaybeRef<string> | MaybeRef<string[]>;
}
```

## Returns

```ts
export interface UseCodeClientReturn {
  /**
   * Is script is ready to be used?
   *
   * @type {Readonly<Ref<boolean>>}
   * @memberof UseCodeClientReturn
   */
  isReady: Readonly<Ref<boolean>>;

  /**
   * Execute login with code client
   *
   * @memberof UseCodeClientReturn
   */
  login: () => void | undefined;

  /**
   * Get a URL to perform code request without actually redirecting user.
   * This is useful for platforms like _Electron/Tauri_ for redirecting user with system browser
   *
   * @type {Readonly<ComputedRef<string>>}
   * @memberof UseCodeClientReturn
   */
  codeRequestRedirectUrl: Readonly<Ref<string | null>>;
}
```
