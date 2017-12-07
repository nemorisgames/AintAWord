//
//  MdotMManager.m
//  MdotMPlugin
//
//  Created by Mike Desaro on 10/10/12.
//  Copyright (c) 2012 prime31. All rights reserved.
//

#import "MdotMManager.h"
#import <CommonCrypto/CommonDigest.h>

#include <sys/socket.h>
#include <sys/sysctl.h>
#include <net/if.h>
#include <net/if_dl.h>
#include <AdSupport/AdSupport.h>



UIViewController *UnityGetGLViewController();
void UnityPause( bool shouldPause );
void UnitySendMessage( const char * className, const char * methodName, const char * param );

NSString * ODIN1()
{
	// Step 1: Get MAC address
    
    int                 mib[6];
    size_t              len;
    char                *buf;
    unsigned char       *ptr;
    struct if_msghdr    *ifm;
    struct sockaddr_dl  *sdl;
    
    mib[0] = CTL_NET;
    mib[1] = AF_ROUTE;
    mib[2] = 0;
    mib[3] = AF_LINK;
    mib[4] = NET_RT_IFLIST;
    
    if ((mib[5] = if_nametoindex("en0")) == 0) {
        //NSLog(@"ODIN-1.1: if_nametoindex error");
        return nil;
    }
    
    if (sysctl(mib, 6, NULL, &len, NULL, 0) < 0) {
        //NSLog(@"ODIN-1.1: sysctl 1 error");
        return nil;
    }
    
    if ((buf = (char *)malloc(len)) == NULL) {
        //NSLog(@"ODIN-1.1: malloc error");
        return nil;
    }
    
    if (sysctl(mib, 6, buf, &len, NULL, 0) < 0) {
        //NSLog(@"ODIN-1.1: sysctl 2 error");
        return nil;
    }
    
    ifm = (struct if_msghdr *)buf;
    sdl = (struct sockaddr_dl *)(ifm + 1);
    ptr = (unsigned char *)LLADDR(sdl);
    
    //NSLog(@"MAC Address: %02X:%02X:%02X:%02X:%02X:%02X", *ptr, *(ptr+1), *(ptr+2), *(ptr+3), *(ptr+4), *(ptr+5));
    
	// Step 2: Take the SHA-1 of the MAC address
    
    CFDataRef data = CFDataCreate(NULL, (uint8_t*)ptr, 6);
    
    unsigned char messageDigest[CC_SHA1_DIGEST_LENGTH];
	
	CC_SHA1(CFDataGetBytePtr((CFDataRef)data),
			CFDataGetLength((CFDataRef)data),
			messageDigest);
	
	CFMutableStringRef string = CFStringCreateMutable(NULL, 40);
	for(int i = 0; i < CC_SHA1_DIGEST_LENGTH; i++) {
		CFStringAppendFormat(string,
							 NULL,
							 (CFStringRef)@"%02X",
							 messageDigest[i]);
	}
	
    CFStringLowercase(string, CFLocaleGetSystem());
    
    //NSLog(@"ODIN-1: %@", string);
    
    free(buf);
    
    NSString *odinstring = [[[NSString alloc] initWithString:(NSString*)string] autorelease];
    CFRelease(data);
    CFRelease(string);
	
    return odinstring;
}


@implementation MdotMManager

@synthesize adView = _adView;

///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark NSObject

+ (MdotMManager*)sharedManager
{
	static dispatch_once_t pred;
	static MdotMManager *_sharedInstance = nil;
	
	dispatch_once( &pred, ^{ _sharedInstance = [[self alloc] init]; } );
	return _sharedInstance;
}


- (id)init
{
	if( ( self = [super init] ) )
	{
		self.testMode = @"0";
	}
	return self;
}


///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark - Private

