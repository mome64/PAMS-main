// Function to read the data from the user's local storage
const getAuth = () => {
  try {
    const token = localStorage.getItem("user_token");

    if (token) {
      const decodedToken = decodeTokenPayload(token);
      return {
        role: decodedToken.user_role,
        userId: decodedToken[`${decodedToken.user_role.toLowerCase()}_id`],
        username: decodedToken.username,
        token: token,
      };
    } else {
      console.log("Token is not found in local storage.");
    }
  } catch (error) {
    console.error("Error parsing user token:", error);
  }
  return {};
};

// Function to decode the payload from the token
const decodeTokenPayload = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding token payload:", error);
    return {};
  }
};

export default getAuth;
