import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Tab, Tabs } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import StatusCard from "./TasManagement/StatusCard";
import PieCharts from "./TasManagement/PieCharts";
import ChatBar from "./TasManagement/ChatBar";

export interface ITask {
  title: string;
  description: string;
  dueDate: string;
  file: File | null | string;
  section: string;
  id: string;
}

type ChartData = {
  name: string;
  completed: number;
  progress: number;
  review:number
};

interface IState {
  tasks: ITask[];
  activeTab: number;
  chartData: { name: string; completed: number; progress: number ;review:number }[];
}

export default class LineCharts extends PureComponent<{}, IState> {
  dailyData: ChartData[] = [];
  weeklyData: ChartData[] = [];
  monthlyData: ChartData[] = [];

  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: [],
      chartData: [],
      activeTab: 2,
    };
  }
  unsubscribe: (() => void) | null = null;

  subscribeToTasks = () => {
    const docRef = doc(db, "todos", "tasksCollection");

    this.unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const tasks: ITask[] = data.tasks || [];

          this.setState({ tasks }, this.transformChartData);
        } else {
          this.setState({ tasks: [], chartData: [] });
        }
      },
      (error) => {
        console.error("Error fetching real-time tasks:", error);
      }
    );
  };

  componentDidMount(): void {
    this.subscribeToTasks();
  }

  componentWillUnmount(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  transformChartData = (): void => {
    const currentYear = new Date().getFullYear();
    const today = new Date();
  
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const monthlyMap = months.reduce((acc, month) => {
      acc[month] = { completed: 0, progress: 0,review:0 };
      return acc;
    }, {} as Record<string, { completed: number; progress: number;review:number }>);
  
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return `${date.getDate()}-${date.toLocaleString("en-US", { month: "short" })}`;
    }).reverse();
  
    const dailyMap = last30Days.reduce((acc, key) => {
      acc[key] = { completed: 0, progress: 0,review:0 };
      return acc;
    }, {} as Record<string, { completed: number; progress: number,review:number }>);
  
    const last12Weeks = Array.from({ length: 4 }, (_, i) => {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - i * 7);
      return `${startOfWeek.getFullYear()}-W${Math.ceil(startOfWeek.getDate() / 7)}`;
    }).reverse();
  
    const weeklyMap = last12Weeks.reduce((acc, key) => {
      acc[key] = { completed: 0, progress: 0,review:0 };
      return acc;
    }, {} as Record<string, { completed: number; progress: number;review:number }>);
  
    this.state.tasks.forEach((task) => {
      const date = new Date(task.dueDate);
      if (date.getFullYear() === currentYear) {
        const monthKey = date.toLocaleString("en-US", { month: "short" });
        const dayKey = `${date.getDate()}-${monthKey}`;
        const weekKey = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
  
        if (dailyMap[dayKey]) {
          if (task.section === "Completed") dailyMap[dayKey].completed += 1;
          else if (task.section === "In Progress") dailyMap[dayKey].progress += 1;
          else if(task.section === "Review") dailyMap[dayKey].review +=1
        }
  
        if (weeklyMap[weekKey]) {
          if (task.section === "Completed") weeklyMap[weekKey].completed += 1;
          else if (task.section === "In Progress") weeklyMap[weekKey].progress += 1;
          else if(task.section === "Review") weeklyMap[weekKey].review +=1
        }
  
        if (monthlyMap[monthKey]) {
          if (task.section === "Completed") monthlyMap[monthKey].completed += 1;
          else if (task.section === "In Progress") monthlyMap[monthKey].progress += 1;
          else if(task.section === "Review") monthlyMap[monthKey].review +=1
        }
      }
    });
  
    const sortedDailyData = last30Days.map((key) => ({
      name: key,
      completed: dailyMap[key].completed,
      progress: dailyMap[key].progress,
      review:dailyMap[key].review
    }));
  
    const sortedWeeklyData = last12Weeks.map((key) => ({
      name: key,
      completed: weeklyMap[key].completed,
      progress: weeklyMap[key].progress,
      review:weeklyMap[key].review
    }));
  
    const sortedMonthlyData = months.map((month) => ({
      name: month,
      completed: monthlyMap[month].completed,
      progress: monthlyMap[month].progress,
      review:monthlyMap[month].review
    }));
  
    this.setState({ chartData: sortedMonthlyData });
    this.dailyData = sortedDailyData;
    this.weeklyData = sortedWeeklyData;
    this.monthlyData = sortedMonthlyData;
  };
  
  
  
  
  

  handleTabChange = (_event: React.SyntheticEvent, newValue: number): void => {
    this.setState({
      activeTab: newValue,
      chartData:
        newValue === 0
          ? this.dailyData
          : newValue === 1
          ? this.weeklyData
          : this.monthlyData,
    });
  };

  render() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },

       

          p: 2,
          width: "100%",
          
        }}
      >
        <Box sx={{ flex: 2, minWidth: "320px" }}>
          <StatusCard tasks={this.state.tasks} />
          <Box
            sx={{
              background: "white",
              p: 3,
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              width: "92.5%",
              mt: 2,
            
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#23235F" }}
              >
                Task Progress
              </Typography>
              <Tabs
                value={this.state.activeTab}
                onChange={this.handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  "& .MuiTabs-indicator": { backgroundColor: "#5051F9" },
                  "& .MuiTab-root": {
                    color: "#A5A5A5",
                    textTransform: "none",
                    fontWeight: 500,
                  },
                  "& .Mui-selected": { color: "#5051F9", fontWeight: "bold" },
                }}
              >
                <Tab label="Daily" />
                <Tab label="Weekly" />
                <Tab label="Monthly" />
              </Tabs>
            </Box>

            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={this.state.chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorCompleted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#5051F9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5051F9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorProgress"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#1EA7FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1EA7FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorReview"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#9B59B6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9B59B6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#5F6388", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#5F6388", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ top: -10 }}
                />

                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#5051F9"
                  fill="url(#colorCompleted)"
                  strokeWidth={2}
                  dot={{ r: 5, fill: "#5051F9" }}
                />
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="#1EA7FF"
                  fill="url(#colorProgress)"
                  strokeWidth={2}
                  dot={{ r: 5, fill: "#1EA7FF" }}
                />
                <Area
                  type="monotone"
                  dataKey="review"
                  stroke="#9B59B6"
                  fill="url(#colorReview)"
                  strokeWidth={2}
                  dot={{ r: 5, fill: "#9B59B6" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <PieCharts tasks={this.state.tasks} />
        </Box>

        <Box sx={{ flex: 1, minWidth: "280px", mt: { xs: 2, md: 0 } }}>
          <ChatBar />
        </Box>
      </Box>
    );
  }
}
