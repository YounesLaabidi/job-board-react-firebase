# Job Board Application

Welcome to the Job Board Application! This application is built using React and Firebase, providing a modern and efficient platform for managing job listings.

## Features

- **User Authentication:** Securely register and log in using Firebase Authentication.
- **Job Listings:** Browse through a curated list of job opportunities.
- **Post a Job:** Employers can post new job listings with details like title, description, and requirements.
- **Job Application:** Job seekers can apply to the posted jobs, and employers can review and manage applications.
- **Real-time Updates:** Enjoy real-time updates and notifications powered by Firebase.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Firebase account and project set up

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/your-username/job-board-app.git](https://github.com/YounesLaabidi/job-board-react-firebase.git)
   cd job-board-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase configuration:

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Copy the Firebase configuration object from your project settings.
   - Create a `.env.local` file in the project root and add the following:

     ```env
     VITE_API_KEY=your-api-key
     VITE_AUTH_DOMAIN=your-auth-domain
     VITE_PROJECT_ID=your-project-id
     VITE_STORAGE_BUCKET=your-storage-bucket
     VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_APP_ID=your-app-id
     ```

4. Run the application:

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Firebase Configuration

Make sure your Firebase project has the following services enabled:

- Authentication (Email/Password)
- Firestore (Database)

## Contributing

We welcome contributions! If you find any bugs or have ideas for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- This project was inspired by the need for a simple and effective job board application.
- Special thanks to the React and Firebase communities for their excellent documentation and support.

Happy job hunting and hiring! 🚀
