import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const AllProduct = ({ allProduct, handelWatchLater }) => {
     const { picture, product_name, original_price, _id } = allProduct;
     console.log(allProduct);
    return (
        <Card  sx={{ width: 250 }} className="flashsale">
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
          <Link style={{ listStyle: 'none', textDecoration: 'none' }} to={`/buyProduct/${_id}`}> <Button variant='contained'>Buy Now</Button></Link>
          <Tooltip title="Watch Later">
            <IconButton>
              <div onClick={() => handelWatchLater(allProduct)}>
  
                <FavoriteBorderIcon></FavoriteBorderIcon>
              </div>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
};

export default AllProduct;