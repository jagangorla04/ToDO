export interface UserRanking {
    name: string;
    points: number;
    profilePic: string;
    region: string;
  }
  
 export const regionalRankings: UserRanking[] = [
   
    {
      name: "Emma Johnson",
      points: 98,
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
      region: "NW",
    },
    {
      name: "Oliver Smith",
      points: 94,
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      region: "NW",
    },
    {
      name: "Ava Williams",
      points: 92,
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
      region: "NW",
    },
    {
      name: "Liam Brown",
      points: 90,
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
      region: "NW",
    },
    {
      name: "Sophia Davis",
      points: 96,
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
      region: "NW",
    },
    
    {
      name: "Mia Brown",
      points: 97,
      profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
      region: "SW",
    },
    {
      name: "Liam Miller",
      points: 92,
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
      region: "SW",
    },
    {
      name: "Noah Wilson",
      points: 95,
      profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
      region: "SW",
    },
    {
      name: "Isabella Anderson",
      points: 93,
      profilePic: "https://randomuser.me/api/portraits/women/9.jpg",
      region: "SW",
    },
    {
      name: "Ethan Taylor",
      points: 91,
      profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
      region: "SW",
    },
  
    {
      name: "Sophia Davis",
      points: 99,
      profilePic: "https://randomuser.me/api/portraits/women/11.jpg",
      region: "NC",
    },
    {
      name: "Noah Wilson",
      points: 95,
      profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
      region: "NC",
    },
    {
      name: "Mason Thomas",
      points: 93,
      profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
      region: "NC",
    },
    {
      name: "Olivia Martinez",
      points: 92,
      profilePic: "https://randomuser.me/api/portraits/women/14.jpg",
      region: "NC",
    },
    {
      name: "Lucas Anderson",
      points: 90,
      profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
      region: "NC",
    },
    
    {
      name: "Isabella Anderson",
      points: 96,
      profilePic: "https://randomuser.me/api/portraits/women/16.jpg",
      region: "SC",
    },
    {
      name: "Mason Thomas",
      points: 93,
      profilePic: "https://randomuser.me/api/portraits/men/17.jpg",
      region: "SC",
    },
    {
      name: "Charlotte Garcia",
      points: 91,
      profilePic: "https://randomuser.me/api/portraits/women/18.jpg",
      region: "SC",
    },
    {
      name: "James Martinez",
      points: 89,
      profilePic: "https://randomuser.me/api/portraits/men/19.jpg",
      region: "SC",
    },
    {
      name: "Amelia Robinson",
      points: 88,
      profilePic: "https://randomuser.me/api/portraits/women/20.jpg",
      region: "SC",
    },
 
    {
      name: "Charlotte Martinez",
      points: 100,
      profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
      region: "NE",
    },
    {
      name: "Ethan Jackson",
      points: 98,
      profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
      region: "NE",
    },
    {
      name: "Aiden White",
      points: 97,
      profilePic: "https://randomuser.me/api/portraits/men/23.jpg",
      region: "NE",
    },
    {
      name: "Harper Lewis",
      points: 96,
      profilePic: "https://randomuser.me/api/portraits/women/24.jpg",
      region: "NE",
    },
    {
      name: "Jack Lee",
      points: 94,
      profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
      region: "NE",
    },
    
    {
      name: "Amelia White",
      points: 97,
      profilePic: "https://randomuser.me/api/portraits/women/26.jpg",
      region: "SE",
    },
    {
      name: "James Harris",
      points: 94,
      profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
      region: "SE",
    },
    {
      name: "Evelyn Martin",
      points: 93,
      profilePic: "https://randomuser.me/api/portraits/women/28.jpg",
      region: "SE",
    },
    {
      name: "Benjamin Walker",
      points: 92,
      profilePic: "https://randomuser.me/api/portraits/men/29.jpg",
      region: "SE",
    },
    {
      name: "Avery Hall",
      points: 91,
      profilePic: "https://randomuser.me/api/portraits/women/30.jpg",
      region: "SE",
    },
  ];
  
 export const users = ["/user1.jpg", "/user2.jpg", "/user3.jpg", "/user4.jpg"];

 export const columns = ["Backlog", "To Do", "In Progress", "Review", "Completed"];

 export const chatMessage=[
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
]