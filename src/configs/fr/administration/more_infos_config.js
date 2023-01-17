//Requires
import axios from "axios";

//Base Url
import { HOST_URL } from "../constants";

//More Infos Routes
export const UPDATE_COMPANY_INFOS = HOST_URL+"/users/update-infos";
export const GET_COMPLEMENT_INFOS_URL = HOST_URL+"/users/complement-infos";
export const UPDATE_COMPLEMENT_INFOS_URL = HOST_URL+"/users/update-complement-infos";

//More Infos Funcs
export function getComplementDataFunc(token) {
  return axios.get(GET_COMPLEMENT_INFOS_URL, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

export function updateComplementFunc(token, params) {
  return axios.post(UPDATE_COMPLEMENT_INFOS_URL, params, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

