import React from "react";
import s from './Pagination.module.css';


export default function Pagination({pageSize, totalVideoGames, pagination}) {
  const pageNumbers= [];

  for (let i = 1; i <= Math.ceil(totalVideoGames/pageSize); i++) {
    pageNumbers.push(i);  
  }

  return (
    <div className={s.pagination}>
      <a htmlFor="">Paginas:</a>
      <ul className={s.pagination}>
        { pageNumbers && pageNumbers.map( page => {
          return (
            <li className={s.number} key={page}>
              <button className={s.btns1} onClick={()=> pagination(page)}>{page}</button>
            </li>)
          })
        }
      </ul>
    </div>
  )
}