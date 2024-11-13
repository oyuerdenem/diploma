import React from "react";
import { useTable } from "react-table";
import { MdLocationPin, MdRefresh } from "react-icons/md";

function OrderSummary({
  tableNumber,
  orderId,
  orderDate,
  orderTime,
  items,
  total,
}) {
  const columns = React.useMemo(
    () => [
      { Header: "Захиалга", accessor: "name" },
      { Header: "Тоо/ш", accessor: "count" },
      { Header: "Үнэ", accessor: "price" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: items,
    });

  return (
    <div className="w-[23%] bg-white border rounded-xl h-fit p-3 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="bg-[#086A69] h-9 w-9 rounded-md flex justify-center items-center text-white font-light">
            <p className="">{tableNumber}</p>
          </div>
          <div className="px-3 flex flex-col h-10 justify-center space-y-1">
            <p className="text-xs font-medium text-gray-700 items-start">
              Ширээн №{tableNumber}
            </p>
            <p className="text-xs text-gray-700 items-end">Захиалга #{orderId}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            className="border p-1 rounded-full bg-yellow-400 text-gray-700 hover:bg-gray-200"
            aria-label="Refresh"
          >
            <MdRefresh size={14} />
          </button>
          <button
            className="border p-1 rounded-full bg-white text-gray-700 hover:bg-gray-200"
            aria-label="Add Location"
          >
            <MdLocationPin size={14} />
          </button>
        </div>
      </div>

      <div className="flex justify-between font-light text-xs text-gray-500">
        <p>{orderDate}</p>
        <p>{orderTime}</p>
      </div>
      <hr className="border-t border-gray-300" />
      <div className="mt-4">
        <table
          {...getTableProps()}
          className="min-w-full text-left text-gray-700 text-xs border-separate border-spacing-y-1"
        >
          <thead className="font-extralight">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="font-light">
          {/* overflow-y-auto max-h-80 */}
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.column.id === "price"
                        ? `$${cell.value.toFixed(2)}`
                        : cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <hr className="border-t border-gray-300" />
      <div className="flex justify-between text-xs font-medium">
        <p>Нийт дүн</p>
        <p>${total.toFixed(2)}</p>
      </div>

      <div className="flex justify-between space-x-2">
        <button className="w-1/2 px-4 py-2 bg-yellow-400 bg-opacity-40 text-gray-700 hover:shadow rounded-md text-xs">Дэлгэрэнгүй</button>
        <button className="w-1/2 px-4 py-2 bg-yellow-400 text-gray-700 text-xs rounded-md hover:shadow">
          Төлбөр төлөх
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
