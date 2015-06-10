var bcrypt-nodejs = require('bcrypt-nodejs');
var user = require('../../models/user-model.js');
var jwt = require('../jwt-auth.js');
var router = require('express').Router();

module.exports = function(mongoose){
    router.post('/register', function(req, res){
        var rb = req.body;
        var returnMessage = {
                status:'',
                message:[]
            },
            error = false;

        if (exists({username:rb.username})){
            error = true;
            returnMessage.status = 'Registration failed - Bad data';
            returnMessage.message.push('Username already exists! Please ' +
                    'try another one. Perhaps 1337' + rb.username + 'LEET');
        }
        if (exists({email:rb.email})){
            error = true;
            returnMessage.status = 'Registration failed - Bad data';
            returnMessage.message.push('This email is already linked to an ' +
                    'account. Click here to <a href="#/restorePassword">restore password!</a>');
        }

        // Check password
        if (rb.password.length < 8){
            error = true;
            returnMessage.status = 'Registration failed - Bad data';
            returnMessage.message.push('Password is to short! Must at least be eight characters.');
        }

        if (rb.password.toLowerCase() === rb.password || rb.password.toUpperCase() === rb.password){
            error = true;
            returnMessage.status = 'Registration failed - Bad data';
            returnMessage.message.push('Password must contain both upper and lower case characters!');
        }

        if (!error){
            // Well for now it's good enough to register now.
            var regUser = new user.model({
                username:rb.username,
                email:rb.email,
                password:bqrypt.hashSync(rb.password),
                games:[],
                score:0,
                secretCode:genRandomToken(),
                failedLogin:0,
                accountStatus:user.accountStatus['UNACTIVEATED']
            });

            regUser.save(function(err){
                if (err){
                    returnMessage.status = 'Registration failed - database error';
                    returnMessage.message.push('Something is up with third party libs ' +
                            'because our code is AMAZING!! Unlike my spelling... :/ ');
                } else {
                    returnMessage.status = 'Success - User ' + rb.username + ' was created!';
                    returnMessage.message.push('Please check your email for account acctivation.');
                }
            });
        }

        res.send(returnMessage);
    });

    router.get('/ofs/:action/:email/:token', function(req, res){
        var VALID_ACTION = ['resetpassword', 'activateaccount', 'getfreelolipop'];
        switch (VALID_ACTION.indexOf(req.action)) {
            case 0:

                break;
            case 1:

                break;
            case 2:

                break;

            default:
                // Action not allowed
        }
    });

    var exists = function(query){
        user.find(query, function(err, user){
            if (user.length)
                return true;
            return false;
        });
    };

    var genRandomToken = function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    router.get('/check/:attr/:value', function(req, res){
        var VALID_ATTRS = ['email', 'username'];
        if (VALID_ATTRS.indexOf(req.attr.toLowerCase())>-1){
            //Valid attr to check
            if (exists({req.attr:req.value})){
                res.end({status:'exists'});
            } else {
                res.end({status:'free'});
            }
        }
    });
    
    return router;
};
