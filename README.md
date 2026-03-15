# E-Commerce Web Application (React + TypeScript + Tailwind CSS)

## Overview

This is a **bilingual (English / Arabic) e-commerce web application** built using **React, TypeScript, and Tailwind CSS**.  

The platform allows users to:  

- Browse products and categories  
- Filter and search catalog items  
- View detailed product information, images, PDFs, and videos  
- Place orders using a **dummy PayMob payment gateway**  
- Track their orders via a responsive, modern interface  

The app supports **EN / AR language switching** with **RTL support** for Arabic.  

---

## Features

### Pages & Components  

1. **Home Page**  
   - Global search bar  
   - Main categories display  
   - Best Sellers section  
   - Responsive layout for desktop, tablet, and mobile  

2. **Catalog / Filteration Page**  
   - Full product listing  
   - Filters: product name, price range, category hierarchy, rating  
   - Sorting: price, rating, newest  
   - Sidebar filter panel, product grid, pagination / infinite scroll  

3. **Product Details Page**  
   - Product image gallery with **zoom on click**  
   - Tabs/accordion for **Description, Data Sheets (PDF), Videos**  
   - Add to cart button  
   - Display product name, price, rating, availability, SKU  

4. **Checkout Page + PayMob Integration**  
   - Requires dummy login  
   - Displays order summary: products, quantities, prices, total amount  
   - Collect shipping address  
   - Redirect to PayMob dummy payment page  

5. **My Orders Page**  
   - Displays list of user orders  
   - Shows order number, date, total amount, current status  
   - Order details view with products, shipping, payment method, status timeline  

### Authentication (Dummy Login)  
- Simple login form (email / phone)  
- Login state stored in **LocalStorage / Context API**  
- Protects checkout and orders pages  

### Other Features  
- Responsive UI (mobile/tablet/desktop)  
- Language switcher (EN / AR) with RTL support  
- Reusable components  
- Loading indicators & error handling  
- **Axios + React Query** for API integration  

---

## Technology Stack

| Layer           | Technology / Library                |
|-----------------|-----------------------------------|
| Frontend        | React (Hooks)                     |
| Type Checking   | TypeScript                        |
| State Management| Context API / Redux               |
| Routing         | React Router                       |
| Styling         | Tailwind CSS                       |
| API Integration | Axios + React Query                |
| Language        | i18n (EN / AR)                     |
| Payment         | PayMob Dummy Integration           |

---

## Non-Functional Requirements

- Page load time under **3 seconds**  
- Secure payment redirection  
- Clean, modern **UI/UX**  
- Cross-browser compatibility  
- Easily extendable for **real backend integration**  

---

## Project Setup

### Install Dependencies

```bash
npm install
