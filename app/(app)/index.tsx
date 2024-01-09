import React from 'react';
import {Text, View} from '../../components/Themed';
import {useSession} from '../../ctx';

export default function Index() {
    const {signOut, user} = useSession();

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Hola {user.nombre}</Text>
            <Text
                onPress={() => {
                    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                    signOut();
                }}
            >
                Sign Out
            </Text>
        </View>
    );
}
