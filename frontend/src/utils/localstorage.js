export const getToken = () => {
  const token = localStorage.getItem("token");
  const parsedToken = JSON.parse(token);
  return parsedToken;
};
