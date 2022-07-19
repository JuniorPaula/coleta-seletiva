export type LocationModel = {
  location: Location
  items: Items[]
}

type Location = {
  id: string
  image?: string
  name: string
  email: string
  latitude: number
  longitude: number
  city: string
  uf: string
}

type Items = {
  title: string
}
