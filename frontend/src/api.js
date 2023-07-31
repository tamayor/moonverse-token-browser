import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend server's URL
});

export const fetchTokenBalances = async (address) => {
  try {
    const response = await api.post("/get-token-balances", { address });
    return response.data.tokenBalances;
  } catch (error) {
    console.error("Error fetching token balances:", error.message);
    return null;
  }
};
