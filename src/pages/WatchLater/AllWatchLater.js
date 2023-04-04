import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import './AllWatchLater.css';
import { AuthContext } from '../Context/AuthProvider';

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

export default function AllWatchLater({allWatchlater}) {
  const {user}=React.useContext(AuthContext)
    const {picture,posted_date,product_name,original_price}=allWatchlater;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width:350 }} className="allWatchLater">
      <CardMedia
        sx={{ height: 300 }}
        image={picture}
        title="picture"
        className='allWatchLater_img'
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
      <CardActions>
        <Button variant='contained'>Buy Now</Button>     
      </CardActions>
    </Card>
  );
}