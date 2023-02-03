

export const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api";

const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;

  }
  return headers;
};

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await fetch.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/


//***** USERS FUNCTIONS GO HERE */
export const getAllUsers = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/all`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log("HELP ME", data)
    return data;
  } catch(error) {
    console.error("There was an error getting all of the users", error);
  }
}

export const fetchLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    });

    const data = await response.json();

    return data;
  } catch(error) {
    console.error("There was an error logging in", error)
  }
}

export const fetchRegister = async (username, password, email, isAdmin, fullName, creditCardInfo, address, city, state, zip) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username,
          password,
          email,
          isAdmin,
          fullName,
          creditCardInfo,
          address,
          city,
          state,
          zip
        }
      })
    });

    const data = await response.json();

    return data;
    
  } catch(error) {
    console.error("There was an error creating an account", error)
  }
}


export const fetchGuest = async (token) => {
  try {

    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "applicatioin/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json()
    return data;

  } catch(error) {
    console.error("There was an error finding your account", error)
  }
}

export const fetchUpdateUser = async (token, userId, username, password, email, isAdmin, fullName, creditCardInfo, address, city, state, zip) => {
  try {
    const response = await fetch(`${BASE_URL}/users/:${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          username,
          password,
          email,
          isAdmin,
          fullName,
          creditCardInfo,
          address,
          city,
          state,
          zip
        }
      })
    });

    const data = await response.json();

    return data;
  } catch(error) {
    console.error("There was an error updating your post", error);
  }
}

//***** REVIEWS FUNCTIONS GO HERE */
export const fetchReviews = async () => {
  const url = `${BASE_URL}/reviews`
  try {
  const response = await fetch(url);
  const data = await response.json()
  return data;
 }catch(error){
  console.error("There was an error fetching reviews", error)
 }
}

export const createReviews = async (username, rating, comment) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        rating,
        comment
      })
    })

    const data = await response.json();

    return data;
  } catch(error) {
    console.error("There was an error creating reviews", error)
  }
}

export const deleteReview = async (token, reviewId) => {
  console.log('api delete review', reviewId)
  try{
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
    })

    const data = await response.json()
  return data;
  } catch(error) {
    console.error("There was an error deleting reviews", error)
  }
}



//***** ORDERS FUNCTIONS GO HERE */


export const fetchAllOrders = async () => {
  const url = `${BASE_URL}/orders`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch(error) {
    console.error("Error fetching all orders", error)
  }
};

export const fetchSingleOrder = async (id) => {
  const url = `${BASE_URL}/orders/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching single order", error)
  }
};



//***** SHOES FUNCTIONS GO HERE */
  
export const fetchAllShoes = async () => {
  const url = `${BASE_URL}/shoes`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('fetchshoesdata', data)
    return data
  } catch (error) {
    console.error("There was an error fetching shoes", error)
  }
} 

export const fetchSingleShoe = async (id) => {
  const url = `${BASE_URL}/shoes/${id}`
  try {
    const response = await fetch(url);
    const data = await response.json()
    return data
  } catch (error) {
    console.error("There was an error fetching your shoe", error)
  }
}

export const createShoes = async({token, shoename, description, price, type, size, image}) => {
  console.log(`Auth header: Bearer ${token}`);
  try {
      const response = await fetch(`${BASE_URL}/shoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            shoename: shoename,
            description: description,
            price: price,
            type: type,
            size: size,
            image: image
      })
  })
      const result = await response.json()
      return result
    }catch(error){
      console.error("There was an error creating shoes", error)
  }
}


// export const updateShoes = async({id, token, userId, username, shoename, description, price, type, size }) => {
//   try {
//       const response = await fetch(`${BASE_URL}/shoes/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//             userId: userId,
//             username: username,
//             shoename: shoename,
//             description: description,
//             price: price,
//             type: type,
//             size: size,
//       })
//   })
//         const result = await response.json()
//         return result;
//     }catch(error) {
//       console.error("There was an error updating shoes", error);
//   }
// }


export const deleteShoes = async(id, token) => {
  try {
      const response = await fetch(`${BASE_URL}/shoes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        const result = await response.json()
        return result;
    }catch(error) {
      console.error("There was an error deleting shoes", error);
  }
}







export async function getAPIHealth() {
  try {
    const { data } = await fetch('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}


