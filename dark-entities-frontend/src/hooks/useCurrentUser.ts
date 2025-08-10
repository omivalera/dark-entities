import { useAuth } from "../context/AuthContext";

export function useCurrentUser() {
  const { user, token } = useAuth();
  const role = user?.role;
  const name = user?.name;
  const last_name = user?.last_name;
  return { role, token, name, last_name };
}
