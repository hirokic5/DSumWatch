
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
var m_rect_size = 100
var m_start_x = start_x+rect_size*3    
var count = 0
var count_time = 0
var base_x = start_x-(rect_size/2-(20+62.5)) // fontのwidth 125
var base_y = start_y-(rect_size/2+47.5) // fontのhight 95
var figures = [" 1","10"," 9"," 8"," 7"," 6"," 5"," 4"," 3"," 2"]
var period = (6.2 * 1000) / 256
var now_period
var base_time = [64,3,11,13,13,25,25,25,38,39] // 1,10,9,8,7,6,5,4,3,2
var slot_time = [32] // 状態が1なら補正無しなので->真ん中にしたい
var time_line = []
var count_flag = false
var botton_x = 0
var botton_y = -2.4
var state_flag = -1 // -1:no input 0-9:state 10:lock
var margin_x = 15
var margin_y = 30
var b_start_list = [base_x+rect_size*botton_x,base_y+rect_size*(botton_y-1),rect_size*2.2,rect_size]
var b_state_list = [base_x+rect_size*(botton_x+3),base_y+rect_size*botton_y,rect_size*2.2,rect_size]
var reset_captial_position = [177.5,550]
var b_reset_list = [reset_captial_position[0]-margin_x,reset_captial_position[1]-65-margin_y,50*5+margin_x*2,65+margin_y*2]
var b_restart_list = [base_x+rect_size*botton_x+(rect_size*2.2)/2,base_y+rect_size*(botton_y),(rect_size*2.2)/2,rect_size]
var be_captial_position = [177.5,400]
var b_be_list = [be_captial_position[0]-margin_x,be_captial_position[1]-65-margin_y,50*5+margin_x*2,65+margin_y*2]
var battle_flag = 1
    
// make_timeline
for(var i=0;i<10;i++){
    now_period = base_time[i]
    for(var k=0;k<now_period;k++){
        time_line.push(i)
    }
}
// make slot time
var sum
for(var i=1;i<10;i++){
    sum = 0
    for(var j=0;j<i;j++){
        sum += base_time[j]
    }
    sum += base_time[i] /2
    slot_time.push(sum)
}
console.log(base_time)
console.log(slot_time)

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
                count_flag = true
                count = 0
                count_time = 0
                state_flag = -1
                battle_flag = 1 // battle start
			}
        }
        
    }, false);
}

function button_BattleEnd(position){
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
                battle_flag = 0 //battle end
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
                state_flag = -1
                count = 0
                count_flag = 0
            
			}
        }
        
    }, false);
}

