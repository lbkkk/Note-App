// các model trong mongoose là các class để định nghĩa cấu trúc của dữ liệu trong MongoDB

// có thể xem là tương đương với mockData

import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  uid: { // user_id sau khi đăng nhập thành công
    type: String,
    required: true 
  },
  name: {
    type: Date,
    required: true,
  },
}, { timestamps: true } // tự động thêm createdAt và updatedAt vào trong document
);

const AuthorModel = mongoose.model("Author", authorSchema); // tạo model từ schema
export default AuthorModel; // export model ra ngoài để sử dụng