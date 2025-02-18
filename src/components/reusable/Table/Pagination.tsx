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

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      action();
    }
  };

  return (
    <div className="text-center mt-8">
      {/* Pagination Controls */}
      <ul className="inline-flex gap-x-3 text-grey-900 mb-1.5">
        {/* Previous Button */}
        <li
          role="button"
          tabIndex={currentPage === 1 ? -1 : 0}
          aria-disabled={currentPage === 1}
          className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          onKeyDown={(e) => handleKeyDown(e, () => currentPage > 1 && onPageChange(currentPage - 1))}
        >
          &lt; Previous
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            role="button"
            tabIndex={0}
            className={`cursor-pointer ${currentPage === number ? "font-bold" : ""}`}
            onClick={() => onPageChange(number)}
            onKeyDown={(e) => handleKeyDown(e, () => onPageChange(number))}
          >
            {number}
          </li>
        ))}

        {/* Next Button */}
        <li
          role="button"
          tabIndex={currentPage === totalPages ? -1 : 0}
          aria-disabled={currentPage === totalPages}
          className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          onKeyDown={(e) => handleKeyDown(e, () => currentPage < totalPages && onPageChange(currentPage + 1))}
        >
          Next &gt;
        </li>
      </ul>

      {/* Items Per Page */}
      <p>
        Show{" "}
        {itemsPerPageOptions.map((option, index) => (
          <span
            key={option}
            role="button"
            tabIndex={0}
            className={`cursor-pointer ${itemsPerPage === option ? "font-bold" : ""}`}
            onClick={() => onItemsPerPageChange(option)}
            onKeyDown={(e) => handleKeyDown(e, () => onItemsPerPageChange(option))}
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
