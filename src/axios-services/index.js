import axios from 'axios';

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
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/


//***** USERS FUNCTIONS GO HERE */







//***** REVIEWS FUNCTIONS GO HERE */








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
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
