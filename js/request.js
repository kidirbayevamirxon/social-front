import axios from "axios";

// Axios instansini yaratish
export const axiosInstance = axios.create({
  baseURL: "https://social-backend-kzy5.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Authorization headerni qo'shish
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: 401 xatolikni boshqarish (tokenning muddati o'tgan bo'lsa)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log("401 xatolik aniqlangan, tokenni yangilashga urinish...");
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          console.error("Refresh token mavjud emas.");
          // Foydalanuvchini qayta login qilishga yo'naltirish
        }

        const response = await axios.get(
          "https://social-backend-kzy5.onrender.com/auth/refresh",
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        const newAccessToken = response.data.accessToken;
        console.log("Yangi access token:", newAccessToken);

        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token yangilashda xatolik:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Foydalanuvchini login sahifasiga yuborish
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
