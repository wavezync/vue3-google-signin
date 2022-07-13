import { useOneTap, type CredentialResponse } from "vue3-google-signin";

useOneTap({
  onSuccess: (response: CredentialResponse) => {
    console.log("Success:", response);
  },
  onError: () => console.error("Error with One Tap Login"),
  // options
});
