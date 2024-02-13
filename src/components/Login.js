// import React, { useState } from "react";
// import Logo from "../assets/logo.jpeg";
// import { Box, Button, TextField } from "@mui/material";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   const showPass = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Box
//       sx={{
//         width: "95vw",
//         height: "93vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: { xs: "80%", md: "60%" },
//           height: { xs: "80vh", md: "40vh" },
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           borderRadius: "10px",
//           border: "3px solid #51e2f5",
//         }}
//       >
//         <Box
//           sx={{
//             width: { xs: "100%", md: "40%" },
//             height: { xs: "50%", md: "100%" },
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img src={Logo} alt="Logo" />
//         </Box>
//         <Box
//           sx={{
//             width: { xs: "100%", md: "60%" },
//             height: { xs: "50%", md: "100%" },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           <TextField size="small" label="Email" />
//           <TextField
//             size="small"
//             type={showPassword ? "text" : "password"}
//             label="Password"
//           />
//           <p
//             onClick={showPass}
//             style={{
//               cursor: "pointer",
//               borderBottom: "2px solid #51e2f5",
//               color: "#51e2f5",
//             }}
//           >
//             {showPassword ? "Hide Password" : "Show Password"}
//           </p>
//           <Button variant="contained">Login</Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Login;

import React, { useState } from "react";
import Logo from "../assets/logo.jpeg";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const showPass = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://reacttestprojectapi.azurewebsites.net/api/UserManagement/AuthenticateUser",
        {
          UserName: email,
          Password: password,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the token is present in the response
      const authToken = response.data.token;
      console.log("Authentication successful. Token:", authToken);

      // You can save the token in state or a global context for further use.
    } catch (error) {
      setError(`Authentication failed. Error: ${error.message}`);
      console.error("Authentication error:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "95vw",
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "80%", md: "60%" },
          height: { xs: "80vh", md: "40vh" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "10px",
          border: "3px solid #51e2f5",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: "50%", md: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="Logo" />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            height: { xs: "50%", md: "100%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextField
            size="small"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size="small"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p
            onClick={showPass}
            style={{
              cursor: "pointer",
              borderBottom: "2px solid #51e2f5",
              color: "#51e2f5",
            }}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </p>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
