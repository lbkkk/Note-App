import { AuthorModel, FolderModel, NoteModel, NotificationModel } from '../models/index.js';
import { GraphQLScalarType } from 'graphql'
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub(); // pubsub là một đối tượng để publish và subscribe các sự kiện trong GraphQL

export const resolvers = {

  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value); // trả value về phía client
    },
    serialize(value){
      return value.toISOString(); // chuyển đổi value từ phía client về dạng Date
    }
  }),

  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: 'desc',
      });
      console.log({ folders, context });
      return folders;
    },
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
    },
  },
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (parent, args) => {
      console.log({ parent });
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: 'desc',
      });
      console.log({ notes });
      return notes;
    }
  },
  Mutation: {

    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },

    updateNote: async (parent, args) => {
      const noteId = args.id; // id của note mà được gửi từ phía client
      const note = await NoteModel.findByIdAndUpdate(noteId, args)
      return note;
    },

    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid }); 
      console.log({ newFolder });
      pubsub.publish('FOLDER_CREATED',{
        folderCreated: {
          message: 'A new folder has been created',
          folder: newFolder,
        },
        noteCreated: {
          message: 'A new note has been created',
          note: newFolder,
        }
      } ); // publish sự kiện FOLDER_CREATED với dữ liệu là newFolder
      await newFolder.save();
      return newFolder;
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
    
    pushNotification: async (parent, args) => {
      const newNotification = new NotificationModel(args);

      pubsub.publish('PUSH_NOTIFICATION', {
        notification: {
          message: args.content,
        },
      });

      await newNotification.save();
      return { message: 'SUCCESS'}
    }
  },

  Subscription:{
    folderCreated: { 
      subscribe: () => pubsub.asyncIterableIterator(['FOLDER_CREATED', 'NOTE_CREATED']), // subscribe vào sự kiện FOLDER_CREATED
    },
    notification: {
      subscribe: () => pubsub.asyncIterableIterator(['PUSH_NOTIFICATION']) // subscribe vào sự kiện FOLDER_CREATED
    }
  }

}; 