
---

# Hall Booking API

## Project Overview

The Hall Booking API allows users to manage room bookings, including creating rooms, booking them, and retrieving booking information. It is built using Node.js and Express.

## Features

- **Create a Room**: Add rooms with available seats, amenities, and price per hour.
- **Book a Room**: Allows booking a room for a specific date and time.
- **List All Rooms with Booked Data**: Retrieve all rooms with their booking details.
- **List All Customers with Booked Data**: Retrieve all customers with their booking details.
- **Track Customer Booking Frequency**: Retrieve how many times a customer has booked a room.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web application framework for Node.js.

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed on your machine.
- [Git](https://git-scm.com/) installed on your machine.
- [Postman](https://www.postman.com/downloads/) for API testing.

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/hall-booking.git
   cd hall-booking
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Server**
   ```bash
   node index.js
   ```
   The server will start on `http://localhost:3000`.

## API Endpoints

### 1. Create a Room

- **URL**: `/create-room`
- **Method**: `POST`
- **Description**: Create a new room with the specified number of seats, amenities, and price per hour.
- **Request Body**:
  ```json
  {
      "name": "Conference Room A",
      "seats": 50,
      "amenities": ["Projector", "WiFi", "Whiteboard"],
      "pricePerHour": 100
  }
  ```
- **Success Response**:
  ```json
  {
      "message": "Room created successfully",
      "room": {
          "id": 1,
          "name": "Conference Room A",
          "seats": 50,
          "amenities": ["Projector", "WiFi", "Whiteboard"],
          "pricePerHour": 100,
          "bookings": []
      }
  }
  ```

### 2. Book a Room

- **URL**: `/book-room`
- **Method**: `POST`
- **Description**: Book a room for a specific date and time.
- **Request Body**:
  ```json
  {
      "roomId": 1,
      "customerName": "John Doe",
      "date": "2024-09-10",
      "startTime": "10:00",
      "endTime": "12:00"
  }
  ```
- **Success Response**:
  ```json
  {
      "message": "Room booked successfully",
      "booking": {
          "bookingId": 1,
          "customerName": "John Doe",
          "date": "2024-09-10",
          "startTime": "10:00",
          "endTime": "12:00",
          "roomName": "Conference Room A",
          "bookingDate": "2024-09-03T10:15:30.000Z",
          "bookingStatus": "Booked"
      }
  }
  ```
- **Error Response**:
  - **Room Not Found**:
    ```json
    {
        "message": "Room not found"
    }
    ```
  - **Time Conflict**:
    ```json
    {
        "message": "Room already booked for this date and time"
    }
    ```

### 3. List All Rooms with Booked Data

- **URL**: `/list-rooms`
- **Method**: `GET`
- **Description**: Retrieve a list of all rooms with their booking details.
- **Success Response**:
  ```json
  [
      {
          "id": 1,
          "name": "Conference Room A",
          "seats": 50,
          "amenities": ["Projector", "WiFi", "Whiteboard"],
          "pricePerHour": 100,
          "bookings": [
              {
                  "bookingId": 1,
                  "customerName": "John Doe",
                  "date": "2024-09-10",
                  "startTime": "10:00",
                  "endTime": "12:00"
              }
          ]
      }
  ]
  ```

### 4. List All Customers with Booked Data

- **URL**: `/list-customers`
- **Method**: `GET`
- **Description**: Retrieve a list of all customers with their booking details.
- **Success Response**:
  ```json
  [
      {
          "name": "John Doe",
          "bookings": [
              {
                  "roomName": "Conference Room A",
                  "date": "2024-09-10",
                  "startTime": "10:00",
                  "endTime": "12:00"
              }
          ]
      }
  ]
  ```

### 5. Track Customer Booking Frequency

- **URL**: `/customer-booking-frequency/:customerName`
- **Method**: `GET`
- **Description**: Retrieve the number of times a customer has booked a room.
- **Request Parameters**:
  - `customerName`: The name of the customer.
- **Success Response**:
  ```json
  {
      "customerName": "John Doe",
      "bookings": [
          {
              "roomName": "Conference Room A",
              "date": "2024-09-10",
              "startTime": "10:00",
              "endTime": "12:00",
              "bookingId": 1,
              "bookingDate": "2024-09-03T10:15:30.000Z",
              "bookingStatus": "Booked"
          }
      ],
      "totalBookings": 1
  }
  ```

## How to Test

- Use Postman to test the API endpoints.
- Make sure to start with creating a room before booking it.
- Check each endpoint to ensure the API works as expected.

## Deployment

### Deploying on Render

1. **Sign up on [Render](https://render.com/)** and link your GitHub repository.
2. **Create a new Web Service** and choose your repository.
3. **Set the build and start commands**:
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. **Deploy** and get your deployment URL.

### Submission

- **GitHub Repository**: `https://github.com/yourusername/hall-booking`
- **Render URL**: `https://hall-booking-iekt.onrender.com`



---

This documentation should cover everything needed to set up, run, and test your Hall Booking API project.