function button_state(position_and_num){
    var x
    var y
    var width
    var height
    var state_num
    [x,y,width,height] = position_and_num[0]
    state_num = position_and_num[1]
	canvas.addEventListener('click', function(e){
		var button = e.target.getBoundingClientRect()
	        
        w_scale = global_width / button.width
        h_scale = global_height / button.height
        
        mouseX = (e.clientX - button.left) * w_scale
        mouseY = (e.clientY - button.top) * h_scale
		
        if(x < mouseX && mouseX < x + width){
			if(y < mouseY && mouseY < y + height){
				if(state_flag==-1){
					state_flag = state_num
                    console.log("state input!!:",state_num)
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
    var count_line = time_line[Math.floor(count)]
    console.log("count:",count,"count_line",count_line)
    var k = Math.floor(count_line / 5)
    var u = count_line % 5
    
    /*
    // coloring sample
    ctx.font = '125px serif'
    ctx.lineWidth = 5
    ctx.fillText(figures[count_line], start_x+rect_size*u, start_y+rect_size*(3+k))
    ctx.fillStyle = 'rgba(192,80,77,0.7)'
    ctx.fillRect(base_x+rect_size*u,base_y+rect_size*(3+k),rect_size,rect_size)
    */
    // coloring timer
    if(count_flag){
        if(state_flag==10){
            ctx.fillStyle = 'rgba(12,180,177,0.6)'
            ctx.font = '125px serif'
            ctx.lineWidth = 5
            ctx.fillRect(base_x+rect_size*u,base_y+rect_size*k,rect_size,rect_size)
            console.log(base_x+rect_size*u,base_y+rect_size*k,rect_size,rect_size)
        }
    }
    
    

    // botton start
    ctx.fillStyle = 'rgba(182,180,177,0.6)'
    ctx.font = '125px serif'
    ctx.lineWidth = 5
    ctx.fillText("START", start_x+rect_size*botton_x, start_y+rect_size*(botton_y-1))
    ctx.fillRect(b_start_list[0],b_start_list[1],b_start_list[2],b_start_list[3])
    
    // battle end
    ctx.fillStyle = 'rgba(32,70,177,0.6)'
    ctx.font = '80px serif'// width 50,height 65
    ctx.lineWidth = 5
    ctx.fillText("B-END", be_captial_position[0],be_captial_position[1]) 
    ctx.fillRect(b_be_list[0],b_be_list[1],b_be_list[2],b_be_list[3])

    // reset 
    ctx.fillStyle = 'rgba(32,180,177,0.6)'
    ctx.font = '80px serif'// width 50,height 65
    ctx.lineWidth = 5
    ctx.fillText("RESET", reset_captial_position[0],reset_captial_position[1]) 
    ctx.fillRect(b_reset_list[0],b_reset_list[1],b_reset_list[2],b_reset_list[3])

    // botton state
    ctx.fillStyle = 'rgba(82,80,177,0.6)'
    ctx.font = '125px serif'
    ctx.lineWidth = 5
    ctx.fillText("State", start_x+rect_size*(botton_x+3), b_start_list[1]+95)
    //ctx.fillRect(b_state_list[0],b_state_list[1],b_state_list[2],b_state_list[3])

    // botton 1,10,9,8,7,6,5,4,3
    for(var j=0;j<3;j++){
        for(var i = 0; i<3 ; i++){
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.font = '80px serif'
            ctx.lineWidth = 5
            ctx.fillText(figures[i+j*3], m_start_x+m_rect_size*i, 300+m_rect_size*j)
            ctx.rect(m_start_x+m_rect_size*i,300-65-17.5+m_rect_size*j,m_rect_size,65+17.5*2)
            ctx.stroke()
        }
    }
    // botton 2
    ctx.fillStyle = 'rgba(0,0,0,1)'
    ctx.font = '80px serif'
    ctx.lineWidth = 5
    ctx.fillText(figures[9], m_start_x+m_rect_size*1, 300+m_rect_size*3)
    ctx.rect(m_start_x+m_rect_size*1,300-65-17.5+m_rect_size*3,m_rect_size,65+17.5*2)
    ctx.stroke()
    
    // timer
    ctx.fillText(Math.floor(count_time*period/100)/10+"s", start_x+rect_size*botton_x, start_y+rect_size*(botton_y+1.3))
    
    
    // scale 
    ctx.scale(2, 2)
}

function log(){
    if(state_flag>-1 && state_flag<10){
        count += slot_time[state_flag]
        state_flag = 10
        count %= 256
    }
    if(count_flag){
        if(!battle_flag){
            count += 1
            count_time += 1
            }
        else{
            count -= 1
            console.log("battle:",count)
        
            //count = Math.floor(count)
            count_time += 1
        }
        if (count >255){
            count = 0}
        
        if (count < 0){
            count = 255
        }
        
    }
    else{
        count = 0
        count_time = 0
    }
}
// button flag settings
button_start(b_start_list)
button_BattleEnd(b_be_list)
button_reset(b_reset_list)
// state button setting
for(var j=0;j<3;j++){
    for(var i = 0; i<3 ; i++){
        var p_list = [m_start_x+m_rect_size*i,300-65-17.5+m_rect_size*j,m_rect_size,65+17.5*2]
        button_state([p_list,i+j*3])
    }
}
var p_list = [m_start_x+m_rect_size*1,300-65-17.5+m_rect_size*3,m_rect_size,65+17.5*2]
button_state([p_list,9])

setInterval(log,period)
setInterval(resize,period)


// time & color change
resize()
window.addEventListener('resize', resize)
window.addEventListener('orientationchange', resize)