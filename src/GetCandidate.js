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
} from '@chakra-ui/react';

import DisplayCandidates from "./DisplayCandidates";

const GetCandidate = ({ data }) => {

    let candidates = [{}];


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
            {candidates.map(candidate => (
                <DisplayCandidates candidate={candidate} />




            ))}



        </Container>
    );
}

export default GetCandidate;