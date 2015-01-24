
var offerDao = require("../DatabaseObjs/OfferObj");
var offerobj = new offerDao();

var ejs = require("ejs");

function Offer() {

}


Offer.prototype.viewOffers = function(callback,categoryId)
{

	console.log("view Offers function ");
	offerobj.viewOffers(function(err,res) {
		callback(err,res);

	},categoryId);

};
Offer.prototype.byproductId = function(callback,productId,categoryId)
{

	console.log("view Offers function ");
	offerobj.byproductId(function(err,res) {
		callback(err,res);

	},productId,categoryId);

};

Offer.prototype.byofferId = function(callback,offerId)
{

	console.log("view Offers by offerId ");
	offerobj.byofferId(function(err,res) {
		callback(err,res);

	},offerId);

};


Offer.prototype.createOffer = function(callback,productId,request)
{

	console.log("Make an Offer function "+ productId);
	offerobj.createOffer(function(err,res) {
		callback(err,res);

	},request.productId,request.buyingQty, request.offeredDetails, request.buyerStatus, request.sellerStatus, request.offerExpiry, request.buyerId, request.comment);

};


Offer.prototype.updateOffer = function(callback,offerId,productId,request)
{
	console.log("Update Offer function "+offerId);
	console.log(request);
	offerobj.updateOffer(function(err,res) {

		callback(err,res);

	},offerId,productId,request.buyingQty, request.offeredDetails, request.buyerStatus, request.sellerStatus, request.offerExpiry, request.buyerId, request.comment);

};

Offer.prototype.remove = function(callback,productId,categoryId,offerId){


	offerobj.removeOffer(function(err,res){
		callback(err,res);
	},productId,categoryId,offerId);
};


module.exports = Offer;