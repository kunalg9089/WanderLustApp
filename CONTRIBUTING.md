# Contributing to WanderLust

Thank you for your interest in contributing to WanderLust! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a new branch for your feature
4. **Make** your changes
5. **Test** your changes thoroughly
6. **Submit** a pull request

## 🔧 Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust

# Install dependencies
npm install

# Copy environment file and configure
cp env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## 📝 Development Guidelines

### Code Style
- Follow existing code conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep first line under 50 characters
- Add detailed description if necessary

Example:
```
Add user profile image upload feature

- Implement image upload with Cloudinary
- Add validation for file types and sizes
- Update user model to include profile image URL
- Add tests for upload functionality
```

### Pull Request Guidelines
- Create pull requests against the `main` branch
- Include a clear description of changes
- Reference any related issues
- Ensure all tests pass
- Update documentation if needed

## 🧪 Testing

Before submitting your pull request:

1. Test your changes locally
2. Ensure the application starts without errors
3. Test core functionality (auth, listings, bookings)
4. Check responsive design on mobile devices

## 🔒 Security Considerations

- Never commit sensitive data (.env files, API keys, passwords)
- Use environment variables for configuration
- Validate all user inputs
- Follow security best practices

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node.js version)

## ✨ Feature Requests

For new features, please:

- Check if the feature already exists
- Describe the use case clearly
- Explain the expected behavior
- Consider the impact on existing functionality

## 📞 Questions?

If you have questions about contributing:

- Check existing issues and discussions
- Create a new issue with the `question` label
- Be respectful and patient while waiting for responses

Thank you for helping make WanderLust better! 🌟
