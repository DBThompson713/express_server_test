# Step - 1
### Starting point

- If you are reading this you have successfully cloned this lessons repo. **Go you**
- Run an npm install. We need to do this because we dont push up node_modules so we need to manually install them
- Run npm `run npm server` and navigate to `http://localhost:3000/authors`
- Run `git branch -a` to see all the available branches. 
- You can check out to any step of the lesson by typing in `git checkout <branch_name>`
- Possible errors for this step
    - You forgot to cd into your directory before funning npm install
    - You forgot to cd into your directory before funning npm run server
    - There is something already running on 3000. Either choose a different port or run 
    `lsof -ti:3000 | xargs kill` to kill the port and then run `run npm server` again.
---

# Step - 2
### Creating a full crud resource
- Create a Show route for Authors: 
in routes.js add `router.get("/authors/:id", AuthorController.show)`
- Create a Show controller for Authors in the author_controller.js (dont forget to export the new function): 

```
async function show(req, res) {
  let { id } = req.params;
  let author = await AuthorModel.findById(id);
  res.render("author/show", { author });
}
```
- Create the show.handlebars for Authors in the views/author directory:

```
<h1>Author</h1>
<p>Name: {{author.name}} </p>
<p>Bio: {{author.bio}}</p>
<p>Gender: {{author.bio}}</p>
```

- Create a Link to the Show Author page. (Done on the index page)

```
<a href="/authors/{{this._id}}">View Author</a>
```
- Add a link to the index page for UPDATE and DELETE authors. To get you started here is the link you will need to delete a author. NB it is not attached to a controller or view yet.
`<a href="/authors/{{this._id}}?_method=DELETE">Delete Author</a>`

- Possible errors for this step 
    - Typos (its always a typo)
    - You forgot to export the show function
    - Using 'this.' instead of 'author.'
    - Not having the `?_method=DELETE"` on your link tag

### Step 2 Challenge

- Create the delete method
- Create an update method, and views

# Step - 3 Update and Delete for Authors
### Update and Delete for Authors

- The routes for the challenge:
    - `router.get("/authors/:id/edit", AuthorController.edit);`
    - `router.patch("/authors/:id", AuthorController.update);`
    - `router.put("/authors/:id", AuthorController.update);`
    - `router.delete("/authors/:id", AuthorController.destroy);`

- The controllers for the challenge:
    - Edit: Shows the form to edit the resource
    ```
    async function edit(req, res) {
    let { id } = req.params;
    let author = await AuthorModel.findById(id);
    res.render("author/edit", { author });
    }
    ```
    - Update: Updates the resource
    ```
    async function update(req, res) {
    let { name, bio, gender } = req.body;
    let { id } = req.params;
    await AuthorModel.findByIdAndUpdate(id, { name, bio, gender });
    res.redirect(`/authors/${id}`);
    }
    ```
    - Destroy: Deletes the resource
    ```
    async function destroy(req, res) {
    let { id } = req.params;
    await AuthorModel.findByIdAndRemove(id);
    res.redirect("/authors");
    }
    ```
    - Dont forget to export our new functions



- The views for the challenge:
    - Add the link to the author/index.handlebars page `<a href="/authors/{{this._id}}/edit">Edit Author</a>`
    - Create a edit.handlebars in `views/author/edit.handlebars`
    ```
    <h1>New Author</h1>
    <form method="post" action="/authors/?_method=PUT">
    <div>
        <label>Name</label>
    </div>
    <div>
        <input type="text" name="name" value="" />
    </div>
    <div>
        <label>Bio</label>
    </div>
    <div>
        <textarea name="bio"></textarea>
    </div>
    <div>
        <label>Gender</label>
    </div>
    <div>
        <select name="gender">
            <option value="" hidden selected></option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="non binary">non binary</option>
        </select>
    </div>
    <div>
        <input type="submit" value="Submit Form" />
    </div>
    </form>
    ```

- What if we want to add a different resource into this app? eg. What if we wanted to add in a books controller? The routes file would get very large. Node allows us to split out the file further. This is a "Garret convention"
    - Create a new directory in the root called routes. 
    - Create a new file in the routs directory called index.js. 
    - Copy everything out of the original routes.js file and paste it into the index.js file inside the routes directory
    - Change the relative path for the import of the controller
    `const AuthorController = require('./../controllers/author_controller')` 
    - This should still will work as is. But we can do one better
    - create a new file called author_routes.js inside of the routes directory
    `routes/author_routes.js`
    - Once again copy everything from index.js and paste it into author_routes.js
    - Then in index.js we can add this code. 
    ```
    const express = require("express");
    const router = express.Router();
    const authorRoutes = require("./author_routes");
    router.use("/authors", authorRoutes);
    module.exports = router;
    ```
    - This has set up our routes/index.js file to hold all our separate routes files.
    - we can now remove all '/authors' from our author_routes.js file

- Possible errors for this step
    - Forgot the '( )' at the end of `const router = express.Router()`
    - Forgot to export the functions
    - Having a plural or not having a plural where there should be one

# Step - 5
### Books Books Books

- This is the main part of the lesson! 
- We Are going to create a Brand new resourse. 
- To do this we are going to need:
    - Book Routes
    - Book Controllers
    - Book Model
    - Book Schema
    - Book Views
- I would suggest copy pasting the above files and making edits where you see fit. 

- Possible errors for this step
    - Forgetting any of the above or not changing a copied file from Author to Book

# Step - 6
### Normalizing
- intro
    - Mongo is a noSQL db. Therefore we do not have relationships
    - However we can fake it with normalizing
    - Normalizing can be throught of referencing other document object ids directly into another document
    - In otherwords we reference it. It is very similar to a foreign key from postgres
    - The **big** difference is that in SQL dbs using a foreign key, it makes 1 query
    - However in Mongo it has to make 2. So we want to use it sparingly.
    - We have to make the DB design decision based on our requirements and how we want to query our data. 
    - For the use of our current app we are only ever going to whow the author of the book when we click on the book. Ie only in the book show.
- Save the author of a book on the book schema.
    - NB the mongoose.Schema.Types.ObjectId is a special 'data type'
    - It looks at the next ref key to know which collection to reference
    ```
    const BookSchema = new Schema({
    name: {
    type: String,
    required: true
    },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author'
        }
    })
    ```
- Now we need to address the book controllers to save an author
    ```
    async function create(req, res) {
    let { title, published, author } = req.body;
    let book = await BookModel.create({ title, published, author }).catch(err =>
    res.status(500).send(err)
    );
    res.redirect(`/books/${book._id}`);
    }
    ```

    ```
    async function make(req, res) {
    let authors = await AuthorModel.find().select("_id name");
    res.render("book/new", { authors });
    }
    ```

    ```
    async function show(req, res) {
    let { id } = req.params;
    let book = await BookModel.findById(id).populate("author");
    res.render("book/show", { book });
    }
    ```
- Add in an input box on the book/new.handlebars
```
    <h1>New Book</h1>

    <form method="post" action="/books">
    <div>
        <label>Name</label>
    </div>
    <div>
        <input type="text" name="name" />
    </div>
    <div>
        <label>Author</label>
    </div>
    <div>
        <select name="author">

            <option value=""></option>

        </select>
    </div>
    <div>
        <input type="submit" value="Submit Form" />
    </div>
    </form>
```
- Now When we are looking at the show page of the book. The db makes two requests. This is acceptabe. 
- However if we were to display the author name on the index page then the db will make 1 query for all the books and 1 more for every book author. Which could be 1000s! (Dont do this)
