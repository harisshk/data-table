import React, { useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from 'formik';
import * as Validation from 'yup';
import { useNavigate, useParams } from "react-router-dom";

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
import { CREATE_CANDIDATE, GET_CANDIDATES_BY_ID, states, UPDATE_CANDIDATE } from "../constants";
import Loader from '../components/Loader'
import { AlertSnackbar } from "../components/Snackbar";

//Services
import { editCandidateData, getCandidateById } from "../services/candidateService";
import { useMutation, useQuery } from "@apollo/client";


export function CandidateForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editData, setData] = useState({})
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: ""
    })
    const navigate = useNavigate();
    const id = useParams();
    const FormSchema = Validation.object().shape({
        email: Validation.string().email('Email must be a valid email address').required('Email is required'),
        name: Validation.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
        age: Validation.number().required('Age is required').min(10, 'Too Short').max(140, 'Too Long!'),
        state: Validation.string().required('State is required'),
    }); 
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            age: '',
            state: '',
        },
        validationSchema: FormSchema,
        onSubmit: async (inputData) => {
            setIsLoading(true)
            const input = {
                ...inputData,
            }
            isEdit ?
            updateUser({ variables: { ...input, id:id?.id }})
            :
            createUser({ variables: { ...input } });
        }
    });
    const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;
    const setEditData = (data) => {
        const {name, age, email, state}= data?.getCandidateById
        setFieldValue('name', name)
        setFieldValue('age', age)
        setFieldValue('email', email)
        setFieldValue('state', state)
    }
    const [createUser, { loading }] = useMutation(CREATE_CANDIDATE, 
        {
            onCompleted:()=>{
                setSnackbarInfo({
                    message: `Candidate ${isEdit ? 'updated' : 'added'} successfully`,
                    variant: "success",
                });
                setSnackbarOpen(true);
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/candidate/list', { replace: true });
                }, 1000);
            },
            onError:()=>{
                setSnackbarInfo({
                    message: `Candidate cannot be ${isEdit ? 'updated' : 'added'}`,
                    variant: "error",
                });
                setSnackbarOpen(true)
                setIsLoading(false)
            }
        });
    const [updateUser, { loading:updateLoading }] = useMutation(UPDATE_CANDIDATE, 
        {
            onCompleted:()=>{
                setSnackbarInfo({
                    message: `Candidate ${isEdit ? 'updated' : 'added'} successfully`,
                    variant: "success",
                });
                setSnackbarOpen(true);
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/candidate/list', { replace: true });
                }, 1000);
            },
            onError:()=>{
                setSnackbarInfo({
                    message: `Candidate cannot be ${isEdit ? 'updated' : 'added'}`,
                    variant: "error",
                });
                setSnackbarOpen(true)
                setIsLoading(false)
            }
        });
    const { data: candidateData,error, loading: dataFetched } = useQuery(GET_CANDIDATES_BY_ID, {
        variables:{
            id:id?.id,
        },
        skip: id?.id === false
    })
    useEffect(() => {
        if(!dataFetched && candidateData){
            setEditData(candidateData);
            setIsEdit(true)
        }
      }, [dataFetched, candidateData])
    return (
        <>
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
                                                    placeholder="Enter the name"
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
                                                    placeholder="Enter the email"
                                                    type="email"
                                                    {...getFieldProps('email')}
                                                    error={Boolean(touched.email && errors.email)}
                                                    helperText={touched.email && errors.email}
                                                />
                                            </Grid>
                                            <Grid style={{ padding: "0 10px" }} xs={12} sm={12} lg={6} xl={6} item >
                                                <Label value={'State'} />
                                                <FormControl fullWidth>
                                                    <TextField
                                                        select
                                                        placeholder="Select the State"
                                                        {...getFieldProps('state')}
                                                        error={Boolean(touched.state && errors.state)}
                                                        helperText={touched.state && errors.state}
                                                    >
                                                        {states && states.map((value) => {
                                                            return (
                                                                <MenuItem key={value} value={value}>{value}</MenuItem>
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
                                        </Grid>
                                        <Grid container item style={{ marginTop: "40px", justifyContent: "flex-end" }} >
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                type="button"
                                                className="form-button"
                                                onClick={() => navigate("/candidate/list")}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className="form-button"
                                            >
                                                {isEdit ? "Update" : "Create"}
                                            </Button>
                                        </Grid>
                                    </Form>
                                </FormikProvider>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
            <Loader open={loading || dataFetched} />
        </>

    );

}
export default CandidateForm