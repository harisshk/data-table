import React from "react";
import {
    TextField,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import Label from "../../components/Label";
import PrimaryButton from "../../components/Button/PrimaryButton";

export function Signup() {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }
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
                        <form onSubmit={handleSubmit}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Label value={'Email Id'} />
                                    <TextField
                                        type="email"
                                        placeholder="Email"
                                        fullWidth
                                        name="username"
                                        variant="outlined"
                                        required
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item>
                                    <Label value={'Phone Number'} />
                                    <TextField
                                        type="email"
                                        placeholder="Email"
                                        fullWidth
                                        name="username"
                                        variant="outlined"
                                        required
                                        autoFocus
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
                                    <PrimaryButton value={"Login"} />
                                </Grid>
                                <Grid item>
                                    Didn't Have an account ?
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );

}
export default Signup;