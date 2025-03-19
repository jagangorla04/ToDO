import React, { Component } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  SxProps,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import key from "../components/assets/image.jpeg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Charge from "./Charge";

interface IProps {}

interface IState {
  keys: number;
  pricePerKey: number;
  price: number;
  isModalOpen: boolean;
}

const basePricePerKey = 15;

const quantityDiscounts = [
  { qty: 1, discount: 0 },
  { qty: 2, discount: 17 },
  { qty: 3, discount: 25 },
];

const items = quantityDiscounts.map(({ qty, discount }) => {
  const price = parseFloat(
    (qty * basePricePerKey * (1 - discount / 100)).toFixed(2)
  );
  return {
    qty,
    price,
    save: discount > 0 ? `${discount}%` : null,
  };
});

class KeysPurchase extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      keys: 0,
      pricePerKey: basePricePerKey,
      price: 0,
      isModalOpen: false,
    };
  }

  handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    this.setState({ keys: value, price: value * this.state.pricePerKey });
  };

  purchasePrice = (item: {
    qty: number;
    price: number;
    save: string | null;
  }) => {
    this.setState((prevState) => ({
      ...prevState,
      keys: item.qty,
      price: Number(item.price),
    }));
  };

  handleOpenModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handlePayment = () => {
    //if (this.state.price > 0) {
      const options = {
        key: "rzp_test_HScMmspwBjkuhv",
        amount: this.state.price * 100, 
        currency: "INR",
        name: "Atum",
        description: "Purchase Keys",
        image: "https://yourwebsite.com/logo.png",
        handler: (response: {
          razorpay_payment_id: string;
          razorpay_order_id?: string;
          razorpay_signature?: string;
        }) => {
          //console.log("Payment Success", response);
          alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
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

      const rzp1 = new Razorpay(options);
        rzp1.open();

      this.setState((prevState) => ({
        ...prevState,
        keys:0,
        price:0,
      }))
    //} else {
    //  toast.error("Please select a key before proceeding with the payment.");
    //}
  };

  render() {
    return (
      <Box sx={styles.container}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Card sx={styles.card}>
          <Box sx={styles.keyContainer}>
            <KeyboardArrowLeftIcon />
            <Typography data-testid="Key" variant="h6" align="center">
              Keys Purchase
            </Typography>
            <MoreVertIcon />
          </Box>
          <CardContent>
            <Box sx={styles.imgContainer}>
              <Box sx={styles.image} component="img" src={key} />
            </Box>

            <Box sx={styles.mainItem}>
              {items.map((item,index) => (
                <Box
                  onClick={() => this.purchasePrice(item)}
                  key={item.qty}
                  data-testid={`purchasePrice+${index}`}
                  //data-testid="purchasePrice"
                  sx={styles.singleItem}
                >
                  <Box sx={styles.saveItem}>
                    {item.save && (
                      <Typography variant="caption" sx={styles.textSave}>
                        Save {item.save}
                      </Typography>
                    )}

                    <Box sx={styles.qtyText}>
                      <Typography variant="subtitle1" sx={styles.qty}>
                        {item.qty} Key{item.qty > 1 ? "s" : ""}
                      </Typography>
                    </Box>

                    <Box sx={styles.keyContainerText}>
                      <Box sx={styles.key}>🔑</Box>
                    </Box>
                  </Box>

                  <Box sx={styles.price}>${item.price}</Box>
                </Box>
              ))}
            </Box>

            <Typography variant="body2" mt={2}>
              Note: 1 Key = ${basePricePerKey}
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Keys to add"
              variant="outlined"
              margin="normal"
              value={this.state.keys}
              onChange={this.handleKeyChange}
              sx={styles.input}
            />
            <TextField
              fullWidth
              type="text"
              label="Price to pay"
              variant="outlined"
              margin="normal"
              value={`$ ${this.state.price.toFixed(2)}`}
              sx={styles.input}
            />

            <Box display="flex" gap={2} justifyContent="space-between" mt={2}>
              <Button variant="outlined" data-testid="openModal" onClick={this.handleOpenModal} fullWidth sx={styles.btn}>
                Why we charge?
              </Button>
              <Button
                data-testid="purchase"
                variant="outlined"
                onClick={this.handlePayment}
                fullWidth
                sx={styles.btn}
              >
                Purchase
              </Button>
            </Box>
          </CardContent>
          <Charge
            handleOpenModal={this.handleOpenModal}
            handleCloseModal={this.handleCloseModal}
            isModalOpen={this.state.isModalOpen}

            data-testid="modalComponent"
          />
          
        </Card>
      </Box>
    );
  }
}

export default KeysPurchase;

const styles = {
  container: {
    backgroundColor: "#000",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 500,
    backgroundColor: "#1E1E1E",
    borderRadius: 3,
    padding: 1.5,
    color: "white",
  },
  keyContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 1,
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 2,
    mb: 2,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  mainItem: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
    rowGap:{xs:"35px",md:"16px"} ,
    columnGap: "12px",
  },
  singleItem: {
    display: "flex",
    mt:1.5,
    flexDirection: "column",
    alignItems: "center",
    minWidth: "140px",
    maxWidth: "150px",
    flex: "1 1 30%", 
    textAlign: "center",
    "@media (max-width: 768px)": {
      flex: "1 1 45%", 
    },
    "@media (max-width: 480px)": {
      flex: "1 1 100%",
    },
  },
  saveItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 2,
    textAlign: "center",
    width: 145,
    transition: "transform 0.2s",
    "&:hover": { transform: "scale(1.05)" },
    position: "relative",
  },
  textSave: {
    background: "#007AFF",
    color: "white",
    padding: "2px 8px",
    borderRadius: "9px 9px 0px 0px",
    fontSize: "12px",
    position: "absolute",
    top: "-23px",
  },
  qtyText: {
    backgroundColor: "#FF8C00",
    width: "100%",
    borderRadius: "10px 10px 0px 0px",
  },
  qty: { color: "white", fontWeight: "bold" },
  keyContainerText: {
    background: "#FFD700",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0px 0px 10px 10px",
  },
  key: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    borderRadius: "50%",
    width: 50,
    height: 50,
    margin: "10px 0",
  },
  price: {
    backgroundColor: "green",
    color: "white",
    width: "100%",
    padding: "6px 0",
    borderRadius: 1,
    fontWeight: "bold",
    textAlign: "center",
    mt: 0.3,
  },
  input: {
    input: { color: "white" },
    label: { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gray" },
    },
  },
  btn: {
    color: "#FF9A40",
    borderColor: "#FF9A40",
    "&:hover": { backgroundColor: "#FF9A40", color: "white" },
    borderRadius: 10,
  },
} satisfies Record<string, SxProps>;
