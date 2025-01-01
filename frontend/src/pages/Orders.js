import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardActions, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from '../utils/api';

const Orders=()=>{
    const [orders,setOrders]=useState([]);
    const [restaurants,setRestaurants]=useState([]);
    const [open,setOpen]=useState(false);
    const [formData,setFormData]=useState({
        restaurantId:'',
        details:'',
        quantity:'',
        price:'',
    });

    useEffect(()=>{
        fetchOrders();
        fetchRestaurants();
    },[]);

    const fetchOrders=async()=>{
        try{
            const response=await axios.get('/api/order_plans');
            setOrders(response.data);
        }catch(error){
            console.error('Error fetching orders:',error);
        }
    };

    const fetchRestaurants=async()=>{
        try{
            const response=await axios.get('/api/restaurants');
            setRestaurants(response.data);
        }catch(error){
            console.error('Error fetching restaurants:',error);
        }
    };

    const handleSubmit=async()=>{
        try{
            await axios.post('/api/order_plans',formData);
            fetchOrders();
            handleClose();
        }catch(error){
            console.error('Error submitting order:',error);
        }
    };

    const handleDelete=async(id)=>{
        try{
            await axios.delete(`/api/order_plans/${id}`);
            fetchOrders();
        }catch(error){
            console.error('Error deleting order:',error);
        }
    };

    const handleOpen=()=>{
        setFormData({
            restaurantId:'',
            details:'',
            quantity:'',
            price:'',
        });
        setOpen(true);
    };

    const handleClose=()=>{
        setOpen(false);
    };

    return(
        <div>
            <Typography variant="h4" gutterBottom>Order Planning</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Order
            </Button>
            <Grid container spacing={3} sx={{marginTop:2}}>
                {orders.map((order)=>(
                    <Grid item xs={12} sm={6} md={4} key={order._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Restaurant: {order.restaurantId?.name||'Unknown'}</Typography>
                                <Typography>Details: {order.details}</Typography>
                                <Typography>Quantity: {order.quantity}</Typography>
                                <Typography>Price: ₹{order.price}</Typography>
                                <Typography>Total Cost: ₹{order.totalCost}</Typography>
                                <Typography>Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="secondary" onClick={()=>handleDelete(order._id)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position:'absolute',
                        top:'50%',
                        left:'50%',
                        transform:'translate(-50%, -50%)',
                        width:400,
                        bgcolor:'background.paper',
                        p:4,
                        borderRadius:2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Add Order
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Restaurant</InputLabel>
                        <Select
                            value={formData.restaurantId}
                            onChange={(e)=>setFormData({...formData,restaurantId:e.target.value})}
                        >
                            {restaurants.map((restaurant)=>(
                                <MenuItem key={restaurant._id} value={restaurant._id}>
                                    {restaurant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Details"
                        fullWidth
                        margin="normal"
                        value={formData.details}
                        onChange={(e)=>setFormData({...formData,details:e.target.value})}
                    />
                    <TextField
                        label="Quantity"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={formData.quantity}
                        onChange={(e)=>setFormData({...formData,quantity:e.target.value})}
                    />
                    <TextField
                        label="Price per Unit"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={formData.price}
                        onChange={(e)=>setFormData({...formData,price:e.target.value})}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        Add
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Orders;
