import axios from 'axios';
const baseUrl = '/api/entry';

const addEntry = async (token, entry) => {
  const newEntry = await axios.post(`${baseUrl}/new`, entry, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
  return newEntry;
};

const getUserEntry = async (token) => {
  const userEntryList = await axios.get(`${baseUrl}`, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
  return userEntryList.data;
};

const deleteEntry = async (id, token) => {
  const deleteId = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
  return deleteId;
};

export { addEntry, getUserEntry, deleteEntry };