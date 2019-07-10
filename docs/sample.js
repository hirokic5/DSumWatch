
/**
 * 画面タッチでカラフルな線を描く
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
var base_x = start_x-(rect_size/2-(20+62.5))
var base_y = start_y-(rect_size/2+47.5)
var figures = [" 1","10"," 9"," 8"," 7"," 6"," 5"," 4"," 3"," 2"]
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
    ctx.scale(2, 2)
}
resize()
window.addEventListener('resize', resize)
window.addEventListener('orientationchange', resize)

