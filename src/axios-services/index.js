

export const BASE_URL = "http://localhost:3000/api";

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

export const fetchRegister = async (username, password, email, fullName, creditCardInfo, address, city, state, zip) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        email,
        fullName,
        creditCardInfo,
        address,
        city,
        state,
        zip
      })
    });

    const data = await response.json();

    return data;
    
  } catch(error) {
    console.error("There was an error creating an account", error)
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
          }),
      });

      const data = await response.json();

      return data
  } catch(error) {
      console.error("There was an error logging in", error);
  }
};

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
//***** REVIEWS FUNCTIONS GO HERE */
export const fetchReviews = async () => {
  try {
  const response = await fetch(`${BASE_URL}/reviews`, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = await response.json()

  return data;
} catch(error) {
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






//***** CART FUNCTIONS GO HERE */






//***** ORDERS FUNCTIONS GO HERE */


export const fetchAllOrders = async () => {
  const url = `{BASE_URL}/orders`;
  try {
    const result = await fetch(url);
    const response = await response.json();
  } catch(error) {
    console.error("Error fetching all orders", error)
  }
};



//***** SHOES FUNCTIONS GO HERE */







export async function getAPIHealth() {
  try {
    const { data } = await fetch('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
