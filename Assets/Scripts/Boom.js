var mySkin : GUISkin;
var clip : AudioClip;
var botonSize:int=80;
var playerLabel:GameObject;

var playersIndex:int[];

function Awake(){
	if(Screen.width<800){ 
		botonSize=50;
	}
	var p:String = PlayerPrefs.GetString("playerActives", "");
	var pAux:String[] = p.Split("|"[0]);
	playersIndex = new int[pAux.Length];
	for(var i:int = 0; i < playersIndex.Length; i++){
	    playersIndex[i] = int.Parse(pAux[i]);
	    print(playersIndex[i]);
	}
	if(PlayerPrefs.GetInt("musica", 1)==1) AudioSource.PlayClipAtPoint(clip, transform.position);
	playerLabel.SendMessage("setTexto", PlayerPrefs.GetString("player"+(playersIndex[PlayerPrefs.GetInt("playerActual")]+1)));
	colorear();
	//Playtomic.Log.CustomMetric("boom", "Escena");
}

function colorear(){
	gameObject.SendMessage("setPlayer", PlayerPrefs.GetInt("playerActual"));
}

function OnGUI(){
	/*GUI.skin=mySkin;
	GUILayout.BeginArea (Rect (botonSize*1.25,-30,Screen.width-botonSize*2.5,80), GUI.skin.box);
	GUILayout.Space(25);
	GUILayout.Label("Player "+(PlayerPrefs.GetInt("playerActual")+1)+" Lose!");
	GUILayout.EndArea();
	if(GUI.Button(Rect(Screen.width/2-botonSize*2, Screen.height/2+botonSize, botonSize*4, 70), "Back")){
		Application.LoadLevel("Titulo");
	}*/
}

function exit(){
	Application.LoadLevel("Titulo");
}

function Update () {
#if UNITY_ANDROID
	if (Input.GetKey(KeyCode.Escape)){
		Application.LoadLevel("Titulo");
        return;
	}
#endif
}