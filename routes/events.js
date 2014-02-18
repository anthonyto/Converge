
/*
 * GET events
 */

exports.list = function(req, res, next){
	if(req.query){
		if(!req.query["eventid"]){
			return next(new Error("Invalid parameters"));
		}
		// retrieve event
		// check if user has access
		// list event info
		res.send({
			eventid: req.query["eventid"],
			eventTitle: "Placeholder",
			eventDate: "Placeholder",
			pictures: [
				"one.jpg",
				"two.jpg"
			]
		});
	} else {
		res.send({user: req.params.userid});
	}
};