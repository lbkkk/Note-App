import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';
import './firebaseConfig.js'
import { getAuth } from 'firebase-admin/auth';

dotenv.config(); // load biến môi trường từ file .env


const app = express();
const httpServer = http.createServer(app);

// GraphQL cần nắm typeDefs và resolvers
// typeDefs là định nghĩa schema (như document để mô tả data gồm những gì) của GraphQL, resolvers là các hàm xử lý cho các query/mutation

// GraphQL có 3 loại operation type là: 
  // Query: dùng để thực hiện các query data từ client
  // Mutation: dùng để update/ delete data 
  // Subscription: dùng để update real time data phía client theo server thay đổi (thường dùng với WebSocket)

// const typeDefs = `#graphql
//   type Folder {
//     id: String,
//     name: String,
//     createdAt: String,
//     author : Author,
//     notes: [Note]
//   }

//   type Note {
//     id: String,
//     content: String,
//     createdAt: String,
//     folderId: String
//   }

//   type Author {
//     id: String,
//     name: String
//   }

//   type Query { 
//     folders: [Folder],
//     folder(folderId: String): Folder, 
//     note(noteID : String): Note
//   },

// `;

// resolvers (object) là các hàm xử lý cho các query/mutation từ phía client và trả về client 

// const resolvers = {
//   Query: {
//     folders: () => { return mockData.folders  
//     }, // trả về danh sách folder
//     folder: (parent, args) => { // args là dữ liệu dc gửi từ phía client lên
//       return mockData.folders.find((folder) => folder.id === args.folderId); // tìm kiếm folder theo id
//     },
//     note: (parent, args) => {
//       return mockData.notes.find((note) => note.id === args.noteID); // tìm kiếm note theo id
//     }

//   },
//   Folder: {
//     author: (parent, args) => {
//       return mockData.authors.find((author) => author.id === parent.authorId);
//     },
//     notes: (parent, args) => {
//       return mockData.notes.filter((note) => note.folderId === parent.id); // tìm kiếm tất cả các note có folderId = id của folder
//     }
//   }
// }; 

// connect DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tnfiu75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start();

const authorizationJWT = async (req, res, next) => {
  console.log({ authorization: req.headers.authorization });
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(' ')[1];

    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        console.log({ decodedToken });
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((err) => {
        console.log({ err });
        return res.status(403).json({ message: 'Forbidden', error: err });
      });
  } else {
    next();
    // return res.status(401).json({ message: 'Unauthorized' });
  }
};

app.use(
  '/',
  cors(),
  authorizationJWT,
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid }; // uid là id của user trong firebase
    }
  })
);

mongoose.set('strictQuery', false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to DB');
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log('🚀 Server ready at http://localhost:4000');
  });



