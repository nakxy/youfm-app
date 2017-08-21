import Constants from '../lib/Constants';
import _ from 'lodash'

const { SEARCH } = Constants;

const search = (state = {searchKey:'',tracks:[], error: false}, action) => {
  switch (action.type) {
    case SEARCH.EDIT_SEARCH_KEY: {
      return _.extend({}, state, {searchKey: action.searchKey});
    }
    case SEARCH.SPOTIFY_SEARCH_COMPLETE: {
      return _.extend({}, state, {tracks: action.tracks, searchKey:action.searchKey, error: action.error});
    }
    default:
      return state
  }
}

export default search;