
/**
 * ルーレットの作成
 * ------------------------------
 */
var drawing = false
var last_x = null
var last_y = null
var canvas = document.getElementById('stage')
var ctx = canvas.getContext('2d')
var rect_size = 200
var start_x = 100
var start_y = 300
var count = 0
var base_x = start_x-(rect_size/2-(20+62.5)) // fontのhight 125
var base_y = start_y-(rect_size/2+47.5) // fontのhight 95
var figures = [" 1","10"," 9"," 8"," 7"," 6"," 5"," 4"," 3"," 2"]
var period = (6.2 * 1000) / 256
var now_period
var slot_time = [64,3,11,13,13,25,25,25,38,39] // 1,10,9,8,7,6,5,4,3,2
var time_line = []

/*
var time_line = [0,0,0,0,0,
                 1,1,1,1,2,
                 2,2,3,3,4]

*/
for(var i=0;i<10;i++){
    now_period = slot_time[i]
    for(var k=0;k<now_period;k++){
        time_line.push(i)
    }
}

var startTime
var endTime

function sleep(msec) {
    return new Promise(function(resolve) {
                       
                       setTimeout(function() {resolve()}, msec)
                       
                       })
}
async function start() {
    
    await sleep(1000);
    console.log(1000);
    
}


function resize() {
    canvas.setAttribute('width', window.innerWidth*2)
    canvas.setAttribute('height', window.innerHeight*2)
    
	ctx.font = '30px serif'
	ctx.fillText('ルーレット', 20, 40)
    
    // 1,10,9,8,7
    for(var i = 0; i<5 ; i++){
        ctx.font = '125px serif'
        ctx.lineWidth = 5
        ctx.fillText(figures[i], start_x+rect_size*i, start_y)
        ctx.rect(base_x+rect_size*i,base_y,rect_size,rect_size)
        ctx.stroke()
    }
    
    // 6,5,4,3,2
    for(var i = 0; i<5 ; i++){
        ctx.font = '125px serif'
        ctx.lineWidth = 5
        ctx.fillText(figures[i+5], start_x+rect_size*i, start_y+rect_size)
        ctx.rect(base_x+rect_size*i,base_y+rect_size,rect_size,rect_size)
        ctx.stroke()
    }
    // coloring
    var count_line = time_line[count]
    var k = Math.floor(count_line / 5)
    var u = count_line % 5
    ctx.font = '125px serif'
    ctx.lineWidth = 5
    //console.log(figures[count_line])
    ctx.fillText(figures[count_line], start_x+rect_size*u, start_y+rect_size*(3+k))
    ctx.fillStyle = 'rgba(192,80,77,0.7)'
    ctx.fillRect(base_x+rect_size*u,base_y+rect_size*(3+k),rect_size,rect_size)
    //ctx.fill()
    
    // coloring
    ctx.fillStyle = 'rgba(12,180,177,0.6)'
    ctx.font = '125px serif'
    ctx.lineWidth = 5
    ctx.fillRect(base_x+rect_size*u,base_y+rect_size*k,rect_size,rect_size)
    ctx.scale(2, 2)
}

function log(){
    count += 1
    console.log(count)
    
    if (count >255){
        count = 0
    }
}

setInterval(log,period)
setInterval(resize,period)


// time & color change
resize()
window.addEventListener('resize', resize)
window.addEventListener('orientationchange', resize)


