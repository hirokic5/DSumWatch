
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
var start_y = 900
var count = 0
var base_x = start_x-(rect_size/2-(20+62.5)) // fontのhight 125
var base_y = start_y-(rect_size/2+47.5) // fontのhight 95
var figures = [" 1","10"," 9"," 8"," 7"," 6"," 5"," 4"," 3"," 2"]
var period = (6.2 * 1000) / 256
var now_period
var slot_time = [64,3,11,13,13,25,25,25,38,39] // 1,10,9,8,7,6,5,4,3,2
var time_line = []
var count_flag = false
var botton_x = 0
var botton_y = -2.4
var state_flag = 0
var x1
var y1
var width1
var height1
var b_s_list = [base_x+rect_size*botton_x,base_y+rect_size*(botton_y-1),rect_size*2.2,rect_size]
var b_state_list = [base_x+rect_size*(botton_x+3),base_y+rect_size*botton_y,rect_size*2.2,rect_size]
var b_reset_list = [base_x+rect_size*botton_x,base_y+rect_size*(botton_y+0.2),(rect_size*2.2)/2,rect_size]
var b_restart_list = [base_x+rect_size*botton_x+(rect_size*2.2)/2,base_y+rect_size*(botton_y),(rect_size*2.2)/2,rect_size]
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

function button_start(position){
    var x
    var y
    var width
    var height
    [x,y,width,height] = position
	canvas.addEventListener('click', function(e){
		var button = e.target.getBoundingClientRect()
	        
        w_scale = global_width / button.width
        h_scale = global_height / button.height
        
        mouseX = (e.clientX - button.left) * w_scale
        mouseY = (e.clientY - button.top) * h_scale
		if(x < mouseX && mouseX < x + width){
			if(y < mouseY && mouseY < y + height){
                count_flag = true;
                count = 0
                state_flag = 0
			}
        }
        
    }, false);
}

function button_state(position){
    var x
    var y
    var width
    var height
    [x,y,width,height] = position
	canvas.addEventListener('click', function(e){
		var button = e.target.getBoundingClientRect()
	        
        w_scale = global_width / button.width
        h_scale = global_height / button.height
        
        mouseX = (e.clientX - button.left) * w_scale
        mouseY = (e.clientY - button.top) * h_scale
		
        if(x < mouseX && mouseX < x + width){
			if(y < mouseY && mouseY < y + height){
				if(state_flag==0){
					state_flag = 1
                    console.log("state flag:",state_flag)
                }	
			}
        }
        
    }, false);
}

function button_reset(position){
    var x
    var y
    var width
    var height
    [x,y,width,height] = position
	canvas.addEventListener('click', function(e){
		var button = e.target.getBoundingClientRect()
	        
        w_scale = global_width / button.width
        h_scale = global_height / button.height
        
        mouseX = (e.clientX - button.left) * w_scale
        mouseY = (e.clientY - button.top) * h_scale
		
        if(x < mouseX && mouseX < x + width){
			if(y < mouseY && mouseY < y + height){
                state_flag = 0
                count = 0
                count_flag = 0
            
			}
        }
        
    }, false);
}

function button_restart(position){
    var x
    var y
    var width
    var height
    [x,y,width,height] = position
	canvas.addEventListener('click', function(e){
		var button = e.target.getBoundingClientRect()
	        
        w_scale = global_width / button.width
        h_scale = global_height / button.height
        
        mouseX = (e.clientX - button.left) * w_scale
        mouseY = (e.clientY - button.top) * h_scale
		
        if(x < mouseX && mouseX < x + width){
			if(y < mouseY && mouseY < y + height){
                state_flag = 0
                count = 0
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
    if(count_flag){
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
    ctx.fillText("START", start_x+rect_size*botton_x, start_y+rect_size*(botton_y-1))
    ctx.fillRect(b_s_list[0],b_s_list[1],b_s_list[2],b_s_list[3])
    
    // reset 
    ctx.fillStyle = 'rgba(32,180,177,0.6)'
    ctx.font = '40px serif'
    ctx.lineWidth = 5
    ctx.fillText("RESET", start_x+rect_size*botton_x, start_y+rect_size*(botton_y))
    ctx.fillRect(b_reset_list[0],b_reset_list[1],b_reset_list[2],b_reset_list[3])
    // restart
    /*
    ctx.fillStyle = 'rgba(32,180,177,0.6)'
    ctx.font = '40px serif'
    ctx.lineWidth = 5
    ctx.fillText("RESTART", start_x+rect_size*botton_x+(rect_size*2.2)/2, start_y+rect_size*(botton_y))
    ctx.fillRect(b_restart_list[0],b_restart_list[1],b_restart_list[2],b_restart_list[3])
    */

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
    ctx.fillRect(b_state_list[0],b_state_list[1],b_state_list[2],b_state_list[3])

    // timer
    ctx.fillText(Math.floor(count*period/100)/10+"s", start_x+rect_size*botton_x, start_y+rect_size*(botton_y+1.3))
    
    
    // scale 
    ctx.scale(2, 2)
}

function log(){
    if(state_flag==1){
        count += 128
        state_flag = 2
        count %= 256
    }
    if(count_flag){
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
button_start(b_s_list)
button_state(b_state_list)
button_reset(b_reset_list)
//button_restart(b_restart_list)

setInterval(log,period)
setInterval(resize,period)


// time & color change
resize()
window.addEventListener('resize', resize)
window.addEventListener('orientationchange', resize)


