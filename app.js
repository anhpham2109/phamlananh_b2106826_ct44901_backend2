const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

// Định tuyến API
app.use("/api/contacts", contactsRouter);

// Route mặc định
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

// Middleware xử lý yêu cầu không hợp lệ (404)
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
