import Constants from '../lib/Constants';

const { USER } = Constants;

const user = (state = {email:'', password: '', status: false}, action) => {
  switch (action.type) {
      case USER.EDIT_CREDENTIALS: {
        return _.extend({}, state, {[action.field]: action.data});
      }
      case USER.LOGIN_STATUS: {
        return _.extend({}, state, {status: action.status});
      }
      default: {
          return state;
      }
    }      
}
export default user;