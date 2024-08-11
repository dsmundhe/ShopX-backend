const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userController = {
  // For registering a user
  register: async (req, res) => {
    try {
      // Access name, email, and password from body
      const { name, email, password } = req.body;

      // Validate password presence
      if (!password) {
        return res.json({ message: "Password is required." });
      }

      // Check if email is already registered
      const emails = await userModel.findOne({ email });

      // Email check in collection; if present, it will not register
      if (emails) {
        return res.json({ message: "Email already registered." });
      }

      // Check if password length is less than 6
      if (password.length < 6) {
        return res.json({ message: "Password must be more than 6 characters." });
      }

      // Convert password to hash code, here we pass (element and length)
      const passwordHash = await bcrypt.hash(password, 10);

      // Data pass in newUser through userModel
      const newUser = new userModel({
        name: name,
        email: email,
        password: passwordHash,
      });

      // All conditions satisfied, it will register the new user
      await newUser.save();
      res.json({
        msg: "User registration successful.",
        success: "Sign up dm successful...",
      });
    } catch (error) {
      // If an error is generated, then this block will run
      res
        .status(500)
        .json({ message: "Registration failed. Please try again later." });
      console.error("Registration error:", error.message);
    }
  },

  // For logging in a user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await userModel.findOne({ email });

      if (!user) return res.json({ msg: "Invalid email and password." });

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.json({ msg: "Invalid password." });

      // Generate a simple session token (for demonstration purposes)
      const sessionToken = Math.random().toString(36).substring(2);

      // Save the session token to the database
      user.sessionToken = sessionToken;
      await user.save();

      // Return a successful login response with the session token
      res.json({
        msg: "Login successful.",
        success: "Login successful",
        sessionToken,
      });
    } catch (error) {
      res.json({ msg: error.message });
    }
  },

  // For logging out a user
  logout: async (req, res) => {
    try {
      const { email, sessionToken } = req.body;

      // Find the user by email
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.json({ msg: "User not found." });
      }

      // Check if the session token matches
      if (user.sessionToken !== sessionToken) {
        return res.json({ msg: "Invalid session token." });
      }

      // Invalidate the session token by setting it to null
      user.sessionToken = null;
      await user.save();

      // Return a successful logout response
      res.json({ msg: "Logout successful." });
    } catch (error) {
      res.json({ msg: "Error occurred during logout.", error: error.message });
    }
  },
  addcart: async (req, res) => {
    try {
      const { id } = req.body;
      const { data } = req.body;
      const { email } = req.body;
      const user = await userModel.findOne({ email });

      await user.updateOne({ $push: { cart: data } });
      res.json({ msg: "cart inserted......" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
  showcart: async (req, res) => {
    try {
      const { email } = req.body;
      // Find the user by email

      const user = await userModel.findOne({ email: email });
      // If user not found
      if (!user) {
        return res.json({ msg: "User not found" });
      }
      // If password matches, return the cart data
      const result = user.cart;
      res.json(result);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  removecart: async (req, res) => {
    try {
      const { email, id } = req.body;
      const user = await userModel.findOne({ email });
      let result = await user.cart;
      result = await result.filter((val) => {
        return val.id !== id;
      });
      await user.updateOne({ $set: { cart: result } });
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
};

// Export userController to access this function in other files
module.exports = userController;
