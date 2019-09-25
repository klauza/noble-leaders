import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate, active, currentPage }) => {
  
  const pageNumbers = [];
  
  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i);
  }

 
  return (
    <div className="pagination">
      {pageNumbers.map((number, i) => (
        <li key={number} className={`page-item ${i === currentPage-1 && 'active'}`}>
          {/* eslint-disable-next-line */}
          <button onClick={() => {paginate(number); active(number)}} className="page-link">
            {number}
          </button>
        </li>
      ))}
    </div>
  )
}

export default Pagination