- (void)adjustAdViewFrameToShowAdView
{
	// fetch screen dimensions and useful values
	CGRect origFrame = _adView.frame;
	
	CGFloat screenHeight = [UIScreen mainScreen].bounds.size.height;
	CGFloat screenWidth = [UIScreen mainScreen].bounds.size.width;
	
	if( UIInterfaceOrientationIsLandscape( UnityGetGLViewController().interfaceOrientation ) )
	{
		screenWidth = screenHeight;
		screenHeight = [UIScreen mainScreen].bounds.size.width;
	}
	
	
	switch( bannerPosition )
	{
		case MdotMAdPositionTopLeft:
			origFrame.origin.x = 0;
			origFrame.origin.y = 0;
			_adView.autoresizingMask = ( UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleBottomMargin );
			break;
		case MdotMAdPositionTopCenter:
			origFrame.origin.x = ( screenWidth / 2 ) - ( origFrame.size.width / 2 );
			origFrame.origin.y = 0;
			_adView.autoresizingMask = ( UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleBottomMargin );
			break;
		case MdotMAdPositionTopRight:
			origFrame.origin.x = screenWidth - origFrame.size.width;
			origFrame.origin.y = 0;
			_adView.autoresizingMask = ( UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleBottomMargin );
			break;
		case MdotMAdPositionCentered:
			origFrame.origin.x = ( screenWidth / 2 ) - ( origFrame.size.width / 2 );
			origFrame.origin.y = ( screenHeight / 2 ) - ( origFrame.size.height / 2 );
			_adView.autoresizingMask = ( UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleTopMargin | UIViewAutoresizingFlexibleBottomMargin );
			break;
		case MdotMAdPositionBottomLeft:
			origFrame.origin.x = 0;
			origFrame.origin.y = screenHeight - origFrame.size.height;
			_adView.autoresizingMask = ( UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleTopMargin );
			break;
		case MdotMAdPositionBottomCenter:
			origFrame.origin.x = ( screenWidth / 2 ) - ( origFrame.size.width / 2 );
			origFrame.origin.y = screenHeight - origFrame.size.height;
			_adView.autoresizingMask = ( UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleRightMargin | UIViewAutoresizingFlexibleTopMargin );
			break;
		case MdotMAdPositionBottomRight:
			origFrame.origin.x = screenWidth - _adView.frame.size.width;
			origFrame.origin.y = screenHeight - origFrame.size.height;
			_adView.autoresizingMask = ( UIViewAutoresizingFlexibleLeftMargin | UIViewAutoresizingFlexibleTopMargin );
			break;
	}
	
	_adView.frame = origFrame;
}


- (MdotMRequestParameters*)requestParameters
{
	MdotMRequestParameters *params = [[[MdotMRequestParameters alloc] init] autorelease];
	params.appKey = self.appKey;
	params.test = self.testMode;
	params.sendODIN = self.sendODIN;
	params.sendUDID = self.sendUDID;
	
	return params;
}


- (void)reportAppOpenToMdotM:(NSArray*)params
{
	NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
	
	NSString *event = [params objectAtIndex:0];
	NSString *appleId = [params objectAtIndex:1];
	NSString *emailAddress = [params objectAtIndex:2];
	
	NSString *odin = ODIN1();
	NSString *aid = @"";
	NSString *ate = @"";
	
	Class advertClass = NSClassFromString( @"ASIdentifierManager" );
	if( advertClass )
	{
		aid = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
		ate = [ASIdentifierManager sharedManager].advertisingTrackingEnabled ? @"1" : @"0";
	}
	
	NSString *uniqueIdentifier = @"";
	
	if( self.sendUDID )
		uniqueIdentifier = [[UIDevice currentDevice] uniqueIdentifier];
	
	NSString *appOpenEndpoint = [NSString stringWithFormat:@"http://ads.mdotm.com/ads/trackback.php?advid=%@&deviceid=%@&odin=%@&aid=%@&ate=%@&appid=%@&eventID=%@", emailAddress, uniqueIdentifier,  odin, aid, ate, appleId, event];
	NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:appOpenEndpoint]];
	NSURLResponse *response;
	NSError *error = nil;
	NSData *responseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&error];
	NSString *responseString = [[[NSString alloc] initWithData:responseData encoding:NSUTF8StringEncoding] autorelease];
	NSLog( @"app open response: %@", responseString );
	
	[pool drain];
}


///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark - MdotMAdViewDelegate

- (void)onReceiveBannerAd
{
	[self adjustAdViewFrameToShowAdView];
	UnitySendMessage( "MdotMManager", "onReceiveBannerAd", "" );
}


- (void)onReceiveBannerAdError:(NSString*)error
{
	UnitySendMessage( "MdotMManager", "onReceiveBannerAdError", error.UTF8String );
}


- (void)onReceiveClickInBannerAd
{
	UnitySendMessage( "MdotMManager", "onReceiveClickInBannerAd", "" );
}


- (void)adWillLeaveApplication
{
	UnitySendMessage( "MdotMManager", "adWillLeaveApplication", "" );
}


///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark - MdotMInterstitialDelegate

- (void)onReceiveInterstitialAd
{
	UnitySendMessage( "MdotMManager", "onReceiveInterstitialAd", "" );
}


- (void)onReceiveInterstitialAdError:(NSString*)error
{
	UnitySendMessage( "MdotMManager", "onReceiveInterstitialAdError", error.UTF8String );
}


- (void)onReceiveClickInInterstitialAd
{}


- (void)willShowModalViewController
{
	UnityPause( true );
}


