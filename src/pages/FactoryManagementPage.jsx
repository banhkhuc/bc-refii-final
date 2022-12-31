import { Box } from "@chakra-ui/react";
import FactoryManagement from "../components/FactoryManagement";
import FactoryManagementTopBar from "../components/FactoryManagementTopBar";
import { useEffect, useContext } from "react";
import { FactoryContext } from "../stores";

const FactoryManagementPage = () => {
  const [factories, getFactories] = useContext(FactoryContext);

  useEffect(() => {
    getFactories();
  }, []);

  return (
    <Box m={["16px"]}>
      {factories && (
        <>
          <FactoryManagementTopBar />
          <FactoryManagement />
        </>
      )}
    </Box>
  );
};

export default FactoryManagementPage;
