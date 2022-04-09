import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Link,
    Button,
    Icon,
    IconProps,
} from '@chakra-ui/react';

export default function CallToActionWithIllustration() {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Blockchain{' '}
                    <Text as={'span'} color={'orange.400'}>
                        E-Voting
            </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Blockchain E-Voting is a direct to consumer online voting system built on blockchain technology to ensure tamper proof elections and polls
          </Text>
                <Stack spacing={6} direction={'row'}>
                    <Link href="/login">
                        <Button

                            rounded={'full'}
                            px={6}
                            colorScheme={'orange'}
                            bg={'orange.400'}
                            _hover={{ bg: 'orange.500' }}>
                            Get started
            </Button>
                    </Link>
                    <Button rounded={'full'} px={6}>
                        Learn more
            </Button>
                </Stack>
                <Flex w={'full'}>

                </Flex>
            </Stack>
        </Container>
    );
}

