# PhotoGram Frontend

PhotoGram is a feature-rich mobile application built with React Native that leverages **Telegram's backend** to serve as an **unlimited cloud storage** solution. It allows users to share and view photos in a dynamic grid layout, featuring a secure authentication flow using OTP, a masonry-style home feed, identifying user profiles, and seamless file uploads.

## 🚀 Features

-   **Authentication Flow**:
    -   Secure Onboarding and Login screens.
    -   OTP Verification for account security.
-   **Dynamic Home Feed**:
    -   Masonry layout for an engaging photo browsing experience.
    -   Interactive image viewing with detailed views.
-   **User Profile**:
    -   Manage user details and view personal uploads.
-   **Media Upload**:
    -   Seamless release of new content via the Upload Files screen.
    -   Support for document and image selection.
-   **Unlimited Cloud Storage**:
    -   Utilizes Telegram's backend infrastructure to offer free, unlimited storage for photos and media.
-   **Navigation**:
    -   Smooth transitions between screens using React Navigation.
    -   Protected routes ensuring user authentication state persistence.

## 🛠️ Tech Stack

-   **Core**: React Native (0.83.1), React (19.2.0)
-   **Navigation**: React Navigation (Native Stack v7)
-   **State Management**: Redux Toolkit & React Redux
-   **Networking**: Axios for API requests
-   **Storage**: Async Storage for local data persistence
-   **UI/UX**:
    -   `react-native-vector-icons` for iconography
    -   `react-native-linear-gradient` for visual styling
    -   `@react-native-seoul/masonry-list` for grid layouts
    -   `react-native-safe-area-context` for device adaptability
-   **File Handling**: `@react-native-documents/picker`

## 📂 Project Structure

```bash
src
├── assets/             # Static assets (images, fonts, icons)
├── components/         # Reusable UI components
├── navigation/         # Navigation configuration (AppNavigator)
├── screens/            # Application screens
│   ├── authFlow/       # Authentication screens (Login, OTP, Onboarding)
│   └── homeScreenFlow/ # Main app screens (Home, Profile, Upload, ImageView)
├── services/           # API service modules (Auth, etc.)
└── store/              # Redux store configuration
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
-   Node.js (>=20) & npm/yarn
-   React Native CLI environment setup for Android/iOS
    -   [React Native Environment Setup Guide](https://reactnative.dev/docs/environment-setup)
-   Android Studio (for Android) or Xcode (for iOS)

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd Photogram_Frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Install iOS Pods (macOS only)**:
    ```bash
    cd ios
    pod install
    cd ..
    ```

## 🏃‍♂️ Running the App

1.  **Start the Metro Server**:
    ```bash
    npm start
    ```

2.  **Run on Android**:
    ```bash
    npm run android
    ```

3.  **Run on iOS (macOS only)**:
    ```bash
    npm run ios
    ```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the project.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
