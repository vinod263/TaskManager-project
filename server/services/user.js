const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    // console.log(username, email, password);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters long" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const checkUser = await User.findOne({ $or: [{ email }, { username }] });
    if (checkUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email or username" });
    } else {
      const newUser = new User({
        username,
        email,
        password,
      });
      const hashpass = await bcrypt.hash(password, 10);
      newUser.password = hashpass;
      await newUser.save();
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, (err, data) => {
        if (data) {
          const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );
     res.cookie("tasktoken", token, {
  httpOnly: true,
  secure: false,        // force off in local dev
  sameSite: "Lax"       // allows cross-origin from React
});

          return res.status(200).json({success :"login Success"});
        }
        else{
          return res.status(400).json({error:"invalid credentials"})
        }
      });
    }
  } catch (error) {
    return res.status(404).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("tasktoken", {
      httpOnly: true,
    });
    res.json({ message: "Logged Out" }); 
  } catch (error) {
    return res.status(404).json({ error: "server error" });
  }
};

const userDetails= async (req, res) =>{
  try {
    const { user } = req;
    const getDetails = await User.findById(user._id)
    .populate("tasks")
    .select("-password");
    if(getDetails ){
      const allTAsk = getDetails.tasks;
      let yetToStart =[];
      let inProgress = [];
      let Completed = [];
      allTAsk.map((item) => {
        if(item.status ==="yetToStart"){
          yetToStart.push(item);
        }else if(item.status === "completed") {
          Completed.push(item);
        }else {
          inProgress.push(item);
        }
      });
      console.log(getDetails);
      return  res.status(200).json({success:"success",
        tasks:[{yetToStart},{inProgress},{Completed}],
      });
    
 } } catch (error) {
     return res.status(404).json({ error: "server error" });
  }
};
module.exports = { register, login, logout, userDetails};
