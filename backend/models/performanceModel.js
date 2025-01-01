const mongoose=require('mongoose');

const performanceSchema=new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true,
    },
    totalOrders:{
        type:Number,
        default:0,
    },
    averageOrderValue:{
        type:Number,
        default:0,
    },
    orderFrequency:{
        type:Number,
        default:0, // Number of orders per week/month
    },
    lastOrderDate:{
        type:Date,
    },
    performanceStatus:{
        type:String,
        enum:['Well-performing','Underperforming'],
        default:'Underperforming',
    },
},{
    timestamps:true,
});

const Performance=mongoose.model('Performance',performanceSchema);

module.exports=Performance;
