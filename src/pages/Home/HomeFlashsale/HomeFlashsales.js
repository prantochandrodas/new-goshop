import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
// import './HomeFlashsale.css';
export default function HomeFlashsales({flashSale}) {
    const {picture,product_name,original_price,_id}=flashSale;
    console.log(picture);
    
  return (
    <Card sx={{ width:250 }} className="flashsale">
      <CardMedia
        sx={{ height: 200 }}
        image={picture}
        title="picture"
      />
      <CardContent>
        <Typography gutterBottom variant="p" component="div">
          {product_name}
        </Typography>
        <Typography variant="h5" sx={{color:"orange"}}>
            ${original_price}
        </Typography>
      </CardContent>
      <CardActions>
       <Link style={{listStyle:'none',textDecoration:'none'}} to={`/buyProduct/${_id}`}> <Button variant='contained'>Buy Now</Button></Link>
      </CardActions>
    </Card>
  );
}