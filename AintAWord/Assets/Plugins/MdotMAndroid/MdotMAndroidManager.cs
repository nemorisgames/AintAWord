using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;


public class MdotMAndroidManager : MonoBehaviour
{
	// Fired when an ad is successfully received
	public static event Action onReceiveBannerAdEvent;

	// Fired when an ad fails to be downloaded
	public static event Action onReceiveBannerAdErrorEvent;

	// Fired when a banner is touched by the user
	public static event Action onReceiveClickInBannerAdEvent;

	// Fired when an ad will cause another app to be opened
	public static event Action adWillLeaveApplicationEvent;

	// Fired when an interstitial has been downloaded and is ready to show
	public static event Action onReceiveInterstitialAdEvent;
	
	// Fired when an interstitial fails to be downloaded
	public static event Action onReceiveInterstitialAdErrorEvent;


	void Awake()
	{
		// Set the GameObject name to the class name for easy access from native code
		gameObject.name = this.GetType().ToString();
		DontDestroyOnLoad( this );
	}


	public void onReceiveBannerAd( string empty )
	{
		if( onReceiveBannerAdEvent != null )
			onReceiveBannerAdEvent();
	}


	public void onReceiveBannerAdError( string empty )
	{
		if( onReceiveBannerAdErrorEvent != null )
			onReceiveBannerAdErrorEvent();
	}


	public void onReceiveClickInBannerAd( string empty )
	{
		if( onReceiveClickInBannerAdEvent != null )
			onReceiveClickInBannerAdEvent();
	}


	public void adWillLeaveApplication( string empty )
	{
		if( adWillLeaveApplicationEvent != null )
			adWillLeaveApplicationEvent();
	}


	public void onReceiveInterstitialAd( string empty )
	{
		if( onReceiveInterstitialAdEvent != null )
			onReceiveInterstitialAdEvent();
	}
	
	
	public void onReceiveInterstitialAdError( string empty )
	{
		if( onReceiveInterstitialAdErrorEvent != null )
			onReceiveInterstitialAdErrorEvent();
	}

}

