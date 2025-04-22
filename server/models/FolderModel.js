// các models trong mongoose là các class để định nghĩa cấu trúc của dữ liệu trong MongoDB

// có thể xem là tương đương với việc xây dựng mockData

import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // field này là bắt buộc có
  },
  authorId: {
    type: Date,
    required: true,
  },
}, { timestamps: true } // tự động thêm createdAt và updatedAt vào trong document
);

const FolderModel = mongoose.model('Folder', folderSchema); // tạo model từ schema
export default FolderModel; // export model ra ngoài để sử dụng