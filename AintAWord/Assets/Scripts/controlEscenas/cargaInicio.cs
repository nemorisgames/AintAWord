using UnityEngine;
using System.Collections;

public class cargaInicio : MonoBehaviour {
	public string escenaSiguiente;
	// Use this for initialization
	void Start () {
		
		PlayerPrefs.SetInt("ejecuciones", PlayerPrefs.GetInt("ejecuciones", 0) + 1);
		
#if UNITY_IPHONE
		
	if(iPhone.generation == iPhoneGeneration.iPad1Gen || 
	   iPhone.generation == iPhoneGeneration.iPhone ||
	   iPhone.generation == iPhoneGeneration.iPhone3G ||
	   iPhone.generation == iPhoneGeneration.iPhone3GS)
			QualitySettings.SetQualityLevel(1);
#endif
	}
	
	// Update is called once per frame
	void Update () {
		//if(Time.timeSinceLevelLoad > 1f) 
			Application.LoadLevel(escenaSiguiente);
	}
}
