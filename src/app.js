import logo from "./logo.svg";
import "./App.css";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Container,
  VisuallyHidden,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/react";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  MoralisProvider,
} from "react-moralis";
import { useState, useEffect } from "react";

const SignUp = () => {
  const { signup } = useMoralis();

  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //var username = firstname + " " + lastname;

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="First name"
                    type="text"
                    value={firstname}
                    onChange={(event) => setFirst(event.currentTarget.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    placeholder="Last name"
                    type="text"
                    value={lastname}
                    onChange={(event) => setLast(event.currentTarget.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <InputRightElement h={"full"}></InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => signup(email, password, email)}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

const Login = () => {
  const { login, user } = useMoralis();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Flex
      minH={"50vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"7xl"} textAlign={"center"}>
            E-Voting
          </Heading>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <InputRightElement h={"full"}></InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => login(username, password)}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>Not registered?</Text>
            </Stack>
          </Stack>
        </Box>
        <Text>
          Note: You must verify your email before accessing your account
        </Text>
      </Stack>
    </Flex>
  );
};

function App() {
  const {
    authenticate,
    isAuthenticated,
    logout,
    user,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { web3 } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3();
      console.log("Starting Web3");
    } else {
      console.log("Web3 Enabled");
    }
  }, [isWeb3Enabled, isWeb3EnableLoading]);

  // const EnableWeb3 = ({ user }) => {
  //   const {
  //     web3,
  //     enableWeb3,
  //     isWeb3Enabled,
  //     isWeb3EnableLoading,
  //     web3EnableError,
  //   } = useMoralis();

  //   if (isWeb3Enabled) {
  //     return null;
  //   }
  // };

  const ABI = require("./Election.json");

  //const contractProcessor = useWeb3ExecuteFunction();
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: ABI.abi,
    contractAddress: "0x4998Df3A25f117badF535EAD8AA673F68326ee9b",
    functionName: "createElection",
    params: {
      _name: ["John", "Mary"],
    },
  });

  console.log(data);

  if (isAuthenticated && user) {
    //await Moralis.enableWeb3();

    //const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction();

    let options = {
      abi: ABI.abi,
      contractAddress: "0x4998Df3A25f117badF535EAD8AA673F68326ee9b",
      functionName: "createElection",
      params: {
        _name: ["John", "Mary"],
      },

    };

    return (
      <Container>
        <Heading>
          Hello {user.attributes.username}, Welcome to the E-Voting Hub
        </Heading>
        <Button
          onClick={() => fetch({ params: options })}
          disabled={isFetching}
        >
          Fetch data
        </Button>
        <VisuallyHidden>{JSON.stringify(data)}</VisuallyHidden>
        <Button onClick={() => logout()}>Logout</Button>
      </Container>
    );
  } else if (isAuthenticated && user) {
    return (
      <Container align={"center"} spacing={4}>
        <Heading>Please verify your email to access your account</Heading>
        <Button onClick={() => logout()}>Logout</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button onClick={() => authenticate()}>Authenticate</Button>
      <Login />
      <SignUp />
    </Container>
  );
}

export default App;
