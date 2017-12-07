using UnityEngine;
using System.Collections.Generic;


public class MdotMUIManager : MonoBehaviour
{
#if UNITY_ANDROID
	void OnGUI()
	{
		float yPos = 5.0f;
		float xPos = 5.0f;
		float width = ( Screen.width >= 800 || Screen.height >= 800 ) ? 320 : 160;
		float height = ( Screen.width >= 800 || Screen.height >= 800 ) ? 80 : 40;
		float heightPlus = height + 10.0f;
	
	
		if( GUI.Button( new Rect( xPos, yPos, width, height ), "Init" ) )
		{
			MdotMAndroid.init( "YOURE_APP_KEY", 30, true, true );
		}
	
	
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Create 300x50 Banner" ) )
		{
			MdotMAndroid.createBanner( MdotMBanner.Size_300x50, MdotMAdLocation.BottomCenter );
		}
	
	
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Create 300x250 Banner" ) )
		{
			MdotMAndroid.createBanner( MdotMBanner.Size_300x250, MdotMAdLocation.BottomRight );
		}
	
	
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Destroy Banner" ) )
		{
			MdotMAndroid.destroyBanner();
		}
	
	
		xPos = Screen.width - width - 5.0f;
		yPos = 5.0f;
		
		if( GUI.Button( new Rect( xPos, yPos, width, height ), "Request Interstitial" ) )
		{
			MdotMAndroid.requestInterstitialAd();
		}
		
		
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Show Interstitial" ) )
		{
			MdotMAndroid.showInterstitialAd();
		}

	}
#endif
}
