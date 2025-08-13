const PaginationControls = ({
  page,
  totalPages,
  onPrev,
  onNext,
  className,
}) => {
  return (
    <div className={`flex  items-center gap-4 mt-2 ${className}`}>
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-3 py-1 rounded-lg border  disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-lg border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
