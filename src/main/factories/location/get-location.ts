import { DbGetLocations } from '@/data/usecases/locations/get-locations/db-get-locations'
import { LocationMongoRepository } from '@/infra/db/mongodb/location-repository/location'
import { GetLocationController } from '@/presentation/controllers/location/get-location-controller'

export const makeGetLocationController = (): GetLocationController => {
  const locationMongoRepository = new LocationMongoRepository()
  const getLocation = new DbGetLocations(locationMongoRepository)

  return new GetLocationController(getLocation)
}
