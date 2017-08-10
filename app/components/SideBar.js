import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classNames';
import { batchActions } from 'redux-batched-actions';
export default class SideBar extends Component {
  render() {
  	// ADD SIDEBAR CLASS
    const query = this.props.params.play ? this.props.params.play : '';
		const {children, store, locationChange, dispatch, toggleLogin, user} = this.props
    return (
		<div className={classNames('rail', 'rail--left')} style={{overflow: 'auto'}}>
			<div className={classNames("navigation__mobile")}>
				<div id="nav-icon3">
					<span></span><span></span><span></span><span></span>
				</div>
			</div>
			<div className={classNames('navigation--main')}>
				<a href={"/home/"+query}>
					<img className={classNames("navigation__logo")}/>
				</a>
				<ul className={classNames('navigation')}>
					<li><Link to={"/heavyRotation/"+query} activeClassName="active">Heavy Rotation</Link></li>
					<li><Link to={"/mostPopular/"+query} activeClassName="active">Most Popular</Link></li>
					<li><Link to={"/newReleases/"+query} activeClassName="active">New & Fresh</Link></li>
				</ul>
				<ul  className={classNames('navigation')}>
					<h4> My Music </h4>
					<li><Link to={"/nowPlaying/"+query} activeClassName="active">Now Playing</Link></li>
					<li><Link to={"/favourite/"+query} activeClassName="active">Favourites</Link></li>
				</ul>
			</div>
			{!user.status ? 
			<div className={classNames("navigation--actions")}>
				<button className={classNames("button--primary")} style={{marginBottom: "15px"}} 
					onClick={()=> {dispatch(batchActions([
						toggleLogin(),
						locationChange('/Login/'+query)
						])
					);
				}} >Login</button> 
				<div className={classNames("register")}>
					<div className={classNames("register__title")}>Don't have an account?
						<div className={classNames("register__title")}>Create one now to create playlists and save favorite tracks.</div>
						<button className={classNames("button--primary")} style={{marginBottom: "15px"}} 
							onClick={()=> {dispatch(batchActions([
								toggleLogin(),
								locationChange('/Register/'+query)
								])
							);
						}} >Register</button>
					</div>
				</div>
			</div> : null }
		</div>);
	}
}