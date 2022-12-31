import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  CheckboxGroup,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import { getUsersApi } from "../api/accountApi";

const userData = [
  {
    id: 1,
    name: "A",
    address: "Ha Noi",
    orders: 1,
    lastOrder: "123456",
    total: "100.000",
  },
  {
    id: 2,
    name: "B",
    address: "Ha Noi",
    orders: 1,
    lastOrder: "123456",
    total: "100.000",
  },
  {
    id: 3,
    name: "C",
    address: "Ha Noi",
    orders: 1,
    lastOrder: "123456",
    total: "100.000",
  },
  {
    id: 4,
    name: "D",
    address: "Ha Noi",
    orders: 1,
    lastOrder: "123456",
    total: "100.000",
  },
];

const ManageAccount = () => {
  const [users, setUsers] = useState([]);

  const [accounts, setAccounts] = useState();

  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    // console.log('click on create')
    navigate(`/create-account`);
  };

  const token = localStorage.getItem("token");
  console.log("token", token);
  useEffect(() => {
    getUsersApi(token, setAccounts);
  }, []);
  console.log("account", accounts);

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
        Manage Accounts
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
            Danh sách tài khoản
          </h2>
          <Button
            leftIcon={<AddIcon />}
            // colorScheme="blue"
            variant="solid"
            style={{ marginRight: "20px" }}
            onClick={handleClick}
          >
            Tạo tài khoản
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
                placeholder="Thêm điều kiện lọc"
                style={{
                  marginRight: "20px",
                  // color: "black",
                  border: "1px solid black",
                }}
                p={1}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              <InputGroup className="input-comp" style={{ color: "black" }}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" className="icon" />}
                />
                <Input
                  type="text"
                  placeholder="Tìm kiếm"
                  style={{
                    marginTop: "4px",
                    marginBottom: "2px",
                    border: "1px solid black",
                  }}
                />
              </InputGroup>
            </Stack>
          </form>

          <TableContainer className="table">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="allSelect"
                      // checked={
                      //   users.filter((user) => user?.isChecked !== true).length < 1
                      // }
                      checked={!users.some((user) => user?.isChecked !== true)}
                      onChange={handleChange}
                    />
                  </Th>
                  <Th>Tên cơ sở</Th>
                  <Th>Tài khoản</Th>
                  <Th>Email</Th>
                  <Th>Loại tài khoản</Th>
                </Tr>
              </Thead>
              <Tbody>
                {accounts === undefined ? (
                  <p>There is no accounts.</p>
                ) : (
                  accounts.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={item.fullName}
                          checked={item?.isChecked}
                          onChange={handleChange}
                        />
                      </Td>
                      <Td>{item.Facility.name}</Td>
                      <Td>{item.account}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.Facility.type}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default ManageAccount;
