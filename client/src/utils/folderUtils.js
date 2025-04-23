import { graphQLRequest } from "./request.js";

export const foldersLoader = async () => {
    const query = `query Folders {
      folders {
        id
        name
        createdAt
      }
    }`;

    const data = await graphQLRequest({query}); // gọi hàm graphQLRequest để lấy dữ liệu

    return data; // trả về data cho router
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!){
    addFolder(name: $name){
      name
      author{
        name  
      }
    }
  }`;
  
  const data = await graphQLRequest({
    query, 
    variables: {name: newFolder.name},
  }); // gọi hàm graphQLRequest để lấy dữ liệu

  return data; // trả về data cho router
}