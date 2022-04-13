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
    useWeb3Contract,
    MoralisProvider,
} from "react-moralis";
import { useState, useEffect } from "react";

import { Biconomy } from "@biconomy/mexa";
import Web3 from "web3";

import { notification } from "antd";

let biconomy, web3;



const DisplayCandidates = ({ candidate, id }) => {

    console.log(id)
    console.log(candidate)

    const ABI = require("./contracts/Election.json");

    const {
        account,
        user,
        Moralis,
    } = useMoralis();

    const [isBiconomy, setBiconomy] = useState(false);


    useEffect(() => {

        biconomy = new Biconomy(new Web3.providers.HttpProvider("https://speedy-nodes-nyc.moralis.io/7868a0eb0155bdd9cb961c76/polygon/mumbai"), {
            walletProvider: window.ethereum,
            apiKey: process.env.REACT_APP_BICONOMY_API_KEY_MUMBAI,
            debug: true
        });

        web3 = new Web3(biconomy);

        biconomy.onEvent(biconomy.READY, () => {
            console.log("Biconomy Successful")
            setBiconomy(true)


        }).onEvent(biconomy.ERROR, (error, message) => {
            // Handle error while initializing mexa
            console.log("Failed to initalize")
        });
    }, []);

    const { data, error, fetch, isFetching, isLoading } = useWeb3Contract({
        abi: ABI.abi,
        contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
        functionName: "createVote",
        params: {
            _elecID: 0,
            _candID: candidate.candID,

        },
    });

    const castVote = () => {
        fetch()


    }

    const castVote1 = () => {
        let contract = new web3.eth.Contract(
            ABI.abi,
            process.env.REACT_APP_CONTRACT_ADDRESS
        );

        let userAddress = account;

        let names = ["John", "Mary"]
        let info = ["Johns info", "Mary info"]

        console.log(account)
        const users = Moralis.User.current();
        console.log(users.id)

        let tx = contract.methods.createVote(id, candidate.candID, account).send({
            from: account,
            signatureType: biconomy.EIP712_SIGN,
            //optionally you can add other options like gasLimit
        });

        tx.on("transactionHash", function (hash) {
            console.log(`Transaction hash is ${hash}`);
            //showInfoMessage(`Transaction sent. Waiting for confirmation ..`);
            alert("Vote submitted. Waiting for confirmation ..")
        }).once("confirmation", function (confirmationNumber, receipt) {
            console.log("success");
            console.log(receipt.transactionHash);
            alert("Your vote for " + candidate.name + " has been confirmed by the blockchain!")
        }).on("error", function (error) {
            alert("This election is no longer live or you have already voted")
        });
    }
    return (

        <Center py={6}>


            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '700px' }}
                height={{ sm: '476px', md: '25rem' }}
                direction={{ base: 'column', md: 'row' }}
                //bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                padding={4}>
                <Flex flex={1} bg="blue.200">
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={
                            'https://i.ibb.co/WzkJ6j2/Bavid-Bobrick.png'
                        }
                    />
                </Flex>
                <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {candidate.name}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                        {candidate.voteCount}
                    </Text>
                    <Text
                        textAlign={'center'}
                        //color={useColorModeValue('gray.700', 'gray.400')}
                        px={3}>
                        {candidate.info}


                    </Text>


                    <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>

                        {isBiconomy && <Button

                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                                bg: 'blue.500',
                            }}
                            _focus={{
                                bg: 'blue.500',
                            }}
                            onClick={() => castVote1()}>
                            Cast Vote
            </Button>}
                    </Stack>
                </Stack>
            </Stack>

        </Center>
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

// const DisplayCandidates = ({candidates}) => {
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