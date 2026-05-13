import axios from "axios";

export const API_BASE_URL = "https://ecommerce-server-production-4000.up.railway.app";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getUser = () => async (dispatch) => {

  dispatch(getUserRequest());

  try {

    const jwt = localStorage.getItem("jwt");

    // ADD THIS
    console.log(`${API_BASE_URL}/api/users/profile`);

    const response = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const user = response.data;

    dispatch(getUserSuccess(user));

  } catch (error) {

    dispatch(getUserFailure(error.message));

    console.log("get user error:", error);
  }
};

// Add token dynamically before every request
api.interceptors.request.use(
    (config) => {

        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);