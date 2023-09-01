import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/database"
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData();

    const m = await db.collision.create({data: {
        severityType: data.get('severityType') as unknown as string,
        estimatedCost: parseInt(data.get('estimatedCost')) as unknown as number,
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