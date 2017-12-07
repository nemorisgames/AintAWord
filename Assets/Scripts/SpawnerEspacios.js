var pref:Transform;
private var pal:String;
function Awake(){
	pal=PlayerPrefs.GetString("palabra");
	for(var i=0; i<pal.Length; i++){
		var s_t:Transform=Instantiate(pref, Vector3((i-pal.Length/2)*1.2-1.5, 0.5, -4.55), transform.rotation);	
		var s:GameObject=s_t.gameObject;
		s.SendMessage("setPos", i);
	}
}

function Update () {
}