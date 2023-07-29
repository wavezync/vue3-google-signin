---
title: useTokenClient
---

# useTokenClient

Initiate login with [implicit grant flow](https://developers.google.com/identity/oauth2/web/guides/use-token-model) using token client. Return values of the composable can be used
to trigger the login flow and determine the readiness of the client.
It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.

## Usage

<<< @/guide/snippets/creating-custom-buttons/with-token-client-snippet.vue

## Options

```ts
/**
 * Auth Code Flow Options
 *
 * @export
 * @interface AuthCodeFlowOptions
 * @extends {(Omit<TokenClientConfig, "client_id" | "scope" | "callback">)}
 */
export interface AuthCodeFlowOptions
  extends Omit<TokenClientConfig, "client_id" | "scope" | "callback"> {
  /**
   * On success callback
   *
   * @memberof AuthCodeFlowOptions
   */
  onSuccess?: (response: AuthCodeFlowSuccessResponse) => void;

  /**
   * On error callback
   *
   * @memberof AuthCodeFlowOptions
   */
  onError?: (errorResponse: AuthCodeFlowErrorResponse) => void;

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
export interface UseTokenClientReturn {
  /**
   * Is script ready to be used?
   *
   * @type {Readonly<Ref<boolean>>}
   * @memberof UseTokenClientReturn
   */
  isReady: Readonly<Ref<boolean>>;

  /**
   * Invoke login flow. You can provide a `OverridableTokenClientConfig` to override the login flow options.
   *
   * @memberof UseTokenClientReturn
   */
  login: (overrideConfig?: OverridableTokenClientConfig) => void | undefined;
}
```
