const mongoose=require('mongoose');

const orderPlanSchema=new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    totalCost:{
        type:Number,
    },
    orderDate:{
        type:Date,
        default:Date.now,
    },
},{
    timestamps:true,
});

// Pre-save middleware to calculate totalCost dynamically
orderPlanSchema.pre('save',function(next){
    this.totalCost=this.quantity*this.price;
    next();
});

const OrderPlan=mongoose.model('OrderPlan',orderPlanSchema);

module.exports=OrderPlan;
