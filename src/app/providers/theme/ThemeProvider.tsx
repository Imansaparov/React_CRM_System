import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContextType = {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        const savedMode = localStorage.getItem('themeMode');
        return (savedMode === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
    });

    const toggleTheme = useCallback(() => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    }, []);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: mode === 'dark' ? '#90caf9' : '#1976d2',
                    },
                    secondary: {
                        main: mode === 'dark' ? '#f48fb1' : '#dc004e',
                    },
                    background: {
                        default: mode === 'dark' ? '#121212' : '#f5f5f5',
                        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
                    },
                },
                typography: {
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                transition: 'background-color 0.3s ease',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    const contextValue = useMemo(
        () => ({
            mode,
            toggleTheme,
        }),
        [mode, toggleTheme]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;