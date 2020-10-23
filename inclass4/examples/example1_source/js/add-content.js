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
var today = new Date();

var hourNow = today.getHours();

var greeting;

//default greeting
greeting = 'Welcome!';

/*mod by 24 for when the hour transitions from 23:59 to 00:00,
since hour 24:00 == 00:00, and I'm not sure which getHours() will
return, the mod % 24 will ensure it is midnight either way*/
hourNow = (hourNow % 24);

// hours between 0 and right before 12 is morning
if (hourNow >= 0 && hourNow < 12) {
    greeting = 'Good Morning';
}

// hours between 12 and right before 18 is morning
if (hourNow >= 12 && hourNow < 18) {
    greeting = 'Afternoon';
}

// hours between 18 and right before 24 is morning
if (hourNow >= 18 && hourNow < 24) {
    greeting = 'Evening';
}


document.write('<h3>' + greeting + '</h3>');
