const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.json({limit: '100mb'}));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: 'Wearable-2023'
})

app.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err: "Error fetching users" });
        } else {
            res.send(result);
        }
    });
});
//try
/*app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return res.status(401).json({ error: "Access token is missing" });
    }
    // Verify the access token
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const userIdFromToken = decoded.userId;
        if (userIdFromToken != userId) {
            return res.status(403).json({ error: "Access denied" });
        }
        // Fetch the user data
        db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Error fetching user" });
            } else if (result.length == 0) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.json(result[0]);
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid access token" });
    }
});*/


app.post("/show/index", (req, res) => {
    const { date, date2 } = req.body
    console.log(date, date2);
    db.query("SELECT * FROM index_data WHERE date > ? AND date < ?", [date, date2], (err, result) => {
        if (err) {
            console.log(err)
            res.json({ message: err })
        }
        else {
            //console.log(date)
            console.log("/api/sensor date:", result)
            res.json({ data: result })
        }
    })
})

app.post("/add", (req, res) => {
    const { email, username, password, fullname, surname, weight, high, age, gender, details } = req.body
    db.query('INSERT INTO users (email,username,password,fullname,surname,weight,high,age,gender,details) VALUES(?,?,?,?,?,?,?,?,?,?)', [email, username, password, fullname, surname, weight, high, age, gender, details], (err, result) => {
        if (err) {
            console.log(err)
            res.json({ message: "User Add" })
        } else if (result.lenght > 0) {
            res.json({ status: 'ok' })
            const lastInsertId = result.insertId;
            console.log("Last inserted ID:", lastInsertId);
            res.json({ status: 'ok', lastInsertId: lastInsertId })
        } else {
            res.json({ status: 'err' })
        }
    })
})

/*app.post("/add"),(req,res) => {
    const {email,username,password,fullname,surname,weight,high,age,gender,details} = req.body
    db.query('INSERT INTO users (email,username,password,fullname,surname,weight,high,age,gender,details) VALUES(?,?,?,?,?,?,?,?,?,?)',[email,username,password,fullname,surname,weight,high,age,gender,details],(err,result) => {
        if (err){
            console.log(err)
            res.json({message:"User Add"})
        } else if(result.length > 0) {
            const lastInsertId = result.insertId;
            console.log("Last inserted ID:", lastInsertId);
            res.json({status: 'ok', lastInsertId: lastInsertId})
        } else {
            res.json({status: 'err'})
        }
    })
}*/

app.get("/add/index/show", (req, res) => {
    db.query('SELECT * FROM index_data', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Showdata')
            res.send(result);
        }
    })
})
//ADC11,ADC12,ADC13,ADC14,ADC21,ADC22,ADC23,ADC24,ADC31,ADC32,ADC33,ADC34
app.post("/add/index", (req, res) => {
    const { ADC11, ADC12, ADC13, ADC14, ADC21, ADC22, ADC23, ADC24, ADC31, ADC32, ADC33, ADC34 } = req.body
    db.query('INSERT INTO index_data (ADC11,ADC12,ADC13,ADC14,ADC21,ADC22,ADC23,ADC24,ADC31,ADC32,ADC33,ADC34) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [ADC11, ADC12, ADC13, ADC14, ADC21, ADC22, ADC23, ADC24, ADC31, ADC32, ADC33, ADC34], (err, result) => {
        console.log(req.body)
        if (err) {
            console.log(err)
            res.json({ message: "Index add" })
        } else {
            res.json({ status: 'error' })
            //console.log(result)
            console.log('Add data Success')
        }
    })
})
/*app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: 'error', message: 'An unexpected error occurred. Please try again later.' });
            return;
        }
        if (result.length === 0) {
            res.status(401).json({ status: 'error', message: 'Invalid username or password.' });
            return;
        }
        const user = result[0];
        const accessToken = jwt.sign({ userId: user.id }, 'your_secret_key');

        jwt.verify(accessToken, 'your_secret_key', (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({ status: 'error', message: 'Invalid access token.' });
                return;
            }
            const userId = decoded.userId;
            db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ status: 'error', message: 'An unexpected error occurred. Please try again later.' });
                    return;
                }
                if (result.length === 0) {
                    res.status(404).json({ status: 'error', message: 'User not found.' });
                    return;
                }
                const userData = result[0];
                res.json({ status: 'ok', message: 'Successfully logged in.', accessToken, userId: user.id, userData });
            });
        });
    });
});*/
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ status: 'error', message: 'An unexpected error occurred. Please try again later.' });
            return;
        }
        if (result.length === 0) {
            res.status(401).json({ status: 'error', message: 'Invalid username or password.' });
            return;
        }
        const user = result[0];
        const accessToken = jwt.sign({ userId: user.id }, 'your_secret_key');
        getUserData(username, (err, userData) => {
            if (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'An unexpected error occurred. Please try again later.' });
                return;
            }
            res.json({ status: 'ok', message: 'Successfully logged in.', accessToken, userId: user.id, userData });
        });
    });
});

function getUserData(username, callback) {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        if (result.length === 0) {
            callback(new Error('User not found.'));
            return;
        }
        const userData = result[0];
        callback(null, userData);
    });
}

app.get("/users/:username", (req, res) => {
    const { username } = req.params;
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return res.status(401).json({ error: "Access token is missing" });
    }
    // Verify the access token
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        // Fetch the user data
        db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Error fetching user" });
            } else if (result.length == 0) {
                res.status(404).json({ error: "User not found" });
            } else {
                const userData = result[0];
                if (decoded.userId != userData.id) {
                    return res.status(403).json({ error: "Access denied" });
                }
                res.json(userData);
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid access token" });
    }
});

app.post("/add_data", (req, res) => {
    console.log("Received POST request"); // Add this line
    const { data } = req.body; // assuming data is sent in the format {data: 'your_data'}
    try {
        const jsonData = JSON.parse(data);
        // Save jsonData to MySQL database
        db.query('INSERT INTO arduino_data SET ?', jsonData, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error saving data" })
            } else {
                console.log(result)
                res.json({ message: "Data saved" })
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Invalid JSON data" });
    }
})



app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});