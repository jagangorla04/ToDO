import React, { PureComponent } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ITask } from "../LineChart";
import { columns } from "../Rank";

const COLORS = ["#FF8042", "#FFBB28", "#0088FE", "#9B59B6", "green"];

interface IProps {
  tasks: ITask[];
}

export default class TaskPieChart extends PureComponent<IProps> {
  getTaskData() {
    return columns.map((category) => ({
      name: category,
      value: this.props.tasks.filter((task) => task.section === category).length,
    }));
  }

  render() {
    const taskData = this.getTaskData();

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, 
          gap: "20px",
          mt: 2,
          width: "97%",
        }}
      >
        
        <Box
          sx={{
            background: "white",
            p: 3,
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            height:'295px',
          }}
        >
          <Typography variant="h6" textAlign="center" mb={2}>
            Task Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {taskData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Task Summary Card */}
        <Card
          sx={{
            background: "white",
            p: 3,
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            height:'295px',
          }}
        >
          <CardContent>
            <Typography variant="h6" textAlign="center" mb={2}>
              Task Summary
            </Typography>
            {taskData.map((task, index) => (
              <Box key={task.name} display="flex" justifyContent="space-between" mb={1}>
                <Typography sx={{ color: COLORS[index % COLORS.length] }}>
                  {task.name}
                </Typography>
                <Typography fontWeight="bold">{task.value}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    );
  }
}
