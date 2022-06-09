#  Evolution One Solutions - Mark Joseph Project

# Project Structure
### all database files are in the db folder(seeders/factories/connections), 
### a utils folder was created for any reusable functions
### I did not create any controllers as the project was small, but all API logic is in the routers directory,  
  
# Database Design and Assumptions
### Two Schemas were used in this application, one for the 'Goods' which i called 'Products' and another schema 'PurchaseInfo'. This was done to allow 
### PurchaseInfo to have a hasMany relationship with Products and for further expansion eg. if a purchase history report needed to be generated. For this  ###challenge it was assumed that there was only 1 purchase date associated with each product

# Seeding: To seed the database with product and purchase info you can run the command 'npm run seedProducts'

# Test
### Two basic test were writen using JEST. They can be run with the command 'npm test' and will connect to a seperate Test env and database

# Frontend Usage
### This application can be tested with postman by using the following routes after the baseurl: 
## GET - /products - two query parameters can be passed, 'skip' and 'limit' which account for pagination, skip will be the page number and limit is the number of desired results for each page.

## GET - /products/:id  - will display a specific product based on the id passed in

## POST - /products/create - can be used to create a product

### The frontend team, depending on their framework would for example make an axios call to retrieve the data from the endpoints to get a list of all data(which would contain each product id), to retrieve info about a specific product, on clicking a row there would be some sort of binding which would retrieve the data from the clicked row, and pass the id of the specific product to the /products/:id endpoint to retrieve the specific details
