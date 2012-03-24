function init(){  
	tick = 1;
	ctx = $("#canvas")[0].getContext('2d');
	WIDTH = $("#canvas").width();
  	HEIGHT = $("#canvas").height();
	intervalSwitsh();
}

function intervalSwitsh() {
	if(pause) {
		intervalID = setInterval(draw,intervalUpdate);
		pause = false;
		} else {
			clearInterval(intervalID);
			pause = true;			
			}
	}

function clearAll() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);		
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.beginPath();
	ctx.fillRect(0,0,WIDTH,HEIGHT);
	ctx.stroke();
	ctx.fill();
	}


function draw(){  
	if(lockDraw) return;
	lockDraw = true;
	if(FPS || TPD) now=new Date;
	if(FPS) {
		var thisFrame = 1000 / (now-lastUpdate);
		fps += (thisFrame - fps) / fpsFilter;
		lastUpdate = now;
		}
	if(SHIP) doMove();
	ctx.save();
	clearAll();
	ctx.lineCap = "round";		
	ctx.lineWidth = 2;
	if(MONTAIN) montain();
	if(SHIP) ship(shipP[0],shipP[1]);
	ctx.restore();
	$("#score").html(tick++);
	if(FPS) $("#fps").html(""+roto(fps,4));
	if(TPD) draw_time();
	lockDraw = false;
	$("#shoot").html(kleft+" - "+kright+" - "+kup+" - "+kdown+" "+shipP);
}
	
function ship(x,y) {
	ctx.fillStyle = "rgb(100,100,200)";
	ctx.strokeStyle = "rgb(250,250,250)";
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x-30,y-10);
	ctx.lineTo(x-30,y+10);
	ctx.lineTo(x,y);
	ctx.stroke();
	ctx.fill();
}

function doMove() {
	if(kleft) shipP[0]--;
	if(kright) shipP[0]++;
	if(kup) shipP[1]--;
	if(kdown) shipP[1]++;
}

function montain() {
	ctx.fillStyle = "rgb(100,100,200)";
	ctx.strokeStyle = "rgb(255,0,0)";
	ctx.beginPath();
	ctx.moveTo(scrollDist,HEIGHT+2);  
	for(var x=1;x<montainList.length;x++) {
		if((x-4)*100>=WIDTH) continue;
		ctx.lineTo(scrollDist+(x*100),(HEIGHT+45)-(50*montainList[x]));
	}
	ctx.lineTo(scrollDist+WIDTH+200,HEIGHT+2);
	ctx.lineTo(scrollDist,HEIGHT+2);
	ctx.stroke();
	ctx.fill();
	scrollDist --;
	if(scrollDist <= -201) {
		scrollDist = -100;
		montainList.push(montainList[0]);
		montainList.splice(0,1);
		}
	$("#scrollDist").html(scrollDist);
	$("#landscape").html(""+montainList);
	}

function draw_time() {
	var ntpd = ((dtime=new Date)-now);
	tpd += (ntpd - tpd) / fpsFilter;
	$('#tpd').html(""+roto(tpd,4));
	}

function roto(no,len) {
	exp = Math.pow(10,len);
	return (Math.round(no*exp)/exp);
	}
	
$(document).keydown(function(e){
	var kc = e.keyCode;
	if(kc == 37) kleft = true;
	if(kc == 38) kup = true;
	if(kc == 39) kright = true;
	if(kc == 40) kdown = true;
	if(kc == 88) kfire = true;
	});

$(document).keyup(function (e) {
	var kc = e.keyCode;
	if(kc == 37) kleft = false;
	if(kc == 38) kup = false;
	if(kc == 39) kright = false;
	if(kc == 40) kdown = false;
	if(kc == 88) kfire = false;
	});

$('#info').live("click" ,function() {
	intervalSwitsh();
	});

$(document).ready(function () {
	init();
	});
