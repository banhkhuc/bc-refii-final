import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { addFactoryAPI } from "../../api/factoryApi";
import { FactoryContext } from "../../stores";

const EditFactory = ({
  isEditFactory,
  setIsEditFactory,
  typeEdit = "edit",
  id,
  name = "",
  address = "",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [inputName, setInputName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [type, setType] = useState("produce");
  const getFactories = useContext(FactoryContext)[1];

  useEffect(() => {
    if (isEditFactory) {
      onOpen();
      setInputName(name);
      setInputAddress(address);
    } else {
      onClose();
    }
  }, [isEditFactory]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditFactory(false);
    }
  }, [isOpen, setIsEditFactory]);

  const handleSaveFactory = async () => {
    const updateFactory = async () => {
      setShowSpinner(true);
      const formData = new FormData();
      formData.append("name", inputName);
      formData.append("address", inputAddress);
    };

    const addFactory = async () => {
      setShowSpinner(true);
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
          title: "Thêm cơ sở thành công",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "Thêm cơ sở thất bại",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };

    switch (typeEdit) {
      case "edit":
        await updateFactory();
        break;
      case "add":
        await addFactory();
        break;
      default:
        break;
    }
    setShowSpinner(false);
    getFactories();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        pos={"relative"}
        bgColor={"#2d3748"}
        color={"white"}
        m={["80px 24px 0", "80px 24px 0"]}
      >
        <ModalHeader>
          {typeEdit === "edit" ? "Chỉnh sửa cơ sở" : "Thêm cơ sở"}
        </ModalHeader>
        <ModalCloseButton />
        {showSpinner && (
          <Flex
            pos={"absolute"}
            boxSize={"100%"}
            justify="center"
            align={"center"}
          >
            <Spinner thickness="4px" size={"xl"} speed={"0.6s"} />
          </Flex>
        )}
        <ModalBody>
          <Box m={"0 0 8px"}>Tên</Box>
          <Input
            type={"text"}
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          />
          <Box m={"16px 0 8px"}>Địa chỉ</Box>
          <Input
            type={"text"}
            value={inputAddress}
            onChange={(e) => {
              setInputAddress(e.target.value);
            }}
          />
          {typeEdit === "add" && (
            <>
              <Box m={"16px 0 8px"}>Loại</Box>
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
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            w={["100%", "initial"]}
            colorScheme={"blue"}
            mr={6}
            onClick={handleSaveFactory}
          >
            Lưu
          </Button>
          <Button w={["100%", "initial"]} onClick={onClose} colorScheme="red">
            Hủy bỏ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditFactory;
