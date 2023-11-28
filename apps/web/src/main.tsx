import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider, createRefresh } from "react-auth-kit";
import api from "./api";
import { IUser } from "@codernex/types";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SettingProvider from "./context/setting";
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider
    authName="access_token"
    authType="localstorage"
    refresh={createRefresh({
      interval: 10, // Refreshs the token in every 10 minutes
      refreshApiCallback: async ({ refreshToken }) => {
        try {
          const {
            data: { data },
          } = await api.post<{
            data: {
              accessToken: string;
              refreshToken: string;
              user: IUser;
            };
          }>("/auth/refresh", { refreshToken });

          return {
            isSuccess: true,
            newAuthToken: data.accessToken,
            newRefreshToken: data.refreshToken,
            newAuthTokenExpireIn: 60,
            newRefreshTokenExpiresIn: 60 * 24,
            newAuthUserState: data.user,
          };
        } catch (error) {
          return {
            isSuccess: false,
            newAuthToken: "",
          };
        }
      },
    })}
  >
    <BrowserRouter>
      <Provider store={store}>
        <SettingProvider>
          <App />
          <Toaster />
        </SettingProvider>
      </Provider>
    </BrowserRouter>
  </AuthProvider>
);
