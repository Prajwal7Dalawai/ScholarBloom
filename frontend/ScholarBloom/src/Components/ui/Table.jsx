import React from "react";

export default function Table({ columns = [], data = [] }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2 text-left">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
