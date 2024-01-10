import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "../components/Themed";
import {ActivityIndicator, Image, Modal, SafeAreaView, StyleSheet} from "react-native";
import {Usuario} from "../models/Usuario";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import COLORS from "../constants/Colors";

type PerfilViewModelType = {
    user: Usuario,
    changePasswordModalVisible: boolean,
    showChangePasswordModal: () => void,
    hideChangePasswordModal: () => void;
    handleLogout: () => void,
    handleNuevaContrasenia: (text: string) => void;
    handleNuevaContraseniaConfirmation: (text: string) => void;
    handlePasswordChange: () => void;
    changingPassword: boolean,
}

const PerfilView = ({viewModel}: { viewModel: PerfilViewModelType }) => {
    return (
        <SafeAreaView style={styles.flex}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                    source={{uri: "https://placehold.co/230x230.png"}}
                    style={styles.profileImage}
                />
                <Text style={styles.nameText}>{viewModel.user.nombre}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>IdBanner</Text>
                    <Text style={styles.infoText}>{viewModel.user.idBanner}</Text>
                    <Text style={styles.title}>Carrera</Text>
                    <Text style={styles.infoText}>{viewModel.user.carrera}</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={viewModel.showChangePasswordModal}>
                            <Text>Cambiar Contraseña</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={viewModel.handleLogout}>
                            <Text>Cerrar Sesion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal visible={viewModel.changePasswordModalVisible} transparent>
                    <View style={styles.modalContainer} lightColor={"#fafafa"} darkColor={"#0d0d0d"}>
                        <View style={styles.modalInfoContainer}>
                            {viewModel.changingPassword ? (
                                <ActivityIndicator style={styles.loadingIndicator} size={"large"}/>
                            ) : (
                                <TouchableOpacity style={styles.loadingIndicator} onPress={viewModel.hideChangePasswordModal}>
                                    <MaterialCommunityIcons color={"#FFF"} name={"close"} size={30}/>
                                </TouchableOpacity>
                            )}
                            <Text style={styles.modalTitle}>Cambio de Contraseña</Text>
                            <View style={styles.textInputContainer}>
                                <Text lightColor={COLORS.primary} darkColor={COLORS.primary}>Contraseña nueva</Text>
                                <TextInput onChangeText={viewModel.handleNuevaContrasenia} style={styles.textInput}/>
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text lightColor={COLORS.primary} darkColor={COLORS.primary}>Confirmar contraseña nueva</Text>
                                <TextInput onChangeText={viewModel.handleNuevaContraseniaConfirmation} style={styles.textInput}/>
                            </View>
                            <View style={{marginTop: 20}}>
                                {viewModel.changingPassword ? (
                                    <ActivityIndicator color={COLORS.primary} size={"large"}/>
                                ) : (
                                    <TouchableOpacity onPress={viewModel.handlePasswordChange}>
                                        <Text>Cambiar Contraseña</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    profileImage: {
        borderRadius: 200,
        width: 230,
        height: 230,
        marginTop: 30
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15
    },
    infoContainer: {
        width: '80%',
        marginTop: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    infoText: {
        fontSize: 16
    },
    buttonsContainer: {
        marginTop: 30,
        gap: 15
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalInfoContainer: {
        height: '70%',
        width: '80%',
        borderRadius: 15,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingIndicator: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    textInputContainer: {
        width: '100%',
        marginVertical: 10
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    modalTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
})

export default PerfilView;