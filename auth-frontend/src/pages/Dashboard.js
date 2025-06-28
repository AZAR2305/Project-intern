import React, { useState,useEffect } from "react";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import "./DashBoard.css";

const groceryData = {
  "FruitsAndVegetables": [
    { "id": 1, "name": "Apple", "image": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGV8ZW58MHx8MHx8fDA%3D", "price": 1.50 },
    { "id": 2, "name": "Banana", "image": "https://plus.unsplash.com/premium_photo-1724250081093-a9fbb288e0ea?w=500&auto=format&fit=crop&q=60", "price": 0.75 },
    { "id": 3, "name": "Orange", "image": "https://plus.unsplash.com/premium_photo-1671119151604-d2af993980ad?w=500&auto=format&fit=crop&q=60", "price": 1.25 },
    { "id": 4, "name": "Mango", "image": "https://images.unsplash.com/photo-1724565923610-1171662f28b6?w=400&auto=format&fit=crop&q=60", "price": 2.00 },
    { "id": 5, "name": "Grapes", "image": "https://images.unsplash.com/photo-1512054509311-7ad94d0702ff?w=400&auto=format&fit=crop&q=60", "price": 2.50 },
    { "id": 6, "name": "Pineapple", "image": "https://images.unsplash.com/photo-1450098722705-562182a09e45?w=400&auto=format&fit=crop&q=60", "price": 3.00 },
    { "id": 7, "name": "Watermelon", "image": "https://plus.unsplash.com/premium_photo-1724256227267-cfe917bc1d9b?w=400&auto=format&fit=crop&q=60", "price": 4.00 },
    { "id": 8, "name": "Strawberry", "image": "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=400&auto=format&fit=crop&q=60", "price": 2.25 },
    { "id": 9, "name": "Blueberry", "image": "https://images.unsplash.com/photo-1517399793420-c08c6933dbc8?w=400&auto=format&fit=crop&q=60", "price": 2.75 },
    { "id": 10, "name": "Peach", "image": "https://plus.unsplash.com/premium_photo-1664392057907-6c0cec55f8a9?w=400&auto=format&fit=crop&q=60", "price": 1.80 },
    { "id": 11, "name": "Plum", "image": "https://images.unsplash.com/photo-1509885995320-e12bdf1f2204?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGx1bSUyMCUyMDY4MyoxMDI0fGVufDB8fDB8fHww", "price": 2.50 },
    { "id": 12, "name": "kiwi", "image": "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpd2klMjAlMjA2ODMqMTAyNHxlbnwwfHwwfHx8MA%3D%3D", "price": 3.00 },
    { "id": 13, "name": "lemon", "image": "https://plus.unsplash.com/premium_photo-1675731118342-1544e274b633?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "price": 4.00 },
    { "id": 14, "name": "Lime", "image": "https://images.unsplash.com/photo-1511640234009-a472b03307a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxpbWUlMjAlMjA2ODMqMTAyNHxlbnwwfHwwfHx8MA%3D%3D", "price": 2.25 },
    { "id": 15, "name": "Cherry", "image": "https://images.unsplash.com/photo-1529694784800-80c3e0a84815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoZXJyeSUyMCUyMDY4MyoxMDI0fGVufDB8fDB8fHww", "price": 2.75 },
    { "id": 16, "name": "Papaya", "image": "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwYXlhJTIwJTIwNjgzKjEwMjR8ZW58MHx8MHx8fDA%3D", "price": 1.80 },
    { "id": 17, "name": "Coconut", "image": "https://plus.unsplash.com/premium_photo-1664298732368-fbc51e29c80c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29jb251dCUyMCUyMDY4MyoxMDI0fGVufDB8fDB8fHww", "price": 2.50 },
    { "id": 18, "name": "Carrot", "image": "https://plus.unsplash.com/premium_photo-1724250196880-208a09112c54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fycm90JTIwJTIwNjgzKjEwMjR8ZW58MHx8MHx8fDA%3D", "price": 3.00 },
    { "id": 19, "name": "Potato", "image": "https://plus.unsplash.com/premium_photo-1724256031338-b5bfba816cfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG90YXRvJTIwJTIwNjgzKjEwMjR8ZW58MHx8MHx8fDA%3D", "price": 4.00 },
    { "id": 20, "name": "Tomato", "image": "https://plus.unsplash.com/premium_photo-1725001313912-8492832ca09f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvJTIwJTIwNjgzKjEwMjR8ZW58MHx8MHx8fDA%3D", "price": 2.25 },
    { "id": 21, "name": "Onion", "image": "https://images.unsplash.com/photo-1647709281372-78dc89cd3ce8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D", "price": 2.75 },
    { "id": 22, "name": "Garlic", "image": "https://plus.unsplash.com/premium_photo-1675731118463-c475c5508b80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwJTIwNjgzKjEwMjR8ZW58MHx8MHx8fDA%3D", "price": 1.80 },
    { "id": 23, "name": "Spinach", "image": "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D", "price": 2.75 },
    { "id": 24, "name": "Cabbage", "image": "https://plus.unsplash.com/premium_photo-1700028099716-f9915f53624e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiYmFnZSUyMCUyMDY4MyoxMDI0fGVufDB8fDB8fHww", "price": 1.80 }
  ]
,"Dairy Products": [
  { id: 101, name: "Milk", price: 1.25, image: "https://images.unsplash.com/photo-1517448931760-9bf4414148c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 102, name: "Butter", price: 2.75, image: "https://images.unsplash.com/photo-1590912710024-6d51a6771abd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnV0dGVyfGVufDB8fDB8fHww" },
  { id: 103, name: "Cheese", price: 3.25, image: "https://plus.unsplash.com/premium_photo-1691939610797-aba18030c15f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZXNlfGVufDB8fDB8fHww"},
  { id: 104, name: "Yogurt", price: 1.8, image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9ndXJ0fGVufDB8fDB8fHww" },
  { id: 105, name: "Cream", price: 2.3, image: "https://plus.unsplash.com/premium_photo-1723759365132-af57124362b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JlYW0lMjBkYWlyeSUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D" },
  { id: 106, name: "Sour Cream", price: 2.1, image: "https://media.istockphoto.com/id/479121800/photo/fresh-dairy-products.webp?a=1&b=1&s=612x612&w=0&k=20&c=kjYXSo0izbacYm8T146ydFd1ZEelY9nY57rJCh3sJDA=" },
  { id: 107, name: "Ghee", price: 4.5, image: "https://images.unsplash.com/photo-1707424124274-689499bbe5e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2hlZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 108, name: "Whipped Cream", price: 3.0, image: "https://media.istockphoto.com/id/2214195364/photo/liquid-cream-splashing-top-view-composition.webp?a=1&b=1&s=612x612&w=0&k=20&c=kZCeSA54QQZRod0wcZor8WFE7SrX1nkbEYcYeY_Dd8U=" },
  { id: 109, name: "Condensed Milk", price: 2.0, image: "https://media.istockphoto.com/id/1400349796/photo/condensed-milk-in-a-bowl-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=QEWaiww5RV1bj2FAo83dOm7siILKFf1GtsEUg1La6nk=" },
  { id: 111, name: "Paneer", price: 3.2, image: "https://media.istockphoto.com/id/1210307314/photo/homemade-indian-paneer-cheese-made-from-fresh-milk-and-lemon-juice-diced-in-a-wooden-bowl-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=lxl09yuBFdNixpBtfraw3FR9Z1TMzohRVTKj5nDcFdY=" },
  { id: 112, name: "Milk Powder", price: 3.75, image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsayUyMHBvd2RlcnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 115, name: "Buttermilk", price: 1.5, image: "https://media.istockphoto.com/id/535471850/photo/spiced-buttermilk-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=ybGQUkPVlaUn-1aKdXp8lSDD4Ool0IO-EUOJQKpJr0Q=" }
]
,"Bakery": [
  { id: 201, name: "Bread", price: 2.0, image: "https://media.istockphoto.com/id/1301620014/photo/sliced-bread-stock-image-with-wooden-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=K0pSFUi7yC80ENjDxP6FAv-6BMFdF0_Y1V1zFnONE1Y=" },
  { id: 202, name: "Croissant", price: 2.5, image: "https://media.istockphoto.com/id/1487270816/photo/freshly-baked-croissants-and-cup-of-coffee-on-table-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=lNKfhq11xGbkAHbwPnn-F2-FW582Uf1e3q7fUSNJbEo=" },

  { id: 204, name: "Donut", price: 1.2, image: "https://media.istockphoto.com/id/465529983/photo/field-of-different-types-of-donuts.webp?a=1&b=1&s=612x612&w=0&k=20&c=uSJi2YzX0ioiD2s50dyBxnhV1UJqN6oeAuwGT5ZuQ9Y=" },

  { id: 206, name: "Cupcake", price: 2.0, image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwY2FrZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 207, name: "Brownie", price: 2.1, image: "https://media.istockphoto.com/id/178634141/photo/stack-of-brownies.webp?a=1&b=1&s=612x612&w=0&k=20&c=OlYyrlM2he8NhBevfHV3VkUpWwmRyeykY-eGmJicGEI=" },

  { id: 209, name: "Naan", price: 2.0, image: "https://media.istockphoto.com/id/1140752821/photo/indian-naan-bread-with-garlic-butter-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=lOeYboRNvwONnykKUu7lN-UQg5c0cl0CKfDFiVFfhBk=" },
  { id: 210, name: "Garlic Bread", price: 2.5, image: "https://media.istockphoto.com/id/487219905/photo/toasted-cheese-and-garlic-bread.webp?a=1&b=1&s=612x612&w=0&k=20&c=cGAAIAmbkH-ZfPoXBpqUUXHUgLtSRqAXGJaTK3KJ6us=" },

]

,"Meat & Seafood": [
  { id: 301, name: "Chicken Breast", price: 5.50, image: "https://source.unsplash.com/featured/?chicken-breast" },
  { id: 302, name: "Salmon", price: 8.25, image: "https://source.unsplash.com/featured/?salmon" },
  { id: 303, name: "Beef Steak", price: 9.75, image: "https://source.unsplash.com/featured/?beef-steak" },
  { id: 304, name: "Ground Beef", price: 6.50, image: "https://source.unsplash.com/featured/?ground-beef" },
  { id: 305, name: "Pork Chops", price: 7.20, image: "https://source.unsplash.com/featured/?pork-chops" },
  { id: 306, name: "Turkey Breast", price: 6.75, image: "https://source.unsplash.com/featured/?turkey-breast" },
  { id: 307, name: "Shrimp", price: 9.00, image: "https://source.unsplash.com/featured/?shrimp" },
  { id: 308, name: "Crab Legs", price: 12.50, image: "https://source.unsplash.com/featured/?crab-legs" },
  { id: 309, name: "Tilapia", price: 5.80, image: "https://source.unsplash.com/featured/?tilapia" },
  { id: 310, name: "Bacon", price: 4.75, image: "https://source.unsplash.com/featured/?bacon" },
  { id: 311, name: "Ham", price: 4.90, image: "https://source.unsplash.com/featured/?ham" },
  { id: 312, name: "Lamb Chops", price: 10.25, image: "https://source.unsplash.com/featured/?lamb-chops" },
  { id: 313, name: "Hot Dogs", price: 3.25, image: "https://source.unsplash.com/featured/?hot-dogs" },
  { id: 314, name: "Sausages", price: 4.50, image: "https://source.unsplash.com/featured/?sausages" },
  { id: 315, name: "Duck Breast", price: 11.00, image: "https://source.unsplash.com/featured/?duck-breast" },
  { id: 316, name: "Clams", price: 7.95, image: "https://source.unsplash.com/featured/?clams" },
  { id: 317, name: "Mussels", price: 6.95, image: "https://source.unsplash.com/featured/?mussels" },
  { id: 318, name: "Cod Fillet", price: 6.75, image: "https://source.unsplash.com/featured/?cod-fillet" },
  { id: 319, name: "Roast Beef", price: 8.80, image: "https://source.unsplash.com/featured/?roast-beef" },
  { id: 320, name: "Chicken Wings", price: 4.60, image: "https://source.unsplash.com/featured/?chicken-wings" },
  { id: 321, name: "Chicken Thighs", price: 4.20, image: "https://source.unsplash.com/featured/?chicken-thighs" },
  { id: 322, name: "Salami", price: 5.00, image: "https://source.unsplash.com/featured/?salami" },
  { id: 323, name: "Octopus", price: 9.95, image: "https://source.unsplash.com/featured/?octopus" },
  { id: 324, name: "Anchovies", price: 3.40, image: "https://source.unsplash.com/featured/?anchovies" }
]
,"Beverages": [
  { id: 401, name: "Orange Juice", price: 3.00, image: "https://source.unsplash.com/featured/?orange-juice" },
  { id: 402, name: "Coffee", price: 4.00, image: "https://source.unsplash.com/featured/?coffee" },
  { id: 403, name: "Green Tea", price: 2.25, image: "https://source.unsplash.com/featured/?green-tea" },
  { id: 404, name: "Black Tea", price: 2.00, image: "https://source.unsplash.com/featured/?black-tea" },
  { id: 405, name: "Lemonade", price: 2.75, image: "https://source.unsplash.com/featured/?lemonade" },
  { id: 406, name: "Soda", price: 1.50, image: "https://source.unsplash.com/featured/?soda" },
  { id: 407, name: "Iced Tea", price: 2.25, image: "https://source.unsplash.com/featured/?iced-tea" },
  { id: 408, name: "Energy Drink", price: 2.95, image: "https://source.unsplash.com/featured/?energy-drink" },
  { id: 409, name: "Coconut Water", price: 2.80, image: "https://source.unsplash.com/featured/?coconut-water" },
  { id: 410, name: "Apple Juice", price: 2.65, image: "https://source.unsplash.com/featured/?apple-juice" },
  { id: 411, name: "Sparkling Water", price: 1.75, image: "https://source.unsplash.com/featured/?sparkling-water" },
  { id: 412, name: "Cola", price: 1.60, image: "https://source.unsplash.com/featured/?cola" },
  { id: 413, name: "Root Beer", price: 1.90, image: "https://source.unsplash.com/featured/?root-beer" },
  { id: 414, name: "Milkshake", price: 3.50, image: "https://source.unsplash.com/featured/?milkshake" },
  { id: 415, name: "Smoothie", price: 3.75, image: "https://source.unsplash.com/featured/?smoothie" },
  { id: 416, name: "Protein Shake", price: 4.20, image: "https://source.unsplash.com/featured/?protein-shake" },
  { id: 417, name: "Ginger Ale", price: 1.85, image: "https://source.unsplash.com/featured/?ginger-ale" },
  { id: 418, name: "Tonic Water", price: 1.60, image: "https://source.unsplash.com/featured/?tonic-water" },
  { id: 419, name: "Hot Chocolate", price: 2.30, image: "https://source.unsplash.com/featured/?hot-chocolate" },
  { id: 420, name: "Latte", price: 3.90, image: "https://source.unsplash.com/featured/?latte" },
  { id: 421, name: "Cappuccino", price: 3.70, image: "https://source.unsplash.com/featured/?cappuccino" },
  { id: 422, name: "Mocha", price: 4.10, image: "https://source.unsplash.com/featured/?mocha" },
  { id: 423, name: "Bottle Water", price: 1.20, image: "https://source.unsplash.com/featured/?bottle-water" },
  { id: 424, name: "Herbal Tea", price: 2.10, image: "https://source.unsplash.com/featured/?herbal-tea" }
]

,"Pantry Staples": [
  { id: 501, name: "Rice", price: 1.75, image: "https://source.unsplash.com/featured/?rice" },
  { id: 502, name: "Pasta", price: 2.25, image: "https://source.unsplash.com/featured/?pasta" },
  { id: 503, name: "Flour", price: 1.50, image: "https://source.unsplash.com/featured/?flour" },
  { id: 504, name: "Sugar", price: 1.20, image: "https://source.unsplash.com/featured/?sugar" },
  { id: 505, name: "Salt", price: 0.80, image: "https://source.unsplash.com/featured/?salt" },
  { id: 506, name: "Black Pepper", price: 1.60, image: "https://source.unsplash.com/featured/?black-pepper" },
  { id: 507, name: "Cooking Oil", price: 3.50, image: "https://source.unsplash.com/featured/?cooking-oil" },
  { id: 508, name: "Olive Oil", price: 4.25, image: "https://source.unsplash.com/featured/?olive-oil" },
  { id: 509, name: "Vinegar", price: 1.90, image: "https://source.unsplash.com/featured/?vinegar" },
  { id: 510, name: "Baking Powder", price: 1.10, image: "https://source.unsplash.com/featured/?baking-powder" },
  { id: 511, name: "Baking Soda", price: 1.00, image: "https://source.unsplash.com/featured/?baking-soda" },
  { id: 512, name: "Yeast", price: 1.75, image: "https://source.unsplash.com/featured/?yeast" },
  { id: 513, name: "Cornstarch", price: 1.60, image: "https://source.unsplash.com/featured/?cornstarch" },
  { id: 514, name: "Lentils", price: 2.00, image: "https://source.unsplash.com/featured/?lentils" },
  { id: 515, name: "Chickpeas", price: 2.10, image: "https://source.unsplash.com/featured/?chickpeas" },
  { id: 516, name: "Beans", price: 1.90, image: "https://source.unsplash.com/featured/?beans" },
  { id: 517, name: "Quinoa", price: 2.75, image: "https://source.unsplash.com/featured/?quinoa" },
  { id: 518, name: "Couscous", price: 2.60, image: "https://source.unsplash.com/featured/?couscous" },
  { id: 519, name: "Spaghetti", price: 2.30, image: "https://source.unsplash.com/featured/?spaghetti" },
  { id: 520, name: "Tomato Sauce", price: 1.50, image: "https://source.unsplash.com/featured/?tomato-sauce" },
  { id: 521, name: "Canned Corn", price: 1.25, image: "https://source.unsplash.com/featured/?canned-corn" },
  { id: 522, name: "Canned Tomatoes", price: 1.40, image: "https://source.unsplash.com/featured/?canned-tomatoes" },
  { id: 523, name: "Peanut Butter", price: 2.90, image: "https://source.unsplash.com/featured/?peanut-butter" },
  { id: 524, name: "Jam", price: 2.80, image: "https://source.unsplash.com/featured/?jam" }
]

,
"Snacks": [
  { id: 701, name: "Chips", price: 1.75, image: "https://source.unsplash.com/featured/?chips" },
  { id: 702, name: "Cookies", price: 2.00, image: "https://source.unsplash.com/featured/?cookies" },
  { id: 703, name: "Nuts", price: 3.75, image: "https://source.unsplash.com/featured/?nuts" },
  { id: 704, name: "Popcorn", price: 1.50, image: "https://source.unsplash.com/featured/?popcorn" },
  { id: 705, name: "Pretzels", price: 1.80, image: "https://source.unsplash.com/featured/?pretzels" },
  { id: 706, name: "Crackers", price: 2.10, image: "https://source.unsplash.com/featured/?crackers" },
  { id: 707, name: "Trail Mix", price: 3.50, image: "https://source.unsplash.com/featured/?trail-mix" },
  { id: 708, name: "Fruit Snacks", price: 1.60, image: "https://source.unsplash.com/featured/?fruit-snacks" },
  { id: 709, name: "Granola Bars", price: 2.20, image: "https://source.unsplash.com/featured/?granola-bars" },
  { id: 710, name: "Chocolate Bar", price: 1.90, image: "https://source.unsplash.com/featured/?chocolate-bar" },
  { id: 711, name: "Chewing Gum", price: 0.99, image: "https://source.unsplash.com/featured/?chewing-gum" },
  { id: 712, name: "Toffee", price: 1.50, image: "https://source.unsplash.com/featured/?toffee" },
  { id: 713, name: "Candy", price: 1.40, image: "https://source.unsplash.com/featured/?candy" },
  { id: 714, name: "Dried Mango", price: 2.75, image: "https://source.unsplash.com/featured/?dried-mango" },
  { id: 715, name: "Rice Cakes", price: 1.60, image: "https://source.unsplash.com/featured/?rice-cakes" },
  { id: 716, name: "Energy Bar", price: 2.50, image: "https://source.unsplash.com/featured/?energy-bar" },
  { id: 717, name: "Pita Chips", price: 2.30, image: "https://source.unsplash.com/featured/?pita-chips" },
  { id: 718, name: "Beef Jerky", price: 3.25, image: "https://source.unsplash.com/featured/?beef-jerky" },
  { id: 719, name: "Peanut Butter Crackers", price: 1.80, image: "https://source.unsplash.com/featured/?peanut-butter-crackers" },
  { id: 720, name: "Cheese Balls", price: 2.10, image: "https://source.unsplash.com/featured/?cheese-balls" },
  { id: 721, name: "Veggie Chips", price: 2.60, image: "https://source.unsplash.com/featured/?veggie-chips" },
  { id: 722, name: "Mini Pretzels", price: 1.70, image: "https://source.unsplash.com/featured/?mini-pretzels" },
  { id: 723, name: "Yogurt Covered Raisins", price: 2.90, image: "https://source.unsplash.com/featured/?yogurt-covered-raisins" },
  { id: 724, name: "Seaweed Snacks", price: 2.00, image: "https://source.unsplash.com/featured/?seaweed-snacks" }
]
};
function GroceryStore() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [currentCategory, setCurrentCategory] = useState(Object.keys(groceryData)[0]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '{}');
    const cleaned = {};
    Object.entries(saved).forEach(([id, qty]) => {
      const exists = Object.values(groceryData).flat().some(i => i.id === Number(id));
      if (exists) cleaned[id] = qty;
    });
    setCart(cleaned);
  }, [groceryData]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (id, qty) => {
    setCart(prev => {
      const updated = { ...prev };
      if (qty > 0) updated[id] = qty;
      else delete updated[id];
      return updated;
    });
  };

  // Map cart entries to item + qty
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const item = Object.values(groceryData).flat().find(i => i.id === Number(id));
      return item ? { ...item, qty } : null;
    })
    .filter(Boolean);

  // Fetch total price safely
  const getTotalPrice = () =>
    cartItems.reduce((sum, i) => sum + (i.price * i.qty), 0);

  // Filter items by search
  const filteredData = {};
  Object.entries(groceryData).forEach(([cat, items]) => {
    filteredData[cat] = items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });
       
 const handleCheckout = async () => {
  try {
    const token = localStorage.getItem('token');

    // ✅ Use cartItems here
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      alert('Cart is empty or invalid.');
      return;
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const response = await axios.post(
      'http://localhost:5000/api/order',
      {
        items: cartItems,       // 👈 send full items with name, price, qty
        totalAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert('Order placed successfully!');
    setCart({});
    localStorage.removeItem('cart');
  } catch (err) {
    console.error('Failed to place order', err);
    alert('Failed to place order');
  }
};



  return (
    <div className="gs-container">
      <div className="gs-header">
        <h1>GreenGrocer</h1>
        <div className="gs-buttons">
          <button className="profile-btn" onClick={() => navigate('/profile')}>Profile</button>
          <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
            🛒 ({cartItems.length})
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search groceries..."
        className="gs-search"
        value={search}
        onChange={e => setSearch(e.target.value.trim())}
      />

      <div className="gs-categories">
        {Object.keys(groceryData).map(cat => (
          <button
            key={cat}
            className={`cat-btn ${cat === currentCategory ? 'active' : ''}`}
            onClick={() => setCurrentCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gs-grid">
        {filteredData[currentCategory].map(item => (
          <div key={item.id} className="gs-item">
            <img src={item.image} alt={item.name} />
            <p className="gs-name">{item.name}</p>
            <p className="gs-price">${item.price.toFixed(2)}</p>
            <input
              type="number"
              className="gs-qty"
              min="0"
              value={cart[item.id] || 0}
              onChange={e => handleQuantityChange(item.id, +e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="gs-footer">
        <p>Total: <strong>${getTotalPrice().toFixed(2)}</strong></p>
      </div>

      {showCart && (
        <div className="cart-drawer">
          <h2>Your Cart</h2>
          {cartItems.length ? (
            <>
              <ul>
                {cartItems.map(i => (
                  <li key={i.id}>
                    {i.name} × {i.qty} = ${(i.price * i.qty).toFixed(2)}
                  </li>
                ))}
              </ul>
              <button onClick={handleCheckout} className="buy-btn">Buy Now</button>
            </>
          ) : (
            <p>Cart is empty.</p>
          )}
          <button onClick={() => setShowCart(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default GroceryStore;
