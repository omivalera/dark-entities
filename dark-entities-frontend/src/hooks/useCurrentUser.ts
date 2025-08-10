export function useCurrentUser() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const last_name = localStorage.getItem("last_name");
  return { role, token, name, last_name };
}
