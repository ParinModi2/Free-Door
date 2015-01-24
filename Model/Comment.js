var offerobj = require("../DatabaseObjs/OfferObj");
var offerobj = new offerobj();
var commentobj = require("../DatabaseObjs/ComObj");
var commentobj = new commentobj();

var ejs = require("ejs");

function Comment() {

}


Comment.prototype.postComment = function(callback,params,request)
{
	console.log("post comment function"+request.comment);
	commentobj.postComment(function(err,res) {
		callback(err,res);
	},params.offerId, request.comment);

};


Comment.prototype.getCommentHistory = function(callback,request)
{
	console.log("get comment history");
	commentobj.getCommentHistory(function(err,res) {
		callback(err,res);
	},request.OfferId);

};




module.exports = Comment;