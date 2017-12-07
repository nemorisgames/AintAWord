var ocupado=false;
var objeto:Transform;
var posicion:int=0;
var central:central;

function Awake(){
	var c:GameObject=GameObject.Find(".central");
	central=c.GetComponent("central");
}

function Update () {
	if(objeto!=null&&!Input.GetMouseButton (0)){
		objeto.position=transform.position;//+Vector3(0,0.001,0);
		objeto.rotation=transform.rotation;
		objeto.GetComponent.<Rigidbody>().isKinematic = true;
	}
}

function setPos(p:int){
	posicion=p;	
}

function OnTriggerStay (other : Collider) {
	var l:Tile=other.gameObject.GetComponent("Tile");
	if(!ocupado&&!l.utilizado){
		//if(!l.utilizado){
			l.utilizado = true;
			central.setLetra(l.letra, posicion);
			//other.transform.position=transform.position;
			//other.transform.rotation=transform.rotation;
			GetComponent.<Renderer>().enabled=false;
			ocupado=true;
			objeto=other.transform;
		//}
	}
}

function OnTriggerExit (other : Collider) {
	if(ocupado&&objeto==other.transform){
		var l:Tile=other.gameObject.GetComponent("Tile");
		l.utilizado = false;
		GetComponent.<Renderer>().enabled=true;
		central.setLetra("", posicion);
		ocupado=false;
		objeto=null;
	}
}