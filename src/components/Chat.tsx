import React, { Component } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";

interface IState {
  messages: {
    id: number;
    user: string;
    text: string;
    time: string;
    type: string;
    isMe: boolean;
  }[];
  newMessage: string;
  isChatOpen: boolean;
}

const users = ["/user1.jpg", "/user2.jpg", "/user3.jpg", "/user4.jpg"];

class ChatUI extends Component<{}, IState> {
  state: IState = {
    messages: [
      {
        id: 1,
        user: "User1",
        text: "Hello! 👋",
        time: "08:00 am",
        type: "text",
        isMe: false,
      },
      {
        id: 2,
        user: "Me",
        text: "Hi, Everyone 🔥",
        time: "08:01 am",
        type: "text",
        isMe: true,
      },
      {
        id: 3,
        user: "User2",
        text: "How are you, What did you do everyone",
        time: "08:03 am",
        type: "text",
        isMe: false,
      },
      {
        id: 4,
        user: "User3",
        text: "Good ✌️",
        time: "08:05 am",
        type: "text",
        isMe: false,
      },
      {
        id: 5,
        user: "User4",
        text: "audio",
        time: "08:07 am",
        type: "audio",
        isMe: false,
      },
    ],
    newMessage: "",
    isChatOpen: false,
  };

  toggleChat = () => {
    this.setState((prevState) => ({ isChatOpen: !prevState.isChatOpen }));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessage: event.target.value });
  };

  handleSendMessage = () => {
    if (this.state.newMessage.trim() === "") return;

    const newMessageObj = {
      id: this.state.messages.length + 1,
      user: "Me",
      text: this.state.newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
      isMe: true,
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessageObj],
      newMessage: "",
    }));
  };

  render() {
    return (
      <Box>
        {this.state.isChatOpen && (
          <Box
            sx={{
              width: "380px",
              height: "675px",
              borderRadius: "0px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              position: "fixed",
              bottom: "80px",
              right: "0px",
              overflow: "hidden",
              zIndex: 1000,
            }}
          >
            <Box
              sx={{
                padding: "10px 15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                color: "white",
              }}
            >
              <Typography
                fontWeight={600}
                sx={{ color: "grey" }}
                fontSize="16px"
              >
                Member (25)
              </Typography>
              <Typography sx={{ color: "grey" }} fontSize="16px">
                View All
              </Typography>
            </Box>

            <Box display="flex" sx={{ padding: 1 }} alignItems="center">
              {users.map((user, index) => (
                <Avatar
                  key={index}
                  src={user}
                  sx={{
                    width: 32,
                    height: 32,
                    border: "2px solid white",
                  }}
                />
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, padding: "10px", overflowY: "auto" }}>
              <Typography
                fontWeight={600}
                sx={{ color: "grey" }}
                fontSize="16px"
              >
                Group Chat
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                {this.state.messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      flexDirection: msg.isMe ? "row-reverse" : "row",
                      marginBottom: "10px",
                    }}
                  >
                    <Avatar sx={{ width: 30, height: 30, margin: "0 8px" }} />
                    {msg.type === "text" ? (
                      <Paper
                        sx={{
                          padding: "10px",
                          borderRadius: "10px",
                          backgroundColor: msg.isMe ? "#6C4EF5" : "#EEF1F7",
                          color: msg.isMe ? "white" : "#333",
                          maxWidth: "70%",
                        }}
                      >
                        <Typography fontSize="14px">{msg.text}</Typography>
                        <Typography
                          fontSize="10px"
                          color="gray"
                          sx={{ textAlign: "right", marginTop: "5px" }}
                        >
                          {msg.time}
                        </Typography>
                      </Paper>
                    ) : (
                      <Paper
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px",
                          borderRadius: "10px",
                          backgroundColor: "#EEF1F7",
                          width: "60%",
                        }}
                      >
                        <IconButton sx={{ color: "#6C4EF5" }}>
                          <MicIcon />
                        </IconButton>
                        <Typography fontSize="12px" color="gray">
                          1:25
                        </Typography>
                      </Paper>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderTop: "1px solid #E0E0E0",
              }}
            >
              <TextField
                fullWidth
                placeholder="Write here..."
                variant="outlined"
                size="small"
                value={this.state.newMessage}
                onChange={this.handleInputChange}
                sx={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": { border: "none" },
                }}
              />
              <IconButton
                sx={{ color: "#6C4EF5" }}
                onClick={this.handleSendMessage}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        )}

        <IconButton
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#6C4EF5",
            color: "white",
            "&:hover": { backgroundColor: "#4A32D4" },
            width: "56px",
            height: "56px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {this.state.isChatOpen ? (
            <CloseIcon onClick={this.toggleChat} />
          ) : (
            <ChatBubbleOutlineIcon fontSize="large" onClick={this.toggleChat} />
          )}
        </IconButton>
      </Box>
    );
  }
}

export default ChatUI;
