import * as React from "react";
import { useState, useEffect, useContext, Fragment } from "react";
import OrderHistoryContext from "../../context/userContext/OrderHistoryProvider.tsx";
import ReactPaginate from "react-paginate";

function Items({ currentItems }) {
  const { getOrderHistory } = useContext<any>(OrderHistoryContext);

  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 ">
              Item
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500">
              Title
            </th>
          </tr>
        </thead>

        <tbody id="orderHistoryTable" className="divide-y divide-gray-200">
          {currentItems.map((order, index) => (
            <tr id={order._id} key={index}>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                <img className="h-28 w-18" alt={order.src} src={order.src}></img>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {order.quantity}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">${order.price}</td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{order.title}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

function OrderItemsPaginated({ itemsPerPage }) {
  const { order } = useContext<any>(OrderHistoryContext);
  const orderItems = order.items.items;
  console.log(orderItems);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = orderItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orderItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orderItems.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <Items currentItems={currentItems} />
      </div>
      <div className="mx-auto text-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageClassName="ml-2 mr-2 text-center text-xl font-semibold"
          previousClassName="text-center text-2xl text-blue-600 font-semibold"
          nextClassName="text-center text-2xl text-blue-600 font-semibold"
          containerClassName="inline-flex "
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default OrderItemsPaginated;
