import { DbAddLocation } from '@/data/usecases/locations/add-location/db-add-location'
import { LocationMongoRepository } from '@/infra/db/mongodb/location-repository/location'
import { LocationController } from '@/presentation/controllers/location/location-controller'
import { makeLocationValidation } from './location-validation-factory'

export const makeLocationController = (): LocationController => {
  const addLocationRepository = new LocationMongoRepository()

  const addLocation = new DbAddLocation(addLocationRepository)
  return new LocationController(makeLocationValidation(), addLocation)
}