- (void)didShowModalViewController
{}


- (void)willDismissModalViewController
{
	UnityPause( false );
}


- (void)didDismissModalViewController
{
	self.interstitial = nil;
}


- (void)willLeaveApplication
{}


///////////////////////////////////////////////////////////////////////////////////////////////////
#pragma mark - Public

- (void)createBanner:(MdotMBannerType)bannerType withPosition:(MdotMAdPosition)position
{
	// kill the current adView if we have one
	if( _adView )
		[self destroyBanner];
	
	bannerPosition = position;
	
	switch( bannerType )
	{
		case MdotMBanner_300x50:
		{
			_adView = [[MdotMAdView alloc] initWithFrame:CGRectMake( 0, 0, 300, 50 )];
			break;
		}
		case MdotMBanner_320x50:
		{
			_adView = [[MdotMAdView alloc] initWithFrame:CGRectMake( 0, 0, 320, 50 )];
			break;
		}
		case MdotMBanner_300x250:
		{
			_adView = [[MdotMAdView alloc] initWithFrame:CGRectMake( 0, 0, 300, 250 )];
			break;
		}
		case MdotMBanner_320x480:
		{
			_adView = [[MdotMAdView alloc] initWithFrame:CGRectMake( 0, 0, 320, 480 )];
			break;
		}
		case MdotMBanner_480x320:
		{
			_adView = [[MdotMAdView alloc] initWithFrame:CGRectMake( 0, 0, 480, 320 )];
			break;
		}
		case MdotMBanner_1024x768:
		{
			_adView = [[MdotMAdView alloc] initWithFrame:CGRectMake( 0, 0, 1024, 768 )];
		}
		case MdotMBanner_768x1024:
		{
			_adView = [[MdotMAdView alloc] initWithFrame:CGRectMake( 0, 0, 768, 1024 )];
		}
		case MdotMBanner_728x90:
		{
			_adView = [[MdotMAdView alloc] initWithFrame:CGRectMake( 0, 0, 728, 90 )];
		}
	}
	
	// finish setting up the banner
	_adView.adViewDelegate = self;
	[_adView loadBannerAd:[self requestParameters] withSize:_adView.frame.size];
	
	[self adjustAdViewFrameToShowAdView];
	
	[UnityGetGLViewController().view addSubview:_adView];
}


- (void)destroyBanner
{
	_adView.adViewDelegate = nil;
	[_adView removeFromSuperview];
	self.adView = nil;
}


- (void)requestInterstitalAd
{
	self.interstitial = [[[MdotMInterstitial alloc] init] autorelease];
	self.interstitial.interstitialDelegate = self;
	[self.interstitial loadInterstitialAd:[self requestParameters]];
}


- (void)showInterstitialAd
{
	[self.interstitial showInterstitial:UnityGetGLViewController() animated:YES];
}


- (void)reportAppOpenWithAppleId:(NSString*)appleId event:(NSString*)event emailAddress:(NSString*)emailAddress
{
	NSArray *params = [NSArray arrayWithObjects:event, appleId, emailAddress, nil];
	[self performSelectorInBackground:@selector(reportAppOpenToMdotM:) withObject:params];
}


- (void)registerAppEvent:(NSString*)appleId userToken:(NSString*)usertoken eventId:(NSString*)eventId transactionId:(NSString*)transactionId
{
	// only add the webView once
	if( !self.webView )
	{
		self.webView = [[[UIWebView alloc] initWithFrame:CGRectMake( 0, 0, 0, 0 )] autorelease];
		[UnityGetGLViewController().view addSubview:self.webView];
	}

	NSString *odin = ODIN1();
	NSString *aid = @"";
	NSString *ate = @"";
	
	Class advertClass = NSClassFromString( @"ASIdentifierManager" );
	if( advertClass )
	{
		aid = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
		ate = [ASIdentifierManager sharedManager].advertisingTrackingEnabled ? @"1" : @"0";
	}
	
	NSString *uniqueIdentifier = @"";
	if( self.sendUDID )
		uniqueIdentifier = [[UIDevice currentDevice] uniqueIdentifier];

	
	NSString *appOpenEndpoint = [NSString stringWithFormat:@"http://ads.mdotm.com/ads/event.php?appid=%@&usertoken=%@&aid=%@&ate=%@&odin=%@&eventid=%@&transactionid=%@&deviceid=%@",
								 appleId, usertoken, aid, ate, odin, eventId, transactionId, uniqueIdentifier];
	NSURL *url = [NSURL URLWithString:appOpenEndpoint];
	NSURLRequest *requestObj = [NSURLRequest requestWithURL:url];
	[self.webView loadRequest:requestObj];
}

@end
