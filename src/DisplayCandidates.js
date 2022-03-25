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
    ViewOffIcon,
} from "@chakra-ui/react";

const DisplayCandidates = ({ candidates }) => {
    console.log(candidates)
    return (
        <Container>
            {candidates.map(candidate => (
                <Container>
                    <Heading>{candidate.name}</Heading>
                    <Heading>{candidate.voteCount}</Heading>

                </Container>
            ))}

        </Container>




    );
}

export default DisplayCandidates;