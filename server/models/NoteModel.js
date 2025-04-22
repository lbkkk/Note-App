// các model trong mongoose là các class để định nghĩa cấu trúc của dữ liệu trong MongoDB

// có thể xem là tương đương với mockData

import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  content: {
    type: String
  },
  folderId: {
    type: Date,
    required: true,
  },
}, { timestamps: true } // tự động thêm createdAt và updatedAt vào trong document
);

const NoteModel = mongoose.model("Note", noteSchema); // tạo model từ schema
export default NoteModel; // export model ra ngoài để sử dụng