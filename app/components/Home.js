import React, { Component } from 'react';
import classNames from 'classnames';

export default class Home extends Component {

	buildSpotLight(spotlight){
		let fields= [];
		// ADD ALBUM CLASS
		const {getSpotifySearch, dispatch} = this.props;
		spotlight.map((album, key)=>{
			fields.push(<div key={key} className = "ps" onClick={()=>{dispatch(getSpotifySearch(album.artist + ' ' + album.name));}}>
				<p className = "ps-albumart" style={{backgroundImage: 'url('+album.image+')'}}/>
			</div>);
		});
		return fields;
	}

	render() {
	const { mostPopular, heavyRotation, newReleases, instantPlay, locationChange, dispatch, playerID } = this.props;
	// ADD HOME CLASS
	return (
		<div className={classNames('songs--popular')} style={{padding:'30em 0'}}>
			<div className={classNames('songs')}>
				<div className = "ps"> 
					<button onClick={()=>{dispatch(instantPlay(heavyRotation[0], 'heavyRotation'));}}>HR</button>
				</div>	
				<div className = "ps" >
					<button onClick={()=>{dispatch(instantPlay(heavyRotation[0], 'mostPopular'));}}>HR</button>
				</div>
				<div className = "ps">
					<button onClick={()=>{dispatch(instantPlay(heavyRotation[0], 'newReleases'));}}>HR</button>
				</div>
			</div>
		</div>
		);
	}
}
