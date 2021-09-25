import { Button } from "@chakra-ui/button"
import { Box, Divider, Heading, SimpleGrid, Spacer } from "@chakra-ui/layout"
import { Link } from "react-router-dom"
import Card from "../../ui-elements/v1-components/Card"

const Payment = () => {
    return (
        <>
            <Heading textAlign="center" my="20">
                Pricing
            </Heading>
            <SimpleGrid mb="20" columns={[1, 1, 2, 3]} gap={8}>
                <Card>
                    <Box pt="4" px="6" color="teal.600" fontWeight="bold">Basic Plan</Box>
                    <Box fontWeight="extrabold" pb="4" px="6" fontSize="xxx-large">Free</Box>
                    <Divider />
                    <Box fontSize="lg" py="4" px="6">
                        <Box color="blackAlpha.800" >One Time Installation</Box>
                        <Box color="blackAlpha.800">Basic Setup</Box>
                        <Link style={{ "margin-top": "2rem", 'display': 'block' }} to="{add stripe link here}">
                            <Button colorScheme="teal" w="100%" >Get it now</Button>
                        </Link>
                    </Box>
                </Card>
                <Card>
                    <Box pt="4" px="6" color="teal.600" fontWeight="bold">Premium Plan</Box>
                    <Box fontWeight="extrabold" pb="4" px="6" fontSize="xxx-large">$50</Box>
                    <Divider />
                    <Box fontSize="lg" py="4" px="6">
                        <Box color="blackAlpha.800" >One Time Installation</Box>
                        <Box color="blackAlpha.800">Basic Setup</Box>
                        <Link style={{ "margin-top": "2rem", 'display': 'block' }} to="{add stripe link here}">
                            <Button colorScheme="teal" w="100%" >Get it now</Button>
                        </Link>
                    </Box>
                </Card>
                <Card>

                    <Box pt="4" px="6" color="teal.600" fontWeight="bold">Large Plan</Box>
                    <Box fontWeight="extrabold" pb="4" px="6" fontSize="xxx-large">$100</Box>
                    <Divider />
                    <Box fontSize="lg" py="4" px="6">
                        <Box color="blackAlpha.800" >One Time Installation</Box>
                        <Box color="blackAlpha.800">Basic Setup</Box>
                        <Link style={{ "margin-top": "2rem", 'display': 'block' }} to="{add stripe link here}">
                            <Button colorScheme="teal" w="100%" >Get it now</Button>
                        </Link>
                    </Box>
                </Card>
            </SimpleGrid>
        </>)
}

export default Payment;