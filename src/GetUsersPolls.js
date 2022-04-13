import logo from "./logo.svg";
import "./app.css";
import Login from "./Login";
import Incorrect from "./incorrectAddress";
import CheckingAccount from "./checkingAccount";
import SignUp from "./SignUp";
import Nav from "./Sidebar";
import DisplayCandidates from "./DisplayCandidates";
import SelectElection from "./SelectElection";
import CreateElection from "./CreateElection";
import SelectPoll from "./SelectPoll";
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






function GetUsersPolls() {
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

    //const { web3 } = useMoralis();

    const location = useLocation();


    const [linked, setLinked] = useState(null);
    const [linkedAddress, setAddress] = useState(false);

    const [contract, setContract] = useState(process.env.REACT_APP_POLL_CONTRACT_ADDRESS);

    useEffect(() => {

        //console.log(linked)
        if (user !== null) {
            //console.log(linked)

            if (user.attributes.linkedAccount === account) {
                //console.log(linked)
                setLinked(true)

            } else if (user.attributes.linkedAccount === null && user.attributes.isLinked === null) {
                setAddress(true)
            }

        }
    });

    const ABI = require("./contracts/Poll.json");

    // const provider = new Web3.providers.HttpProvider('https://speedy-nodes-nyc.moralis.io/7868a0eb0155bdd9cb961c76/polygon/mumbai');
    // const web3 = new Web3(provider);
    // const myContract = new web3.eth.Contract(ABI.abi, process.env.REACT_APP_CONTRACT_ADDRESS);

    // myContract.methods.getElection(0, account)
    //   .call({ from: account })
    //   .then(function (result) {
    //     console.log(result)
    //   });



    //console.log(location)
    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
        abi: ABI.abi,
        contractAddress: process.env.REACT_APP_POLL_CONTRACT_ADDRESS,
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
            setContract(process.env.REACT_APP_POLL_CONTRACT_ADDRESS)

            setElections(data)


        }
    }, [isLoading]);

    console.log(electionEffect)
    console.log(pollEffect)

    // useEffect(() => {
    //   if (!isFetching && !isLoading && electionEffect) {
    //     fetch();
    //     //console.log("Fetching data");
    //   } else if (data !== null) {

    //     console.log(contract)
    //     console.log(data)

    //     console.log(data)

    //     //setElections(data)

    //     //setContract(process.env.REACT_APP_POLL_CONTRACT_ADDRESS)

    //   }
    // }, [isLoading]);



    // const users = Moralis.User.current();
    // let poo = null;
    // console.log(users.attributes.linkedAccount)



    return (

        <Container maxW='container.xl'>


            {electionEffect && <SelectPoll elec={electionEffect}></SelectPoll>}
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

export default GetUsersPolls;
