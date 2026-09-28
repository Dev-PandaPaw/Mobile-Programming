import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { login, logout, UserInfo } from "../store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    isLoggedIn: auth.isLoggedIn,
    token: auth.token,
    user: auth.user,
    login: (userInfo?: UserInfo) => dispatch(login(userInfo)),
    logout: () => dispatch(logout()),
  };
}
