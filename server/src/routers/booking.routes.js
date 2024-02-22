import Router from 'express'
import { createBooking, updateBooking, deleteBooking, getAllBookings, getMyBookings } from '../controllers/booking.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const bookingRouter = Router()

bookingRouter.route('/create-booking/:userId').post(authMiddleware, createBooking)
bookingRouter.route('/delete-booking/:bookingId').delete(authMiddleware, deleteBooking)
bookingRouter.route('/update-booking/:bookingId').put(authMiddleware, updateBooking)
bookingRouter.route('/get-all-bookings').get(authMiddleware, getAllBookings)
bookingRouter.route('/get-my-bookings/:userId').get(authMiddleware, getMyBookings)


export default bookingRouter    