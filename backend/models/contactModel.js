const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Manager','Chef','Accountant','Server','Other'],
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

const Contact=mongoose.model('Contact',contactSchema);

module.exports=Contact;
