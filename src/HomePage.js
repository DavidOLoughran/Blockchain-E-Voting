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
    Box,
    SimpleGrid,
} from '@chakra-ui/react';

import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiShield,
    FiSettings,
    FiUserPlus,
    FiUsers,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'black'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

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
                <Text color={'gray.500'} maxW={'3xl'}>
                    Please Install metamask to continue using the application. Metamask enables your browser to interact with the blockchain and is used as 2FA for accessing your account
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
                    <Link href="https://metamask.io/download/">
                        <Button

                            rounded={'full'}
                            px={6}
                            colorScheme={'orange'}
                            bg={'orange.400'}
                            _hover={{ bg: 'orange.500' }}>
                            Metamask
            </Button>
                    </Link>
                </Stack>
                <Flex w={'full'}>

                </Flex>
            </Stack>
            <Box p={4}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Feature

                        title={'Elections'}
                        text={
                            'Blockchain E-Voting allows users to create and participate in private elections where the creator can select which users are allowed to participate'
                        }
                    />
                    <Feature

                        title={'Polls'}
                        text={
                            'Blockchain E-Voting allows users to create and participate in public polls. '
                        }
                    />
                    <Feature

                        title={'Metamask Verification'}
                        text={
                            'Metamask is utilised as two-factor authtentication while drastically reducing the number of illegitmate participants '
                        }
                    />
                </SimpleGrid>
            </Box>
        </Container>

    );
}

