using UnityEngine;
using System.Collections;
using UnityEngine;

public class cargaInicio : MonoBehaviour {
	public string escenaSiguiente;
	// Use this for initialization
	void Start () {
		
		PlayerPrefs.SetInt("ejecuciones", PlayerPrefs.GetInt("ejecuciones", 0) + 1);
		
#if UNITY_IPHONE

#endif
	}
	
	// Update is called once per frame
	void Update () {
		//if(Time.timeSinceLevelLoad > 1f) 
			Application.LoadLevel(escenaSiguiente);
	}
}
