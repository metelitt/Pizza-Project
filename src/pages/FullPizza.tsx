import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC=() =>{
    const [pizza,setPizza]=useState<{
        imageUrl:string,
        name:string,
        price:number
    }>();
    const {id}=useParams();
    const navigate=useNavigate()
    useEffect(()=>{
        async function fetchPizza(){
            try{
                const {data}=await axios.get('https://6426fc66556bad2a5b5cfb21.mockapi.io/items/' +id)
                setPizza(data);
                }catch(error){
                    alert('Ошибка при получении пиццы')
                    navigate('/')
            }
        }
        fetchPizza()
    },[])

    if(!pizza){
        return <>"Загрузка"</>
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt={pizza.name} />
            <h2>{pizza.name}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
}

export default FullPizza;