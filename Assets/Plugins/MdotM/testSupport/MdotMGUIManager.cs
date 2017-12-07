using UnityEngine;
using System.Collections.Generic;


public class MdotMGUIManager : MonoBehaviour
{
#if UNITY_IPHONE
	void OnGUI()
	{
		float yPos = 5.0f;
		float xPos = 5.0f;
		float width = ( Screen.width >= 960 || Screen.height >= 960 ) ? 320 : 160;
		float height = ( Screen.width >= 960 || Screen.height >= 960 ) ? 80 : 40;
		float heightPlus = height + 10.0f;
	
	
		if( GUI.Button( new Rect( xPos, yPos, width, height ), "Init" ) )
		{
			MdotMBinding.init( "YOUR_APP_KEY_HERE", true, true, true );
		}
	
	
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Create 320x50 Banner" ) )
		{
			MdotMBinding.createBanner( MdotMBannerType.Size_320x50, MdotMAdPosition.BottomCenter );
		}
	
	
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Create 300x250 Banner" ) )
		{
			MdotMBinding.createBanner( MdotMBannerType.Size_300x250, MdotMAdPosition.BottomCenter );
		}
	
	
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Create 300x50 Banner" ) )
		{
			MdotMBinding.createBanner( MdotMBannerType.Size_300x50, MdotMAdPosition.TopCenter );
		}
		
		
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Destroy Banner" ) )
		{
			MdotMBinding.destroyBanner();
		}
	
	
		xPos = Screen.width - width - 5.0f;
		yPos = 5.0f;
		
		if( GUI.Button( new Rect( xPos, yPos, width, height ), "Request Interstitial" ) )
		{
			MdotMBinding.requestInterstitalAd();
		}
		
		
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Show Interstitial" ) )
		{
			MdotMBinding.showInterstitialAd();
		}
		
		
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Report App Open" ) )
		{
			MdotMBinding.reportAppOpenWithAppleId( "apple-app-id", "your-event-id", "your@email.address" );
		}
		
		
		if( GUI.Button( new Rect( xPos, yPos += heightPlus, width, height ), "Register App Event" ) )
		{
			MdotMBinding.registerAppEvent( "event-id", "apple-app-id", "unique-user-token", "optional-transaction-id" );
		}

	}
#endif

}
