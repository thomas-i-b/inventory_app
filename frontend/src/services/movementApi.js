import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getMovements = async ({ from, to, type }) => {
  const params = {
    from,
    to,
  };

  if (type && type !== "ALL") {
    params.type = type;
  }

  const response = await axios.get(
    `${API_BASE_URL}/movements`,
    { params }
  );

  return response.data;
};