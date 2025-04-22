import { graphQLRequest } from "./request";

export const notesLoader = 
  async ({ params: { folderId }}) => {
    const query = `query Folder($folderId: String) {
      folder(folderId: $folderId) {
        id
        name
        notes {
          id
          content
        }
      }
    }`;

    const data = await graphQLRequest({
      query ,
      variables: {
       folderId: folderId
      },
    }); // gọi hàm graphQLRequest để lấy dữ liệu
    return data; // trả về data cho router
  };  

export const noteLoader = 
  async ({ params: { noteId }}) => {
    const query = `query Folder($noteId: String) {
      note(noteID: $noteId) {
        id
        content
      }
    }`;

    const data = await graphQLRequest({
      query,
      variables: {
        noteId,
      },
    }); // gọi hàm graphQLRequest để lấy dữ liệu

    return data; // trả về data cho router
  }