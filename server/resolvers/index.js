import mockData from "../mockData/index.js";
import AuthorModel from "../models/AuthorModel.js";
import FolderModel from "../models/FolderModel.js";

export const resolvers = {
  Query: {
    folders: async (parent, args, context) => { 
      const folders = await FolderModel.find({
        authorId: context.uid,
      }); // tìm tất cả các folder trong database
      console.log({folders, context });
      return folders;
      // return mockData.folders  
    }, // trả về danh sách folder
    folder: async (parent, args) => {
      const folderId = args.folderId;
      console.log({ folderId });
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
      // return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId; // lấy authorId từ folder
      const author = await AuthorModel.findOne({
        uid: authorId
      }); // tìm kiếm author trong database
      return author;
    },
    notes: (parent, args) => {
      return mockData.notes.filter((note) => note.folderId === parent.id); // tìm kiếm tất cả các note có folderId = id của folder
    }
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      console.log({ newFolder });
      await newFolder.save(); // lưu folder vào database
      return newFolder; // trả về folder vừa tạo
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });

      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    },
  }

}; 