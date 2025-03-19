import React, { Component } from "react";
import {
  Box,
  Typography,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { regionalRankings, UserRanking } from "./Rank";
import first from "../components/assets/first.png";
import second from "../components/assets/second.png";
import third from "../components/assets/three.png";

const PodiumBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: "20px 0",
  textAlign: "center",
});

const regions = [
  { code: "NW", name: "Northwest" },
  { code: "SW", name: "Southwest" },
  { code: "NC", name: "Northcentral" },
  { code: "SC", name: "Southcentral" },
  { code: "NE", name: "Northeast" },
  { code: "SE", name: "Southeast" },
];

class Home extends Component {
  state = {
    selectedRegion: "NW",
    selectedCity: "",
    anchorEl: null,
  };

  handleRegionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRegionClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRegionSelect = (regionCode: string) => {
    this.setState({
      selectedRegion: regionCode,
      selectedCity: "",
      anchorEl: null,
    });
  };

  render() {
    const { selectedRegion, anchorEl } = this.state;
    const regionMenuOpen = Boolean(anchorEl);

    const filteredRankings = regionalRankings
      .filter((user: any) => user.region === selectedRegion)

      .sort((a: any, b: any) => b.points - a.points);

    return (
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          py: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          mt: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <KeyboardArrowLeftIcon />
            <Typography data-testid="leaderboard" variant="h5" fontWeight="bold">
              Leaderboard List
            </Typography>
          </Box>

          <Box>
            <Button
              onClick={this.handleRegionClick}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              {selectedRegion} <KeyboardArrowDownIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={regionMenuOpen}
              onClose={this.handleRegionClose}
            >
              {regions.map((region) => (
                <MenuItem
                  key={region.code}
                  onClick={() => this.handleRegionSelect(region.code)}
                >
                  {region.code} - {region.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        <PodiumBox>
          {filteredRankings
            .slice(0, 3)
            .map((player: UserRanking, index: number) => {
              return (
                <Box key={index} sx={{ width: "100%", textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <Avatar
                      src={player.profilePic}
                      sx={{
                        width: 70,
                        height: 70,
                        border: "3px solid #FFD700",
                        mt: 4,
                      }}
                    />
                    <Typography fontWeight="bold" sx={{ color: "#333" }}>
                      {index === 0 && filteredRankings[1].name}
                      {index === 1 && filteredRankings[0].name}
                      {index === 2 && filteredRankings[2].name}
                    </Typography>

                    <Box
                      sx={{
                        bgcolor:
                          index === 1
                            ? "#ff8000"
                            : index === 2
                            ? "#87817f"
                            : "#2293e8",
                        color: "white",
                        borderRadius: 1,
                        p: 0.5,

                        width: "40%",
                      }}
                    >
                      {index === 0 && filteredRankings[1].points}
                      {index === 1 && filteredRankings[0].points}
                      {index === 2 && filteredRankings[2].points} Points
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 13,
                      width: "184px",
                      height:
                        index === 1 ? "180px" : index === 2 ? "80px" : "120px",
                      background:
                        index === 1
                          ? "linear-gradient(#4eaaef, #a9daff)"
                          : index === 2
                          ? "#176eaf"
                          : "#2293e8",
                      color: "#000",
                      borderRadius: "0px",
                      boxShadow: `0px -28px 0px 0px rgba(85, 150, 224, 0.28),
                      0px 0px 23px 0px rgba(85, 150, 224, 0.28)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {index === 0 && (
                      <Avatar
                        src={second}
                        sx={{
                          width: 80,
                          height: 80,
                        }}
                      />
                    )}
                    {index === 1 && (
                      <Avatar
                        src={first}
                        sx={{
                          width: 90,
                          height: 90,

                          mt: -5,
                        }}
                      />
                    )}
                    {index === 2 && (
                      <Avatar
                        src={third}
                        sx={{
                          width: 60,
                          height: 60,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
        </PodiumBox>
        <Box>
          {filteredRankings.slice(3).map((item, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography
                  sx={{
                    border: "2px solid black",
                    borderRadius: 10,
                    width: "20px",
                    height: "21px",
                    p: 1,
                  }}
                  fontWeight="bold"
                >
                  {index + 4}
                </Typography>

                <Avatar
                  src={item.profilePic}
                  sx={{
                    width: 30,
                    height: 30,
                    border: "3px solid #FFD700",
                  }}
                />
                <Typography fontWeight="bold">{item.name}</Typography>
                <Typography fontWeight="bold">{item.points}</Typography>
              </Box>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default Home;
