export type AddItemModel = {
  title: string
  image: string
}

export interface AddItem {
  add: (item: AddItemModel) => Promise<string>
}
