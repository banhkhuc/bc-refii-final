import {
  FormControl,
  FormLabel,
  Input,
  ChakraProvider,
  Select,
  Button,
  Stack,
  theme,
  Grid,
} from "@chakra-ui/react";
import { StyleSheet, View } from "react-native";

import { useState } from "react";

function CreateProduct() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      // backgroundColor: "#ffffff"
    },
    header: {
      color: "#20232a",
      textAlign: "left",
      fontSize: 20,
      fontWeight: "bold",
    },
  });
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  const handleClick = () => {};
  return (
    <ChakraProvider theme={theme}>
      <Grid style={styles.header} pb="4">
        Tạo sản phẩm
      </Grid>
      <View style={styles.container}>
        <Stack direction="column" spacing={4} align="center">
          <FormControl isRequired>
            <FormLabel>Tên sản phẩm</FormLabel>
            <Input placeholder="Nhập tên sản phẩm" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Số lượng</FormLabel>
            <Input placeholder="Nhập số lượng" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Nhập email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Số điện thoại</FormLabel>
            <Input placeholder="Nhập số điện thoại" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Ngày sinh</FormLabel>
            <Input placeholder="Chọn ngày sinh" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Giới tính</FormLabel>
            <Select placeholder="Chọn giới tính">
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Địa chỉ</FormLabel>
            <Input placeholder="Nhập địa chỉ" />
          </FormControl>
          <Button colorScheme="blue" onClick={handleClick}>
            Lưu
          </Button>
        </Stack>
      </View>
    </ChakraProvider>
  );
}

export default CreateProduct;
