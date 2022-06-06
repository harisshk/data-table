import React from "react";
import {
    TextField,
    Grid,
    Paper,
    Button,
    Typography,
    Select,
    MenuItem
} from "@mui/material";

import Label from "../components/Label";

export function CandidateForm() {
    const states =["Tamil Nadu"]
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
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2} display="flex" justifyContent="center">
                                    <Grid item xs="12" lg="6">
                                        <Label value={'Name'} />
                                        <TextField
                                            style={{ width: "85%" }}
                                            type="text"
                                            placeholder="Enter your Name"
                                            fullWidth
                                            variant="outlined"
                                            required
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs="12" lg="6">
                                        <Label value={'Address'} />
                                        <TextField
                                            style={{ width: "85%" }}
                                            type="address"
                                            placeholder="Enter your Address"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs="12" lg="6">
                                        <Label value={'Date of Birth'} />
                                        <TextField
                                        name="setTodaysDate"
                                            // inputProps={{ max: "<?= date('Y-m-d'); ?>" }}
                                            style={{ width: "85%" }}
                                            type="date"
                                            onChange={(e)=>{}}
                                            placeholder="Enter your DOB"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs="12" lg="6">
                                        <Label value={'State'} />
                                        <Select
                                        style={{ width: "85%" }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            fullWidth
                                            // label={"Select a State"}
                                            placeholder="Select a state"
                                            // value={selectedValue ? selectedValue : null}
                                            // label={label}
                                            // onChange={onchange}
                                        >
                                            
                                            {states && states.map((value) => {
                                                return (
                                                    <MenuItem value={value}>{value}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </Grid>
                                    <Grid item xs="12" lg="6">
                                        <Label value={'Age'} />
                                        <TextField
                                            style={{ width: "85%" }}
                                            type="number"
                                            placeholder="Enter your Age"
                                            fullWidth
                                            min={1}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs="12" lg="6">
                                        <Label value={'Pin Code'} />
                                        <TextField
                                            style={{ width: "85%" }}
                                            type="address"
                                            placeholder="Enter your Pin Code"
                                            fullWidth
                                            variant="outlined"
                                            required
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
                            </form>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        
    );
    
}
export default CandidateForm;