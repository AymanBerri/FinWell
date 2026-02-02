# FinWell: Your Financial Well-Being Matters
Welcome to FinWell, a modern web application designed to help users manage their finances effectively. Built using Django for the backend and React for the frontend, FinWell offers users a seamless experience to track income, manage expenses, and visualize financial data. With features like secure authentication and responsive design, FinWell aims to promote financial wellness and empower users to make informed financial decisions.



## Distinctiveness and Complexity:
Categorized as a financial management web application, FinWell stands out as a distinct project within its domain. Differentiating itself from other projects, FinWell is a financial app that leverages React for frontend development, implements token authentication for security, ensures mobile responsiveness, and utilizes renowned libraries such as Material-UI and Chart.js.

### React-Based Development:
Using React for the entire web application has been an educative journey, empowering me to dive deep into modern frontend development using JavaScript frameworks. By leveraging React's component-based architecture and state management capabilities, I've crafted a dynamic and responsive user interface that enhances interactivity and user engagement.

### Mobile-Responsive Design:
I've prioritized mobile-responsive design principles to ensure seamless accessibility across diverse devices and screen sizes. By adopting a fluid layout and employing CSS media queries, and flexbox layout, the application gracefully adjusts its layout and content presentation, offering users a consistent experience whether they access it from a desktop, tablet, or smartphone.

### Modular Component Architecture:
Central to this project is the implementation of a modular component architecture within the React frontend. By adhering to best practices for code organization, reusability, and maintainability, I've strived to create a scalable and maintainable codebase. Each component encapsulates distinct functionality, promoting code clarity and facilitating future enhancements or modifications.

### Token Authentication Handling:
The integration of token authentication adds an extra layer of security to the application. Upon user login, a token is generated and associated with the user session, enabling access to protected endpoints. Conversely, upon logout, the token is invalidated and deleted, preventing potential security threats and ensuring data integrity. This detailed approach safeguards sensitive user information and enhances the overall security posture of the application.

### Financial Management App:
In response to a personal need for effective financial tracking and management, I've developed a specialized financial management application. Unlike conventional social networking or e-commerce projects, this application focuses exclusively on providing users with tools for tracking their finances, managing expenses, and analyzing income trends. This singular focus sets it apart from other projects in the course and underscores its practical utility.

### Familiarity with Famous Libraries:
Throughout the development process, I've extensively utilized renowned libraries such as Material-UI (MUI) and Chart.js to enrich the application's functionality. Leveraging Material-UI's rich set of components, including dialogs, snackbars, drawers, and many more has enhanced the application's user interface and interaction patterns. Additionally, integrating Chart.js has enabled the creation of visually appealing and informative charts, such as line charts for visualizing trends and pie charts for categorizing data. By harnessing the power of these libraries, I've enhanced the user experience and accelerated development without compromising on quality.

## File Structure Overview:

#### Root Directory:
- **.gitignore**: Configuration file specifying files and directories to ignore in version control.
- **adminInfo.txt**: Text file containing administrative information, if any.
- **db.sqlite3**: SQLite database file storing application data.
- **manage.py**: Django's command-line utility for administrative tasks.
- **package-lock.json**: Auto-generated file for npm package dependency locking.
- **package.json**: Configuration file for npm packages and scripts.
- **Pipfile**: Python dependencies file managed by Pipenv.
- **Pipfile.lock**: Auto-generated file containing locked Python dependency versions.
- **project_structure.txt**: Text file providing a visual representation of the project structure.
- **README.md**: Main documentation file providing an overview of the project and its components.

#### Capstone Directory:
- **asgi.py**: ASGI config for Django Channels.
- **settings.py**: Django settings file containing project settings and configurations.
- **urls.py**: URL declarations for the project.
- **wsgi.py**: WSGI config for deploying the application.
- **__init__.py**: Initialization file for the directory.

#### Finwell Directory:
- **admin.py**: Django admin configurations for managing models.
- **apps.py**: Configuration file for Django application settings.
- **models.py**: Defines Django models for the application's database schema.
- **serializers.py**: Contains serializers for converting complex data types to and from native Python data types.
- **tests.py**: File for writing automated tests.
- **urls.py**: URL patterns for the application.
- **utils.py**: Utility functions or helper functions used across the application.
- **views.py**: Contains view functions that handle HTTP requests and return HTTP responses.
- **__init__.py**: Initialization file for the directory.
- **migrations/**: Directory containing database migration files.

#### Frontend Directory:
- **.gitignore**: Configuration file specifying files and directories to ignore in version control for the frontend.
- **package-lock.json**: Auto-generated file for npm package dependency locking for the frontend.
- **package.json**: Configuration file for npm packages and scripts for the frontend.
- **README.md**: Documentation file providing information about the frontend.
- **public/**: Directory containing publicly accessible files.
  - **favicon.ico**: Icon file displayed in browser tabs or bookmarks.
  - **index.html**: Main HTML file serving as the entry point for the frontend.
  - **logo192.png**: Image file for the application's logo.
  - **manifest.json**: JSON file providing metadata used when the web app is installed on a user's mobile device.
  - **robots.txt**: File containing instructions for web crawlers.
  - **assets/**: Directory containing additional assets such as images.
- **src/**: Source code directory containing JavaScript and CSS files.
  - **App.css**: CSS file for styling the main application component.
  - **App.js**: Main JavaScript file defining the root component of the application.
  - **index.css**: CSS file for global styles.
  - **index.js**: JavaScript file serving as the entry point for the frontend application.
  - **reportWebVitals.js**: File for reporting web vitals metrics.
  - **setupTests.js**: File for setting up testing libraries and utilities.
  - **logo.svg**: SVG file for the application's logo.
  - **assets/**: Directory containing additional assets such as images.
  - **components/**: Directory containing React components. (Header, LineChart, PieChart, SidebarNav, Table, TimePeriodChart)
  - **layouts/**: Directory containing layout components for different pages or sections of the application. (Dashboard, Expense, Income, LandingPage, Portal, Profile)


## Running the application

1. Clone the Project:
	- `git clone <repository_url>`

2. Navigate to the Project Directory:
	- `cd <project_directory>`

3. Create and Activate a Virtual Environment (Optional but recommended):
	- Create a virtual environment:
		- `python -m venv venv`
	- Activate the virtual environment:
		- For Unix/Linux:
			- `source venv/bin/activate`
		- For Windows:
			- `venv\Scripts\activate`

4. Install Django and other Backend Dependencies:
	- `pip install -r requirements.txt`

5. Install Frontend Dependencies:
	- `cd frontend`
	- `npm install`

6. Build the React Project:
	- `npm run build`

7. Run the Django Development Server:
 
	- `cd .. `
		 Ensure you are in the project root directory (where manage.py is located).
		 
	- `python manage.py runserver`
		 Access the Django Admin Portal:
		 Open a web browser and go to http://localhost:8000/admin.
		 Log in using the following credentials:
			- Username: admin
			- Password: 123

8. Run the React Development Server:
	- Open a new terminal window/tab.
	- Navigate to the frontend directory:
		- `cd frontend`
	- Run the React development server:
		- `npm start`

9.  Access the Application:
- Once both the Django and React development servers are running, you can access the application by navigating to http://localhost:3000 in your web browser.

## Demo
Youtube demo link -> [https://www.youtube.com/watch?v=bFJUdcwlHCQ](https://www.youtube.com/watch?v=bFJUdcwlHCQ)


