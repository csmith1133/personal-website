#!/bin/bash

# Personal Website Setup Script
echo "🚀 Setting up your personal website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16+) first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Create server .env file if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server environment file..."
    cat > server/.env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Email Configuration (for contact form)
# Replace with your actual email credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-contact-email@gmail.com

# Security
JWT_SECRET=your-jwt-secret-key-here
EOF
    echo "✅ Created server/.env file - Please update with your credentials"
else
    echo "✅ server/.env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update server/.env with your email credentials"
echo "2. Customize your personal information in the React components"
echo "3. Start the development servers with: npm run dev"
echo ""
echo "🌐 Your website will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📚 For more information, check the README.md file"
echo ""
echo "Happy coding! 🚀"

