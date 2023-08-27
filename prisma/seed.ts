import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

let defaultMarkers = [
    { lat: 53.38, lng: -1.47 },
    { lat: 53.374, lng: -1.479 },
    { lat: 53.38, lng: -1.484 }
]

function seedMarkers() {
    defaultMarkers.forEach(async m => {
        await db.marker.create({data: {
            latitude: m.lat,
            longitude: m.lng,
            markerType: 1,
            description: ""
        }})
    })
  }
  
seedMarkers()