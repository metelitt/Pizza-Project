import React, { useEffect, useRef} from 'react';
import Categories from '../components/Categories';
import Sort, { List } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import qs from "qs"
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux'

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizzaSlice/asncActions';
import { SearchPizzaParams } from '../redux/pizzaSlice/types';
import { selectPizzaData } from '../redux/pizzaSlice/selectors';





const Home:React.FC=()=> {
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const isSearh=useRef(false)
    const isMount=useRef(false)

    const { items, status } = useSelector(selectPizzaData);
    const {categoryId,sort,currentPage,searchValue}=useSelector(selectFilter)
    

    const  onClickCategory=React.useCallback(
      (id:number)=>{
        dispatch(setCategoryId(id))
      },[]
    )

    const onChangePage=(num:number)=>{
      dispatch(setCurrentPage(num))
    }

    const getPizzas=async ()=>{
      const sortBy=sort.sortProperty.replace('-','')
      const order=sort.sortProperty.includes("-") ? 'asc' : 'desc';
      const category=categoryId > 0 ? `category=${categoryId}` : '' 
      const search=searchValue ? `&search=${searchValue}` : '' 
  
        // fetch запрос
      // fetch.(`https://6426fc66556bad2a5b5cfb21.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${SortBy}&order=${order}${search}`,)
      // .then((res)=>res.json())
      // .then((arr)=>{
      //   setIsLoading(false)
      //   setItems(arr)
      //   })
        // axios запрос
      // await axios.get(
      //   `https://6426fc66556bad2a5b5cfb21.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${SortBy}&order=${order}${search}`
      // ).then((res)=>{
      //   setItems(res.data)
      //   setIsLoading(false)
      // })
      // window.scrollTo(0,0)
      // async/await запрос
      dispatch(
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage:String(currentPage)
      }))
    }
    


    useEffect(()=>{
      if(window.location.search){
        const params=qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
        const sort=List.find(obj=>obj.sortProperty===params.sortBy)
        dispatch(
          setFilters(   {
            searchValue: params.search,
            categoryId:Number(params.category),
            currentPage:Number(params.currentPage),
            sort:sort || List[0],
          }))
        isSearh.current=true
      }
    },[])




  useEffect(()=>{
      getPizzas()
  },[categoryId,sort.sortProperty,searchValue,currentPage])

  useEffect(()=>{
    if(isMount.current){
      const queryString=qs.stringify({
        sortProperty:sort.sortProperty,
        categoryId,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMount.current=true
  },[categoryId,sort.sortProperty,searchValue,currentPage])

 const pizzas=items.map((obj:any)=><PizzaBlock {...obj} key={obj.id}/>)
//  Вариант без фильтоации
  // .filter(obj=>{
  //   if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
  //     return true
  //   }
  //   return false
  // })
  const skeleton=[...new Array(6)].map((_,i)=><Skeleton key={i}/>)
    return (
        <div className='container'>
            <div className='content__top'>
          <Categories value={categoryId} onClickCategory={onClickCategory}/>
          <Sort value={sort}/>
          </div>
      <h2 className='content__title'>Все пиццы</h2>
      {
        status === "error" ? (<div className='content__error-info'>
          <h2>Произошла ошибка 😨</h2>
          <p>К сожалению,не удалось получть питсы.Попробуйте повторить попытку позже или перезагрузить страницу.</p>
        </div>) : (<div className='content__items'>{
  status ==="loading"
  ? skeleton
  : pizzas
        }
      </div>
      )}
      
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>
    );
}

export default Home;