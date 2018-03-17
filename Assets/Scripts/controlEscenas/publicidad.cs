using UnityEngine;
using System.Collections;

public class publicidad : MonoBehaviour {
	/*public bool activated = true;
	public bool testmode = true;
	public string MdotMIdApple = "d23c19605b6a7763e46a22350ec1a57b";
	public string MdotMIdAndroid = "3b3738feda292ff507601d2368515df7";
	public string AppleID = "";
	public string[] escenasBannerBajo;
	public string[] escenasInterstitial;
	public Transform MdotMObjectIOS;
	public Transform MdotMObjectAndroid;
	// Use this for initialization
	void Start () {
		DontDestroyOnLoad(gameObject);
		if(!activated){ 
			Destroy(this);
			return;
		}
#if UNITY_IOS
		Instantiate (MdotMObjectIOS);
		MdotMBinding.init( MdotMIdApple, true, true, testmode );
		if(PlayerPrefs.GetInt("ejecuciones", 0) > 1){
			MdotMBinding.requestInterstitalAd();
		}
		if(!testmode){
			//MdotMBinding.reportAppOpenWithAppleId(AppleID, 
		}
#endif		
#if UNITY_ANDROID
		Instantiate (MdotMObjectAndroid);
		MdotMAndroid.init( MdotMIdAndroid, 30, testmode, true );
		if(PlayerPrefs.GetInt("ejecuciones", 0) > 1){
			MdotMAndroid.requestInterstitialAd();
		}
		if(!testmode){
			//MdotMAndroid.reportAppOpenWithAppleId(AppleID, 
		}
#endif
	}
	
	void OnLevelWasLoaded(int idEscena){
		bool encontrado = false;
#if UNITY_ANDROID
		MdotMAndroid.destroyBanner();
		for(int i = 0; i < escenasBannerBajo.Length; i++){
			if(escenasBannerBajo[i] == Application.loadedLevelName){
				MdotMAndroid.createBanner( MdotMBanner.Size_300x50, MdotMAdLocation.BottomCenter );
				encontrado = true;
			}
		}
		for(int i = 0; i < escenasInterstitial.Length; i++){
			if(escenasInterstitial[i] == Application.loadedLevelName){
				MdotMAndroid.requestInterstitialAd();
				encontrado = true;	
			}
		}
		//if(!encontrado) MdotMAndroid.destroyBanner();
#endif
#if UNITY_IOS
		MdotMBinding.destroyBanner();
		for(int i = 0; i < escenasBannerBajo.Length; i++){
			if(escenasBannerBajo[i] == Application.loadedLevelName){
				MdotMBinding.createBanner( MdotMBannerType.Size_320x50, MdotMAdPosition.BottomCenter );
				encontrado = true;
			}
		}
		for(int i = 0; i < escenasInterstitial.Length; i++){
			if(escenasInterstitial[i] == Application.loadedLevelName){
				MdotMBinding.requestInterstitalAd();
				encontrado = true;	
			}
		}
		//if(!encontrado) MdotMBinding.destroyBanner();
#endif
	}
	
	void onReceiveBannerAdEvent()
	{
		Debug.Log( "onReceiveBannerAdEvent" );
	}

	void onReceiveBannerAdErrorEvent()
	{
		Debug.Log( "onReceiveBannerAdErrorEvent");
	}
	
	void onReceiveBannerAdErrorEvent( string error )
	{
		Debug.Log( "onReceiveBannerAdErrorEvent: " + error );
	}


	void onReceiveClickInBannerAdEvent()
	{
		#if UNITY_IPHONE
		MdotMBinding.destroyBanner();
		#endif
		#if UNITY_ANDROID
		MdotMAndroid.destroyBanner();
		#endif
		Debug.Log( "onReceiveClickInBannerAdEvent" );
	}


	void adWillLeaveApplicationEvent()
	{
		Debug.Log( "adWillLeaveApplicationEvent" );
	}


	void onReceiveInterstitialAdEvent()
	{
		if(Application.loadedLevelName == "Nivel") return; 
		#if UNITY_IPHONE
		MdotMBinding.showInterstitialAd();
		#endif
		#if UNITY_ANDROID
		MdotMAndroid.showInterstitialAd();
		#endif
		Debug.Log( "onReceiveInterstitialAdEvent" );
	}
	
	void onReceiveInterstitialAdErrorEvent()
	{
		Debug.Log( "onReceiveInterstitialAdErrorEvent");
	}

	void onReceiveInterstitialAdErrorEvent( string error )
	{
		Debug.Log( "onReceiveInterstitialAdErrorEvent: " + error );
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnEnable()
	{
		#if UNITY_IPHONE
		// Listen to all events for illustration purposes
		MdotMManager.onReceiveBannerAdEvent += onReceiveBannerAdEvent;
		MdotMManager.onReceiveBannerAdErrorEvent += onReceiveBannerAdErrorEvent;
		MdotMManager.onReceiveClickInBannerAdEvent += onReceiveClickInBannerAdEvent;
		MdotMManager.adWillLeaveApplicationEvent += adWillLeaveApplicationEvent;
		MdotMManager.onReceiveInterstitialAdEvent += onReceiveInterstitialAdEvent;
		MdotMManager.onReceiveInterstitialAdErrorEvent += onReceiveInterstitialAdErrorEvent;
		#endif
		#if UNITY_ANDROID
		MdotMAndroidManager.onReceiveBannerAdEvent += onReceiveBannerAdEvent;
		MdotMAndroidManager.onReceiveBannerAdErrorEvent += onReceiveBannerAdErrorEvent;
		MdotMAndroidManager.onReceiveClickInBannerAdEvent += onReceiveClickInBannerAdEvent;
		MdotMAndroidManager.adWillLeaveApplicationEvent += adWillLeaveApplicationEvent;
		MdotMAndroidManager.onReceiveInterstitialAdEvent += onReceiveInterstitialAdEvent;
		MdotMAndroidManager.onReceiveInterstitialAdErrorEvent += onReceiveInterstitialAdErrorEvent;
		#endif
	}

	void OnDisable()
	{
		#if UNITY_IPHONE
		// Remove all event handlers
		MdotMManager.onReceiveBannerAdEvent -= onReceiveBannerAdEvent;
		MdotMManager.onReceiveBannerAdErrorEvent -= onReceiveBannerAdErrorEvent;
		MdotMManager.onReceiveClickInBannerAdEvent -= onReceiveClickInBannerAdEvent;
		MdotMManager.adWillLeaveApplicationEvent -= adWillLeaveApplicationEvent;
		MdotMManager.onReceiveInterstitialAdEvent -= onReceiveInterstitialAdEvent;
		MdotMManager.onReceiveInterstitialAdErrorEvent -= onReceiveInterstitialAdErrorEvent;
		#endif
		#if UNITY_ANDROID
		// Remove all event handlers
		MdotMAndroidManager.onReceiveBannerAdEvent -= onReceiveBannerAdEvent;
		MdotMAndroidManager.onReceiveBannerAdErrorEvent -= onReceiveBannerAdErrorEvent;
		MdotMAndroidManager.onReceiveClickInBannerAdEvent -= onReceiveClickInBannerAdEvent;
		MdotMAndroidManager.adWillLeaveApplicationEvent -= adWillLeaveApplicationEvent;
		MdotMAndroidManager.onReceiveInterstitialAdEvent -= onReceiveInterstitialAdEvent;
		MdotMAndroidManager.onReceiveInterstitialAdErrorEvent -= onReceiveInterstitialAdErrorEvent;
		#endif
	}
	
	void OnGUI(){
		//GUI.Box (new Rect(100,100,100,30), "ejecuciones "+PlayerPrefs.GetInt("ejecuciones", 0));	
	}*/
}
