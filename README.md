TeamConnect - Internal Social Media Platform
TeamConnect is an internal social media platform designed for teams to easily connect, share updates, and track team progress. The app features a modern, simple, and user-friendly UI, enhancing team communication and collaboration. It is a full-stack application built with a React front-end, Spring Boot back-end, and H2 database for data storage.
Features

Post Sharing: Team members can share updates or thoughts with file attachments.
Comments & Likes: Interact with posts through comments and likes.
Analytics Dashboard: Overview of total posts, likes, comments, and department-wise activity.
User Authentication: Secure signup and login system with department selection.
Responsive UI: Optimized for both mobile and desktop with a clean design.

Tech Stack

Front-end: React, Axios, CSS
Back-end: Spring Boot, Spring Data JPA, H2 Database
Tools: Maven, Node.js, Git

Screenshots

public/feed1.png


Description
Screenshot



Sign Up Page



Feed Page



Feed Page (Alternate)



Analytics Dashboard



Post Creation



Prerequisites

Node.js (v20.x or latest): Download
Java JDK (17 or latest): Download
Maven (3.9.x or latest): Download
Git: Download
A modern web browser (Chrome, Firefox, etc.).

Setup and Installation
1. Clone the Repository
git clone https://github.com/<your-username>/team-connect.git
cd team-connect

2. Back-end Setup

Navigate to the back-end folder:

cd backend/teamconnect


Install Maven dependencies:

mvn install


Run the Spring Boot application:

mvn spring-boot:run


Verify:
Open http://localhost:8080/api/posts (should return JSON).
Access the H2 console at http://localhost:8080/h2-console:
JDBC URL: jdbc:h2:mem:testdb
Username: sa
Password: (leave blank)





3. Front-end Setup

Navigate to the front-end folder:

cd frontend/teamconnect


Install Node.js dependencies:

npm install


Start the React app:

npm start


Open http://localhost:3000 in your browser.

4. Test the Application

Sign Up/Login: Create an account on the signup page (email, password, department).
View Feed: Check posts, comments, and likes on the feed page.
Add a Post:
Enter details in the post creation form (e.g., "Team meeting scheduled").
Submit and view the post on the feed.


View Analytics: Check total posts, likes, and comments on the analytics page.
Database: Verify new entries in the POST table via the H2 console.

Dependencies
Back-end (backend/teamconnect/pom.xml)

Spring Boot Starter Web
Spring Data JPA
H2 Database
Lombok
Spring Boot DevTools

Front-end (frontend/teamconnect/package.json)

React
Axios
Node.js

External Libraries

Poppins Font: Google Fonts

Configurations
Back-end (backend/teamconnect/src/main/resources/application.properties)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update


CORS: Enabled in PostController.java for http://localhost:3000.

Front-end

API Endpoint: http://localhost:8080/api/posts
Port: 3000 (configurable in package.json)

Troubleshooting

Maven Error:

Verify mvn -version and JAVA_HOME (set to JDK 17).
Run mvn clean install.


Node.js Error:

Delete node_modules/ and package-lock.json, then run npm install.


CORS Issue:

Ensure @CrossOrigin("http://localhost:3000") is set in PostController.java.


Port Conflict:

Update package.json:"scripts": {
  "start": "react-scripts start --port 3001"
}





Demo
A Single Page Application (SPA) with:

Database: H2 for post storage.
APIs: RESTful endpoints (GET/POST /api/posts).
Libraries: Axios, Poppins font.

View the UI and functionality in the screenshots.
Project Notes
Meets requirements:

Database: H2 (POST table).
APIs: GET/POST /api/posts.
Libraries: Axios, Poppins font.
Documentation: README with setup, dependencies, and screenshots.

License
MIT License.
Developed by Chandan Dehariya.
