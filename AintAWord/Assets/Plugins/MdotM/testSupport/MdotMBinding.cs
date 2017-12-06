using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;



#if UNITY_IPHONE
public enum MdotMBannerType
{
	Size_300x50,
	Size_320x50,
	Size_300x250,
	Size_320x480,
	Size_480x320,
	Size_1024x768,
	Size_768x1024,
	Size_728x90
}

public enum MdotMAdPosition
{
	TopLeft,
	TopCenter,
	TopRight,
	Centered,
	BottomLeft,
	BottomCenter,
	BottomRight
}
#endif


public class MdotMBinding
{
#if UNITY_IPHONE
	[DllImport("__Internal")]
	private static extern void _mdotmInit( string appKey, bool sendODIN, bool sendUDID, bool testMode );

	// Initializers the MdotM plugin. Must be called before any other methods.
	public static void init( string appKey, bool sendODIN, bool sendUDID, bool testMode )
	{
		if( Application.platform == RuntimePlatform.IPhonePlayer )
			_mdotmInit( appKey, sendODIN, sendUDID, testMode );
	}


	[DllImport("__Internal")]
	private static extern void _mdotmCreateBanner( int type, int pos );

	// Creates a banner of the given type at the given position
	public static void createBanner( MdotMBannerType type, MdotMAdPosition pos )
	{
		if( Application.platform == RuntimePlatform.IPhonePlayer )
			_mdotmCreateBanner( (int)type, (int)pos );
	}


	[DllImport("__Internal")]
	private static extern void _mdotmDestroyBanner();

	// Destroys the currently showing ad banner
	public static void destroyBanner()
	{
		if( Application.platform == RuntimePlatform.IPhonePlayer )
			_mdotmDestroyBanner();
	}


	[DllImport("__Internal")]
	private static extern void _mdotmRequestInterstitalAd();

	// Requests an interstitial ad to be loaded
	public static void requestInterstitalAd()
	{
		if( Application.platform == RuntimePlatform.IPhonePlayer )
			_mdotmRequestInterstitalAd();
	}


	[DllImport("__Internal")]
	private static extern void _mdotmShowInterstitialAd();

	// Displays an interstitial ad if loaded
	public static void showInterstitialAd()
	{
		if( Application.platform == RuntimePlatform.IPhonePlayer )
			_mdotmShowInterstitialAd();
	}


	[DllImport("__Internal")]
	private static extern void _mdotmReportAppOpenWithAppleId( string appleId, string eventId, string emailAddress );

	// Reports an app open with MdotM's servers
	public static void reportAppOpenWithAppleId( string appleId, string eventId, string emailAddress )
	{
		if( Application.platform == RuntimePlatform.IPhonePlayer )
			_mdotmReportAppOpenWithAppleId( appleId, eventId, emailAddress );
	}


	[DllImport("__Internal")]
	private static extern void _mdotmRegisterAppEvent( string eventId, string appleId, string usertoken, string transactionId );

	// Reports an app event with MdotM's servers. This method injects an invisible web view into the view hierarchy to handle registration
	public static void registerAppEvent( string eventId, string appleId, string usertoken, string transactionId )
	{
		if( Application.platform == RuntimePlatform.IPhonePlayer )
			_mdotmRegisterAppEvent( eventId, appleId, usertoken, transactionId );
	}
#endif

}

