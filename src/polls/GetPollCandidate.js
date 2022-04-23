import {
    Badge,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
    Box,
} from '@chakra-ui/react';

import DisplayPollCandidates from "./DisplayPollCandidates";

const GetPollCandidate = ({ data, id, elecName }) => {

    let candidates = [{}];
    console.log(id)
    console.log(elecName)


    console.log(data)

    for (let i = 0; i < data[0].length; i++) {

        let candidate = { name: "Default", voteCount: 0, info: "Deafault info", candID: 0 };
        //console.log(i)
        console.log(data[0][i])
        candidate.name = data[0][i]
        candidate.voteCount = parseInt(data[1][i]._hex)
        candidate.info = data[2][i]
        candidate.candID = i;
        console.log(candidate)
        candidates.push(candidate)

        console.log(candidates)
        //console.log(candidate)
    }

    candidates.shift();

    //console.log(candidates)
    return (

        <Container maxW='container.md'>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>


                    <Text as={'span'} color={'black.400'}>
                        {elecName}
                    </Text>
                </Heading>
            </Stack>
            {candidates.map(candidate => (
                <DisplayPollCandidates candidate={candidate} id={id} />




            ))}



        </Container>
    );
}

export default GetPollCandidate;