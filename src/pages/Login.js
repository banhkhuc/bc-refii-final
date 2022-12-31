// import React from "react";
// import {
//   Flex,
//   Heading,
//   Input,
//   Button,
//   FormControl,
//   FormLabel,
//   Switch,
//   useColorMode,
//   useColorModeValue,
// } from "@chakra-ui/react";

// const Login = () => {
//   const { toggleColorMode } = useColorMode();
//   const formBackground = useColorModeValue("gray.100", "gray.700");

//   return (
//     <Flex h="100vh" alignItems="center" justifyContent="center">
//       <Flex
//         flexDirection="column"
//         bg={formBackground}
//         p={12}
//         borderRadius={8}
//         boxShadow="lg"
//       >
//         <Heading mb={6}>BC LAPTOP</Heading>
//         <Input placeholder="Nhập email" type="email" variant="filled" mb={3} />
//         <Input
//           placeholder="Nhập mật khẩu"
//           type="password"
//           variant="filled"
//           mb={6}
//         />
//         <Button colorScheme="teal" mb={8}>
//           Đăng nhập
//         </Button>
//         <FormControl display="flex" alignItems="center">
//           <FormLabel htmlFor="dark_mode" mb="0">
//             Dark Mode?
//           </FormLabel>
//           <Switch
//             id="dark_mode"
//             colorScheme="teal"
//             size="lg"
//             onChange={toggleColorMode}
//           />
//         </FormControl>
//       </Flex>
//     </Flex>
//   );
// };

// export default Login;
import { useContext, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  ChakraProvider,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { loginApi } from "../api/accountApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../stores";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [userState, userDispatch] = useContext(UserContext);
  const handleShowClick = () => setShowPassword(!showPassword);

  let navigate = useNavigate();

  const handleNavigate = () => {
    switch (sessionStorage.getItem("userRole")) {
      case "admin":
        navigate("/manage-accounts");
        break;
      case "produce":
        navigate("/facility/manage-store");
        break;
      case "distribute":
        // navigate("/manage-accounts");
        break;
      case "guarantee":
        navigate("/manage-guarantee");
        break;
      default:
        break;
    }
  };

  handleNavigate();

  const handleSubmit = (values) => {
    const login = async (data) => {
      const response = await loginApi(data);
      console.log("res in login", response);
      const type = typeof response;

      if (response.status === 200) {
        // console.log("login success", response);
        // console.log("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        const {
          Facility: { type },
        } = response.data.user;
        sessionStorage.setItem("userRole", type);
        // userDispatch({
        //   type: "login",
        //   payload: { FacilityId, type, account, email, fullName },
        // });
        setTimeout(() => handleNavigate(type), 2000);
      } else if (response.status === 404) {
        console.log("login error", response);
      }
    };

    const data = {
      account: values.account,
      password: values.password,
    };
    console.log("data: " + JSON.stringify(data));
    login(data);
  };

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: yup.object({
      account: yup.string().required("This field is required."),
      password: yup.string().required("This field is required."),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isInvalid={formik.errors.account}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    name="account"
                    type="email"
                    placeholder="Nhập email"
                    style={{
                      color: "black",
                      border: "1px solid black",
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.account}
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.account}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.password}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    style={{
                      color: "black",
                      border: "1px solid black",
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Nhập mật khẩu"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Ẩn" : "Hiện"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                <FormHelperText textAlign="right">
                  <Link>Quên mật khẩu?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={formik.handleSubmit}
              >
                Đăng nhập
              </Button>
            </Stack>
          </Box>
        </Stack>
        <Box>
          New to us?{" "}
          <Link color="teal.500" href="#">
            Sign Up
          </Link>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
