TeamConnect - Internal Social Media Platform
TeamConnect ek internal social media platform hai jo teams ke liye banaya gaya hai taaki wo easily connect kar sakein, updates share kar sakein, aur team ka progress track kar sakein. Yeh app ek modern UI ke saath aata hai jo simple aur user-friendly hai, aur teams ke communication aur collaboration ko enhance karta hai. Yeh ek full-stack application hai jo React front-end aur Spring Boot back-end ke saath built hai, aur H2 database use karta hai data store karne ke liye.
Features

Post Sharing: Team members apne updates ya thoughts share kar sakte hain with file attachments.
Comments & Likes: Posts pe comments aur likes ke through interaction.
Analytics Dashboard: Total posts, likes, comments, aur department-wise activity ka overview.
User Authentication: Secure signup aur login system departments ke saath.
Responsive UI: Mobile aur desktop dono ke liye optimized with a clean design.

Tech Stack

Front-end: React, Axios, CSS
Back-end: Spring Boot, Spring Data JPA, H2 Database
Tools: Maven, Node.js, Git

Screenshots



Description
Screenshot



Sign Up Page



Feed Page



Analytics Dashboard



Post Creation



Prerequisites

Node.js (v20.x ya latest): Download
Java JDK (17 ya latest): Download
Maven (3.9.x ya latest): Download
Git: Download
Ek modern web browser (Chrome, Firefox, etc.).

Setup and Installation
1. Clone the Repository
git clone https://github.com/<tumhara-username>/team-connect.git
cd team-connect

2. Back-end Setup

Back-end folder me jao:cd backend/teamconnect


Maven dependencies install karo:mvn install


Spring Boot application run karo:mvn spring-boot:run


Verify karo:
Open http://localhost:8080/api/posts (JSON return hoga).
H2 console access karo at http://localhost:8080/h2-console:
JDBC URL: jdbc:h2:mem:testdb
Username: sa
Password: (blank)





3. Front-end Setup

Front-end folder me jao:cd frontend/teamconnect


Node.js dependencies install karo:npm install


React app start karo:npm start


Browser me http://localhost:3000 open karo.

4. Test the Application

Sign Up/Login: Sign up page pe ek account banao (email, password, department).
View Feed: Feed page pe posts, comments, aur likes dekho.
Add a Post:
Post creation form me details daalo (jaise "Team meeting scheduled").
Submit karo aur feed pe post dekho.


Analytics Dekho: Analytics page pe total posts, likes, comments check karo.
Database: H2 console me POST table check karo for new entries.

Dependencies
Back-end (backend/teamconnect/pom.xml)

Spring Boot Starter Web
Spring Data JPA
H2 Database
Lombok
Spring Boot DevTools

Front-end (frontend/teamconnect/package.json)

React
axios
Node.js

External Libraries

Poppins Font: https://fonts.googleapis.com/css2?family=Poppins

Configurations

Back-end (backend/teamconnect/src/main/resources/application.properties):spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update


CORS: Enabled in PostController.java for http://localhost:3000.


Front-end:
API endpoint: http://localhost:8080/api/posts.
Port: 3000 (configurable in package.json).



Troubleshooting

Maven Error:
Check mvn -version aur JAVA_HOME (JDK 17).
Run mvn clean install.


Node.js Error:
Delete node_modules/ aur package-lock.json, then npm install.


CORS Issue:
Verify @CrossOrigin("http://localhost:3000") in PostController.java.


Port Conflict:
Update package.json:"scripts": {
  "start": "react-scripts start --port 3001"
}





Demo
A Single Page Application (SPA) with:

Database: H2 for post storage.
APIs: RESTful endpoints (GET/POST /api/posts).
Libraries: Axios, Poppins font.

Screenshots me UI aur functionality dekho.
Project Notes
Meets requirements:

Database: H2 (POST table).
APIs: GET/POST /api/posts.
Libraries: Axios, Poppins font.
Documentation: README with setup, dependencies, screenshots.

License
MIT License.

Developed by Chandan Dehariya.
