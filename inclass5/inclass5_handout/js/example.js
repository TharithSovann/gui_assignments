// ADD NEW ITEM TO END OF LIST
var ls = document.getElementsByTagName('ul')[0];

var lastItem = document.createElement("li");
var lastText = document.createTextNode("cream");

ls.appendChild(lastItem);
lastItem.appendChild(lastText);



// ADD NEW ITEM START OF LIST
var ls = document.getElementsByTagName('ul')[0];

var startingItem = document.createElement("li");
var startingText = document.createTextNode("kale");

startingItem.appendChild(startingText);
ls.insertBefore(startingItem, ls.firstChild);



// ADD A CLASS OF COOL TO ALL LIST ITEMS
var ls = document.querySelectorAll('li');

for (var i = 0; i < ls.length; i++)
  ls[i].className = 'cool';



// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var ls = document.querySelectorAll('li');

var hdr = document.querySelector('h2');
var newHdr =  hdr.firstChild.nodeValue + '<span>' + ls.length + '</span>';
hdr.innerHTML = newHdr;
