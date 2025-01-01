import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from '../utils/api';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const Performance=()=>{
    const [restaurants,setRestaurants]=useState([]);
    const [selectedRestaurant,setSelectedRestaurant]=useState('');
    const [performance,setPerformance]=useState(null);
    const [callData,setCallData]=useState({labels:[],data:[]});

    useEffect(()=>{
        fetchRestaurants();
    },[]);

    const fetchRestaurants=async()=>{
        try{
            const response=await axios.get('/api/restaurants');
            setRestaurants(response.data);
        }catch(error){
            console.error('Error fetching restaurants:',error);
        }
    };

    const fetchPerformanceMetrics=async(restaurantId)=>{
        try{
            const response=await axios.get(`/api/performance/${restaurantId}`);
            setPerformance(response.data);
        }catch(error){
            console.error('Error fetching performance metrics:',error);
            setPerformance(null);
        }
    };

    const fetchCallData=async(restaurantId)=>{
        try{
            const response=await axios.get(`/api/interactions`,{
                params:{restaurantId,type:'Call'},
            });
            const callCounts=response.data.reduce((acc,call)=>{
                const date=new Date(call.date).toLocaleDateString();
                acc[date]=(acc[date]||0)+1;
                return acc;
            },{});

            const labels=Object.keys(callCounts);
            const data=Object.values(callCounts);

            setCallData({labels,data});
        }catch(error){
            console.error('Error fetching call data:',error);
            setCallData({labels:[],data:[]});
        }
    };

    const handleRestaurantChange=(restaurantId)=>{
        setSelectedRestaurant(restaurantId);
        if(restaurantId){
            fetchPerformanceMetrics(restaurantId);
            fetchCallData(restaurantId);
        }else{
            setPerformance(null);
            setCallData({labels:[],data:[]});
        }
    };

    return(
        <div>
            <Typography variant="h4" gutterBottom>Performance Tracking</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel>Select Restaurant</InputLabel>
                <Select
                    value={selectedRestaurant}
                    onChange={(e)=>handleRestaurantChange(e.target.value)}
                >
                    <MenuItem value="">None</MenuItem>
                    {restaurants.map((restaurant)=>(
                        <MenuItem key={restaurant._id} value={restaurant._id}>
                            {restaurant.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {performance?(
                <>
                    <Grid container spacing={3} sx={{marginTop:2}}>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Performance Metrics</Typography>
                                    <Typography>Total Orders: {performance.totalOrders}</Typography>
                                    <Typography>Performance: {performance.performanceStatus}</Typography>
                                    <Typography>Last Order Date: {new Date(performance.lastOrderDate).toLocaleDateString()}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" sx={{marginTop:4}}>Call Data (Daily)</Typography>
                    {callData.labels.length>0&&callData.data.length>0?(
                        <Bar
                            data={{
                                labels:callData.labels,
                                datasets:[
                                    {
                                        label:'Number of Calls',
                                        data:callData.data,
                                        backgroundColor:'rgba(75, 192, 192, 0.6)',
                                    },
                                ],
                            }}
                            options={{
                                responsive:true,
                                plugins:{
                                    legend:{
                                        position:'top',
                                    },
                                },
                                scales:{
                                    x:{
                                        title:{
                                            display:true,
                                            text:'Date',
                                        },
                                    },
                                    y:{
                                        title:{
                                            display:true,
                                            text:'Number of Calls',
                                        },
                                        beginAtZero:true,
                                    },
                                },
                            }}
                        />
                    ):(
                        <Typography>No call data available for this restaurant.</Typography>
                    )}
                </>
            ):(
                selectedRestaurant?(
                    <Typography>No performance data found for this restaurant.</Typography>
                ):(
                    <Typography>Please select a restaurant to view its performance.</Typography>
                )
            )}
        </div>
    );
};

export default Performance;
