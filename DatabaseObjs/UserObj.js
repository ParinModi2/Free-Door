var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cmpe275');


var uuid = require('node-uuid');
	var UserSchema = new mongoose.Schema({
		userId:String,
		emailId:String,
	    fname: String,
	    lname: String,
	    mobileNum:Number
	});
	var UserModel = mongoose.model( 'User', UserSchema );




function UserObj() {
	
}


UserObj.prototype.validateUser = function(callback, emailID, password){
	
	UserModel.find({emailId:emailID},function( err, users ) {
		JSON.stringify(users);
		console.log("In validateusers"+users.userId);
		
		callback(err, users);
    });
	//connection.end();
	
	
};


UserObj.prototype.viewCustomers = function(callback, username, password){
	
	
		UserModel.find(function( err, users ) {
			callback(err, users);
	    });

	
	
};

UserObj.prototype.updateUser = function(callback,emailID, fname, lname, password, mobileNum){
	
	UserModel.count({emailId: emailID}, function(err, emailExists)
	{
		if(emailExists == 0){
			  callback('User does not exixts',null);
		}else{
	
		UserModel.findOne({emailId:emailID},function( err, users ) {
			 users.fname = fname;
		       users.lname=  lname;
		        users.password =  password;
		        users.mobileNum = mobileNum;
		        
		        users.save( function( err,users ) {
	        if( !err ) {
	            console.log( 'created' );
	            callback( null,users );
	        } else {
	            console.log( err );
	            callback('ERROR',null);
	        }
	    });
		});	
		}
	});
	
};



UserObj.prototype.createUser = function(callback, emailID, fname, lname, mobileNum){

	
	 UserModel.count({emailId: emailID}, function(err, emailExists)
	 {
			 if(emailExists == 0){

					
				 		var userId = uuid.v4();
				 		userId = userId.substr(userId.length - 5);
						
						var user = new UserModel({
							userId:userId,
							emailId:emailID,
					        fname: fname,
					        lname: lname,
					        mobileNum:mobileNum
					    });
						
					    user.save( function( err,users ) {
					        if( !err ) {
					            console.log( 'created'+user );
					            callback( null,user );
					        } else {
					            console.log( err );
					            callback('ERROR',null);
					        }
					    });
						
			
				 
			 }else{
				 callback('User Already Exits',null);
			 }
	 });
	
	

};
	



UserObj.prototype.removeUser = function (callback, emailID){

	console.log("in remove user" +emailID);
	UserModel.count({emailId: emailID}, function(err, emailExists)
	{
	 if(emailExists == 0){
		 callback('User does not Exits',null);
		 
	 }else{
			UserModel.find({emailId:emailID}).remove(function( err, user ) {
		        
		            if( !err ) {
		            	console.log("no eror"+user.userId);
		                callback(null,user);
		            } else {
		            	console.log(" eror");
		                console.log( err );
		                callback('ERROR',null);
		            }
		        });
		    }
	});
	
}
UserObj.prototype.getUserById = function (callback, userId){

	console.log("in get use by id" +userId);
	UserModel.count({userId:userId}, function(err, userExists)
	{
	 if(userExists == 0){
		 callback('User does not Exits',null);
		 
	 }else{
			UserModel.find({userId:userId}, function( err, user ) {
		        
		            if( !err ) {
		            	console.log("no eror"+user.userId);
		                callback(null,user);
		            } else {
		            	console.log(" eror");
		                console.log( err );
		                callback('ERROR',null);
		            }
		        });
		    }
	});
	
}

module.exports = UserObj;