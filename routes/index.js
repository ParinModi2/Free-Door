var comment = require('../Model/Comment');
var user = require('../Model/User');
var Product = require('../Model/Product');
var Category = require('../Model/Category');
var offer = require('../Model/Offer');
var ejs = require("ejs");


exports.index = function(req, res){
	res.render('Home');

};

exports.validateUser =function(req,res){
	console.log("validate user");
	var newUser = new user();
	newUser.validateUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.body);

	console.log("Username "+ req.param('userName'));
};


exports.createuser =function(req,res){

	var newUser = new user();
	newUser.createUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			res.json(err);
		}else
		{
			console.log(result);
			res.json(result);
		}

	},req.body);
	console.log("Username"+ req.param('userName'));
	console.log("Username"+ req.param('password'));
};


exports.viewCustomers =function(req,res){
	console.log("view customers");
	var newUser = new user();

	newUser.viewCustomers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.body);
};

exports.updateuser =function(req,res){
	console.log("Update user");
	var newUser = new user();
	newUser.updateUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			res.json(err);
			//throw(err);
		}else
		{
			console.log("success");
			res.json(result);
		}

	},req.body);
};

exports.getUserById = function(req,res){
	console.log("In get user by id"+req.params.userId);
	var newUser = new user();
	newUser.getUserById(function(err,result){
		if(err){
			console.log("Get user by Id"+err);
			res.json(err);
			
		}else{
			
			console.log("return "+result);
			res.json(result);
		}

	}, req.params.userId);

};

exports.removeUser = function(req,res){
	console.log("remove user error"+req.params.emailId);
	var newUser = new user();
	newUser.remove(function(err,result){
		if(err){
			console.log("remove user error"+err);
			res.json(err);
			
		}else{
			
			console.log("return "+result);
			res.json({"status": "success", "Message": "User Deleted"});
		}

	}, req.params.emailId);

};

//Product Related
exports.createProduct =function(req,res){

	var newProduct = new Product();
	newProduct.createProduct(function(err,result) {
		if(err){
			console.log("Error"+err);
			
			res.json(err);
		}else
		{
			res.json(result);
		}

	},req.body,req.params.categoryId);

};

exports.updateProduct =function(req,res){
	console.log("Update Product");
	var newProduct = new Product();
	newProduct.updateProduct(function(err,result) {
		if(err){
			console.log("Error"+err);
			res.json(err);
			
		}else
		{
			console.log("success");
			res.json(result);
		}

	},req.body,req.params.categoryId,req.params.productId);
};

exports.removeProduct = function(req,res){
	
	var newProduct = new Product();
	newProduct.remove(function(err,result){
		if(err){
			console.log("remove Product error"+err);
			res.json(err);
			
		}else{
			
			console.log("return "+result);
			res.json({});
		}

	}, req.params.productId,req.params.categoryId);

};

exports.getProductById = function(req,res){
	console.log("In get user by id"+req.params.productId);
	var newProduct = new Product();
	newProduct.getProductById(function(err,result){
		if(err){
			console.log("Get Product by Id"+err);
			res.json(err);
			
		}else{
			
			console.log("return "+result);
			res.json(result);
		}

	}, req.params.productId,req.params.categoryId);

};

exports.getProductsBycatId = function(req,res){
	console.log("In get Product by id"+req.params.categoryId);
	var newProduct = new Product();
	newProduct.getProductsBycatId(function(err,result){
		if(err){
			console.log("Get Product by Id"+err);
			res.json(err);
			
		}else{
			
			console.log("return "+result);
			res.json({'products':result});
		}

	}, req.params.categoryId);

};

//Category
exports.createCategory =function(req,res){

	var newCategory = new Category();
	newCategory.createCategory(function(err,result) {
		if(err){
			console.log("Error"+err);			
			res.json(err);
		}else
		{
			res.json(result);
		}

	},req.body);

};

exports.viewCategories =function(req,res){
	console.log("view categories");
	var newCategory = new Category();

	newCategory.viewCategories(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json({'categories':result});
		}

	},req.body);
};


exports.getCategoryById = function(req,res){
	console.log("In get user by id"+req.params.categoryId);
	var newCategory = new Category();
	newCategory.getCategoryById(function(err,result){
		if(err){
			console.log("Get category by Id"+err);
			res.json(err);
			
		}else{
			
			console.log("return "+result);
			res.json(result);
		}

	}, req.params.categoryId);

};

exports.createoffer =function(req,res){
	console.log("create offer\n");
	var newOffer = new offer();
	var a = req.param;
	console.log("body: "+req.body);
	console.log("req.params.productId: "+req.params.productId);
	newOffer.createOffer(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.params.productId,req.body);
};

exports.viewOffers =function(req,res){
	console.log("view offers");
	var newOffer = new offer();

	newOffer.viewOffers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.params.categoryId);
};
exports.byofferid =function(req,res){
	console.log("view offers by offerid");
	var newOffer = new offer();

	newOffer.byofferid(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.params.offerId);
};


exports.byproductid =function(req,res){
	console.log("view offers by product id");
	var newOffer = new offer();

	newOffer.viewOffers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.json(result);
		}

	},req.params.productId,req.params.categoryId);
};

exports.updateoffer =function(req,res){
	
	console.log("Update offer"+ req.params.offerId);
	var newOffer = new offer();
	newOffer.updateOffer(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			console.log("success");
			res.json(result);
		}

	},req.params.offerId,req.params.productId,req.body);
};
exports.removeOffer = function(req,res){
	
	var newOffer = new offer();
	newOffer.remove(function(err,result){
		if(err){
			console.log("remove offer error"+err);
			res.json(err);
			
		}else{
			
			console.log("return "+result);
			res.json({});
		}

	}, req.params.productId,req.params.categoryId,req.params.offerId);

};

//comment
exports.postComment =function(req,res){
	console.log("Post Comment");
	var  newcomment = new comment();
	newcomment.postComment(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			console.log("success");
			res.json(result);
		}

	},req.params,req.body);
};

exports.getCommentHistory =function(req,res){
	console.log("Get Comment History");
	var newComment = new comment();
	newComment.getCommentHistory(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			console.log("success");
			res.json(result);
		}

	},req.body);
};