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
    return (
        <Container>

            <Heading>{JSON.stringify(candidates)}</Heading>

        </Container>




    );
}

export default DisplayCandidates;