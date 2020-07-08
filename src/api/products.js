import axios from 'axios';

const getProducts = async (category) => {
  // let res = await axios.get(`http://localhost:5000/products?category=${category}`)
  let res = await axios.get(`https://marketplace--server.herokuapp.com/products?category=${category}`)
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}

export { getProducts };