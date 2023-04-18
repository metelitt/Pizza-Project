import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

interface CartSliceState{
    totalPrice:number,
    items:CartItem[];
}

export type CartItem={
    id:string ,
    name:string,
    size:number,
    price:number,
    imageUrl:string,
    type:string,
    count:number
}
const initialState:CartSliceState={
    totalPrice:0,
    items:[]
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        // addItem(state,action){
        //     state.items.push(action.payload)
        //     state.totalPrice=state.items.reduce((sum,obj)=>{
        //         return obj.price + sum
        //     },0)
        // },
        addItem(state,action:PayloadAction<CartItem>){
          const findItem=state.items.find(obj=>obj.id=== action.payload.id)
          if(findItem){
            findItem.count++
          }else{
            state.items.push({
                ...action.payload,
                count: 1
            })
          }
          state.totalPrice=state.items.reduce((sum,obj)=>{
            return (obj.price * obj.count) + sum
            },0)
        },
        minusItem(state,action:PayloadAction<string>){
            const findItem=state.items.find(obj=>obj.id=== action.payload)
            if(findItem){
                findItem.count--;
            }
            state.items = state.items.filter((obj) => obj.count !== 0)
        },
        removeItem(state,action:PayloadAction<string>){
            state.items=state.items.filter((obj)=>obj.id !==action.payload)
        },
        clearItems(state){
            state.items=[]
            state.totalPrice=0;
        }
    }
});

export const selectCart=(state:RootState)=>state.cart;

export const selectCartItemById=(id:string)=>(state:RootState)=>state.cart.items.find((obj)=>obj.id===id)
export const {addItem,removeItem,clearItems,minusItem}=cartSlice.actions;

export default cartSlice.reducer