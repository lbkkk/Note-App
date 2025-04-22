import { graphQLRequest } from "./request.js";

export const folderLoaders = async () => {
    const query = `query Folders {
      folders {
        id
        name
        createdAt
      }
    }`;

    const data = await graphQLRequest({query}); // gọi hàm graphQLRequest để lấy dữ liệu

    return data; // trả về data cho router
}