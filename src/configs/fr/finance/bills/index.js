//Requires
import axios from "axios";

//Base Url
import { FINANCE_HOST_URL } from "configs/fr/constants";

//Bills Routes
export const BILLS_LIST_URL = FINANCE_HOST_URL+"/bills/list";
export const DRAFTS_LIST_URL = FINANCE_HOST_URL+"/drafts/list";
export const ADD_DRAFT_URL = FINANCE_HOST_URL+"/drafts/create";
export const GET_DRAFT_URL = FINANCE_HOST_URL+"/drafts/get";
export const SUBMIT_DRAFT_URL = FINANCE_HOST_URL+"/drafts/submit";

//Bills Funcs
export function getSentBillsListFunc(token) {
  return axios.get(BILLS_LIST_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

export function getSavedBillsListFunc(token) {
  return axios.get(BILLS_LIST_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

export function getEstimatesListFunc(token) {
  return axios.get(BILLS_LIST_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

export function getDraftsListFunc(token) {
  return axios.get(DRAFTS_LIST_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
}

export function addDraftFunc(token, type) {
  return axios.post(ADD_DRAFT_URL,{type}, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
  }});
}

export function getDraftFunc(token, draft_id) {
  return axios.get(`${GET_DRAFT_URL}/${draft_id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
  }});
}

export function submitDraftFunc(token, params) {
  return axios.post(SUBMIT_DRAFT_URL, params, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
  }});
}