import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout"
import { useState } from "react";

/**
 * To use this pass it an array of steps elements for which you want stepper
 */
const Stepper = ({ buttonColorScheme, buttonVariant, steps, ...restProps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const goNextStep = () => {
        const nextStep = currentStep + 1;
        if (nextStep < steps.length) {
            setCurrentStep(nextStep);
        }
    };
    const goPreviousStep = () => {
        const previousStep = currentStep - 1;
        if (previousStep >= 0) {
            setCurrentStep(previousStep);
        }
    };
    return (<Box {...restProps}>
        {steps[currentStep]}
        <Flex width="100%" justifyContent="space-between">
            <Button disabled={currentStep === 0} variant={buttonVariant} colorScheme={buttonColorScheme || 'teal'} onClick={goPreviousStep}>Previous</Button>
            <Button disabled={currentStep === steps.length - 1} variant={buttonVariant} colorScheme={buttonColorScheme || 'teal'} onClick={goNextStep}>Next</Button>
        </Flex>
    </Box>)
}

export default Stepper;
