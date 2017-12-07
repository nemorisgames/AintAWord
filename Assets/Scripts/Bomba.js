var luz:Light;
var tiempo:float;
var tiempoLuz:float;
var tiempoLuzActual:float;
var pausa=false;
var tic : AudioClip;

function Awake(){
	tiempo=PlayerPrefs.GetFloat("tiempo", 40);
	//tiempo+=(Random.value-0.5)*4;
	tiempoLuz=(tiempo*0.0075)+0.0924;
}

function Update () {
	if(!pausa){
		tiempo-=Time.deltaTime;
		if(tiempo<=0){
			Application.LoadLevel("Boom");
			print("BOOM!");	
		}
		if(transform.localScale.x>1)
			transform.localScale -= Time.deltaTime*0.1*Vector3(1,1,1);
		tiempoLuzActual+=Time.deltaTime;
		if(tiempoLuzActual>=tiempoLuz){ 
			//if(!luz.light.enabled&&((tiempo/-80)+1.5)>=1) transform.localScale = ((tiempo/-80)+1.5)*Vector3(1,1,1);
			print(""+(2-((tiempo*0.0075)+0.0924)));
			if(!luz.GetComponent.<Light>().enabled&&(2-((tiempo*0.0075)+0.0924))>=1) transform.localScale = (2-((tiempo*0.0075)+0.0924))*Vector3(1,1,1);
			tiempoLuzActual=0;
			tiempoLuz=(0.023*tiempo+0.076);
			luz.GetComponent.<Light>().enabled=!luz.GetComponent.<Light>().enabled;
			if(PlayerPrefs.GetInt("musica", 1)==1) if(luz.GetComponent.<Light>().enabled) AudioSource.PlayClipAtPoint(tic, transform.position);
		}
	}
}