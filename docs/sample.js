
/**
 * ルーレットの作成
 * ------------------------------
 */
var drawing = false
var last_x = null
var last_y = null
var canvas = document.getElementById('stage')
var ctx = canvas.getContext('2d')
var global_width
var global_height
var w_scale
var h_scale
var rect_size = 200
var start_x = 100
var start_y = 700
var count = 0
var base_x = start_x-(rect_size/2-(20+62.5)) // fontのhight 125
var base_y = start_y-(rect_size/2+47.5) // fontのhight 95
var figures = [" 1","10"," 9"," 8"," 7"," 6"," 5"," 4"," 3"," 2"]
var period = (6.2 * 1000) / 256
var now_period
var slot_time = [64,3,11,13,13,25,25,25,38,39] // 1,10,9,8,7,6,5,4,3,2
var time_line = []
var toggle = false
var botton_x = 0
var botton_y = -2.4
var state_flag = 0
var x
var y
var width
var height
var x1
var y1
var width1
var height1
//,x1,y1,width1,height1
    

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

function button(positions){
    x = positions[0][0]
    y = positions[0][1]
    width = positions[0][2]
    height = positions[0][3]
    console.log(x,y,width,height)
    x1 = positions[1][0]
    y1 = positions[1][1]
    width1 = positions[1][2]
    height1 = positions[1][3]
    console.log(x1,y1,width1,height1)
    
	canvas.addEventListener('click', function(e){
		var button = e.target.getBoundingClientRect()
	        
        w_scale = global_width / button.width
        h_scale = global_height / button.height
        
        mouseX = (e.clientX - button.left) * w_scale
        mouseY = (e.clientY - button.top) * h_scale
		if(x < mouseX && mouseX < x + width){
			if(y < mouseY && mouseY < y + height){
				if(!toggle){
					toggle = true;
                    console.log("falseになった")
                }
                else{
					toggle = false;
                    console.log("trueになった")
                }
                
			}
        }
        
        if(x1 < mouseX && mouseX < x1 + width1){
			if(y1 < mouseY && mouseY < y1 + height1){
				if(state_flag==0){
					state_flag = 1
                    console.log("state flag:",state_flag)
                }	
                else{
                    state_flag = 0
                }
			}
        }
        
    }, false);
}

function resize() {
    canvas.setAttribute('width', window.innerWidth*2)
    canvas.setAttribute('height', window.innerHeight*2)
    global_width = window.innerWidth*2
    global_height = window.innerHeight*2

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
    // coloring sample
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
    
    // coloring timer
    if(toggle){
        if(state_flag > 0){
            ctx.fillStyle = 'rgba(12,180,177,0.6)'
            ctx.font = '125px serif'
            ctx.lineWidth = 5
            ctx.fillRect(base_x+rect_size*u,base_y+rect_size*k,rect_size,rect_size)
        }
    }
    
    

    // botton start
    ctx.fillStyle = 'rgba(182,180,177,0.6)'
    ctx.font = '125px serif'
    ctx.lineWidth = 5
    ctx.fillText("START", start_x+rect_size*botton_x, start_y+rect_size*botton_y)
    ctx.fillRect(base_x+rect_size*botton_x,base_y+rect_size*botton_y,rect_size*2.2,rect_size)
    
    /*
    // botton 1,10,9,8,7
    for(var i = 0; i<5 ; i++){
        ctx.font = '125px serif'
        ctx.lineWidth = 5
        ctx.fillText(figures[i], start_x+rect_size*i, start_y)
        ctx.rect(base_x+rect_size*i,base_y,rect_size,rect_size)
        ctx.stroke()
    }
    
    // botton 6,5,4,3,2
    for(var i = 0; i<5 ; i++){
        ctx.font = '125px serif'
        ctx.lineWidth = 5
        ctx.fillText(figures[i+5], start_x+rect_size*i, start_y+rect_size)
        ctx.rect(base_x+rect_size*i,base_y+rect_size,rect_size,rect_size)
        ctx.stroke()
    }
    */
    // botton state
    ctx.fillStyle = 'rgba(82,80,177,0.6)'
    ctx.font = '125px serif'
    ctx.lineWidth = 5
    ctx.fillText("State", start_x+rect_size*(botton_x+3), start_y+rect_size*botton_y)
    ctx.fillRect(base_x+rect_size*(botton_x+3),base_y+rect_size*botton_y,rect_size*2.2,rect_size)

    // timer
    ctx.fillText(Math.floor(count*period/100)/10+"s", start_x+rect_size*botton_x, start_y+rect_size*(botton_y+1.3))
    
    
    // scale 
    ctx.scale(2, 2)
}

function log(){
    if(state_flag==1){
        count = 128
        state_flag = 2
        //count %= 256
    }
    if(toggle){
        count += 1
        //console.log(count)
        
        if (count >255){
            count = 0
        }
    }
    else{
        count = 0
    }
}
/**/
button([
    [base_x+rect_size*botton_x,base_y+rect_size*botton_y,rect_size*2.2,rect_size],
    [base_x+rect_size*(botton_x+3),base_y+rect_size*botton_y,rect_size*2.2,rect_size]
    ])


setInterval(log,period)
setInterval(resize,period)


// time & color change
resize()
window.addEventListener('resize', resize)
window.addEventListener('orientationchange', resize)


