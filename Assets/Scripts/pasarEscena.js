var tiempo:float=3.0;
var escena:String;
var verBotones:boolean=true;
var buscarCentral=false;
var mensaje="PLAY";
var textura:Texture;
//var loading:Transform;
private var componente:central;
//private var boton:GUI.Button;
function Awake(){
	/*if(buscarCentral){
		componente=GameObject.Find("_Central").GetComponent("central");
		if(componente!=null){
			componente.escenaActual+=1;
		}
	}*/
}
function OnGUI(){

				//Application.LoadLevel(escena);

}
function Update () {
	if(tiempo!=-1){
		tiempo-=Time.deltaTime;
		if(tiempo<=0){ 
			var t=GameObject.Find(".TransicionEscena");
			if(t!=null) t.SendMessage("pasarEscena", escena);
			else Application.LoadLevel(escena); 
			
		}
	}
}