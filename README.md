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

1. New user sign-up:
You may sign up as a new To-do List user, you will need to enter a username, a valid email address, a password and password confirmation to sign up (there will be error messages displayed on the sign up page if your user information does not meet the requirements, such as if the username you chose has already been taken up by other users, or if your email address is not valid). Upon successful sign-up, you will be automatically signed in and redirected to your Tasks page.

2. Existent user log-in:
If you have logged out from To-do List, you can log in again with the email address and password you have chosen. To log out from the To-do List, find the log out link on the homepage. Note: the log out link is only available to logged-in users.

3. Create new to-do task:
You can create a new task with the New Task link on the navigation bar or the button on the Tasks page, this will bring you to a page where you can fill in the title, description (and choose categories if you have created at least one) of your task. Note that the task title cannot be empty, the description is optional, you can fill in the deadline or location of that particular task. In addition, you cannot have two tasks with duplicated titles (again, error messages will be displayed if your task information is invalid).

4. View all tasks:
You may take a quick look of all your tasks through the Tasks link on the navigation bar. There will be a View Details button that navigates to the detailed task information page.

5. Task show page:
By clicking on the View Details button on the Tasks page, you will be redirected to the detailed task show page where every information about the task will be showed to you. On the task show page, you have the options to update the task, delete the task and go back to the Tasks page. In addition, the tags following Categories contain links to each category the current task belongs to.

6. Update Task:
In the Task show page, there is an option to update the task, clicking on it will bring you to a new page where you can update the title, description, categories and toggle the status of the task (Completed or Ongoing).

7. Categories:
You may view all categories through the Categories button on the navigation bar or the View Categories button on your homepage, you can also create new categories with the Create New Category button on both the Tasks and Categories pages or on the navigation bar. If you do not have any categories created (for example, when you first sign up), there will not be category options available for you to tag a new task on the new task page. However, once you have created some categories, you can go to the edit task page and the category options will become available now. Similar to tasks, when creating new categories, your category name cannot be duplicated. Additionally, by clicking on the name of a category in the All Categories page, you can view all the tasks that have been tagged with that specific category.


For a working copy of the Todo-List, please visit https://asthenosphere-todo-list.herokuapp.com


This project is a web to-do list with backend written using Ruby on Rails and frontend written using React.
