# GastroSuite 🍽️✨

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue.svg)](https://mongodb.com)
[![React](https://img.shields.io/badge/React-Vite-61DAFB.svg)](https://react.dev)
[![Node](https://img.shields.io/badge/Node-Express-339933.svg)](https://nodejs.org)
[![Licence](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

GastroSuite is a premium B2B SaaS and client showcase platform built for restaurant web design agencies and digital products. It serves as a lead-generation portfolio showcase and a collaborative project portal where restaurant owners can select website templates, customize interactive themes, calculate dynamic quotes, and collaborate directly with your development agency.

---

## 🚀 Key Features

### 💻 Client Experience
*   **Interactive Design Showcase**: High-fidelity restaurant sites with category tags (Fine Dining, Cozy Cafe, Cloud Kitchens, Sushi Lounge, Bakery).
*   **Dynamic Quote Builder**: Clients customize feature packages (online reservations, QR menu code systems, point of sale integrations) to calculate custom estimates dynamically.
*   **Interactive Theme Sandbox**: Instant client-side color theme switcher (e.g., *Golden Velvet*, *Midnight Tea*, *Neon Diner*) to preview changes immediately.
*   **Secure Client Portal (Workspace)**: A personal timeline dashboard where customers upload project requirements (logos, menus), track phase stages, pay invoices, and view live status updates.
*   **Direct Workspace Chat**: Real-time communication channel directly linked with the agency administrator.

### 🛡️ Agency Administrator CRM
*   **Pipeline Kanban Dashboard**: Visual CRM board sorting customer inquiries from `Briefing` through `Launched` states.
*   **Financial Metrics Hub**: Review analytics charting Monthly Recurring Revenue (MRR), total invoices settled, and prospective pipelines.
*   **Active Project Controller**: Complete admin CRUD actions to manage project showcase galleries, view counts, and specifications.
*   **Client Matrix**: Detailed list of registered accounts with options to deactivate or suspend users and export the list to CSV spreadsheets.
*   **Custom Invoice Generator**: Create billing timelines directly for user project portals.

---

## 📁 Project Structure

```
Restaurent project/
├── README.md
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # JWT authentication & roles
│   │   ├── contactController.js# General lead entries
│   │   ├── inquiryController.js# Custom inquiries & workspace phases
│   │   ├── projectController.js# Showcase portfolio CRUD
│   │   └── userController.js   # Client CRM matrix settings
│   ├── middleware/
│   │   └── authMiddleware.js   # User & Admin JWT tokens validator
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Inquiry.js
│   │   ├── Project.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── inquiryRoutes.js
│   │   ├── projectRoutes.js
│   │   └── userRoutes.js
│   ├── seed.js                 # Portfolio demo seed data
│   ├── server.js               # Node Express server configuration
│   ├── package.json
│   └── .env
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/             # Brand logos and styling icons
    │   ├── components/
    │   │   ├── Navbar.jsx      # Glassmorphic header
    │   │   ├── Footer.jsx
    │   │   ├── Hero.jsx        # Premium landing text slider
    │   │   ├── ProjectCard.jsx # Smooth hover animation components
    │   │   ├── ThemeSandbox.jsx# Client theme previews
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx # Global user auth & cookies
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Portfolio.jsx   # Filterable showreel
    │   │   ├── ProjectDetail.jsx# Booking CTA lead forms
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── AdminLogin.jsx  # Superuser login
    │   │   ├── UserDashboard.jsx# Client collaborative panel
    │   │   ├── AdminDashboard.jsx# Analytics and lead pipeline
    │   │   └── NotFound.jsx
    │   ├── App.jsx             # React routing configurations
    │   ├── index.css           # Global custom typography and aesthetics
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js          # API proxy connection controls
    └── index.html
```

---

## 🛠️ Installation & Setup

### Prerequisites
*   Node.js (v16+)
*   MongoDB Atlas account or local MongoDB instance installed.

### 1. Clone & Core Setup
```bash
# Navigate to project root
cd "Restaurent project"
```

### 2. Backend Configuration
Navigate to the `/backend` folder:
```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` with the following configuration:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gastrosuite
JWT_SECRET=your_super_secure_jwt_token_secret
NODE_ENV=development
```

Seed the database with default showcase projects:
```bash
npm run seed
```

Start the Express API server:
```bash
npm run dev
```

### 3. Frontend Configuration
Open a new terminal window, navigate to the `/frontend` folder:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The application will be running locally at `http://localhost:5173`. API calls are auto-proxied to the server on port 5000.

---

## 🛡️ Security Best Practices
*   **Bcrypt Hashing**: All client passwords are salted and hashed on the backend schema pre-save hooks.
*   **HttpOnly Cookies / Tokens**: JWTs are processed via secure request validation.
*   **Admin Middleware Separation**: Specific superuser routes require the `verifyAdmin` flag to run.
*   **Rate Limiting**: Integrated `express-rate-limit` prevents brute-force attempts on login and register endpoints.

---

## 📄 License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
