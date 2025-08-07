import axios from "axios";
import { API_BASE_URL } from "./config";

export const login = async (email: string, password: string) => {
  const data = new URLSearchParams();
  data.append("username", email);
  data.append("password", password);

  const res = await axios.post(
    `${API_BASE_URL}/auth/login`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res.data; // { access_token, token_type, user }
};

export const register = async (email: string, password: string) => {
  const res = await axios.post(
    `${API_BASE_URL}/auth/register`,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};
