import React, { Component } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { clearCart, decrementQuantity, incrementQuantity, removeFromCart } from "./redux/ecommerceSlice";
import { withRouter } from "./Hoc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface IProps {
  selector: any;
  dispatch: any;
}

interface IState {
  openDialog: boolean;
  selectedProduct: Product | null;
}

class Cart extends Component<IProps, IState> {
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
      this.props.dispatch(removeFromCart(this.state.selectedProduct.id));
      toast.success("Item removed from cart!");
    }
    this.handleCloseDialog();
  };

  handlePayment = (totalPrice: number) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_HScMmspwBjkuhv",
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      name: "Atum",
      description: "Purchase Keys",
      image: "https://yourwebsite.com/logo.png",
      handler: (response: any) => {
        toast.success(`Payment Successful! ID: ${response.razorpay_payment_id}`);

        this.props.dispatch(clearCart());
      },
      prefill: {
        name: "Jagan Mohan",
        email: "jagangorla04@gmail.com",
        contact: "8328390294",
      },
      theme: {
        color: "#FF9A40",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  render() {
    const { cart } = this.props.selector;
    const totalPrice = cart.reduce((total: number, item: Product) => total + item.price * item.quantity, 0);

    return (
      <Box sx={{ padding: 4 }}>
           <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Product</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Quantity</b></TableCell>
                <TableCell><b>Subtotal</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.length > 0 ? (
                cart.map((product: Product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <img src={product.image} alt={product.title} width={50} height={50} />
                        <Typography>{product.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <IconButton onClick={() => this.props.dispatch(decrementQuantity(product.id))}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{product.quantity}</Typography>
                        <IconButton onClick={() => this.props.dispatch(incrementQuantity(product.id))}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>${(product.price * product.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => this.handleOpenDialog(product)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography>No items in the cart</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {cart.length > 0 && (
          <Box sx={{ marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
            <Button variant="contained" onClick={() => this.handlePayment(totalPrice)} color="primary">
              Proceed to Checkout
            </Button>
          </Box>
        )}

        <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to remove this item from your cart?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">Cancel</Button>
            <Button onClick={this.handleConfirmDelete} color="error" autoFocus>Delete</Button>
          </DialogActions>
        </Dialog>
        
      </Box>
    );
  }
}

export default withRouter(Cart);
