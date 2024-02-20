import Router from 'express'
import { upload } from '../config/multer.js'
import { createClass } from '../controllers/public.controller.js'

const publicRouter = Router()

publicRouter.route('/create-class/:userId', upload.single('file')).post(createClass)

export default publicRouter  