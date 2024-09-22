import { apiKey } from "./apiConfig";

const apiConfig = {
    login:`${apiKey.API_URL}login`,
    signUp:`${apiKey.API_URL}signUp`,
    allProducts: `${apiKey.API_URL}products/all`,
    singleProduct:`${apiKey.API_URL}products/OneProduct`
}

export default apiConfig