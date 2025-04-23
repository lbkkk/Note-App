// các model trong mongoose là các class để định nghĩa cấu trúc của dữ liệu trong MongoDB

// có thể xem là tương đương với mockData

import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  folderId: {
    type: String,
    required: true
  }
}, { timestamps: true });

const NoteModel = mongoose.model('Note', noteSchema);
export default NoteModel;