import React from 'react';
import {Text, View, TouchableOpacity} from "../components/Themed";
import {ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet} from "react-native";
import {Multa} from "../models/Multa";
import {Usuario} from "../models/Usuario";
import Colors from "../constants/Colors";

type MultasViewModelType = {
    multas: Multa[],
    isFetching: boolean,
    usuario: Usuario,
    refreshing: boolean,
    onRefresh: () => void,
    handleCardPress: (id: number) => void
}

const MultasView = ({viewModel} : {viewModel : MultasViewModelType}) => {
    return (
        <SafeAreaView style={styles.flex}>
            <View style={styles.container}>
                <Text style={styles.bienvenidoText}>
                    Bienvenid@, {viewModel.usuario.nombre}
                </Text>
                <Text style={styles.description}>
                    Multas por pagar ({viewModel.usuario.idBanner})
                </Text>
                {viewModel.isFetching ? (
                    <ActivityIndicator color={Colors.primary}/>
                ) : (
                    <FlatList
                        data={viewModel.multas}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                lightColor={"#fafafa"}
                                darkColor={"#0d0d0d"}
                                style={styles.cardContainer}
                                onPress={() => viewModel.handleCardPress(item.multaId)}
                            >
                                <Text numberOfLines={1} style={styles.cardTitle}>{item.razon}</Text>
                                <Text>Valor a pagar: ${parseFloat(item.monto + "").toFixed(2)}</Text>
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={viewModel.refreshing} onRefresh={viewModel.onRefresh}/>}
                        ListEmptyComponent={() => (
                            <Text style={{textAlign: 'center'}}>No se encontraron multas a tu nombre, sigue asi!</Text>
                        )}
                    />
                )}
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
        padding: 20,
    },
    bienvenidoText: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20
    },
    description: {
        marginBottom: 16,
        fontWeight: 'bold',
        fontSize: 20
    },
    cardContainer: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default MultasView;
