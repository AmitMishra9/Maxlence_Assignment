const nodemailer = require('nodemailer'); 

const sendPasswordResetEmail = (email, resetLink) => {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Configure your email service here
        // Example configuration for Gmail:
        service: 'gmail',
        auth: {
            user: 'ami8mishra1001@gmail.com',
            pass: 'ezrd nydf cxzh pgbl'
            
        }
    });

    // Define email content
    const mailOptions = {
        from: 'ami8mishra1001@gmail.com',
        to: email,
        subject: 'Password Reset Link',
        html: `<p>You have requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending password reset email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
};

module.exports= sendPasswordResetEmail;