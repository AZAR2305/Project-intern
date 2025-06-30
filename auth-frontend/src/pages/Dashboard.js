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
  { id: 301, name: "Chicken Breast", price: 5.50, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMGJyZWFzdHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 302, name: "Salmon", price: 8.25, image: "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww" },
  { id: 303, name: "Beef Steak", price: 9.75, image: "https://images.unsplash.com/photo-1677027201352-3c3981cb8b5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVlZiUyMHN0ZWFrfGVufDB8fDB8fHww" },
  { id: 305, name: "Pork Chops", price: 7.20, image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9yayUyMGNob3BzfGVufDB8fDB8fHww" },
  { id: 307, name: "Shrimp", price: 9.00, image: "https://images.unsplash.com/photo-1628919350249-eb45d8829629?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hyaW1wfGVufDB8fDB8fHww" },
  { id: 308, name: "Crab Legs", price: 12.50, image: "https://images.unsplash.com/photo-1511543865714-5a5a5ce51a94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhYiUyMGxlZ3N8ZW58MHx8MHx8fDA%3D" },
  { id: 310, name: "Bacon", price: 4.75, image: "https://media.istockphoto.com/id/1333674385/photo/raw-fed-bacon-strips-on-chopping-board.webp?a=1&b=1&s=612x612&w=0&k=20&c=88waN_2LXxnevpwwXZJnfvguEYY3mMcTP303FCmFZ-0=" },
  { id: 311, name: "Ham", price: 4.90, image: "https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFtfGVufDB8fDB8fHww" },
  { id: 313, name: "Hot Dogs", price: 3.25, image: "https://plus.unsplash.com/premium_photo-1684923610869-204f1ca6a603?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90JTIwZG9nc3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 314, name: "Sausages", price: 4.50, image: "https://plus.unsplash.com/premium_photo-1669986145635-ec9397a9d161?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2F1c2FnZXN8ZW58MHx8MHx8fDA%3D" },
{ id: 323, name: "Octopus", price: 9.95, image: "https://images.unsplash.com/photo-1626232441076-a2a5ada2256a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2N0b3B1cyUyMGZvb2R8ZW58MHx8MHx8fDA%3D" },
]
,"Beverages": [
  { id: 401, name: "Orange Juice", price: 3.00, image: "https://media.istockphoto.com/id/1208798769/photo/juice-in-the-glass-surrounded-by-fresh-vegetables-and-fruits.webp?a=1&b=1&s=612x612&w=0&k=20&c=bAdIZ0stQuOoObhqYfaQ_bWJH4OEuFmW0YkM1Cgk5wQ=" },
  { id: 402, name: "Coffee", price: 4.00, image: "https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fDB8fHww" },
  { id: 403, name: "Green Tea", price: 2.25, image: "https://images.unsplash.com/photo-1606377695906-236fdfcef767?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D" },
  { id: 404, name: "Black Tea", price: 2.00, image: "https://media.istockphoto.com/id/990242644/photo/like-tea.webp?a=1&b=1&s=612x612&w=0&k=20&c=YDJufXRGfY1Up40Yye7M1bl9aTv1e2yJOC-fMK0qDh8=" },
  { id: 405, name: "Lemonade", price: 2.75, image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVtb25hZGV8ZW58MHx8MHx8fDA%3D" },
  { id: 406, name: "Soda", price: 1.50, image: "https://plus.unsplash.com/premium_photo-1725075086631-b21a5642918b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29kYXxlbnwwfHwwfHx8MA%3D%3D" },
 { id: 409, name: "Coconut Water", price: 2.80, image: "https://images.unsplash.com/photo-1518484157348-2cd88dc70d1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29jb251dCUyMHdhdGVyfGVufDB8fDB8fHww" },
  { id: 410, name: "Apple Juice", price: 2.65, image: "https://images.unsplash.com/photo-1605199910378-edb0c0709ab4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjBqdWljZXxlbnwwfHwwfHx8MA%3D%3D" },
{ id: 414, name: "Milkshake", price: 3.50, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsayUyMHNoYWtlfGVufDB8fDB8fHww" },
  { id: 415, name: "Smoothie", price: 3.75, image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D" },
 { id: 419, name: "Hot Chocolate", price: 2.30, image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D" },
  { id: 421, name: "Cappuccino", price: 3.70, image: "https://plus.unsplash.com/premium_photo-1674406102318-c9d362ad510b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FwcHVjaW5ub3xlbnwwfHwwfHx8MA%3D%3D" },
{ id: 423, name: "Bottle Water", price: 1.20, image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D" },
  { id: 424, name: "Herbal Tea", price: 2.10, image: "https://images.unsplash.com/photo-1504382103100-db7e92322d39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVyYmFsJTIwdGVhfGVufDB8fDB8fHww" }
]

,"Pantry Staples": [
  { id: 501, name: "Rice", price: 1.75, image: "https://images.unsplash.com/photo-1504382103100-db7e92322d39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVyYmFsJTIwdGVhfGVufDB8fDB8fHww" },
  { id: 502, name: "Pasta", price: 2.25, image: "https://images.unsplash.com/photo-1447279506476-3faec8071eee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhc3RhfGVufDB8fDB8fHww" },
  { id: 503, name: "Flour", price: 1.50, image: "https://plus.unsplash.com/premium_photo-1671377660174-e43996bfdf03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmxvdXJ8ZW58MHx8MHx8fDA%3D" },
  { id: 504, name: "Sugar", price: 1.20, image: "https://images.unsplash.com/photo-1610219171722-87b3f4170557?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VnYXJ8ZW58MHx8MHx8fDA%3D" },
  { id: 505, name: "Salt", price: 0.80, image: "https://plus.unsplash.com/premium_photo-1676517033038-adb5e37de106?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2FsdHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 506, name: "Black Pepper", price: 1.60, image: "https://images.unsplash.com/photo-1591801058986-9e28e68670f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZXBwZXJ8ZW58MHx8MHx8fDA%3D" },
  { id: 507, name: "Cooking Oil", price: 3.50, image: "https://plus.unsplash.com/premium_photo-1676517033038-adb5e37de106?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2FsdHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 509, name: "Vinegar", price: 1.90, image: "https://plus.unsplash.com/premium_photo-1668772053928-378aec69cbf6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmluZWdhcnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 510, name: "Baking Powder", price: 1.10, image: "https://images.unsplash.com/photo-1638405803126-d12de49c7d47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFraW5nJTIwcG93ZGVyfGVufDB8fDB8fHww" },
  { id: 512, name: "Yeast", price: 1.75, image: "https://images.unsplash.com/photo-1642497393543-0e552dfb5c31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eWVhc3R8ZW58MHx8MHx8fDA%3D" },
  { id: 520, name: "Tomato Sauce", price: 1.50, image: "https://images.unsplash.com/photo-1600157514707-694f4c8f1557?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9tYXRvJTIwc2F1c2V8ZW58MHx8MHx8fDA%3D" },
  { id: 521, name: "Canned Corn", price: 1.25, image: "https://media.istockphoto.com/id/1127106678/photo/sweet-corn.webp?a=1&b=1&s=612x612&w=0&k=20&c=bfXcgxcYompTaV6FKDL1BbnIGEG9RXqAz-RLIw8WDV0=" },
  { id: 522, name: "Canned Tomatoes", price: 1.40, image: "https://media.istockphoto.com/id/2120174129/photo/raw-organic-diced-canned-tomatoes.webp?a=1&b=1&s=612x612&w=0&k=20&c=CtOp4tKyArYLpI6K5n-byIOPA5UfZIJeNy4OyWtxcHU=" },
  { id: 523, name: "Peanut Butter", price: 2.90, image: "https://images.unsplash.com/photo-1615110250484-e8c3b151b957?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVhbnV0JTIwYnV0dGVyfGVufDB8fDB8fHww" },
  { id: 524, name: "Jam", price: 2.80, image: "https://images.unsplash.com/photo-1632848129232-f816b590e5e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFtfGVufDB8fDB8fHww" }
]

,
"Snacks": [
  { id: 701, name: "Chips", price: 1.75, image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpcHN8ZW58MHx8MHx8fDA%3D" },
  { id: 702, name: "Cookies", price: 2.00, image: "https://media.istockphoto.com/id/905563616/photo/preparing-chocolate-chip-cookies.webp?a=1&b=1&s=612x612&w=0&k=20&c=JiB3i4IPXtgA8xMftvCs_vafSgjXMHNXee8P7bBPcbY=" },
  { id: 703, name: "Nuts", price: 3.75, image: "https://images.unsplash.com/photo-1543208541-0961a29a8c3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bnV0c3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 704, name: "Popcorn", price: 1.50, image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wY29ybnxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 705, name: "Pretzels", price: 1.80, image: "https://images.unsplash.com/photo-1583189774117-0d355da61fac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJldHplbHN8ZW58MHx8MHx8fDA%3D" },
  { id: 706, name: "Crackers", price: 2.10, image: "https://images.unsplash.com/photo-1615294209152-571969a7fbfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhY2tlcnN8ZW58MHx8MHx8fDA%3D" },
  { id: 707, name: "Trail Mix", price: 3.50, image: "https://media.istockphoto.com/id/1975242491/photo/trail-mix-nuts-and-seeds-in-a-plate-on-wooden-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=sjzNQ_5sGhM_oP8UCQiYIMpD1KE3dtmOKVHQHOOyyNg=" },
  { id: 708, name: "Fruit Snacks", price: 1.60, image: "https://images.unsplash.com/photo-1589210032689-e6e498bd1380?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJ1aXQlMjBzbmFja3N8ZW58MHx8MHx8fDA%3D" },
  { id: 709, name: "Granola Bars", price: 2.20, image: "https://images.unsplash.com/photo-1633360821154-1935fb5671e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3Jhbm9sYSUyMGJhcnN8ZW58MHx8MHx8fDA%3D" },
  { id: 710, name: "Chocolate Bar", price: 1.90, image: "https://media.istockphoto.com/id/483529225/photo/chocolate-bar.webp?a=1&b=1&s=612x612&w=0&k=20&c=6sZknSiY60GHY_uXgZUbBqwH663HpzUIYrc6iiSqoQw=" },
  { id: 711, name: "Chewing Gum", price: 0.99, image: "https://images.unsplash.com/photo-1557243962-e09aec99b2e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 712, name: "Toffee", price: 1.50, image: "https://plus.unsplash.com/premium_photo-1695397427639-c1ab2419fe92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9mZmVlfGVufDB8fDB8fHww" },
  { id: 713, name: "Candy", price: 1.40, image: "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuZHl8ZW58MHx8MHx8fDA%3D" },
]
};
function GroceryStore() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [currentCategory, setCurrentCategory] = useState(Object.keys(groceryData)[0]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userAddress, setUserAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);


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
  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get('http://localhost:5000/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUserAddress(res.data.user.address || '');
    } catch (err) {
      console.error('Failed to fetch user info', err);
    }
  };

  fetchUser();
}, []);

       
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

    setOrderPlaced(true);
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
  <div className="cart-overlay">
    <div className="cart-modal">
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
          <p><strong>Deliver to:</strong> {userAddress || 'No address found. Please update profile.'}</p>

          <div className="btn-group">
            <button
              className="buy-btn"
              onClick={async () => {
                try {
                  const totalAmount = getTotalPrice();
                  const token = localStorage.getItem('token');

                  const res = await axios.post('http://localhost:5000/api/order', {
                    items: cartItems,
                    totalAmount,
                    address:userAddress
                  }, {
                    headers: { Authorization: `Bearer ${token}` }
                  });

                  setOrderPlaced(true);
                  setCart({});
                  localStorage.removeItem('cart');
                  setShowCart(false);
                } catch (err) {
                  console.error('Checkout error', err);
                  alert('Failed to place order');
                }
              }}
            >
              Buy
            </button>

            <button
              className="order-more-btn"
              onClick={() => {
                setShowCart(false); // just hide modal, keep cart intact
              }}
            >
              Order More
            </button>
          </div>
        </>
      ) : (
        <p>Cart is empty.</p>
      )}
    </div>
  </div>
)}{orderPlaced && (
  <div className="order-modal-overlay">
    <div className="order-confirmation">
      <h2>✅ Order Placed!</h2>
      <p>Your groceries will be delivered to:</p>
      <p className="delivery-address">{userAddress || 'your saved address'}</p>
      <button onClick={() => setOrderPlaced(false)} className="close-modal-btn">
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}
export default GroceryStore;
