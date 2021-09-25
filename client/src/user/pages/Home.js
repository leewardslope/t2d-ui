import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
    Box,
    Button,
    Flex,
    Image,
    Heading,
    Stack,
    Text,
    Container,
    Divider
} from "@chakra-ui/react"
import Payment from "../components/Payment"

export default function Home({
    title,
    subtitle,
    image,
    ctaLink,
    ctaText,
    ...rest
}) {
    return (
        <Container maxW="container.xl">
            <Flex
                align="center"
                justify={{ base: "center", md: "space-around", xl: "space-between" }}
                direction={{ base: "column-reverse", md: "row" }}
                wrap="no-wrap"
                minH="70vh"
                px={8}
                mb={16}
                {...rest}
            >
                <Stack
                    spacing={4}
                    w={{ base: "80%", md: "40%" }}
                    align={["center", "center", "flex-start", "flex-start"]}
                >
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="black.800"
                        textAlign={["center", "center", "left", "left"]}
                    >
                        {title}
                    </Heading>
                    <Heading
                        as="h2"
                        size="md"
                        color="black.800"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}
                    >
                        {subtitle}
                    </Heading>
                    <Link to={ctaLink}>
                        <Button
                            colorScheme="teal"
                            borderRadius="8px"
                            py="4"
                            px="4"
                            lineHeight="1"
                            size="md"
                        >
                            {ctaText}
                        </Button>
                    </Link>
                    <Text
                        fontSize="xs"
                        mt={2}
                        textAlign="center"
                        colorScheme="teal"
                    >
                        No credit card required.
                    </Text>
                </Stack>
                <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                    <Image src={image} size="100%" rounded="1rem" />
                </Box>
            </Flex>
            <Divider/>
            <Payment/>
        </Container>
    )
}

Home.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
}

Home.defaultProps = {
    title: "Get your own forem in minutes",
    subtitle:
        "Do you want to create a community don't worry about software worry about the commutnity",
    image: "/cloud.png",
    ctaText: "Create your account now",
    ctaLink: "/signup",
}
