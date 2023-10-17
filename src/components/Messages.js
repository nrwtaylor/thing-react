import { useParams } from "react-router";
import Message from "../components/Message.js";
import { makeStyles } from '@mui/styles';

import useMessages from "../useMessages";

//import{ Collapse} from '@mui/core';
import { styled } from "@mui/material/styles";

import { devFlag, debugFlag } from "../util/dev.js";

//import CardContent from "@mui/material/CardContent";
//import CardActions from "@mui/material/CardActions";
//import Collapse from "@mui/material/Collapse";
//import Avatar from "@mui/material/Avatar";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";

//import FavoriteIcon from "@mui/icons-material/Favorite";
//import ShareIcon from "@mui/icons-material/Share";

//import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import MoreVertIcon from "@mui/icons-material/MoreVert";

//import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const useStyles = makeStyles((theme) => ({
  gridItem: {
    // Add border that contrasts lightly with background color.
    // We use boxShadow  so that it's hidden around outer edge
    // due to container <Card> having overflow: hidden
    //    boxShadow: `1px 1px 0 0 ${emphasize(theme.palette.background.paper, 0.08)}`,
    textAlign: "center",
  },

  stripImageContainer: {
    margin: "0 auto",

    "& img": {
      // width: "100%",
      width: "80px",
      maxHeight: "125px",
      maxWidth: "100px",
    },
  },

  media: {
    // minHeight: "200px",
    height: "auto",
    // width:'100%',
    alignItems: "center",
    // [theme.breakpoints.down("sm")]: {
    //   height: "auto",
    // },
    // height: "auto",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  cartImageContainer: {
    // margin: "0 auto",
    // height:'200px',
    width: "100%",
    "& img": {
      width: "100%",
      maxHeight: "100px",
      objectFit: "contain",
      // width: "100%",
      // height: "auto",
      // height:"75px",
    },
  },

  cardImageContainer: {
    margin: "0 auto",
    // maxWidth: "200px",

    "& img": {
      maxHeight: "180px",
      width: "100%",
      // [theme.breakpoints.down("sm")]: {
      //   maxHeight: "150px",
      // },
      // width: "auto",
      // height:'200px'
    },
  },
}));

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} size="large" />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Messages(props) {
  //  const text = props.match.params.text;

  const classes = useStyles();

  const { text } = useParams();

  const { messages, addMessage } = useMessages();

  return (
    <>
      <div>
{debugFlag && (<>        MESSAGES
        <br /></>)}
        {messages &&
          messages.map((message) => {
            return (
              <>
                <Message message={{ subject: message }} />
                <br />
              </>
            );
          })}
        <br />
      </div>
    </>
  );
}
