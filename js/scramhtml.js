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
	ctx.save();
	clearAll();
	ctx.lineCap = "round";		
	ctx.lineWidth = 2;
	if(MONTAIN) montain();
	ctx.restore();
	$("#score").html(tick++);
	if(FPS) $("#fps").html(""+roto(fps,4));
	if(TPD) draw_time();
	lockDraw = false;
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
$('#info').live("click" ,function() {
	intervalSwitsh();
	});

$(document).ready(function () {
	init();
	});
