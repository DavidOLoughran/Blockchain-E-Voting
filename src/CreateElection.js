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
    MoralisProvider,
} from "react-moralis";


let candidateNames = [];
let candidateInfo = [];
let candidateImage = [];

let biconomy, web3




export default function CardWithIllustration() {


    const [names, setNames] = useState("");
    const [info, setInfo] = useState("");
    const [image, setImage] = useState("");
    const [candidates, setCandidate] = useState("");
    const [isBiconomy, setBiconomy] = useState(false);

    useEffect(() => {
        setCandidate(candidateNames)
        console.log(candidates)
    });

    const ABI = require("./contracts/Election.json");

    const {
        account,
    } = useMoralis();

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





    const createElection = () => {


        let contract = new web3.eth.Contract(
            ABI.abi,
            process.env.REACT_APP_CONTRACT_ADDRESS
        );

        let userAddress = account;

        let names = ["John", "Mary"]
        let info = ["Johns info", "Mary info"]

        console.log(account)

        let tx = contract.methods.createElection(candidateNames, candidateInfo, candidateImage).send({
            from: '0x34e43E2c4865c98c1F9cD97387B92933EB452D3D',
            signatureType: biconomy.EIP712_SIGN,
            //optionally you can add other options like gasLimit
        });

        tx.on("transactionHash", function (hash) {
            console.log(`Transaction hash is ${hash}`);
            //showInfoMessage(`Transaction sent. Waiting for confirmation ..`);
        }).once("confirmation", function (confirmationNumber, receipt) {
            console.log(receipt);
            console.log(receipt.transactionHash);
            //do something with transaction hash
        });
    }




    return (
        <Flex
            minH={'0vh'}
            align={'center'}
            justify={'center'}
            py={12}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                boxShadow={'2xl'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                p={10}
                spacing={8}
                align={'center'}>
                <Stack align={'center'} spacing={2}>
                    <Heading
                        textTransform={'uppercase'}
                        fontSize={'3xl'}
                        color={useColorModeValue('gray.800', 'gray.200')}>
                        create election
            </Heading>

                </Stack>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                    <Text fontSize={'md'} color={'black.500'}>
                        Election Name:
                    </Text>
                    <Input
                        type={'text'}
                        placeholder={'eg: John Smith'}
                        value={names}
                        onChange={(event) => setNames(event.currentTarget.value)}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        bg={useColorModeValue('gray.100', 'gray.600')}
                        rounded={'full'}
                        border={0}
                        _focus={{
                            bg: useColorModeValue('gray.200', 'gray.800'),
                            outline: 'none',
                        }}
                    />
                </Stack>


                <Stack align={'center'} spacing={2}>
                    <Heading
                        textTransform={'uppercase'}
                        fontSize={'2xl'}
                        color={useColorModeValue('gray.800', 'gray.200')}>
                        Add Candidates
            </Heading>
                    <Text fontSize={'lg'} color={'gray.500'}>
                        Please enter the following details to add a candidate
            </Text>
                </Stack>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                    <Text fontSize={'md'} color={'black.500'}>
                        Candidates Name:
                    </Text>
                    <Input
                        type={'text'}
                        placeholder={'eg: John Smith'}
                        value={names}
                        onChange={(event) => setNames(event.currentTarget.value)}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        bg={useColorModeValue('gray.100', 'gray.600')}
                        rounded={'full'}
                        border={0}
                        _focus={{
                            bg: useColorModeValue('gray.200', 'gray.800'),
                            outline: 'none',
                        }}
                    />
                </Stack>

                <Stack spacing={2} direction={{ base: 'column', md: 'row' }} w={'full'}>
                    <Text justify={'center'} fontSize={'md'} color={'black.500'}>
                        Candidates Information:
                    </Text>
                    <Input
                        type={'text'}
                        placeholder={'john@doe.net'}
                        value={info}
                        onChange={(event) => setInfo(event.currentTarget.value)}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        bg={useColorModeValue('gray.100', 'gray.600')}
                        rounded={'full'}
                        border={0}
                        _focus={{
                            bg: useColorModeValue('gray.200', 'gray.800'),
                            outline: 'none',
                        }}
                    />

                </Stack>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                    <Text justify={'center'} fontSize={'md'} color={'black.500'}>
                        Candidates Image URL:
                    </Text>
                    <Input
                        type={'text'}
                        placeholder={'john@doe.net'}
                        value={image}
                        onChange={(event) => setImage(event.currentTarget.value)}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        bg={useColorModeValue('gray.100', 'gray.600')}
                        rounded={'full'}
                        border={0}
                        _focus={{
                            bg: useColorModeValue('gray.200', 'gray.800'),
                            outline: 'none',
                        }}
                    />

                </Stack>
                <Button
                    onClick={() => addCandidate(names, info, image)}
                    bg={'blue.400'}
                    rounded={'full'}
                    color={'white'}
                    flex={'1 0 auto'}
                    _hover={{ bg: 'blue.500' }}
                    _focus={{ bg: 'blue.500' }}>
                    Add
            </Button>
                <Heading

                    fontSize={'3xl'}
                    color={useColorModeValue('gray.800', 'gray.200')}>
                    All candidates added ?
            </Heading>
                {!isBiconomy && <Button

                    bg={'blue.400'}
                    rounded={'full'}
                    color={'white'}
                    flex={'1 0 auto'}
                    _hover={{ bg: 'blue.500' }}
                    _focus={{ bg: 'blue.500' }}>
                    Loading...
            </Button>}

                {isBiconomy && <Button
                    onClick={() => createElection()}
                    bg={'blue.400'}
                    rounded={'full'}
                    color={'white'}
                    flex={'1 0 auto'}
                    _hover={{ bg: 'blue.500' }}
                    _focus={{ bg: 'blue.500' }}>
                    Create Election
            </Button>}
                <Text>{candidates}</Text>

            </Stack>


        </Flex>
    );
}

const addCandidate = (names, info, image) => {

    candidateNames.push(names)
    candidateInfo.push(info)
    candidateImage.push(image)

}

const createElection = () => {

    return (

        <Heading>yo</Heading>
    );
    // let contract = new web3.eth.Contract(
    //     ABI.abi,
    //     '0x6878C61b4e7d4E7390b08b445C7c7d754E4Fb05E'
    // );

    // let userAddress = account;

    // let names = ["John", "Mary"]
    // let info = ["Johns info", "Mary info"]

    // console.log(account)

    // let tx = contract.methods.createElection(candidateNames, candidateInfo).send({
    //     from: '0x34e43E2c4865c98c1F9cD97387B92933EB452D3D',
    //     signatureType: biconomy.EIP712_SIGN,
    //     //optionally you can add other options like gasLimit
    // });

    // tx.on("transactionHash", function (hash) {
    //     console.log(`Transaction hash is ${hash}`);
    //     //showInfoMessage(`Transaction sent. Waiting for confirmation ..`);
    // }).once("confirmation", function (confirmationNumber, receipt) {
    //     console.log(receipt);
    //     console.log(receipt.transactionHash);
    //     //do something with transaction hash
    // });
}

