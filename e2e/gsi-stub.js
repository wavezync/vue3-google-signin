// Stand-in for https://accounts.google.com/gsi/client, served by the E2E tests.
// Records every call the library makes and lets tests play Google's side.
(() => {
  window.__gsiLoads = (window.__gsiLoads ?? 0) + 1;
  const calls = [];
  const plain = (value) =>
    JSON.parse(
      JSON.stringify(value ?? null, (_key, v) => {
        if (typeof v === "function") return "[function]";
        if (v instanceof Element) return `[${v.tagName.toLowerCase()}]`;
        return v;
      }),
    );
  const record = (name, ...args) => calls.push({ name, args: plain(args) });

  let idConfig;
  let promptListener;
  let tokenConfig;
  let codeConfig;

  window.google = {
    accounts: {
      id: {
        initialize(config) {
          record("id.initialize", config);
          idConfig = config;
        },
        renderButton(parent, options) {
          record("id.renderButton", parent, options);
          const button = document.createElement("div");
          button.dataset.testid = "gsi-button";
          button.textContent = "Sign in with Google";
          parent.replaceChildren(button);
        },
        prompt(listener) {
          record("id.prompt");
          promptListener = listener;
        },
        cancel() {
          record("id.cancel");
        },
        revoke(hint, callback) {
          record("id.revoke", hint);
          callback?.({ successful: true });
        },
      },
      oauth2: {
        initTokenClient(config) {
          record("oauth2.initTokenClient", config);
          tokenConfig = config;
          return {
            requestAccessToken: (overrides) =>
              record("oauth2.requestAccessToken", overrides),
          };
        },
        initCodeClient(config) {
          record("oauth2.initCodeClient", config);
          codeConfig = config;
          return { requestCode: () => record("oauth2.requestCode") };
        },
        hasGrantedAllScopes(response, ...scopes) {
          const granted = response.scope.split(" ");
          return scopes.every((scope) => granted.includes(scope));
        },
        hasGrantedAnyScope(response, ...scopes) {
          const granted = response.scope.split(" ");
          return scopes.some((scope) => granted.includes(scope));
        },
        revoke(token, done) {
          record("oauth2.revoke", token);
          done?.();
        },
      },
    },
  };

  window.__gsi = {
    calls,
    credential: (response) => idConfig.callback(response),
    promptMoment: (notification) => promptListener?.(notification),
    tokenResponse: (response) => tokenConfig.callback(response),
    codeResponse: (response) => codeConfig.callback(response),
  };
})();
