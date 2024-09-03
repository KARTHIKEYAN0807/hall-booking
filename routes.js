// routes.js
const express = require('express');
const { rooms, bookings, customers } = require('./data');
const router = express.Router();

// Create a Room
router.post('/create-room', (req, res) => {
    const { name, seats, amenities, pricePerHour } = req.body;
    const newRoom = { id: rooms.length + 1, name, seats, amenities, pricePerHour, bookings: [] };
    rooms.push(newRoom);
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
});

// Book a Room
router.post('/book-room', (req, res) => {
    const { roomId, customerName, date, startTime, endTime } = req.body;
    const room = rooms.find(r => r.id === roomId);

    if (!room) {
        console.error(`Room with ID ${roomId} not found`);
        return res.status(404).json({ message: `Room with ID ${roomId} not found` });
    }

    const overlappingBooking = room.bookings.find(
        b => b.date === date && ((startTime >= b.startTime && startTime < b.endTime) || (endTime > b.startTime && endTime <= b.endTime))
    );

    if (overlappingBooking) {
        return res.status(400).json({ message: 'Room is already booked for the specified time.' });
    }

    const booking = { bookingId: bookings.length + 1, customerName, date, startTime, endTime, roomName: room.name, bookingDate: new Date(), bookingStatus: "Booked" };
    room.bookings.push(booking);
    bookings.push({ ...booking, roomId });

    const customer = customers.find(c => c.name === customerName);
    if (customer) {
        customer.bookings.push(booking);
    } else {
        customers.push({ name: customerName, bookings: [booking] });
    }

    res.status(201).json({ message: 'Room booked successfully', booking });
});


// List all Rooms with booking data
router.get('/rooms', (req, res) => {
    const roomData = rooms.map(room => ({
        name: room.name,
        bookings: room.bookings.map(booking => ({
            customerName: booking.customerName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        }))
    }));
    res.json(roomData);
});

// List all Customers with booking data
router.get('/customers', (req, res) => {
    const customerData = customers.map(customer => ({
        name: customer.name,
        bookings: customer.bookings.map(booking => ({
            roomName: booking.roomName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        }))
    }));
    res.json(customerData);
});

// List how many times a customer has booked the room
router.get('/customer-bookings/:customerName', (req, res) => {
    const { customerName } = req.params;
    const customer = customers.find(c => c.name === customerName);

    if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer.bookings.map(booking => ({
        roomName: booking.roomName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.bookingId,
        bookingDate: booking.bookingDate,
        bookingStatus: booking.bookingStatus
    })));
});

module.exports = router;
