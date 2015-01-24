var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cmpe275');

	var CategorySchema = new mongoose.Schema({
		categoryId:Number,
		categoryName:String
	    
	});
	var CategoryModel = mongoose.model( 'Category', CategorySchema );


	function CatObj() {
	
	}
	
	CatObj.prototype.createCategory = function(callback, categoryName){
		var categoryCount;
		
		 CategoryModel.count({categoryName: categoryName}, function(err, categoryExists)
		 {
				 if(categoryExists == 0){

						CategoryModel.count(function( err, count ) {
							
							categoryCount=count+1;
							console.log("The number of categories "+categoryCount);
							var Category = new CategoryModel({
								categoryId:categoryCount,
								categoryName:categoryName
						    });
							
						    Category.save( function( err,category ) {
						        if( !err ) {
						            console.log( 'created'+category );
						            callback( null,category );
						        } else {
						            console.log( err );
						            callback('ERROR',null);
						        }
						    });
							
						});
					 
				 }else{
					 callback('Category Already Exits',null);
				 }
		 });
		
		

	};
	CatObj.prototype.viewCategories = function(callback){
		
		
		CategoryModel.find(function( err, Category ) {
			callback(err, Category);
	    });

};

CatObj.prototype.getCategoryById = function (callback, categoryId){

	console.log("in get category by id" +categoryId);
	CategoryModel.count({categoryId:categoryId}, function(err, categoryExists)
	{
	 if(categoryExists == 0){
		 callback('Category does not Exits',null);
		 
	 }else{
			CategoryModel.find({categoryId:categoryId}, function( err, category ) {
		        
		            if( !err ) {
		            	console.log("no eror"+category.categoryId);
		                callback(null,category);
		            } else {
		            	console.log(" eror");
		                console.log( err );
		                callback('ERROR',null);
		            }
		        });
		    }
	});
	
}


module.exports = CatObj;
