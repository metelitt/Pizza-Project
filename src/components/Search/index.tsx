import React, { useCallback,useRef, useState } from 'react';
import styles from './Search.module.scss';
//@ts-ignore
import debounce from "lodash.debounce";
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search () {
    const dispatch=useDispatch()
    const [value,setValue]=useState('')
    const inpuRef=useRef<HTMLInputElement>(null)
    const onClickClear=()=>{
        dispatch(setSearchValue(''))
        setValue('')
        inpuRef.current?.focus()
    }

    const onChangeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }
    const updateSearchValue=useCallback(
        
        debounce((str:string)=>{
            dispatch(setSearchValue(str))
        },1000),[]
    )


    return (
        <div className={styles.root}> 
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>
            </svg>
        <input ref={inpuRef} value={value} onChange={onChangeInput} placeholder='Поиск пиццы...' className={styles.input}/>
        {
            value && (
                <svg className={styles.clear} onClick={onClickClear} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" width="48"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/>
                </svg>
            )
        }
        </div>
    );
}

export default Search;