# AI Developer Platform

A full-stack application for managing AI development projects and collaborating with team members.

## 🚀 Features

- User authentication and authorization
- Project creation and management
- Team collaboration tools
- Real-time updates using modern web technologies
- RESTful API backend

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

## 🛠️ Installation

### Clone the repository
```bash
git clone https://github.com/Nitish0777/aideveloper.git
cd aideveloper
```

### Setup Backend
```bash
cd server
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

### Setup Frontend
```bash
cd client
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

## 🏗️ Project Structure

```
aideveloper/
├── client/           # Frontend React application
│   ├── src/
│   ├── public/
│   └── package.json
└── server/           # Backend Node.js application
    ├── src/
    ├── config/
    └── package.json
```

## 🔧 Configuration

Create `.env` files in both client and server directories with the following variables:

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Usage

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## 📝 API Documentation

API endpoints are available at `http://localhost:5000/api`:

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- More endpoints documented in the API documentation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Nitish** - *Initial work* - [Nitish0777](https://github.com/Nitish0777)

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc.

## 📫 Contact

For any queries or suggestions, please reach out to [nitishnashine@gmail.com]
