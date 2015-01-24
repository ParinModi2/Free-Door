var ProductDao = require("../DatabaseObjs/ProdObj");
var prodobj = new ProductDao();

var ejs = require("ejs");

function Product() {

}

Product.prototype.createProduct = function(callback,request,categoryId)
{

	prodobj.createProduct(function(err,res) {
		callback(err,res);

	},request.productName,request.quantity,request.userId,request.expectedOffer,request.productDesc,request.productExpiryDate,request.isValid,categoryId,request.lastUpdated);

};

Product.prototype.updateProduct = function(callback,request,categoryId,productId)
{
	console.log(request);
	prodobj.updateProduct(function(err,res) {

		callback(err,res);

	},productId,request.productName,request.quantity,request.userId,request.expectedOffer,request.productDesc,request.productExpiryDate,request.isValid,request.categoryId,request.lastUpdated,categoryId);

};


Product.prototype.remove = function(callback,productId,categoryId){


	prodobj.removeProduct(function(err,res){
		callback(err,res);
	},productId,categoryId);
};

Product.prototype.getProductById = function(callback,productId,categoryId){


	prodobj.getProductById(function(err,res){
		callback(err,res);
	},productId,categoryId);
};

Product.prototype.getProductsBycatId = function(callback,categoryId){


	prodobj.getProductsBycatId(function(err,res){
		callback(err,res);
	},categoryId);
};




module.exports = Product;