var activar=false;

function Update () {
	if(activar){
		transform.root.localScale-=Time.deltaTime*Vector3(1,1,1);	
		if(transform.root.localScale.x<=1){
			activar=false;
			transform.root.localScale=Vector3(1,1,1);
		}
	}
}

function OnTriggerStay (other : Collider) {
	if(other.transform.tag!="piso"){
		other.gameObject.SetActive(false);
		other.rigidbody.isKinematic=true;
		other.transform.position.y=-1000;
		transform.root.localScale=Vector3(1.5,1.5,1.5);
		activar=true;
	}
}