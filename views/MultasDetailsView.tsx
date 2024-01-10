import {Text, TouchableOpacity, View} from "../components/Themed";
import {ActivityIndicator, Image, SafeAreaView} from "react-native";
import {Multa} from "../models/Multa";
import Colors from "../constants/Colors";

export type MultasDetailsViewModelType = {
    isLoading: boolean,
    multa: Multa,
    handlePagar: () => void,
}

const MultasDetailsView = ({viewModel}: { viewModel: MultasDetailsViewModelType }) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, padding: 24}}>
                <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 24}}>Detalle de Multa</Text>
                <View style={{marginTop: 18}}>
                    <Image source={{uri: "https://placehold.co/300x200.jpg"}}
                           style={{width: 300, height: 200, alignSelf: "center"}}/>
                    <Text style={{marginTop: 18, fontWeight: "bold", fontSize: 20}}>Razon</Text>
                    <Text style={{fontSize: 16}}>{viewModel.multa.razon}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>Monto a pagar</Text>
                    <Text style={{fontSize: 16}}>${parseFloat(viewModel.multa.monto + "").toFixed(2)}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>Fecha de emision</Text>
                    <Text style={{fontSize: 16}}>{(new Date(viewModel.multa.emitida)).toLocaleDateString()}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>Hora de emision</Text>
                    <Text style={{fontSize: 16}}>{(new Date(viewModel.multa.emitida)).toLocaleTimeString()}</Text>
                    <View style={{marginTop: 18}}>
                        {viewModel.isLoading ? (
                            <ActivityIndicator color={Colors.primary}/>
                        ) : (
                            <TouchableOpacity onPress={viewModel.handlePagar}>
                                <Text>Pagar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
        ;
};

export default MultasDetailsView;