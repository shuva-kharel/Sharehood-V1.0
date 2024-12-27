import { Box, Button, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { themeMapping } from "../constants/themeMapping";

const HomeProductCard = ({ product }) => {
  const { theme } = useThemeStore();
  const { authUser } = useAuthStore();
  const currentTheme = themeMapping[theme] || themeMapping['light'];
  

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={currentTheme.dimBackground}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2} color={currentTheme.text}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={currentTheme.text} mb={4}>
          Rs.{product.price}
          {product.address && (
            <>
              <br />
              {product.address}
            </>
          )}
          {product.description && (
            <>
              <br />
              {product.description}
            </>
          )}
        </Text>

        <Text
          fontSize="lg"
          color="gray.600"
          mb={4} // Margin at the bottom to space it from the button
        >
          Posted by {authUser?.fullName}
        </Text>

        <HStack spacing={2}>
          <Link to={`/chat`}>
            <Button
              bg={currentTheme.button}
              size="sm"
              color={currentTheme.buttonText}
              _hover={{ bg: currentTheme.borrowButton_hover }}
            >
              Borrow
            </Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default HomeProductCard;
