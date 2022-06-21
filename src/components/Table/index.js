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
    TextField,
    MenuItem
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CandidateTable = ({ users, editHandler, deleteHandler, statusHandler }) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="user data table">
                <TableHead>
                    <TableRow>
                        <TableCell className="userListTableHeading">Id</TableCell>
                        <TableCell className="userListTableHeading" align="left">Name</TableCell>
                        <TableCell className="userListTableHeading" align="left">Age</TableCell>
                        <TableCell className="userListTableHeading" align="left">Email</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((row, index) => (
                        <TableRow
                            key={row._id}

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
                                {row.age}
                            </TableCell>
                            <TableCell className="userListTableText" align="left">
                                {row.email}
                            </TableCell>
                            <TableCell>
                                <EditIcon onClick={() => editHandler(row._id)} style={{ margin: "0 10px" }} color="primary">
                                </EditIcon>
                                <DeleteIcon onClick={() => deleteHandler(row)} style={{ margin: "0 10px" }} color="error">
                                </DeleteIcon>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CandidateTable