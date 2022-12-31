import { getGuaranteeProductsAPI } from "../api/guaranteeAPI";
import { useState, createContext, useCallback } from "react";
import { useToast } from "@chakra-ui/react";

export const GuaranteeContext = createContext([]);

const GuaranteeStore = ({ children }) => {
  const [guaranteeProducts, setGuaranteeProducts] = useState(null);
  const toast = useToast();

  const getGuaranteeProducts = useCallback(async () => {
    const res = await getGuaranteeProductsAPI();
    if (res.status === 200) {
      console.log("guarantee api", res.data.rows);
      setGuaranteeProducts(res.data.rows);
    } else {
      toast({
        position: "top",
        title: "Fetch data fail",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, []);

  return (
    <GuaranteeContext.Provider
      value={[guaranteeProducts, getGuaranteeProducts]}
    >
      {children}
    </GuaranteeContext.Provider>
  );
};

export { GuaranteeStore };
