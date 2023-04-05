const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
// Secret key for JWT
const JWT_SECRET = 'mysecretkey';

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

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        } else if (results.length > 0) {
            const user = results[0];
            const token = jwt.sign({ userId: user.id }, JWT_SECRET);
            res.json({ status: 'ok', accessToken: token, userData: user });
        } else {
            res.status(401).json({ status: 'error', message: 'Invalid username or password' });
        }
    });
});

app.get('/users/me', verifyToken, (req, res) => {
    const userId = req.decoded.userId;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        } else if (results.length > 0) {
            const user = results[0];
            res.json({ status: 'ok', userData: user });
        } else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
    });
});

function verifyToken(req, res, next) {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
        return;
    }
    jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error(err);
            res.status(401).json({ status: 'error', message: 'Unauthorized' });
            return;
        }
        req.decoded = decoded;
        next();
    });
}

app.post('/forgot-password', (req, res) => {
    const { username, new_password, confirm_password } = req.body;
    // ตรวจสอบว่า username ตรงกับที่อยู่ในฐานข้อมูลหรือไม่
    const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
    db.query(selectUserQuery, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            // หาก username ตรงกับในฐานข้อมูล
            const userId = results[0].id;
            if (new_password === confirm_password) {
                const updatePasswordQuery = `UPDATE users SET password = '${new_password}' WHERE id = ${userId}`;
                db.query(updatePasswordQuery, (error, results) => {
                    if (error) throw error;
                    console.log('Password updated successfully');
                    res.status(200).send('Password updated successfully');
                });
            } else {
                console.log('New password and confirm password do not match');
                res.status(400).send('New password and confirm password do not match');
            }
        } else {
            // หาก username ไม่ตรงกับในฐานข้อมูล
            console.log('Username not found');
            res.status(404).send('Username not found');
        }
    });
});

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

///web

app.post('/user/add', (req, res) => {
    const { namedoctor, username, email, password, place } = req.body
    db.query("INSERT INTO userdoctor (namedoctor,username,email,password,place) VALUES(?,?,?,?,?)", [namedoctor, username, email, password, place], (err, result) => {
        if (err)
            console.log(err);
        else {
            res.json({ message: "User Added" });
            console.log('Add user');
        }

    })
})

app.get('/userdoctor', (req, res) => {
    db.query("SELECT * FROM userdoctor", (err, result) => {
        res.send(result);
    })
})

app.post('/user/find', (req, res) => {
    const { username, password } = req.body
    db.query("SELECT * FROM userdoctor WHERE username= ? and password= ?", [username, password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                res.json({ message: "No" })
            }
            res.send(result);
            console.log("Success");
        }
    })
})

app.get("/user/dek", (req, res) => {
    db.query('SELECT * FROM index_data', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Showdata')
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});