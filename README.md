# FoodCart-React
FoodCart is a simple CRUD application through which users can place food orders of their choice. It makes use of Redux and Firebase to perform the following functionalities

 - Sign In/ Sign Up
 - Create order of choice
 - Place new order in the database
 - Retrieve all orders placed by the user
 - Delete order
 
 

## Getting Started

### Prerequisites
 
 - NodeJS
 - Firebase account

### Installing

 1. Clone or download this repository
 2. Run the following command in the project directory
	```
		npm install
    ```
 3. Navigate to `src/config/firebase/firebase.js` and insert your firebase configuration in this file's `config` variable
 
	    const  config  = {
	   		apiKey:  'YOUR_API_KEY',
	        	authDomain:  'YOUR_DOMAIN',
	        	databaseURL:  'YOUR_DATABASE_URL',
	        	projectId:  'YOUR_PROJECT_ID',
	        	storageBucket:  'YOUR_STORAGE_BUCKET',
	        	messagingSenderId:  'YOUR_MESSAGING_ID' 	
	        }
4. Run the following command in the project directory
	```
		npm start
    ```
5. This will launch the development server and the app will be served on http://localhost:3000


## Built With
  
*  ReactJS
*  Redux
*  Redux Form
*  Firebase

## Authors

*  **Urooj Ayub**- uroojayub17@gmail.com
	-[(Github)](https://github.com/UroojAyub)

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE Version 3 - see the [LICENSE](https://github.com/UroojAyub/FoodCart-React/blob/master/LICENSE) file for details

  
