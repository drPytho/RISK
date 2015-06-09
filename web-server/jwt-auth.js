var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


module.exports = (function(){
    exp = {};

    exp.Authenticate = function(req, res, next){
        // Is there a JWT passed alng??
        // Check cookies


        // Have we signed it??
        next();
    };

    return exp;
})
