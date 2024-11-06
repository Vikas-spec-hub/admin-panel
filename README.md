# Admin Panel

This project is a media content management admin panel for a mobile app, built with a modern tech stack, utilizing **React**, **Vite**, **TypeScript**, **Firebase**, and **Tailwind CSS**. It is designed to be performant, scalable, and maintainable.

## Table of Contents

- [Project Setup](#project-setup)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation and Usage](#installation-and-usage)

## Project Setup

The project uses **pnpm** as the package manager for efficient and fast dependency management. Make sure you have the required version installed (see below).

## Tech Stack

- **Frontend:** React + Vite + TypeScript + Shadcn/ui
- **State Management:** Redux Toolkit
- **Backend Services:** Firebase (Firestore, Firebase Authentication, etc.)
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm

## Requirements

- **Node.js** version: `20.14.0`
- **pnpm** version: `8.15.4`

## Installation and Usage

1. Create a `.env` file at the root of project folder, and add the keys and values mentioned below :-

   Refer `.env.example` file for more info.

   ```
   VITE_FIREBASE_API_KEY=''
   VITE_FIREBASE_AUTH_DOMAIN=''
   VITE_FIREBASE_PROJECT_ID=''
   VITE_FIREBASE_STORAGE_BUCKET=''
   VITE_FIREBASE_MESSAGING_SENDER_ID=''
   VITE_FIREBASE_APP_ID=''
   VITE_FIREBASE_MEASUREMENT_ID=''
   ```

2. To install the dependencies, run:

   ```
   pnpm install
   ```

3. To start the development server, run:

   ```
   pnpm dev
   ```

   The application will be available at http://localhost:5173

4. To build the project for production, run:

   ```
   pnpm build
   ```
