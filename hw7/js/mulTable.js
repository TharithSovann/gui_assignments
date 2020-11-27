/*
    Tharith Sovann
    University of Massachusetts Lowell
    Email: tharith_sovann@student.uml.edu
    Class: COMP.4610-201 GUI Programming I HW7
    Copyright (c) November 25th, 2020 Tharith Sovann. All rights reserved.
    May be freely copied or excerpted for educational purposes with credit to
    author.
    Created on 11/22/2020
*/

//I don't know why the error message is not showing up live AS I input into the field, it
//is only showing up AFTER I move on to another field
$(document).ready(function() {

  $("#container").validate({
    errorClass: 'errmsg',
    wrapper: "div",
    rules: {
      minRowVal: {
        required: true,
        number: true,
        range: [-100, 100]
      },
      maxRowVal: {
        required: true,
        number: true,
        range: [-100, 100]
      },
      minColVal: {
        required: true,
        number: true,
        range: [-100, 100]
      },
      maxColVal: {
        required: true,
        number: true,
        range: [-100, 100]
      }
    },
    messages: {
      minRowVal: {
        required: '    Please enter a number from -100 to 100'
      },
      maxRowVal: {
        required: '    Please enter a number from -100 to 100'
      },
      minColVal: {
        required: '    Please enter a number from -100 to 100'
      },
      maxColVal: {
        required: '    Please enter a number from -100 to 100'
      },
    submitHandler: function(form) {
      form.submit();
    }
  }
  });
});

//to verify than the min is not greater than max
$.validator.addMethod('lessThan', function(value, element, param) {
  if (this.optional(element))
    return true;
  var i = parseInt(value);
  var j = parseInt($(param).val());
  return i < j;
}, "    The minimum value must be less than the maximum number");


$("#minRowVal").val(0);
$("#maxRowVal").val(0);
$("#minColVal").val(0);
$("#maxColVal").val(0);
/////////////////////////////SLIDERS//////////////////////////////////

//---------Updates the table live based on slider movement---------
minRowVal.addEventListener('input', function()
{
    generateTable();
});
maxRowVal.addEventListener('input', function()
{
  generateTable();
});
minColVal.addEventListener('input', function()
{
  generateTable();
});
maxColVal.addEventListener('input', function()
{
  generateTable();
});

//-------------------------minRowSlider----------------------------
var minRowSlider_Opts = { // minRowSlider interactions to change form
  animate:  true ,
  disabled: false,
  range:    false,
  values:   null ,
  min:      -100  ,
  max:       100  ,
  slide: function() {
      $("#minRowVal").val($("#minRowSlider").slider("value"));
      generateTable();
  }
};

(function($){ //call back to opts
  $("#minRowSlider").slider(minRowSlider_Opts);
})(jQuery);

//-------------------------maxRowSlider----------------------------
var maxRowSlider_Opts = { // maxRowSlider interactions to change form
  animate:  true ,
  disabled: false,
  range:    false,
  values:   null ,
  min:      -100  ,
  max:       100  ,
  slide: function() {
      $("#maxRowVal").val($("#maxRowSlider").slider("value"));
      generateTable();
  }
};

(function($){ //call back to opts
  $("#maxRowSlider").slider(maxRowSlider_Opts);
})(jQuery);

//-------------------------minColSlider----------------------------
var minColSlider_Opts = { // minColSlider interactions to change form
  animate:  true ,
  disabled: false,
  range:    false,
  values:   null ,
  min:      -100  ,
  max:       100  ,
  slide: function() {
      $("#minColVal").val($("#minColSlider").slider("value"));
      generateTable();
  }
};

(function($){ //call back to opts
  $("#minColSlider").slider(minColSlider_Opts);
})(jQuery);

//-------------------------maxColSlider----------------------------
var maxColSlider_Opts = { // maxColSlider interactions to change form
  animate:  true ,
  disabled: false,
  range:    false,
  values:   null ,
  min:      -100  ,
  max:       100  ,
  slide: function() {
      $("#maxColVal").val($("#maxColSlider").slider("value"));
      generateTable();
  }
};

(function($){ //call back to opts
  $("#maxColSlider").slider(maxColSlider_Opts);
})(jQuery);

function generateTable() {

  //prevents the javascript from refreshing after the function finishes
  //it'll just wait for the submit button

  var minRowVal = +document.getElementById("minRowVal").value;
  var maxRowVal = +document.getElementById("maxRowVal").value;
  var minColVal = +document.getElementById("minColVal").value;
  var maxColVal = +document.getElementById("maxColVal").value;

  //condition counters
  var isNum = 0;
  var minMaxBoundary = 0;
  var emptyField = 0;

  //for getting rid of the table
  var emptyRows = " ";

  $("#container").submit(function(e) {
    e.preventDefault();
  });


  //resetting the error boxes after the submit button is pressed
  document.getElementById("error-box").innerHTML = "";
  document.getElementById("error-box2").innerHTML = "";
  document.getElementById("error-box3").innerHTML = "";

  //If submitted with empty field
  if( $('#minRowVal').val() == '' || $('#maxRowVal').val() == '' || $('#minColVal').val() == '' || $('#maxColVal').val() == '' ){
    document.getElementById("error-box").innerHTML = "Please input numbers";
    emptyField = 1;
  }

  //CHECK IF NOT NUMBER
  if ( isNaN(minRowVal) || isNaN(maxRowVal) || isNaN(minColVal) || isNaN(maxColVal) ) {
    isNum = 1;
    document.getElementById("error-box").innerHTML = "Please input numbers";
  }

  //SWAP IF MINIMUM > MAXIMUM
  if ( minRowVal > maxRowVal || minColVal > maxColVal ) {
    var temp;
    if ( minRowVal > maxRowVal ) {
      temp = maxRowVal;
      maxRowVal = minRowVal;
      minRowVal = temp;
      document.getElementById("error-box2").innerHTML = "Min and max row values swapped";
    }
    if ( minColVal > maxColVal ) {
      temp = maxColVal;
      maxColVal = minColVal;
      minColVal = temp;
      document.getElementById("error-box3").innerHTML = "Min and max col values swapped";
    }
  }

  // -100 to 100
  /* NOW HANDLED WITH JQUERY
  if ( minRowVal < -100 || maxRowVal > 100 || minColVal < -100 || maxColVal > 100 ||
       maxRowVal < -100 || minRowVal > 100 || maxColVal < -100 || minColVal > 100 ) {
    minMaxBoundary = 1;
    document.getElementById("error-box3").innerHTML = "Please make sure the values are between -100 and 100, inclusively";
  }*/

  if ( (isNum + minMaxBoundary + emptyField) > 0 ) {
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
