import moment from "moment";

const getUpdatedDuration = (startOffsetMinutes, endOffsetMinutes) => {
    const currentTime = Date.now();
    const startTime = currentTime + startOffsetMinutes * 60000; // Convert minutes to milliseconds
    const endTime = currentTime + endOffsetMinutes * 60000; // Convert minutes to milliseconds
    return [new Date(startTime).toISOString(), new Date(endTime).toISOString()];
}

const generateTimeDurations = () => {
    const currentHour = moment().hour();
    const currentMinute = moment().minute();

    let startHour = currentHour + 1;
    let startMinute = 36;

    // If the start minute exceeds 59, adjust the hour and minute accordingly
    if (startMinute >= 60) {
        startHour += Math.floor(startMinute / 60);
        startMinute = startMinute % 60;
    }

    let endHour = startHour + 1;
    let endMinute = startMinute;

    // If the end hour exceeds 23, wrap around to the next day
    if (endHour >= 24) {
        endHour = endHour % 24;
    }

    // Ensure the hours are in the 12-hour format
    const formattedStartHour = (startHour % 12 === 0) ? 12 : startHour % 12;
    const formattedEndHour = (endHour % 12 === 0) ? 12 : endHour % 12;

    // Determine whether it's AM or PM
    const amOrPmStart = startHour >= 12 ? "PM" : "AM";
    const amOrPmEnd = endHour >= 12 ? "PM" : "AM";

    // Format the start and end times
    const formattedStartTime = moment().hour(formattedStartHour).minute(startMinute).format("hh:mm A");
    const formattedEndTime = moment().hour(formattedEndHour).minute(endMinute).format("hh:mm A");

    return `${formattedStartTime} - ${formattedEndTime}`;
}

export { getUpdatedDuration, generateTimeDurations }