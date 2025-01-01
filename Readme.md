# Project Title: Restaurant Lead Management System

## Project Overview
The **Restaurant Lead Management System** is designed to help Key Account Managers (KAMs) manage relationships with restaurant accounts effectively. The system provides tools to manage leads, interactions, performance tracking, call planning, and order planning, ensuring streamlined operations and better decision-making.

---

## System Requirements

### Hardware Requirements
- Minimum 4 GB RAM
- Minimum 10 GB Disk Space
- Processor: Dual-Core or higher

### Software Requirements
- Node.js v16 or higher
- MongoDB (Cloud or Local Instance)
- NPM or Yarn
- A modern web browser (e.g., Chrome, Firefox, Edge)
- Operating System: Windows/Linux/MacOS

---

## Installation Instructions

### Backend Setup
1. Clone the repository:
    
    git clone <repository_url>

2. Navigate to the backend folder:
   
    cd backend
    
3. Install dependencies:
    
    npm install
    
4. Create a `.env` file and set the following environment variables:

    PORT=5000
    MONGO_URI=<Your MongoDB Connection URL>
    
5. Start the server:
    bash
    npm start
    

### Frontend Setup
1. Navigate to the frontend folder:
    
    cd frontend
    
2. Install dependencies:
    
    npm install
    
3. Start the frontend development server:
    
    npm start
    

---

## Running Instructions

1. Ensure the backend server is running on `http://localhost:5000`.
2. Open the frontend application by navigating to `http://localhost:3000` in your browser.

---

## Test Execution Guide

1. Use Postman or a similar tool to test backend APIs.
2. Verify frontend functionality using sample data provided in the application.
3. Ensure all major features like restaurant management, contacts, interactions, call planning, and performance tracking are functioning as expected.

---

## API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### Restaurants
- **GET** `/restaurants` - Fetch all restaurants
- **POST** `/restaurants` - Add a new restaurant
- **PATCH** `/restaurants/:id` - Update restaurant details
- **DELETE** `/restaurants/:id` - Delete a restaurant

#### Contacts
- **GET** `/contacts` - Fetch all contacts
- **POST** `/contacts` - Add a new contact
- **PATCH** `/contacts/:id` - Update contact details
- **DELETE** `/contacts/:id` - Delete a contact

#### Interactions
- **GET** `/interactions` - Fetch all interactions
- **POST** `/interactions` - Add a new interaction
- **PATCH** `/interactions/:id` - Update interaction details
- **DELETE** `/interactions/:id` - Delete an interaction

#### Call Planning
- **GET** `/call_plans` - Fetch call plans
- **POST** `/call_plans` - Add a new call plan
- **PATCH** `/call_plans/:id` - Update a call plan
- **DELETE** `/call_plans/:id` - Delete a call plan

#### Performance
- **GET** `/performance/:restaurantId` - Fetch performance metrics for a restaurant

---

## Sample Usage Examples

### Example API Request: Add a Restaurant
**Request:**
```json
POST /api/restaurants
{
    "name": "Spicy Grill",
    "address": "123 Food Street",
    "city": "New Delhi",
    "state": "Delhi",
    "country": "India",
    "zipCode": "110001"
}
```
**Response:**
```json
{
    "_id": "63b2faec0e23d70f5c354eb7",
    "name": "Spicy Grill",
    "address": "123 Food Street",
    "city": "New Delhi",
    "state": "Delhi",
    "country": "India",
    "zipCode": "110001",
    "createdAt": "2024-12-31T10:30:00Z",
    "updatedAt": "2024-12-31T10:30:00Z"
}
```


