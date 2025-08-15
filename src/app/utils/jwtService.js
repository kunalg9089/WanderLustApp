const jwt = require('jsonwebtoken');

// Generate JWT token for password reset
const generateResetToken = (userId, email) => {
    const payload = {
        userId,
        email,
        type: 'password_reset'
    };
    
    const options = {
        expiresIn: '15m', // 15 minutes
        issuer: 'wanderlust',
        audience: 'wanderlust_users'
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Verify JWT token
const verifyResetToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            issuer: 'wanderlust',
            audience: 'wanderlust_users'
        });
        
        // Check if token is for password reset
        if (decoded.type !== 'password_reset') {
            throw new Error('Invalid token type');
        }
        
        return {
            valid: true,
            userId: decoded.userId,
            email: decoded.email
        };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { valid: false, error: 'Token expired' };
        } else if (error.name === 'JsonWebTokenError') {
            return { valid: false, error: 'Invalid token' };
        } else {
            return { valid: false, error: error.message };
        }
    }
};

module.exports = {
    generateResetToken,
    verifyResetToken
};
