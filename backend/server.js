const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');
const restaurantRoutes=require('./routes/restaurantRoutes');
const contactRoutes=require('./routes/contactRoutes');
const interactionRoutes=require('./routes/interactionRoutes');
const callPlanRoutes=require('./routes/callPlanRoutes');
const performanceRoutes=require('./routes/performanceRoutes');
const orderPlanRoutes=require('./routes/orderPlanRoutes');




dotenv.config();

const app=express();
const PORT=process.env.PORT||5000;

// Middleware
app.use(express.json());
app.use(cors());
//routes
app.use('/api/restaurants',restaurantRoutes);
app.use('/api/contacts',contactRoutes);
app.use('/api/interactions',interactionRoutes);
app.use('/api/call_plans',callPlanRoutes);
app.use('/api/performance',performanceRoutes);
app.use('/api/order_plans',orderPlanRoutes);

// Database Connection
connectDB();

// Placeholder Routes
app.get('/',(req,res)=>{
    res.send('API is running...');
});

// Start Server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
