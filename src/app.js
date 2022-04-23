import logo from "./logo.svg";
import "./app.css";
import Login from "./Login";
import Incorrect from "./incorrectAddress";
import CheckingAccount from "./checkingAccount";
import SignUp from "./SignUp";
import Nav from "./Sidebar";
import DisplayCandidates from "./DisplayCandidates";
import SelectElection from "./SelectElection";
import SelectPoll from "./SelectPoll";
import CreateElection from "./CreateElection";
import CreatePoll from "./CreatePoll";
import PopularPolls from "./PopularPolls";
import GetPopularPolls from "./getPopularPolls";

import GetUsersPolls from "./GetUsersPolls";
import HomePage from "./HomePage";
//import IdentityVerification from "./IdentityVerification";

import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";



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

import Web3 from "web3";






function App() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    logout,
    user,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
    account,
    setUserData,
    isUserUpdating,
    Moralis,
  } = useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //const { web3 } = useMoralis();

  const location = useLocation();

  const checkLinked = () => {

    const users = Moralis.User.current();

    console.log(users.attributes.isLinked)


    if (users && users.attributes.isLinked) {

      alert("Cannot link metamask account as one is already linked to this account")

    } else if (users && !users.attributes.isLinked) {
      setUserData({
        isLinked: true,
        linkedAccount: account,
      })
    }



  }



  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3();
      console.log("Starting Web3");
    } else {
      //console.log()
      console.log("Web3 Enabled");
    }
  }, [isWeb3Enabled, isWeb3EnableLoading]);




  const [linked, setLinked] = useState(null);
  const [linkedAddress, setAddress] = useState(false);

  const [contract, setContract] = useState(process.env.REACT_APP_CONTRACT_ADDRESS);

  useEffect(() => {

    //console.log(linked)
    if (user !== null) {
      //console.log(linked)

      if (user.attributes.linkedAccount === account) {
        //console.log(linked)
        setLinked(true)

      } else if (user.attributes.linkedAccount !== null && user.attributes.isLinked === null) {
        setAddress(true)
      }

    }
  });

  const ABI = require("./contracts/Election.json");


  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: ABI.abi,
    contractAddress: contract,
    functionName: "getElection",
    params: {
      _elecID: 0,
      _voteID: account,

    },
  });

  const [electionEffect, setElections] = useState(null);
  const [pollEffect, setPolls] = useState(null);

  useEffect(() => {
    if (!isFetching && !isLoading && !electionEffect) {
      fetch();
      //console.log("Fetching data");
    } else if (data !== null && !electionEffect) {
      console.log(data)

      console.log(data)


      setElections(data)


    }
  }, [isLoading]);

  const [emailVerified, setEmailV] = useState(false);

  useEffect(() => {
    if (user) {
      //const users = Moralis.User.current();

      if (user.attributes.emailVerified) {
        setEmailV(true)
      }


      console.log(emailVerified)

    }

  });



  if (isAuthenticated && user && linked) {


    // candidateEffect used to ensure data has loaded before trying to display it
    // left side of && has to be populated for the right side to be executed

    //{electionEffect && <PopularPolls elec={electionEffect}></PopularPolls>}


    console.log(user.attributes.name)

    return (

      <Container maxW='100%'>

        <Sidebar>

          <Switch>
            <Route exact path="/">
              <Heading>{user.attributes.objectId}</Heading>
              <HomePage></HomePage>
            </Route>

            <Route path="/all_polls" >

              <GetPopularPolls></GetPopularPolls>
            </Route>

            <Route path="/elections" >

              {electionEffect && <SelectElection elec={electionEffect} ></SelectElection>}
            </Route>

            <Route path="/polls" >

              {electionEffect && <GetUsersPolls></GetUsersPolls>}
            </Route>

            <Route path="/create_election" >
              <CreateElection></CreateElection>
            </Route>
            <Route path="/create_poll" >
              <CreatePoll></CreatePoll>
            </Route>


          </Switch>


        </Sidebar>
      </Container >

    );
  } else if (isAuthenticated && user && linked === null && !emailVerified) {
    logout()
    alert("Please verify your email to access your account")



  } else if (isAuthenticated && user && linked === null) {
    return (
      <Container align={"center"} spacing={4}>

        <Incorrect></Incorrect>

        <Button
          onClick={() => checkLinked()}
          disabled={isUserUpdating}
          colorScheme={'blue'}
          bg={'green.400'}
          rounded={'full'}
          px={6}
          _hover={{
            bg: 'green.500',
          }}
        >
          Link Metamask
    </Button>
        {!linked && <Button
          onClick={() => logout()}
          colorScheme={'blue'}
          bg={'green.400'}
          rounded={'full'}
          px={6}
          _hover={{
            bg: 'green.500',
          }}>
          Logout
            </Button>}


      </Container>
    );
  } else if (isAuthenticated && !linked) {
    return (
      <Container align={"center"} spacing={15}>
        <Incorrect></Incorrect>
        <Button
          onClick={() => logout()}
          colorScheme={'green'}
          bg={'green.400'}
          rounded={'full'}
          px={6}
          _hover={{
            bg: 'green.500',
          }}>
          Logout
            </Button>
      </Container>
    );
  }

  return (

    <Container maxW='container.xl'>


      <Switch>
        <Route exact path="/">
          <HomePage></HomePage>
        </Route>
        <Route path="/signup">
          <SignUp></SignUp>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/elections">
          <HomePage></HomePage>
        </Route>
        <Route path="/polls">
          <HomePage></HomePage>
        </Route>
        <Route path="/create_poll">
          <HomePage></HomePage>
        </Route>
        <Route path="/create_election">
          <HomePage></HomePage>
        </Route>
        <Route path="/all_polls">
          <HomePage></HomePage>
        </Route>
      </Switch>
    </Container>

  );
}

// const LinkWallet = () => {

//   setUserData({

//     isLinked: true

//   })



//console.log(candidates)
// return (
//   <Heading>Yo</Heading>

// );
// }

export default App;
