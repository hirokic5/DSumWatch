
/**
 * ルーレットの作成
 * ------------------------------
 */
// canvas params
var canvas = document.getElementById('stage')
var ctx = canvas.getContext('2d')
var global_width
var global_height
var w_scale
var h_scale

// timer params
var now_period
var cycle_time = 6.5
var street_time = 6.5
var period = (cycle_time * 1000) / 256
var timer_speed = 1 * (cycle_time / street_time)


var count = 0
var count_time = 0
var battle_time = 0
var figures = [" 1","10"," 9"," 8"," 7"," 6"," 5"," 4"," 3"," 2"]
var base_time = [64,3,11,13,13,25,25,25,38,39] // 1,10,9,8,7,6,5,4,3,2
var slot_time = [32] // 状態が1なら補正無しなので->真ん中にしたい
var time_line = []
var count_flag = false
var state_flag = -1 // -1:no input 0-9:state 10:lock
var battle_flag = 1 // 1 : battle or init state 0 : battle end

// position params : start & slot numbers
var rect_size = 200
var start_x = 900
var start_y = 900

var capitalSize_125 = [62.5,47.5] // width/2,height/2
var base_margin_x = 20
var base_x = start_x-(rect_size/2-(base_margin_x+capitalSize_125[0])) // fontのwidth 125
var base_y = start_y-(rect_size/2+capitalSize_125[1]) // fontのhight 95
var botton_x = 0
var botton_y = -2.4


var b_start_list = [base_x+rect_size*botton_x,base_y+rect_size*(botton_y-1),rect_size*2.2,rect_size]
var b_state_list = [base_x+rect_size*(botton_x+3),base_y+rect_size*botton_y,rect_size*2.2,rect_size]


// position params : B-END,reset,state 
var capitalSize_80 = [50,65] // width,height
var m_margin_y = 17.5
var m_rect_size = capitalSize_80[1] + m_margin_y*2 // 65+17/5*2
var m_start_x = start_x+rect_size*3    
var m_start_y = 300

var margin_x = 15
var margin_y = 30

var reset_captial_position = [start_x+77.5,550]
var b_reset_list = [
    reset_captial_position[0]-margin_x,
    reset_captial_position[1]-capitalSize_80[1]-margin_y,
    capitalSize_80[0]*5+margin_x*2,
    capitalSize_80[1]+margin_y*2]
var b_restart_list = [
    base_x+rect_size*botton_x+(rect_size*2.2)/2,
    base_y+rect_size*(botton_y),
    (rect_size*2.2)/2,
    rect_size]

var be_captial_position = [start_x+77.5,400]
var b_be_list = [
    be_captial_position[0]-margin_x,
    be_captial_position[1]-capitalSize_80[1]-margin_y,
    capitalSize_80[0]*5+margin_x*2,
    capitalSize_80[1]+margin_y*2]

// cycle change params
var timer_change = 1
var c_start_x = 30
var c_start_y = m_start_y + 300
var m1_start_x = c_start_x
var m2_start_x = c_start_x+rect_size*2    
var b_change_list = [
    m1_start_x,b_start_list[1]+95+210,
    350,100
]
var b_fix_list = [
    m2_start_x,b_start_list[1]+95+210,
    150,100
]
    
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

// button functions
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
                state_flag = -1 // reset state
                battle_flag = 1 // battle start
                battle_time = 0 // start counting battle time
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
                battle_time = 0
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

function button_timer(position_and_num){
    var x
    var y
    var width
    var height
    var state_num
    var digit
    [x,y,width,height] = position_and_num[0]
    state_num = position_and_num[1]
    digit = position_and_num[2] 
	canvas.addEventListener('click', function(e){
		var button = e.target.getBoundingClientRect()
	        
        w_scale = global_width / button.width
        h_scale = global_height / button.height
        
        mouseX = (e.clientX - button.left) * w_scale
        mouseY = (e.clientY - button.top) * h_scale
		
        if(x < mouseX && mouseX < x + width){
			if(y < mouseY && mouseY < y + height){
                if(timer_change){
                    // flagはあとで考えます
                    if (digit){
                        street_time = street_time-Math.floor(street_time)+state_num
                    }
                    else{
                        street_time = Math.floor(street_time) + state_num / 10
                    }
                    street_time = Math.floor(street_time*10) / 10
                    timer_speed = 1 * (cycle_time / street_time)
                }   
			}
        }
        
    }, false);
}

