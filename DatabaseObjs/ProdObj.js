var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cmpe275');


	var ProductSchema = new mongoose.Schema({
		productId:Number,
		productName:String,
		quantity:Number,
		userId:String,
		expectedOffer:String,
		productDesc:String,
		prodExpDate:Date,
		isValid:Number,
		categoryId:Number,
		lastUpdated:Date
	    
	});
	var ProductModel = mongoose.model( 'Product', ProductSchema );




function ProdObj() {
	
}



ProdObj.prototype.createProduct = function(callback, productName,quantity,userId,expectedOffer,productDesc,prodExpDate,isValid,categoryId,lastUpdated){
	var productCount=0;
	var now = new Date();


			ProductModel.count(function( err, count ) {
						console.log("The count is"+count);
						productCount=count+1;
						console.log("The number of users "+productCount);
						var product = new ProductModel({
							productId:productCount,
							productName:productName,
							quantity:quantity,
							userId:userId,
							expectedOffer:expectedOffer,
							productDesc:productDesc,
							prodExpDate:new Date(prodExpDate),
							isValid:isValid,
							categoryId:categoryId,
							lastUpdated:now
					    });
						
					    product.save( function( err,product ) {
					        if( !err ) {
					            console.log( 'created'+product );
					            callback( null,product );
					        } else {
					            console.log( err );
					            callback('ERROR',null);
					        }
					    });
						
					});
			
	
	

};

ProdObj.prototype.updateProduct = function(callback,productId,productName,quantity,userId,expectedOffer,productDesc,prodExpDate,isValid,categoryId,lastUpdated,oldCategoryId){
	var now = new Date();
	ProductModel.count({categoryId:oldCategoryId,productId: productId}, function(err, productIdExists)
	{
		if(productIdExists == 0){
			  callback('Product does not exixts',null);
		}else{
	
		ProductModel.findOne({categoryId:oldCategoryId,productId: productId},function( err, product ) {
		product.productId=productId;
		product.productName=productName;
		product.quantity=quantity;
		product.userId=userId;
		product.expectedOffer=expectedOffer;
		product.productDesc=productDesc;
		product.prodExpDate=new Date(prodExpDate);
		product.isValid=isValid;
		product.categoryId=categoryId;
		product.lastUpdated=now;
		        
		        product.save( function( err,product ) {
	        if( !err ) {
	            console.log( 'updated' );
	            callback( null,product );
	        } else {
	            console.log( err );
	            callback('ERROR',null);
	        }
	    });
		});	
		}
	});
	
};

ProdObj.prototype.removeProduct = function (callback, productId,categoryId){

	console.log("in remove product" +productId);
	ProductModel.count({categoryId:categoryId,productId: productId}, function(err, productExists)
	{
	 if(productExists == 0){
		 callback('Product does not Exits',null);
		 
	 }else{
			ProductModel.find({categoryId:categoryId,productId: productId}).remove(function( err, product ) {
		        
		            if( !err ) {
		            	console.log("no eror"+product.productId);
		                callback(null,product);
		            } else {
		            	console.log(" eror");
		                console.log( err );
		                callback('ERROR',null);
		            }
		        });
		    }
	});
	
}

ProdObj.prototype.getProductById = function (callback, productId,categoryId){

	console.log("in get product by id" +productId);
	ProductModel.count({categoryId:categoryId,productId: productId}, function(err, productExists)
	{
	 if(productExists == 0){
		 callback('Product does not Exits',null);
		 
	 }else{
			ProductModel.find({categoryId:categoryId,productId: productId}, function( err, product) {
		        
		            if( !err ) {
		            	console.log("no eror"+product.productId);
		                callback(null,product);
		            } else {
		            	console.log(" eror");
		                console.log( err );
		                callback('ERROR',null);
		            }
		        });
		    }
	});
	
}
ProdObj.prototype.getProductsBycatId = function (callback, categoryId){

	console.log("in get product by id" +categoryId);
	ProductModel.count({categoryId:categoryId}, function(err, categoryExists)
	{
	 if(categoryExists == 0){
		 callback('Category does not Exits',null);
		 
	 }else{
			ProductModel.find({categoryId:categoryId}, function( err, product) {
		        
		            if( !err ) {
		            	console.log("no eror"+product.categoryId);
		                callback(null,product);
		            } else {
		            	console.log(" eror");
		                console.log( err );
		                callback('ERROR',null);
		            }
		        });
		    }
	});
	
}


module.exports = ProdObj;