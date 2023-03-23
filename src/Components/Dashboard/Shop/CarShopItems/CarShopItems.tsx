import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import ShopContext from "../../../context/userContext/ShopProvider.tsx";
import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

function Items({ currentItems }) {
  const { setIsOpenCarShopItemDetails, setCarShopItem, searchCarShopItems } =
    useContext<any>(ShopContext);

  function carShopItemDetails(itemInfo) {
    setCarShopItem(itemInfo);
    setIsOpenCarShopItemDetails(true);
  }

  return (
    <>
      {currentItems.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden bg-gray-100 rounded-lg border-2 border-gray-300">
          <div className="group">
            <img
              src={item.src}
              alt={item.title}
              className="mx-auto h-32 w-32 object-cover object-center group-hover:opacity-75"
            />
            <h3 className="mt-4 text-sm font-semibold text-gray-700">{item.title}</h3>
            <p className="mt-1 text-lg font-medium text-blue-600">{item.price}</p>
          </div>
          <div className="grid lg:grid-cols-2 max-w-sm mx-auto">
            <button
              onClick={() => carShopItemDetails(searchCarShopItems[index])}
              className="mx-auto bg-blue-500 hover:bg-blue-600 mb-2 h-8 w-20 rounded-full text-white">
              Details
            </button>
            <button className="mx-auto bg-blue-500 hover:bg-blue-600 mb-2 h-8 w-8 rounded-full text-white">
              <ShoppingCartIcon className="w-8 h-6" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

function CarShopItemsPaginated({ itemsPerPage }) {
  const {
    carShopItems,
    setSearch,
    carShopItemsCategory,
    searchCarShopItems,
    setSearchCarShopItems
  } = useContext<any>(ShopContext);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = searchCarShopItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(searchCarShopItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchCarShopItems.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
    const newData = carShopItems.filter(
      (item) =>
        item.title.toLowerCase().includes(event.target.value.toLowerCase()) &&
        item.category.includes(carShopItemsCategory)
    );
    setSearchCarShopItems(newData);
  };

  return (
    <>
      <div className="w-48 relative mx-auto mb-8 border-2 border-gray-300">
        <div className="absolute">
          <MagnifyingGlassIcon className="w-6 h-6" />
        </div>
        <input
          className="w-full pl-10"
          type="text"
          placeholder="Search items"
          onChange={handleSearchInput}
        />
      </div>
      {currentItems.length === 0 ? (
        <div className="mt-32 text-xl tracking-tight text-gray-400 text-center">
          No data for searched query
        </div>
      ) : (
        <div className="max-w-3xl mb-12 mt-8 pl-4 pr-4 grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 mx-auto text-center">
          <Items currentItems={currentItems} />
        </div>
      )}

      <div className="mx-auto text-center">
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

export default CarShopItemsPaginated;
