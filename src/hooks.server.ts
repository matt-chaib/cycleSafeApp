import { SvelteKitAuth } from "@auth/sveltekit"
import Github from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private"

export const handle = SvelteKitAuth({
  providers: [Github({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }), Google({clientId: GOOGLE_ID,clientSecret: GOOGLE_SECRET})],
})
