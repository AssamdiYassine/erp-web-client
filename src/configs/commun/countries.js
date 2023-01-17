//Requires
import axios from "axios";


//Base Url
const HOST_URL = 'https://chronos-region.herokuapp.com/v1/api';

//Auth
export const FETCH_REGIONS_URL = HOST_URL+"/countries";
export const CHECK_CREDENTIAL_URL = HOST_URL+"/credential/check/";
export const REGISTER_CREDENTIAL_URL = HOST_URL+"/credential/create";

//Auth Funcs
export function CountriesFunc() {
  return axios.get(FETCH_REGIONS_URL, { 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
}

export function CheckFunc(value) {
  return axios.get(CHECK_CREDENTIAL_URL+value);
}

export function CreateFunc(email, country_id) {
  return axios.post(REGISTER_CREDENTIAL_URL, { email, country: country_id });
}

