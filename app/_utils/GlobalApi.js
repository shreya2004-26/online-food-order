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
    review {
      star
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
          review {
      star
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
  // console.log("My name is shreya")
  const query = gql`
   mutation MyMutation {
  createUserCart(
    data: {email: "`+ data?.email + `", price: ` + data?.price + `, productDescription: "` + data?.productDescription + `", productName: "` + data.productName + `", productImage: "` + data?.productImage + `", restaurant: {connect: {slug: "` + data.restaurantSlug + `"}}}
  ) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}`
  const result = await request(MASTER_URL, query);
  // console.log("result now is:", result);
  // console.log(data.restaurant)
  return result;
}

const GetUserCart = async (userEmail) => {
  const query = gql`
query GetUserCart {
  userCarts(where: {email:"`+ userEmail + `"}) {
    id
    price
    productDescription
    productImage
    productName
    restaurant {
      name
      banner {
        url
      }
      slug
    }
  }
}
  `
  const result = await request(MASTER_URL, query);
  // console.log("result now is:", result);
  return result;
}

const DisconnectRestroFromUserCartItem = async (id) => {
  const query = gql`
  mutation DisconnectRestaurantFromCartItem {
  updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+ id + `"}) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const DeleteItemFromCart = async (id) => {
  const query = gql`
  mutation DeleteCartItem {
  deleteUserCart(where: {id: "`+ id + `"}) {
    id
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const AddNewReview = async (data) => {
  const query = gql`
  mutation AddNewReview {
  createReview(
    data: {email: "`+ data.email + `", 
    profileImage: "`+ data.profileImage + `", 
    restaurant: {connect: {slug: "`+ data.RestroSlug + `"}}, 
    reviewText: "`+ data.reviewText + `", 
    star: `+ data.star + `, 
    userName: "`+ data.userName + `"}
  ) {
    id
  }
  publishManyReviews(to: PUBLISHED) {
    count
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const getRestaurantReviews = async (slug) => {
  const query = gql`
  query RestaurantReviews {
  reviews(where: {restaurant: {slug: "`+ slug + `"}}) {
    email
    id
    profileImage
    publishedAt
    star
    userName
    reviewText
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const CreateNewOrder = async (data) => {
  const query = gql`
  mutation CreateNewOrder {
  createOrder(
    data: {email: "`+ data.email + `", orderAmount: ` + data.orderAmount + `, restaurantName: "` + data.restaurantName + `", userName: "` + data.userName + `", zip: "` + data.zip + `", address: "` + data.address + `", phone: ` + data.phone + `}
  ) {
    id
  }
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}


const UpdateOrderToAddOrderItems = async (name, price, id, email) => {
  const query = gql`
  mutation UpdateOrderWithDetail {
  updateOrder(
    data: {orderDetail: {create: {OrderItem: {data: {name: "`+ name + `", price: ` + price + `}}}}}
    where: {id: "`+ id + `"}
  ) {
    id
  }
     publishManyOrders(to: PUBLISHED) {
    count
  }

  deleteManyUserCarts(where: {email: "`+ email + `"}) {
    count

}
}
  `
  const result = await request(MASTER_URL, query);
  return result;
}

export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  GetAllBusiness,
  AddToCart,
  GetUserCart,
  DisconnectRestroFromUserCartItem,
  DeleteItemFromCart,
  AddNewReview,
  getRestaurantReviews,
  CreateNewOrder,
  UpdateOrderToAddOrderItems
}


