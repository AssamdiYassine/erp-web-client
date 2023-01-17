import axios from "axios";
import { HOST_URL } from '../constants'

//Activities
export const LIST_ACTIVITIES = HOST_URL+"/activities";
export const ONE_ACTIVITY = HOST_URL+"/activities/code";
//End Activities

//Activities Funcs
export function getListActivites(token) {
 
  return axios.get(LIST_ACTIVITIES,{ 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    }
  });
}

export function getActivity(token, param) {
 
  return axios.get(ONE_ACTIVITY, {
      params: {
      code: param
    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    } 
  });
}
//End Activities Funcs