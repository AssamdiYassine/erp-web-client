import {
  USERDATA,
} from '../constants';

const TOKEN = localStorage.getItem('TOKEN');
const COUNTRY = localStorage.getItem('COUNTRY');

const INIT_STATE = {
  token: TOKEN,
  user: null,
  country: COUNTRY,
  loading: true
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
      case USERDATA:
          return { ...state, ...action.payload };
      default: return { ...state };
  }
};

export default userReducer;
