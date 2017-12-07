var rate:float=0.1;
//0: escala desde centro
//1: mov desde abajo
var tipo:int=0; 
var wait:float;
private var ancho:int;
private var alto:int;
private var centro:int;
private var altura:int;
var moverder=200;
var moverizq=0;
private var x_inicial:int;
private var y_inicial:int;

private var adelante=true;
function Awake(){
	ancho=GetComponent.<GUITexture>().pixelInset.width;
	alto=GetComponent.<GUITexture>().pixelInset.height;
	centro=GetComponent.<GUITexture>().pixelInset.x;
	altura=GetComponent.<GUITexture>().pixelInset.y;
	y_inicial=altura;
	x_inicial=centro;
	switch(tipo){
		case 0:
			GetComponent.<GUITexture>().pixelInset.width=0;
			GetComponent.<GUITexture>().pixelInset.height=0;
			GetComponent.<GUITexture>().pixelInset.x=0;
		break;
		case 1:
			GetComponent.<GUITexture>().pixelInset.y=-450-alto;
		break;
		case 3:
			GetComponent.<GUITexture>().pixelInset.width=0;
		break;
	}
}
function Update () {
	var esc_x=Screen.width/600.0;
	var esc_y=Screen.height/450.0;
	centro=x_inicial;//*esc_x;
	altura=y_inicial;//*esc_y;
	wait-=Time.deltaTime;
	if(wait<0)
	switch(tipo){
		case 0:
			GetComponent.<GUITexture>().pixelInset.width=Mathf.Lerp(GetComponent.<GUITexture>().pixelInset.width,ancho,rate);
			GetComponent.<GUITexture>().pixelInset.height=Mathf.Lerp(GetComponent.<GUITexture>().pixelInset.height,alto,rate);
			GetComponent.<GUITexture>().pixelInset.x=Mathf.Lerp(GetComponent.<GUITexture>().pixelInset.x,centro,rate);
		break;
		case 1:
			GetComponent.<GUITexture>().pixelInset.y=Mathf.Lerp(GetComponent.<GUITexture>().pixelInset.y,altura,rate);
			if(GetComponent.<GUITexture>().pixelInset.y>altura-10) tipo=2;
		break;
		case 2:
			if(adelante) GetComponent.<GUITexture>().pixelInset.x=Mathf.Lerp(GetComponent.<GUITexture>().pixelInset.x, moverder, 0.1);
			else GetComponent.<GUITexture>().pixelInset.x=Mathf.Lerp(GetComponent.<GUITexture>().pixelInset.x, moverizq, 0.1);
			if(adelante&&GetComponent.<GUITexture>().pixelInset.x>moverder-1) adelante=false;
			if(!adelante&&GetComponent.<GUITexture>().pixelInset.x<moverizq+1) adelante=true;
		break;
		case 3:
			GetComponent.<GUITexture>().pixelInset.width=Mathf.Lerp(GetComponent.<GUITexture>().pixelInset.width, ancho, rate);
			GetComponent.<GUITexture>().pixelInset.x=centro-(GetComponent.<GUITexture>().pixelInset.width/2)+ancho/2;
		break;
	}
}