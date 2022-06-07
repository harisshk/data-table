import React from "react";
import { useFormik, Form, FormikProvider } from 'formik';
import * as Validation from 'yup';

//MUI
import {
    TextField,
    Grid,
    Paper,
    Button,
    Typography,
    FormControl,
    MenuItem
} from "@mui/material";

// Components
import Label from "../components/Label";

export function CandidateForm() {
    const states = ["Tamil Nadu", "Karnataka", "Kerala", "Maharastra", "West Bengal"]
    const FormSchema = Validation.object().shape({
        email: Validation.string().email('Email must be a valid email address').required('Email is required'),
        name: Validation.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
        age: Validation.number().required('Age is required').min(10, 'Too Short').max(140, 'Too Long!'),
        pinCode: Validation.string().required('Pin-Code is required').max(6, "Not a valid Pin Code"),
        state: Validation.string().required('State is required'),
        dateOfBirth: Validation.date().max(new Date()).required("DOB is required")
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            age: '',
            pinCode: '',
            state: '',
            dateOfBirth: '',
        },
        validationSchema: FormSchema,
        onSubmit: async (data) => {
            const { email, password } = data
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
            <Grid container style={{ justifyContent: "center" }}>
                <Grid item lg="7" md="7" sm="8" xs="12"  >
                    <Paper
                        variant="elevation"
                        elevation={4}
                        style={{ padding: "50px" }}
                    >
                        <Grid item>
                            <Typography component="h1" variant="h6" marginBottom={"20px"} >
                                Create candidate
                            </Typography>
                        </Grid>
                        <Grid item xs="12" >
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
                                    <Grid container spacing={2} display="flex" justifyContent="center">
                                        <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                            <Label value={'Name'} />
                                            <TextField
                                                fullWidth
                                                autoComplete="name"
                                                type="text"
                                                {...getFieldProps('name')}
                                                error={Boolean(touched.name && errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Grid>
                                        <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
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
                                        <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                            <Label value={'Date Of Birth'} />
                                            <TextField
                                                fullWidth
                                                type="date"
                                                {...getFieldProps('dateOfBirth')}
                                                error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                                                helperText={touched.dateOfBirth && errors.dateOfBirth}
                                            />
                                        </Grid>
                                        <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                            <Label value={'State'} />
                                            <FormControl fullWidth>
                                                <TextField
                                                    select
                                                    {...getFieldProps('state')}
                                                    error={Boolean(touched.state && errors.state)}
                                                    helperText={touched.state && errors.state}
                                                >
                                                    {states && states.map((value) => {
                                                        return (
                                                            <MenuItem value={value}>{value}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </FormControl>
                                        </Grid>
                                        <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                            <Label value={'Age'} />
                                            <TextField
                                                fullWidth
                                                placeholder="Enter the Age"
                                                type="number"
                                                {...getFieldProps('age')}
                                                error={Boolean(touched.age && errors.age)}
                                                helperText={touched.age && errors.age}
                                            />
                                        </Grid>

                                        <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                            <Label value={'PinCode'} />
                                            <TextField
                                                fullWidth
                                                type="number"
                                                placeholder="Enter the Pin-Code"
                                                {...getFieldProps('pinCode')}
                                                error={Boolean(touched.pinCode && errors.pinCode)}
                                                helperText={touched.pinCode && errors.pinCode}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container item style={{ marginTop: "40px", justifyContent: "flex-end" }} >
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            type="submit"
                                            className="form-button"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className="form-button"
                                        >
                                            {"Create"}
                                        </Button>
                                    </Grid>
                                </Form>
                            </FormikProvider>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>

    );

}
export default CandidateForm;