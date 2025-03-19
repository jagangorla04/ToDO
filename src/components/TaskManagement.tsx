import React, { Component } from "react";
import {
  AppBar,
  Box,
  Typography,
  Avatar,
  Chip,
  TextField,
  IconButton,
  Badge,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SideBar from "./SideBar";
import logo from "../components/assets/logo.png";
import profile from "../components/assets/profile.png";
import Modals from "./Modal";
import ChatUI from "./Chat";

const users = ["/user1.jpg", "/user2.jpg", "/user3.jpg", "/user4.jpg"];

const columns = ["Backlog", "To Do", "In Progress", "Review", "Completed"];

interface ITask {
  title: string;
  description: string;
  dueDate: string;
  file: File | null;
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

  addTask = (newTask: {
    title: string;
    description: string;
    dueDate: string;
    file: File | null;
  }) => {
    const taskWithId: ITask = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      section: "To Do",
    };
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, taskWithId],
    }));
  };

  handleDragStart = (event: React.DragEvent, taskId: string) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  handleDrop = (event: React.DragEvent, newSection: string) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");
  
    this.setState((prevState) => {
      const tasks = prevState.tasks.map((task) => {
        if (task.id === taskId) {
          if (this.canMoveTask(task.section, newSection)) {
            return { ...task, section: newSection };
          } else {
            alert("You cannot move this task to the selected section.");
          }
        }
        return task;
      });
  
      return { tasks };
    });
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
      <Box
        display="flex"
        sx={{ backgroundColor: "#F3F4F8", height: "100vh", maxHeight: "100" }}
        flexDirection="column"
      >
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "white", boxShadow: "none" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            padding={1.2}
            alignItems="center"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                component="img"
                sx={{ width: "30px", height: "35px" }}
                src={logo}
              />
              <Typography
                variant="h6"
                sx={{ color: "#23235F", fontSize: "14px", fontWeight: 700 }}
              >
                OCTOM.
              </Typography>
            </Box>

            <TextField
              size="small"
              variant="outlined"
              placeholder="Search anything..."
              sx={{
                "& fieldset": { border: "none" },
                backgroundColor: "#F3F7FA",
                borderRadius: "8px",
                width: "290px",
                height: "45px",
              }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />

            <Box display="flex" alignItems="center" gap={1}>
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <Avatar
                alt="Profile"
                sx={{ backgroundColor: "#E7E7FF" }}
                src={profile}
              />
              <KeyboardArrowDownIcon sx={{ color: "#5250F9" }} />
            </Box>
          </Box>
        </AppBar>

        <Box display="flex" mt={8}>
          <SideBar />
          <Box marginLeft="100px" padding="16px" width="calc(100% - 100px)">
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
                <Typography variant="body2" sx={{ mx: 1, fontWeight: 600 }}>
                  +6
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#D9E0E8",
                    border: "2px dashed grey",
                    color: "#5D68FE",
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
                overflowX: "auto",
                whiteSpace: "nowrap",
                width: "100%",
                paddingBottom: "8px",
              }}
            >
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
                  <Box
                    sx={{
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
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#23235F",
                        fontSize: "17px",
                        fontWeight: 700,
                      }}
                    >
                      {column}
                    </Typography>
                    {column === "To Do" && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <MoreHorizIcon />
                        <IconButton
                          size="small"
                          sx={{ bgcolor: "#E8EAFF", borderRadius: "7px" }}
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
                        key={task.id} // Use task.id as key
                        elevation={2}
                        sx={{
                          padding: 2,
                          borderRadius: "12px",
                          backgroundColor: "#fff",
                          mt: 2,
                        }}
                        draggable
                        onDragStart={(e) => this.handleDragStart(e, task.id)} // Use task.id
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

                        {task.file && (
                          <Box
                            component="img"
                            src={URL.createObjectURL(task.file)}
                            alt="Task"
                            sx={{
                              width: "100%",
                              borderRadius: "8px",
                              marginTop: 1,
                              objectFit: "cover",
                            }}
                          />
                        )}

                        <Typography
                          variant="h6"
                          sx={{
                            color: "#232360",
                            fontSize: "16px",
                            fontWeight: 600,
                            borderRadius: "6px",
                            width: "20%",
                            fontFamily: "DM Sans",
                          }}
                          mt={1}
                        >
                          {task.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#768396",
                            fontSize: "16px",
                            fontWeight: 600,
                            borderRadius: "6px",
                            width: "20%",
                            fontFamily: "DM Sans",
                          }}
                        >
                          {task.description}
                        </Typography>

                        <Chip
                          label={task.dueDate}
                          sx={{
                            backgroundColor: "#f0f0f0",
                            fontSize: "12px",
                            marginTop: 1,
                          }}
                        />
                      </Paper>
                    ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Modals
          addTask={this.addTask}
          open={this.state.open}
          handleClose={this.handleClose}
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
