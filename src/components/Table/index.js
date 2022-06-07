import React from "react"
import "./index.css";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";


const CandidateTable = ({ users, editUserHandler, deleteUserHandler }) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="user data table">
                <TableHead>
                    <TableRow>
                        <TableCell className="userListTableHeading">Id</TableCell>
                        <TableCell className="userListTableHeading" align="left">Name</TableCell>
                        <TableCell className="userListTableHeading" align="left">Date of Birth</TableCell>
                        <TableCell className="userListTableHeading" align="left">Email</TableCell>
                        <TableCell className="userListTableHeading" align="left">Result</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((row, index) => (
                        <TableRow
                            key={row.id}

                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                                "&:nth-of-type(odd)": {
                                    backgroundColor: "#F5F5F5",
                                },
                            }}
                        >
                            <TableCell className="userListTableText" component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell className="userListTableText" align="left">
                                {row.name}
                            </TableCell>
                            <TableCell className="userListTableText" align="left">
                                {row.dateOfBirth}
                            </TableCell>
                            <TableCell className="userListTableText" align="left">
                                {row.email}
                            </TableCell>
                            <TableCell className="userListTableText" align="left">
                                { }
                            </TableCell>
                            <TableCell
                                align="left"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly"
                                }}
                            >
                                <Button onClick={() => editUserHandler(row.id)} variant="outlined" style={{ fontSize: 12 }} color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => deleteUserHandler(row.id)} variant="outlined" style={{ marginLeft: 5, fontSize: 12 }} color="error">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CandidateTable