import React, { Component } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";

const Sidebar = styled(Box)({
  width: "80px",
  height: "100vh",
  background: "#f8f9fa",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px 0",
  position: "fixed",
  left: 0,
  top: 0,
  gap: "20px",
});

export default class SideBar extends Component {
  state = {
    activeIndex: 0,
  };

  handleIconClick = (index: number) => {
    this.setState({ activeIndex: index });
  };

  render() {
    const icons = [
      GridViewOutlinedIcon,
      MenuBookTwoToneIcon,
      SettingsOutlinedIcon,
      CreateNewFolderOutlinedIcon,
      SendOutlinedIcon,
    ];

    return (
      <Sidebar sx={{ backgroundColor: "white" }}>
        <Box
          sx={{
            mt: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap:2.5
          }}
        >
          {icons.map((Icon, index) => (
            <IconButton
              key={index}
              onClick={() => this.handleIconClick(index)}
              sx={{
                backgroundColor:
                  this.state.activeIndex === index ? "#5051F9" : "#FFFFFF",
                color: this.state.activeIndex === index ? "#FFFFFF" : "#5F6388",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Icon />
            </IconButton>
          ))}
        </Box>
      </Sidebar>
    );
  }
}
