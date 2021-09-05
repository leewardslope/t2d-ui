import { Flex, Heading } from "@chakra-ui/layout"

const Card = ({ children, ...restProps }) => {
    return (<Flex
        p="4"
        boxShadow="md"
        borderRadius="md"
        borderColor="gray.200"
        borderWidth="1px"
        {...restProps}
    >
        {children}
    </Flex>)
}

Card.Title = ({ children, ...restProps }) => {
    return (<Heading align="center" size="lg" {...restProps}>
        {children}
    </Heading>)
}

export default Card;
