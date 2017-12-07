//
//  MdotMManager.h
//  MdotMPlugin
//
//  Created by Mike Desaro on 10/10/12.
//  Copyright (c) 2012 prime31. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MdotMAdViewDelegate.h"
#import "MdotMAdView.h"
#import "MdotMRequestParameters.h"
#import "MdotMInterstitial.h"
#import "MdotMInterstitialDelegate.h"


typedef enum
{
	MdotMBanner_300x50,
	MdotMBanner_320x50,
	MdotMBanner_300x250,
	MdotMBanner_320x480,
	MdotMBanner_480x320,
	MdotMBanner_1024x768,
	MdotMBanner_768x1024,
	MdotMBanner_728x90
} MdotMBannerType;



typedef enum
{
	MdotMAdPositionTopLeft,
	MdotMAdPositionTopCenter,
	MdotMAdPositionTopRight,
	MdotMAdPositionCentered,
	MdotMAdPositionBottomLeft,
	MdotMAdPositionBottomCenter,
	MdotMAdPositionBottomRight
} MdotMAdPosition;


@interface MdotMManager : NSObject <MdotMAdViewDelegate, MdotMInterstitialDelegate>
{
	MdotMAdPosition bannerPosition;
}
@property (nonatomic, retain) MdotMAdView *adView;
@property (nonatomic, retain) MdotMInterstitial *interstitial;
@property (nonatomic, retain) UIWebView *webView;
@property (nonatomic, retain) NSString *appKey;
@property (nonatomic) BOOL sendODIN;
@property (nonatomic) BOOL sendUDID;
@property (nonatomic, retain) NSString *testMode;

+ (MdotMManager*)sharedManager;


- (void)createBanner:(MdotMBannerType)bannerType withPosition:(MdotMAdPosition)position;

- (void)destroyBanner;

- (void)requestInterstitalAd;

- (void)showInterstitialAd;

- (void)reportAppOpenWithAppleId:(NSString*)appleId event:(NSString*)event emailAddress:(NSString*)emailAddress;

- (void)registerAppEvent:(NSString*)appleId userToken:(NSString*)usertoken eventId:(NSString*)eventId transactionId:(NSString*)transactionId;

@end
