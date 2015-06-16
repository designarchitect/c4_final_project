//★ CHANGE OF SOMETHIN... ★//
var delta = 5;
var master_heartbeat = 50;
var deltaY = delta;
var deltaX = 0;
var direction = 0;

//★ DIRECTION KEYS ★//
var NORTH = 38, SOUTH = 40, EAST = 39, WEST = 37;

var dragon_pos = {top:0,left:0}

var treasure = {x:0, y:0}

var game = $("#game");
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
//★ DRAGON OBJECT ★//  
function dragonObject(initial_speed){
    console.log("dragonObject called");
    this.delta = initial_speed;
    this.direction = 0;
    this.deltaX = 0;
    this.deltaY = this.delta * -1;
    this.sprite = null;
    this.heartbeat_time = master_heartbeat;  //15 miliseconds
    this.heartbeat = null;
    this.stop = false; 
    this.gameArena = $('#game');
    this.gameHeight =  this.gameArena.height();
    this.gameWidth = this.gameArena.width();

    this.init = function(){
        this.createSprite();
        this.bind_movement_keys();
        this.start_heartbeat();
        this.fly();
    }

    this.createSprite = function(){
        console.log('create sprite called');
        var game_area_midx= ($("#game").width())/2;
        var game_area_midy= $("#game").height()/2;
        this.sprite = $('<img>',{
            src:'http://orig06.deviantart.net/cf99/f/2014/002/b/2/dragon_sprite_by_cryophase-d70g08u.gif',
            class:'dragon',
            id:'icedragon'
        }).css({
            left: game_area_midx+'px',
            top: game_area_midy+'px'
        });

        this.width = this.sprite.width();
        this.height = this.sprite.height();

        $("#game").append(this.sprite);
    }

    this.fly = function(){
        console.log("deltaX "+this.deltaX+ "deltaY "+this.deltaY)
        this.sprite.css({
            'transform': 'rotateZ('+this.direction+'deg)'
        });

        var newLeft = this.sprite.position().left+this.deltaX+'px';
        var newTop = this.sprite.position().top+this.deltaY + 'px';

        // console.log('position.top: '+this.sprite.position().top);
        // console.log('deltaY: '+this.deltaY+'px');
        // console.log('new deltaY = ',newTop);
        var _this = this;
        this.sprite.animate(
            {
                'left': newLeft,
                'top': newTop,
            },this.heartbeat_time, function(){
                _this.fly();

            }
        );
    }

    this.start_heartbeat = function(){
        var _this = this;
        //console.log('outside setInterval, this is ',this);
        this.heartbeat = setInterval(
            function(){
                //console.log('inside setInterval, this is ',this);
                //console.log('lub dub should be called');
                _this.lubdub();
            },this.heartbeat_time);
    }
    this.stop_heartbeat = function(){
        clearInterval(this.heartbeat);
    }

    this.lubdub = function(){
        //console.log('lubdub');
        
        //this.stop_heartbeat();
    }


    this.collisionCheck = function(x,y){
        var leftEdge = 0;
        var topEdge = 0;
        var rightEdge = this.gameWidth - this.width;
        var bottomEdge = this.gameHeight - this.height;

        if(x <= leftEdge || x >= rightEdge)
        {
            this.die();

        } else if(y <= topEdge || y >= bottomEdge){
            this.die();
        }
    }

    this.die = function(){
        console.log("death");
        this.stop();
    }

    this.bind_movement_keys = function()
    {
        //bind the movement keys for this dragon
        var _this = this;
        $(document).keydown(function()
        {
            console.log('event: ',event);
            console.log('event which: ',event.which);
            //dragon_pos = $('#icedragon').position();
            console.log("dragon_pos ", dragon_pos);
            console.log("this is ",this);
            
            switch(event.which)
            {
                case EAST://right
                    console.log("changing to east");
                    _this.deltaX = delta;
                    _this.deltaY = 0;
                    _this.direction = 90;
                    break;
                case WEST://left
                console.log("changing to west");
                    _this.deltaX = -1 * delta;
                    _this.deltaY = 0;
                    _this.direction = 270;
                    console.log("new deltaX "+this.deltaX);
                    break;
                 case NORTH://up
                    console.log("changing to north");
                    _this.deltaX = 0;
                    _this.deltaY = -1 * delta;
                    _this.direction = 0;
                    break;
                case SOUTH://down
                    console.log("changing to south");
                    _this.deltaX = 0;
                    _this.deltaY = delta;
                    _this.direction = 180;
                    break;
                case 67:
                    $('#icedragon').css('backgroundColor',bgcolor);
                    break;
                case 32://space 
                    break;
            }

        });
    }
    this.init();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
//★ MYSTERY COIN GENERATOR ★//  
function generateTreasure(){
    var treasure = $('<img>',{
        src:'images/coin.png',
        'width': '20px',
        id:'treasureId'
    });
    $("#game").append(treasure);

//generating random coordinates fpor treasure. Math.random gives a random value between 0 & 1. 
//then it is multiplying by max value. 
//created in do while loop to regenerate 
    // do {
    //    x = Math.floor(Math.random()*(width-1));
    //    y = Math.floor(Math.random()*(height-1)); 
    // }

}


///////////////////////////////////////////////////////////////////////////////////////////////////////
function init_game(){
    //render_iceDragon();
    //generateTreasure();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
//★ RESET ★// 
///////////////////////////////////////////////////////////////////////////////////////////////////////
//still need to make modal with reset btn
function reset(){
	$('.reset_button').click(function(){
        init_game();
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//★ GAME BOARD ★// 
var updateScore = function(){
    var $currentScore = Number($('#score').html());
    $('#score').html($currentScore);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//★ END GAME ★//
function endGame(){
     burned();
     deathSound();
     wallSmash();
     endModal();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
var ice_dragon = null;
$(document).ready(function(){
    ice_dragon = new dragonObject(delta);
    $('#startButton').click(function(){
    
    //reset();

    });
});