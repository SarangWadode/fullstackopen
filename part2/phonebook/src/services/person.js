import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl);

const create = (newObj) => axios.post(baseUrl, newObj);

const del = (id) => axios.delete(`${baseUrl}/${id}`);

const update = (id, newObj) => axios.put(`${baseUrl}/${id}`, newObj);

export default { getAll, create, del, update };
