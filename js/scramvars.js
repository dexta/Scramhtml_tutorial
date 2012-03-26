var ctx,kleft,kright,kup,kdown,kfire,kmissile;
var HEIGHT,WIDTH;
var shootLock,tick;
var shoot = [];
var stars = [];
var scrollDist = 0;
var debug;
var pause = true,intervalID;
var intervalUpdate = (1000/60);
var lockDraw = false;

var fps = 0,tpd=0,now,lastUpdate = (new Date)*1 -1;
var fpsFilter = 50;
var dd = [];

// some start values
var STARS = true,	COLLISION = true,	MONTAIN = true,		SHIP = true;
var BULLET = true,	TPD = true,			FPS = true;
var shipP = [100,100];
var montainList = [1,1,1,1,1,2,2,2,2,3,3,2,2,1,1,4,3,4,2,2,1,3,2,4,4,2,3];
var star_speed = [2,3,5,5,5,5];
