var express = require('express');
var router = express.Router();

router.route('/login')
	.post(function(req, res){
		//No functionality for now
		res.send({message:"Create a login form"});
	});

module.exports = router;
