using UnityEngine;
using System.Collections;

public class changeLabel : MonoBehaviour {
	public UILabel label;
	// Use this for initialization
	void Start () {
	
	}
	
	void setTexto(string texto){
		label.text = texto;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
