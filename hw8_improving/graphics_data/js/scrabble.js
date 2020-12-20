$(document).ready(function() {

    //$('#submit-button').click(submitWord());


    $(function() {
        for(let i = 1; i < 8; i++){
            $(`#letterSlot${i}`).droppable(droppableOpts);
        }
    });

    initialSetUp();
    
    /*
    $("#rack").droppable({
        drop: function(ev, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
        }
    });*/

});

var dropped;
var droppedOn;
var dropped_id;
var droppedOn_id;

    var droppableOpts = {
        drop: function(ev, ui) {

                dropped = ui.draggable;
                droppedOn = $(this);

                droppedOn_id = droppedOn[0].id;
                dropped_id = dropped[0].id;

                //checks if the slot is already occupied
                let occupied = $(`#${droppedOn_id} img`);
                let occupiedClass = (droppedOn[0].attributes.class.value).split(" ");
                console.log(occupiedClass[0]);
                 if ( occupiedClass[0] == "tileSlot" ||  occupied.length < 1) {
                //################################################################################################
                /* CAN'T DRAG BACK INTO RACK */

                    //adds tile to slot
                    $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
                    dropped.position({of: droppedOn, my: "left+8 top+8", at: "left top"});
                    
                    /*
                    $( `#${droppedOn_id}` ).droppable({
                        accept: ".tileFromBag"
                    });*/
                    //console.log(droppedOn_id);

                    console.log($(droppedOn[0]));
                    console.log($(dropped[0]));
                    var letterPoints = parseInt(dropped[0].attributes.points.nodeValue);
                    console.log(letterPoints);

                    var origin = parseInt(dropped[0].attributes.fromSlot.nodeValue);
                    console.log(origin);
                    
                    //$(`#${dropped_id}`).draggable("disable"); //disables draggable after dropping

                    missingSlots.push(origin);//tile slot that needs to be repopulated

                    var slot_number = parseInt(droppedOn[0].attributes.col.nodeValue);
                    console.log(slot_number);

                    if ( slot_number == 2 || slot_number == 4 ) {
                        letterPoints *= 2;
                        console.log("double points" + letterPoints);
                    }

                    gameScore += letterPoints;


                    //$( `#${droppedOn_id}` ).droppable( "option", "accept", ".no_longer_accepts" );
            }
        }
    }
   var default_tiles = ["A", "A", "A", "A", "A", "A", "A", "A", "A", 
                        "B", "B", "C", "C", "D", "D", "D", "D", "E", 
                        "E", "E", "E", "E", "E", "E", "E", "E", "E", 
                        "E", "E", "F", "F", "G", "G", "G", "H", "H",  
                        "I", "I", "I", "I", "I", "I", "I", "I", "I", 
                        "J", "K", "L", "L", "L", "L", "M", "M", "N",
                        "N", "N", "N", "N", "N", "O", "O", "O", "O", 
                        "O", "O", "O", "O", "P", "P", "Q", "R", "R", 
                        "R", "R", "R", "R", "S", "S", "S", "S", "T", 
                        "T", "T", "T", "T", "T", "U", "U", "U", "U",  
                        "V", "V", "W", "W", "X", "Y", "Y", "Z", "Blank", 
                        "Blank"
                        ] ;

    var tiles = [] ; 

    tiles = [...default_tiles];//starting, default tile bag

    var missingSlots = [];

    var newGame = 1;

    var gameScore = 0;
    
    /*
    -create a vector to hold all of the letter tiles
    generate a random number
    -MOD it by the size of the vector.
    -whatever number results from that is the number
    selected through the .at() method.
    -remove it from vector
    --update--
    -js arrrays are essentially vectors
    -remove elements with splice()
    */ 

    /*
    -checks how many tiles are missing in tile rack, x = missing
    -if tiles.length is bigger, loops x times to get x tiles
    -index = randomly_generated_number MOD tiles.length
    -get the letter from that index for rack
    -splice() to remove 
    -loops until rack is full or no more tiles in bag

    -whatever letter you get, attach it into Scrabble_Tile_ .jpg to get the picture
    -lets say letter is W, make an <img></img> out of this with a letter tag = "W"
    -make class tag = ".ui-widget-content"
    -ScrabbleTiles["W"].values to get the points for that letter
    */
    function randomTile() {
        var missing = 7 - $("#rackContainer img").length;
        //console.log(missing);

        while (tiles.length > 0 && missing > 0) {
            //console.log("hi");
            
            let index = Math.floor((Math.random() * 99999) % tiles.length);

            let letterPickedFromBag = tiles[index];

            putOnRack(letterPickedFromBag, index);

            tiles.splice(index, 1); //removes 1 element at that index
            
            console.log(letterPickedFromBag);
            missing--;
        }
    }

    /*
    -gets passed a letter
    -creates an <img>, check which slot it needs to go to 
    
    */
    function putOnRack(letterPickedFromBag) {

        for ( let i = 0; i < missingSlots.length; i++) {
            let slot_to_fill = missingSlots[i];
            jQuery('<img/>', {
                id: `tileFromBag${slot_to_fill}`,
                "class": 'tileFromBag ui-draggable',
                letter : letterPickedFromBag,
                points  : ScrabbleTiles[letterPickedFromBag].value,
                fromSlot   : slot_to_fill
            }).appendTo(`#tileSlot${slot_to_fill}`);
            $(`#tileFromBag${slot_to_fill}`).attr("src", `Scrabble_Tile_${letterPickedFromBag}.jpg`);
            missingSlots.splice(i, 1);

            $(`#tileFromBag${slot_to_fill}`).draggable();
            $(`#tileFromBag${slot_to_fill}`).hover(function() {
                $(this).css('cursor','pointer');
            });
            $( `#tileFromBag${slot_to_fill}` ).draggable({
                scroll: false
            });
            $( `#tileFromBag${slot_to_fill}` ).draggable({
                revert: true
            });
        }
    }

    /*
    -first turn of game,
    -all 7 tileslots initally filled with random letters
    */
    function initialSetUp() {
        
        for(let i = 1; i < 8; i++){
            //console.log("hi");
            
            let index = Math.floor((Math.random() * 99999) % tiles.length);
            let letterPickedFromBag = tiles[index];

            jQuery('<img/>', {
                id: `tileFromBag${i}`,
                "class": 'tileFromBag ui-draggable',
                letter : letterPickedFromBag,
                points  : ScrabbleTiles[letterPickedFromBag].value,
                fromSlot   : i
            }).appendTo(`#tileSlot${i}`);

            $(`#tileFromBag${i}`).attr("src", `Scrabble_Tile_${letterPickedFromBag}.jpg`);
            tiles.splice(index, 1); //removes 1 element at that index
            
            console.log(letterPickedFromBag);
        }

        $(function() {

            for(let i = 1; i < 8; i++){
                $(`#tileFromBag${i}`).draggable();
                $(`#tileFromBag${i}`).hover(function() {
                    $(this).css('cursor','pointer');
                });
                $( `#tileFromBag${i}` ).draggable({
                    scroll: false
                });
                $( `#tileFromBag${i}` ).draggable({
                    revert: true
                });
            }
    
        });

        newGame = 0;
    }

    /*
    -once the submit word button is pressed
    -all tiles on board are adjacent to one another
    -loops through all the tile slots 
    -goes through the all the img tags and gets their letter
    -with the letter, look up the value with ScrabbleTiles["W"].values
    -score += ScrabbleTiles["W"].values
    
    -calls clearBoard() to clear the tiles off of board
    -calls randomTile() to put more onto rack from bag
    */
    function submitWord() {


        clearBoard();
        randomTile();
        updateIndicators(); //not working properly
        nextRound();
    }

    function nextRound() {
        $(function() {
            for(let i = 1; i < 8; i++){
                $(`#letterSlot${i}`).droppable(droppableOpts);
                //$( `#letterSlot${i}` ).droppable( "option", "accept", ".tileFromBag" );
            }
        });
    }

    /*
    -updates the score and tiles remaining
    */
    function updateIndicators() {
        $('#score').text("Score:\n" + gameScore);
        /*
        jQuery('<h1/>', {
            id: `tileFromBag${i}`,
            "class": 'tileFromBag ui-draggable',
            letter : letterPickedFromBag,
            points  : ScrabbleTiles[letterPickedFromBag].value,
            fromSlot   : i
        }).appendTo(`#tileSlot${i}`);*/

        $('#tilesLeft').text("Tiles Left:\n" + tiles.length);
    }

    /*
    -empties or remove all the child elements of selected slots
    */
    function clearBoard() {

        for(let i = 1; i < 8; i++){
            $(`#letterSlot${i}`).empty();
        }
    }

    /*
    prevents putting tiles that aren't touching each other
    */
    function adjacency() {}

    /*
    -clears the board
    -reset tile array to be equal to default_tiles[] again
    -reset #indicators, score = 0, tiles left = 100

    */
    function reset() {
        clearBoard();


        resetRack();
        newGame = 1;
        gameScore = 0;
        tiles = [...default_tiles];
        initialSetUp();
        updateIndicators();
    }

    /*
    -occurs when new game starts
    -gets rid of all tiles on rack if there are any
    -regenerates 7 new tiles for the new game
    */
   function resetRack() {
    for(let i = 1; i < 8; i++){
        $(`#tileSlot${i}`).empty();
    }
   }

   function returnTiles() {
    for(let i = 1; i < 8; i++){
        dropped = (`#tileFromBag${i}`);
        droppedOn = (`#tileSlot${i}`);
        $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
    }
   }



/*
can't bring tile back to rack after putting into slot
*/