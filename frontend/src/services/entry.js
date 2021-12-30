import axios from 'axios';
const baseUrl = '/api/entry/';

const addEntry = async (token, entry) => {
  const newEntry = await axios.post(`${baseUrl}/new`, entry, { Authorization: token });
  return newEntry;
};

const getUserEntry = async (token) => {
  const userEntryList = await axios.get(`${baseUrl}`, {
    headers: {
      Authorization: token
    }
  });
  return userEntryList.data;
};

const deleteEntry = async (id, token) => {
  const deleteId = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  });
  return deleteId;
};

export { addEntry, getUserEntry, deleteEntry };