import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const login_api = process.env.LOGIN_URL;
const register_api = process.env.REGISTER_URL;

const LoginAuth = (email, password) => {
  return useQuery({
    queryKey: ["login"],
    queryFn: () => axios.post(login_api, { email, password }),
  });
};



const RegisterIndividualAuth = (
  first_name,
  last_name,
  gender,
  username,
  email,
  phone_number,
  password,
  role
) => {
  return useQuery({
    queryKey: ["individualRegistration"],
    queryFn: () =>
      axios.post(register_api, {
        first_name,
        last_name,
        gender,
        username,
        email,
        phone_number,
        password,
        role,
      }),
  });
};



const RegisterCorperteAuth = (
  first_name,
  last_name,
  gender,
  username,
  email,
  phone_number,
  password,
  organizationName,
  organizationType,
  role
) => {
  return useQuery({
    queryKey: ["corperateRegistration"],
    queryFn: () =>
      axios.post(register_api, {
        first_name,
        last_name,
        gender,
        username,
        email,
        phone_number,
        password,
        organizationName,
        organizationType,
        role,
      }),
  });
};

export { LoginAuth, RegisterIndividualAuth, RegisterCorperteAuth };

