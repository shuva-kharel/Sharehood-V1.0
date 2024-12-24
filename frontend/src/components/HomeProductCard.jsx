import { Box, Button, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { themeMapping } from "../constants/themeMapping";

const HomeProductCard = ({ product }) => {
  const { theme } = useThemeStore();
  const currentTheme = themeMapping[theme] || themeMapping['light'];

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={currentTheme.background}
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

        <HStack spacing={2}>
          <Link to={`/chat`}>
            <Button
              colorScheme={currentTheme.button}
              size="sm"
              color={currentTheme.buttonText}
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
