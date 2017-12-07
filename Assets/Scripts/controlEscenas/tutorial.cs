using UnityEngine;
using System.Collections;

public class tutorial : MonoBehaviour {
	public vineta[] vinetas;
	public UILabel texto;
	int vinetaActual = 0;
	// Use this for initialization
	void Start () {
		vinetas[0].animacion.Play (true);
		texto.text = seleccionarTexto();
	}
	
	// Update is called once per frame
	void Update () {
		#if UNITY_ANDROID
			if (Input.GetKey(KeyCode.Escape)){
				Application.LoadLevel("Titulo");
		        return;
			}
		#endif
	}
	
	void siguienteVineta(){
		vinetas[vinetaActual].animacion.Play (false);
		vinetaActual++;
		if(vinetaActual >= vinetas.Length){ 
			siguienteEscena();
		}
		else{
			vinetas[vinetaActual].animacion.Play (true);
			texto.text = seleccionarTexto();
		}
	}
	
	void skip(){
		//Playtomic.Log.CustomMetric("skipTutorial", "Boton");
		siguienteEscena();
	}
	
	void siguienteEscena(){
		Application.LoadLevel("Type");	
	}
	
	string seleccionarTexto(){
		string texto = "";
		switch(PlayerPrefs.GetString("Language")){
			case "English":
				texto = vinetas[vinetaActual].textoIng;	
				break;
			case "Francais":
				texto = vinetas[vinetaActual].textoFra;
				break;
			case "Italiano":
				texto = vinetas[vinetaActual].textoIta;
				break;
			case "Deutsch":
				texto = vinetas[vinetaActual].textoAle;
				break;
			case "Espanol":
				texto = vinetas[vinetaActual].textoEsp;
				break;
		}
		return texto;
	}
}

[System.Serializable]
public class vineta{
	public TweenAlpha animacion;
	public string textoIng;
	public string textoFra;
	public string textoAle;
	public string textoIta;
	public string textoEsp;
}