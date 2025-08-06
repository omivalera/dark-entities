export function useCurrentUser() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  return { role, token };
}
