import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/database"
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async (event) => {
    const markers  = await db.event.findMany()
    console.log("Markers in get", markers)
    return json(markers)
}

const formatDate = (dateString) => {
    return dateString + ":00Z"
}

export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData();
    console.log("form data", data)
    const latitude = data.get('latitude') as unknown as number
    const longitude = data.get('longitude') as unknown as number
    console.log(data.get("markerEventType"))
    const m = await db.event.create({data: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        markerEventType: data.get('markerEventType') as unknown as string,
        description: data.get('description') as unknown as string,
        timeOfEvent: formatDate(data.get('timeOfEvent')) as unknown as Date,
        linkToVideo: data.get('linkToVideo') as unknown as string
    }})

    return new Response(
        JSON.stringify({
            success: true
        }),
        {headers: {
            'Content-Type': 'application/json'
        }}
    )
}