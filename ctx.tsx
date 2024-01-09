import React from 'react';
import {useStorageState} from './useStorageState';
import {Usuario} from "./models/Usuario";

const AuthContext = React.createContext<{
    signIn: (token: string, user: string) => void;
    signOut: () => void;
    session?: string | null;
    user: Usuario,
    userLoading: boolean,
    isLoading: boolean,
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    user: {nombre: "", carrera: "", idBanner: ""},
    userLoading: false,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[userLoading, user], setUser] = useStorageState('user');

    return (
        <AuthContext.Provider
            value={{
                signIn: (token: string, user: string) => {
                    // Perform sign-in logic here
                    setSession(token);
                    setUser(user);
                },
                signOut: () => {
                    setSession(null);
                    setUser(null);
                },
                session,
                user: JSON.parse(user as string),
                isLoading,
                userLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
