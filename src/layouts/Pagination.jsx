import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const maxButtonsToShow = 3;
  const [visibleRange, setVisibleRange] = useState({
    start: 1,
    end: Math.min(totalPages, maxButtonsToShow),
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      const pageButton = (
        <button
          key={i}
          className={`${currentPage === i
              ? "text-color-white bg-primary-color"
              : "bg-[#F9F1E7]"
            } py-2 px-4 rounded-[10px] shadow-md duration-300`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );

      pageNumbers.push(pageButton);
    }

    return pageNumbers;
  };

  const handlePrevClick = () => {
    const newStart = Math.max(visibleRange.start - maxButtonsToShow, 1);
    const newEnd = newStart + maxButtonsToShow - 1;
    setVisibleRange({ start: newStart, end: newEnd });
  };

  const handleNextClick = () => {
    const newEnd = Math.min(visibleRange.end + maxButtonsToShow, totalPages);
    const newStart = Math.max(newEnd - maxButtonsToShow + 1, 1);
    setVisibleRange({ start: newStart, end: newEnd });
  };

  return (
    <div className="flex gap-2 lg:gap-3 items-center text-[14px] lg:text-[16px]">
      {currentPage > 1 && (
        <button
          className="bg-[#F9F1E7] py-2 px-4 rounded-[10px] shadow-md duration-300"
          onClick={() => {
            setCurrentPage(currentPage - 1);
            handlePrevClick();
          }}
        >
          Prev
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button
          className="bg-[#F9F1E7] py-2 px-4 rounded-[10px] shadow-md duration-300"
          onClick={() => {
            setCurrentPage(currentPage + 1);
            handleNextClick();
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;