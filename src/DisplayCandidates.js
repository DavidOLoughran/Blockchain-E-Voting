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


const DisplayCandidates = ({ candidate }) => {

    const ABI = require("./Election.json");

    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
        abi: ABI.abi,
        contractAddress: "0xD652a606953d87A58657da31F670Ba522Fd4F2D1",
        functionName: "createVote",
        params: {
            _elecID: 0,
            _candID: candidate.candID,

        },
    });

    const castVote = () => {
        fetch()
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
                            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
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

                        <Button

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
                            onClick={() => castVote()}>
                            Cast Vote
            </Button>
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