import { Box, Heading } from "@chakra-ui/layout"
import Card from "./Card";
import Scrolling from "./Scrolling";
import Stepper from "./Stepper";

const ShowComponents = ({ children, ...restProps }) => {
    return (<Box mx="20">
        <Card mt="40" >
            <Card.Title>Hello</Card.Title>
        </Card>
        <Scrolling mt="30px" height="80px">
            <Heading>new heading</Heading>
            <Heading>new heading</Heading>
            <Heading>new heading</Heading>
            <Heading>new heading</Heading>
            <Heading>new heading</Heading>
        </Scrolling>
        <Stepper mt="40px" width="500px" steps={[
            <>1</>,
            <>2</>,
            <>3</>,
            <>4</>,
            <>5</>
        ]}></Stepper>
    </Box>)
}

export default ShowComponents;
