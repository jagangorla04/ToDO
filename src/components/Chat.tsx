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
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { auth, db } from "./firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import moment from "moment";

interface IMessage {
  id: string;
  user: string;
  text: string;
  time: any;
  photoURL: string;
}

interface IState {
  messages: IMessage[];
  newMessage: string;
  isChatOpen: boolean;
  user: any;
}

class ChatUI extends Component<{}, IState> {
  state: IState = {
    messages: [],
    newMessage: "",
    isChatOpen: false,
    user: null,
  };

  unsubscribe: any = null;

  componentDidMount() {
    this.fetchMessages();
    auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  fetchMessages = () => {
    const q = query(collection(db, "messages"), orderBy("time", "asc"));
    this.unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Raw Firestore data:", data);

        return {
          id: doc.id,
          user: data.user,
          text: data.text,
          time: data.time?.seconds
            ? moment(new Date(data.time.seconds * 1000)).format("h:mm a")
            : "...",
          photoURL: data.photoURL || "",
        };
      }) as IMessage[];

      console.log("Processed messages:", messages);
      this.setState({ messages: [...messages] });
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessage: event.target.value });
  };

  handleSendMessage = async () => {
    const { newMessage, user } = this.state;
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, "messages"), {
        user: user.displayName,
        text: newMessage,
        time: serverTimestamp(),
        photoURL: user.photoURL || "",
      });

      this.setState({ newMessage: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  toggleChat = () => {
    this.setState((prevState) => ({ isChatOpen: !prevState.isChatOpen }));
  };

  render() {
    const { messages, newMessage, isChatOpen, user } = this.state;

    return (
      <Box>
        {isChatOpen && (
          <Box
            sx={{
              width: "380px",
              height: "675px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              position: "fixed",
              bottom: "80px",
              right: "20px",
              overflow: "hidden",
              zIndex: 1000,
            }}
          >
          
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ff9a40",
                color: "white",
              }}
            >
              <Typography fontWeight={600} fontSize="16px">
                Chat Room
              </Typography>
              <IconButton onClick={this.toggleChat} sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, padding: "10px", overflowY: "auto" }}>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      flexDirection:
                        msg.user === user?.displayName ? "row-reverse" : "row",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <Avatar
                      src={msg.photoURL}
                      sx={{ width: 30, height: 30 }}
                    />
                    <Paper
                      sx={{
                        padding: "10px",
                        borderRadius: "10px",
                        backgroundColor:
                          msg.user === user?.displayName ? "#6C4EF5" : "#EEF1F7",
                        color: msg.user === user?.displayName ? "white" : "#333",
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
                  </Box>
                ))
              ) : (
                <Typography sx={{ textAlign: "center", color: "gray" }}>
                  No messages yet
                </Typography>
              )}
            </Box>

           
            <Box
              sx={{
                display: "flex",
                padding: "10px",
                borderTop: "1px solid #E0E0E0",
              }}
            >
              <TextField
                fullWidth
                placeholder="Type a message..."
                variant="outlined"
                size="small"
                value={newMessage}
                onChange={this.handleInputChange}
                sx={{ backgroundColor: "#F5F5F5", borderRadius: "8px" }}
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
            width: "56px",
            height: "56px",
          }}
          onClick={this.toggleChat}
        >
          {isChatOpen ? <CloseIcon /> : <ChatBubbleOutlineIcon fontSize="large" />}
        </IconButton>
      </Box>
    );
  }
}

export default ChatUI;
