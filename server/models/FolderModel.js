// các models trong mongoose là các class để định nghĩa cấu trúc của dữ liệu trong MongoDB

// có thể xem là tương đương với việc xây dựng mockData

import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  }
}, { timestamps: true });

const FolderModel = mongoose.model('Folder', folderSchema);
export default FolderModel;