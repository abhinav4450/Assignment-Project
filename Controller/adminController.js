import Admin from '../Models/adminModel.js';
import Assignment from '../Models/assignmentModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';

//Helper function
const generateAdminId= async()=>{
  try {
    // Fetch the last user from the database, sorted by user_id in descending order
    const lastAdmin = await Admin.findOne().sort({ admin_Id: -1 }).exec();

    let newIdNumber = 1; // Start with 1 if no users exist

    if (lastAdmin && lastAdmin.admin_Id) {
      // Extract the numeric part from the last user_id (e.g., 'USR-001' -> '001')
      const lastIdNumber = parseInt(lastAdmin.admin_Id.split('-')[1], 10);
      newIdNumber = lastIdNumber + 1; // Increment the numeric part by 1
    }

    // Format the newIdNumber as a three-digit number with leading zeros
    const newAdminId = `Admin-${newIdNumber.toString().padStart(3, '0')}`;

    return newAdminId;
  } catch (error) {
    console.error('Error generating Admin ID:', error);
    throw new Error('Unable to generate Admin ID');
  }
}

export const createNewAdmin = async (req, res) => {
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
  try{
  const existingEmail= await Admin.findOne({email: data.email});
  if(existingEmail){
    return res.status(404).json({ message: "Email ID already registered." });
  }
   const newAdminId=await generateAdminId();
   const encryptPassword = await bcrypt.hash(data.password, 12);

   const newAdmin=new Admin({
    admin_Id:newAdminId,
    email:data.email,
    name:data.name,
    password:encryptPassword,
   });

   await newAdmin.save();
   console.log('New Admin created successfully:', newAdmin);
   
   return res.status(201).json({
    message: "Admin created successfully.",
    user: {
      admin_Id: newAdmin.admin_Id,
      email: newAdmin.email,
      name: newAdmin.name,
    },
  });
}catch(error){
  console.error("Error in creating new admin: ",error);
  return res.status(500).json({ message: "Server error. Please try again later." });
}
};


export const adminLogin=async(req,res)=>{
    const {email, password}=req.body;
      if(!email || !password){
        return res.json({message:"Please provide Email ID and Password"})
      }
      try{
        const admin = await Admin.findOne({ email });
        if (!admin) {
          return res.status(404).json({ message: "Admin not found with this email." });
        }
    
        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
          return res.status(400).json({ message: "Invalid password." });
        }
  
        return res.status(200).json({
          message: "Login successful.",
          admin: {
            admin_Id: admin.admin_Id,
            name: admin.name,
          },
        });
      }
      catch(error){
        console.error("Error in Login ",error);
        return res.status(500).json({ message: "Server error. Please try again later." });
      }
  }

  export const fetchAllAssignments = async (req, res) => {
    const {admin_name}=req.params
    try {
      const data = await Assignment.find({admin_name:admin_name});
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error in getting Requests", error: error.message });
    }
  };
  
  export const acceptAssignment = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the assignment by ID
      const assignment = await Assignment.findById(id);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found." });
      }
  
      // Update the status to 'accepted'
      assignment.status = 'accepted';
  
      // Save the updated assignment
      await assignment.save();
  
      return res.status(200).json({
        message: "Assignment accepted successfully.",
        assignment,
      });
    } catch (error) {
      console.error("Error in accepting assignment:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  export const rejectAssignment = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the assignment by ID
      const assignment = await Assignment.findById(id);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found." });
      }
  
      // Update the status
      assignment.status = 'rejected';
  
      // Save the updated assignment
      await assignment.save();
  
      return res.status(200).json({
        message: "Assignment accepted successfully.",
        assignment,
      });
    } catch (error) {
      console.error("Error in accepting assignment:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  };