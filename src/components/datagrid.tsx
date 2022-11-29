import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { TodoList } from '../Interfaces/todo.interface';
import { UserList } from '../Interfaces/user.interface';
import { FormControlLabel, FormGroup, MenuItem, Select, Switch } from '@mui/material';



let users:UserList;

interface SearchToolbarProps {
  clearTextSearch: () => void;
  onTextChange: () => void;
  onUserChange: (value: string) => void;
  onCompleteChange: (value: boolean) => void;
  textValue: string;
  userValue: UserList;
}

function escapeRegExp(value: string): string {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }


function SearchToolbar(props: SearchToolbarProps) {
    const [userSelected, setUserSelected] = React.useState<string>('0')
    const [completeSelected, setCompleteSelected] = React.useState<boolean>(false)

    const handleUserChange = function(event:any) {
        setUserSelected(event.target.value)
        props.onUserChange(event.target.value)
    }

    const handleCompleteChange = function(event:any) {
        console.log(event.target.checked)
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
          {users &&
            <Select
                className='SearchUserInput'
                autoWidth
                variant='standard'
                onChange={handleUserChange}
                value={userSelected}
                >
                <MenuItem value='0'>Please Select a User</MenuItem>
                {users.map((user) => {
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

function getUserName(id: number):string {
    let user = users.find(user => user.id === id)
    if (user)
      return (user?.firstName + " " + user?.lastName);
    return '';
  }

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 400 },
    { field: 'UserName', headerName: 'User', width: 200,
        valueGetter: (params: GridValueGetterParams) =>
          `${getUserName(params.row.user)} `
    },
    { field: 'isComplete', headerName: 'Completed', width: 120,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.isComplete ? 'Yes' : 'No'}`
    },
    { field: 'actions', headerName: 'Actions', width: 200 },
  ];

export default function QuickFilteringGrid(props: {todos:TodoList, users:UserList}) {
  const data = props.todos;
  users = props.users;

  const [searchValue, setSearchValue] = React.useState<null | string>()
  const [userValue, setUserValue] = React.useState<null | string>()
  const [completeValue, setCompleteValue] = React.useState<boolean>()
  const [rows, setRows] = React.useState<any[]>(data);

  const requestSearch = async () => {
    let rowsToBe = data;
    if (searchValue) {
        const searchRegex = new RegExp(escapeRegExp(searchValue));
        const filteredRows = rowsToBe.filter((row: any) => {
          return Object.keys(row).some((field: any) => {
            return searchRegex.test(row[field].toString());
          });
        });
        rowsToBe = filteredRows
    }
    if (userValue != '0') {
        const filteredRows = rowsToBe.filter((row:any) => {
            return row.user == userValue
        })
        rowsToBe = filteredRows
    }
    if (completeValue != null) {
        const filteredRows = rowsToBe.filter((row:any) => {
            return row.isComplete == completeValue
        })
        rowsToBe = filteredRows
    }
    console.log(rowsToBe)

    setRows(rowsToBe)
  };

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <DataGrid
        components={{ Toolbar: SearchToolbar}}
        rows={rows}
        columns={columns}
        componentsProps={{
          toolbar: {
            onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(event.target.value)
                requestSearch()
            },
            onUserChange(selected: string ) {
                setUserValue(selected)
                requestSearch()
            },
            onCompleteChange(selected: boolean) {
                setCompleteValue(selected)
                requestSearch()
            }
          },
        }}
      />
    </div>
  );
}