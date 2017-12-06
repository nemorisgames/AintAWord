
function Update () {
	// Make sure the user pressed the mouse down
	if (!Input.GetMouseButtonDown (0))
		return;
	//print("dragged1");
	var mainCamera = FindCamera();
		
	// We need to actually hit an object
	var hit : RaycastHit;
	if (!Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hit, 100))
		return;
	//print("dragged2");
	// We need to hit a rigidbody that is not kinematic
	if (!hit.rigidbody || hit.rigidbody.isKinematic)
		return;
	transform.position=hit.transform.position;	
	
	print("dragged3");
} //063236825 mauricio jaramillo

function FindCamera ()
{
	if (camera)
		return camera;
	else
		return Camera.main;
}