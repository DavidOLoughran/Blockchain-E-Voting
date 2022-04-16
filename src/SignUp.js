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
import {
    useMoralis,
    useWeb3ExecuteFunction,
    MoralisProvider,
} from "react-moralis";
import { useState, useEffect } from "react";

const SignUp = () => {
    const { signup } = useMoralis();

    // Setting responsive variables using useState

    const [firstname, setFirst] = useState("");
    const [lastname, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const checkPassword = () => {

        // Using regex to validate entered password meets the neccesary requirements

        if (password.length < 8) {
            alert("Password must be atleast 8 characters")

        } else if (password.search(/[A-Z]/) < 0) {
            alert("Password must contain a capital letter")

        } else if (password.search(/[0-9]/) < 0) {
            alert("Password must contain a number")

        } else {
            signup(email, password, email)
        }
    }



    return (
        <Flex
            minH={"50vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"7xl"} textAlign={"center"}>
                        E-Voting
            </Heading>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
            </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
            </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={10}
                >
                    <Stack spacing={4}>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.currentTarget.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.currentTarget.value)}
                                />
                                <InputRightElement h={"full"}></InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={() => checkPassword()}
                            >
                                Sign up
                </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user? <Link href="/login" color={"blue.400"}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
                <Text>
                    Note: Password must be longer than 8 characters, have a capital letter and number
          </Text>
            </Stack>
        </Flex >
    );
};

export default SignUp;