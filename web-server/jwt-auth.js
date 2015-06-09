var jwt = require('jsonwebtoken');
// var userModel = require('./../models/user-model');

module.exports = (function(/*mongoose,*/ secret){
    exp = {};

    exp.Authenticate = function(req, res, next){
        // Is there a JWT passed alng??
        // Check cookies
        req.jwt.isAuthed = false;
        req.jwt.userdata = null;
        var jwtCookie = req.cookies.jwt;
        if (jwtCookie == ""){
            next();
        }
        //Soppouse we have the token now..
        // Have we signed it??
        jwt.verify(jwtCookie, secret, function(err, user){
            if (err){
                // Opsie, an error ocured
                console.log('A JWT was passed, but it was not signed by us. ' +
                        'better keep a look out!');
                return next();
            }
            // Way we get the user, lets check if the time ran out
            if (Math.floor(Date.now()/1000) < user.expires){
                // JWT has expired
                return next();
            }

            // All is good, get the user
            // userModel.model.findOne({email:user.email}, function(err, user){
            //     if (err){
            //         // Well, this is not good...
            //         console.log('WARNING: JWT signed, but user not found. This should not happen' +
            //                 ' Check if database contains ' + user.email + ' if it does, Probaby ' +
            //                 'mongose fucked up. Otherwise change JWT secret in server-info.json!');
            //
            //         return next();
            //     }
            //     // Save the user to req
            //     req.jwt.userdata = user;
            //     req.jwt.isAuthed = true;
            // });

            req.jwt.userdata = user.email;
            req.jwt.isAuthed = true;
            console.log('User with email ' + user.email + ' was authenticated ' +
                    'using JWT!');
            next();
        });

    };

    exp.signData = function(data){
        return jwt.sign(data, secret);
    }

    exp.signUser = function(email, expires, data){
        data = data || {};
        if (typeof data !== "object")
            data = {};
        data.email = email;
        data.expires = expires;
        return this.signData(data);
    }

    return exp;
})
