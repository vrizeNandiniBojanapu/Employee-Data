import React, { useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './index.css';
import { IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DataGridDemo() {
    const firstName = useRef('')
    const lastName = useRef('')
    const email = useRef('')
    const [open, setOpen] = React.useState(false);

    let rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'Snow@gmail.com' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'Lannister@gmail.com'  },
        { id: 3, lastName: 'John', firstName: 'Jaime', email: 'John@gmail.com'  },
        { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'Stark@gmail.com'  },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'Test@gmail.com'  }
    ];
    const [employees, setEmployees] = React.useState(rows);
    const [selectionModel, setSelectionModel] = React.useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 110,
            editable: true,
        },
        {
            field: "delete",
            width: 75,
            sortable: false,
            disableColumnMenu: true,
            renderHeader: () => {
              return (
                <IconButton
                  onClick={() => {
                    const selectedIDs = new Set(selectionModel);
                    // you can call an API to delete the selected IDs
                    // and get the latest results after the deletion
                    // then call setRows() to update the data locally here
                    setEmployees((r) => r.filter((x) => !selectedIDs.has(x.id)));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              );
            }
          }
    ];


    const handleAddRow = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log(firstName.current.value, lastName.current.value, email.current.value);
        let newObj = { lastName: firstName.current.value, firstName: lastName.current.value, email: email.current.value };
        newObj.id = rows[rows.length - 1]['id'] + 1;
        rows = Object.assign([], rows);
        
        rows.push(newObj);
        setEmployees(rows);
        setOpen(false);
    }

    return (
        <div>
            <h1>Employee Details</h1>
            <div className="add-employee-parentdiv">
                <div align="right" className="add-employee-childdiv">
                    <Button variant="contained" onClick={handleAddRow}>Add Employee</Button>
                </div>
            </div>

            <Box sx={{ height: 400, width: '50%', margin: 'auto' }}>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(ids) => {
                        setSelectionModel(ids);
                      }}
                />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Employee Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="fname"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputRef={firstName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="lname"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputRef={lastName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            inputRef={email}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}
