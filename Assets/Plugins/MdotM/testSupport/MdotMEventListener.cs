using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;


public class MdotMEventListener : MonoBehaviour
{

	void OnEnable()
	{
		// Listen to all events for illustration purposes
		MdotMManager.onReceiveBannerAdEvent += onReceiveBannerAdEvent;
		MdotMManager.onReceiveBannerAdErrorEvent += onReceiveBannerAdErrorEvent;
		MdotMManager.onReceiveClickInBannerAdEvent += onReceiveClickInBannerAdEvent;
		MdotMManager.adWillLeaveApplicationEvent += adWillLeaveApplicationEvent;
		MdotMManager.onReceiveInterstitialAdEvent += onReceiveInterstitialAdEvent;
		MdotMManager.onReceiveInterstitialAdErrorEvent += onReceiveInterstitialAdErrorEvent;
	}


	void OnDisable()
	{
		// Remove all event handlers
		MdotMManager.onReceiveBannerAdEvent -= onReceiveBannerAdEvent;
		MdotMManager.onReceiveBannerAdErrorEvent -= onReceiveBannerAdErrorEvent;
		MdotMManager.onReceiveClickInBannerAdEvent -= onReceiveClickInBannerAdEvent;
		MdotMManager.adWillLeaveApplicationEvent -= adWillLeaveApplicationEvent;
		MdotMManager.onReceiveInterstitialAdEvent -= onReceiveInterstitialAdEvent;
		MdotMManager.onReceiveInterstitialAdErrorEvent -= onReceiveInterstitialAdErrorEvent;
	}



	void onReceiveBannerAdEvent()
	{
		Debug.Log( "onReceiveBannerAdEvent" );
	}


	void onReceiveBannerAdErrorEvent( string error )
	{
		Debug.Log( "onReceiveBannerAdErrorEvent: " + error );
	}


	void onReceiveClickInBannerAdEvent()
	{
		Debug.Log( "onReceiveClickInBannerAdEvent" );
	}


	void adWillLeaveApplicationEvent()
	{
		Debug.Log( "adWillLeaveApplicationEvent" );
	}


	void onReceiveInterstitialAdEvent()
	{
		Debug.Log( "onReceiveInterstitialAdEvent" );
	}


	void onReceiveInterstitialAdErrorEvent( string error )
	{
		Debug.Log( "onReceiveInterstitialAdErrorEvent: " + error );
	}


}


