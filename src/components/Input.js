import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Toolbar, AppBar, Container, Box, InputBase, Typography } from "@mui/material";
//import { Link } from "./../util/router.js";
import { getSlug } from "./../util/text.js";
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';

//import { isSeller } from "../util/identity.js";
import ViewListIcon from "@mui/icons-material/ViewList";

const { REACT_APP_LOGO, REACT_APP_DESCRIPTION } = process.env;

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 28,
    marginRight: theme.spacing(2),
  },
  drawerList: {
    width: 250,
  },
  spacer: {
    flexGrow: 1,
  },
  navbarBackground: {
    background: "#ffffff",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: "#e2e2e2",
    color: "black",
    fontWeight: "600",
    border: "1px solid #e2e2e2",

    // backgroundColor: fade(theme.palette.common.black, 0.05),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.black, 0.1),
    // },
    marginRight: 1,
    marginLeft: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "auto",
      flexGrow: "1",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f44336",
  },

  inputInput: {
    fontSize: "1em",
    color: "black",
    fontWeight: "700",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // height: '28px',
    [theme.breakpoints.up("sm")]: {
      width: "35ch",
      fontSize: "1em",
    },
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
  },
  inputRoot: {
    display: "flex",
  },
}));

function Input(props) {
  const classes = useStyles();
  // const router = useRouter();
  //const id = router.query.itemid;

  const { setInput } = props;
  const searchEnabled = false; // Algolia / Elastic search. Pay to play. Disable for launch.

  const darkMode = false;
  //  const darkMode = useDarkMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuState, setMenuState] = useState(null);

  const [keywords, setKeywords] = useState(null);

  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && darkMode.value ? props.logoInverted : props.logo;

  const handleOpenMenu = (event, id) => {
    // Store clicked element (to anchor the menu to)
    // and the menu id so we can tell which menu is open.
    setMenuState({ anchor: event.currentTarget, id });
  };

  let history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setInput(keywords);
  };

  const handleCloseMenu = () => {
    setMenuState(null);
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar>
            {/*         <Link to="/" style={{ textDecoration: "none" }}> */}
            {/* <img src={logo} alt="Logo" className={classes.logo} /> */}

            {/* Desktop view */}

            <Box
              style={{
                backgroundColor: "#f44336",
                height: "2.5em",
                width: "2.9em",
              }}
            >
              <Typography
                color="primary"
                style={{
                  fontSize: "2.3em",
                  fontWeight: "900",
                  fontFamily: "'Fredoka One', 'cursive'",
                  fontWeight: "700",
                  color: "#ffffff",
                  textAlign: "left",

                  // textAlign: 'center',
                  // position :'absolute',
                  // top: '50%',
                  // left: '50%',
                  // transform: 'translate(-50%, -50%)',
                }}
              >
                {REACT_APP_LOGO}
              </Typography>
            </Box>

            {/*           </Link>*/}
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder={REACT_APP_DESCRIPTION}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
            </form>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile view */}

      {/*  </Section> */}
    </>
  );
}

export default Input;
