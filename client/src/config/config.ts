import axios from "axios";

const query = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

query.interceptors.request.use(
  function (config) {
    // If the access token is available, attach it to the Authorization header
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

query.interceptors.response.use(
  (response) => {
    // If the request was successful, return the response
    return response;
  },
  async (error) => {
    console.log(error);

    const originalRequest = error.config;

    // If the error is a 401 and the request was not retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token using the refresh token from localStorage
        const newAccessToken = await refreshToken();

        // Update the original request headers with the new access token
        originalRequest.headers["Authorization"] = newAccessToken;

        // Retry the original request with the updated headers
        return query(originalRequest);
      } catch (refreshError) {
        // If refreshing the token fails, you may want to handle this accordingly
        console.error("Failed to refresh token:", refreshError);
      }
    }

    // If the error is not a 401 or the token refresh failed, reject the request with the error
    return Promise.reject(error);
  }
);

// Example refreshToken function
async function refreshToken() {
  // Replace this with your logic to refresh the token using the refresh token from localStorage
  // Example:
  try {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await query.post("/token8", { refreshToken, token });
    const newAccessToken = response.data.token;
    localStorage.setItem("token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      alert("Session expired, please log in again");
      localStorage.clear();
      window.location.replace("/login");
      //show modal for user to end the session and log in again
    }
  }
}

export { query };
