import { getFactoriesAPI } from "../api/factoryApi";
import { useState, createContext, useCallback } from "react";
import { useToast } from "@chakra-ui/react";

export const FactoryContext = createContext([]);

const FactoryStore = ({ children }) => {
  const [factories, setFactories] = useState(null);
  const toast = useToast();

  const getFactories = useCallback(async () => {
    const res = await getFactoriesAPI();
    if (res.status === 200) {
      setFactories(res.data);
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
    <FactoryContext.Provider value={[factories, getFactories]}>
      {children}
    </FactoryContext.Provider>
  );
};

export { FactoryStore };
