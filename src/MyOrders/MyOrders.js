import { styled } from '@mui/material/styles';
import { Button, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../pages/Context/AuthProvider';
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
const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: myOrders = [], isLoading ,refetch} = useQuery({
        queryKey: ['myOrders'],
        queryFn: () => fetch(`http://localhost:5000/myOrder?email=${user?.email}`)
            .then(res => res.json())
    });

    const handelDelete=(id)=>{
        fetch(`http://localhost:5000/myOrder/${id}`,{
            method:'DELETE',
            headers:{
                authorization:`bearar ${localStorage.getItem('accessToken')}`
            }
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
    console.log(myOrders);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Product Name</StyledTableCell>
                            <StyledTableCell align="center">Picture</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="rigcenterht">Action</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {myOrders.map(myOrder =>
                            <StyledTableRow>


                                <StyledTableCell align="center">{myOrder.product_name}</StyledTableCell>
                                <StyledTableCell align="center"><img src={myOrder.picture} style={{ width: '50px' }} alt="" /></StyledTableCell>
                                <StyledTableCell align="center">{myOrder.original_price}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <Button onClick={() => handelDelete(myOrder._id)} sx={{ backgroundColor: 'red', color: 'white' }} align="center" variant='contained'>Delete</Button>
                                </StyledTableCell>

                            </StyledTableRow>
                        )

                        }


                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </div>
    );
};

export default MyOrders;