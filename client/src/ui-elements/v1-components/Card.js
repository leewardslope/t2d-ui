import { Box, Heading } from "@chakra-ui/layout"

const Card = ({ children, ...restProps }) => {
    return (<Box
        p="4"
        boxShadow="md"
        borderRadius="md"
        borderColor="gray.200"
        borderWidth="1px"
        {...restProps}
    >
        {children}
    </Box>)
}

Card.Title = ({ children, ...restProps }) => {
    return (<Heading align="center" size="lg" {...restProps}>
        {children}
    </Heading>)
}

export default Card;
