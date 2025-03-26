import React, { Component } from "react";
import { withRouter } from "./Hoc";
import { fetchProductData } from "./redux/ecommerceSlice";
import { TextField, InputAdornment, SxProps } from "@mui/material";
import {
  AppBar,
  Typography,

  Box,
  IconButton,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Location } from "react-router-dom"; 

interface Iprops {
  dispatch: any;
  selector: any;
  navigate: any;
  location: Location; 
}

interface Istate {}

class Header extends Component<Iprops, Istate> {
  componentDidMount(): void {
    this.props.dispatch(fetchProductData());
  }

  render() {
    const { navigate, location } = this.props;
    
    return (
      <Box sx={styles.main}>
        <AppBar position="static" elevation={0} sx={styles.appBar}>
          <Toolbar sx={styles.toolbar}>
            <Typography variant="h6" sx={styles.logText}>
              Exclusive
            </Typography>

            
            <Box sx={styles.btnContainer}>
              {["/", "/contact", "/about", "/signup"].map((path, index) => {
                const labels = ["Home", "Contact", "About", "Sign Up"];
                return (
                  <Box
                    key={path}
                    onClick={() => navigate(path)}
                    sx={{
                      ...styles.btn,
                      borderBottom:
                        location.pathname === path ? "2px solid black" : "none",
                    }}
                  >
                    {labels[index]}
                  </Box>
                );
              })}
            </Box>

            <Box sx={styles.inputContainer}>
              <TextField
                variant="standard"
                placeholder="What are you looking for?"
                InputProps={{
                  disableUnderline: true,
                  sx: styles.input,
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton sx={styles.IconBtn} onClick={() => navigate("/wishlist")}>
                <FavoriteBorderIcon sx={styles.icon} />
                {this.props.selector.favorites.length > 0 && (
                  <Typography sx={styles.fav}>
                    {this.props.selector.favorites.length}
                  </Typography>
                )}
              </IconButton>
              <IconButton sx={styles.IconBtn} onClick={() => navigate("/cart")}>
                <ShoppingCartIcon sx={styles.icon} />
                {this.props.selector.cart.length > 0 && (
                  <Typography sx={styles.cartLength}>
                    {this.props.selector.cart.length}
                  </Typography>
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default withRouter(Header);

const styles = {
  btn: {
    color: "black",
    textTransform: "none",
    fontSize: { xs: "12px", sm: "16px" },
    fontFamily: "Poppins",
    fontWeight: 400,
    cursor:"pointer",
    borderBottom: "2px solid transparent",
    "&:hover": {
      borderBottom: "2px solid black", 
    },
  },
  cartLength: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    fontSize: "12px",
    padding: "3px 6px",
  },
  fav: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    fontSize: "12px",
    padding: "3px 6px",
  },
  input: {
    fontSize: "12px",
    padding: "5px 10px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    minWidth: "180px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  btnContainer: { display: "flex", gap: "29px" },
  icon: { color: "black" },
  logText: { fontWeight: "bold", color: "black" },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  appBar: {
    backgroundColor: "white",
    borderBottom: "1px solid lightgray",
    paddingX: 1.1,
  },
  main: { p: "20px" },IconBtn:{ cursor:"pointer",}
} satisfies Record<string, SxProps>;
