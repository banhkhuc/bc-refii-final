import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  Divider,
  Stack,
  useControllableProp,
  useControllableState,
  useDisclosure,
  theme,
  Grid,
  GridItem,
  Image,
  Center,
  Flex,
  Container,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  TableCaption,
  Select,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  SearchIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const productData = [];

const ProductManagement = () => {
  // using for checked Item
  const [checkedItems, setCheckedItems] = React.useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  // define Style for each
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#ffffff",
    },
    header: {
      color: "#20232a",
      textAlign: "left",
      fontSize: 20,
      fontWeight: "bold",
    },
    title: {
      color: "#A0AEC0",
      textAlign: "left",
      fontSize: 16,
      fontWeight: "bold",
    },
    backgroundColorTitle: {
      backgroundColor: "2B53A3",
    },
    textNormal: {
      fontSize: 15,
      textAlign: "left",
    },
    blueDivider: {},
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/factory/create-product`);
  };

  const handleClickEdit = () => {
    navigate(`/factory/edit-product`);
  };

  return (
    <div className="">
      <h1
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "36px",
        }}
      >
        Manage Products
      </h1>
      <ChakraProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "600",
              fontSize: "24px",
              marginLeft: "20px",
            }}
          >
            Danh sách sản phẩm
          </h2>
          <Button
            leftIcon={<AddIcon />}
            // colorScheme="blue"
            variant="solid"
            style={{ marginRight: "20px" }}
            onClick={handleClick}
          >
            Tạo sản phẩm
          </Button>
        </div>
        <Box
          p={4}
          style={{
            // backgroundColor: "white",
            marginBottom: "10px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        >
          <form className="input-form">
            <Stack direction="row" spacing={4}>
              <Select
                // borderColor="gray"
                placeholder="Thêm điều kiện lọc"
                style={{
                  marginRight: "20px",
                  //   color: "black",
                }}
                p={1}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              <InputGroup className="input-comp" borderColor="gray">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon className="icon" />}
                />
                <Input
                  type="text"
                  //   color="black"
                  placeholder="Tìm kiếm"
                  style={{
                    marginTop: "4px",
                    marginBottom: "2px",
                    // color: "black",
                  }}
                />
              </InputGroup>
            </Stack>
          </form>

          <TableContainer className="table">
            <Table size="lg" variant="striped">
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox defaultChecked></Checkbox>
                  </Th>
                  <Th>
                    <Text style={styles.title}>Ảnh</Text>
                  </Th>
                  <Th>
                    <Text style={styles.title}>Code</Text>
                  </Th>
                  <Th>
                    <Text style={styles.title}>Tên sản phẩm</Text>
                  </Th>
                  <Th>
                    <Text style={styles.title}>Thao tác</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {productData.map((product, index) => (
                  <Tr key={index}>
                    <Td>
                      <GridItem>
                        <Checkbox defaultChecked></Checkbox>
                      </GridItem>
                    </Td>
                    <Td>
                      <Image
                        boxSize="100px"
                        objectFit="cover"
                        src={product.imageURL}
                        alt={product.alt}
                      />
                    </Td>
                    <Td>{product.code}</Td>
                    <Td>{product.name}</Td>
                    <Td>
                      <Button
                        size="md"
                        height="27"
                        width="99"
                        borderColor="000000"
                        onClick={handleClickEdit}
                      >
                        Sửa thông tin
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default ProductManagement;
