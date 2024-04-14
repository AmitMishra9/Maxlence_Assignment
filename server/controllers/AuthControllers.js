
const db = require('../Data_Base/db.config');
//const Users = db.users;
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");

const Users=require('../models/Users');
const sendPasswordResetEmail = require('../utiles/sendMail');

const JWT_KEY = process.env.JWT_SECRET_KEY;

const passwordResetTokenSecret = process.env.JWT_SECRET_KEY; 
const tokenExpiration = '1h'; // Token expiration time, e.g., '1h' for 1 hour

const register = async (req, res) => {
    try {
        const FilePath = req.file.path;
        console.log(FilePath);

       
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await Users.create({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            image: FilePath,
            password: hashedPassword, 
        });

        res.json({
            success: true,
            message: "Registered successfully",
            user: newUser
        });
    } catch (error) {
        console.error("Error occuered:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred  try after some time  "
        });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Create JWT token
        const now = Date.now();
        const payload = {
            iat: now,
            exp: now + 3600 * 1000,
            id: user.id, 
            email: user.email 
        }

        const jwt_token = jwt.sign(payload, JWT_KEY);

        console.log('User logged in successfully:', email);
        res.status(200).json({ success: true ,jwt_token,user});
    } catch (error) { 
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'An error occurred while logging in' });
    }
};



  const passwordreset = async (req, res) => {
    const { email, newPassword, token } = req.body;

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, passwordResetTokenSecret);

        // Check if the token is valid and not expired
        if (!decodedToken || !decodedToken.userId) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Find the user by email
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user ID from the token matches the user's ID
        if (user.id !== decodedToken.userId) {
            return res.status(400).json({ message: 'Invalid token for this user' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Return a success message
        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a password reset token
        const token = jwt.sign({ userId: user.id }, process.env.PASSWORD_RESET_TOKEN_SECRET, { expiresIn: '1h' });

        // Send password reset link to user's email
        const resetLink = `http://localhost:5174/reset-password?token=${token}`;
        sendPasswordResetEmail(email, resetLink); // Function to send email

        // Return success message
        return res.status(200).json({ message: 'Password reset link sent successfully' });
    } catch (error) {
        console.error('Error generating password reset link:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const passwordchange = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    try {
        
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        // Return a success message
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    login,
    register,
   passwordreset,
   requestPasswordReset,
   passwordchange,
};
