import React from "react";

export default function Table({ columns = [], data = [] }) {
  return (
    <table className="w-full border-separate border-spacing-0 border border-gray-400">
      {/* Table Head */}
      <thead className="bg-gray-200 border border-gray-400">
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="border border-gray-400 px-4 py-2 text-left text-sm">
              {col}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-400 px-4 py-2 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-4 border border-gray-400">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
