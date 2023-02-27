import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {

  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Product({product,handelWatchLater}) {
  const {user}=React.useContext(AuthContext)
    const {picture,posted_date,product_name,original_price,_id}=product;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='product'>
      <Card className="flashsale product-img">
      <CardMedia
        sx={{ height: 200 }}
        image={picture}
        title="picture"
      />
      <CardContent>
        <Typography gutterBottom variant="p" component="div" sx={{fontWeight:"bold"}}>
          {product_name}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
         Posted Date :- {posted_date}
        </Typography>
        <Typography variant="h5" sx={{color:"orange"}}>
            ${original_price}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link style={{ listStyle: 'none', textDecoration: 'none' }} to={`/buyProduct/${_id}`}> <Button variant='contained'>Buy Now</Button></Link>
        <Tooltip title="Watch Later">
          <IconButton>
             <div onClick={()=>handelWatchLater(product)}><FavoriteBorderIcon></FavoriteBorderIcon></div>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
    </div>
  );
}