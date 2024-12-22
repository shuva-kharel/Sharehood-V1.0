import { Box, Button, Heading, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // For redirection
import { useProductStore } from "../store/useProductStore";

const ProductCard = ({ product }) => {
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	// You can add borrow logic here once the borrow link is available
	const borrowLink = `/chat`; // Placeholder for future borrow link

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />


			<Box p={4}>
			<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{/* Show price */}
					Rs.{product.price}
		
					{/* Conditionally show address */}
					{product.address && (
						<>
							<br />
							{product.address}
						</>
					)}
	
					{/* Conditionally show description */}
					{product.description && (
						<>
							<br />
							{product.description}
						</>
					)}
				</Text>

				<HStack spacing={2}>
					{/* Borrow button that redirects to the borrow page */}
					<Link to={borrowLink}>
						<Button colorScheme='teal' size='sm'>
							Borrow
						</Button>
					</Link>
				</HStack>
			</Box>
		</Box>
	);
};

export default ProductCard;
