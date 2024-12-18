import { Button, Container, Flex, HStack, Text, useColorMode, Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const { colorMode, toggleColorMode } = useColorMode();
    
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Sharehood 🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>

                    <Menu>
            <MenuButton
                as={Button}
                p={0}
                height="auto"
                background="transparent"
            >
                <Avatar
                    src="https://bit.ly/broken-link"
                    size="sm"
                    bg="blue.500"
                    transition="transform 0.5s, background-color 0.2s"
                    _hover={{ transform: "scale(1.05)", bg: "green.500" }}
                />
            </MenuButton>
            <MenuList>
                <MenuItem as={Link} to="/dashboard">
                    <Text fontWeight="bold">{user.name}</Text>
                </MenuItem>
                <MenuItem as={Link} to="/my-products">
                    Your Products
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>

                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
