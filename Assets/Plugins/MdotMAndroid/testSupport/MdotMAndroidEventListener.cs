using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;


public class MdotMAndroidEventListener : MonoBehaviour
{

	void OnEnable()
	{
		// Listen to all events for illustration purposes
		MdotMAndroidManager.onReceiveBannerAdEvent += onReceiveBannerAdEvent;
		MdotMAndroidManager.onReceiveBannerAdErrorEvent += onReceiveBannerAdErrorEvent;
		MdotMAndroidManager.onReceiveClickInBannerAdEvent += onReceiveClickInBannerAdEvent;
		MdotMAndroidManager.adWillLeaveApplicationEvent += adWillLeaveApplicationEvent;
		MdotMAndroidManager.onReceiveInterstitialAdEvent += onReceiveInterstitialAdEvent;
		MdotMAndroidManager.onReceiveInterstitialAdErrorEvent += onReceiveInterstitialAdErrorEvent;
	}


	void OnDisable()
	{
		// Remove all event handlers
		MdotMAndroidManager.onReceiveBannerAdEvent -= onReceiveBannerAdEvent;
		MdotMAndroidManager.onReceiveBannerAdErrorEvent -= onReceiveBannerAdErrorEvent;
		MdotMAndroidManager.onReceiveClickInBannerAdEvent -= onReceiveClickInBannerAdEvent;
		MdotMAndroidManager.adWillLeaveApplicationEvent -= adWillLeaveApplicationEvent;
		MdotMAndroidManager.onReceiveInterstitialAdEvent -= onReceiveInterstitialAdEvent;
		MdotMAndroidManager.onReceiveInterstitialAdErrorEvent -= onReceiveInterstitialAdErrorEvent;
	}



	void onReceiveBannerAdEvent()
	{
		Debug.Log( "onReceiveBannerAdEvent" );
	}


	void onReceiveBannerAdErrorEvent()
	{
		Debug.Log( "onReceiveBannerAdErrorEvent" );
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
	
	
	void onReceiveInterstitialAdErrorEvent()
	{
		Debug.Log( "onReceiveInterstitialAdErrorEvent" );
	}


}


