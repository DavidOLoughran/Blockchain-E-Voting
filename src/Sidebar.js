import React, { ReactNode } from 'react';
import { useHistory } from "react-router-dom";
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Button,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    useColorMode,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
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
import { IconType } from 'react-icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ReactText } from 'react';

import {
    useMoralis,
    useWeb3ExecuteFunction,
    MoralisProvider,
} from "react-moralis";

//Adapted from ChakraUI template

interface LinkItemProps {
    name: string;
    icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Verify Identity', icon: FiShield, path: '/verify' },
    { name: 'Elections', icon: FiUsers, path: '/elections' },
    { name: 'Polls', icon: FiUsers, path: '/polls' },
    { name: 'Create Election', icon: FiUserPlus, path: '/create_election' },
    { name: 'Create Poll', icon: FiSettings, path: '/create_poll' },
    { name: 'All Polls', icon: FiSettings, path: '/all_polls' },
];

function HomeButton() {
    const history = useHistory();

    function handleClick() {
        history.push("/elections");
    }
}

export default function Sidebar({
    children,
}: {
    children: ReactNode;
}) {

    const { isOpen, onOpen, onClose } = useDisclosure();






    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Blockchain | E-Voting
        </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (

                <NavItem link={link.path} key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>

            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}
const NavItem = ({ link, icon, children, ...rest }: NavItemProps) => {
    return (
        <Link href={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};



interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const {
        authenticate,
        isAuthenticated,
        logout,
        user,
        account,
        isWeb3Enabled,
        isWeb3EnableLoading,
        Moralis,
        enableWeb3,
    } = useMoralis();


    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                E-Voting
      </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        ''
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{account}</Text>

                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>

                            <MenuDivider />
                            <MenuItem href="/" onClick={() => logout()}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex >
    );
};

//export default Sidebar;