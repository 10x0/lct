const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
    {
        seats: {
            type: Number,
            required: [true, 'Please provide number of seats.'],
        },
        contact: {
            type: String,
            required: [true, 'Please provide contact details.'],
        },
        date: {
            type: String,
            required: [true, 'Please provide booking date.'],
        },
        time: {
            type: String,
            required: [true, 'Please provide booking date.'],
        },
        duration: {
            type: Number,
            required: [true, 'Please provide booking duration.']
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Booking", bookingSchema);
