import { FormGroup, TextField, IconButton, Select, MenuItem, FormControlLabel, Switch } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import { UserList } from "../Interfaces/user.interface";


interface SearchToolbarProps {
    users: UserList;
    clearTextSearch: () => void;
    onTextChange: () => void;
    onUserChange: (value: string) => void;
    onCompleteChange: (value: boolean) => void;
    textValue: string;
    userValue: UserList;
  }

  
export default function SearchToolbar(props: SearchToolbarProps) {
    const [userSelected, setUserSelected] = React.useState<string>('0')
    const [completeSelected, setCompleteSelected] = React.useState<boolean>(false)

    const handleUserChange = function(event:any) {
        setUserSelected(event.target.value)
        props.onUserChange(event.target.value)
    }

    const handleCompleteChange = function(event:any) {
        setCompleteSelected(event.target.checked)
        props.onCompleteChange(event.target.checked)
    }
    return (
      <FormGroup className='SearchForm' row={true}>
        <TextField
            className='SearchTextInput'
            variant="standard"
            value={props.textValue}
            onChange={props.onTextChange}
            placeholder="Task"
            InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
                <IconButton
                    title="Clear"
                    aria-label="Clear"
                    size="small"
                    style={{ visibility: props.textValue ? 'visible' : 'hidden' }}
                    onClick={props.clearTextSearch}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
            ),
            }}
          />
          {props.users &&
            <Select
                className='SearchUserInput'
                autoWidth
                variant='standard'
                onChange={handleUserChange}
                value={userSelected}
                >
                <MenuItem value='0'>Please Select a User</MenuItem>
                {props.users.map((user) => {
                    return (
                    <MenuItem key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</MenuItem>
                    )
                })}
                </Select>
            }
            <FormControlLabel
                control={
                    <Switch
                        className='SearchCompleteInput'
                        onChange={handleCompleteChange}
                        value={completeSelected}
                    />
                }
                label="Completed" />
        </FormGroup>
      
    );
  }