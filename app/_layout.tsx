import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Slot} from 'expo-router';
import {useColorScheme} from 'react-native';
import {SessionProvider} from "../ctx";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(app)',
};

export default function RootLayout() {
    return <RootLayoutNav/>;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <SessionProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Slot/>
            </ThemeProvider>
        </SessionProvider>
    );
}
