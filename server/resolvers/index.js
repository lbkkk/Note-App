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
    folder: async (parent, args) => { // args là dữ liệu dc gửi từ phía client lên
      const foundFolder = await FolderModel.findOne({
        _id: folderId
      })
      return foundFolder
    },
    note: (parent, args) => {
      return mockData.notes.find((note) => note.id === args.noteID); // tìm kiếm note theo id
    }

  },
  Folder: {
    author: (parent, args) => {
      return mockData.authors.find((author) => author.id === parent.authorId);
    },
    notes: (parent, args) => {
      return mockData.notes.filter((note) => note.folderId === parent.id); // tìm kiếm tất cả các note có folderId = id của folder
    }
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({...args, authorId: context.uid}); // tạo mới một folder
      console.log({newFolder});
      await newFolder.save(); // lưu folder vào database
      return newFolder; // trả về folder vừa tạo
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({
        uid: args.uid
      }); // tìm kiếm author trong database
      if (foundUser) {
        const newUser = new AuthorModel(args); // tạo mới một author
        await newUser.save(); // lưu author vào database
        return newUser; // trả về author
      }
      return foundUser; // trả về author nếu đã tồn tại
    } 
  }

}; 