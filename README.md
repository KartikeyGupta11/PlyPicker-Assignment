Project Management Dashboard
This is a Project Management Dashboard built using Next.js for the frontend and MongoDB for data storage. The web app allows for dynamic project management with role-based access and approval workflows for updates.

Features
Dynamic Web Pages: The app displays a series of project cards, each containing detailed information and images. The project data is fetched dynamically from MongoDB, ensuring that changes are immediately reflected on the frontend.

Admin Dashboard:

Admins have full control over all project details, including the ability to update information and images.
Any changes made by the admin are instantly updated without the need for approval.
Team Member Dashboard:

Team members can request changes to the project data, but the changes are only applied after approval from the admin.
The change request system ensures that data consistency is maintained and updates are monitored.
Approval Workflow:

Team members submit a request to update a project detail.
The admin can either approve or reject the request.
Only approved requests are applied to the project, ensuring controlled access to project modifications.
Tech Stack
Next.js: For building server-rendered React applications and creating a fast, SEO-optimized frontend.
MongoDB: Used as the database to store project details and manage update requests.
Node.js & Express: For creating backend APIs to handle admin and team member actions.
How to Run Locally
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/project-management-dashboard.git
cd project-management-dashboard
Install dependencies:

bash
Copy code
npm install
Set up environment variables by creating a .env file:

makefile
Copy code
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the development server:

bash
Copy code
npm run dev
Open the browser and navigate to http://localhost:3000.

Future Improvements
Adding real-time notifications for admins when a team member submits a change request.
Introducing role-based analytics for tracking updates and changes across projects.
Improving image upload functionality with cloud storage integration.
