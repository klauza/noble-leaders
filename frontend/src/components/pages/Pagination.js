import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate, active }) => {
  
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i);
  }

 
  return (
    <div className="pagination">
      {pageNumbers.map((number, i) => (
        <li key={number} className={`page-item ${i === 0 && 'active'}`}>
          <a onClick={() => {paginate(number); active(number)}} href="#" className="page-link">
            {number}
          </a>
        </li>
      ))}
    </div>
  )
}

export default Pagination
