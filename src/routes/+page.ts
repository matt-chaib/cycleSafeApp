import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('/api/markers')
    const markers = await response.json()
    console.log("loaded markers", markers)
    return { markers }
}