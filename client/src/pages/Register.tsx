import {
  Alert,
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../api/users";
import { ErrorOutline } from "@mui/icons-material";

export type UserFormValues = {
  id?: number;
  first_name: string;
  last_name: string;
  user_email: string;
  user_password: string;
  confirm_user_password: string;
};

const INITIAL_VALUES: UserFormValues = {
  first_name: "",
  last_name: "",
  user_email: "",
  user_password: "",
  confirm_user_password: "",
};

interface State extends SnackbarOrigin {
  open: boolean;
}

const Register = () => {
  const queryClient = useQueryClient();

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const showSuccessMessage = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const { user, updateUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const {
    mutateAsync: signup,
    isError,
    error,
    isPending,
    data,
  } = useMutation({
    mutationFn: UserService.signup,
    onSuccess: (data) => {
      console.log(data);

      //  Update user state with new data
      const { user_email: email, first_name, last_name, added, id } = data.user;
      updateUserInfo({ first_name, last_name, added, email, id });
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      showSuccessMessage();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    getValues,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserFormValues>({
    defaultValues: INITIAL_VALUES,
    mode: "onChange",
  });

  // console.log(errors[""]);

  const onSubmit = async (data: UserFormValues) => {
    signup(data);
  };

  if (isError) {
    console.log(error.name);
  }

  const errorMessage =
    error?.message === "Request failed with status code 400"
      ? "User with this email already exists"
      : error?.message;

  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{
          marginInline: "auto",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          py: 5,
        }}
      >
        <Stack
          component={"div"}
          maxWidth={["100%", "500px"]}
          spacing={2}
          alignItems={"center"}
        >
          <Typography variant="h4" component={"h2"} textAlign={"center"}>
            Register a new account
          </Typography>
          <Typography
            variant="body1"
            component={"h3"}
            textAlign={"center"}
            color="gray"
            maxWidth={["100%", "300px"]}
            marginInline={"auto"}
          >
            Use the form below to register for a new account, you can then use
            our service.
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack
            direction="column"
            spacing={3}
            sx={{ width: ["100%", "500px"], marginInline: "auto", py: 4 }}
          >
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <Stack direction="column" spacing={1}>
              <TextField
                label="First Name"
                type="text"
                {...register("first_name", {
                  required: "First name is required!",
                  validate: {
                    length: (value) => {
                      return (
                        (value.length >= 3 && value.length <= 20) ||
                        "Name must be between 3 and 20 characters"
                      );
                    },
                  },
                })}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Last Name"
                type="text"
                {...register("last_name", {
                  required: "Last name is required!",
                  validate: {
                    length: (value) => {
                      return (
                        (value.length >= 3 && value.length <= 20) ||
                        "Name must be between 3 and 20 characters"
                      );
                    },
                  },
                })}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Email"
                type="email"
                {...register("user_email", {
                  required: "Email is required!",
                  validate: {
                    isEmail: (value) => {
                      const emailRegEx =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                      return (
                        emailRegEx.test(value) || "Please enter a valid email"
                      );
                    },
                  },
                })}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Password"
                type="password"
                {...register("user_password", {
                  required: "Password is required!",
                  validate: {
                    isValidPassword: (value) => {
                      const passwordRegex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
                      return (
                        passwordRegex.test(value) ||
                        "Password should be between 8 and 20 characters long, should have at least one digit, one uppercase and one lowercase letter and one special character."
                      );
                    },
                  },
                })}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <TextField
                label="Confirm Password"
                type="password"
                {...register("confirm_user_password", {
                  required: "Second password is required!",
                  validate: {
                    doPasswordsMatch: (val) => {
                      return (
                        val === getValues("user_password") ||
                        "Passwords don't match"
                      );
                    },
                  },
                })}
              />
            </Stack>
            {Object.keys(errors).length !== 0 && (
              <List
                sx={{
                  borderRadius: 2,
                  bgcolor: "#fff0f3",
                  border: "1px solid #800f2f",
                }}
              >
                {Array.from(Object.keys(errors)).map((error) => {
                  console.log(error);

                  return (
                    <ListItem>
                      <ListItemIcon>
                        <ErrorOutline sx={{ color: "#800f2f" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={errors[error as keyof UserFormValues]?.message}
                        sx={{
                          color: "#800f2f",
                        }}
                        prefix="- "
                      />
                    </ListItem>
                  );
                })}
              </List>
            )}
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              sx={{
                alignSelf: "center",
                width: "fit-content",
                textTransform: "capitalize",
                px: 4,
              }}
            >
              Register
            </LoadingButton>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">Already have an account?</Typography>
              <Link component={RouterLink} to="/login">
                Sign in
              </Link>
            </Stack>
          </Stack>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
            autoHideDuration={2000}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              You registered successfully!
            </Alert>
          </Snackbar>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
