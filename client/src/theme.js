import { extendTheme } from "@chakra-ui/react";

export const THEME = extendTheme({
    styles: {
        global: {
            "body": {
                'color': '#2e2e2e',
                'background': '#F8F9F9'
            },
            '#root': {
                'min-height': "100vh",
                height: '100%'
            },
            ".auth-form": {
                "padding": '0 15px'
            },
            a: {
                color: "teal.500",
            },  
        },
    },
})