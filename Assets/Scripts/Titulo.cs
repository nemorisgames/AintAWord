using UnityEngine;
using System.Collections;

public class Titulo : MonoBehaviour {
	/*int unidad;
	int estado=0;
	int players=2;
	int tiempo=40;
	int difficulty=2;*/
	public Transform musicaJuego;
	//int m=1;
	
	public UISprite bandera;
	public TweenPosition panelIdioma;
	string lenguajeActual = "";
	
	public TweenPosition panelPlay;
	public TweenPosition panelSettings;
	
	public UISlider letrasSlider;
	public UILabel letrasTexto;
	public UISlider tiempoSlider;
	public UILabel tiempoTexto;
	
	public UIInput[] playerInput;
	
	public UICheckbox[] playerCheckbox;
	
	public TweenPosition panelRemainder;

    public GameObject soundOn;
    public GameObject soundOff;


    // Use this for initialization
    void Start () {
        //PlayerPrefs.DeleteAll();
		GameObject m = GameObject.FindGameObjectWithTag("musica");
		if(m!=null) Destroy (m);
		//REMAINDER
		/*
		print (PlayerPrefs.GetInt("rankingRemainder", 5) + "==" + PlayerPrefs.GetInt("ejecuciones"));
		if(PlayerPrefs.GetInt("rankingRemainder", 5) == PlayerPrefs.GetInt("ejecuciones")){
			panelRemainder.Play(true);
			PlayerPrefs.SetInt("rankingRemainder", PlayerPrefs.GetInt("rankingRemainder") + 10);
		}
		*/
		for(int i = 0; i < playerInput.Length; i++){
			playerInput[i].text = PlayerPrefs.GetString("player"+(i+1), "Player "+(i+1));	
		}
        if (!PlayerPrefs.HasKey("sound")) PlayerPrefs.SetInt("sound", 1);
        soundOn.SetActive(PlayerPrefs.GetInt("sound", 1) == 1);
        soundOff.SetActive(PlayerPrefs.GetInt("sound", 1) == 0);

        AudioListener.volume = 1f * PlayerPrefs.GetInt("sound", 0);
    }

    public void soundToggle()
    {
        if (PlayerPrefs.GetInt("sound", 1) == 1)
            PlayerPrefs.SetInt("sound", 0);
        else
            PlayerPrefs.SetInt("sound", 1);
        soundOn.SetActive(PlayerPrefs.GetInt("sound", 1) == 1);
        soundOff.SetActive(PlayerPrefs.GetInt("sound", 1) == 0);
        AudioListener.volume = 1f * PlayerPrefs.GetInt("sound", 0);
    }
	
	void OnLetrasChange(){
		letrasTexto.text = "" + (4 + 4 * (letrasSlider.sliderValue));
	}
	
	void OnTiempoChange(){
		tiempoTexto.text = "" + (10 + Mathf.Ceil(290 * tiempoSlider.sliderValue));
	}
	
	void mostrarPanelIdioma(){
		panelIdioma.Play(panelIdioma.direction==AnimationOrTween.Direction.Forward?false:true);
	}
	
	void moreGames(){
		/*Playtomic.Log.CustomMetric("moreGames", "Boton");
#if UNITY_IOS	
		Application.OpenURL("http://itunes.apple.com/us/artist/nemoris-games/id431197158");	
#endif
#if UNITY_ANDROID	
		Application.OpenURL("https://play.google.com/store/apps/developer?id=Nemoris+Games#?t=W251bGwsbnVsbCxudWxsLDIxMiwiY29tLm5lbW9yaXNnYW1lcy51bml0eXRlc3QiXQ..");	
#endif*/
	}
	
	void rankear(){
		/*Playtomic.Log.CustomMetric("rankear", "Boton");
		PlayerPrefs.SetInt("rankingRemainder", -1);
		panelRemainder.Play(false);
#if UNITY_IOS	
		Application.OpenURL("https://itunes.apple.com/cl/app/aint-a-word/id436243749?mt=8");	
		
#endif
#if UNITY_ANDROID	
		Application.OpenURL("https://play.google.com/store/apps/details?id=com.nemorisgames.words");	
#endif
		*/
	}
	
	void noRankear(){
		/*Playtomic.Log.CustomMetric("noRankear", "Boton");
		panelRemainder.Play(false);*/
	}
	
	// Update is called once per frame
	void Update () {
		#if UNITY_ANDROID
		if (Input.GetKey(KeyCode.Escape)){
			Application.Quit();
	        return;
		}
		#endif
		
		if(lenguajeActual == PlayerPrefs.GetString("Language")) return;
		
		switch (PlayerPrefs.GetString("Language")){
		case "English":
			bandera.spriteName = "usa";
			break;
		case "Francais":
			bandera.spriteName = "francia";
			break;
		case "Italiano":
			bandera.spriteName = "italia";
			break;
		case "Deutsch":
			bandera.spriteName = "germany";
			break;
		case "Espanol":
			bandera.spriteName = "spain";
			break;
		}
		lenguajeActual = PlayerPrefs.GetString("Language");
		//Playtomic.Log.CustomMetric(PlayerPrefs.GetString("Language"), "Idioma");
		panelIdioma.Play(false);
		
		
	}
	
	void play(){
		panelPlay.Play(true);
		panelSettings.Play(true);
	}
	
	void juegoComenzar(){
		int players = 0;
        string playersActives = "";
		for(int i = 0; i < playerCheckbox.Length; i++){
			if(playerCheckbox[i].isChecked){
				players++;
				PlayerPrefs.SetString("player"+(i+1), playerInput[i].text==""?"Player "+(i+1):playerInput[i].text);
                playersActives += "" + i + "|";
            }
		}
        playersActives = playersActives.Substring(0, playersActives.Length - 1);
        print(playersActives);
        PlayerPrefs.SetString("playerActives", playersActives);
        PlayerPrefs.SetInt("nPlayers",players);
		PlayerPrefs.SetInt("playerActual",0);
		PlayerPrefs.SetInt("dificultad", (int)(1 + 4 * (letrasSlider.sliderValue)));
		PlayerPrefs.SetFloat("tiempo", float.Parse(tiempoTexto.text));
		PlayerPrefs.SetFloat("tiempoInicial",float.Parse(tiempoTexto.text));
        Instantiate(musicaJuego);
        Application.LoadLevel("Tutorial");
		
		/*Playtomic.Log.Play();
		Playtomic.Log.LevelAverageMetric("tiempo", "juego", double.Parse(tiempoTexto.text));
		Playtomic.Log.LevelAverageMetric("players", "juego", players);
		Playtomic.Log.LevelAverageMetric("letras", "juego", 4 + 4 * letrasSlider.sliderValue);*/
			
	}
	
}
