var letra1:Transform;
var letra2:Transform;
var letra:String;
var clip : AudioClip;
var utilizado:boolean = false;

function setLetra(l:String){
	var t1:TextMesh=letra1.GetComponent(TextMesh);
	t1.text=l;
	var t2:TextMesh=letra2.GetComponent(TextMesh);
	t2.text=l;
	letra=l;
}

function OnCollisionEnter (collisionInfo : Collision){	
	if(PlayerPrefs.GetInt("musica", 1)==1) AudioSource.PlayClipAtPoint(clip, transform.position);	
}

function Update () {
	if(transform.position.y<-10) Destroy(gameObject);
}