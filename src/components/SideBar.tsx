import React, { Component } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import logo from "../components/assets/logo.png";

const sidebarItems = [
  { name: "LineCharts", icon: <GridViewOutlinedIcon /> },
  { name: "TaskManagement", icon: <MenuBookTwoToneIcon /> },
];

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

interface SideBarProps {
  onSidebarClick: (componentName: string) => void;
}

interface SideBarState {
  activeIndex: number;
}

export default class SideBar extends Component<SideBarProps, SideBarState> {
  constructor(props: SideBarProps) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleIconClick = (index: number, name: string) => {
    this.setState({ activeIndex: index }, () => {
      this.props.onSidebarClick(name);
    });
  };

  render() {
    return (
      <Sidebar sx={{ backgroundColor: "white" }}>
        <Box
          sx={{
            mt: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2.5,
          }}
        >
          {sidebarItems.map((item, index) => (
            <IconButton
              key={index}
              onClick={() => this.handleIconClick(index, item.name)}
              sx={{
                backgroundColor:
                  this.state.activeIndex === index ? "#5051F9" : "#FFFFFF",
                color: this.state.activeIndex === index ? "#FFFFFF" : "#5F6388",
                borderRadius: "10px",
                padding: "10px",
                transition: "0.3s",

                "&:hover": {
                  backgroundColor: "#5051F9",
                  color: "#FFFFFF",
                },
              }}
            >
              {item.icon}
            </IconButton>
          ))}
        </Box>
      </Sidebar>
    );
  }
}

const styles = {
  logo: {
    width: "30px",
    height: "35px",
  },
  textOctom: {
    color: "#23235F",
    fontSize: "14px",
    fontWeight: 700,
  },
};
