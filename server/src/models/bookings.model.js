import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        required: [true, 'Not a valid User']
    },
    floorNo: {
        type: String,
        trim: true,
        required: [true, 'floor no is required']
    },
    slotNo: {
        type: String,
        trim: true,
        required: [true, 'Slot no is required']
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
}, { timestamps: true })

// calculate duration
bookingSchema.methods.calculateDuration = function () {
    if (this.startTime && this.endTime) {
        const startTime = new Date(this.startTime);
        const endTime = new Date(this.endTime);

        if (isNaN(startTime) || isNaN(endTime)) {
            return null;
        }

        if (endTime <= startTime) {
            return null;
        }
        const durationInMilliseconds = endTime - startTime;

        const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours} hours ${minutes} minutes`;
    }

    return null;
};


export const Booking = mongoose.model('Booking', bookingSchema)