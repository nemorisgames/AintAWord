using UnityEngine;
using System.Collections;
using System.Collections.Generic;




public enum MdotMBanner
{
	Size_300x50,
	Size_320x50,
	Size_300x250,
	Size_320x480,
	Size_480x320,
	Size_468x60,
	Size_728x90
}


public enum MdotMAdLocation
{
	TopLeft,
	TopCenter,
	TopRight,
	Centered,
	BottomLeft,
	BottomCenter,
	BottomRight
}



public class MdotMAndroid
{
#if UNITY_ANDROID
	private static AndroidJavaObject _plugin;
	
		
	static MdotMAndroid()
	{
		if( Application.platform != RuntimePlatform.Android )
			return;

		// find the plugin instance
		using( var pluginClass = new AndroidJavaClass( "com.prime31.MdotMPlugin" ) )
			_plugin = pluginClass.CallStatic<AndroidJavaObject>( "instance" );
	}
	

	// Initializers the MdotM plugin. Must be called before any other methods.
	public static void init( string appKey, int adRefreshInterval, bool testMode, bool enableCaching )
	{
		if( Application.platform != RuntimePlatform.Android )
			return;
		
		int testModeInt = testMode ? 1 : 0;
		_plugin.Call( "init", appKey, adRefreshInterval, testModeInt, enableCaching );
	}


	// Creates a banner of the given type at the given position
	public static void createBanner( MdotMBanner type, MdotMAdLocation position )
	{
		if( Application.platform != RuntimePlatform.Android )
			return;
		
		_plugin.Call( "createBanner", (int)type, (int)position );
	}


	// Destroys the currently showing ad banner
	public static void destroyBanner()
	{
		if( Application.platform != RuntimePlatform.Android )
			return;
		
		_plugin.Call( "destroyBanner" );
	}


	// Requests an interstitial ad to be loaded
	public static void requestInterstitialAd()
	{
		if( Application.platform != RuntimePlatform.Android )
			return;
		
		_plugin.Call( "requestInterstitialAd" );
	}


	// Displays an interstitial ad if loaded
	public static void showInterstitialAd()
	{
		if( Application.platform != RuntimePlatform.Android )
			return;
		
		_plugin.Call( "showInterstitialAd" );
	}
#endif
}
