require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorMiddleware = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require('./routes/book.routes');

const app = express();
const PORT = process.env.PORT ?? 5000;
const origin = process.env.PRODUCTION === "true" ? process.env.DEPLOY_CLIENT_URL : process.env.LOCAL_CLIENT_URL;

// middlewares
app.use(express.json());
// app.use(express.urlencoded({extended: false})); TODO
app.use("/data", express.static(path.join(__dirname, "data")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cookieParser());
app.use(cors({ credentials: true, origin }));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);

app.use(errorMiddleware);

(async () => {
    try {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
})();
