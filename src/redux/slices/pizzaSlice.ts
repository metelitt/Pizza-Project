import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from "../store"

type Pizza={
    id:string ,
    name:string,
    sizes:number[],
    price:number,
    imageUrl:string,
    types:number[],
    rating:number
}

export type SearchPizzaParams={
    sortBy:string, order:string, category:string, search:string, currentPage:string
}
export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async function (params, thunkApi) {
        const { sortBy, order, category, search, currentPage } = params
        const { data } = await axios.get<Pizza[]>(`https://6426fc66556bad2a5b5cfb21.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

        if (data.length === 0) {
            return thunkApi.rejectWithValue('Пиццы пустые')
        }
        return thunkApi.fulfillWithValue(data)
    })

interface PizzaSliceState{
    items:Pizza[];
    status:Status
}

export enum Status {
    LOADING='loading',
    SUCCES='succes',
    ERROR='error'
}

const initialState:PizzaSliceState={
items:[],
status:Status.LOADING,
}

const pizzaSlice=createSlice({
    name:'pizza',
    initialState,
    reducers:{
        setItems(state,action){
            state.items=action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status=Status.LOADING;
            state.items=[]
          })
          builder.addCase(fetchPizzas.fulfilled, (state,action) => {
            state.items=action.payload;
            state.status=Status.SUCCES
          })
          builder.addCase(fetchPizzas.rejected, (state,action) => {
            state.status=Status.ERROR
            state.items=[]
          })
        },
});
export const {setItems}=pizzaSlice.actions

export const selectPizzaData=(state:RootState)=>state.pizza
export default pizzaSlice.reducer