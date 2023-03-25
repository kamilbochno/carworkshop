import React from "react";
import { createContext, useState } from "react";
import axios from "axios";

const WarehouseContext = createContext({});

export const WarehouseProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [carRepairShopItems, setCarRepairShopItems] = useState<any>([]);
  const [carRepairShopItem, setCarRepairShopItem] = useState<any>([]);
  const [carShopItems, setCarShopItems] = useState<any>([]);
  const [carShopItem, setCarShopItem] = useState<any>([]);

  const [searchCarRepairShopItems, setSearchCarRepairShopItems] = useState<any>([]);
  const [searchCarShopItems, setSearchCarShopItems] = useState<any>([]);

  const [isOpenAddCarRepairShopItem, setIsOpenAddCarRepairShopItem] = useState(false);
  const [isOpenAddCarShopItem, setIsOpenAddCarShopItem] = useState(false);
  const [isOpenCarRepairShopItemDetails, setIsOpenCarRepairShopItemDetails] = useState(false);
  const [isOpenCarShopItemDetails, setIsOpenCarShopItemDetails] = useState(false);
  const [isOpenCarRepairShopItemEdit, setIsOpenCarRepairShopItemEdit] = useState(false);
  const [isOpenCarShopItemEdit, setIsOpenCarShopItemEdit] = useState(false);
  const [isOpenCarRepairShopItemDelete, setIsOpenCarRepairShopItemDelete] = useState(false);
  const [isOpenCarShopItemDelete, setIsOpenCarShopItemDelete] = useState(false);
  const [carRepairShopItemsCategory, setCarRepairShopItemsCategory] = useState("");
  const [carShopItemsCategory, setCarShopItemsCategory] = useState("");

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

  const getCarRepairShopItems = () => {
    axios.get("/dashboard/admin/warehouse/carrepairshopitems").then((response) => {
      const data = response.data;
      setCarRepairShopItems(data);
      setSearchCarRepairShopItems(data);
    });
  };

  const getCarShopItems = () => {
    axios.get("/dashboard/admin/warehouse/carshopitems").then((response) => {
      const data = response.data;
      setCarShopItems(data);
      setSearchCarShopItems(data);
    });
  };

  const handleSelectCarRepairItemsCategory = (event) => {
    const newData = carRepairShopItems.filter((item) => item.category.includes(event.target.value));
    console.log(searchCarRepairShopItems);
    setCarRepairShopItemsCategory(event.target.value);
    setSearchCarRepairShopItems(newData);
  };

  const handleSelectCarItemsCategory = (event) => {
    const newData = carShopItems.filter((item) => item.category.includes(event.target.value));
    console.log(searchCarRepairShopItems);
    setCarShopItemsCategory(event.target.value);
    setSearchCarShopItems(newData);
  };

  return (
    <WarehouseContext.Provider
      value={{
        search,
        setSearch,
        carRepairShopItemsCategory,
        setCarRepairShopItemsCategory,
        carShopItemsCategory,
        setCarShopItemsCategory,
        carRepairShopItems,
        setCarRepairShopItems,
        carShopItems,
        carShopItem,
        setCarShopItem,
        setCarShopItems,
        searchCarRepairShopItems,
        setSearchCarRepairShopItems,
        searchCarShopItems,
        setSearchCarShopItems,
        isOpenAddCarShopItem,
        setIsOpenAddCarShopItem,
        isOpenAddCarRepairShopItem,
        setIsOpenAddCarRepairShopItem,
        isOpenCarRepairShopItemDetails,
        setIsOpenCarRepairShopItemDetails,
        isOpenCarShopItemDetails,
        isOpenCarShopItemEdit,
        isOpenCarShopItemDelete,
        setIsOpenCarShopItemDelete,
        setIsOpenCarShopItemEdit,
        isOpenCarRepairShopItemEdit,
        setIsOpenCarRepairShopItemEdit,
        isOpenCarRepairShopItemDelete,
        setIsOpenCarRepairShopItemDelete,
        setIsOpenCarShopItemDetails,
        itemCategory,
        getCarRepairShopItems,
        getCarShopItems,
        carRepairShopItem,
        setCarRepairShopItem,
        handleSelectCarRepairItemsCategory,
        handleSelectCarItemsCategory
      }}>
      {children}
    </WarehouseContext.Provider>
  );
};

export default WarehouseContext;
