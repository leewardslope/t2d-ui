import { Button } from "@chakra-ui/button"
import { Heading, VStack } from "@chakra-ui/layout"
import { Form, Formik } from "formik"
import FormikInput from "../../shared/components/UIElements/FormElements/components/FormikInput"
import { validateRequire } from "../../shared/components/UIElements/FormElements/components/FormikValidations"

const ForgotPassword = ({ ...restProps }) => {
    return (
        <Formik onSubmit={() => null}>
            <Form {...restProps} >
                <Heading mt="8" align="center" size="lg">
                    Reset Password
                </Heading>
                <Heading mb="8" size="sm" color="gray.800">
                    Enter your email address below and we'll send you a link to reset your password.
                </Heading>
                <VStack
                    boxShadow="md"
                    borderRadius="xl"
                    w="500px"
                    paddingX="8"
                    paddingY="12"

                >
                    <FormikInput
                        validation={validateRequire}
                        uniqueField="email"
                        label="Email address"
                        placeholder="Email Address"
                    />
                    <Button
                        colorScheme="teal"
                        type="submit"
                        width="100%"
                    >
                        Submit
                    </Button>
                </VStack>
            </Form>
        </Formik>)
}

export default ForgotPassword;