import axios from "axios";
import { HOST_URL } from '../constants'

//Documents
export const LIST_DOCUMENTS = HOST_URL+"/documents/list";
export const ADD_DOCUMENT = HOST_URL+"/documents/add";
export const EDIT_DOCUMENT = HOST_URL+"/documents/rename";
export const MOVE_DOCUMENT = HOST_URL+"/documents/move";
export const DELETE_DOCUMENT = HOST_URL+"/documents/delete";
// export const UPLOAD_URL = "http://localhost:4001/api/upload"
export const UPLOAD_URL = "https://chronos.business/upload-service/api/upload"
//End Documents

//Documents Funcs
export function getListDocuments(token, filter) {
 
  return axios.get(LIST_DOCUMENTS, {
    params: {
      filter
    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    }
  });
}

export function addDocument(token, params) {
  return axios.post(ADD_DOCUMENT, params, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    }
  });
}

export function editDocument(token, params) {
 
  return axios.post(EDIT_DOCUMENT, params, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    }
  });
}

export function deleteDocument(token, id) {
 
  return axios.post(DELETE_DOCUMENT, {id}, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    }
  });
}

export function uploadDocument(token, formData, setProgress) {
  return axios.post(UPLOAD_URL, formData, {
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": token
    },

    onUploadProgress: data => {

      //Set the progress value to show the progress bar

      setProgress(Math.round((100 * data.loaded) / data.total))

    },
  })
}

export function moveDocument(token, params) {
 
  return axios.post(MOVE_DOCUMENT, params, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": token
    }
  });
}
//End Documents Funcs