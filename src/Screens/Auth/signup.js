import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Validation from 'yup';
import {
    TextField,
    Grid,
    Paper,
    Typography,
    Link
} from "@mui/material";
import Label from "../../components/Label";
import PrimaryButton from "../../components/Button/PrimaryButton";

export function Signup() {

    const UserSchema = Validation.object().shape({
        name: Validation.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name required'),
        email: Validation.string().email('Email must be a valid email address').required('Email is required'),
        password: Validation.string().required('Password is required').min(8, "Min 8 characters should be there"),
        phoneNumber: Validation.string().required('Phone Number is required').max(10, "Not valid"),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phoneNumber: ''
        },
        validationSchema: UserSchema,
        onSubmit: async (data) => {
            const { email, password, name, phoneNumber } = data
            console.log("___", data)
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
            <Grid item>
                <Paper
                    variant="elevation"
                    elevation={4}
                    className="login-background"
                >
                    <Grid item>
                        <Typography component="h1" variant="h6" marginBottom={"10px"} textAlign={"center"}>
                            Signup
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormikProvider value={formik}>
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Label value={'Name'} />
                                        <TextField
                                            fullWidth
                                            type="text"
                                            {...getFieldProps('name')}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Label value={'Email'} />
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
                                        <Label value={'Phone Number'} />
                                        <TextField
                                            fullWidth
                                            type="number"
                                            {...getFieldProps('phoneNumber')}
                                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                            helperText={touched.phoneNumber && errors.phoneNumber}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Label value={'Password'} />
                                        <TextField
                                            type="password"
                                            placeholder="Password"
                                            fullWidth
                                            name="password"
                                            variant="outlined"
                                            required
                                        />
                                        <span style={{ display: "flex", justifyContent: "end", fontSize: 13 }}>Min 8 Alpha numeric</span>
                                    </Grid>
                                    <Grid container item style={{ display: "flex", justifyContent: "center" }}>
                                        <PrimaryButton value={"Signup"} />
                                    </Grid>
                                    <Grid item>
                                        <Typography

                                            sx={{
                                                mt: 3,
                                            }}
                                        >
                                            Already have an account?&nbsp;
                                            <Link variant="subtitle2" component={RouterLink} to="/signin" underline="hover">
                                                Signin.
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
export default Signup;