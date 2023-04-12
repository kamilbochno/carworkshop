# carworkshop
<p align="center">
  <img src="preview_images/Home/Home.png?raw=true" alt="carworkshop"/>
</p>

> Carworkshop is an app consisting of a landing page and dashboard for the client and for the admin/employee. <br>

Live demo <br>
• Coming soon

Admin login credentials <br>
<b>Email</b>: admin@test.com <br>
<b>Password</b>: test

Client login credentials <br>
<b>Email</b>: client@test.com <br>
<b>Password</b>: test

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#improvements-to-be-done)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
Carworkshop is an app consisting of a landing page and dashboard for the client and for the admin/employee.<br>
The landing page (home) consists of navbar at the top of the website,
an information section where a potential customer can learn more about the workshop
and a footer at the bottom of the page with the most important information about the workshop.
In addition, when being at the bottom of the page, you can use the button to return to the top of the page.

The dashboard is different for the client and different for the admin. In client dashboard user can easily search for service history, cars overview
and appointments from the car repair shop section, and for order history and new offers from car shop section. From dashboard user can quickly navigate
to manage cars, appointments and shop subpages. On the navbar in the top of the dashboard user can navigate to my cars, appointment, shop, user profile
and settings subpages. User can additionally return to the homepage and logout from dashboard.

In admin/employee dashboard admin can easily search for services history, employees overview, appointments and recent purchases tables. From dashboard admin can view details or edit/delete table items. On the navbar in the top of the dashboard admin can navigate to warehouse and employees subpages. Admin can additionally return to the homepage and logout from dashboard.


## Technologies Used:
- <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original-wordmark.svg" title="CSS3" alt="CSS3" width="20" height="20"/> CSS3&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="20" height="20" align='center'/> JavaScript ES6+&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="TypeScript" alt="TypeScript" width="20" height="20"/> TypeScript&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="Nodejs" alt="Nodejs" width="20" height="20"/> Node.js&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express" alt="Express" width="20" height="20"/> Express&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="20" height="20"/> React.js&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-original-wordmark.svg" title="Docker" alt="Docker" width="20" height="20"/> Docker&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-plain.svg" title="Tailwind" alt="Tailwind" width="20" height="20"/> Tailwind&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original-wordmark.svg" title="HTML5" alt="HTML5" width="20" height="20" align='center'/> HTML5&nbsp;
- <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original-wordmark.svg" title="CSS" alt="CSS" width="20" height="20" align='center'/> CSS3&nbsp;

### :hammer_and_wrench: Tools:
- <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original-wordmark.svg" title="Mongodb" alt="Mongodb" width="20" height="20"/> Mongodb (app db)&nbsp;
- <img src="https://symbols.getvecta.com/stencil_9/32_aws-elastic-beanstalk.3cbb564d52.svg" title="AWS" alt="AWS" width="20" height="20" align='center'/> AWS S3 (product images)&nbsp;

## Features
General
- Sign up an account
- Sign in to account (with user authentication)
- Sign in and sign up form validation (on frontend, and on backend)
- All forms validation on client side

Client dashboard
- Service history table (service details)
- Cars overview table (manage button that navigates to my cars subpage)
- Appointments table (add button that navigates to appointments subpage)
- Order history table (order details)
- New offers carousel with shop now button that navigates to shop subpage)

Client dashboard cars
- Add car
- My cars table (car details, edit and delete)

Client dashboard appointment
- Make an appointment (form to create appointment)

Client dashboard shop
- Shop navbar with currency and items cart
- Products category filter
- Products per page selection
- Search items filter
- Add item to cart (with validation)
- Shopping cart with items (calculate price of single items and subtotal, remove items from cart)
- Shopping cart items checkout (connect with stripe payment service api for payment processing)
- Shopping cart items saved in cookies

Client dashboard profile
- Client profile details
- Client profile editable settings

Admin dashboard
- Services history table (add service, service details, delete service)
- Employees overview table (manage button that navigates to employees subpage)
- Appointments table (appointment details, edit and delete)
- Recent purchases table (purchase details and edit)

Admin dashboard warehouse

Car repair shop items section
- Products category filter
- Products per page selection
- Add new item
- Items list (item details, edit and delete)
- Items list pagination

Car shop items section
- Products category filter
- Products per page selection
- Add new item
- Items list (item details, edit and delete)
- Items list pagination

Admin dashboard employees
- Add new employee
- Employees table (employee details, edit and delete)

## Screenshots

Landing page

<img src="preview_images/Home/Reviews_section.png?raw=true" alt="Reviews_section"/>
<img src="preview_images/Home/Contact_form.png?raw=true" alt="Contact_form"/>
<img src="preview_images/Home/Home_footer.png?raw=true" alt="Home_footer"/>
<img src="preview_images/Home/Home_signed_up.png?raw=true" alt="Home_signed_up"/>
<img src="preview_images/Home/Home_logout_toast.png?raw=true" alt="Home_logout_toast"/>
<img src="preview_images/Home/Login_page_validation1.png?raw=true" alt="Login_page_validation1"/>
<img src="preview_images/Home/Login_page_validation2.png?raw=true" alt="Login_page_validation2"/>
<img src="preview_images/Home/Login_page_validation3.png?raw=true" alt="Login_page_validation3"/>
<img src="preview_images/Home/Signup.png?raw=true" alt="Signup"/>
<img src="preview_images/Home/Signup_validation1.png?raw=true" alt="Signup_validation1"/>
<img src="preview_images/Home/Signup_validation2.png?raw=true" alt="Signup_validation2"/>

