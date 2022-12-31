import { Tr, Th, Box, useToast, Button } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { GuaranteeContext, UserContext } from "../../stores";
import { exportDistributeAPI, exportProduceAPI } from "../../api/guaranteeAPI";

const GuaranteeItem = ({
  Product,
  productCode,
  produceId,
  insuranceDate,
  error,
}) => {
  const toast = useToast();
  const { ProductLine } = Product;
  const getDate = useCallback((date) => {
    return date?.split("T").at(0).split("-").reverse().join("/");
  });
  const distribute_date = getDate(Product.createdAt);
  const guaranteeDate = getDate(insuranceDate);
  const userState = useContext(UserContext);
  const getGuaranteeProducts = useContext(GuaranteeContext)[1];

  const handleExportDistribute = useCallback(async () => {
    const data = { productCode };
    const res = await exportDistributeAPI(data);
    if (res.status === 200) {
      // toast({
      //   position: "top",
      //   title: "Chuyển về đại lý phân phối thành công",
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      // });
    } else {
      toast({
        position: "top",
        title: "Chuyển về đại lý phân phối thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    getGuaranteeProducts();
  }, []);

  const handleExportProduce = useCallback(async () => {
    const data = {
      productCode,
      produceId,
    };
    const res = await exportProduceAPI(data);
    if (res.status === 200) {
      // toast({
      //   position: "top",
      //   title: "Chuyển về cơ sở sản xuất thành công",
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      // });
    } else {
      toast({
        position: "top",
        title: "Thất bại",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    getGuaranteeProducts();
  }, []);

  return (
    <Tr>
      <Th>
        <Box whiteSpace={"normal"}>{Product.code}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{ProductLine.name}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{distribute_date}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{guaranteeDate}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{ProductLine.guaranteePeriod} tháng</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{userState.fullName}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{error}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{Product.status && "Đang bảo hành"}</Box>
      </Th>
      <Th>
        <Button onClick={handleExportDistribute}>Trả về đại lý</Button>
      </Th>
      <Th>
        <Button onClick={handleExportProduce}>Trả về cơ sở</Button>
      </Th>
    </Tr>
  );
};

export default GuaranteeItem;
