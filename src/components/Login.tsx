import React, { Component, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  styled,
  Switch,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import log from "../components/assets/login.png";
import  { withRouter } from "./Hoc";
import { signInWithFacebook, signInWithGooglePopup } from "./firebaseConfig";

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#1890ff',
          ...theme.applyStyles('dark', {
            backgroundColor: '#177ddc',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255,255,255,.35)',
      }),
    },
  }));

interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: string;
  rememberMe: boolean;
}


interface Iprops {
    navigate:any
  }

class LoginPage extends Component<Iprops, LoginState> {
  constructor(props:Iprops) {
    super(props);

    this.state = {
      email: localStorage.getItem("rememberedEmail") || "", 
      password: "",
      loading: false,
      error: "",
      rememberMe: !!localStorage.getItem("rememberedEmail"), 
    };
  }

 
  handleChange = (e: 

    ChangeEvent<HTMLInputElement>
) => {
    const findName = e.target.name;
    if(findName === "email"){
        this.setState({ email: e.target.value });
    } else{
        this.setState({ password: e.target.value });
    }
  };

  handleRememberMeChange = () => {
    this.setState((prevState) => ({
      rememberMe: !prevState.rememberMe,
    }));
  };

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.setState({ loading: true, error: "" });

    const { email, password, rememberMe } = this.state;
    const apiUrl = "https://7a6f-27-107-33-186.ngrok-free.app/api/signin";
     try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
     localStorage.setItem("token", data.body.token);
    if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      this.props.navigate('/home')

    } catch (error:any) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };
  
  signInWithGoogle=async()=>{
     await signInWithGooglePopup();
    this.props.navigate('/home')
  }

  signWithFacebook=async()=>{
    const res=await signInWithFacebook()
    this.props.navigate('/home')
  }

  render() {
    const { email, password, loading, error, rememberMe } = this.state;

    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 7,
            backgroundImage: `url(${log})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        />

        <Box
          sx={{
            flex: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <Container maxWidth="xs">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h5" fontWeight="bold">
                Welcome to
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Off Road Treasure Quest
              </Typography>
            </Box>

            <Box component="form" onSubmit={this.handleSubmit} noValidate>
              <Box>
                <Typography fontWeight="bold">Email</Typography>
                <TextField
                  placeholder="Enter your email"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
              </Box>

              <Box>
                <Typography fontWeight="bold">Password</Typography>
                <TextField
                  placeholder="Enter your password"
                  type="password"
                  fullWidth
                  margin="normal"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
              </Box>

              {error && (
                <Typography color="error" textAlign="center">
                  {error}
                </Typography>
              )}

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <AntSwitch
                  data-testid="rememberMe"
                    checked={rememberMe}
                    onChange={this.handleRememberMeChange}
                  />
                  <Typography>Remember me</Typography>
                </Stack>
                <Typography variant="body2" sx={{ cursor: "pointer", color: "primary.main" }}>
                  Forgot password?
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  bgcolor: "#ff9a40",
                  "&:hover": { bgcolor: "#e88a38" },
                }}
                disabled={email.length<=0?true:false}
              >
                 Log In
              </Button>

              <Typography align="center" sx={{ my: 2, fontSize: "14px", color: "gray" }}>
                Or continue with
              </Typography>

              <Box display="flex" gap={2} justifyContent="center">
                <Button variant="outlined" onClick={this.signInWithGoogle} startIcon={<GoogleIcon />} sx={{ flex: 1 }}>
                  Google
                </Button>
                <Button variant="outlined" onClick={this.signWithFacebook} startIcon={<FacebookIcon />} sx={{ flex: 1 }}>
                  Facebook
                </Button>
              </Box>

              <Typography align="center" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Typography component="span" color="primary" sx={{ cursor: "pointer", fontWeight: "bold" }}>
                  Join the Quest
                </Typography>
              </Typography>
            </Box>
          </Container>
        </Box>


      </Box>

    );
  }
}

export default withRouter(LoginPage);
