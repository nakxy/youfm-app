import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions'

const { HOME, PLAYLIST, SEARCH} = Constants;

let spotifySearchComplete=(tracks)=>{
	return {
		type:SEARCH.SPOTIFY_SEARCH_COMPLETE,
		tracks: tracks
	}
}

let setHomeData=(data)=>{
	return {
		type:HOME.SET_HOME_DATA,
		data
	}
}
let setPlaylistData=(data)=>{
	return {
		type:PLAYLIST.SET_PLAYLIST_DATA,
		data
	}
}

export function getHomeData(){
	return(dispatch,getState)=>{
		axios({
		  method:'get',
		  url:'/api/v1/albums'
		}).then(res=>{
			dispatch(batchActions([
				setHomeData(res.data),
				setPlaylistData(res.data)
			]));
		});
	}
}

export function getYoutubeSearch(){
	return(dispatch,getState)=>{
		axios({
		  method:'get',
		  url:'/api/v1/youtube'
		}).then(res=>{
			dispatch(spotifySearchComplete(res.data.tracks.items));
		});
	}
}

export function getSpotifySearch(searchKey){
	return(dispatch,getState)=>{
		axios({
		  method:'get',
		  url:'/api/v1/spotify?search='+searchKey
		}).then(res=>{
			dispatch(batchActions([
      			spotifySearchComplete(res.data),
      			searchKeyword('')
    			])
    		);
		});
	}
}

export function searchKeyword(data){
	return {
		type: SEARCH.EDIT_SEARCH_KEY,
		searchKey: data
	};
}