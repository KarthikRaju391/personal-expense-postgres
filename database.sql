CREATE DATABASE expense_database;

--\c into expense_database

CREATE TABLE expense(
   expense_id SERIAL PRIMARY KEY,
   expense_desc varchar(255),
   expense_amount int,
   expense_date date
);