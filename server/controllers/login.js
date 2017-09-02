'use strict';

import loginModel from '../models/Login';

const callback = (method, response) => {
    return (err, res) => {
         if(err) {
            return response.status(500).json(err);
        }
        return response.status(200).json(res);
    };
};


module.exports = {
    register: (req, res, next) => {
        // let login = new loginModel();
        // login.registerUser(req, callback('POST', res));
    },
    login: (req, res, next) => {
        // let login = new loginModel();
        // login.loginUser(req, callback('PUT', res));
    }
}