import axios, {AxiosInstance} from "axios";

const AxiosClient : AxiosInstance = axios.create({
    baseURL: "https://proyectomultas.azurewebsites.net/api",
});

export default AxiosClient;