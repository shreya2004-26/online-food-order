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
  // console.log("result now is:", result);
  return result;
}

const GetAllBusiness = async () => {
  const query = gql`
query GetBusiness {
  restaurants {
    aboutUs
    address
    banner {
      url
    }
    category {
      name
    }
    id
    name
    restroType
    slug
    workingHours
  }
}
  `

  const result = await request(MASTER_URL, query);
  // console.log("result now is:", result);
  return result;
}

const GetBusiness = async (category) => {
  const query = gql`
  query GetBusiness {
  restaurants(where: {category_some: {slug: "`+ category + `"}}) {
    aboutUs
    address
    banner {
      url
    }
    category {
      name
    }
    id
    name
    restroType
    slug
    workingHours
  }
}
  `

  const result = await request(MASTER_URL, query);
  // console.log("result now is:", result);
  return result;
}

const GetBusinessDetail = async (businessSlug) => {
  const query = gql`
  query RestaurantDetail {
  restaurant(where: {slug: "`+ businessSlug + `"}) {
    aboutUs
    address
    banner {
      url
    }
    category {
      name
    }
    id
    name
    restroType
    slug
    workingHours
    menu {
      ... on Menu {
        id
        category
        menuItem {
          ... on MenuItem {
            id
            name
            description
            price
            productImage {
              url
            }
          }
        }
      }
    }
  }
}
  `
  const result = await request(MASTER_URL, query);
  // console.log("result now is:", result);
  return result;
}
const AddToCart = async (data) => {
  console.log("My name is shreya")
  const query = gql`
   mutation MyMutation {
    createUserCart(
      data: {email:  "`+ data?.email + `", price: ` + data?.price + `, productDescription: "` + data?.productDescription + `", productName: "` + data.productName + `", productImage: "` + data?.productImage + `"}
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }`
  const result = await request(MASTER_URL, query);
  // console.log("result now is:", result);
  return result;
}

const GetUserCart = async (userEmail) => {
  const query = gql`
  query GetUserCart {
  userCarts(where: {email: "`+ userEmail + `"}) {
    id
    price
    productDescription
    productImage
    productName
  }
}
  `
  const result = await request(MASTER_URL, query);
  console.log("result now is:", result);
  return result;
}

export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  GetAllBusiness,
  AddToCart,
  GetUserCart
}
