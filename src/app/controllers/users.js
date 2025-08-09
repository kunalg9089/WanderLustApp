const User = require("../models/user");
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/emailService');

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res) => {

    try{
    let {username,email,password} = req.body;
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

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        // Save token to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Send email
        const emailSent = await sendPasswordResetEmail(email, resetToken);
        
        if (emailSent) {
            req.flash("success", "Password reset email sent! Check your inbox.");
        } else {
            req.flash("error", "Failed to send reset email. Please try again.");
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
        const { token } = req.params;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            req.flash("error", "Password reset token is invalid or has expired.");
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
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            req.flash("error", "Passwords do not match.");
            return res.redirect(`/reset-password/${token}`);
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            req.flash("error", "Password reset token is invalid or has expired.");
            return res.redirect("/forgot-password");
        }

        // Set new password
        await user.setPassword(password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        req.flash("success", "Your password has been reset successfully!");
        res.redirect("/login");
    } catch (error) {
        console.error('Reset password error:', error);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/forgot-password");
    }
};