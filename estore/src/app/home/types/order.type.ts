import { CartItem } from "./cart.type"

export interface Order {
    firstName: string
    lastName: string
    username: string
    email: string
    address: string
    orderItems: any[]
    paymentMethod: string
    totalPrice: number
    totalProducts: number
    discount: boolean
    // _id: string
    orderDate: string
   // __v: number
  }
  
  export type PastOrder = Order[]

  
  