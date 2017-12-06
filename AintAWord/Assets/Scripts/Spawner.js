var pref:Transform;
var letras:String[];
private var palabra:String[];
var nObjetos:int=1;
var nObjetosTotal:int=50;
var tiempo:float=3.0;
private var tiempoActual:float=0;
var pos:Vector2;
var posZ:Vector2;
var dificultad:int=0;
var tiles:Transform[];

function Awake(){
	if(Application.loadedLevelName == "Titulo") PlayerPrefs.SetString("palabra", "");
	var pal=PlayerPrefs.GetString("palabra");
	
	print(pal);
	if(tiempo<=0){
		dificultad=PlayerPrefs.GetInt("dificultad",2);
		var dificultad_aux=5-parseInt((PlayerPrefs.GetFloat("tiempo")*100/PlayerPrefs.GetFloat("tiempoInicial"))/20);
		dificultad=Mathf.Max(dificultad, dificultad_aux);
		switch(dificultad){
			case 1: nObjetos=pal.Length; break;
			case 2: nObjetos=parseInt(pal.Length*1.4); break;
			case 3: nObjetos=parseInt(pal.Length*1.8); break;
			case 4: nObjetos=parseInt(pal.Length*2.2); break;
			case 5: nObjetos=parseInt(pal.Length*2.6); break;
			default: nObjetos=parseInt(pal.Length*2.6); break;
		}
	}
	palabra=new String[pal.Length];
	tiles=new Transform[nObjetos];
	for(var i=0; i<pal.Length; i++){
		palabra[i]=pal.Substring(i,1);	
	}
	spawn();	
}

function shake(){
	for(var i=0; i<nObjetos; i++){
		var g:GameObject=tiles[i].gameObject;
		g.rigidbody.AddForce (0, 700*Random.value, 0);
		g.rigidbody.AddTorque (1000*Random.value, 1000*Random.value, 1000*Random.value);
	}	
}

function Update () {
	if(tiempo>0){
		if(nObjetosTotal>0 || nObjetosTotal <= -1){
			tiempoActual+=Time.deltaTime;
			if(tiempoActual>=tiempo){
				nObjetosTotal--; 
				spawn();
				tiempoActual=0;
			}
		}
	}
	//transform.eulerAngles+=2*Vector3(Random.value-0.5,Random.value-0.5,Random.value-0.5);
	//transrom.position.x
}

function spawn(){
	for(var i=0; i<nObjetos; i++){
		transform.position.x=(pos.y-pos.x)*Random.value+pos.x;
		transform.position.y=2+(Random.value-0.5)*4;
		transform.position.z=(posZ.y-posZ.x)*Random.value+posZ.x;
		transform.eulerAngles.x=360*Random.value;
		transform.eulerAngles.y=360*Random.value;
		transform.eulerAngles.z=360*Random.value;
		var l_t:Transform=Instantiate(pref, transform.position, transform.rotation);
		tiles[i]=l_t;
		var l:GameObject=l_t.gameObject;
		if(i<palabra.length)
			l.SendMessage("setLetra", palabra[i]);
		else
			l.SendMessage("setLetra", letras[parseInt(Random.Range(0,letras.length-1))]);
		l.rigidbody.AddTorque (1000*Random.value, 1000*Random.value, 1000*Random.value);
	}
}