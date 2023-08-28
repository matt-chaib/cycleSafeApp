import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

let defaultMarkers = [
    { lat: 53.38, lng: -1.47, markerEventType: "Near-Miss"},
    { lat: 53.374, lng: -1.479, markerEventType: "Collision"},
    { lat: 53.38, lng: -1.484, markerEventType: "Aggression" }
]

let markerTypes = [
    {id: 1, markerEventTypeDetail: "Collision"},
    {id: 2, markerEventTypeDetail: "Near-Miss"},
    {id: 3, markerEventTypeDetail: "Aggression"},
]

function seedMarkers() {
    markerTypes.forEach(async type => {
        console.log(type)
        await db.markerType.create({
            data: {
                markerEventTypeDetail: type.markerEventTypeDetail
            }
        })
    })
    
    defaultMarkers.forEach(async m => {
        await db.event.create({data: {
            latitude: m.lat,
            longitude: m.lng,
            markerEventType: "Collision",
            description: ""
        }})
    })
  }
  
seedMarkers()