import { CartItem } from "./cart.type"

export interface Order {
    firstName: string
    lastName: string
    username: string
    email: string
    address: string
    orderItems: CartItem[]
    paymentMethod: string
    totalPrice: number
    totalProducts: number
    discount: boolean
    // _id: string
    orderDate: string
   // __v: number
  }
  
  export interface OrderItem {
    product: Product
    amount: number
    quantity: number
  }
  
  export interface Product {
    //_id: string
    id: number
    product_name: string
    product_img: string
    product_description: string
    price: number
    ratings: number
    category_id: number
    keywords: string[]
    parent_category_id: number
    //__v: number
  }
  