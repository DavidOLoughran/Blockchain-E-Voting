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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
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




const SelectElection = ({ elec }) => {


    const [names, setNames] = useState("");
    const [elecName, setElecName] = useState("");
    const [elecID, setElecID] = useState(null);

    let elections = [{}];

    for (let i = 0; i < elec[0].length; i++) {

        let election = { id: 0, name: "Default" };
        //console.log(i)
        console.log(elec[0][i])
        election.id = parseInt(elec[0][i]._hex)
        election.name = elec[1][i]


        election.candID = i;
        console.log(election)
        elections.push(election)

        //console.log(candidates)
        //console.log(candidate)
    }

    elections.shift();


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

    const selectElection = (id) => {
        console.log("Fetching")
        setNames(id)
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
                <Text fontSize={'lg'} color={'gray.500'}>
                    Or select one of your active elections below and click search
            </Text>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Your active elections</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Election ID</Th>
                                <Th>Election Name</Th>
                                <Th>
                                    View Election
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {elections.map(election => (
                                <Tr>
                                    <Td>{election.id}</Td>
                                    <Td>{election.name}</Td>
                                    <Td><Button
                                        onClick={() => selectElection(election.id)}
                                        bg={'blue.400'}
                                        rounded={'full'}
                                        color={'white'}
                                        flex={'1 0 auto'}
                                        _hover={{ bg: 'blue.500' }}
                                        _focus={{ bg: 'blue.500' }}>
                                        select
                                    </Button></Td>
                                </Tr>
                            ))}

                        </Tbody>

                    </Table>
                </TableContainer>




            </Stack>}


            {candidateEffect && <GetCandidate data={candidateEffect} id={names} elecName={elecName} />}


        </Flex>
    );
}




export default SelectElection;