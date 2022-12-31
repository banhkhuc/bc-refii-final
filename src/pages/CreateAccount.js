import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  ChakraProvider,
  Select,
  Button,
  Stack,
} from "@chakra-ui/react";

import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { createAccountApi } from "../api/accountApi";

function CreateAccount() {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  const handleSubmit = (values) => {
    const createAccount = async (data) => {
      const response = await createAccountApi(data, token);
      console.log("res in createAccount", response);
      const type = typeof response;

      if (response.status === 200) {
        console.log("createAccount success", response);
        console.log("token", response.data.token);
        // localStorage.setItem("token", response.data.token);
        setTimeout(navigate("/manage-accounts"), 2000);
      } else if (response.status === 404) {
        console.log("createAccount error", response);
      }
    };

    const data = {
      email: values.email,
      facility: values.facility,
    };
    console.log("data: " + JSON.stringify(data));
    createAccount(data);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      facility: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("This field is required."),
      facility: yup.number().integer().required("This field is required."),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div>
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
        Tạo tài khoản
      </h1>
      <div className="container">
        <ChakraProvider>
          <Stack direction="column" spacing={4} align="center">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Nhập email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>ID cơ sở</FormLabel>
              <Input
                placeholder="Nhập ID cơ sở"
                name="facility"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.facility}
              />
            </FormControl>

            <Button colorScheme="blue" onClick={formik.handleSubmit}>
              Lưu
            </Button>
          </Stack>
        </ChakraProvider>
      </div>
    </div>
  );
}

export default CreateAccount;
