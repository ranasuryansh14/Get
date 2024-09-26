import React from 'react';
import { Container, Box, Typography } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: (props) => (props.expand ? 'rotate(180deg)' : 'rotate(0deg)'),
}));

const MyStore = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container sx={{ padding: 4 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg" // Make sure this path is correct
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. 
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Heat 1/2 cup of the broth
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              medium-high heat. Add chicken, 
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Add rice and stir very gently to distribute. 
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
};

export default MyStore;

// import React from 'react';
// import { Container, Box, Typography } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const MyStore = ({ items }) => {
//   return (
//     <Container sx={{ padding: 4 }}>
//       {items.map((item) => (
//         <Card key={item.id} sx={{ maxWidth: 345, marginBottom: 4 }}>
//           <CardHeader
//             avatar={
//               <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                 {item.avatarInitial} {/* Example prop for Avatar */}
//               </Avatar>
//             }
//             title={item.title} // Dynamic title
//             subheader={item.date} // Dynamic date
//           />
//           <CardMedia
//             component="img"
//             height="194"
//             image={item.image} // Dynamic image
//             alt={item.title}
//           />
//           <CardContent>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               {item.description} {/* Dynamic description */}
//             </Typography>
//           </CardContent>
//           <CardActions disableSpacing>
//             <IconButton aria-label="add to favorites">
//               <FavoriteIcon />
//             </IconButton>
//             <IconButton aria-label="share">
//               <ShareIcon />
//             </IconButton>
//             <ExpandMore
//               expand={item.expanded}
//               onClick={item.handleExpandClick} // Dynamic expand handler
//               aria-expanded={item.expanded}
//               aria-label="show more"
//             >
//               <ExpandMoreIcon />
//             </ExpandMore>
//           </CardActions>
//           <Collapse in={item.expanded} timeout="auto" unmountOnExit>
//             <CardContent>
//               <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
//               <Typography>
//                 {item.method} {/* Dynamic method */}
//               </Typography>
//             </CardContent>
//           </Collapse>
//         </Card>
//       ))}
//     </Container>
//   );
// };

// export default MyStore;