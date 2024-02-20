import mongoose, { Schema } from 'mongoose';

const classSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        required: [true, 'Not a valid User']
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    meetLink: {
        type: String,
        required: true,
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
    },
    pdfName: [Object],
    isPostClass: {
        type: Boolean
    },
}, { timestamps: true })

// calculate duration
classSchema.methods.calculateDuration = function () {
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

export const Class = mongoose.model('Class', classSchema)