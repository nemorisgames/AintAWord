var estado:int=0;
var letras:String[];
var palabra:Array;
var palabraAux:String;
var nLetras:int=4;
var indice=0;
var bomba:Transform;
var bombaComp:BombaNueva;
var mySkin : GUISkin;
var mySkin2 : GUISkin;
var mensajeReady:GameObject;
var mensajeIsAWord:GameObject[];
var botonGo:GameObject;
//var tile:Texture;
var playerActual=0;
var players:int=2;
var dificultad:int=2;
var pausar=false;
var indicarPlayer:Transform;
var clip : AudioClip;
var botonSize:int=80;
var fontChica:Font;
var playerLabel:GameObject;

var teclado:GameObject[];
var botonDel:GameObject;
var botonDoneTeclado:GameObject;

var tile:GameObject;
var tiles:Transform[];
var tileVacio:Transform;

var colores:Color[];
var dificultad_aux:int=0;

var panelPause:GameObject;
var soundOn:GameObject;
var soundOff:GameObject;

var playersIndex:int[];

function Awake(){
	if(Screen.width<800){ 
		botonSize=45;
		mySkin2.font=fontChica;
	}
    
	var p:String = PlayerPrefs.GetString("playerActives", "");
	var pAux:String[] = p.Split("|"[0]);
	playersIndex = new int[pAux.Length];
	for(var i:int = 0; i < playersIndex.Length; i++){
	    playersIndex[i] = int.Parse(pAux[i]);
	    print(playersIndex[i]);
	}

	playerActual=PlayerPrefs.GetInt("playerActual");
	//print((playerActual == 0)+" "+estado);
	if(playerActual == 0 && estado == 0){
		print("raise dif");
		//dificultad_aux=5-parseInt((PlayerPrefs.GetFloat("tiempo")*100/PlayerPrefs.GetFloat("tiempoInicial"))/20);
		//PlayerPrefs.SetInt("dificultadTiempo",5-parseInt((PlayerPrefs.GetFloat("tiempo")*100/PlayerPrefs.GetFloat("tiempoInicial"))/20));
	}

	dificultad=PlayerPrefs.GetInt("dificultad");
	//dificultad_aux=PlayerPrefs.GetInt("dificultadTiempo");
	dificultad=Mathf.Max(dificultad, dificultad_aux);
	switch(dificultad){
		case 1: nLetras=4; break;
		case 2: nLetras=5; break;
		case 3: nLetras=6; break;
		case 4: nLetras=7; break;
		case 5: nLetras=8; break;
		default: nLetras=8; break;
	}
	palabra=new Array(nLetras);
	tiles = new Transform[nLetras];
	for(i = 0; i < tiles.Length; i++){
		tiles[i] = Instantiate(tileVacio, Vector3((i - nLetras / 2) * 0.23, 0.4, 0.5), Quaternion.identity);
	}
	bombaComp=bomba.GetComponent("BombaNueva");
	PlayerPrefs.SetString("palabra", "");
	//mensajeIsAWord.enabled=false;
	
	players=PlayerPrefs.GetInt("nPlayers");
	cambioPlayer();
	colorear();


	soundOn.SetActive(PlayerPrefs.GetInt("sound", 1) == 1);
	soundOff.SetActive(PlayerPrefs.GetInt("sound", 1) == 0);

	AudioListener.volume = 1f * PlayerPrefs.GetInt("sound", 0);
	}

	function soundToggle()
	{
	    if (PlayerPrefs.GetInt("sound", 1) == 1)
	        PlayerPrefs.SetInt("sound", 0);
	    else
	        PlayerPrefs.SetInt("sound", 1);
	    soundOn.SetActive(PlayerPrefs.GetInt("sound", 1) == 1);
	    soundOff.SetActive(PlayerPrefs.GetInt("sound", 1) == 0);
	    AudioListener.volume = 1f * PlayerPrefs.GetInt("sound", 0);
	}

	function pause(){
	    print("pause");
	    if(Time.timeScale < 0.5){
	        Time.timeScale = 1f;
	        panelPause.SetActive(false);
	    }
	    else{
	        panelPause.SetActive(true);
	        Time.timeScale = 0f;
	    }
	}

