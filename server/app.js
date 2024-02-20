import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoute from './src/routers/user.routes.js'
import bookingRouter from './src/routers/booking.routes.js';
import publicRoute from './src/routers/public.routes.js'

const app = express();

//for production
// app.use(cors({
//     origin: process.env.ALLOW_ORIGIN_1,
//     credentials: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
// }))

app.use(cors())

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/public', publicRoute)
app.use('/api/v1/booking', bookingRouter)

export { app }