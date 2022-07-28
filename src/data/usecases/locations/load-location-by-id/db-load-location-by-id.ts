import { LoadLocationByIdRepository } from '@/data/protocols/locations/load-location-by-id-repository'
import { LocationModel } from '@/domain/model/location-model'
import { LoadLocationById } from '@/domain/usecases/locations/load-location-by-id'

export class DbLoadLocationById implements LoadLocationById {
  constructor (
    private readonly loadLocationByIdRepository: LoadLocationByIdRepository
  ) {}

  async loadById (id: string): Promise<LocationModel> {
    const location = await this.loadLocationByIdRepository.loadById(id)
    return location
  }
}
