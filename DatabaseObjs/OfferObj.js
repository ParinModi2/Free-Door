var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cmpe275');

var ProductDao = require("../DatabaseObjs/ProdObj");
var uuid = require('node-uuid');

var CommentSchema = new mongoose.Schema({
	CommentId : Number,
	Comment : String,
	userId : String
	});
var CommentModel = mongoose.model( 'Comment', CommentSchema );
var OfferSchema = new mongoose.Schema({
	offerId: String,
	buyingQty: Number,
	offeredDetails: String,
	buyerStatus: String,
	sellerStatus: String,
	offerExpiry: Date,
	productId: Number,
	buyerId: Number,
	Comment: [CommentSchema],
	lastModified: Date
});
var OfferModel = mongoose.model( 'Offer', OfferSchema );

function OfferObj() {
}

OfferObj.prototype.byproductId = function(callback, productId, categoryId){
	OfferModel.find({productId:productId},function( err, offers ) {
		callback(err, offers);
	});
};
OfferObj.prototype.viewOffers = function(callback, categoryId){
	OfferModel.find({},function( err, offers ) {
		callback(err, offers);
	});
};

OfferObj.prototype.byofferId = function(callback, offerId){
	console.log("offerId" +offerId);
	OfferModel.count({offerId: offerId}, function(err, offerexists)
			{
		console.log("countbyofferId", +offerexists);
		if(offerexists == 0){
			callback(' :offer does not exixts',null);
		}else{

			OfferModel.find({offerId:offerId},function( err, offers ) {
				if( !err ) {
					console.log( 'offers are: ' );
					callback( null,offers );
				} else {
					console.log( err );
					callback('ERROR',null);
				}
			});
		}
			});

};


OfferObj.prototype.updateOffer = function(callback,offerId, productId,buyingQty, offeredDetails, buyerStatus, sellerStatus, offerExpiry, buyerId, Comment){
	console.log("offerId: " +offerId);
	var now = new Date();
	OfferModel.count({offerId: offerId}, function(err, offerexists)
			{

		if(offerexists == 0){
			callback('offer does not exixts',null);
		}else{
			console.log("offerexists",+offerexists);
			console.log()
			OfferModel.findOne({offerId:offerId},function( err, offers ) {
				//offers.offerId = offerId;
				console.log(offers);
				offers.buyingQty=  buyingQty;
				offers.offeredDetails =  offeredDetails;
				offers.buyerStatus=  buyerStatus;
				offers.sellerStatus =  sellerStatus;
				offers.offerExpiry=  new Date(offerExpiry);
				offers.productId =  productId;
				offers.buyerId=  buyerId;
				offers.Comment = [Comment];
				offers.lastModified =  now;
				

				offers.save(function( err,offers ) {
					if( !err ) {
						console.log( 'updated' );
						callback( null,offers );
					} else {
						console.log( err );
						callback('ERROR',null);
					}
				});
			});	
		}
			});

};





OfferObj.prototype.createOffer = function(callback, productId, buyingQty, offeredDetails, buyerStatus, sellerStatus, offerExpiry, buyerId, Comment){
	
	var offerCount;
	var now = new Date();

	console.log("productId: "+offerExpiry);

	OfferModel.count(function( err, count ) {
		var offerId = uuid.v4();
		offerId = offerId.substr(offerId.length - 5);
		offerCount=count+1;
		console.log("The number of offers "+offerCount);
		console.log("The number of offers "+offerId);
		var offer = new OfferModel({
			offerId: offerId,
			buyingQty: buyingQty,
			offeredDetails: offeredDetails,
			buyerStatus: buyerStatus,	
			sellerStatus: sellerStatus,
			offerExpiry: offerExpiry,
			productId: productId,
			buyerId: buyerId,
			Comment: [Comment],
			lastModified : now
			
		});

		offer.save( function( err,offers ) {
			if( !err ) {
				console.log( 'created'+offer + offers );

				callback( null,offers );
			} else {
				console.log( err );
				callback('ERROR',null);
			}
		});

	});

};

OfferObj.prototype.removeOffer = function (callback, productId,categoryId,offerId){

	console.log("in remove offer: " +offerId);
	OfferModel.count({productId: productId,offerId: offerId}, function(err, offerExists)
	{
	 if(offerExists == 0){
		 callback('Offer does not Exits',null);
		 
	 }else{
			OfferModel.find({productId: productId,offerId: offerId}).remove(function( err, offer ) {
		        
		            if( !err ) {
		            	console.log("no eror"+offer.offerId);
		                callback(null,offer);
		            } else {
		            	console.log(" eror");
		                console.log( err );
		                callback('ERROR',null);
		            }
		        });
		    }
	});
	
}


module.exports = OfferObj;