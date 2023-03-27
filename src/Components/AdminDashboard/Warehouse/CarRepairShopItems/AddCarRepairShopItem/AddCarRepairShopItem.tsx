import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import WarehouseContext from "../../../../context/adminContext/WarehouseProvider.tsx";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function AddCarRepairShopItem() {
  const {
    isOpenAddCarRepairShopItem,
    setIsOpenAddCarRepairShopItem,
    itemCategory,
    getCarRepairShopItems
  } = useContext<any>(WarehouseContext);
  interface IFormInput {
    title: Blob;
    description: Blob;
    price: Blob;
    quantity: Blob;
    image: Object;
    category: Blob;
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInput>({ criteriaMode: "all" });

  const handleSubmitCarRepairShopItem: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("image", data.image[0]);
    formData.append("category", data.category);
    const config = {
      headers: {
        "content-type": "image/jpg, image/png, image/jpeg, image/webp"
      }
    };
    try {
      await axios
        .post("/dashboard/admin/warehouse/carrepairshopitems/add", formData, config)
        .then((res) => {
          if (res.status === 201) {
            setIsOpenAddCarRepairShopItem(false);
            getCarRepairShopItems();
            toast.success(res.data);
          }
        });
    } catch (err) {
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  if (!isOpenAddCarRepairShopItem) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-2xl font=semibold mx-auto">Add new car repair shop item</h3>
            <button
              type="button"
              onClick={() => setIsOpenAddCarRepairShopItem(false)}
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
            <form className="px-8 w-full" onSubmit={handleSubmit(handleSubmitCarRepairShopItem)}>
              <div className="grid grid-cols-2 w-72 lg:w-96">
                <div>
                  <label className="block text-sm font-medium text-black mt-3">Title</label>
                </div>
                <div>
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p className="text-sm text-red-500" key={type}>
                          {message}
                        </p>
                      ))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black mt-3">Description</label>
                </div>
                <div>
                  <textarea
                    {...register("description", { required: "Description is required" })}
                    className="h-36 resize-none shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="description"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p className="text-sm text-red-500" key={type}>
                          {message}
                        </p>
                      ))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mt-3">Price</label>
                </div>
                <div>
                  <input
                    {...register("price", {
                      required: "Price is required",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "This input is number only"
                      }
                    })}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="price"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p className="text-sm text-red-500" key={type}>
                          {message}
                        </p>
                      ))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mt-3">Quantity</label>
                </div>
                <div>
                  <input
                    {...register("quantity", {
                      required: "Quantity is required",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "This input is number only"
                      }
                    })}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="quantity"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p className="text-sm text-red-500" key={type}>
                          {message}
                        </p>
                      ))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mt-3">Image</label>
                </div>
                <div>
                  <input
                    type="file"
                    {...register("image", { required: "Image is required" })}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="image"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p className="text-sm text-red-500" key={type}>
                          {message}
                        </p>
                      ))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mt-3">Category</label>
                </div>
                <div>
                  <select
                    {...register("category", { required: "Category is required" })}
                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-1 text-black focus:ring-blue-500 focus:border-blue-500 ">
                    <option value={""} selected disabled>
                      Select...
                    </option>
                    {itemCategory.map((item) => (
                      <option key={item.category}>{item.category}</option>
                    ))}
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="category"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p className="text-sm text-red-500" key={type}>
                          {message}
                        </p>
                      ))
                    }
                  />
                </div>
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

export default AddCarRepairShopItem;
