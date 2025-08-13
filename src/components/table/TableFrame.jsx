import React, { Children, cloneElement } from "react";

// Table Container Component
const TableFrame = ({
  columns = [],
  compact = false,
  className = "",
  emptyMessage = "No data available",
  children,
}) => {
  if (!children) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div
      className={`${className} overflow-x-auto  overflow-hidden border-inherit`}
    >
      <table className="min-w-full bg-white  border-inherit rounded-xl shadow-sm">
        <thead className="border-inherit">
          <tr className="bg-gray-50 border-b border-inherit">
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className={`
                  text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${compact ? "px-2 py-2" : "px-4 py-3"}
                `}
              >
                {column.title || column.header || column.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-inherit">{children}</tbody>
      </table>
    </div>
  );
};

export default TableFrame;
