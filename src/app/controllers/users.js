const User = require("../models/user");
const bcrypt = require('bcrypt');
const { sendPasswordResetEmail } = require('../utils/emailService');
const { generateResetToken, verifyResetToken } = require('../utils/jwtService');

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res) => {

    try{
    let {username,email,password} = req.body;
    
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        req.flash("error", "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)");
        return res.redirect("/signup");
    }

    // Check for common weak passwords
    const weakPasswords = ['password', '123456', '123456789', 'qwerty', 'abc123', 'password123', 'admin', 'demo', 'test', 'guest'];
    if (weakPasswords.includes(password.toLowerCase())) {
        req.flash("error", "Please choose a stronger password. This password is too common and easily guessable.");
        return res.redirect("/signup");
    }

    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(User.registeredUser);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust")
        res.redirect("/listings");
    })
   
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};


module.exports.login = (req,res) => {
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};

// Forgot Password - Request Reset
module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            req.flash("error", "No account with that email address exists.");
            return res.redirect("/forgot-password");
        }

        // Generate JWT reset token
        const resetToken = generateResetToken(user._id, email);

        // Send email
        const emailSent = await sendPasswordResetEmail(email, resetToken);
        
        if (emailSent) {
            req.flash("success", "Password reset link is sent. Please check your Gmail");
        } else {
            req.flash("error", "Failed to send reset email. Please check your email configuration.");
        }
        
        res.redirect("/forgot-password");
    } catch (error) {
        console.error('Forgot password error:', error);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/forgot-password");
    }
};

// Render forgot password form
module.exports.renderForgotPasswordForm = (req, res) => {
    res.render("users/forgot-password.ejs");
};

// Render reset password form
module.exports.renderResetPasswordForm = async (req, res) => {
    try {
        const { token } = req.query;
        
        if (!token) {
            req.flash("error", "Password reset token is missing.");
            return res.redirect("/forgot-password");
        }

        // Verify JWT token
        const tokenVerification = verifyResetToken(token);
        
        if (!tokenVerification.valid) {
            req.flash("error", `Password reset token is ${tokenVerification.error}.`);
            return res.redirect("/forgot-password");
        }

        // Find user by ID from token
        const user = await User.findById(tokenVerification.userId);
        
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/forgot-password");
        }

        res.render("users/reset-password.ejs", { token });
    } catch (error) {
        console.error('Reset password form error:', error);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/forgot-password");
    }
};

// Reset Password
module.exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.body;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            req.flash("error", "Passwords do not match.");
            return res.redirect(`/reset-password?token=${token}`);
        }

        // Password strength validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            req.flash("error", "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)");
            return res.redirect(`/reset-password?token=${token}`);
        }

        // Check for common weak passwords
        const weakPasswords = ['password', '123456', '123456789', 'qwerty', 'abc123', 'password123', 'admin', 'demo', 'test', 'guest'];
        if (weakPasswords.includes(password.toLowerCase())) {
            req.flash("error", "Please choose a stronger password. This password is too common and easily guessable.");
            return res.redirect(`/reset-password?token=${token}`);
        }

        // Verify JWT token
        const tokenVerification = verifyResetToken(token);
        
        if (!tokenVerification.valid) {
            req.flash("error", `Password reset token is ${tokenVerification.error}.`);
            return res.redirect("/forgot-password");
        }

        // Find user by ID from token
        const user = await User.findById(tokenVerification.userId);
        
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/forgot-password");
        }

        // Set new password using passport-local-mongoose
        await user.setPassword(password);
        await user.save();

        req.flash("success", "Your password has been reset successfully!");
        res.redirect("/login");
    } catch (error) {
        console.error('Reset password error:', error);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/forgot-password");
    }
};