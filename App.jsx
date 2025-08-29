import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";

function App() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const fetchPoem = async () => {
    try {
      setLoading(true);
      setError(null);

      const genAI = new GoogleGenerativeAI("AIzaSyAPFW5VF_gu-XmsPoEe6IXZK3R3fDEQ6UU");
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = "write me a sonnet about sunsets in New York";
      const result = await model.generateContent(prompt);
      const response = await result.response; 
      const text = response.text(); 
      
      setResponse(text);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching poem:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeIntervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    fetchPoem();

    const poemIntervalId = setInterval(fetchPoem, 30000);
    
    return () => {
      clearInterval(timeIntervalId);
      clearInterval(poemIntervalId);
    };
  }, []);

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "180px",
      backgroundColor: "#f5f7fa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
     
      <div style={{
        textAlign: "center",
        marginBottom: "30px",
        width: "100%",
        maxWidth: "1000px"
      }}>
        <h1 style={{
          color: "#2c3e50",
          fontSize: "2.5rem",
          marginBottom: "5px",
          fontWeight: "700"
        }}>AI Poem Generator</h1>
        <p style={{
          color: "#7f8c8d",
          fontSize: "1.1rem",
          marginBottom: "20px"
        }}>Current Time: {currentTime.toLocaleTimeString()}</p>
      </div>

      
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        maxWidth: "1000px",
        width: "100%",
        margin: "0 auto"
      }}>
       
        <div style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "450px",
          minHeight: "500px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h2 style={{ 
            textAlign: "center",
            color: "#2c3e50",
            marginBottom: "25px",
            fontSize: "1.8rem"
          }}>Your Generated Poem</h2>
          {loading ? (
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center",
              flex: "1"
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3498db",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "20px"
              }}></div>
              <p style={{ color: "#7f8c8d" }}>Generating your poem...</p>
            </div>
          ) : error ? (
            <div style={{ 
              textAlign: "center",
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <h3 style={{ color: "#c62828", marginBottom: "15px" }}>Error</h3>
              <p style={{ color: "#c62828", marginBottom: "20px" }}>{error}</p>
              <button 
                onClick={fetchPoem}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div style={{
              whiteSpace: "pre-line",
              lineHeight: "1.8",
              fontSize: "1.1rem",
              textAlign: "center",
              color: "#34495e",
              fontStyle: "italic",
              flex: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {response}
            </div>
          )}
        </div>
        
        
        <div style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "450px",
          minHeight: "500px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <h3 style={{ 
            textAlign: "center",
            color: "#2c3e50",
            marginBottom: "25px",
            fontSize: "1.8rem"
          }}></h3>
          
          <div style={{
            width: "100%",
            height: "350px",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "20px",
            backgroundColor: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <img 
              src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Nature" 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
          
          <p style={{
            color: "#7f8c8d",
            fontSize: "1rem",
            textAlign: "center"
          }}>Where wonder grows wild</p>
        </div>
      </div>

      
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
        width: "100%",
        maxWidth: "1000px"
      }}>
        <button 
          onClick={fetchPoem}
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: loading ? "#95a5a6" : "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
          }}
        >
          {loading ? "Generating..." : "Generate New Poem"}
        </button>
      </div>

      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default App;