Client dashboard
<img src="preview_images/Dashboard/Client_dashboard.png?raw=true" alt="Client_dashboard"/>
<img src="preview_images/Dashboard/Client_dashboard1.png?raw=true" alt="Client_dashboard1"/>
<img src="preview_images/Dashboard/Client_dashboard2.png?raw=true" alt="Client_dashboard2"/>
<img src="preview_images/Dashboard/Client_appointment.png?raw=true" alt="Client_appointment"/>
<img src="preview_images/Dashboard/Client_appointment_validation.png?raw=true" alt="Client_appointment_validation"/>
<img src="preview_images/Dashboard/Client_cars.png?raw=true" alt="Client_cars"/>
<img src="preview_images/Dashboard/Client_cars_add.png?raw=true" alt="Client_cars_add"/>
<img src="preview_images/Dashboard/Client_cars_add_validation.png?raw=true" alt="Client_cars_add_validation"/>
<img src="preview_images/Dashboard/Client_cars_add_validation1.png?raw=true" alt="Client_cars_add_validation2"/>
<img src="preview_images/Dashboard/Client_cars_delete.png?raw=true" alt="Client_cars_delete"/>
<img src="preview_images/Dashboard/Client_cars_edit.png?raw=true" alt="Client_cars_edit"/>
<img src="preview_images/Dashboard/Client_shop.png?raw=true" alt="Client_shop"/>
<img src="preview_images/Dashboard/Client_shop1.png?raw=true" alt="Client_shop1"/>
<img src="preview_images/Dashboard/Client_shop2.png?raw=true" alt="Client_shop2"/>
<img src="preview_images/Dashboard/Client_shop3.png?raw=true" alt="Client_shop3"/>
<img src="preview_images/Dashboard/Client_shop4.png?raw=true" alt="Client_shop4"/>
<img src="preview_images/Dashboard/Client_shop5.png?raw=true" alt="Client_shop5"/>
<img src="preview_images/Dashboard/Client_shop_cart.png?raw=true" alt="Client_shop_cart"/>
<img src="preview_images/Dashboard/Client_shop_cart1.png?raw=true" alt="Client_shop_cart1"/>
<img src="preview_images/Dashboard/Client_shop_checkout.png?raw=true" alt="Client_shop_checkout"/>
<img src="preview_images/Dashboard/Client_shop_checkout2.png?raw=true" alt="Client_shop_checkout2"/>
<img src="preview_images/Dashboard/Client_profile.png?raw=true" alt="Client_profile"/>
<img src="preview_images/Dashboard/Client_profile2.png?raw=true" alt="Client_profile2"/>

Admin dashboard
<img src="preview_images/Dashboard/Dashboard_loading.png?raw=true" alt="Dashboard_loading"/>
<img src="preview_images/Dashboard/Admin_dashboard.png?raw=true" alt="Admin_dashboard"/>
<img src="preview_images/Dashboard/Admin_dashboard2.png?raw=true" alt="Admin_dashboard2"/>
<img src="preview_images/Dashboard/Admin_dashboard3.png?raw=true" alt="Admin_dashboard3"/>
<img src="preview_images/Dashboard/Admin_dashboard_employees.png?raw=true" alt="Admin_dashboard_employees"/>
<img src="preview_images/Dashboard/Admin_dashboard_employees1.png?raw=true" alt="Admin_dashboard_employees1"/>
<img src="preview_images/Dashboard/Admin_dashboard_items.png?raw=true" alt="Admin_dashboard_items"/>
<img src="preview_images/Dashboard/Admin_dashboard_items2.png?raw=true" alt="Admin_dashboard_items2"/>
<img src="preview_images/Dashboard/Admin_dashboard_purchases.png?raw=true" alt="Admin_dashboard_purchases"/>
<img src="preview_images/Dashboard/Admin_dashboard_services.png?raw=true" alt="Admin_dashboard_services"/>
<img src="preview_images/Dashboard/Admin_dashboard_services2.png?raw=true" alt="Admin_dashboard_services2"/>
<img src="preview_images/Dashboard/Admin_dashboard_services3.png?raw=true" alt="Admin_dashboard_services3"/>

... and many more!

## Setup

Localhost version:
1. Create New Folder <br>

2. Clone project
> Type <br>
> 'git clone https://github.com/kamilbochno/carworkshop.git into the console/git cli <br>

3. Launch development server
> Type <br>
> 'cd backend' <br>
> Create '.env' file (required variables are located in env-sample) <br>
Then <br>
> type 'node app.js' in console and start the development node server <br>

4. Launch development frontend
> Launch new terminal <br>
Then type <br>
> 'cd frontend' <br>
Then <br>
> type 'npm start' in console and start the development frontend <br>

Docker version:
1. Create New Folder <br>

2. Clone project
> Type <br>
> 'git clone https://github.com/kamilbochno/carworkshop.git into the console/git cli <br>

3. Run and build dockerized development app
> Type <br>
> 'docker-compose up --build' <br>


## Project Status
Project is: :fire: COMPLETED :fire:

## Improvements to be done
- Mobile version of the application
- Improvements on source code
- Investigate for unexpected bugs and fix them
- Improve app loading speed
- Improve api speed

## Contact
Created by Kamil Bochno - feel free to contact me!
<div id="badges">
  <a href="https://www.facebook.com/kamilbochno/">
    <img src="https://img.shields.io/badge/Facebook-blue?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook Badge"/>
  </a>
  
   <a href="mailto:bochno.kamil@gmail.com" target="_blank">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail Badge"/>
  </a>
  
  <a href="https://www.linkedin.com/in/kamilbochno/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
  
</div>
