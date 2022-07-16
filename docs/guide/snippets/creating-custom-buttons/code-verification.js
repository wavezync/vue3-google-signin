const { OAuth2Client } = require("google-auth-library");

function getOauth2Client() {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  return oAuth2Client;
}

// verification endpoint

app.post('/verify/code', (req, res) => {
  try {
    // code comes in the body
    const { code } = req.body;

    // create a new OAuth2 client
    const client = getOauth2Client();

    // verify code and get tokens from it
    const result = await client.getToken(code);

    // result contains `access_token` and optional `refresh_token`
    // to use these credentials we can save them in the client
    client.setCredentials(result.tokens);

    // you can do whatever with the tokens
    console.log(result.tokens);

    return res.json({ tokens: result.tokens });
  } catch (error) {
    return res.status(401).json({ error: error });
  }
})

