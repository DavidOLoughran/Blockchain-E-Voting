import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import {
    useMoralis,
    useWeb3ExecuteFunction,
    MoralisProvider,
} from "react-moralis";
import { useState, useEffect } from "react";


const CreateElection = ({ candidate }) => {

    const ABI = require("./Election.json");

    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
        abi: ABI.abi,
        contractAddress: "0xD652a606953d87A58657da31F670Ba522Fd4F2D1",
        functionName: "createElection",
        params: {
            _elecID: 0,
            _candID: candidate.candID,

        },
    });

    const castVote = () => {
        fetch()
    }
    return (

        
    );
}



// import {
//     Flex,
//     Box,
//     FormControl,
//     FormLabel,
//     Input,
//     InputGroup,
//     HStack,
//     InputRightElement,
//     Stack,
//     Button,
//     Heading,
//     Text,
//     useColorModeValue,
//     Link,
//     Container,
//     VisuallyHidden,
//     ViewIcon,
//     ViewOffIcon,
// } from "@chakra-ui/react";

// const DisplayCandidates = ({ candidates }) => {
//     console.log(candidates)
//     return (
//         <Container>
//             {candidates.map(candidate => (
//                 <Container>
//                     <Heading>{candidate.name}</Heading>
//                     <Heading>{candidate.voteCount}</Heading>

//                 </Container>
//             ))}

//         </Container>




//     );
// }

export default DisplayCandidates;