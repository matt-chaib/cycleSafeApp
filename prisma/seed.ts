import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

let defaultMarkers = [
    { lat: 53.38, lng: -1.47, markerEventType: "Near-Miss"},
    { lat: 52.38, lng: -1.47, markerEventType: "Near-Miss"},
    { lat: 53.374, lng: -1.479, markerEventType: "Collision"},
    { lat: 53.384, lng: -1.479, markerEventType: "Collision"},
    { lat: 53.394, lng: -1.479, markerEventType: "Collision"},
    { lat: 53.38, lng: -1.484, markerEventType: "Aggression" }
]

let markerTypes = [
    "Collision",
    "Near-Miss",
    "Aggression"
]

let collisionSeverityTypes = [
    "Fatal",
    "Serious",
    "Moderate",
    "Mild"
]

let missTypes = [
    "Close Pass", "Pull Out - Parking", "Pull Out - Junction", "Open Door", "Tailing"
]

let collisions = [
    {
      severity: { severityType: "Fatal" },
      estimatedCost: 100,
    },
    {
        severity: { severityType: "Serious" },
        estimatedCost: 90,
    },
    {
        severity: { severityType: "Moderate" },
        estimatedCost: 70,
    }
]

let nearmisses = [
    {
        missType: { missDescription: "Close Pass" },
    },
    {
        missType: { missDescription: "Close Pass"},
    }
]

let aggressions = [
    {}
]

const seedMarkers = async () => {

    for (let i = 0; i < (markerTypes.length); i++) {
        await db.markerType.create({
            data: {
                markerEventTypeDetail: markerTypes[i]
            }
        })
    }

    for (let i = 0; i < (collisionSeverityTypes.length); i++) {
        await db.collisionSeverity.create({
            data: {
                severityTypeDetail: collisionSeverityTypes[i],
                id: i+1
            }
        })
    }

    for (let i = 0; i < (missTypes.length); i++) {
        await db.missType.create({
            data: {
                missDescription: missTypes[i],
                id: i+1
            }
        })
    }

  let markerTypesList = await db.markerType.findMany();

  
  // Step 2: Seed Events
  for (const marker of defaultMarkers) {
          await db.event.create({
              data: {
                  latitude: marker.lat,
                  longitude: marker.lng,
                  markerEventType: marker.markerEventType,
                  description: ""
              }
          })
  }

  // Get all created events
  const eventsCollision = await db.event.findMany({
    where: {
        markerEventType: {
            equals: 'Collision'
        }
    }
  });

  const eventsNearmiss= await db.event.findMany({
    where: {
        markerEventType: {
            equals: 'Near-Miss'
        }
    }
  });

  const eventsAggression= await db.event.findMany({
    where: {
        markerEventType: {
            equals: 'Aggression'
        }
    }
  });


  // Step 3: Seed Collisions and link them to Events
  for (let i = 0; i < (collisions.length); i++) {
      await db.collision.create({
          data: {
              severity: { connect:   { severityTypeDetail: collisions[i].severity.severityType } } ,
              estimatedCost: collisions[i].estimatedCost,
              event: { connect: { id: eventsCollision[i].id } } // Connect to the first event, for example
          }
      });
  }

  for (let i = 0; i < (nearmisses.length); i++) {
    await db.nearMiss.create({
        data: {
            missType: { connect:   { missDescription: nearmisses[i].missType.missDescription } } ,
            event: { connect: { id: eventsNearmiss[i].id } } // Connect to the first event, for example
        }
    });
}

for (let i = 0; i < (aggressions.length); i++) {
    await db.aggression.create({
        data: {
            event: { connect: { id: eventsAggression[i].id } } // Connect to the first event, for example
        }
    });
}

}

seedMarkers()