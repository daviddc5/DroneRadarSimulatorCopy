# MCSS
This is a copy of the code I developed during my placement.

This program is inspired by inspired by the Micromonde combat control system developed by University of Laval.
It simulates three different drone radar systems with different changing accuracies and two test scenarios to aid get the user used to the system.
The program periodically links to external qualtrics questionaires that the user must respond in order to continue.

## About


## Getting it set and Running

## System features


## How it Works

MCSS - Micromonde-inspired Combat Simulation System
Table of Contents
About
System Features
Prerequisites
Installing
Environment Setup
Usage
How It Works
Contributing
License
About
This software simulates three different drone radar systems, each with varying levels of accuracy. It also provides two test scenarios to help users acclimate to the system. To enhance the learning and feedback process, MCSS integrates periodic Qualtrics questionnaires that must be completed in order to proceed.

Inspired by the Micromonde combat control system developed by the University of Laval, this project was created during a placement program.

System Features
Three drone radar systems with dynamic accuracy levels
Two test scenarios for training
Qualtrics questionnaire integration
Prerequisites
Make sure you have Node.js and npm installed on your system. If not, download and install them from Node.js official website.

Installing
To set up the project locally, follow these steps:

General
Clone the repository: git clone https://github.com/your-username/MCSS.git
Navigate to the project folder: cd MCSS
Install dependencies: npm install
Environment Setup
Create a .env file in the root directory of your project.
Add the following line to set your SESSION_SECRET:
makefile
Copy code
SESSION_SECRET=your_secret_here
Save to grepper
Replace your_secret_here with a strong, unique value.

To make the environment variables available during runtime, enter the following command in your terminal:
bash
Copy code
export $(cat .env | xargs)
Save to grepper
Windows
If you're on Windows, you might need to add additional setup instructions here.

macOS / Linux
If you're on macOS or Linux, you might need to add additional setup instructions here.

Usage
Start the server: npm start
Open a web browser and navigate to http://localhost:3000 (or whatever port you've configured)
Follow the on-screen instructions to run the simulation and complete the questionnaires.
How It Works
The software runs on a Node.js backend. When started, it initializes the drone radar systems and the test scenarios. Each radar system has its own set of algorithms to simulate varying levels of accuracy. As the user interacts with the software, they may be prompted to complete Qualtrics questionnaires at specific intervals for data collection and user feedback.

Contributing
If you're interested in contributing, please fork the repository and submit your changes via a pull request.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Feel free to modify this template as needed for your specific project!
