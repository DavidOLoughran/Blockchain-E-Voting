import logo from "./logo.svg";
import "./app.css";
import Login from "./Login";
import Incorrect from "./incorrectAddress";
import CheckingAccount from "./checkingAccount";
import LoginButton from "./Auth0Reg";
import LogoutButton from "./LogoutButton";
import SignUp from "./SignUp";
import Nav from "./Sidebar";
import DisplayCandidates from "./DisplayCandidates";
import SelectElection from "./SelectElection";
import CreateElection from "./CreateElection";
import HomePage from "./HomePage";
//import IdentityVerification from "./IdentityVerification";
import { useAuth0 } from "@auth0/auth0-react";
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
import GetCandidate from "./GetCandidate";





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
  } = useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { web3 } = useMoralis();

  //console.log(account)

  // const unsubscribe = Moralis.Web3.onAccountsChanged(function (accounts) {

  // });
  //require('dotenv').config();


  //const { REACT_APP_MORALIS_SPEEDY_NODES_KEY } = process.env;
  //console.log(process.env.REACT_APP_BICONOMY_API_KEY_MUMBAI)

  const location = useLocation();

  const { auth0user } = useAuth0();

  const Auth0Auth = useAuth0().isAuthenticated;
  const Auth0Loading = useAuth0.isLoading;

  //console.log(location)

  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3();
      console.log("Starting Web3");
    } else {
      //console.log()
      console.log("Web3 Enabled");
    }
  }, [isWeb3Enabled, isWeb3EnableLoading]);

  const ABI = require("./contracts/Election.json");
  //console.log(ABI.abi)

  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: ABI.abi,
    contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
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

  //console.log(user.attributes.isLinked)

  useEffect(() => {
    if (!isFetching && !isLoading) {
      fetch();
      //console.log("Fetching data");
    } else if (data !== null) {
      console.log(data[0][1])

      console.log(data)

      setCandidates(data)

    }
  }, [isLoading]);

  const [linked, setLinked] = useState(null);
  const [linkedAddress, setAddress] = useState(null);

  useEffect(() => {

    //console.log(linked)
    if (user !== null) {
      //console.log(linked)

      if (user.attributes.linkedAccount === account) {
        //console.log(linked)
        setLinked(true)

      } else if (user.attributes.linkedAccount !== account) {
        setAddress(true)
      }

    }
  });



  if (isAuthenticated && user && linked) {


    // candidateEffect used to ensure data has loaded before trying to display it
    // left side of && has to be populated for the right side to be executed

    return (

      <Container maxW='100%'>
        <Sidebar>

          <Switch>
            <Route exact path="/" />

            <Route path="/elections" >

              <SelectElection></SelectElection>
            </Route>

            <Route path="/create_election" >
              <CreateElection></CreateElection>
            </Route>


          </Switch>


        </Sidebar>
      </Container>

    );
  } else if (isAuthenticated && user && linked === null) {
    return (
      <Container align={"center"} spacing={4}>
        <Heading>Please link your account</Heading>
        <Button
          onClick={() => setUserData({
            isLinked: true,
            linkedAccount: account,
          })}
          disabled={isUserUpdating}
        >
          Set user data
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
        <Link href="/">yo</Link>

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
