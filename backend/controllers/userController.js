import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user

const loginUser = async (req, res) => {
  console.log("Login attempt for email:", req.body.email); // Log login attempts
  console.log("Request body:", req.body); // Log the entire request body for debugging
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  console.log("User found:", user);
  try {
    const user = await userModel.findOne({ email });
    console.log("User found:", user); // Log the user found for debugging
    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" }); // Use 404 status code
    }
    const isMatch =await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" }); // Use 401 status code
    }
    const role=user.role;
    const token = createToken(user._id);
    console.log("Login successful for user:", user.email); // Log successful login
    res.json({ success: true, token, role });
  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: "Error during login" });
  }
};

// Create token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate incoming data
  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {
    // checking user is already exist
    const exists = await userModel.findOne({ email });
    console.log("Checking if user exists:", email); // Log the email being checked
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // hashing user password

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      role: "admin" // Assign the role of admin
    });
    console.log("New user created:", newUser); // Log the new user details
    console.log("Attempting to save user to database..."); // Log before saving


    const user = await newUser.save();
    const role=user.role;
    const token = createToken(user._id);
    res.json({ success: true, token, role });
    console.log("User registered successfully:", user.email); // Log successful registration
    console.log("User registered successfully:", user.email); // Log successful registration
  } catch (error) {
    console.error("Login error:", error); // Log login errors
    res.json({ success: false, message: "Error during registration" });
  }
};

export { loginUser, registerUser };
