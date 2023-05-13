import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    poster: {
      fontSize: "4rem",
      color: "red",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    body: {
      fontSize: 16,
      marginBottom: 10,
    },
    note: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "red",
    },
  },
  overlayNumber: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  palette: {
    primary: {
      main: "#1976d2", // Sea blue
    },
    common: {
      white: "#fff", // Common white color
      black: "#000", // Common black color
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
    background: {
      default: "#fff", // Default background color
    },
    text: {
      primary: "#000", // Default text color
    },
  },
  shadows: [
    "none",
    "0px 15px 60px rgba(0, 0, 0, 0.25)",
    "0px 35px 60px rgba(0, 0, 0, 0.25)",
    "20px 55px 60px rgba(0, 0, 0, 0.25)",
    "10px 15px 60px rgba(0, 0, 0, 0.25)",
    ...Array(20).fill("none"),
  ],
  spacing: 2,
  transitions: {
    create: () => "none",
    duration: {
      shortest: 150, // Shortest transition duration
      shorter: 200, // Shorter transition duration
      short: 250, // Short transition duration
      standard: 300, // Standard transition duration
      complex: 375, // Complex transition duration
      enteringScreen: 225, // Duration for elements entering the screen
      leavingScreen: 195, // Duration for elements leaving the screen
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "action" },
          style: {
            backgroundColor: "#1976d2", // Sea blue
            color: "#fff", // White text
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 16px",
            textTransform: "uppercase",
            transition: "background-color 0.3s", // Transition on background-color ch>
            "&:hover": {
              backgroundColor: "#003049", // Prussian blue on hover
            },
            "&:active": {
              backgroundColor: "#001e2d", // Royal blue on click
            },
          },
        },
        {
          props: { variant: "irreversible" },
          style: {
            backgroundColor: "#e53935", // Red background color
            color: "#fff", // White text
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 16px",
            textTransform: "uppercase",
            transition: "background-color 0.3s", // Transition on background-color change
            "&:hover": {
              backgroundColor: "#b71c1c", // Darker red on hover
            },
            "&:active": {
              backgroundColor: "#7f0000", // Even darker red on click
            },
          },
        },

        {
          props: { variant: "input" },
          style: {
            backgroundColor: "#71e40", // Sea blue
            color: "#fff", // White text
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 16px",
            textTransform: "uppercase",
            transition: "background-color 0.3s", // Transition on background-color ch>
            "&:hover": {
              backgroundColor: "#003049", // Prussian blue on hover
            },
            "&:active": {
              backgroundColor: "#001e2d", // Royal blue on click
            },
          },
        },

        {
          props: { variant: "default" },
          style: {
            backgroundColor: "#1976d2", // Sea blue
            color: "#fff", // White text
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 16px",
            textTransform: "uppercase",
            transition: "background-color 0.3s", // Transition on background-color change
            "&:hover": {
              backgroundColor: "#003049", // Prussian blue on hover
            },
            "&:active": {
              backgroundColor: "#001e2d", // Royal blue on click
            },
          },
        },

        {
          props: { variant: "url" },
          style: {
            backgroundColor: "white",
            border: "2px solid #1976d2", // Blue perimeter
            color: "#1976d2", // Sea blue
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 16px",
            textTransform: "uppercase",
            transition: "background-color 0.3s",
            cursor: "pointer",
          },
          "&:hover": {
            backgroundColor: "#87ceeb", // Sky blue
            borderColor: "#87ceeb", // Sky blue
            color: "#87ceeb", // Sky blue
          },
          "&:active": {
            backgroundColor: "#1976d2", // Sea blue
            color: "#1976d2", // Sea blue
          },
          "&:disabled": {
            backgroundColor: "white",
            border: "2px solid lightgray", // Light gray perimeter for disabled state
            borderColor: "lightgray", // Updated to lightgray
            color: "gray", // Gray text for disabled state
            cursor: "not-allowed",
          },
        },
        {
          props: { variant: "url_old" },
          style: {
            backgroundColor: "#f4b400", // Yellow
            color: "#1976d2", // Sea blue
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 16px",
            textTransform: "uppercase",
            transition: "background-color 0.3s", // Transition on background-color change
            "&:hover": {
              backgroundColor: "#ffc72c", // Light yellow on hover
              color: "#003049", // Prussian blue on hover
            },
            "&:active": {
              backgroundColor: "#e6a100", // Dark yellow on click
              color: "#001e2d", // Royal blue on click
            },
          },
        },
      ],
    },
  },
});

// Parse the primary color to ensure it's in the proper format
//const primaryColor = parse(theme.palette.primary.main);
//theme.palette.primary.main = primaryColor.hex;

export default theme;
