var palabra:String[];
var pal:String;
var playerActual=0;
var bomba:Transform;
var bombaComp:BombaNueva;
var mySkin : GUISkin;
var botonSize:int=80;
var playerLabel:GameObject;
var palabraLabel:GameObject;

function Awake(){
	if(Screen.width<800){ 
		botonSize=50;
		Camera.main.orthographicSize=4.6;
	}
	bombaComp=bomba.GetComponent("BombaNueva");	
	pal=PlayerPrefs.GetString("palabra");
	playerActual=PlayerPrefs.GetInt("playerActual");
	palabra=new String[pal.Length];
	playerLabel.SendMessage("setTexto", PlayerPrefs.GetString("player"+(playerActual+1)));
	palabraLabel.SendMessage("setTexto", pal);
	colorear();
}

function colorear(){
	gameObject.SendMessage("setPlayer", playerActual);
}

function setLetra(l:String, i:int){
	palabra[i]=l;
	comprobar();	
}

function comprobar(){
	var ok=true;
	for(var i=0; i<pal.Length; i++){
		if(pal.Substring(i,1) != palabra[i]) ok=false;
	}
	if(ok){
		/*var players=PlayerPrefs.GetInt("nPlayers");
		if(PlayerPrefs.GetInt("playerActual")+1>=players)
			PlayerPrefs.SetInt("playerActual",0);
		else
			PlayerPrefs.SetInt("playerActual", PlayerPrefs.GetInt("playerActual",0)+1);
		*/
		PlayerPrefs.SetFloat("tiempo",bombaComp.tiempo);
		Application.LoadLevel("Type");
	}
}

function OnGUI(){
	/*GUI.skin=mySkin;
	GUILayout.BeginArea (Rect (botonSize*1.5,-30,Screen.width-botonSize*3,80), GUI.skin.box);
	GUILayout.Space(25);
	GUILayout.BeginHorizontal();
	GUILayout.Label("Player "+(playerActual+1));
	GUILayout.Label("The word is: "+PlayerPrefs.GetString("palabra"));
	GUILayout.EndHorizontal();
	GUILayout.EndArea();
	if(GUI.Button(Rect(Screen.width-botonSize*1.5, Screen.height-botonSize*1.25, botonSize*1.5-10, botonSize*1.25-10), "Reset")){
		PlayerPrefs.SetFloat("tiempo",bombaComp.tiempo);
		Application.LoadLevel(Application.loadedLevelName);	
	}	*/
}

function reset(){
	PlayerPrefs.SetFloat("tiempo",bombaComp.tiempo);
	Application.LoadLevel(Application.loadedLevelName);	
}

function Update () {
}