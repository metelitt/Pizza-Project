import { createAsyncThunk } from "@reduxjs/toolkit"
import { Pizza, SearchPizzaParams} from "./types"
import axios from "axios"

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