export type book = {
  title: string
  pages: number
  author: string
  price: number
  language: string
  description: string
  sold: number
  categories: Array<category>
}
export type category = {
  name: string
  id: string
}

// export type bookDTO = {
//   title: string
//   pages: number
//   author: string
//   categories: Array<string>
//   language: string
//   description: string
//   price: number
//   rules: Array<>
//   label: string
//   value: ''
// }
