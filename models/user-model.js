var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountStatus = { // Don't really know if this is smart or not....
    0:'BLOCKED',
    1:'UNACTIVEATED',
    2:'ACTIVE',
    'BLOCKED':0,
    'UNACTIVEATED':1,
    'ACTIVE':2
}

var userModel = {
    username:String, // Use this for display name
    email:String, // Use this for login
    password:String, // Remember to propperly hash me.

    // General user information
    // Game stats, array for every game played
    games:[{
        name:String, // Game name
        score:Number, // End score for player of game "name"
        // ... More game information
        played:{type:Date, default:Date.now} // Date played game,

    }],
    score:Number, // Update for every finnished game.

    // Usefull information
    lastActive:{type:Date, default:Date.now}, // Update everytime active
    created:{type:Date, default:Date.now},
    secretCode:String, // Use this for email verification, password change and ...
    failedLogin:Number, // You can only fail to login... Lets say 5 times
    accountStatus:Number
}

var userModelSchema = new Schema(userModel);

var modules = export.module = {};
modules.model = mongoose.model('User', userModelSchema);
modules.Schema = userModelSchema;
modules.userObject = userModel;
modules.accountStatus = accountStatus;
