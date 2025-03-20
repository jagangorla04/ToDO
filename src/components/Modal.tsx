import React, { Component } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, SxProps, TextField, Typography } from "@mui/material";



interface IProps {
  open: boolean;
  handleClose: () => void;
  addTask: (task: {
    title: string;
    description: string;
    dueDate: string;
    file: File | null;
  }) => void;
}

interface IState {
  title: string;
  description: string;
  dueDate: string;
  file: File | null;
}

export default class Modals extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: "",
      description: "",
      dueDate: "",
      file: null,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as any);
  };

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      this.setState({ file: e.target.files[0] });
    }
  };

  handleSubmit = () => {
    const { title, description, dueDate, file } = this.state;
   
    if (!title || !description || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    this.props.addTask({ title, description, dueDate, file });

    this.setState({ title: "", description: "", dueDate: "", file: null });
    this.props.handleClose();
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.handleClose}>
        <Box sx={styles.modal}>
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Add Task
          </Typography>

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            variant="outlined"
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            variant="outlined"
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            name="dueDate"
            value={this.state.dueDate}
            onChange={this.handleChange}
            variant="outlined"
            sx={{ my: 1 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            type="file"
            onChange={this.handleFileChange}
            variant="outlined"
            sx={{ my: 1 }}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#2F80ED", color: "white" }}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    );
  }
}

const styles={
  modal:{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

}satisfies Record<string,SxProps>