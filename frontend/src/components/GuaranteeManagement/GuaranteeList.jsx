import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
  Flex,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { GuaranteeContext } from "../../stores";
import GuaranteeItem from "./GuaranteeItem";

const GuaranteeList = () => {
  const [guaranteeProducts, getGuaranteeProducts] =
    useContext(GuaranteeContext);
  const [filterGuaranteeProducts, setFilterGuaranteeProducts] = useState();

  const [typeSearch, setTypeSearch] = useState("name");
  const input = useRef(null);

  useEffect(() => {
    getGuaranteeProducts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [guaranteeProducts]);

  const handleSelectTypeSearch = (e) => {
    if (e.target.value === "all") {
      setFilterGuaranteeProducts(guaranteeProducts);
    }
    setTypeSearch(e.target.value);
  };

  const handleSearch = () => {
    if (!guaranteeProducts) {
      return;
    }
    if (typeSearch === "all") {
      setFilterGuaranteeProducts(guaranteeProducts);
      return;
    }
    if (input.current) {
      const query = input.current.value.toUpperCase();
      const newFilterGuaranteeProducts = guaranteeProducts.filter((factory) =>
        factory.Product.ProductLine[typeSearch].toUpperCase().includes(query)
      );
      setFilterGuaranteeProducts(newFilterGuaranteeProducts);
    }
  };

  const debounceSearch = useCallback((callback, timeout) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(this, args);
      }, timeout);
    };
  }, []);

  return (
    <Box mt={"12px"}>
      <Flex mb={"12px"} wrap={"wrap"}>
        <Select
          flex={["100%", 1]}
          mr={[0, "8px"]}
          mb={["8px", 0]}
          borderRadius={"5px"}
          onChange={handleSelectTypeSearch}
        >
          <option value="all">T???t c???</option>
          <option value="name">T??n s???n ph???m</option>
          <option value="guarantee">Trung t??m b???o h??nh</option>
        </Select>
        <InputGroup flex={["100%", 1]}>
          <InputLeftElement
            pointerEvents="none"
            children={<BsSearch color="gray.300" />}
          />
          <Input
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") debounceSearch(handleSearch())();
            }}
            type="text"
            placeholder="T??m ki???m"
          />
        </InputGroup>
      </Flex>
      {filterGuaranteeProducts &&
        (filterGuaranteeProducts.length === 0 ? (
          "Hi???n t???i kh??ng c?? s???n ph???m n??o ???????c b???o h??nh"
        ) : (
          <TableContainer>
            <Table variant={"striped"} colorScheme={"teal"}>
              <Thead>
                <Tr fontWeight={800}>
                  <Th>S??? Serial</Th>
                  <Th>T??n s???n ph???m</Th>
                  <Th>Ng??y s???n xu???t</Th>
                  <Th>Ng??y ti???p nh???n</Th>
                  <Th>Th???i gian b???o h??nh</Th>
                  <Th>Trung t??m b???o h??nh</Th>
                  {/* <Th>?????i l?? ph??n ph???i</Th> */}
                  <Th>Lo???i l???i</Th>
                  <Th>Tr???ng th??i</Th>
                  <Th>X??? l?? b???o h??nh xong</Th>
                  <Th>X??? l?? s???n ph???m l???i</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filterGuaranteeProducts.map((guaranteeProduct, index) => {
                  return <GuaranteeItem key={index} {...guaranteeProduct} />;
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ))}
    </Box>
  );
};

export default GuaranteeList;
