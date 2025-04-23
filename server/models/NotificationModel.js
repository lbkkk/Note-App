// các model trong mongoose là các class để định nghĩa cấu trúc của dữ liệu trong MongoDB

// có thể xem là tương đương với mockData

import mongoose from 'mongoose';

const notficationSchema = new mongoose.Schema({
  content: {
    type: String,
  },
}, { timestamps: true });

const NotificationModel = mongoose.model('Notification', notficationSchema);
export default NotificationModel;