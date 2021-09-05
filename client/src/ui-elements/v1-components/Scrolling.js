import { Box } from "@chakra-ui/layout"

const Scrolling = ({ height, children, ...restProps }) => {
    return (<Box
        height={height}
        overflow="scroll"
        {...restProps}
    >
        {children}
    </Box>)
}

export default Scrolling;