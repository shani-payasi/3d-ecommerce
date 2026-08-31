NOVA --- 3D E-Commerce

A premium, immersive 3D shopping experience built with React,
Three.js, Framer Motion, GSAP and Tailwind CSS.

✨ Overview

NOVA is a modern 3D e-commerce web experience designed to make
online shopping feel more interactive and cinematic.

The project combines a responsive storefront with animated UI,
interactive 3D product previews, product discovery, cart and wishlist
functionality, authentication screens, checkout flow, and smooth page
transitions.

The project source defines NOVA as a premium product experience focused
on immersive digital retail. fileciteturn1file3L469-L487

🚀 Features

🎨 Modern premium dark UI

🧊 Interactive 3D product viewer powered by Three.js

🔄 Auto-rotating 3D product previews

🛍️ Product catalog and product details

🔎 Product search with recent-search history

🛒 Shopping cart and cart drawer

❤️ Wishlist functionality

⚡ Product quick-view modal

🏷️ Product discounts, ratings, new-arrival and bestseller labels

🔍 Shop filtering by category, price and rating

↕️ Product sorting by price, rating and newest

📱 Responsive desktop and mobile navigation

🎬 Animated loading screen

✨ Framer Motion page transitions and UI animation

🎞️ GSAP-based hero animations

🖱️ Custom cursor interaction on desktop

🔐 Login and registration pages

💳 Checkout page

📚 Categories, About and Contact pages

🛡️ Error boundary for 3D rendering failures

The shop implementation supports category, price, rating and search
filters, plus multiple sorting modes. fileciteturn1file6L812-L854

🧭 Main Routes

Route            Purpose

/              Home
/shop          Product collection
/product/:id   Product details
/categories    Product categories
/cart          Shopping cart
/checkout      Checkout
/wishlist      Wishlist
/login         Login
/register      Registration
/about         About NOVA
/contact       Contact

The application uses React Router and wraps the main experience with
cart and wishlist providers. fileciteturn1file3L500-L529

🧰 Tech Stack

Frontend

React 19

React DOM

TypeScript

Vite

React Router DOM

3D

Three.js

React Three Fiber

React Three Drei

Animation & Interaction

Framer Motion

GSAP

ScrollTrigger

Lucide React

HLS.js

Styling & Utilities

Tailwind CSS

Tailwind Merge

clsx

The project configuration includes React, React Router, Three.js, React
Three Fiber/Drei, Framer Motion, GSAP, HLS.js, Tailwind CSS, Vite and
related tooling. fileciteturn1file4L590-L654

🧊 3D Product Experience

NOVA uses React Three Fiber and Drei to create lightweight interactive
product previews.

Different product types are represented using different Three.js
geometries, including:

Sneakers → Torus Knot

Watches → Torus

Headphones → Sphere

Bags → Box

Rings → Torus

Default → Icosahedron

The viewer also supports lighting, floating motion, contact shadows,
orbit controls and automatic rotation. fileciteturn0file0L382-L465

🔎 Search Experience

The search modal searches product names, categories and descriptions and
shows up to six matching products.

Recent searches are stored locally in the browser using localStorage,
allowing the interface to remember the user's recent queries.
fileciteturn1file9L1098-L1134

🛒 Shopping Experience

Product cards provide:

Product image

Category

Rating and review count

Current price

Previous price

Discount percentage

Wishlist toggle

Add-to-cart action

Quick-view action

Interactive 3D preview

The product card also connects directly to cart and wishlist contexts.
fileciteturn0file0L244-L379

📁 Project Structure

A typical structure for the project is:

3d-ecommerce/
├── public/
├── src/
│   ├── components/
│   │   ├── CategoryCard.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── Product3DViewer.jsx
│   │   ├── ProductCard.jsx
│   │   └── SearchModal.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Categories.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Register.jsx
│   │   ├── Shop.jsx
│   │   └── Wishlist.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
└── README.md

⚙️ Getting Started

1. Clone the repository

git clone <your-repository-url>
cd 3d-ecommerce

2. Install dependencies

npm install

3. Start the development server

npm run dev

Then open the local URL shown by Vite in your browser.

4. Create a production build

npm run build

5. Preview the production build

npm run preview

The configured package scripts are dev, build, and preview.
fileciteturn1file4L598-L605

🎨 Design Direction

NOVA follows a premium digital-retail aesthetic:

Dark, minimal interface

High-contrast typography

Rounded cards and controls

Soft gradients and glow effects

Glassmorphism-inspired overlays

Smooth motion and transitions

Interactive 3D objects

Responsive layouts for different screen sizes

🔐 State Management

The application uses React Context providers for:

Cart state --- products added to the shopping cart

Wishlist state --- products saved by the user

These providers wrap the main router/layout so cart and wishlist data
can be accessed throughout the application.
fileciteturn1file3L509-L517

🛡️ Error Handling

The 3D viewer is protected by an ErrorBoundary. If a 3D rendering
error occurs, the application can show a fallback message instead of
breaking the entire experience. fileciteturn1file8L1008-L1032

📱 Responsive Experience

The navigation adapts between desktop and mobile layouts. Desktop
navigation exposes the main sections and shopping actions, while mobile
users get a dedicated expandable menu. fileciteturn1file5L689-L741

📜 Available Scripts

npm run dev
npm run build
npm run preview

🌟 Why NOVA?

Traditional e-commerce pages are mostly static grids of images and text.

NOVA takes a different approach by combining:

E-commerce + 3D + Motion + Interaction

The result is a storefront that feels more like a digital product
experience than a traditional online shop.

🔮 Future Improvements

Potential next steps:

Real backend/API integration

Real authentication

Payment gateway integration

Persistent cart and wishlist database

Admin dashboard

Inventory management

Order tracking

Customer reviews

Product CMS

Real product-specific 3D models

Image optimization and CDN strategy

Automated testing

SEO improvements

Accessibility audit

👨‍💻 Development Workflow

For clean Git history, features and project files can be committed in
logical, focused commits instead of putting every change into one large
commit.

Example:

git add src/data/products.js
git commit -m "Add product data"

git add src/pages/Shop.jsx
git commit -m "Add shop page"

git add src/components/ProductCard.jsx
git commit -m "Add product card component"

📄 License

This project is intended as a portfolio/demo e-commerce experience. Add
your preferred license and ownership information before publishing it as
an open-source project.

Built with React, Three.js and modern web technologies.

NOVA --- Experience Shopping in 3D.