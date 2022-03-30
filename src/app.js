import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import LoginButton from "./Auth0Reg";
import SignUp from "./SignUp";
import Nav from "./Sidebar";
import DisplayCandidates from "./DisplayCandidates";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
    contractAddress: "0xD652a606953d87A58657da31F670Ba522Fd4F2D1",
    functionName: "getCandidates",
    params: {
      _elecID: 0,

    },
  });

  let candidates = [{ name: "Default Candidate", voteCount: 0 }, { name: "Default Candidate Test", voteCount: 0 }];
  let candidate = { name: "Default", voteCount: 0, info: "Deafault info" };

  const [candidateEffect, setCandidates] = useState(null);


  //Fetching data from the Polygon blockcahin
  //useEffect used to avoid render errors while waiting for data to be retrieved
  let lol = false

  useEffect(() => {
    if (!isFetching && !isLoading) {
      fetch();
      //console.log("Fetching data");
    } else if (data !== null) {
      console.log(data[0][1])





      // data[0].map(element =>

      //   console.log(element));

      //   //candidate.name = details[0]
      //   //candidate.voteCount = parseInt(details[1]._hex)
      //   //candidate.info = details[2]
      //   //candidates.push(candidate)
      console.log(data)

      setCandidates(data)

    }
  }, [isLoading]);

  //console.log(parseInt(data[2]._hex));

  if (isAuthenticated && user) {

    let options = {
      abi: ABI.abi,
      contractAddress: "0xD652a606953d87A58657da31F670Ba522Fd4F2D1",
      functionName: "getCandidates",
      params: {
        _elecID: 0,
      },

    };

    // candidateEffect used to ensure data has loaded before trying to display it
    // left side of && has to be populated for the right side to be executed

    return (
      <Router>
        <Container maxW='100%'>
          <Sidebar>
            <Heading align={"center"}>
              Default Election Name
            </Heading>
            <Switch>
              <Route path="/elections" component={Login}>

              </Route>
            </Switch>
          </Sidebar>
        </Container>
      </Router>
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

      <LoginButton></LoginButton>
      <Button onClick={() => authenticate()}>Authenticate Wallet</Button>
      <SignUp></SignUp>
    </Container>

  );
}

export default App;
