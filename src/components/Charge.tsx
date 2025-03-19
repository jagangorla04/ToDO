import React, { Component } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
interface IProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}
class Charge extends Component<IProps> {
  render() {
    return (
      <Box>
        <Dialog
          open={this.props.isModalOpen}
          onClose={this.props.handleCloseModal}
                 >
          <DialogTitle>Why We Charge?</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              We charge a small fee to cover transaction costs and ensure a
              seamless experience. This helps us maintain the platform and
              provide the best service possible.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button data-testid="closeModalButton"  onClick={this.props.handleCloseModal} sx={styles.btn}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default Charge;

const styles = {
  btn: {
    color: "#FF9A40",
    borderColor: "#FF9A40",
    "&:hover": { backgroundColor: "#FF9A40", color: "white" },
    borderRadius: 10,
  },
};
