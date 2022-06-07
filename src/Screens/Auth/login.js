import React, { useState } from "react";
import { useFormik, Form, FormikProvider } from 'formik';
import * as Validation from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

//MUI
import {
    TextField,
    Grid,
    Paper,
    Typography,
    IconButton,
    InputAdornment,
    Link
} from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// redux
import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/action/profile'
// Components
import Label from "../../components/Label";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { AlertSnackbarBC } from '../../components/Snackbar';
//Services
import { login } from "../../services/authService";

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarInfo, setSnackbarInfo] = useState({
    message: "",
    variant: ""
  })
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const UserSchema = Validation.object().shape({
        email: Validation.string().email('Email must be a valid email address').required('Email is required'),
        password: Validation.string().required('Password is required').min(8, "Min 8 characters should be there"),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: UserSchema,
        onSubmit: async (data) => {
            const { email, password } = data
            setIsLoading(true)
            const loginResponse = await login(email, password)
            if (loginResponse.success) {
                dispatch(setProfile(loginResponse));
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/candidate/list', { replace: true });
                }, 2000);
            }
            else {
                setIsLoading(false)
                if (loginResponse.message === "Mismatch email / password") {
                    setSnackbarInfo({
                        message: "Credentials error",
                        variant: "error"
                    })
                    setSnackbarOpen(true)
                } else if (loginResponse.message === "No account found using this email Id") {
                    setSnackbarInfo({
                        message: "Credentials error",
                        variant: "error"
                    })
                    setSnackbarOpen(true)
                } else {
                    setSnackbarInfo({
                        message: "Something went wrong",
                        variant: "error"
                    })
                    setSnackbarOpen(true)
                }
            }
        }
    });
    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }} >
            <Grid item >
                <Paper
                    variant="elevation"
                    elevation={4}
                    className="login-background"
                >
                    <Grid item>
                        <Typography component="h1" variant="h6" marginBottom={"10px"} textAlign={"center"}>
                            Login
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Label value={'Email Id'} />
                                        <TextField
                                            fullWidth
                                            autoComplete="email"
                                            type="email"
                                            {...getFieldProps('email')}
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Label value={'Password'} />
                                        <TextField
                                            fullWidth
                                            autoComplete="current-password"
                                            type={showPassword ? 'text' : 'password'}
                                            {...getFieldProps('password')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleShowPassword} edge="end">
                                                            {
                                                                !showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            error={Boolean(touched.password && errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                    </Grid>
                                    <Grid container item style={{ display: "flex", justifyContent: "center" }}>
                                        <PrimaryButton value={"Login"} />
                                    </Grid>
                                    <Grid item>
                                        <Typography

                                            sx={{
                                                mt: 3,
                                            }}
                                        >
                                            Don’t have an account?&nbsp;
                                            <Link variant="subtitle2" component={RouterLink} to="/signup" underline="hover">
                                                Register here.
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Form>
                        </FormikProvider>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );

}
export default Login;