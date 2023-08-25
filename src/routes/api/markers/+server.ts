import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/database"
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async (event) => {
    const markers  = await db.marker.findMany()
    console.log("markers in get", markers)
    return json(markers)
}

export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData();
    const latitude = data.get('latitude') as unknown as number
    const longitude = data.get('longitude') as unknown as number

    console.log(latitude, longitude)
    const m = await db.marker.create({data: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
    }})
    console.log(m)
    return new Response(
        JSON.stringify({
            success: true
        }),
        {headers: {
            'Content-Type': 'application/json'
        }}
    )
}