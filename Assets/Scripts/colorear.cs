using UnityEngine;
using System.Collections;

public class colorear : MonoBehaviour {
	public UISprite[] objetos;
	public UILabel[] label;
	public Color[] colores;
	public Color[] coloresLetras;
	// Use this for initialization
	void Start () {
	
	}
	
	void setPlayer(int player){
		for(int i = 0; i < objetos.Length; i++){
			objetos[i].color = colores[player];
		}
		for(int i = 0; i < label.Length; i++){
			label[i].color = coloresLetras[player];
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
