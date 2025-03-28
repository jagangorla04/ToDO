import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Chip,
  IconButton,
  Card,
} from "@mui/material";
import CalendarToday from "@mui/icons-material/CalendarToday";
import MoreVert from "@mui/icons-material/MoreVert";
import Add from "@mui/icons-material/Add";
const users = [
  {
    name: "Cris Morich",
    message: "Hi Angelina! How are You?",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "Charmie",
    message: "Do you need that design?",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Jason Mandala",
    message: "What is the price of hourly...",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    name: "Charlie Chu",
    message: "Awesome design!!",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
];

const ChatBar = () => {
  return (
    <Box
      sx={{
        maxWidth: 450,
        
        p: 2,
        bgcolor: "#F9FAFF",
        borderRadius: 2,
     
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Today's Schedule
        </Typography>
        <IconButton>
          <CalendarToday />
        </IconButton>
      </Box>

      <Typography sx={{ color: "#5095FF", fontSize: 14 }}>
        30 minute call with Client + Invite
      </Typography>
      <Typography fontWeight={500}>Project Discovery Call</Typography>

      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          mt: 2,
          bgcolor: "#5051F9",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Box display="flex" gap={1}>
          {users.slice(0, 3).map((user, index) => (
            <Avatar key={index} src={user.avatar} />
          ))}
        </Box>
        <Typography sx={{ flexGrow: 1, textAlign: "center" }}>28:35</Typography>
        <IconButton>
          <MoreVert sx={{ color: "white" }} />
        </IconButton>
      </Card>

      <Typography variant="h6" fontWeight="bold" mt={3}>
        Messages
      </Typography>
      {users.map((user, index) => (
        <Box key={index} display="flex" alignItems="center" gap={2} mt={1}>
          <Avatar src={user.avatar} />
          <Box>
            <Typography fontWeight={600}>{user.name}</Typography>
            <Typography sx={{ color: "gray", fontSize: 14 }}>
              {user.message}
            </Typography>
          </Box>
        </Box>
      ))}

      <Typography variant="h6" fontWeight="bold" mt={3}>
        New Task
      </Typography>
      <TextField
        fullWidth
        placeholder="Create new"
        variant="outlined"
        sx={{ mt: 1, borderRadius: 1 }}
      />

      <Box display="flex" gap={1} mt={2}>
        <Chip label="Angela" color="primary" />
        <Chip label="Chris" color="primary" />
        <IconButton>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBar;
