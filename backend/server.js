require("dotenv").config();
const express = require("express"); 
const cors = require("cors");
const path = require("path"); 
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();

// Middleware to handle CORS 

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["POST","PUT","PATCH","GET","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

// Middleware to parse json object

app.use(
  express.json()
);

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploads folder 
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

const port = process.env.PORT || 3000 ;

// Start the server

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

