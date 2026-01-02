// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";

// import { loginApi } from "../../api/authApi";
// import { saveAuth } from "../../auth/authStorage";

// export default function LoginDialog({ open, onSuccess }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     try {
//       setLoading(true);

//       const data = await loginApi({ username, password });

//      const authData = {
//   user: {
//     username: data.username,
//     role: data.role,
//     name: data.fullName,
//   },
// };

//       saveAuth(authData);
//       onSuccess(authData);
//     } catch (err) {
//       alert("Sai tài khoản hoặc mật khẩu");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} maxWidth="xs" fullWidth>
//       <DialogTitle>Đăng nhập hệ thống</DialogTitle>

//       <DialogContent>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Box>
//       </DialogContent>

//       <DialogActions>
//         <Button
//           variant="contained"
//           fullWidth
//           disabled={loading}
//           onClick={handleLogin}
//         >
//           {loading ? "Đang đăng nhập..." : "Đăng nhập"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }


import React, { useEffect } from "react";
import { saveAuth } from "../../auth/authStorage";

/**
 * LOGIN ĐÃ BỊ TẮT
 * - Không gọi API
 * - Không popup
 * - Không password
 * - Auto vào ADMIN
 */
export default function LoginDialog({ onSuccess }) {
  useEffect(() => {
    const authData = {
      user: {
        username: "admin",
        role: "ADMIN",
        name: "Administrator",
      },
    };

    // Lưu fake auth
    saveAuth(authData);

    // Báo cho app biết là đã "login"
    if (onSuccess) {
      onSuccess(authData);
    }
  }, [onSuccess]);

  // Không render gì cả
  return null;
}
