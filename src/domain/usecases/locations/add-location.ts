export type AddLocationModel = {
  image?: string
  name: string
  email: string
  latitude: number
  longitude: number
  city: string
  uf: string
  items: string[]
}

export interface AddLocation {
  add: (location: AddLocationModel) => Promise<string>
}
