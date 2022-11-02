import React from "react";
import './Pagination.css';


export default function Pagination({pageSize, totalVideoGames, pagination}) {
  const pageNumbers= [];

  for (let i = 1; i <= Math.ceil(totalVideoGames/pageSize); i++) {
    pageNumbers.push(i);  
  }

  return (
    <nav>
      <ul className="pagination">
        { pageNumbers && pageNumbers.map( page => {
          return (
            <li className="number" key={page}>
              <button onClick={()=> pagination(page)}>{page}</button>
            </li>)
          })
        }
      </ul>
    </nav>
  )
}