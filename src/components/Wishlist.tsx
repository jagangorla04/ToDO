import React, { Component } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { withRouter } from "./Hoc";
import { Product } from "./EcommerceHome";
import { addToCart, decrementQuantity, incrementQuantity, removeFromWishlist } from "./redux/ecommerceSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface IProps {
  selector: {
    favorites: Product[];
    cart: Product[]
  };
  dispatch: any;
  
}

interface IState {
  openDialog: boolean;
  selectedProduct: Product | null;
}

class Wishlist extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      openDialog: false,
      selectedProduct: null,
    };
  }

  handleOpenDialog = (product: Product) => {
    this.setState({ openDialog: true, selectedProduct: product });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false, selectedProduct: null });
  };

  handleConfirmDelete = () => {
    if (this.state.selectedProduct) {
      this.props.dispatch(removeFromWishlist(this.state.selectedProduct.id));
    }
    this.handleCloseDialog();
  };

  render() {
    return (
      <Box sx={{ paddingX: { xs: 2, sm: 5, md: 10 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Wishlist ({this.props.selector.favorites.length})
          </Typography>
          <Button
            variant="outlined"
            onClick={() =>
              this.props.selector.favorites.map((item: Product) =>
                this.props.dispatch(addToCart(item))
              )
            }
          >
            Move All To Bag
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
            gap: "16px",
          }}
        >
          {this.props.selector.favorites.map((product: Product) => (
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
              <IconButton
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "#999",
                }}
                onClick={() => this.handleOpenDialog(product)}
              >
                <DeleteIcon />
              </IconButton>

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
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {product.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: 1,
                  }}
                >
                  <Typography sx={{ color: "#E53935", fontWeight: "bold" }}>
                    ${product.price}
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
                   <ShoppingCartIcon/> Add to Cart
                  </Button>
                )}
              </Box>
            </Card>
          ))}
        </Box>

        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to remove this item from your wishlist?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default withRouter(Wishlist);
