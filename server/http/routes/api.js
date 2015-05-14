var express = require('express');
var router = express.Router();

router.route('/stats')
	.get(function(req, res){
		//No functionality for now
		res.send({message:"Here, You get the stats, you get the stats, EVERYBODY GETS THE STATS"});
	});

module.exports = router;
