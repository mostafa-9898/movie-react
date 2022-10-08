import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext({
    toggleMode: () => { },
    mode: 'light'
})

export const ColorContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light')

    const colorMode = useMemo(
        () => ({
            toggleMode: () => setMode(prevMode => prevMode === 'light' ? 'dark' : 'light'),
            mode
        }), [mode]
    )

    const theme = createTheme({
        typography: {
            button: {
                textTransform: 'inherit',
            }
        },
        palette: {
            mode: mode,

            primary: {
                main: mode === 'light' ? '#000000' : '#ffffff'
            },

            secondary: {
                main: '#ffffff'
            }
        }
    })


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )

}