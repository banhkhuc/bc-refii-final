import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFactoryAPI } from "../../api/factoryApi";
import { FactoryContext } from "../../stores";

const AddFacility = () => {
  const [inputName, setInputName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [type, setType] = useState("produce");
  const getFactories = useContext(FactoryContext)[1];
  const toast = useToast();
  const navigate = useNavigate();

  const handleSaveFactory = async () => {
    const addFactory = async () => {
      const newFactory = {
        name: inputName,
        type,
        address: inputAddress,
        imageUrl: "",
      };
      const res = await addFactoryAPI(newFactory);
      if (res.status === 201) {
        toast({
          position: "top",
          title: "Thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "Thất bại",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };
    await addFactory();
    getFactories();
    navigate("/manage-factory");
  };

  return (
    <Box>
      <FormControl>
        <FormLabel m={"0 0 8px"}>Tên cơ sở</FormLabel>
        <Input
          type={"text"}
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        />
        <FormLabel m={"16px 0 8px"}>Địa chỉ</FormLabel>
        <Input
          type={"text"}
          value={inputAddress}
          onChange={(e) => {
            setInputAddress(e.target.value);
          }}
        />
        <FormLabel m={"16px 0 8px"}>Loại cơ sở</FormLabel>
        <Select
          flex={1}
          borderRadius={"5px"}
          onChange={(e) => setType(e.target.value)}
          bgColor={"#2d3748"}
          mb={"16px"}
        >
          <option style={{ background: "#2d3748" }} value="produce">
            Cơ sở sản xuất
          </option>
          <option style={{ background: "#2d3748" }} value="distribute">
            Đại lý phân phối
          </option>
          <option style={{ background: "#2d3748" }} value="guarantee">
            Trung tâm bảo hành
          </option>
        </Select>
      </FormControl>
      <Flex mt={[10, 0]} wrap={"wrap"}>
        <Button
          flex={["100%", "1"]}
          colorScheme={"blue"}
          mr={[0, 6]}
          mb={[3, 0]}
          onClick={handleSaveFactory}
        >
          Lưu
        </Button>
        <Button
          flex={["100%", "1"]}
          onClick={() => navigate("/manage-factory")}
          colorScheme="red"
        >
          Trở lại
        </Button>
      </Flex>
    </Box>
  );
};

export default AddFacility;
