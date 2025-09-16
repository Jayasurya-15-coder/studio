# Saathi - Exam Wellness Companion

This is a Next.js project bootstrapped with `create-next-app` and prototyped in Firebase Studio.

## Getting Started

Follow these instructions to get the development environment running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A [Google AI API Key](https://aistudio.google.com/app/apikey).

### Installation

1.  **Download the Code**:
    Download the project source code as a ZIP file from Firebase Studio and unzip it.

2.  **Navigate to the Project Directory**:
    Open your terminal and change into the project directory:
    ```bash
    cd path/to/your/project
    ```

3.  **Install Dependencies**:
    Run the following command to install all the necessary packages:
    ```bash
    npm install
    ```

4.  **Set Up Environment Variables**:
    Create a new file named `.env` in the root of your project directory. Open it and add your Google AI API key like this:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

    Replace `YOUR_API_KEY_HERE` with the actual key you obtained from Google AI Studio.

### Running the Application

This project requires two processes to run concurrently: the Next.js web server and the Genkit AI server.

1.  **Start the Genkit Server**:
    In your terminal, run the following command to start the Genkit development server, which powers the AI features:
    ```bash
    npm run genkit:watch
    ```

2.  **Start the Web Server**:
    Open a **second terminal window**, navigate to the same project directory, and run this command to start the Next.js development server:
    ```bash
    npm run dev
    ```

3.  **View Your App**:
    Open your web browser and go to [http://localhost:9002](http://localhost:9002) to see your application running.

## Available Scripts

- `npm run dev`: Runs the Next.js app in development mode.
- `npm run build`: Builds the application for production usage.
- `npm run start`: Starts a Next.js production server.
- `npm run lint`: Runs ESLint to find and fix problems in the code.
- `npm run genkit:watch`: Starts the Genkit development server in watch mode.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
