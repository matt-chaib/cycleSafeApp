import type { RequestHandler } from "@sveltejs/kit";
import db from "$lib/database"
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async (event) => {
    const markers  = await db.event.findMany()
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
    

    const eventType = data.get('markerEventType') as unknown as string
    
    switch (eventType) {
        case 'Collision':
            await db.event.create({data: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                markerEventType: eventType,
                description: data.get('description') as unknown as string,
                timeOfEvent: formatDate(data.get('timeOfEvent')) as unknown as Date,
                linkToVideo: data.get('linkToVideo') as unknown as string,
                Collision: {
                    create: {
                        severity: { connect:   { severityTypeDetail: data.get('severityType') }} ,
                        estimatedCost: parseInt(data.get('estimatedCost')) as unknown as number,
                    }
                }
            }})
          break;
        case 'Near-Miss':
            await db.event.create({data: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                markerEventType: eventType,
                description: data.get('description') as unknown as string,
                timeOfEvent: formatDate(data.get('timeOfEvent')) as unknown as Date,
                linkToVideo: data.get('linkToVideo') as unknown as string,
                NearMiss: {
                    create: {
                        missType: { connect:   { missDescription: data.get('missTypeDescription') } } ,
                    }
                }
            }})
            break;
        case 'Aggression':
            await db.event.create({data: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                markerEventType: eventType,
                description: data.get('description') as unknown as string,
                timeOfEvent: formatDate(data.get('timeOfEvent')) as unknown as Date,
                linkToVideo: data.get('linkToVideo') as unknown as string,
                Aggression: {
                    create: {
                    }
                }
            }})
          break;
        default:
          break;
      }
    

    return new Response(
        JSON.stringify({
            success: true
        }),
        {headers: {
            'Content-Type': 'application/json'
        }}
    )
}