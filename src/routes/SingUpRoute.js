const router = require("express").Router();
const path = require("path");
const fs = require("fs/promises");

router.get("/", (req, res) => {
    res.render("signup", {
        title: "SIGN UP",
    });
});
router.post("/", async (req, res) => {
    try {
        const {full_name, username, password} = req.body

        if(password.length < 7) {
            throw new Error("Password must be at least 6 chars")
        }

        let dbPath = path.join(__dirname, "..", "db", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        let isUserExists = db.users.find(user => user.username === username.toLowerCase())

        if(isUserExists) {
            throw new Error("User already exists")
        }

        db.users.push({
            id: db.users.length + 1,
            full_name: full_name,
            username: username.toLowerCase(),
            password: password
        })

        await fs.writeFile(dbPath, JSON.stringify(db))

        res.redirect("/login")
        
    } catch(e) {
        res.render("signup", {
            title: "SIGN UP",
            error: e + ""
        })
    }
});

module.exports = {
    path: "/signup",
    router,
};
