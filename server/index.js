require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path")
// const authRoutes = require('./routes/auth.routes');
// const userRoutes = require('./routes/user.routes');
// const bookRoutes = require('./routes/book.routes');
// const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
const PORT = process.env.PORT ?? 5000;
const origin = process.env.PRODUCTION === 'true' ? process.env.DEPLOY_CLIENT_URL : process.env.LOCAL_CLIENT_URL;

// middlewares
app.use(express.json());
// app.use(express.urlencoded({extended: false}));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use(cookieParser());
app.use(cors({ credentials: true, origin }));

// Routes
// app.use('/api/book', bookRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);

// app.use(errorMiddleware);

// Server
(async () => {
    try {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
})();
