import { DbLoadLocationById } from '@/data/usecases/locations/load-location-by-id/db-load-location-by-id'
import { LocationMongoRepository } from '@/infra/db/mongodb/location-repository/location'
import { LoadLocationByIdController } from '@/presentation/controllers/location/load-location-by-id-controller'

export const makeLoadLocationByIdController = (): LoadLocationByIdController => {
  const locationMongoRepository = new LocationMongoRepository()
  const loadLocationById = new DbLoadLocationById(locationMongoRepository)

  return new LoadLocationByIdController(loadLocationById)
}
