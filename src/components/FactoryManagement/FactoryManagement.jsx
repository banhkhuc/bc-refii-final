import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useContext } from "react";
import { FactoryContext } from "../../stores";
import FactoryList from "./FactoryList";

const FactoryManagement = () => {
  const factories = useContext(FactoryContext)[0];
  const filterData = (type) => {
    let newData = factories.filter((factory) => {
      return factory.type === type;
    });
    return newData;
  };

  return (
    <Tabs p={["0", "16px"]} mt={["16px"]}>
      <TabList>
        <Tab>Cơ sở sản xuất</Tab>
        <Tab>Đại lý phân phối</Tab>
        <Tab>Trung tâm bảo hành</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <FactoryList factories={filterData("produce")} />
        </TabPanel>
        <TabPanel>
          <FactoryList factories={filterData("distribute")} />
        </TabPanel>
        <TabPanel>
          <FactoryList factories={filterData("guarantee")} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FactoryManagement;
