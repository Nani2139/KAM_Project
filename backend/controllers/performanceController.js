const Order=require('../models/orderPlanModel');

// Get performance metrics for a specific restaurant
const getPerformance=async(req,res)=>{
    try{
        const {restaurantId}=req.params;

        // Fetch orders for the given restaurant
        const orders=await Order.find({restaurantId}).sort({orderDate:-1});

        if(orders.length===0){
            return res.status(404).json({message:'No orders found for this restaurant'});
        }

        // Calculate total orders
        const totalOrders=orders.length;

        // Define performance status
        let performanceStatus='Needs Improvement';
        if(totalOrders>50){
            performanceStatus='Great Going';
        }else if(totalOrders>20){
            performanceStatus='Good';
        }

        // Get last order date
        const lastOrderDate=orders[0].orderDate;

        res.status(200).json({
            totalOrders,
            performanceStatus,
            lastOrderDate,
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports={getPerformance};
