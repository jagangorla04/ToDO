import React, { Component } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Paper,
  SxProps,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { columns, users } from "../Rank";
import Modals from "../Modal";
import ChatUI from "../Chat";

interface ITask {
  title: string;
  description: string;
  dueDate: string;
  file: File | null | string;
  section: string;
  id: string;
}

interface IState {
  tasks: ITask[];
  open: boolean;
}

class TaskManagement extends Component<{}, IState> {
  state: IState = {
    open: false,
    tasks: [],
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  unsubscribe: (() => void) | null = null;

  subscribeToTasks = () => {
    const docRef = doc(db, "todos", "tasksCollection");

    this.unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const tasks = data.tasks || [];

          this.setState({ tasks });
        } else {
          this.setState({ tasks: [] });
        }
      },
      (error) => {
        console.error("Error fetching real-time tasks:", error);
      }
    );
  };

  componentDidMount(): void {
    this.subscribeToTasks();
  }

  componentWillUnmount(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  handleDragStart = (event: React.DragEvent, taskId: string) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  handleDrop = async (event: React.DragEvent, newSection: string) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");

    try {
      const { tasks } = this.state;
      const taskIndex = tasks.findIndex(
        (task) => task.id.toString() === taskId
      );

      if (taskIndex === -1) return;

      const task = tasks[taskIndex];

      if (!this.canMoveTask(task.section, newSection)) {
        alert("You cannot move this task to the selected section.");
        return;
      }

      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...task, section: newSection };

      const docRef = doc(db, "todos", "tasksCollection");
      await updateDoc(docRef, { tasks: updatedTasks });

      this.setState({ tasks: updatedTasks });
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  canMoveTask = (currentSection: string, newSection: string) => {
    const order = ["Backlog", "To Do", "In Progress", "Review", "Completed"];
    const currentIndex = order.indexOf(currentSection);
    const newIndex = order.indexOf(newSection);

    if (newIndex >= currentIndex) return true;

    if (currentSection === "Review" && newSection === "Backlog") return true;

    return false;
  };

  render() {
    return (
      <Box display="flex" sx={styles.globalContainer} flexDirection="column">
        <Box display="flex" >
          <Box  padding="10px" width="calc(100% - 100px)">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              borderRadius="8px"
            >
              <Typography variant="h6" fontWeight={700}>
                🔥 Task
              </Typography>
              <Box display="flex" alignItems="center">
                {users.map((user, index) => (
                  <Avatar
                    key={index}
                    src={user}
                    sx={{
                      width: 32,
                      height: 32,
                      marginLeft: index === 0 ? 0 : -1.5,
                      border: "2px solid white",
                    }}
                  />
                ))}
                <Typography variant="body2" sx={styles.number}>
                  +6
                </Typography>
                <IconButton size="small" sx={styles.firstAddIcon}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box sx={styles.mainColumContainer}>
              {columns.map((column) => (
                <Box
                  key={column}
                  width="19%"
                  minWidth="200px"
                  onDragOver={this.handleDragOver}
                  onDrop={(e) => this.handleDrop(e, column)}
                  sx={{
                    maxHeight: "700px",
                    overflowY: "auto",
                  }}
                >
                  <Box sx={styles.columContainer}>
                    <Typography variant="h6" sx={styles.textColum}>
                      {column}
                    </Typography>
                    {column === "To Do" && (
                      <Box sx={styles.iconContainer}>
                        <MoreHorizIcon />
                        <IconButton
                          size="small"
                          sx={styles.addIcon}
                          data-testid="openModal"
                          onClick={this.handleOpen}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  {this.state.tasks
                    .filter((task) => task.section === column)
                    .map((task) => (
                      <Paper
                        key={task.id}
                        elevation={2}
                        sx={styles.paper}
                        draggable
                        onDragStart={(e) => this.handleDragStart(e, task.id)}
                      >
                        <Typography
                          sx={{
                            backgroundColor: getSectionColor(column),
                            color: "white",
                            fontSize: "12px",
                            fontWeight: 600,
                            borderRadius: "6px",
                            padding: 1,
                            width: "25%",
                            fontFamily: "DM Sans",
                            textAlign: "center",
                          }}
                        >
                          {getSectionLabel(column)}
                        </Typography>

                        {/*{task.file && typeof task.file === "string" && (
                          <Box
                            component="img"
                            src={task.file}
                            alt="Task"
                            sx={styles.img}
                          />
                        )}*/}

                        <Typography variant="h6" sx={styles.textTitle} mt={1}>
                          {task.title}
                        </Typography>

                        <Typography variant="body2" sx={styles.textDescription}>
                          {task.description}
                        </Typography>

                        <Typography
                          sx={{
                            border: "1px solid #E2E2E2",
                            fontSize: "12px",
                            marginTop: 1,
                            borderRadius: "4px",
                            width: "30%",
                            color: "#232360",
                            textAlign: "center",
                            fontFamily: "DM Sans",
                            fontWeight: 700,
                          }}
                        >
                          {task.dueDate}
                        </Typography>
                      </Paper>
                    ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Modals
          open={this.state.open}
          handleClose={this.handleClose}
          data-testid="closeModal"
        />
        <ChatUI />
      </Box>
    );
  }
}

export default TaskManagement;
const getSectionLabel = (section: string) => {
  const labels: Record<string, string> = {
    Backlog: "Planning",
    "To Do": "Pending",
    "In Progress": "Ongoing",
    Review: "Under Review",
    Completed: "Done",
  };

  return labels[section] ?? "General";
};

const getSectionColor = (section: string) => {
  const colors: Record<string, string> = {
    Backlog: "#FF5733",
    "To Do": "#F39C12",
    "In Progress": "#3498DB",
    Review: "#9B59B6",
    Completed: "#28A745",
  };

  return colors[section] ?? "#5D6D7E";
};

const styles = {
  globalContainer: {
    backgroundColor: "#F3F4F8",
    height: "100vh",
    maxHeight: "100",
  },
  appBar: { backgroundColor: "white", boxShadow: "none" },
  logo: { width: "30px", height: "35px" },
  textOctom: { color: "#23235F", fontSize: "14px", fontWeight: 700 },
  inputSearch: {
    "& fieldset": { border: "none" },
    backgroundColor: "#F3F7FA",
    borderRadius: "8px",
    width: "290px",
    height: "45px",
  },
  number: { mx: 1, fontWeight: 600 },
  firstAddIcon: {
    bgcolor: "#D9E0E8",
    border: "2px dashed grey",
    color: "#5D68FE",
  },
  mainColumContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 1,
    overflowX: "auto",
    whiteSpace: "nowrap",
    width: "100%",
    paddingBottom: "8px",
  },
  columContainer: {
    backgroundColor: "white",
    borderRadius: "10px",
    p: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1,
    background: "white",
  },
  textColum: {
    color: "#23235F",
    fontSize: "17px",
    fontWeight: 700,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
  textDescription: {
    color: "#768396",
    fontSize: "16px",
    fontWeight: 600,
    borderRadius: "6px",
    width: "20%",
    fontFamily: "DM Sans",
  },
  textTitle: {
    color: "#232360",
    fontSize: "16px",
    fontWeight: 600,
    borderRadius: "6px",
    width: "20%",
    fontFamily: "DM Sans",
  },
  img: {
    width: "100%",
    borderRadius: "8px",
    marginTop: 1,
    objectFit: "cover",
  },
  paper: {
    padding: 2,
    borderRadius: "12px",
    backgroundColor: "#fff",
    mt: 2,
  },
  addIcon: { bgcolor: "#E8EAFF", borderRadius: "7px" },
} satisfies Record<string, SxProps>;