function colorear(){
	gameObject.SendMessage("setPlayer", playerActual);
}

function activarTeclado(){

	estado=1;
	bombaComp.pausar(false);
	mensajeReady.SetActive(false);
	botonGo.SetActive(false);
	for(var i:int = 0; i<teclado.Length; i++) teclado[i].SetActive(true);
	botonDel.SetActive(false);
	botonDoneTeclado.SetActive(false);
}

function OnGUI () {
	GUI.skin=mySkin;
	/*GUILayout.BeginArea (Rect (botonSize*1.5,-30,Screen.width-botonSize*3,80), GUI.skin.box);
	GUILayout.Space(25);
	GUILayout.Label("Player "+(playerActual+1));
	GUILayout.EndArea();*/
	if(pausar) return;
	switch(estado){
		
		case 0:
			bombaComp.pausar(true);
			/*if(GUI.Button(Rect(Screen.width/2-100, Screen.height-70, 200, 50),"Go!")){
				estado=1;
				bombaComp.pausar(false);
				mensajeReady.enabled=false;
			}*/
		break;
		case 1:
			/*for(var i=0; i<letras.length; i++){
				var h:int=10; 
				var v:int=0;
				if(i>9){ h=10; v=30;}
				if(i>18){ h=9; v=0;}
				if(GUI.Button(Rect(Screen.width/2+(i%(h)-5)*(botonSize+2)+v, Screen.height/2-botonSize+(i/h)*(botonSize+10), botonSize, botonSize), letras[i])){
					if(indice<nLetras){
						if(PlayerPrefs.GetInt("musica", 1)==1) AudioSource.PlayClipAtPoint(clip, transform.position);	
						palabra[indice]=letras[i];
						palabraAux="";
						indice++;
						for(var j=0; j<indice; j++) palabraAux+=palabra[j];
					}
				}
			}
			if(indice>0&&GUI.Button(Rect(Screen.width/2-3*botonSize/4+(parseFloat(palabra.length)/2)*(botonSize+5)+5, botonSize*1.25, 60, botonSize), "Del")){
				//palabra.Pop();
				indice--;
				palabra[indice]="";
				palabraAux="";
				for(j=0; j<indice; j++) palabraAux+=palabra[j];		
			}
			if(indice>0&&GUI.Button(Rect(Screen.width-botonSize*2-10, Screen.height-botonSize*1.25-10, botonSize*2, botonSize*1.25), "Done")){
				bombaComp.pausar(true);
				mensajeIsAWord.enabled=true;
				estado=2;
				playerActual++; 
				if(playerActual>=players) playerActual=0;
				cambioPlayer();
			}
			GUI.skin=mySkin2;
			for(var i:int=0; i<palabra.length; i++){
				if(palabra[i] != null){
					GUI.Box(Rect(Screen.width/2-3*botonSize/4+(i-parseFloat(palabra.length)/2)*(botonSize+5), botonSize*1.25, botonSize, botonSize), tile, GUIStyle.none);
					GUI.Box(Rect(Screen.width/2-3*botonSize/4+(i-parseFloat(palabra.length)/2)*(botonSize+5)-1, botonSize*1.25-3, botonSize, botonSize), palabra[i].ToString());
				}
			}
			GUI.skin=mySkin;*/
			//GUI.Label(Rect(Screen.width/2-100, 70, 200, 50),palabraAux);
		break;
		case 2:
			/*GUI.skin=mySkin2;
			for(var i:int=0; i<palabra.length; i++){
				if(palabra[i] != null){
					//GUI.Box(Rect(Screen.width/2+(i-parseFloat(palabra.length)/2)*(botonSize+5), botonSize*1.25, botonSize, botonSize), tile, GUIStyle.none);
					GUI.Box(Rect(Screen.width/2+(i-parseFloat(palabra.length)/2)*(botonSize+5)-1, botonSize*1.25-3, botonSize, botonSize), palabra[i].ToString());
				}
			}
			GUI.skin=mySkin;
			if(GUI.Button(Rect(10, Screen.height-botonSize*1.25-10, 150, botonSize*1.25), "Ain't a Word!")){
				PlayerPrefs.SetFloat("tiempo",bombaComp.tiempo);
				//playerActual--; 
				//if(playerActual<0) playerActual=players-1;
				Application.LoadLevel(Application.loadedLevelName);
			}
			if(GUI.Button(Rect(Screen.width-160, Screen.height-botonSize*1.25-10, 150, botonSize*1.25), "Yes, it is")){
				PlayerPrefs.SetInt("playerActual", playerActual);
				PlayerPrefs.SetString("palabra",palabraAux);
				PlayerPrefs.SetFloat("tiempo",bombaComp.tiempo);
				Application.LoadLevel("Tiles");
			}*/
		break;
	}
}

