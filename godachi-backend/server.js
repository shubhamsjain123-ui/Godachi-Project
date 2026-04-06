require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require('helmet')
const ejs = require('ejs');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");


require("./config/modelConfig")

const app = express();
app.engine('html', ejs.renderFile);
const port = process.env.PORT || 5000;

//app.disable('x-powered-by');
//app.use(express.static(path.join(__dirname, "../admin/public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())

app.use(mongoSanitize());
app.use(compression());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(bodyParser.json({ limit: "1gb", parameterLimit: 50000 }));
app.use(
  bodyParser.urlencoded({ limit: "1gb", extended: true, parameterLimit: 50000 })
);


// const uri = process.env.MAINDB_URL;
// mongoose.set('strictQuery', false);
// mongoose.connect(uri);

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("connection MongoDB");
// });

const apiRoutes = require('./routes');
app.use('/', apiRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
