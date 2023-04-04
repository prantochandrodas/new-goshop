import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// import './HomeFlashsale.css';
export default function HomeFlashsales({ flashSale, handelWatchLater,handleOpen,setBookProduct }) {
  console.log(flashSale);
  const { picture, product_name, original_price, _id } = flashSale;

  return (

    <Card data-aos="zoom-in" sx={{ width: 250 }} className="flashsale">
      <CardMedia
        sx={{ height: 200 }}
        image={picture}
        title="picture"
      />

      <CardContent>
        <Typography gutterBottom variant="p" component="div">
          {product_name}
        </Typography>
        <Typography variant="h5" sx={{ color: "orange" }}>
          ${original_price}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
         <div onClick={()=>setBookProduct(flashSale)}><Button variant='contained' onClick={handleOpen}>Buy Now</Button></div>
        <Tooltip title="Watch Later">
          <IconButton>
            <div onClick={() => handelWatchLater(flashSale)}>

              <FavoriteBorderIcon></FavoriteBorderIcon>
            </div>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}