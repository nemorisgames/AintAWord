var mySkin : GUISkin;
function OnGUI(){
	GUI.skin=mySkin;
	if(GUI.Button(Rect(Screen.width/2-100, Screen.height-70, 200, 50),"Begin")){
		PlayerPrefs.SetInt("nPlayers",2);
		PlayerPrefs.SetInt("playerActual",0);
		PlayerPrefs.SetFloat("tiempo",40);
		PlayerPrefs.SetFloat("tiempoInicial",40);
		Application.LoadLevel("Type");
	}	
}

function Update () {
}