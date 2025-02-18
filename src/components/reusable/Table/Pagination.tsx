"use client";

import React from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const itemsPerPageOptions = [24, 48, 72, 96];

  return (
    <div className="text-center mt-8">
      {/* Pagination Controls */}
      <ul className="inline-flex gap-x-3 text-grey-900 mb-1.5">
        <li
          className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          
        >
          <div role="button" tabIndex={0} onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>
              &lt; Previous
          </div>
         
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`cursor-pointer ${currentPage === number ? "font-bold" : ""}`} 
          >
             <div  tabIndex={0}  role="button" onClick={() => onPageChange(number)}>
              {number}
            </div>
           
          </li>
        ))}
        <li
          className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
           <div  tabIndex={0}  role="button" onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}>
                Next &gt;
            </div>
         
        </li>
      </ul>
      {/* Items Per Page */}
      <p>
        Show {" "}
        {itemsPerPageOptions.map((option, index) => (
          <span
            tabIndex={0} 
            role="button"
            key={option}
            className={`cursor-pointer ${itemsPerPage === option ? "font-bold" : ""}`}
            onClick={() => onItemsPerPageChange(option)}
          >
            {option}
            {index !== itemsPerPageOptions.length - 1 && " / "}
          </span>
        ))}
        {" "}per page
      </p>
    </div>
  );
};

export default Pagination;
