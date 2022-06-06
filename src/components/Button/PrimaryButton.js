import React from "react";
import { Button } from "@mui/material";

export const PrimaryButton = ({ value }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            type="submit"
            className="button-block"
           // style={{ width:"40%", padding:"10px"}}
        >
            {value}
        </Button>
    )
}

export default PrimaryButton