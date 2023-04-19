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