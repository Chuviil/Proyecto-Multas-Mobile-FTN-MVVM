import {ActivityIndicator, Image, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import IMAGES from "../constants/Images";
import {Text, TextInput, View} from "../components/Themed";
import COLORS from "../constants/Colors";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {SignInViewModelType} from "../models/Usuario";


const SignInView = ({viewModel}: { viewModel: SignInViewModelType }) => {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={styles.flex}>
            <View style={[styles.container, {paddingTop: insets.top}]}>
                <Image resizeMode={"contain"} source={IMAGES.udlaLogoBlanco}
                       style={styles.image}/>
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.description}>Revisemos tus multas!</Text>
                    <View style={styles.textInputContainer}>
                        <Text lightColor={COLORS.primary} darkColor={COLORS.primary}>Id Banner</Text>
                        <TextInput onChangeText={viewModel.handleIdBannerChange} style={styles.textInput}/>
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text lightColor={COLORS.primary} darkColor={COLORS.primary}>Contraseña</Text>
                        <TextInput
                            onChangeText={viewModel.handleContraseniaChange}
                            style={styles.textInput}
                            secureTextEntry
                        />
                    </View>
                    <View style={{marginTop: 60}}>
                        {viewModel.isLoading ? (
                            <ActivityIndicator color={COLORS.primary} size={"large"}/>
                        ) : (
                            <TouchableOpacity onPress={viewModel.handleSignIn}>
                                <Text>Iniciar Sesión</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 322,
        height: 116,
        marginTop: 45
    },
    loginContainer: {
        width: '80%',
        marginTop: 60
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        marginBottom: 60
    },
    textInputContainer: {
        width: '100%',
        marginVertical: 10
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
})

export default SignInView;