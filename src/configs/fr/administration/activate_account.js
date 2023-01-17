// Requires
import axios from "axios";

//Base Url
import { HOST_URL } from "../constants";

// Links
export const ACTIVATE_USER = HOST_URL+"/users/activate";
export const UPDATE_SIRET_STAGE = HOST_URL+"/users/siret-stage";

// Funcs
export function activateUserByToken(token) {
  // Activate user account.
  return axios.get(ACTIVATE_USER+'/'+token,{ 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function goToSiretStepFunc(token) {
  return axios.post(UPDATE_SIRET_STAGE, {}, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}