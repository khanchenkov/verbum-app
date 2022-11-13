require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const errorMiddleware = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();
const PORT = process.env.PORT ?? 5000;
const origin = process.env.PRODUCTION === "true" ? process.env.DEPLOY_CLIENT_URL : process.env.LOCAL_CLIENT_URL;

// middlewares
app.use(express.json());
app.use(helmet());
app.use("/data", express.static(path.join(__dirname, "data")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cookieParser());
app.use(cors({ credentials: true, origin }));


//psql --host=ec2-44-195-132-31.compute-1.amazonaws.com --port=5432 --username=ptqbzwkkpbuwjx --password --dbname=d2trdpphcvp741
//d75c5cdefebadbf3763aa25419f95c8711b17c0c1704b9988e80846f725c886b
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);

app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, "public")));
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

(async () => {
    try {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
})();
