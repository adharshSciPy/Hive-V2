import { Booking } from "../models/bookings.model.js";

const createBooking = async (req, res) => {
    const { floorNo, slotNo, startTime, endTime, date } = req.body;
    const { userId } = req.params;
    try {
        const isEmptyFields = [floorNo, slotNo, startTime, endTime].some((field) => field?.trim() === "");
        if (isEmptyFields) {
            return res.json({ status: 400, message: 'All fields are required' });
        }

        const booking = new Booking({
            userId,
            floorNo,
            slotNo,
            startTime,
            endTime,
            date
        });

        const duration = booking.calculateDuration();
        booking.duration = duration;
        await booking.save();

        if (!booking._id) {
            return res.json({ status: 500, message: 'Booking failed, Please try again' });
        }

        res.json({ status: 200, message: 'Booking Successful', data: booking });
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: 'Server Error' });
    }
};

const updateBooking = async (req, res) => {
    const { startTime, endTime, date } = req.body;
    const { bookingId } = req.params;

    try {
        if (!startTime || !endTime) {
            return res.status(400).json({ status: 400, message: 'Both startTime and endTime are required' });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ status: 404, message: "Booking doesn't exist" });
        }

        booking.startTime = startTime;
        booking.endTime = endTime;
        booking.date = date;

        const duration = booking.calculateDuration();
        booking.duration = duration;
        await booking.save();

        res.status(200).json({ status: 200, message: 'Booking updated successfully', data: booking });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const isDelete = await Booking.deleteOne({ _id: bookingId });
        if (isDelete.deletedCount === 0) {
            res.json({ status: 204, message: 'Booking deletion failed, Try again' });
        } else {
            res.json({ status: 200, message: 'Successfully deleted booking' });
        }
    } catch (err) {
        res.json({ status: 500, message: 'Server Error' });
        throw err;
    }
}

const getAllBookings = async (req, res) => {
    try {
        const allBookings = await Booking.find();
        if (allBookings.length === 0) {
            return res.status(204).json({ status: 204, message: 'No bookings found', data: [] });
        }
        res.status(200).json({ status: 200, message: 'Bookings found', data: allBookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: 'Server Error' });
    }
};

const getMyBookings = async (req, res) => {
    const { userId } = req.params;
    try {
        const myBookings = await Booking.find({ userId });
        if (myBookings.length === 0) {
            return res.status(204).json({ status: 204, message: 'No bookings found for this user', data: [] });
        }
        res.status(200).json({ status: 200, message: 'User bookings found', data: myBookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: 'Server Error' });
    }
};


export { createBooking, updateBooking, deleteBooking, getAllBookings, getMyBookings };
