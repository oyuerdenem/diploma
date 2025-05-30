import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdLocationPin, MdRefresh } from "react-icons/md";
import { useTable, Column } from "react-table";
import FormatTotal from "../formatter/format-total";
import { FiBox } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CustomDialog from "../dialog/dialog";

interface OrderItem {
  cuisine: {
    name: string;
  };
  quantity: number;
  itemPrice: number;
}

interface OrderSummaryProps {
  id: string | number;
  status: string;
  date: string;
  option: string;
  total: number;
  time: string;
  changed: boolean; 
  setChanged: React.Dispatch<React.SetStateAction<boolean>>; 
}
function OrderSummary({
  id,
  status,
  date,
  option,
  total,
  time,
  changed,
  setChanged,
}: OrderSummaryProps) {
  const [tableNum, setTableNum] = useState(0);
  const [orderStat, setOrderStat] = useState("");
  const [orderOption, setOrderOption] = useState("");
  const [data, setData] = useState<OrderItem[]>([]);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [changedCompleted, setChangedCompleted] = useState(false);
  const columns: Column<OrderItem>[] = React.useMemo(
    () => [
      {
        Header: "Захиалга",
        accessor: "name" as keyof OrderItem,
      },
      {
        Header: "Тоо/ш",
        accessor: "count" as keyof OrderItem,
      },
      {
        Header: "Үнэ",
        accessor: "price" as keyof OrderItem,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/orderitems/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const result = response.data.orderItems.map((item: OrderItem) => ({
          name: item.cuisine.name,
          count: item.quantity,
          price: item.itemPrice,
        }));
        setData(result);
        setOrderStat(response.data.order.status || "");
        setOrderOption(response.data.order.option || "");
        setTableNum(response.data.tableQr.qrCodeData.tableNumber || 0);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    if (id) {
      fetchOrders();
    }
  }, [id]);

  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/orders/${id}`,
        {
          status: "Completed",
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log({response})
      if (response.status === 200) {
        setChangedCompleted(true);
        setChanged(true)
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data || [],
    });

  const handleClose = (status: string) => {
    setOpenDialog(false);
    if (status === "disagree") {
      setOrderCompleted(false);
    } else if (status === "agree") {
      setOrderCompleted(true);
    }
  };

  useEffect(() => {
    if (orderCompleted) {
      handleStatusChange();
    }
  }, [orderCompleted]);

  return (
    <>
      <div className="w-[350px] bg-white border rounded-xl h-fit p-3 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex">
            <div className="bg-[#086A69] h-9 w-9 rounded-md flex justify-center items-center text-white font-light">
              <p className="">{tableNum}</p>
            </div>
            <div className="px-3 flex flex-col h-10 justify-center space-y-1">
              <p className="text-xs font-medium text-gray-700 items-start">
                Ширээ №{tableNum}
              </p>
              <p className="text-xs text-gray-700 items-end">
                Захиалга #{id.toString().substring(0, 6)}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            {changedCompleted || orderStat === "Completed" ? (
              <button
                onClick={() => setOpenDialog(true)}
                className="border p-1 rounded-full bg-[#086A69] text-white hover:bg-green-900"
                aria-label="Refresh"
              >
                <IoMdCheckmark size={14} />
              </button>
            ) : (
              <button
                onClick={() => setOpenDialog(true)}
                className="border p-1 rounded-full bg-yellow-400 text-gray-700 hover:bg-yellow-500"
                aria-label="Refresh"
              >
                <MdRefresh size={14} />
              </button>
            )}

            {orderOption === "Dinein" ? (
              <button
                className="border p-1 rounded-full bg-white text-gray-700"
                aria-label="Add Location"
              >
                <MdLocationPin size={14} />
              </button>
            ) : (
              <button
                className="border p-1 rounded-full bg-red-500 text-white"
                aria-label="Refresh"
              >
                <FiBox size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between font-light text-xs text-gray-500">
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="mt-4">
          {data.length > 0 ? (
            <table
              {...getTableProps()}
              className="min-w-full text-left text-gray-700 text-xs border-separate border-spacing-y-1"
            >
              <thead className="font-extralight">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
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
                          {cell.column.id === "price" ? (
                            <FormatTotal value={cell.value} />
                          ) : (
                            cell.render("Cell")
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>Уншиж байна...</p>
          )}
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex justify-between text-xs font-medium">
          <p>Нийт дүн</p>
          <p>
            <FormatTotal value={total} />
          </p>
        </div>

        <div className="flex justify-between space-x-2">
          {/* <button className="w-1/2 px-4 py-2 bg-yellow-400 bg-opacity-40 text-gray-700 hover:shadow rounded-md text-xs">
          Дэлгэрэнгүй
        </button> */}
          <button
            disabled
            className="w-full px-4 py-2 bg-yellow-400 text-gray-700 text-xs rounded-md hover:shadow"
          >
            Төлбөр төлөгдсөн
          </button>
        </div>
      </div>
      <CustomDialog
        open={openDialog}
        title="Захиалгын төлөв өөрчлөх"
        description="Уг захиалгыг"
        boldText="ХҮРГЭГДСЭН"
        onClose={handleClose}
      />
    </>
  );
}

export default OrderSummary;
