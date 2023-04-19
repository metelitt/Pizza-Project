export type Pizza={
    id:string ,
    name:string,
    sizes:number[],
    price:number,
    imageUrl:string,
    types:number[],
    rating:number
}
export interface PizzaSliceState{
    items:Pizza[];
    status:Status
}
export type SearchPizzaParams={
    sortBy:string, order:string, category:string, search:string, currentPage:string
}

export enum Status {
    LOADING='loading',
    SUCCES='succes',
    ERROR='error'
}