# TaskVrmx 🚀

> **Master your day with a gamified, intelligent task management experience.**

TaskVrmx is a modern Todo application designed to make productivity fun and engaging. Built with the latest web technologies, it combines robust task management with gamification elements like streaks and XP to keep you motivated.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- **🎮 Gamified Experience**
  - **Daily Streaks**: Keep your momentum going by completing tasks every day.
  - **XP System**: Earn points for every completed task and level up your productivity.
  - **Visual Rewards**: Satisfying animations and feedback when you achieve your goals.

- **🤖 AI-Powered Dashboard**
  - **Smart Suggestions**: Get intelligent prompts on what to focus on next based on deadlines and priority.
  - **Progress Tracking**: Visualize your daily progress with beautiful charts and stats.

- **⚡ Efficient Task Management**
  - **Rich Filtering**: Easily view All, Active, or Completed tasks.
  - **Priority Levels**: Mark tasks as High, Medium, or Low priority.
  - **Priority Levels**: Mark tasks as High, Medium, or Low priority.
  - **Due Dates**: Never miss a deadline with integrated date pickers.
  - **Task History**: View completed tasks and restore deleted ones from the Trash.
  - **Internationalization (i18n)**: Full support for English (LTR) and Arabic (RTL).

- **🎨 Modern UI/UX**
  - **Glassmorphism Design**: sleek, translucent interfaces.
  - **Smooth Animations**: Powered by Framer Motion for a fluid feel.
  - **Responsive**: Works perfectly on desktop and mobile.

## 🛠️ Tech Stack

This project is built with a powerful modern stack:

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (with CSS Variables & Glassmorphism)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Auth**: [Firebase](https://firebase.google.com/) (Firestore & Auth)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **i18n**: [i18next](https://www.i18next.com/)

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VRMX2/taskvrmx.git
   cd taskvrmx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Create a web app and copy your firebase config.
   - Update `src/firebase.js` with your credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit `http://localhost:5173` to view the app.

## 📁 Project Structure

```bash
src/
├── components/       # Reusable UI components (TaskItem, Dashboard, Profile, etc.)
├── utils/           # Helper functions (Gamification logic, Date formatters)
├── App.jsx          # Main application layout and routing
├── index.css        # Global styles and themes
├── firebase.js      # Firebase configuration
└── main.jsx         # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by the TaskVrmx Team
"# ENAC-Medical-Management-System" 
"# ENAC-Medical-Management-System" 
