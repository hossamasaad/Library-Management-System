# Library Management System

# How to start the application

1. Run MySQL

    ```bash
    docker run --name MYSQL_LIBRARY_SYSTEM -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:latest
    ```


## Assumptions

Here I will make some assumptions for the system

1. System Users
    1. User: can access, add or update resources
    2. Admin: can access, add, update and delete resources and add new system User
2. Borrower : borrow a book, return a book, list all borrowed books
3. ISBN-13 (need 17 chars, 4 hyphens) e.g. 789-0-12-999111-2
4. Shelf Location will user varchar for simplicity



## Database Schema
![Database Schema](assets/schema.png)
-> need update
-> add indexes

## Project structure


## Implementation

### SQL Injection
### JWT
### Error handler
### Logger
### RateLimitting
