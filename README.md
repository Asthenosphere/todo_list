# README

Name: Wang Luo 
Matriculation Number: A0180092L 
Faculty: NUS School of Computing

To get the app running:
1. clone to a local address
2. open up a Terminal and cd to the unzipped folder
3. run bundle install
4. run yarn install --check-files (visit https://www.yarnpkg.com/en/docs/install if you do not have yarn installed on your device)
5. run rails:db migrate
6. run rails s to fire up the server
7. open a browser and navigate to localhost:3000

Features:
1. Sign up with a username, any valid email address and a password
2. You may create, retrieve, update and delete (CRUD) to-do tasks
3. You may create categories to tag your tasks (Note: by default there are no categories, if you have already created a task without any categories, you may still add categories to this task later by updating it, options for categories will be available once you have created some categories)
4. You may change the status of your task, either completed or ongoing
5. You may also edit your profile information, i.e. username, email address and password

Admin funcionality:
1. sign up or log in a user first
2. find the user id at the site address, which will be of the form localhost:3000/users/#, where # stands for some number and that will be the user id 
3. go back to the Terminal, stop the server by Ctrl-c 
4. run rails c to enter the rails console 
5. run User.find(#).toggle!(:admin)
6. now this user will be an admin user, run exit to exit out of the rails console
7. run rails s to start the server again, go to localhost:3000 and refresh the page (if you have closed the tab or browser, log in as the user you just set as admin), go to the homepage, the welcome message will now be [Your Username] (Admin). You now have the authority to view and delete other users
  
  
Use cases:

1. New user sign-up: You may sign up as a new To-do List user with a username, an email address, a password and password confirmation. Upon successful sign-up, you will be automatically signed in and redirected to your Tasks page.
2. Existent user log-in: If you have logged out from To-do List, or would like to log in from another device, you can log in with your registered email address and password. To log out from the To-do List, find the log out link on the home page.
3. Create new to-do task: You can create a new task with the New Task link on the navigation bar or the button on the Tasks page, which brings you to a form to create a new to-do task. You need to fill in the title (unique and non-empty), description (e.g. due date and/or location or task, optional), and choose categories if you have created at least one category.
4. View all tasks: You may take a quick look of all your tasks through the Tasks link on the navigation bar or home page.
5. Task details page: By clicking on the View Details button on a task in the Tasks page, you can view the detailed information about the task. A task has title, description, associated categories and status. On this page, there are options to update and delete the task. In addition, the category tags on the right contain links to each category the current task belongs to (A task can be tagged with multiple categories).
6. Update task: The Update Task option in the task details page leads you to a form to commit changes to the title, description, categories and status of the task (Completed or Ongoing).
7. View all categories: You may view all your categories through the Categories button on the navigation bar or the Home page.
8. Category details page: Similar to tasks, you can view the details through the View Details option on the listing of categories on the Categories page.
9. Create new category: This option is available on the Tasks, Categories pages as well as the navigation bar. Similarly, category name cannot be duplicated.
10. Update category: The option is available in the category details page. You can update the name and description of the category without the need to modify all the tasks under the category.
11. Tag a task with categories: If you do not have any categories created (e.g. upon signing up), there will be no category options available to tag a task on the new task and update task pages. However, once at least one category is created, you can tag a task from both the new task and update task pages. All your categories will be listed as a series of checkboxes for you to select.
12. Update profile. On the right side of the navigation bar, there is an option to view your profile, in which you have the option to update your personal information (username, email and password).
 
13. All unauthorised access to other users’ pages through direct entry of urls in the browser will be rejected by the server and you will be redirected to the home page.
14. Admin users have the authority to view all To-do List users and delete them. However, admin users are prevented from retrieving the private data (i.e. tasks and categories) of other users through urls.

For a working copy of the Todo-List, please visit https://asthenosphere-todo-list.herokuapp.com


This project is a web to-do list with backend written using Ruby on Rails and frontend written using React.
