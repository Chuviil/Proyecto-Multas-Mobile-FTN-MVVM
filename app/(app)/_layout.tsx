import {Redirect, router, Stack} from 'expo-router';
import {Text, TouchableOpacity} from '../../components/Themed';
import {Image, useColorScheme} from 'react-native';

import {useSession} from '../../ctx';
import Images from "../../constants/Images";

export default function AppLayout() {
    const {session, isLoading} = useSession();
    const theme = useColorScheme() ?? 'light';

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in"/>;
    }

    // This layout can be deferred because it's not the root layout.
    return <Stack screenOptions={{
        headerTitle: () => (
            <Image style={{width: 110, height: 49, marginVertical: 5}}
                   source={theme === 'light' ? Images.udlaLogoNegro : Images.udlaLogoBlanco}/>
        ),
        headerTitleAlign: 'center',
        headerRight: () => (
            <TouchableOpacity
                style={{
                    width: 45,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    overflow: 'hidden'
                }}
                onPress={() => router.push("/usuario/perfil")}
            >
                <Image source={{uri: "https://placehold.co/45x45.png"}} style={{width: 45, height: 45}}/>
            </TouchableOpacity>
        )
    }}/>;
}
