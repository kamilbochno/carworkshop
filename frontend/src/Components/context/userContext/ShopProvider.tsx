import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const ShopContext = createContext({});

export const ShopProvider = ({ children }) => {
  const [carShopItems, setCarShopItems] = useState<any>([]);
  const [carShopItem, setCarShopItem] = useState<any>([]);
  const [carShopItemsCategory, setCarShopItemsCategory] = useState<any>([]);
  const [searchCarShopItems, setSearchCarShopItems] = useState<any>([]);
  const [search, setSearch] = useState<any>([]);
  const [subtotal, setSubtotal] = useState<Number>(0);
  const [openCart, setIsOpenCart] = useState(false);
  const [userCartItems, setUserCartItems] = useState<any>([]);
  const [itemAvailable, setItemAvailable] = useState(true);
  const [isOpenCarShopItemDetails, setIsOpenCarShopItemDetails] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [itemsInCart, setItemsInCart] = useState<Number>(0);
  const itemCategory = [
    {
      category: "Car parts"
    },
    {
      category: "Car accessories"
    },
    {
      category: "Engine oil"
    },
    {
      category: "Car care"
    },
    {
      category: "Tyres"
    }
  ];

  const { setIsLoading } = useContext<any>(LoadingContext);

  const getCarShopItems = () => {
    setIsLoading(true);
    axios.get("/dashboard/shop/carshopitems").then((response) => {
      const data = response.data;
      setCarShopItems(data);
      setSearchCarShopItems(data);
      setIsLoading(false);
    });
  };

  const setCart = () => {
    const cart = userCartItems;
    axios.post("/dashboard/shop/savecart", cart).then((response) => {});
  };

  const getCart = () => {
    axios.post("/dashboard/shop/getcart").then((response) => {
      setUserCartItems(response.data);
      setItemsInCart(response.data.length);
    });
  };

  const handleSelectCarShopItemsCategory = (event) => {
    const newData = carShopItems.filter((item) => item.category.includes(event.target.value));
    setCarShopItemsCategory(event.target.value);
    setSearchCarShopItems(newData);
  };

  const estimateTotalPrice = () => {
    const totalPrice = userCartItems
      .map((item) => {
        return Number(item.quantity) * Number(item.price);
      })
      .reduce((a, b) => a + b, 0);
    setSubtotal(totalPrice);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <ShopContext.Provider
      value={{
        carShopItems,
        isOpenCarShopItemDetails,
        carShopItem,
        setCarShopItem,
        setIsOpenCarShopItemDetails,
        setCarShopItems,
        getCarShopItems,
        itemCategory,
        carShopItemsCategory,
        setSearchCarShopItems,
        search,
        setSearch,
        searchCarShopItems,
        handleSelectCarShopItemsCategory,
        quantity,
        setQuantity,
        itemsInCart,
        setItemsInCart,
        openCart,
        setIsOpenCart,
        subtotal,
        setSubtotal,
        userCartItems,
        setUserCartItems,
        itemAvailable,
        setItemAvailable,
        estimateTotalPrice,
        increaseQuantity,
        decreaseQuantity,
        setCart,
        getCart
      }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
