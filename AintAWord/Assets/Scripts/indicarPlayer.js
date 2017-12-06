var pos:float=0;
var pos2:float=0;
var mySkin : GUISkin;
var playerActual=0;

function OnGUI(){
	GUI.skin=mySkin;
	pos=Mathf.Lerp(pos, Screen.width-200, Time.deltaTime*1);
	if(pos<Screen.width-210){
		GUI.Box(Rect(0, Screen.height/2-50*pos/(Screen.width-200), Screen.width,100*pos/(Screen.width-200)), "");
		GUI.Label(Rect(pos, Screen.height/2-25, 200,100), "Player "+(playerActual+1));
	}
	else{
		pos2=Mathf.Lerp(pos2, 100, Time.deltaTime*1);
		GUI.Box(Rect(0, Screen.height/2-50+pos2/2, Screen.width,100-pos2), "");
		if(pos2>90) Destroy(gameObject);
	}
}

function setPlayer(p:int){
	playerActual=p;
	print(""+p);
}

function Update () {
}