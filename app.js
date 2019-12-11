const express = require("express"); // This is the framework we are using to build the server
const exphbs = require("express-handlebars"); // This is the templating engine we will use for the views
const mongoose = require("mongoose"); // This is the ODM (Object data modelling) package
const bodyParser = require("body-parser"); // Makes our stream data useable
const methodOverride = require("method-override"); // Allows us to use PUT/PATCH/DELETE, because the browser only has get&post
const app = express(); // This creates the express app. Notice that it is a function. Dont pass this around the app!
const port = 3000; // A variable to hold our port number. This will be used to start the server
const routes = require("./routes");

// This is connecting the db. It will create a new db if one doesnt exist already
// The options object as the second argument is to address deprication warnings

mongoose.connect("mongodb://localhost/books_r_us", {
  useNewUrlParser: true
});

mongoose.Promise = global.Promise; // Telling mongoose to use the Node Promise library.
mongoose.connection.on("error", err => console.log(err)); // Log out the error if there is one

// NB expess is unopiniated but handlebars is not. It needs a few files set out for it.
// It needs a layouts views folder, layouts folder and a main.handlebars inside that
// Inside of main.handlebars add {{{body}}} between the <body> tags

app.engine("handlebars", exphbs({ defaultLayout: "main" })); // Telling express that we need to use handlebars
app.set("view engine", "handlebars"); // Setting the view engine to be handlebars

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// When we receive data from an http request, it is not in a format that we can automatically use
// It is in the form of a stream. The below 2 lines of code convert it for us.
// app.use, is a flag that it is a piece of global middleware. ie the whole app will use it
// Essentially a funnel to make sure the correct data comes into our app

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes); // Requires in the routes

// This is the code that will turn the web server 'on'
app.listen(port, () => console.log(`Server is listening on port ${port}`));
