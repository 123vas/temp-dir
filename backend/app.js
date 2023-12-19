// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt=require("bcrypt")
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
// app.use("/send",send)

// Connect to MySQL database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'vivekk07',
  database: 'coal_mine',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to handle mine registeration
app.post('/mine/register', (req, res) => {
  const { user, id, loc  } = req.body;

  if ( !user || !id || !loc) {
    return res.status(400).json({ message: 'All fields are mandatory' });
  }

  // Save data to the database
  const sql = 'INSERT INTO mine_master (mine_name, mine_id,mine_location) VALUES (?, ?,?)';
  connection.query(sql, [user, id,loc], (error, results) => {
    if (error) {
      console.error('Error saving user to MySQL:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: 'User registered successfully' });
  });
});



// Route to fetch opening entry
app.get('/get-opening-entry', (req, res) => {
  // const mineId = req.query.mine_id;
  const mineId = req.params.mineId;
  if (!mineId) {
    res.status(400).json({ error: 'Missing mine_id parameter' });
  }

  // const query = 'SELECT opening_entry FROM adjustment_entry WHERE mine_id = ?';
  const query = 'SELECT mm.mine_id,mm.mine_name,mm.mine_location,ae.opening_entry FROM mine_master AS mm join adjustment_entry as ae on ae.mine_id = mm.mine_id where ae.mine_id=?';
  connection.query(query, [mineId], (err, results) => {
    if (err) {
      console.error('Error fetching opening entry data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
      // const openingEntry = results.length > 0 ? results[0].opening_entry : null;
    return  res.json(results);
    
  });
});




//user registeration
app.post('/user-data/register', (req, res) => {
  const { name, username, mine_id, mine_name, mine_location, password } = req.body;

  // Check if the username already exists
  const usernameQuery = 'SELECT * FROM user_master WHERE user_name = ?';
  connection.query(usernameQuery, [username], (checkErr, checkResults) => {
    if (checkErr) {
      // Handle database error
      console.error('Database error:', checkErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (checkResults.length > 0) {
      // Username already taken
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the plaintext password using bcrypt
    bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
      if (hashErr) {
        // Handle hashing error
        console.error('Hashing error:', hashErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Store hashedPassword in the database along with other user details
      const insertQuery = 'INSERT INTO user_master (name, user_name, mine_id, mine_name, location, password) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(insertQuery, [name, username, mine_id, mine_name, mine_location, hashedPassword], (insertErr, insertResults) => {
        if (insertErr) {
          // Handle insertion error
          console.error('Insertion error:', insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
});

app.post('/authenticate/login', (req, res) => {
  const { users, pwd } = req.body;

  if (!users || !pwd) {
    return res.status(400).json({ success: false, error: 'Username and password are required' });
  }

  const query = 'SELECT * FROM user_master WHERE user_name = ?';

  connection.query(query, [users], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

    if (results.length === 1) {
      const hashedPassword = results[0].Password;

      // Compare the provided password with the hashed password from the database
      bcrypt.compare(pwd, hashedPassword, (compareErr, match) => {
        if (compareErr) {
          console.error('Bcrypt compare error:', compareErr);
          return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

        if (match) {
          // If login is successful, you can send additional data or a success message
          const { mineId } = results[0];
          //create token
          const token = jwt.sign({mineId}, "our-jsonwebtoken-secret-key", {expiresIn:'1d'});
          console.log('Generated token:', token);
          res.cookie('token', token, { httpOnly: true /*, secure: true (if served over HTTPS)*/ });
          res.json({ token }); 
          return res.status(200).json({ success: true, message: mineId });
        } else {
          // If login fails, return an error message
          return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
      });
    } else {
      // If username is not found, return an error message
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
  });
});


// app.post('/authenticate/login', (req, res) => {
//   const { users, pwd } = req.body;

//   if (!users || !pwd) {
//     return res.status(400).json({ success: false, error: 'Username and password are required' });
//   }

//   const query = 'SELECT * FROM user_master WHERE user_name = ? AND Password = ?';

//   connection.query(query, [users, pwd], (err, results) => {
//     if (err) {
//       console.error('MySQL query error:', err);
//       return res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }

//     if (results.length === 1) {
//       // If login is successful, you can send additional data or a success message
//        const { mineId } = results[0];
//       return res.status(200).json({ success: true, message:mineId });
//     } else {
//       // If login fails, return an error message
//       return res.status(401).json({ success: false, error: 'Invalid username or password' });
//     }
//   });
// });




//test  opening entry



// Route to fetch mine ID
app.get('/fetch-data/mines', (req, res) => {
  const query = 'SELECT mine_id, mine_name, mine_location FROM mine_master';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching mine data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ mines: results });
    }
  });
});

//railway requwst
app.post('/Request-entry', (req, res) => {
  const {
    request_id,
    received_quantity,
    mine_id,
    Customer_id,
    Customer_name,
    Schedule_in_time,
    Schedule_in_date,
    Schedule_out_time,
    Schedule_out_date,
  } = req.body;

  const query = 'INSERT INTO request_scheduled (Request_ID,mine_id,Customer_ID,Customer_Name,Quantity,Scheduled_In_Date,Scheduled_In_Time,Scheduled_Out_date,Scheduled_Out_time) VALUES (?, ?,?, ?, ?, ?, ?, ?,?) ';
  connection.query(query, [request_id,mine_id,Customer_id,Customer_name,received_quantity,Schedule_in_date,Schedule_in_time,Schedule_out_date,Schedule_out_time], (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});

//route to send request scheduled data for all mine
// request-scheduled table
app.get('/requestScheduled', (req, res) => {
  
  const query = 'SELECT rs.Request_ID,rs.mine_id,rs.Customer_ID,rs.Customer_Name,rs.Quantity,rs.Scheduled_In_Date,rs.Scheduled_In_Time,rs.Scheduled_Out_date,rs.Scheduled_Out_time ,ae.opening_entry from request_scheduled AS rs JOIN adjustment_entry AS ae ON ae.mine_id = rs.mine_id order by Scheduled_In_Date desc';
  connection.query(query, (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching request-scheduled' });
      res.status(500).send('Internal Server Error');
      console.error('Error fetching data:', error);
    }
    else {
      res.status(500).json({ request_scheduled: result });
    }
  })
})
//to send data of inward entry to db
// inward entry data
app.post('/inward-entry', (req, res) => {
  const {
    request_id,
    received_quantity,
    mine_id,
    mine_name,
    mine_location,
    time,
    date,
  } = req.body;

  const query = 'INSERT INTO inward_entry (request_id,received_quantity,mine_id, mine_name, mine_location, time,date_) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [request_id, received_quantity, mine_id, mine_name, mine_location, time, date], (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});


// outward-entry 
app.post('/outward-entry',(req,res)=>{
  const {
    request_id,
    out_quantity,
    date,
    rake_no,
    customer_id,
    customer_name} = req.body;
    
  const query = 'INSERT INTO outward_entry (request_id,out_quantity,date_,rake_no,customer_id,customer_name) VALUES (?,?,?,?,?,?)';
  connection.query(query,[request_id,out_quantity,date,rake_no,customer_id,customer_name],(err,result)=>{
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});


app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});


// jwt code
// const secretKey = 'your_secret_key';

// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(403).json({ success: false, message: 'No token provided.' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'Failed to authenticate token.' });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

// API endpoint for user login
// app.post('/loginjwt', (req, res) => {
//   const { username, password } = req.body;

//   // Replace with your actual database table and column names
//   const query = `SELECT * FROM user_master WHERE username = ? AND Password = ?`;

//   db.query(query, [username, password], (err, results) => {
//     if (err) throw err;

//     if (results.length > 0) {
//       const user = results[0];
//       const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
//         expiresIn: 10, // Token expires in 24 hours
//       });
//       res.json({ success: true, message: 'Login successful', token });
//     } else {
//       res.json({ success: false, message: 'Invalid username or password' });
//     }
//   });
// });
app.post('/logout', (req, res) => {
  // Clear the 'token' cookie

  res.clearCookie('token');
  console.log('token',token);
  res.send('Logged out successfully');
});


// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if(!token){
//     return res.json({Message: 'we need token please provide it.'})
//   }else{
//     jwt.verify(token,"our-jsonwebtoken-secret-key", (err, decoded) =>{
//       if(err){
//         return res.json({Message: 'Authentication Error.'})
//       }else{
//         req.name = decoded.name;
//         next();
//       }
//     })
//   }
// }

// app.get('/', verifyUser,(req, res) => {
//   return res.json({Status: 'Success', name: req.name})
// })

// // API endpoint for a protected resource
// app.get('/protected', verifyToken, (req, res) => {
//   res.json({ success: true, message: 'This is a protected resource.' });
// });
