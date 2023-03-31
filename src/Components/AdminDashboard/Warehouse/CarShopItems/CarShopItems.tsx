import React, { useEffect, useState, useContext, Fragment } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import WarehouseContext from "../../../context/adminContext/WarehouseProvider.tsx";
import { Menu, Transition } from "@headlessui/react";

function Items({ currentItems }) {
  const {
    setIsOpenCarShopItemDetails,
    setIsOpenCarShopItemEdit,
    setIsOpenCarShopItemDelete,
    setCarShopItem,
    searchCarShopItems,
    carShopItems
  } = useContext<any>(WarehouseContext);

  function carShopItemDetails(itemInfo) {
    console.log(itemInfo);
    setCarShopItem(itemInfo);
    setIsOpenCarShopItemDetails(true);
  }
  function carShopItemEdit(itemInfo) {
    setCarShopItem(itemInfo);
    setIsOpenCarShopItemEdit(true);
  }
  function carShopItemDelete(itemInfo) {
    setCarShopItem(itemInfo);
    setIsOpenCarShopItemDelete(true);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {currentItems.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden bg-gray-100 rounded-lg border-2 border-gray-300">
          <div className="group mt-2">
            <img
              src={item.src}
              alt={item.title}
              className="mx-auto h-32 w-32 object-cover object-center group-hover:opacity-75"
            />
            <h3 className="mt-4 text-sm font-semibold text-gray-700">{item.title}</h3>
            <p className="mt-1 text-lg font-medium text-blue-600">{item.price}</p>
          </div>
          <button
            onClick={() => carShopItemDetails(currentItems[index])}
            className="bg-blue-500 hover:bg-blue-600 mb-2 h-8 w-20 rounded-full text-white">
            Details
          </button>
          <Menu as="div" className="absolute inline-block">
            <div>
              <Menu.Button className="inline-flex w-full justify-center ml-3 rounded-md bg-white px-2 py-1 uppercase font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => carShopItemEdit(currentItems[index])}
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm w-24"
                        )}>
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => carShopItemDelete(currentItems[index])}
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm w-24 text-red-500 hover:text-red-700"
                        )}>
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ))}
    </>
  );
}

function CarShopItemsPaginated({ itemsPerPage }) {
  const {
    carShopItems,
    setCarShopItems,
    searchCarShopItems,
    setSearchCarShopItems,
    search,
    setSearch,
    carShopItemsCategory
  } = useContext<any>(WarehouseContext);

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
    console.log(search);
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
        <div className="mt-32 mb-48 text-xl tracking-tight text-gray-400 text-center">
          No results for the searched items
        </div>
      ) : (
        <div className="max-w-5xl mb-12 mt-8 pl-4 pr-4 grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-8 mx-auto text-center">
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
