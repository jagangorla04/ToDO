import React, { Component } from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { styled } from "@mui/system";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import newImg from "../assets/newImg.png";
import completed from "../assets/completed.png";
import inprogres from "../assets/inprogres.png";
import { ITask } from "../LineChart";

const Container = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
  gap: "20px",
  width: "97%",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: "none",
  backgroundColor: "white",
  height: "auto",
  padding: "15px",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  },
}));


const imageStyles = {
  width: "100%",
  maxWidth: "140px",
  height: "auto",
  margin: "10px 0",
  objectFit: "contain",
};

const iconStyles = {
  backgroundColor: "#F3F7FA",
  padding: "8px",
  borderRadius: "50%",
};

interface ITaskStatusCardProps {
  title: string;
  section: string;
  icon:any;
  image: string;
  tasks: ITask[];
}

const TaskStatusCard: React.FC<ITaskStatusCardProps> = ({
  title,
  section,
  icon,
  image,
  tasks,
}) => {
  const countTasks = tasks.filter((task) => task.section === section).length;

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography color="gray" fontSize="14px">
            {title}
          </Typography>
          <Typography fontWeight="bold" fontSize="16px">
            {countTasks}
          </Typography>
        </Box>
        <Divider sx={{ mt: 1.8 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mt: 1.8,
          }}
        >
          <Box component="img" sx={imageStyles} src={image} />
          <Box>
            <Typography>
              <span style={{ fontSize: "18px", fontWeight: 600, color: "green" }}>10+</span>
              <span style={{ fontSize: "18px", fontWeight: 600, color: "gray" }}> more</span>
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: 600 }} color="gray">
              from last week
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

interface IStatusCardProps {
  tasks: ITask[];
}

class StatusCard extends Component<IStatusCardProps> {
  render() {
    return (
      <Container>
        <TaskStatusCard
          title="Task Completed"
          section="Completed"
          icon={<StarBorderIcon sx={iconStyles} />}
          image={completed}
          tasks={this.props.tasks}
        />
        <TaskStatusCard
          title="In Progress"
          section="In Progress"
          icon={<AssignmentIcon sx={iconStyles} />}
          image={inprogres}
          tasks={this.props.tasks}
        />
        <TaskStatusCard
          title="New Task"
          section="To Do"
          icon={<CheckCircleOutlineIcon sx={iconStyles} />}
          image={newImg}
          tasks={this.props.tasks}
        />
      </Container>
    );
  }
}

export default StatusCard;
