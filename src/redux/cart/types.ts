export type CartItem={
    id:string ,
    name:string,
    size:number,
    price:number,
    imageUrl:string,
    type:string,
    count:number
}

export interface CartSliceState{
    totalPrice:number,
    items:CartItem[];
}