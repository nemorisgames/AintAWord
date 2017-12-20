using UnityEngine;
using System.Collections;

public class LoaderLogo : MonoBehaviour {

	// Use this for initialization
	void Start () {
        StartCoroutine("LogoWait");
    }
	
	private IEnumerator LogoWait() {
        yield return new WaitForSeconds(2);
        Application.LoadLevel (1);
    } 
}
