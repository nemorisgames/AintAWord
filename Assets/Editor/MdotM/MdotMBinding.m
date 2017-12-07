//
//  MdotMBinding.m
//  MdotMPlugin
//
//  Created by Mike Desaro on 10/10/12.
//  Copyright (c) 2012 prime31. All rights reserved.
//

#import "MdotMManager.h"


// Converts C style string to NSString
#define GetStringParam( _x_ ) ( _x_ != NULL ) ? [NSString stringWithUTF8String:_x_] : [NSString stringWithUTF8String:""]

// Converts C style string to NSString as long as it isnt empty
#define GetStringParamOrNil( _x_ ) ( _x_ != NULL && strlen( _x_ ) ) ? [NSString stringWithUTF8String:_x_] : nil


void _mdotmInit( const char * appKey, BOOL sendODIN, BOOL sendUDID, BOOL testMode )
{
	[MdotMManager sharedManager].appKey = GetStringParam( appKey );
	[MdotMManager sharedManager].sendODIN = sendODIN;
	[MdotMManager sharedManager].sendUDID = sendUDID;
	[MdotMManager sharedManager].testMode = testMode ? @"1" : @"0";
}


void _mdotmCreateBanner( int type, int pos )
{
	[[MdotMManager sharedManager] createBanner:(MdotMBannerType)type withPosition:(MdotMAdPosition)pos];
}


void _mdotmDestroyBanner()
{
	[[MdotMManager sharedManager] destroyBanner];
}


void _mdotmRequestInterstitalAd()
{
	[[MdotMManager sharedManager] requestInterstitalAd];
}


void _mdotmShowInterstitialAd()
{
	[[MdotMManager sharedManager] showInterstitialAd];
}


void _mdotmReportAppOpenWithAppleId( const char * appleId, const char * event, const char * emailAddress )
{
	[[MdotMManager sharedManager] reportAppOpenWithAppleId:GetStringParam( appleId ) event:GetStringParam( event ) emailAddress:GetStringParam( emailAddress )];
}


void _mdotmRegisterAppEvent( const char * eventId, const char * appleId, const char * usertoken, const char * transactionId )
{
	[[MdotMManager sharedManager] registerAppEvent:GetStringParam( appleId ) userToken:GetStringParam( usertoken ) eventId:GetStringParam( eventId ) transactionId:GetStringParam( transactionId )];
}


