import React  from 'react';
import  useWhyDidYouUpdate  from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps={
    value:number,
    onClickCategory:(i:number)=>void;
};

const Categories:React.FC<CategoriesProps>=React.memo(
    ({value,onClickCategory})=> {
        useWhyDidYouUpdate('Categories',{value,onClickCategory})
        const Categories=[
            "Все","Мясные","Вегатарианские","Гриль","Острые","Закрытые"
        ]
        return (
            <div className='categories'>
                <ul>
                    {
                        Categories.map((categoryName,index)=><li key={index} onClick={()=>onClickCategory(index)} className={value=== index ? "active" : ""}>{categoryName}</li>)
                    }
                </ul>
            </div>
        );
    }
)

export default Categories;