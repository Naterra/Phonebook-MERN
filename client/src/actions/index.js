import axios from 'axios';
import * as types from './types';


// axios.defaults.baseURL = 'http://phonebook.app/new_phonebook/';
//axios.defaults.baseURL =  'http://localhost:3001/';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function delete_contact(id, callback) {
  axios.post(`/api/delete_contact`, { id: id }).then(() => callback());

  return {
    type: types.DELETE_CONTACT,
    id
  };
}

export function reset_pager() {
  return {
    type: types.RESET_PAGER,
    payload: null
  };
}

export function reset_filter() {
  return {
    type: types.RESET_FILTER,
    payload: {}
  };
}
export function set_filter_page(term) {
  return {
    type: types.SET_FILTER_PAGE,
    payload: term
  };
}

export function set_filter_term(term) {
  return {
    type: types.SET_FILTER_TERM,
    payload: term
  };
}

export function saveContact(values, callback) {
  const request = axios.post(`/api/save_contact`, values).then(() => callback());

  console.log('request saveContact:', request);

  return {
    type: types.SAVE_CONTACT,
    payload: request
  };
}

export function fetchContact(id) {
  const request = axios.get(`/api/get_contact/${id}`);

  return {
    type: types.FETCH_CONTACT,
    payload: request
  };
}

export function fetchContacts(filter) {
  //const request = axios.get(`/api/get_contacts?limit=${filter.limit}&filterBy=${filter.term}&page=${filter.page}`);

  const request = axios.get(`/api/get_contacts`, {params: filter});

  return {
    type: types.FETCH_CONTACTS,
    payload: request
  };
}

// export const fetchContacts = () =>async dispatch => {
//     const res = await axios.get('/api/index.php?action=contacts');
//     dispatch({ type:FETCH_CONTACTS, payload: res.data });
// };
