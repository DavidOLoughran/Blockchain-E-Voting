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

const GetCandidate = ({ candidates }) => {
    return (

        <Container>
            {candidates.map(candidate => (
                <DisplayCandidates candidate={candidate} />




            ))}



        </Container>
    );
}

export default GetCandidate;