/**/
function button_cycle(position_and_num){
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
                if(state_num){
                    timer_change= 1
                 
                }
                else{
                    timer_change = 0
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
    
    
    // coloring slot
    if(count_flag){
        if(state_flag==10){
            var count_line = time_line[Math.floor(count)]
            console.log("count:",count,"count_line",count_line)
            var k = Math.floor(count_line / 5)
            var u = count_line % 5
    
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
            ctx.fillText(figures[i+j*3], m_start_x+m_rect_size*i, m_start_y+m_rect_size*j)
            ctx.rect(
                m_start_x+m_rect_size*i,
                m_start_y-capitalSize_80[1]-m_margin_y+m_rect_size*j,
                m_rect_size,m_rect_size)
            ctx.stroke()
        }
    }
    // botton 2
    ctx.fillStyle = 'rgba(0,0,0,1)'
    ctx.font = '80px serif'
    ctx.lineWidth = 5
    ctx.fillText(figures[9], m_start_x+m_rect_size*1, m_start_y+m_rect_size*3)
    ctx.rect(
        m_start_x+m_rect_size*1,
        m_start_y-capitalSize_80[1]-m_margin_y+m_rect_size*3,
        m_rect_size,m_rect_size)
    ctx.stroke()
    
    
    /**/
    // timer_speed sample
    // botton state
    ctx.fillStyle = 'rgba(82,80,177,0.6)'
    ctx.font = '125px serif'
    ctx.lineWidth = 5
    ctx.fillText("Cycle:"+street_time, c_start_x+m_rect_size*1, b_start_list[1]+95)
    //ctx.fillRect(b_state_list[0],b_state_list[1],b_state_list[2],b_state_list[3])


    // botton change 
    ctx.fillStyle = 'rgba(82,80,177,0.6)'
    ctx.font = '95px serif'
    ctx.lineWidth = 5
    ctx.fillText("Change", m1_start_x, b_start_list[1]+95+300)
    ctx.fillRect(b_change_list[0],b_change_list[1],b_change_list[2],b_change_list[3])
    
    /**/

    // botton fix
    ctx.fillStyle = 'rgba(82,80,177,0.6)'
    ctx.font = '95px serif'
    ctx.lineWidth = 5
    ctx.fillText("Fix", m2_start_x, b_start_list[1]+95+300)
    ctx.fillRect(b_fix_list[0],b_fix_list[1],b_fix_list[2],b_fix_list[3])
    
    /**/
   
    if(timer_change){
        // botton 1-9
        for(var j=0;j<3;j++){
            for(var i = 0; i<3 ; i++){
                ctx.fillStyle = 'rgba(0,0,0,1)'
                ctx.font = '80px serif'
                ctx.lineWidth = 5
                var num1 = i+j*3+1
                ctx.fillText(" "+num1, m1_start_x+m_rect_size*i, c_start_y+m_rect_size*j)
                ctx.rect(
                    m1_start_x+m_rect_size*i,
                    c_start_y-capitalSize_80[1]-m_margin_y+m_rect_size*j,
                    m_rect_size,m_rect_size)
                ctx.stroke()
            }
        }
        
        // botton 1-9
        for(var j=0;j<3;j++){
            for(var i = 0; i<3 ; i++){
                ctx.fillStyle = 'rgba(0,0,0,1)'
                ctx.font = '80px serif'
                ctx.lineWidth = 5
                var num2 = i+j*3+1
                ctx.fillText(" "+num2, m2_start_x+m_rect_size*i, c_start_y+m_rect_size*j)
                ctx.rect(
                    m2_start_x+m_rect_size*i,
                    c_start_y-capitalSize_80[1]-m_margin_y+m_rect_size*j,
                    m_rect_size,m_rect_size)
                ctx.stroke()
            }
        }
    }

    // timer for battle time
    //ctx.fillText(Math.floor(count_time*period/100)/10+"s", start_x+rect_size*botton_x, start_y+rect_size*(botton_y+1.3))
    ctx.fillText(Math.floor(battle_time*period/100)/10+"s", start_x+rect_size*botton_x, start_y+rect_size*(botton_y+1.3))    
    
    // timer after battle 
    //ctx.fillText(Math.floor(count_time*period/100)/10+"s", start_x+rect_size*botton_x, start_y+rect_size*(botton_y+1.3))
    ctx.fillText(Math.floor((count_time-battle_time)*period/100)/10+"s", start_x+rect_size*(botton_x+2), start_y+rect_size*(botton_y+1.3))    
    
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
        if(!battle_flag){ // not battle
            count += timer_speed
            count_time += 1
            console.log(count)
            }
        else{ // battle
            count -= 1/2
            console.log("battle:",count)
        
            //count = Math.floor(count)
            count_time += 1
            battle_time += 1
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
        var p_list = [
            m_start_x+m_rect_size*i,
            m_start_y-capitalSize_80[1]-m_margin_y+m_rect_size*j,
            m_rect_size,m_rect_size]
        button_state([p_list,i+j*3])
    }
}
var p_list = [
    m_start_x+m_rect_size*1,
    m_start_y-capitalSize_80[1]-m_margin_y+m_rect_size*3,
    m_rect_size,m_rect_size]
button_state([p_list,9])

/**/
// street timer
for(var j=0;j<3;j++){
    for(var i = 0; i<3 ; i++){
        var p_list = [
            m1_start_x+m_rect_size*i,
            c_start_y-capitalSize_80[1]-m_margin_y+m_rect_size*j,
            m_rect_size,m_rect_size]
        button_timer([p_list,i+j*3+1,1])
    }
}
for(var j=0;j<3;j++){
    for(var i = 0; i<3 ; i++){
        var p_list = [
            m2_start_x+m_rect_size*i,
            c_start_y-capitalSize_80[1]-m_margin_y+m_rect_size*j,
            m_rect_size,m_rect_size]
        button_timer([p_list,i+j*3+1,0])
    }
}
button_cycle([b_change_list,1])
button_cycle([b_fix_list,0])

// loop drawing per period
setInterval(log,period)
setInterval(resize,period)


// time & color change
resize()
window.addEventListener('resize', resize)
window.addEventListener('orientationchange', resize)