import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { ShoppingCartIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ShopContext from "../../../../context/userContext/ShopProvider.tsx";
function CarShopItemDetails() {
  const {
    isOpenCarShopItemDetails,
    setIsOpenCarShopItemDetails,
    carShopItem,
    quantity,
    setQuantity,
    userCartItems,
    setUserCartItems,
    itemsInCart,
    setItemsInCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext<any>(ShopContext);

  const addToCart = () => {
    let checkItemsInCart = userCartItems.filter((item) => item.id === carShopItem._id);
    if (checkItemsInCart.length === 0) {
      setUserCartItems([
        ...userCartItems,
        {
          id: carShopItem._id,
          title: carShopItem.title,
          src: carShopItem.src,
          price: carShopItem.price,
          quantity: quantity,
          totalQuantity: carShopItem.quantity,
          timeWhenAdded: Date.now()
        }
      ]);
      setItemsInCart(itemsInCart + 1);
      localStorage.setItem("cart", JSON.stringify(userCartItems));
      setIsOpenCarShopItemDetails(false);
    } else {
      console.log("This item is already in your cart!");
    }
  };
  if (!isOpenCarShopItemDetails) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-2 border-gray-400 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-between p-6 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold mx-auto">Product details</h3>
            <button
              type="button"
              onClick={() => setIsOpenCarShopItemDetails(false)}
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
            <div className="grid grid-cols-1 gap-x-6 max-w-md">
              <div className="text-center">
                <div>
                  <img className="mx-auto" src={carShopItem.src} alt={carShopItem.title}></img>
                </div>
                <div className="font-semibold mt-4">{carShopItem.title}</div>
                <div className="text-blue-600 mt-2">{carShopItem.price}</div>
                <div>{carShopItem.description}</div>
                {carShopItem.quantity !== "0" && carShopItem.quantity !== undefined ? (
                  <div className="grid grid-cols-2 mx-auto w-48 mt-4">
                    <div className="mx-auto">
                      <button
                        onClick={() => decreaseQuantity()}
                        disabled={quantity === 1}
                        className="bg-blue-500 hover:bg-blue-600 h-6 w-6 rounded-full text-white">
                        <MinusIcon className="w-6 h-6" />
                      </button>
                      <input
                        defaultValue={quantity}
                        value={quantity}
                        name="quantity"
                        className="shadow appearance-none border rounded w-12 h-6 text-black"
                      />
                      <button
                        onClick={() => increaseQuantity()}
                        disabled={carShopItem.quantity === String(quantity)}
                        className="bg-blue-500 hover:bg-blue-600 h-6 w-6 rounded-full text-white">
                        <PlusIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => addToCart()}
                        className="bg-blue-500 hover:bg-blue-600 mb-2 h-8 w-12 rounded-full text-white">
                        <ShoppingCartIcon className="w-8 h-6 mx-auto" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-red-500">Item is currently unavailable</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarShopItemDetails;
