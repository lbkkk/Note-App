// các model trong mongoose là các class để định nghĩa cấu trúc của dữ liệu trong MongoDB

// có thể xem là tương đương với mockData

import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

const AuthorModel = mongoose.model('Author', authorSchema);
export default AuthorModel;