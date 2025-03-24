import React, { Component } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, SxProps, TextField, Typography } from "@mui/material";
import {  arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface IProps {
  open: boolean;
  handleClose: () => void;
  
}

interface Task {
  section: string;
  title: string;
  description: string;
  dueDate: string;
  file?: File | null;
}
interface IState {
  title: string;
  description: string;
  dueDate: string;
  file: string | null;
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
    let file=  URL.createObjectURL(e.target.files[0])
      this.setState({ file:file });
    }
  };

  handleSubmit = async () => {
    const { title, description, dueDate,file } = this.state;
  
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      const task = {
        id:Date.now(),
        section: "To Do",
        title,
        description,
        dueDate,
        file
    
      };
      const docRef = doc(db, "todos", "tasksCollection"); 
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          tasks: arrayUnion(task),
        });
      } else {
        await setDoc(docRef, {
          tasks: [task],
        });
      }
  
      console.log("Task added successfully!");
      this.setState({ title: "", description: "", dueDate: "", file: null });
      this.props.handleClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  render() {
    return (
      <Modal
        open={this.props.open}
        data-testid="closeModal"
        onClose={this.props.handleClose}
      >
        <Box sx={styles.modal}>
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Add Task
          </Typography>

          <TextField
            fullWidth
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            variant="outlined"
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            placeholder="Description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            variant="outlined"
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            placeholder="Due Date"
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
            inputProps={{ "data-testid": "file-input" }}
            variant="outlined"
            sx={{ my: 1 }}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            fullWidth
            data-testid="subTest"
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

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
} satisfies Record<string, SxProps>;
