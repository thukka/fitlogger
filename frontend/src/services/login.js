import axios from 'axios';

const baseUrl = '/api/login';

const loginUser = async (email, password) => {
  const login = await axios.post(baseUrl, { email: email, password: password });
  return login.data;
};

export default loginUser;