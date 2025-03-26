import React, { Component } from "react";
import { withRouter } from "./Hoc";
import {
  addToCart,
  addToFavorites,
  decrementQuantity,
  fetchProductData,
  incrementQuantity,
  removeFromWishlist,
} from "./redux/ecommerceSlice";
import {
  
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  IconButton,
 
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import MyCarousel from "./MyCarousel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Footer from "./Footer";
interface Iprops {
  dispatch: any;
  selector: any;
  navigate: any;
}
interface Istate {}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
}

class EcommerceHome extends Component<Iprops, Istate> {
  componentDidMount(): void {
    this.props.dispatch(fetchProductData());
  }
  render() {
    return (
      <Box>
      <Box sx={{ p: "20px" }}>
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            
          }}
        >
          <MyCarousel />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: { xs: 2, sm: 4 },
            mt: 3,
          }}
        >
          <Typography variant="h5">All Products</Typography>
          <Button sx={{ backgroundColor: "#DB4444", color: "white" }}>
            View All
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            },
            gap: "20px",
            padding: "24px",
          }}
        >
          {this.props.selector.data.map((product: Product) => {
            const isFavorite = this.props.selector.favorites.some(
              (item: Product) => item.id === product.id
            );
            return (
              <Card
                key={product.id}
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      if (isFavorite) {
                        this.props.dispatch(removeFromWishlist(product.id));
                      } else {
                        this.props.dispatch(addToFavorites(product));
                      }
                    }}
                    sx={{
                      backgroundColor: "white",
                      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                    }}
                  >
                    {isFavorite ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "black" }} />
                    )}
                  </IconButton>
                </Box>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    padding: "16px",
                    backgroundColor: "#f5f5f5",
                  }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    {product.title}
                  </Typography>

                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Typography sx={{ color: "#E53935", fontWeight: "bold" }}>
                      ${product.price}
                    </Typography>
                    
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "4px",
                    }}
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <StarIcon
                          key={index}
                          sx={{
                            color:
                              index < Math.round(product.rating.rate)
                                ? "#FFD700"
                                : "lightgray",
                            fontSize: "18px",
                          }}
                        />
                      ))}
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginLeft: "4px",
                      }}
                    >
                      ({product.rating.count})
                    </Typography>
                  </Box>
                </CardContent>

               
                  <Box sx={{ p: 2 }}>
                    {this.props.selector.cart.some(
                      (item: Product) => item.id === product.id
                    ) ? (
                      <Button
                        sx={{ backgroundColor: "#000000", color: "white" }}
                        fullWidth
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <IconButton
                            sx={{
                              backgroundColor: "#000000",
                              color: "white",
                              "&:hover": { backgroundColor: "#333" },
                            }}
                            onClick={() =>
                              this.props.dispatch(decrementQuantity(product.id))
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>
                            {
                              this.props.selector.cart.find(
                                (item: Product) => item.id === product.id
                              )?.quantity
                            }
                          </Typography>
                          <IconButton
                            sx={{
                              backgroundColor: "#000000",
                              color: "white",
                              "&:hover": { backgroundColor: "#333" },
                            }}
                            onClick={() =>
                              this.props.dispatch(incrementQuantity(product.id))
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Button>
                    ) : (
                      <Button
                        sx={{ backgroundColor: "#000000", color: "white" }}
                        fullWidth
                        onClick={() => {
                          console.log("Product being added:", product);
                          this.props.dispatch(addToCart(product));
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </Box>
               
              </Card>
            );
          })}
        </Box>
       
      </Box>
      <Footer/>
      </Box>
    );
  }
}

export default withRouter(EcommerceHome);
