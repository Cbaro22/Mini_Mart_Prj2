
#  Mini Mart Backend

A backend service for managing a Mini Mart application built with Node.js, Express, and MongoDB.  
It provides secure authentication, product and category management, order handling, and email notifications.



## Features

- Authentication & Authorization   using JWT  
- CRUD Operations       for Products, Categories, and Orders  
- User Management     (register, login, delete)  
- Stock Tracking     (automatic in-stock status update)  
- Email Notifications   using Nodemailer and EJS templates  
- Validation           with Express Validator  
- MongoDB Integration     using Mongoose  
- Error Handling Middleware      for clean responses

## More featutre

- Email services
- Authentication and Validation
- Users can browse and view products 
- Users can place orders  
  With multiple items
- Order schema with logic
- Product Schema.
- user/admin registration and login
- Implement role based access control 
- Category schema
- Admin can create categories and products.
- Error Handling

---

## Tech Stack

- Node.js   (Runtime)
- Express.js  (Server Framework)
- MongoDB & Mongoose  (Database)
- EJS   (Templating for Emails)
- JWT   (Authentication)
- Nodemailer (Email Service)
- dotenv  (Environment Variables)
- bcrypt  (Password Hashing)



## Project Structure
MiniMart_Backend/
├── Config/
│ └── db.js # Database connection
├── Controllers/
│ ├── userCtrl.js # User logic (register, login, delete)
│ ├── productCtrl.js # CRUD for products
│ ├── categoryCtrl.js # CRUD for categories
│ └── orderCtrl.js # Order creation & management
├── Middlewares/
│ ├── authMiddleware.js # JWT authentication
│ ├── errorMiddleware.js # Global error handling
│ └── validatorMiddleware.js# Input validation
├── Modules/
│ ├── UserModule.js
│ ├── ProductModule.js
│ ├── CategoryModule.js
│ └── OrderModule.js
├── Routes/
│ ├── userRoutes.js
│ ├── productRoutes.js
│ ├── categoryRoutes.js
│ └── orderRoutes.js
├── Services/
│ ├── emailService.js # Handles email sending
│ └── views/email/ # EJS templates for emails
│ ├── orderConfirmation.ejs
│ └── signup.ejs
├── .env # Environment variables
├── app.js # Main entry point
└── package.json






## Environment Variables

Create a `.env` file in root directory with the following:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/minimartdb

JWT_SECRET=your_secret_key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

## API ENDPOINT

### User Routes

Method	Endpoint	        Description
POST	   /api/register	   Register a new user
POST	   /api/login	       Login user
GET     /api/allUsers      Get list Users
GET     /api/getUser       Find a user
PUT     /api/update        Update user information
DELETE	/api/delete/:id	   Delete user

## Product Routes

Method	     Endpoint	                 Description
POST	  /api/Createproduct	         Add product
GET	       /api/allProducts	         Get all products
GET	     /api/oneproducts/:id	       Get single product
PUT	      /api/update/:id	           Update product
DELETE	  /api/deleteproduct/:id	   Delete product

## Order Routes

Method	     Endpoint	              Description
POST	        /api/createOrder	    Create Order
GET	          /api/allOrder	        Get all Orders
GET           /api/order/:id        Find a single Order
PUT           /api/update/:id       Update Order
PATCH	     /api/cancelOrder/:id	    Cancel Order

##  Category 

Method	     Endpoint	                      Description
POST	        /api/createCategory	      For creating category
GET	          /api/allCategory	        Get list of Category
GET           /api/getCategory/:id      Find a category
PUT           /api/updateCategory/:id   Update Category
DELETE	     /api/deleteCategory/:id	  Delete category

## DOCUMENTATION LINK
https://documenter.getpostman.com/view/44317742/2sB3WmV3hR

##AUTHOR
Clerk Oghenekobaro
