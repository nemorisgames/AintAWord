var escalarX:boolean=false;
var escalarY:boolean=false;
private var x_inicial:int;
private var y_inicial:int;
private var ancho_inicial:int;
private var alto_inicial:int;
private var esc_x:float=1.0;
private var esc_y:float=1.0;

function Awake(){
	x_inicial=GetComponent.<GUITexture>().pixelInset.x;
	y_inicial=GetComponent.<GUITexture>().pixelInset.y;
	ancho_inicial=GetComponent.<GUITexture>().pixelInset.width;
	alto_inicial=GetComponent.<GUITexture>().pixelInset.height;
	esc_x=Screen.width/960.0;
	esc_y=Screen.height/640.0;
	if(escalarX||escalarY){
		//var ancho=ancho_inicial*Screen.width/600;
		if(escalarX){
			GetComponent.<GUITexture>().pixelInset.width=ancho_inicial*esc_x;
			GetComponent.<GUITexture>().pixelInset.x=x_inicial*esc_x;
		}
		if(escalarY){
			GetComponent.<GUITexture>().pixelInset.height=alto_inicial*esc_y;
			GetComponent.<GUITexture>().pixelInset.y=y_inicial*esc_y;
		}
	}
	else{
		var dir_x=1;
		if(x_inicial<0) dir_x=-1; 
		GetComponent.<GUITexture>().pixelInset.x=x_inicial*esc_x+dir_x*(ancho_inicial*esc_x-ancho_inicial)/2;
		
		var dir_y=1;
		if(y_inicial<0) dir_y=-1; 
		GetComponent.<GUITexture>().pixelInset.y=y_inicial*esc_y+dir_y*(alto_inicial*esc_y-alto_inicial)/2;
		//guiTexture.pixelInset.x=x_inicial-600-Screen.width/2;
		//guiTexture.pixelInset.y=y_inicial+(450-Screen.height)/2;	
	}
}

function LateUpdate () {
	
	//print("ancho "+guiTexture.pixelInset.width+" "+Screen.width);
    
	//print("x "+guiTexture.pixelInset.x);
}