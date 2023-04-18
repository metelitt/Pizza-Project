import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";

export type Sort={
    name:string,
    sortProperty:SortPropertyEnum
}
export enum SortPropertyEnum {
    RATING_DESK='rating',
    RATING_ASC='-rating',
    NAME_DESK='name',
    NAME_ASC='-name',
    PRICE_DESK='price',
    PRICE_ASC='-price',
}

export interface FilterSliceState{
    searchValue:string,
    categoryId:number,
    currentPage:number,
    sort:Sort;
}

const initialState:FilterSliceState={
    searchValue:"",
    categoryId:0,
    currentPage:1,
    sort:{
        name:'популярности',  
      sortProperty:SortPropertyEnum.RATING_DESK
    }
}
const filterSlice=createSlice({
    name:'filters',
    initialState,
    reducers:{
        setCategoryId(state,action:PayloadAction<number>){
            state.categoryId=action.payload
        },
        setSort(state,action:PayloadAction<Sort>){
            state.sort=action.payload
        },
        setCurrentPage(state,action:PayloadAction<number>){
            state.currentPage=action.payload
        },
        setFilters(state,action:PayloadAction<FilterSliceState>){
            if(Object.keys(action.payload).length){
                state.sort=action.payload.sort
                state.currentPage=Number(action.payload.currentPage)
                state.categoryId=Number(action.payload.categoryId)
            }else{
                state.currentPage=1;
                state.categoryId=0;
                state.sort={
                    name:'популярности',
                    sortProperty:SortPropertyEnum.RATING_DESK
                }
            }

        },
        setSearchValue(state,action:PayloadAction<string>){
            state.searchValue=action.payload
        }
    }
});
 
export const {setCategoryId,setSort,setCurrentPage,setFilters,setSearchValue}=filterSlice.actions;

export const selectSort= (state:RootState)=>state.filter.sort

export const selectFilter = (state:RootState) =>state.filter

export default filterSlice.reducer
