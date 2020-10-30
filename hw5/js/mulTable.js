/*
    Tharith Sovann
    University of Massachusetts Lowell
    Email: tharith_sovann@student.uml.edu
    Class: COMP.4610-201 GUI Programming I HW5
    Copyright (c) October 27th, 2020 Tharith Sovann. All rights reserved.
    May be freely copied or excerpted for educational purposes with credit to
    author.
    Created on 10/27/2020
*/
function generateTable() {

//prevents the javascript from refreshing after the function finishes
//it'll just wait for the submit button
event.preventDefault();

var minRowVal = +document.getElementById("minRowVal").value;
var maxRowVal = +document.getElementById("maxRowVal").value;
var minColVal = +document.getElementById("minColVal").value;
var maxColVal = +document.getElementById("maxColVal").value;

//condition counters
var isNum = 0;
var minLargerThanMax = 0;
var minMaxBoundary = 0;

//for getting rid of the table
var emptyRows = " ";

//resetting the error boxes after the submit button is pressed
document.getElementById("error-box").innerHTML = "";
document.getElementById("error-box2").innerHTML = "";
document.getElementById("error-box3").innerHTML = "";

//CHECK IF NOT NUMBER
if ( isNaN(minRowVal) || isNaN(maxRowVal) || isNaN(minColVal) || isNaN(maxColVal) ) {
  isNum = 1;
  document.getElementById("error-box").innerHTML = "Please input numbers";
}

//ERROR IF MINIMUM > MAXIMUM
if ( minRowVal > maxRowVal || minColVal > maxColVal ) {
  minLargerThanMax = 1;
  document.getElementById("error-box2").innerHTML = "Please make sure the minimums value are smaller than their maximum values";
}

// -100 to 100
if ( minRowVal < -100 || maxRowVal > 100 || minColVal < -100 || maxColVal > 100 ||
     maxRowVal < -100 || minRowVal > 100 || maxColVal < -100 || minColVal > 100 ) {
  minMaxBoundary = 1;
  document.getElementById("error-box3").innerHTML = "Please make sure the values are between -100 and 100, inclusively";
}

if ( (isNum + minLargerThanMax + minMaxBoundary) > 0 ) {
  document.getElementById("multable").innerHTML = emptyRows; //gets rid the table previously shown if there is one
  return;
}

//Some of my print codes to test if the numbers were coming in correctly
/*
alert(minRowVal);
alert(maxRowVal);
alert(minColVal);
alert(maxColVal);
*/
//document.getElementById("error-box").innerHTML = minRowVal;
//document.getElementById("error-box").innerHTML = maxRowVal;
//document.getElementById("error-box").innerHTML = minColVal;
//document.getElementById("error-box").innerHTML = maxColVal;

// https://www.w3schools.com/html/html_tables.asp
//Populating the rows for the table
var rows = '<tr>';
rows += '<td>' + '' + '</td>';//empty top left cell

for(var i = minRowVal; i <= maxRowVal; i++){
  rows += '<td>' + i + '</td>';//fills in the row number
}
 rows += '</tr>';//ends row

 for(var i= minColVal; i <= maxColVal; i++){
   rows += '<td>' + i + '</td>';//fills the column number

   // the multiplication between the numbers
 for(var j = minRowVal; j <= maxRowVal; j++){
   rows += '<td>' + i*j + '</td>';//multiplies values at current row and column and add it to the rows being populated
   }
 rows += '</tr>';//ends row
 }

document.getElementById("multable").innerHTML = rows; //prints the rows into the table
}
