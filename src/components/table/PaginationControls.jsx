const PaginationControls = ({
  page,
  totalPages,
  onPrev,
  onNext,
  className,
}) => {
  return (
    <div
      className={`flex  items-center gap-4 mt-2 border-inherit ${className}`}
    >
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-3 py-1 rounded-lg border  disabled:opacity-50 border-inherit"
      >
        Previous
      </button>
      <span>
        Page {totalPages ? page : 0} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-lg border disabled:opacity-50 border-inherit"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
