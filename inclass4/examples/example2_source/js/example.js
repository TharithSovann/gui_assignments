/*
Tharith Sovann
University of Massachusetts Lowell
Email: tharith_sovann@student.uml.edu
Class: COMP.4610-201 GUI Programming I HW3
The example.html page was created to practice using Javascript
to enchance a website's functionality.
Sources: StackOverflow, Class Videos and Slides, W3Schools
Modified on 10/23/2020
*/

// Create variables for the welcome message
var greeting = 'Howdy';
var name = ' Molly';
var message = ', please check your order:';
var welcome = greeting + name + message;

// Create variables to hold details about the sign
var sign = 'Montague House';
var tiles = sign.length;
var subTotal = tiles * 5; //$5 for each tile
var shipping = 7;
var grandTotal = subTotal + shipping;

// Get the element that has an id of greeting
var docGreet = document.getElementById('greeting');
// Replace the content of that element with the personalized welcome message
docGreet.textContent = welcome;

// Get the element that has an id of userSign then update its contents
var docSign = document.getElementById('userSign');
docSign.textContent = sign;

// Get the element that has an id of tiles then update its contents
var docTiles = document.getElementById('tiles');
docTiles.textContent = tiles;

// Get the element that has an id of subTotal then update its contents
var docSubTotal = document.getElementById('subTotal');
docSubTotal.textContent = '$' + subTotal;

// Get the element that has an id of shipping then update its contents
var docShipping = document.getElementById('shipping');
docShipping.textContent = '$' + shipping;

// Get the element that has an id of grandTotal then update its contents
var docGrandTotal = document.getElementById('grandTotal');
docGrandTotal.textContent = '$' + grandTotal;
