var palabra:String[];
var pal:String;
var playerActual=0;
var bomba:Transform;
var bombaComp:BombaNueva;
var mySkin : GUISkin;
var botonSize:int=80;
var playerLabel:GameObject;
var palabraLabel:GameObject;

var panelPause:GameObject;


var soundOn:GameObject;
var soundOff:GameObject;


var playersIndex:int[];

function Awake(){
	if(Screen.width<800){ 
		botonSize=50;
		Camera.main.orthographicSize=4.6;
	}

    
	var p:String = PlayerPrefs.GetString("playerActives", "");
	var pAux:String[] = p.Split("|"[0]);
	playersIndex = new int[pAux.Length];
	for(var i:int = 0; i < playersIndex.Length; i++){
	    playersIndex[i] = int.Parse(pAux[i]);
	    print(playersIndex[i]);
	}

	bombaComp=bomba.GetComponent("BombaNueva");	
	pal=PlayerPrefs.GetString("palabra");
	playerActual=PlayerPrefs.GetInt("playerActual");
	palabra=new String[pal.Length];
	playerLabel.SendMessage("setTexto", PlayerPrefs.GetString("player"+(playersIndex[playerActual]+1)));
	palabraLabel.SendMessage("setTexto", pal);
	colorear();
    
	soundOn.SetActive(PlayerPrefs.GetInt("sound", 1) == 1);
	soundOff.SetActive(PlayerPrefs.GetInt("sound", 1) == 0);

	AudioListener.volume = 1f * PlayerPrefs.GetInt("sound", 0);
}

function soundToggle()
{
    if (PlayerPrefs.GetInt("sound", 1) == 1)
        PlayerPrefs.SetInt("sound", 0);
    else
        PlayerPrefs.SetInt("sound", 1);
    soundOn.SetActive(PlayerPrefs.GetInt("sound", 1) == 1);
    soundOff.SetActive(PlayerPrefs.GetInt("sound", 1) == 0);
    AudioListener.volume = 1f * PlayerPrefs.GetInt("sound", 0);
}

function pause(){
    print("pause");
    if(Time.timeScale < 0.5){
        Time.timeScale = 1;
        panelPause.SetActive(false);
    }
    else{
        panelPause.SetActive(true);
        Time.timeScale = 0;
    }
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

function toTitleScreen(){
    Time.timeScale = 1;
    Application.LoadLevel("Titulo");	
}

function exitGame(){
    Application.Quit();
}

function Update () {
        if (Input.GetKey(KeyCode.Escape)){
            pause();
        }
}