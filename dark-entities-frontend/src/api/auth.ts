import axios from "axios";

export const login = async (email: string, password: string) => {
  const data = new URLSearchParams();
  data.append("username", email);
  data.append("password", password);

  const res = await axios.post(
    "http://127.0.0.1:8000/auth/login",
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
    "http://127.0.0.1:8000/auth/register",
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};
