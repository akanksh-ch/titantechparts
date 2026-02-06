# Software Requirements Specification (SRS)

## Project Overview
Titan Tech Parts is an e-commerce platform designed to provide high-quality technical parts. This document outlines the technical requirements and architecture for the system.

## Technology Stack

### Frontend
- **Framework**: React
- **Description**: The user interface will be built using React, ensuring a responsive and dynamic user experience.

### Backend
- **Framework**: Python FastAPI
- **Database Driver**: pymongo
- **Description**: The backend API will be developed using FastAPI, known for its performance and ease of use. It will communicate with the MongoDB database using the `pymongo` driver.

### Database
- **System**: MongoDB
- **Description**: A NoSQL database used to store product data, user information, and order history.

### Testing
- **Framework**: Playwright
- **Type**: Scenario Testing / User Flow Testing
- **Description**: End-to-end reliability will be ensured through scenario-based testing covering critical user journeys.
    - **Key Scenarios**:
        - User Sign In
        - User Registration
        - Product Browsing
        - Adding Items to Cart
        - Checkout Process
        - Order History Viewing

## Functional Requirements (High Level)

### User Authentication
- Users must be able to sign up and log in.
- Authentication should be secure.

### Product Management
- Users should be able to view a list of products.
- Users should be able to view product details.

### Shopping Cart & Checkout
- Users must be able to add products to a cart.
- Users must be able to proceed through a checkout flow.

### Order Management
- Examples of verifying successful order placement.
