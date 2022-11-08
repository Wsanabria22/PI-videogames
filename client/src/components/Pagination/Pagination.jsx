import React from "react";
import './Pagination.css';


export default function Pagination({pageSize, totalVideoGames, pagination}) {
  const pageNumbers= [];

  for (let i = 1; i <= Math.ceil(totalVideoGames/pageSize); i++) {
    pageNumbers.push(i);  
  }

  return (
    <div className="pagination">
      <a htmlFor="">Paginas:</a>
      <ul className="pagination">
        { pageNumbers && pageNumbers.map( page => {
          return (
            <li className="number" key={page}>
              <button className="btns1" onClick={()=> pagination(page)}>{page}</button>
            </li>)
          })
        }
      </ul>
    </div>
  )
}