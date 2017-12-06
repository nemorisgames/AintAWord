//var luz:Light;
var tiempo:float;
var tiempoConsumir:float;
//var tiempoLuz:float;
//var tiempoLuzActual:float;
var pausa=false;
//var tic : AudioClip;
var mecha:Transform[];
var mechaActual:int = 0;
var chispas:Transform;

function Awake(){
	tiempo = PlayerPrefs.GetFloat("tiempo", 40);
	tiempoConsumir = PlayerPrefs.GetFloat("tiempoInicial", 40) / mecha.Length;
	mechaActual = (tiempo) / tiempoConsumir;//parseInt((tiempo / 300) * mecha.Length);
	resetMecha();
	if(mechaActual < mecha.Length - 1) chispas.position = mecha[mechaActual].position;
	//tiempo+=(Random.value-0.5)*4;
	//tiempoLuz=(tiempo*0.0075)+0.0924;
}

function resetMecha(){
	for(var i:int = 0; i < mecha.Length; i++){
		if(i > mechaActual) consumirMecha(i); 
	} 
}

function pausar(b:boolean){
	pausa = b;
	chispas.gameObject.SetActive(!b);
}

function consumirMecha(indice:int){
	
	if(indice <= mecha.Length - 1){ 
		mecha[indice].gameObject.SetActive(false);
		chispas.position = mecha[indice].position;
	}
}

function Update () {
	if(!pausa){
		var mechaActualOld:int = mechaActual;
		mechaActual = (tiempo) / tiempoConsumir;//parseInt((tiempo / 300) * mecha.Length);
		if(mechaActual != mechaActualOld) consumirMecha(mechaActualOld);
		
		tiempo-=Time.deltaTime;
		if(tiempo<=0){
			Application.LoadLevel("Boom");
			print("BOOM!");	
		}
		/*tiempo-=Time.deltaTime;
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
			if(!luz.light.enabled&&(2-((tiempo*0.0075)+0.0924))>=1) transform.localScale = (2-((tiempo*0.0075)+0.0924))*Vector3(1,1,1);
			tiempoLuzActual=0;
			tiempoLuz=(0.023*tiempo+0.076);
			luz.light.enabled=!luz.light.enabled;
			if(PlayerPrefs.GetInt("musica", 1)==1) if(luz.light.enabled) AudioSource.PlayClipAtPoint(tic, transform.position);
		}*/
	}
}