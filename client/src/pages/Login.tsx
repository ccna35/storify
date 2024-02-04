import {
  Alert,
  Box,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../api/users";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../store/store";
import { setUser } from "../app/slices/authSlice";

type FormValues = {
  UserName: string;
  Password: string;
};

const INITIAL_VALUES: FormValues = {
  UserName: "",
  Password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: UserService.login,
    onSuccess: (data) => {
      console.log(data);
      console.log(jwtDecode(data.token));

      const username = jwtDecode(data.token).UserName;
      const user_privileges = jwtDecode(data.token).UserPriv;

      localStorage.setItem("UserName", JSON.stringify(username));
      localStorage.setItem("UserPriv", JSON.stringify(user_privileges));
      dispatch(setUser({ UserName: username, UserPriv: user_privileges }));

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: INITIAL_VALUES,
    mode: "onChange",
  });
  const onSubmit = async (data: FormValues) => {
    setErrorMsg("");
    login(data);
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack
            direction="column"
            spacing={2}
            sx={{ maxWidth: "500px", marginInline: "auto" }}
          >
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Stack direction="column" spacing={1}>
              <TextField
                label="Email"
                type="email"
                {...register("UserName", {
                  required: "This field is required!",
                })}
              />
              {errors.UserName && (
                <Alert severity="error">{errors.UserName.message}</Alert>
              )}
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Password"
                type="password"
                {...register("Password", {
                  required: "This field is required!",
                })}
              />
              {errors.Password && (
                <Alert severity="error">{errors.Password.message}</Alert>
              )}
            </Stack>

            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isPending}
            >
              Log in
            </LoadingButton>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">New user?</Typography>
              <Link component={RouterLink} to="/register">
                Create a new account
              </Link>
            </Stack>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
