import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {useColorScheme} from 'react-native';

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
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(app)"/>
            </Stack>
        </ThemeProvider>
    );
}
