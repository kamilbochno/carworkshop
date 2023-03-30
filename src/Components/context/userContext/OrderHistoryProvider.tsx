import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import LoadingContext from "../LoadingProvider.tsx";

const OrderHistoryContext = createContext({});

export const OrderHistoryProvider = ({ children }) => {
  const { setIsLoading } = useContext<any>(LoadingContext);
  const [isOpenDetailsOrder, setIsOpenDetailsOrder] = useState(false);
  const [isOpenDetailsPurchase, setIsOpenDetailsPurchase] = useState(false);

  const [order, setOrder] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [purchase, setPurchase] = useState<any>([]);
  const [purchases, setPurchases] = useState<any>([]);

  const getRecentPurchases = () => {
    setIsLoading(true);
    axios.get("/dashboard/admin/recentpurchases").then((response) => {
      let purchaseData = response.data;
      setPurchases(purchaseData);
      setIsLoading(false);
    });
  };

  const getOrderHistory = () => {
    setIsLoading(true);
    axios.get("/dashboard/orderhistory").then((response) => {
      let orderData = response.data;
      setOrders(orderData);
      setIsLoading(false);
    });
  };
  return (
    <OrderHistoryContext.Provider
      value={{
        isOpenDetailsOrder,
        setIsOpenDetailsOrder,
        order,
        setOrder,
        orders,
        setOrders,
        getOrderHistory,
        purchase,
        setPurchase,
        purchases,
        setPurchases,
        getRecentPurchases,
        isOpenDetailsPurchase,
        setIsOpenDetailsPurchase
      }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export default OrderHistoryContext;
