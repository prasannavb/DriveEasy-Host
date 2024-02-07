# DriveEasyHost
<p>Welcome to DriveEasy Host! DriveEasy Host is a website designed for hosts to list their cars for rental, enabling sustainable reuse and passive income opportunities. Whether you have a spare car or want to make extra income from your vehicle, DriveEasy Host provides an easy-to-use platform to manage your car listings and bookings.</p>

<h1>Table of Contents</h1>
<ul>
  <li>Features</li>
  <li>Demo</li>
  <li>Tech Stack</li>
  <li>Folder Structure</li>
  <li>Database Schema</li>
  <li>Usage</li>
  <li>Installation</li>
</ul>

<h2>Demo</h2>
<p>The demo  of the website is available <a href='https://driveeasyhost.netlify.app/'>here</a></p>


<h2>Features</h2>
<ul>
<li><b>Login:</b> Host can securely log in to their accounts to access personalized features and add thier  car</li>
<li><b>Signup:</b> New host can create an account by providing necessary details and credentials to access the rental car hosting platform.</li>
<li><b>Car Listing Management:</b> Hosts can add, edit, and remove their car listings. They can specify dates when their cars should be available for booking, allowing them to use their cars for personal use when they're busy.</li>
<li><b>Availability Management:</b>Hosts can specify availability dates for their cars, allowing them to manage when their cars are available for rental.</li>
<li><b>Booking Management:</b> Hosts can view their current, previous, and upcoming bookings. They can also download their bookings as a PDF for record-keeping.</li>
<li><b>Earnings Tracking:</b> Hosts can see their total booking earnings, with a graph provided for visual representation.</li>
<li><b>Reviews:</b> Hosts can view reviews for their cars left by previous renters.</li>
<li><b>Profile Management:</b> Host can update their profiles with personal information and preferences.</li>
<li><b>Customer Support:</b> Provides options for host to contact customer support via email for assistance.</li>
<li><b>Service Centers:</b> osts can send their cars for service at official DriveEasy service centers directly from their live location. This ensures that their cars are well-maintained and ready for rental.</li>
<li><b>Powerful Authentication:</b> Implements robust authentication mechanisms to ensure secure access to user accounts and sensitive information such as insurance details etc.</li>
<li><b>Storage Management:</b> Efficiently manages and stores user data, including car and profile images, using advanced storage solutions for optimal performance and scalability.</li>
<li><b>Email Service:</b> A email is sent at the end of each trip to ensure user satisfaction and provide a seamless experience.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
 <li><b>HTML:</b> The standard markup language for creating web pages. HTML provides the structure and content of a web page.</li>
<li><b>CSS:</b> Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in HTML. CSS enhances the appearance and layout of web pages.</li>
<li><b>React.js:</b> A JavaScript library for building user interfaces.</li>
<li><b>Vite:</b> A fast build tool for modern web development.</li>  
<li><b>Node.js:</b> A JavaScript runtime for server-side development.</li>
<li><b>Express.js:</b> A web application framework for building APIs.</li>
<li><b>MongoDB(Atlas):</b> A cloud-based NoSQL database for storing application data.</li>
<li><b>API Management Creation:</b> Includes tools and platforms used for creating and managing APIs to facilitate communication between different software applications.</li>
<li><b>Firebase Authentication:</b> A service provided by Firebase for authenticating users and managing user sessions securely.</li>
<li><b>Firebase Storage:</b> A cloud storage service provided by Firebase for storing images, including car and profile images.</li>
<li><b>Ant Design (antd):</b> A React UI library for building beautiful and responsive user interfaces with pre-designed components and styles.</li>
<li><b>Netlify:</b> A cloud platform for hosting static websites, including client-side applications.</li>
<li><b>Vercel:</b> A cloud platform for hosting serverless functions and full-stack applications, including server-side applications.</li>
</ul>

<h2>Folder Structure</h2>
<ul>
  <li><b>client/</b>: Contains the frontend React application.(https://github.com/prasannavb/DriveEasyHost.git)</li>
  <li><b>server/</b>: Contains the backend Node.js application.(https://github.com/prasannavb/DriveEasyHost-Server.git)</li>
  <li><b>public/</b>: Contains static assets for the frontend application.</li>
  <li><b>src/</b>: Contains the source code for both frontend and backend applications.</li>
</ul>

<h2>Database Schema</h2>
<p>The database schema is carefully designed by ensuring no data redundancy and optimizing each response to send proper data.</p>
<p>The MongoDB database consists of collections such as Activebookings, sellerdetails, reviews, serviceCenters,PastBookings,carmetadatas,cardetails etc., to store application data.</p>

<h2>Usage</h2>
<p>DriveEasyHost was created with the mission to connect people and their cars during unused times, transforming idle vehicles into usable assets. This not only promotes sustainable practices but also enables individuals to earn money, turning car-sharing into a rewarding and environmentally conscious endeavor.</p>

<h2>Installation</h2>
<span>To install and run this game locally, follow these steps:</span>
<li><b>Clone the repository:</b></li>
<code>git clone https://github.com/prasannavb/DriveEasyHost.git</code><br/>
<code>git clone https://github.com/prasannavb/DriveEasyHost-Server.git</code><br/>
<li><b>Navigate to the project directory</b></li>
<li><b>Install dependencies:</b></li>
<code>npm install</code>
<li><b>Start the development Server:</b></li>
<code>npm run dev</code>

<h3>Copyright ©2025 All rights reserved |Designed by Prasanna V B</h3>


