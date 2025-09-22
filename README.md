# Business Intelligence & Project Management Portfolio 🚀

A modern, responsive professional portfolio website built with React and Node.js, showcasing business intelligence projects, project management expertise, and data analytics capabilities with beautiful animations and interactive elements.

## ✨ Features

- **Modern Design**: Clean, professional design with dark/light mode toggle
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Animations**: Smooth animations using Framer Motion
- **Contact Form**: Working contact form with backend integration
- **BI Project Showcase**: Dynamic gallery showcasing data analytics and business intelligence projects
- **Skills Display**: Interactive skills section highlighting technical and management competencies
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Fast Loading**: Optimized images and code splitting

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Nodemailer** - Email handling
- **Express Validator** - Input validation
- **Express Rate Limit** - Rate limiting
- **CORS & Helmet** - Security middleware

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/charles-smith/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000

   # Email Configuration (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=your-contact-email@gmail.com

   # Security
   JWT_SECRET=your-jwt-secret-key-here
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
personal-website/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js backend
│   ├── index.js          # Express server
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🎨 Customization

### Personal Information
1. Update personal details in:
   - `client/src/components/Hero.js`
   - `client/src/pages/About.js`
   - `client/src/components/Contact.js`
   - `client/src/components/Footer.js`

### Business Intelligence Projects
- Modify the projects to showcase BI dashboards, data analytics, and project management deliverables
- Add project screenshots to `client/public/images/`

### Skills & Technologies
- Skills are now dynamically loaded from LaTeX resume files in `resume/resume/skills.tex`
- Business intelligence and project management skills are automatically displayed

### Styling
- Customize colors in `client/tailwind.config.js`
- Modify animations in `client/src/index.css`

### Contact Form
- Set up email credentials in server `.env` file
- For Gmail, use App Passwords for `EMAIL_PASS`

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend:
   ```bash
   cd client && npm run build
   ```
2. Deploy the `build` folder to your hosting platform

### Backend (Heroku/Railway/Digital Ocean)
1. Set environment variables on your hosting platform
2. Deploy the `server` directory
3. Update `CLIENT_URL` in backend env to your frontend URL

### Full Stack (Railway/Render)
1. Use the root `package.json` for deployment
2. Set build command: `npm run build`
3. Set start command: `npm start`


### Deployment with Docker and Docker Compose

# API

```bash
sudo docker build -t charlie_personal_website_backend_image ../charlie-personal-website/server

sudo docker run -d --name charlie_personal_website_backend --rm \
  -p 8003:5000 \
  --env-file ../charlie-personal-website/server/.env \
  charlie_personal_website_backend_image

```

# Web (bake API URL so it can call the backend)

```bash
sudo docker build -t charlie_personal_website_frontend_image \
  --build-arg REACT_APP_API_URL=http://localhost:8003 \
  ../charlie-personal-website/client

sudo docker run -d --name charlie_personal_website_frontend --rm \
  -p 8083:3000 \
  charlie_personal_website_frontend_image

```

## 📧 Email Setup

For the contact form to work:

1. **Gmail Setup**:
   - Enable 2FA on your Google account
   - Generate an App Password
   - Use the App Password as `EMAIL_PASS`

2. **Other Email Providers**:
   - Update the transporter configuration in `server/index.js`

## 🔧 Available Scripts

### Root Directory
- `npm run dev` - Start both frontend and backend
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production
- `npm start` - Start production server

### Client Directory
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server Directory
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🌟 Performance Optimizations

- **Image Optimization**: All images are optimized for web
- **Code Splitting**: React lazy loading for components
- **Caching**: Proper HTTP caching headers
- **Minification**: CSS and JS minification in production
- **Compression**: Gzip compression enabled

## 🔒 Security Features

- **Input Validation**: All form inputs are validated
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Configured for secure cross-origin requests
- **Helmet**: Security headers implemented
- **XSS Protection**: Input sanitization

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🐛 Troubleshooting

### Common Issues

1. **Email not sending**:
   - Check email credentials in `.env`
   - Verify App Password for Gmail
   - Check firewall/network settings

2. **Styles not loading**:
   - Run `npm run build` in client directory
   - Check Tailwind CSS configuration

3. **API errors**:
   - Ensure backend server is running
   - Check environment variables
   - Verify CORS settings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

If you have any questions or need help with setup, feel free to reach out:

- Email: charlessmith2@me.com
- LinkedIn: [Charles Smith](https://linkedin.com/in/csmithunt)
- GitHub: [@csmith1133](https://github.com/csmith1133)

---

**Made with ❤️ by Charles Smith**
