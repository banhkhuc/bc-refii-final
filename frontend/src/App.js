import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageStore from "./pages/ManageStore";
import CreateAccount from "./pages/CreateAccount";
import ManageAccount from "./pages/ManageAccount";
import { FactoryManagementPage, GuaranteeManagementPage } from "./pages";
import ManageErrorProduct from "./pages/ManageErrorProduct";
import Login from "./pages/Login";
import { Stores } from "./stores";
import ProductManagement from "./pages/ProductManagement";
// import { DarkModeSwitch } from "../components/NavbarDarkmode";
import SidebarWithHeader from "./components/SidebarWithHeader";
import StatisticAdmin from "./pages/StatisticAdmin";
import StatisticAgent from "./pages/StatisticAgent";
import StatisticFacility from "./pages/StatisticFacility";
import StatisticWarranty from "./pages/StatisticWarranty";
import CreateProduct from "./pages/CreateProduct";
import AddFacility from "./components/AddFacility";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Stores>
        <BrowserRouter>
          <SidebarWithHeader>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route
                path="/factory/create-product"
                element={<CreateProduct />}
              />
              <Route path="/create-facility" element={<AddFacility />} />
              <Route path="/manage-accounts" element={<ManageAccount />} />
              <Route path="/manage-products" element={<ProductManagement />} />
              <Route path="/facility/manage-store" element={<ManageStore />} />
              <Route
                path="/facility/manage-error-product"
                element={<ManageErrorProduct />}
              />
              <Route
                path="/manage-factory"
                element={<FactoryManagementPage />}
              />
              <Route
                path="/manage-guarantee"
                element={<GuaranteeManagementPage />}
              />
              <Route path="/statistic-admin" element={<StatisticAdmin />} />
              <Route path="/statistic-agent" element={<StatisticAgent />} />
              <Route
                path="/statistic-facility"
                element={<StatisticFacility />}
              />
              <Route
                path="/statistic-warranty"
                element={<StatisticWarranty />}
              />
            </Routes>
          </SidebarWithHeader>
        </BrowserRouter>
      </Stores>
    </ChakraProvider>
  );
};

export default App;
