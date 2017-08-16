'use strict';

import _ from 'lodash';
import async from 'async';
import spotifyClient from 'spotify-web-api-node';
import billboardClient from 'billboard-hot-100';
import request from 'request';
import path from 'path';

var scrape = require('muse-pull');

var spotify = new spotifyClient({
    clientId : '9e8b29bd18634b57bad77f5769cf576f',
    clientSecret : 'bf6760e931944fc69c603799b258a0db',
    redirectUri : 'http://www.youfm.org'
});

class Albums {
    constructor() {
        /*Can set context here*/
    }

    getAlbums(req, callback){
        var results = _.get(req, 'session.albums', false);
        if(results){
            return callback(null, results);
        }
        async.waterfall([
            function(cb){
                spotify.clientCredentialsGrant()
                .then(function(data) {
                    spotify.setAccessToken(data.body['access_token']);
                    cb(null, spotify);
                }, function(err) {
                    console.log('Something went wrong when retrieving an access token', err);
                    cb(err, null);
                });
            },
            function(spotify, cb){
                this.getSpotifyAlbums(spotify, cb);
            }.bind(this)
        ],function(err, results){
            if(err){
                return callback(true, null);
            }
            req.session.albums = results;
            callback(null, results);    
        });   
    }

    getSpotifyAlbums(spotify, cb){
        async.parallel({
            newReleases: function(callB) {
                spotify.getNewReleases({ limit : 10, offset: 0, country: 'US' }, function( error, response){
                    if(response){
                        var releases = _.get(response , 'body.albums.items', []);
                        var newReleaseList = [];
                        _.forEach(releases, function(release){
                            var newRelease = {
                                artist: _.get(release, 'artists[0].name'),
                                songId: release.id,
                                image: _.get(release, 'images[0].url', ''),
                                albumName: release.album_type,
                                name: release.name
                            };
                            newReleaseList.push(newRelease);
                        });
                        callB(null, newReleaseList);    
                    }else {
                        callB(true, null);
                    }
                    
                });
            },
            popular: function(callB) {
<<<<<<< HEAD
                scrape('Music', 80, function (err, tracks) {
                    if(err){
                        return callB(true, null);
=======
                request({uri: 'https://rss.itunes.apple.com/api/v1/us/apple-music/top-songs/25/explicit.json', json: true}, function (err, results) {
                    if(!err && results){
                        var tracks = _.get(results, 'body.feed.results', []);
                        var popularSongs = [];
                        _.forEach(tracks, function(track){
                            var popularSong = {
                                songId: track.id,
                                name: track.name,
                                artist: track.artistName,
                                image: track.artworkUrl100
                            };
                            popularSongs.push(popularSong);
                        });
                        return callB(null, popularSongs);
>>>>>>> upstream/develop
                    }
                    var popularSongs = [];
                    _.forEach(tracks, function(track){
                        var popularSong = {
                            id: track.id,
                            name: track.track,
                            artist: track.artist,
                            image: "http://img.youtube.com/vi/"+ track.url.split('=')[1] + "/0.jpg"
                        };
                        popularSongs.push(popularSong);
                    });
                    return callB(null, popularSongs);
                });
            },
            billboard: function(callB){
                billboardClient.init().then(function(billboard){
                    var songs = billboard.getAllSongs();
                    var billBoardSongs = [];
                        _.forEach(songs, function(song){
                            var billBoardSong = {
                                name: song.name,
                                artist: song.artist,
                                image: song.image,
                                rank: song.rank
                            };
                            billBoardSongs.push(billBoardSong);
                        });
                    callB(null, billBoardSongs);
                }).catch(function(err){
                    callB(err, null);
                });
            },
            images: function(callB) {
                let imageList = {
                    jumbo: path.resolve(__dirname ,'../../app/images/u2-home-bg.png'),
                    logo: path.resolve(__dirname ,'../../app/images/youFm.svg')
                }
                callB(null, imageList);
            },
            albums: function(callB){
                request({uri: 'https://rss.itunes.apple.com/api/v1/us/apple-music/top-albums/5/explicit.json', json: true}, function (err, results) {
                    if(!err && results){
                        var albums = _.get(results, 'body.feed.results', []);
                        var topAlbums = [];
                        _.forEach(albums, function(album){
                            topAlbums.push({
                                id: album.id,
                                name: album.name,
                                artist: album.artistName,
                                image: album.artworkUrl100
                            });
                        });
                        return callB(null, topAlbums);
                    }
                    callB(err, null);
                });
            }
        }, function(err, results) {
            if(err){
                return cb(err, null);
            }
            cb(null, results);
        });
    }
}

export default Albums;