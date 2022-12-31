import { Box } from "@chakra-ui/react";
import GuaranteeManagement from "../components/GuaranteeManagement";
import GuaranteeManagementTopBar from "../components/GuaranteeManagementTopBar";

const GuaranteeManagementPage = () => {
  return (
    <Box m={["16px"]}>
      <GuaranteeManagementTopBar />
      <GuaranteeManagement />
    </Box>
  );
};

export default GuaranteeManagementPage;
