import { Class } from '../models/class.model.js'

const createClass = async (req, res) => {
    const { title, date, startTime, endTime, meetLink, userId } = req.body;

    try {
        const file = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        };

        const createClass = await Class.create({
            userId,
            title,
            startTime,
            endTime,
            date,
            meetLink,
            pdfName: file || null,
            status: true,
        });
        if (!createClass) {
            res.status(400).json({ message: "Class creation failed" });
        }

        res.status(200).json({ message: "Class Scheduled Succesfully", data: createClass });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

const getScheduledClassById = async (req, res) => {
    const { userId } = req.params.id;
    const ScheduledClass = await ScheduleSchema.find({
        userId: userId,
        status: true,
    });
    try {
        if (!ScheduledClass) {
            res.status(400).json({ message: "No Classes Scheduled" });
        }
        res.status(200).json({ message: "Classes Scheduled", ScheduledClass });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}

export { createClass, getScheduledClassById }