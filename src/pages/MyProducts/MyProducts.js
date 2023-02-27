import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
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





export default function Myproducts() {
    const {user}=React.useContext(AuthContext);
    const {data:myProducts=[],isLoading,refetch}=useQuery({
        queryKey:['myProducts'],
        queryFn:()=>fetch(` https://goshop-server-teal.vercel.app/myProduct?email=${user?.email}`)
        .then(res=>res.json())

    });
    const handelDelete=(id)=>{
        fetch(` https://goshop-server-teal.vercel.app/myProduct/${id}`,{
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
        return  <Box sx={{ display: 'flex' ,alignItems:'center',justifyContent:'center',margin:'150px 0px'}}>
        <CircularProgress />
      </Box>
    }
    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Product Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Picture</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="rigcenterht">Action</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
              
             {myProducts.map(Myproduct=>
              <StyledTableRow>
              
             
              <StyledTableCell align="center">{Myproduct.product_name}</StyledTableCell>
              <StyledTableCell align="center">{Myproduct.email}</StyledTableCell>
              <StyledTableCell align="center"><img src={Myproduct.picture} style={{width:'50px'}} alt="" /></StyledTableCell>
              <StyledTableCell align="center">{Myproduct.original_price}</StyledTableCell>
              <StyledTableCell align="left">
                 <Button onClick={()=>handelDelete(Myproduct._id)}  sx={{ backgroundColor:'red',color:'white' }} align="center" variant='contained'>Delete</Button>
              </StyledTableCell>
              
            </StyledTableRow>
            )
               
             }
              
           
        </TableBody>
      </Table>
      <ToastContainer />
    </TableContainer>
    
  );
}