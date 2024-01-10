import React, {useState} from 'react';
import MultasDetailsView from "../../../views/MultasDetailsView";
import {Multa} from "../../../models/Multa";
import {useSession} from "../../../ctx";
import AxiosClient from "../../../AxiosClient";
import {router, useLocalSearchParams} from "expo-router";

const MultasDetailsViewModel = () => {

    const {id} = useLocalSearchParams();
    const {session, user} = useSession();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [multa, setMulta] = useState<Multa>({multaId: 0, razon: "", emitida: new Date(), monto: 0});

    const handlePagar = async () => {
        try {
            await AxiosClient.delete(
                `/Multa/${id}`,
                {headers: {'Authorization': `Bearer ${session}`}})
                .then(res => {
                    router.back();
                });
        } catch (e) {
            alert(e);
        }
    }

    const viewModel = {
        isLoading,
        multa,
        handlePagar
    }

    if (!user) return null;

    return <MultasDetailsView viewModel={viewModel}/>
};

export default MultasDetailsViewModel;