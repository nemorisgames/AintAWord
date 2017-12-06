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
	ancho=guiTexture.pixelInset.width;
	alto=guiTexture.pixelInset.height;
	centro=guiTexture.pixelInset.x;
	altura=guiTexture.pixelInset.y;
	y_inicial=altura;
	x_inicial=centro;
	switch(tipo){
		case 0:
			guiTexture.pixelInset.width=0;
			guiTexture.pixelInset.height=0;
			guiTexture.pixelInset.x=0;
		break;
		case 1:
			guiTexture.pixelInset.y=-450-alto;
		break;
		case 3:
			guiTexture.pixelInset.width=0;
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
			guiTexture.pixelInset.width=Mathf.Lerp(guiTexture.pixelInset.width,ancho,rate);
			guiTexture.pixelInset.height=Mathf.Lerp(guiTexture.pixelInset.height,alto,rate);
			guiTexture.pixelInset.x=Mathf.Lerp(guiTexture.pixelInset.x,centro,rate);
		break;
		case 1:
			guiTexture.pixelInset.y=Mathf.Lerp(guiTexture.pixelInset.y,altura,rate);
			if(guiTexture.pixelInset.y>altura-10) tipo=2;
		break;
		case 2:
			if(adelante) guiTexture.pixelInset.x=Mathf.Lerp(guiTexture.pixelInset.x, moverder, 0.1);
			else guiTexture.pixelInset.x=Mathf.Lerp(guiTexture.pixelInset.x, moverizq, 0.1);
			if(adelante&&guiTexture.pixelInset.x>moverder-1) adelante=false;
			if(!adelante&&guiTexture.pixelInset.x<moverizq+1) adelante=true;
		break;
		case 3:
			guiTexture.pixelInset.width=Mathf.Lerp(guiTexture.pixelInset.width, ancho, rate);
			guiTexture.pixelInset.x=centro-(guiTexture.pixelInset.width/2)+ancho/2;
		break;
	}
}