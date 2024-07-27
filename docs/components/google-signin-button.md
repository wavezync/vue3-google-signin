---
title: GoogleSignInButton
---

# GoogleSignInButton

`GoogleSignInButton` is globally availiable after plugin installation.
Its also possible to directly import it from the `vue3-google-signin` package.

This button renders default Google SignIn Button using Google API.

[[toc]]

## Props

### one-tap

- **Type**: `boolean`
- **Default**: `false`
  
  Trigger One Tap Login flow with the button.


### auto-select

- **Type**: `boolean`
- **Default**: `false`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#auto_select)
  
  This field determines if an ID token is automatically returned without any user interaction
  when there's only one Google session that has approved your app before

### login-uri

- **Type**: `string`
- **Default**: `false`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#login_uri)

  This attribute is the URI of your login endpoint. May be omitted if the current page is your login page, in which case the credential is posted to this page by default.


### cancel-on-tap-outside

- **Type**: `boolean`
- **Default**: `true`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#cancel_on_tap_outside)

  This field sets whether or not to cancel the One Tap request if a user clicks outside the prompt.


### prompt-parent-id

- **Type**: `string`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#prompt_parent_id)

  This attribute sets the DOM ID of the container element.

### nonce

- **Type**: `string`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#nonce)

  This field is a random string used by the ID token to prevent replay attacks.

### context

- **Type**: `string`
- **Default**: `use`
- **Allowed**: `"signin" | "signup" | "use"`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#nonce)

  This field changes the text of the title and messages in the One Tap prompt.

### state-cookie-domain

- **Type**: `string`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#state_cookie_domain)

  If you need to display One Tap in the parent domain and its subdomains, pass the parent domain to this field so that a single shared-state cookie is used.

### ux-mode

- **Type**: `string`
- **Default**: `popup`
- **Allowed**: `"popup" | "redirect"`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#ux_mode)

  Use this field to set the UX flow used by the Sign In With Google button.

### allowed-parent-origin

- **Type**: `string | string[]`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#allowed_parent_origin)

  The origins that are allowed to embed the intermediate iframe. One Tap will run in the intermediate iframe mode if this field presents.

### itp-support

- **Type**: `boolean`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#itp_support)

  This field determines if the upgraded One Tap UX should be enabled on browsers that support Intelligent Tracking Prevention (ITP).

### type

- **Type**: `"standard" | "icon"`
- **Default**: `standard`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#type)

  The button type: icon, or standard button.

### theme

- **Type**: `"outline" | "filled_blue" | "filled_black"`
- **Default**: `outline`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#theme)

  The button theme

### size

- **Type**: `"large" | "medium" | "small"`
- **Default**: `large`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#size)

  The button size

### text

- **Type**: `"signin_with" | "signup_with" | "continue_with" | "signin"`
- **Default**: `signup_with`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#text)

  The button text.

### shape

- **Type**: `"rectangular" | "pill" | "circle" | "square"`
- **Default**: `rectangular`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#shape)

  The button shape.

### logo-alignment

- **Type**: `"left" | "center"`
- **Default**: `left`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment)

  The alignment of the Google logo

### width

- **Type**: `number`
- **Default**: `400`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#width)

  The minimum button width, in pixels.

### locale

- **Type**: `string`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#locale)

  The pre-set locale of the button text. If it's not set, the browser's default locale or the Google session user’s preference is used.
  Therefore, different users might see different versions of localized buttons, and possibly with different sizes.

## Events

### @success

- **Arguments**: `{credential: string; select_by: string; clientId: string}`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse)

On successful login, this will be emitted



### @error

When an error occures this will be emitted

- **Arguments**: `{}`


### @intermediateIframeCloseCallback

Overrides the default intermediate iframe behavior when users manually close One Tap by tapping on the 'X' button in the One Tap UI. The default behavior is to remove the intermediate iframe from the DOM immediately.

- **Arguments**: `{}`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#intermediate_iframe_close_callback)


### @nativeCallback

This event can be used to handle password credentials.

- **Arguments**: `{id: string; password: string;}`

### @promptMomentNotification

This event emitted when the `one-tap` prop is set to `true`. This can be used to handle the prompt of one tap UI.

- **Arguments**: `PromptMomentNotification`
- [Read More](https://developers.google.com/identity/gsi/web/reference/js-reference#PromptMomentNotification)