function cambioPlayer(){
	pausar=true;
	print("cambiar"+playerActual);
	//var p:Transform=Instantiate(indicarPlayer, Vector3.zero, Quaternion.identity);
	//var p_g=p.gameObject;
	//p_g.SendMessage("setPlayer", playerActual);
	//print((playerActual+1)+" "+PlayerPrefs.GetInt("nPlayers"));
	playerLabel.SendMessage("setTexto", PlayerPrefs.GetString("player"+(playersIndex[playerActual]+1)));
	colorear();
	print("cambiado!");
	pausar=false;
}

function Update () {
    //cambioPlayer();
    if (Input.GetKey(KeyCode.Escape)){
        pause();
    }
}

function listo(){
	bombaComp.pausar(true);
	for(var i:int = 0; i<mensajeIsAWord.Length; i++) mensajeIsAWord[i].SetActive(true);
	for(i = 0; i<teclado.Length; i++) teclado[i].SetActive(false);
	estado=2;
	playerActual++; 
	if(playerActual>=players) playerActual=0;
	cambioPlayer();
}

function borrar(){
	if(indice > 0){
		indice--;
		palabra[indice]="";
		palabraAux="";
		for(var j:int = 0; j<indice; j++) palabraAux+=palabra[j];	
		Destroy(tiles[indice].gameObject);
		if(indice <= 0){ 
			botonDel.SetActive(false);
			botonDoneTeclado.SetActive(false);
		}
	}
}

function tecla(t:String){
	if(indice<nLetras){
		palabra[indice]=t;
		palabraAux="";
		var l:GameObject = Instantiate(tile, Vector3((indice - nLetras / 2) * 0.23, 0.4, 0.5), Quaternion.identity);
		l.SendMessage("setLetra", t);
		tiles[indice] = l.transform;
		indice++;
		for(var j:int = 0; j<indice; j++) palabraAux+=palabra[j];
		botonDel.SetActive(true);
		botonDoneTeclado.SetActive(true);
	}
}

function yes(){
	PlayerPrefs.SetInt("playerActual", playerActual);
	PlayerPrefs.SetString("palabra",palabraAux);
	PlayerPrefs.SetFloat("tiempo",bombaComp.tiempo);
	Application.LoadLevel("Tiles");
}

function aint(){
	PlayerPrefs.SetFloat("tiempo",bombaComp.tiempo);
	Application.LoadLevel(Application.loadedLevelName);
}

function toTitleScreen(){
    Time.timeScale = 1;
    Application.LoadLevel("Titulo");	
}

function exitGame(){
    Application.Quit();
}

function letraQ(){ tecla("Q"); }
function letraW(){ tecla("W"); }
function letraE(){ tecla("E"); }
function letraR(){ tecla("R"); }
function letraT(){ tecla("T"); }
function letraY(){ tecla("Y"); }
function letraU(){ tecla("U"); }
function letraI(){ tecla("I"); }
function letraO(){ tecla("O"); }
function letraP(){ tecla("P"); }
function letraA(){ tecla("A"); }
function letraS(){ tecla("S"); }
function letraD(){ tecla("D"); }
function letraF(){ tecla("F"); }
function letraG(){ tecla("G"); }
function letraH(){ tecla("H"); }
function letraJ(){ tecla("J"); }
function letraK(){ tecla("K"); }
function letraL(){ tecla("L"); }
function letraZ(){ tecla("Z"); }
function letraX(){ tecla("X"); }
function letraC(){ tecla("C"); }
function letraV(){ tecla("V"); }
function letraB(){ tecla("B"); }
function letraN(){ tecla("N"); }
function letraM(){ tecla("M"); }