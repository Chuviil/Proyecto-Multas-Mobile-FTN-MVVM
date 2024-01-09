import React, {useEffect, useState} from 'react';
import MultasView from "../../views/MultasView";
import {Multa, MultaResDTO} from "../../models/Multa";
import AxiosClient from "../../AxiosClient";
import {useSession} from "../../ctx";
import {AxiosResponse} from "axios";

const MultasViewModel = () => {
    const {user, userLoading} = useSession();

    const [multas, setMultas] = useState<Multa[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const handleCardPress = (id: number) => {
        console.log(id);
    }

    const fetchMultas = async () => {
        setIsFetching(true);

        try {
            const response : AxiosResponse<MultaResDTO[]>= await AxiosClient.get(`/Ayudante/${user.idBanner}/multas`);
            setMultas(response.data.map((multa) => ({
                multaId: multa.MultaId,
                monto: multa.Monto,
                emitida: multa.Emitida,
                razon: multa.Razon
            })));
        } catch (e) {
            console.log(e)
        } finally {
            setIsFetching(false);
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchMultas();
        setRefreshing(false);
    }

    useEffect(() => {
        fetchMultas();
    }, [userLoading]);

    const viewModel = {
        multas,
        isFetching,
        usuario: user,
        refreshing,
        onRefresh,
        handleCardPress,
    }

    if (!user) return null;

    return <MultasView viewModel={viewModel}/>
}

export default MultasViewModel;