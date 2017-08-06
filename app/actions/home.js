import axios from 'axios';
import Constants from '../lib/Constants';
import { batchActions } from 'redux-batched-actions';
import * as PlayerActions from './player';
import * as NowPlayingActions from './nowPlaying';
import {browserHistory} from 'react-router';
import * as RoutingActions from './routing';

const { HOME, PLAYLIST, SEARCH, NOW_PLAYING} = Constants;

let spotifySearchComplete=(searchKey,tracks, error)=>{
	return {
		type:SEARCH.SPOTIFY_SEARCH_COMPLETE,
		tracks,
		searchKey, 
		error
	}
}

let setHomeData=(data)=>{
	return {
		type:HOME.SET_HOME_DATA,
		data
	}
}
let setInitialPlaylist=(data)=>{
	return {
		type:PLAYLIST.SET_INITIAL_PLAYLIST_DATA,
		data
	}
}

let setPlaylist=(name,tracks)=>{
	return {
		type:PLAYLIST.SET_PLAYLIST_DATA,
		tracks,
		name
	}
}

export function resetPlaylistOrder(name,data){
	let tracks = [];
	data.map((item)=>{
		tracks.push(item.content.props.track);
	});
	if(name === 'nowPlaying'){
		return {
			type:NOW_PLAYING.RESET_QUEUE,
			tracks
		}
	}
	else{
		return {
			type:PLAYLIST.SET_PLAYLIST_DATA,
			tracks,
			name
		}
	}
}

export const getHomeData = () => (dispatch, getState) =>{
	return axios({
		method:'get',
		url:'/api/v1/albums'
	}).then(res=>{
		dispatch(batchActions([
			setHomeData(res.data),
			setInitialPlaylist(res.data)
		]));
	});
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
		let state = getState();
		axios({
		  method:'get',
		  url:'/api/v1/spotify?search='+searchKey
		}).then(res=>{
			dispatch(batchActions([
				RoutingActions.locationChange(`/search/${searchKey}/${state.player.id}`),
      			spotifySearchComplete(searchKey,res.data, false),
      			setPlaylist('search',res.data)
    			])
    		);
		})
		.catch(err => {
			dispatch(spotifySearchComplete(searchKey, [], true));
		});
	}
}

export function searchKeyword(data){
	return {
		type: SEARCH.EDIT_SEARCH_KEY,
		searchKey: data
	};
}