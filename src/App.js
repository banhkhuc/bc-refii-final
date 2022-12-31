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
            </Routes>
          </SidebarWithHeader>
        </BrowserRouter>
      </Stores>
    </ChakraProvider>
  );
};

export default App;
