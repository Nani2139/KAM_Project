const mongoose=require('mongoose');

const restaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    zipCode:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active',
    },
},{
    timestamps:true,
});

const Restaurant=mongoose.model('Restaurant',restaurantSchema);

module.exports=Restaurant;
