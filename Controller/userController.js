import User from "../Models/userModel.js";
import Admin from "../Models/adminModel.js";
import Assignment from "../Models/assignmentModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

//Helper function
const generateUserId = async () => {
  try {
    // Fetch the last user from the database, sorted by user_id in descending order
    const lastUser = await User.findOne().sort({ user_Id: -1 }).exec();

    let newIdNumber = 1; // Start with 1 if no users exist

    if (lastUser && lastUser.user_Id) {
      // Extract the numeric part from the last user_id (e.g., 'USR-001' -> '001')
      const lastIdNumber = parseInt(lastUser.user_Id.split("-")[1], 10);
      newIdNumber = lastIdNumber + 1; // Increment the numeric part by 1
    }

    // Format the newIdNumber as a three-digit number with leading zeros
    const newUserId = `USR-${newIdNumber.toString().padStart(3, "0")}`;

    return newUserId;
  } catch (error) {
    console.error("Error generating user ID:", error);
    throw new Error("Unable to generate user ID");
  }
};

export const createNewUser = async (req, res) => {
  console.log(req.body);
  const { data } = req.body;
  //check for data
  if (!data) {
    return res.json({
      message: "Please provide user details.",
    });
  }

  // Email validation
  if (!validator.isEmail(data.email)) {
    return res
      .status(400)
      .json({ message: "Invalid email format. Email must contain @" });
  }
  // Password validation
  if (
    !validator.isStrongPassword(data.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      message:
        "Invalid password. Password must be 8-12 characters long, contain at least one capital letter, and one special character.",
    });
  }
  try {
    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail) {
      return res.status(404).json({ message: "Email ID already registered." });
    }
    const newUserId = await generateUserId();
    const encryptPassword = await bcrypt.hash(data.password, 12);

    const newUser = new User({
      user_Id: newUserId,
      email: data.email,
      name: data.name,
      password: encryptPassword,
    });

    await newUser.save();
    console.log("New user created successfully:", newUser);

    return res.status(201).json({
      message: "User created successfully.",
      user: {
        user_Id: newUser.user_Id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Error in creating new user: ", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "Please provide Email ID and Password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    return res.status(200).json({
      message: "Login successful.",
      user: {
        user_Id: user.user_Id,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error in Login ", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const fetchAllAdmin = async (req, res) => {
  try {
    const data = await Admin.find().select("admin_Id name");
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting Requests", error: error.message });
  }
};

export const uploadAssignment = async (req, res) => {
  const { user_name, task, admin_name } = req.body;

  if (!user_name || !task || !admin_name) {
    return res.json({ message: "Please provide all the details" });
  }
  try {
    const user = await User.findOne({ name: user_name });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fetch admin by name (assuming admin represents the admin's name in this context)
    const adminData = await Admin.findOne({ name: admin_name });
    if (!adminData) {
      return res.status(404).json({ message: "Admin not found." });
    }
    // Create a new assignment
    const newAssignment = new Assignment({
      user_name: user_name,
      task: task,
      admin_name: admin_name,
    });

    // Save the assignment to the database
    await newAssignment.save();

    return res.status(201).json({
      message: "Assignment uploaded successfully.",
      assignment: newAssignment,
    });
  } catch (error) {
    console.error("Error in uploading assignment:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
