import logo from "./logo.svg";
import "./App.css";
import DisplayCandidates from "./DisplayCandidates";

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

  const contractProcessor = useWeb3ExecuteFunction();
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: ABI.abi,
    contractAddress: "0xEC61594D28ead9ec79395C9d177A35BdA5217338",
    functionName: "getCandidate",
    params: {
      _elecID: 0,
      _candID: 0,
    },
  });

  let candidates = [{ name: "", voteCount: 0 }];
  let candidate = { name: "", voteCount: 0 };

  const [candidateEffect, setCandidates] = useState(null);


  //Fetching data from the Polygon blockcahin
  //useEffect used to avoid render errors while waiting for data to be retrieved
  useEffect(() => {
    if (!isFetching && !isLoading) {
      fetch();
      //console.log("Fetching data");
    } else if (data !== null) {
      console.log(data[0])
      candidate.name = data[0]
      candidate.voteCount = parseInt(data[2]._hex)
      console.log(candidate.voteCount)
      candidates.push(candidate)
      console.log(isFetching)

      setCandidates(candidates)
      console.log(candidateEffect)
      //console.log(isLoading)
    }
  }, [isLoading]);

  //console.log(data)

  // try {
  //   console.log(parseInt(data[2]._hex));
  // } catch (error) {
  //   console.log("Loading Data");
  // }

  //console.log(parseInt(data[2]._hex));

  if (isAuthenticated && user) {
    //await Moralis.enableWeb3();

    //const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction();

    let options = {
      abi: ABI.abi,
      contractAddress: "0xEC61594D28ead9ec79395C9d177A35BdA5217338",
      functionName: "getCandidate",
      params: {
        _elecID: 0,
        _candID: 0,
      },

    };



    //fetch()
    //console.log(data);


    //let lol = 0;

    return (
      <Container>
        <Heading>
          Hello {user.attributes.username}, Welcome to the E-Voting Hub
        </Heading>
        {candidateEffect && <DisplayCandidates candidates={candidateEffect} />}
        <Heading>{candidate.name}</Heading>
        <Heading>{candidate.voteCount}</Heading>
        <Button

        >
          Fetch data
        </Button>

        <Button onClick={() => logout()}>Logout</Button>
      </Container>
    );
  } else if (isAuthenticated && !user) {
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
