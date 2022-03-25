import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Nav from "./Sidebar";
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
  extendTheme,
  ChakraProvider,
  ViewOffIcon,
} from "@chakra-ui/react";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  MoralisProvider,
} from "react-moralis";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import GetCandidate from "./GetCandidate";



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

  let candidates = [{ name: "Default Candidate", voteCount: 0 }, { name: "Default Candidate Test", voteCount: 0 }];
  let candidate = { name: "Default", voteCount: 0 };

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

  //console.log(parseInt(data[2]._hex));

  if (isAuthenticated && user) {

    let options = {
      abi: ABI.abi,
      contractAddress: "0xEC61594D28ead9ec79395C9d177A35BdA5217338",
      functionName: "getCandidate",
      params: {
        _elecID: 0,
        _candID: 0,
      },

    };

    return (
      <Container maxW='100%'>
        <Sidebar>
          <Heading align={"center"}>
            Default Election Name
        </Heading>
          {candidateEffect && <GetCandidate candidates={candidateEffect} />}
        </Sidebar>
      </Container>
    );
  } else if (isAuthenticated && !user) {
    return (
      <Container align={"center"} spacing={4}>
        <Heading>Please verify your email to access your account</Heading>

      </Container>
    );
  }

  return (

    <Container maxW='container.xl'>

      <Login></Login>
      <Button onClick={() => authenticate()}>Authenticate Wallet</Button>
      <SignUp></SignUp>





    </Container>

  );
}

export default App;
