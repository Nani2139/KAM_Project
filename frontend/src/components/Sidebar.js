import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer, Typography, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import CallIcon from '@mui/icons-material/Call';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const Sidebar=()=>{
    const menuItems=[
        {text:'Restaurant Management',path:'/dashboard',icon:<HomeIcon/>},
        {text:'Contact Management',path:'/contacts',icon:<ContactsIcon/>},
        {text:'Interaction Tracking',path:'/interactions',icon:<CallIcon/>},
        {text:'Call Planning',path:'/call-planning',icon:<TrackChangesIcon/>},
        {text:'Order Planning',path:'/orders',icon:<RestaurantMenuIcon/>},
        {text:'Performance Tracking',path:'/performance',icon:<AssessmentIcon/>},
    ];

    return(
        <Drawer
            variant="permanent"
            sx={{
                width:240,
                flexShrink:0,
                '& .MuiDrawer-paper':{
                    width:240,
                    boxSizing:'border-box',
                    backgroundColor:'#1E293B', // Dark sidebar background
                    color:'#FFFFFF', // Default text color
                },
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    textAlign:'center',
                    padding:2,
                    backgroundColor:'#0EA5E9', // Blue background
                    color:'#FFFFFF', // White text
                }}
            >
                Welcome
            </Typography>
            <List>
                {menuItems.map((item)=>(
                    <ListItem button component={Link} to={item.path} key={item.text}>
                        <ListItemIcon sx={{color:'#FFFFFF'}}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} sx={{color:'#FFFFFF'}}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
