import { gql, request } from 'graphql-request';
const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

//Used to make Get Category API request 


const GetCategory = async () => {
    const query = gql`
    query Categories{
     categories(first: 50) {   
    icon {
      url
    }
    slug
    id
    name
  }
    }`
    const result = await request(MASTER_URL, query);
    console.log("result now is:", result);
    return result;
}


export default {
    GetCategory
}