import React, {useEffect, useState} from 'react';
import MultasDetailsView from "../../../views/MultasDetailsView";
import {Multa, MultaResDTO} from "../../../models/Multa";
import {useSession} from "../../../ctx";
import AxiosClient from "../../../AxiosClient";
import {router, useLocalSearchParams} from "expo-router";
import {AxiosResponse} from "axios";

const MultasDetailsViewModel = () => {

    const {id} = useLocalSearchParams();
    const {session, user, userLoading} = useSession();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [multa, setMulta] = useState<Multa>(
        {multaId: 0, razon: "", emitida: new Date(), monto: 0}
    );

    const fetchMulta = async () => {
        try {
            const response : AxiosResponse<MultaResDTO>= await AxiosClient.get(`/Multa/${id}`);
            setMulta({
                multaId: response.data.MultaId,
                monto: response.data.Monto,
                emitida: response.data.Emitida,
                razon: response.data.Razon
            });
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchMulta();
    }, [userLoading])

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