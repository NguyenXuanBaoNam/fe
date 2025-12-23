import React, { useState } from "react";

function LoginRegister({ onLogin }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });
  const [message, setMessage] = useState("");

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f7f6",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      margin: "0 0 20px 0",
      color: "#333",
      fontSize: "24px",
      fontWeight: "600",
      textAlign: "center",
    },
    inputGroup: {
      marginBottom: "15px",
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: "14px",
      color: "#666",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "16px",
      boxSizing: "border-box",
      outline: "none",
    },
    buttonPrimary: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background 0.3s",
    },
    buttonSecondary: {
      background: "none",
      border: "none",
      color: "#007bff",
      textDecoration: "underline",
      cursor: "pointer",
      padding: "0",
      fontSize: "14px",
    },
    error: {
      backgroundColor: "#ffebee",
      color: "#c62828",
      padding: "10px",
      borderRadius: "4px",
      fontSize: "14px",
      marginBottom: "15px",
      textAlign: "center",
    },
    cancelBtn: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "6px",
      marginTop: "8px",
      cursor: "pointer",
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("https://d5jzq4-8081.csb.app/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ login_name: loginName, password: password }),
      });
      const data = await res.json();
      if (res.status === 200) {
        onLogin(data);
      } else {
        setMessage(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setMessage("Lỗi kết nối server");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    if (registerData.password !== registerData.verifyPassword) {
      setMessage("Mật khẩu nhập lại không khớp!");
      return;
    }
    try {
      const res = await fetch("https://d5jzq4-8081.csb.app/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_name: registerData.username,
          password: registerData.password,
          first_name: registerData.first_name,
          last_name: registerData.last_name,
          location: registerData.location,
          description: registerData.description,
          occupation: registerData.occupation,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setMessage("Đăng ký thành công! Hãy đăng nhập.");
        setRegisterData({
          username: "", password: "", verifyPassword: "",
          first_name: "", last_name: "", location: "", description: "", occupation: "",
        });
        setIsLoginView(true);
      } else {
        setMessage(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      setMessage("Lỗi kết nối server");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>{isLoginView ? "Đăng Nhập" : "Đăng Ký"}</h3>
        
        {message && <div style={styles.error}>{message}</div>}

        {isLoginView ? (
          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Tên đăng nhập</label>
              <input 
                style={styles.input} 
                type="text" 
                value={loginName} 
                onChange={(e) => setLoginName(e.target.value)} 
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mật khẩu</label>
              <input 
                style={styles.input} 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            <button type="submit" style={styles.buttonPrimary}>Đăng nhập</button>
            <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
              Chưa có tài khoản?{" "}
              <button 
                type="button" 
                onClick={() => { setIsLoginView(false); setMessage(""); }} 
                style={styles.buttonSecondary}
              >
                Đăng ký ngay
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "5px" }}>
              {[
                { label: "Username (*)", key: "username", type: "text" },
                { label: "Mật khẩu (*)", key: "password", type: "password" },
                { label: "Xác nhận mật khẩu (*)", key: "verifyPassword", type: "password" },
                { label: "Họ (*)", key: "first_name", type: "text" },
                { label: "Tên (*)", key: "last_name", type: "text" },
                { label: "Địa chỉ", key: "location", type: "text" },
                { label: "Nghề nghiệp", key: "occupation", type: "text" },
                { label: "Mô tả", key: "description", type: "text" },
              ].map((field) => (
                <div style={styles.inputGroup} key={field.key}>
                  <label style={styles.label}>{field.label}</label>
                  <input
                    style={styles.input}
                    type={field.type}
                    value={registerData[field.key]}
                    onChange={(e) => setRegisterData({ ...registerData, [field.key]: e.target.value })}
                    required={field.label.includes("(*)")}
                  />
                </div>
              ))}
            </div>
            <button type="submit" style={styles.buttonPrimary}>Tạo tài khoản</button>
            <button 
              type="button" 
              onClick={() => { setIsLoginView(true); setMessage(""); }} 
              style={styles.cancelBtn}
            >
              Hủy bỏ
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;