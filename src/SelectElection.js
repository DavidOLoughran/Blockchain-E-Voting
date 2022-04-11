import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    Icon,
    useColorModeValue,
    createIcon,
} from '@chakra-ui/react';

import { useState, useEffect } from "react";
import { Biconomy } from "@biconomy/mexa";
import Web3 from "web3";

import {
    useMoralis,
    useWeb3ExecuteFunction,
    useWeb3Contract,
    MoralisProvider,
} from "react-moralis";
import GetCandidate from './GetCandidate';


let candidateNames = [];
let candidateInfo = [];
let candidateImage = [];

let biconomy, web3




export default function CardWithIllustration() {


    const [names, setNames] = useState("");
    const [elecName, setElecName] = useState("");
    const [elecID, setElecID] = useState(null);


    const ABI = require("./contracts/Election.json");
    //console.log(ABI.abi)

    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
        abi: ABI.abi,
        contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
        functionName: "getCandidates",
        params: {
            _elecID: names,

        },
    });

    // const { data, error, runContractFunction, isFetching, isLoading } =
    //     useWeb3Contract({
    //         abi: usdcEthPoolAbi,
    //         contractAddress: usdcEthPoolAddress,
    //         functionName: "observe",
    //         params: {
    //             secondsAgos: [0, 10],
    //         },
    //     });

    let candidates = [{ name: "Default Candidate", voteCount: 0 }, { name: "Default Candidate Test", voteCount: 0 }];
    let candidate = { name: "Default", voteCount: 0, info: "Deafault info" };

    const [candidateEffect, setCandidates] = useState(null);

    const castVote = () => {
        console.log("Fetching")
        setElecID(true)
        fetch()
    }

    const backToSearch = () => {
        console.log("Going back")
        setCandidates(null)
        fetch()
    }

    useEffect(() => {
        if (data !== null) {
            console.log(data[4])

            console.log(data)


            setElecName(data[4])
            setCandidates(data)

            //console.log("Fetching data");


        }
    }, [isLoading]);

    const {
        account,
    } = useMoralis();

    const colorInput = useColorModeValue('gray.100', 'gray.600');
    const colorHeading = useColorModeValue('gray.800', 'gray.200');
    const colorStackBackground = useColorModeValue('white', 'gray.700');
    const colorBackground = useColorModeValue('gray.50', 'gray.800');


    return (
        <Flex
            minH={'0vh'}
            align={'center'}
            justify={'center'}
            py={12}
            bg={colorBackground}>
            {!candidateEffect && <Stack
                boxShadow={'2xl'}
                bg={colorStackBackground}
                rounded={'xl'}
                p={10}
                spacing={8}
                align={'center'}>
                <Stack align={'center'} spacing={2}>
                    <Heading
                        textTransform={'uppercase'}
                        fontSize={'3xl'}
                        color={colorHeading}>
                        select election
            </Heading>

                </Stack>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                    <Text fontSize={'md'} color={'black.500'}>
                        Election ID:
                    </Text>
                    <Input
                        type={'number'}
                        placeholder={'2'}
                        value={names}
                        onChange={(event) => setNames(event.currentTarget.value)}
                        color={colorHeading}
                        bg={colorInput}
                        rounded={'full'}
                        border={0}
                        _focus={{
                            //bg: useColorModeValue('gray.200', 'gray.800'),
                            outline: 'none',
                        }}
                    />

                </Stack>
                <Button
                    onClick={() => castVote()}
                    bg={'blue.400'}
                    rounded={'full'}
                    color={'white'}
                    flex={'1 0 auto'}
                    _hover={{ bg: 'blue.500' }}
                    _focus={{ bg: 'blue.500' }}>
                    Search
            </Button>




            </Stack>}


            {candidateEffect && <GetCandidate data={candidateEffect} id={names} elecName={elecName} />}


        </Flex>
    );
}




