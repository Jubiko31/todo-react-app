import axios from 'axios';

const API = 'http://localhost:8000/todos';

const fetchWithBody = async (method, body, id) => {
  const URL = id ? `${API}/${id}` : API;
  const data = body;
  return axios(URL, {
    method,
    data,
  });
};

const fetchWithoutBody = async (method, id) => {
  const URL = id ? `${API}/${id}` : API;
  // eslint-disable-next-line no-return-await
  return await axios({
    method,
    url: URL,
  });
};

// const exportComponents;
export { fetchWithoutBody, fetchWithBody };
