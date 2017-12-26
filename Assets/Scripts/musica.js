//var m:int=1;
//var mySkin : GUISkin;

function Awake(){
    DontDestroyOnLoad (gameObject);	
    /*
	m=PlayerPrefs.GetInt("musica", 1);
	if(m==1)
        GetComponent.<AudioSource>().mute = false;
    else
        GetComponent.<AudioSource>().mute = true;
        */
}

function OnGUI(){
	/*GUI.skin=mySkin;
	var mens="Mute";
	if(m==0) mens="Music";
	if(GUI.Button(Rect(0, 0, 70,50), mens)){
		if(m==0){ PlayerPrefs.SetInt("musica", 1); m=1; }
		else{ PlayerPrefs.SetInt("musica", 0); m=0; }	
		if(m==1)
            audio.mute = false;
        else
            audio.mute = true;
	}	*/
}

function Update () {
    if (Application.loadedLevelName == "Boom" || Application.loadedLevelName == "Titulo") Destroy(gameObject);
}