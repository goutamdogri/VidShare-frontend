function getGoogleOauthUrl() {
	const rootUrl = "https://accounts.google.com/o/oauth2/auth"

	const options = {
		redirect_uri: import.meta.env.VITE_VERCEL_ENV_GOOGLE_REDIRECT_URI,
		client_id: import.meta.env.VITE_VERCEL_ENV_GOOGLE_CLIENT_ID,
		access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
	}

	const qs = new URLSearchParams(options)
	return `${rootUrl}?${qs.toString()}`
}

export default getGoogleOauthUrl
