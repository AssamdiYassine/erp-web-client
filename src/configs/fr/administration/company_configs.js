import axios from "axios";
import { HOST_URL } from '../constants'

//Companies
export const COMPANY = HOST_URL+"/companies/company";
export const UPDATE_COMPANY = HOST_URL+"/companies/update-company";
export const UPDATE_COMPANY_INFOS = HOST_URL+"/companies/update-company-infos";
export const GET_ACTIVITY_DATA_URL = HOST_URL+"/companies/company-activity-data";
export const UPDATE_ACTIVITY_URL = HOST_URL+"/companies/update-company-activity";
//End Companies

//Companies Funcs
export function getCompanyFunc(token) {
  return axios.get(COMPANY, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}
export function UpdateCompany(token, params) {
  return axios.post(UPDATE_COMPANY, params, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    }
  });
}
export function UpdateCompanyInfos(token, params) {
  return axios.post(UPDATE_COMPANY_INFOS, params, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    }
  });
}
export function getActivityDataFunc(token) {
  
  return axios.get(GET_ACTIVITY_DATA_URL, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}
export function updateActivityFunc(data, token) {
  
  return axios.post(UPDATE_ACTIVITY_URL, data, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}
//End Companies Funcs