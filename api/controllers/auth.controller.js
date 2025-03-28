import User from "../models/user.model.js";
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';

import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",  // Use Gmail service or any other email service you prefer
      auth: {
        user: "connectixhub@gmail.com", // Replace with your email
        pass: "gghv qiim qomg whgj",   // Replace with your email password (or use environment variables)
      },
    });

    const mailOptions = {
      from: "connectixhub@gmail.com",   // Replace with your email
      to: email,
      subject: "CTTE Alumna Corner - OTP Verification",
      text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email: ", error);
  }
};

export const signup = async (req, res,next) => {
  const { username, email, password,registerno } = req.body;
 
if (
  !username ||
  !email ||
  !password ||
  !registerno ||
  username === '' ||
  email === '' ||
  password === '' ||
  registerno === ''

) {
  next(errorHandler(400, 'All fields are required'));
  }
  // Check if the registerno starts with "212203" to assign admin rights
  const isAdmin = registerno.toString().startsWith("212203");


  const hashedPassword = bcryptjs.hashSync(password, 10);

  
  const newUser = new User({
    username,
    email,
    password:hashedPassword,
    registerno,
    isAdmin,
  });
  

  try {
    // Step 1: Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, upperCase: false, specialChars: false });

    // Send OTP email
    await sendOtpEmail(email, otp);

    // Ensure session is initialized
    if (!req.session) {
      return next(errorHandler(500, 'Session not initialized'));
    }

    // Store OTP temporarily in session
    req.session.otp = otp;

    // Respond that OTP was sent
    res.json({ message: "OTP sent to your email. Please verify." });
  } catch (error) {
    next(error);
  }
};
export const verifyOtp = async (req, res, next) => {  
  const { otp, username, email, password, registerno } = req.body;

  // Step 1: Check if OTP exists in session
  if (!req.session.otp) {
    return next(errorHandler(500, 'Session expired or OTP not found'));
  }

  // Step 2: Compare entered OTP with the one stored in session
  if (otp === req.session.otp) {
    try {
      const hashedPassword = bcryptjs.hashSync(password, 10);

      // Step 3: Create a new user directly after OTP validation
      const newUser = new User({
        username,
        email,
        password:hashedPassword,  // Ensure to hash the password before saving
        registerno,
        isAdmin: registerno.toString().startsWith("212203"), // Add this

      });

      // Step 4: Save the new user to the database
      await newUser.save();

      // Step 5: Optionally, set a session for the newly created user
      req.session.user = newUser;

      // Step 6: Send success response
      res.json({ message: "Signup successful!" });
    } catch (error) {
      next(error);
    }
  } else {
    // Invalid OTP
    res.status(400).json({ message: "Invalid OTP. Please try again." });
  }
};



//signin
export const signin = async (req, res, next) => {
  const { email, password, registerno } = req.body;

  // Check for missing fields
  if (!email || !password ||!registerno || email === '' || password === '' || registerno ==='') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Find the user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    

    // Compare the password hash with the one in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword ) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Ensure both registerno values are the same type and compare them
    if ( registerno.toString().trim() !== validUser.registerno.toString().trim()) {
      return next(errorHandler(400, 'Invalid RegisterNo'));
    }

    // If both password and registerno are valid, generate a JWT token
    const token = jwt.sign(
      { id: validUser._id ,isAdmin: validUser.isAdmin},
      process.env.JWT_SECRET,
    );
    


    // Send the token in a cookie for authentication
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true, // Prevent access to cookie via JavaScript
      })
      .json(validUser);  // Send the user object as a response
  } catch (error) {
    next(error);
  }
};

export const google = async (req,res,next) =>{
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id}, process.env.JWT_SECRET);
        const { password, ...rest } = newUser._doc;
        res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else{
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join(' ') + Math.random(). toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture:googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
      const{password, ...rest} = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
      
    }
      } catch (error) {
        next(error);
      }
  };
