const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");


const SECRET_KEY = "mysecretkey"; // use .env in real projects

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ error: "Username or email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log("New user created: ", newUser);
    
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Signup failed in auth controller" });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Accept username OR email in a single field
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }]
    });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log("user: ",  req.user);
    res.json({ message: "Profile data", user });
  } catch (err) {
    res.status(500).json({ error: "Fetching profile failed" });
  }
};

module.exports = { signup, login, profile };
