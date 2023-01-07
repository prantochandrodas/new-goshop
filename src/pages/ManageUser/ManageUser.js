import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { AuthContext } from '../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function ManageUser() {
    const {data:ManageUsers=[],isLoading,refetch}=useQuery({
        queryKey:['ManageUsers'],
        queryFn:()=>fetch(`http://localhost:5000/ManageUsers`)
        .then(res=>res.json())

    });
    const handelDelete=(id)=>{
        fetch(`http://localhost:5000/user/${id}`,{
            method:'DELETE',
           
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0){
               
                toast.error('Product Deleted', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                refetch();
            }
           
        })
    }
    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
    <TableContainer component={Paper} style={{marginTop:'100px'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"> Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="rigcenterht">Action</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
              
             {ManageUsers.map(ManageUser=>
              <StyledTableRow>
              
             
              <StyledTableCell align="center">{ManageUser.name}</StyledTableCell>
              <StyledTableCell align="center">{ManageUser.email}</StyledTableCell>
              <StyledTableCell align="left">
                 <Button onClick={()=>handelDelete(ManageUser._id)}  sx={{ backgroundColor:'red',color:'white' }} align="center" variant='contained'>Delete</Button>
              </StyledTableCell>
              
            </StyledTableRow>
            )
               
             }
              
           
        </TableBody>
      </Table>
    </TableContainer>
  );
}