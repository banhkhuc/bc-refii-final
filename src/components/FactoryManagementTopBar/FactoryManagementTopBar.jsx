import { Flex, Heading, Button, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import EditFactory from "../EditFactory";

const FactoryManagementTopBar = () => {
  const [isEditFactory, setIsEditFactory] = useState(false);

  return (
    <Flex wrap={["wrap", "nowrap"]} justify={"space-between"} align={"center"}>
      <Heading flex={["100%", "none"]} mb={["8px", 0]} fontSize={"1.5rem"}>
        Quản lý danh sách cơ sở
      </Heading>
      <Button
        flex={["100%", "none"]}
        leftIcon={<Icon color={"white"} as={HiPlus} fontSize={"1.5rem"} />}
        // colorScheme={"blue"}
        // color={"white"}
        variant={"solid"}
        onClick={() => setIsEditFactory(true)}
      >
        Thêm cơ sở
      </Button>
      <EditFactory
        {...{
          isEditFactory,
          setIsEditFactory,
          typeEdit: "add",
        }}
      />
    </Flex>
  );
};

export default FactoryManagementTopBar;
