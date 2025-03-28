import React, { useState } from "react";
import { 
  AppBar, Box, Typography, Avatar, TextField, IconButton, 
  Badge, useMediaQuery, Drawer, SxProps, Theme 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";
import logo from "../components/assets/logo.png";
import profile from "../components/assets/profile.png";
import TaskManagement from "./TasManagement/TaskManagement";
import LineCharts from "./LineChart";

const drawerWidth = 60;

const componentsMap = {
  LineCharts,
  TaskManagement,
} as const;

type ComponentKey = keyof typeof componentsMap;

const Main: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentKey>("LineCharts");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleSidebarClick = (componentName: string) => {
    if (componentName in componentsMap) {
      setActiveComponent(componentName as ComponentKey);
      if (isSmallScreen) setSidebarOpen(false);
    }
  };

  const ActiveComponent = componentsMap[activeComponent];

  return (
    <Box display="flex" flexDirection="column" sx={styles.globalContainer}>
      
      
      <AppBar position="fixed" sx={styles.appBar}>
        <Box display="flex" justifyContent="space-between" padding={1.2} alignItems="center">
          
         
          <Box display="flex" alignItems="center" gap={1}>
            {!sidebarOpen && isSmallScreen && (
              <IconButton onClick={() => setSidebarOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            {sidebarOpen && isSmallScreen && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box component="img" onClick={() => setSidebarOpen(false)} sx={styles.logo} src={logo} />
                <Typography variant="h6" sx={styles.textOctom}>OCTOM.</Typography>
              </Box>
            )}
            {!isSmallScreen && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box component="img"  sx={styles.logo} src={logo} />
                <Typography variant="h6" sx={styles.textOctom}>OCTOM.</Typography>
              </Box>
            )}
          </Box>

      
          {!isSmallScreen && (
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search anything..."
              sx={styles.inputSearch}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          )}

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <Avatar alt="Profile" sx={{ backgroundColor: "#E7E7FF" }} src={profile} />
            <KeyboardArrowDownIcon sx={{ color: "#5250F9" }} />
          </Box>

        </Box>
      </AppBar>

      <Box display="flex" sx={{ mt: 8 }}>
        
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <SideBar data-testid="sidebar" onSidebarClick={handleSidebarClick} />
        </Drawer>

        <Box sx={styles.contentContainer}>
          {ActiveComponent ? <ActiveComponent /> : <Typography>No Component Found</Typography>}
        </Box>

      </Box>
    </Box>
  );
};

export default Main;

const styles: Record<string, SxProps<Theme>> = {
  globalContainer: {
    backgroundColor: "#F3F4F8",
  },
  appBar: {
    backgroundColor: "white",
    boxShadow: "none",
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },
  logo: {
    width: "30px",
    height: "35px",
  },
  textOctom: {
    color: "#23235F",
    fontSize: "14px",
    fontWeight: 700,
  },
  inputSearch: {
    "& fieldset": { border: "none" },
    backgroundColor: "#F3F7FA",
    borderRadius: "8px",
    width: "290px",
    height: "45px",
  },
  contentContainer: {
    flexGrow: 1,
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#F3F4F8",
    minHeight: "calc(100vh - 64px)",
    overflow: "hidden",
  },
};
