import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import WarehouseContext from "../../../../context/adminContext/WarehouseProvider.tsx";
function EditCarShopItem() {
  const {
    isOpenCarShopItemEdit,
    setIsOpenCarShopItemEdit,
    carShopItem,
    itemCategory,
    getCarShopItems
  } = useContext<any>(WarehouseContext);

  const handleSubmitCarShopItemEdit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const image = e.target.image.files[0];
    const category = e.target.category.value;
    const key = carShopItem.key;
    const itemId = carShopItem._id;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("itemId", itemId);
    formData.append("key", key);
    console.log(formData.get("key"));
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    try {
      const carRepairShopItem = await axios
        .post("/dashboard/admin/warehouse/carshopitems/edit", formData, config)
        .then((res) => {
          if (res.status === 201) {
            setIsOpenCarShopItemEdit(false);
            getCarShopItems();
            console.log(res.data);
          }
        });
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err.response.data);
      }
    }
  };
  if (!isOpenCarShopItemEdit) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-2xl font=semibold mx-auto">Edit car shop item</h3>
            <button
              type="button"
              onClick={() => setIsOpenCarShopItemEdit(false)}
              className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm inline-flex items-center"
              data-modal-hide="defaultModal">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="relative p-4 flex-auto">
            <form className="px-8 w-full" onSubmit={handleSubmitCarShopItemEdit}>
              <div className="grid grid-cols-2 w-72 lg:w-96">
                <label className="block text-sm font-medium text-black mt-3">Title</label>
                <input
                  defaultValue={carShopItem.title}
                  name="title"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block h-36 text-sm font-medium text-black mt-3">
                  Description
                </label>
                <textarea
                  defaultValue={carShopItem.description}
                  name="description"
                  className="resize-none shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">Price</label>
                <input
                  defaultValue={carShopItem.price}
                  name="price"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">Quantity</label>
                <input
                  defaultValue={carShopItem.quantity}
                  name="quantity"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">Image</label>
                <input
                  type="file"
                  name="image"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                />
                <label className="block text-sm font-medium text-black mt-3">Category</label>
                <select
                  defaultValue={carShopItem.category}
                  name="category"
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black focus:ring-blue-500 focus:border-blue-500 ">
                  <option value={""} selected disabled>
                    Select...
                  </option>
                  {itemCategory.map((item) => (
                    <option key={item.category}>{item.category}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center items-center mt-6 col-span-2">
                <button
                  className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1"
                  type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCarShopItem;
