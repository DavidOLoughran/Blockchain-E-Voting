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

const Login = () => {
    const { login, user } = useMoralis();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Flex className="elections"
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
                        Login
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
                                value={username}
                                onChange={(event) => setUsername(event.currentTarget.value)}
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
                                onClick={() => login(username, password)}
                            >
                                Login
                </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>Not registered?</Text>
                        </Stack>
                    </Stack>
                </Box>
                <Text>
                    Note: You must verify your email before accessing your account
          </Text>
            </Stack>
        </Flex>
    );
};

export default Login;