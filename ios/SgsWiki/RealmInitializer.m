//
//  RealmInitializer.m
//  SgsWiki
//
//  Created by Wilson Lau on 2016-11-06.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RealmInitializer.h"

@implementation RealmInitializer

+ (void) initRealm
{
  // Get the path for the expected Realm file.
  NSError *error = nil;
  NSFileManager *fm = [NSFileManager defaultManager];
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES);
  NSString *libraryDir = [paths objectAtIndex:0];

  NSString *expectedRealmPath = [libraryDir stringByAppendingString:@"/LocalDatabase/sgswiki.realm"];

  // If expected Realm file doesn't exist. Copy it from the bundle.
  if (![fm fileExistsAtPath: expectedRealmPath]) {
    NSString *bundledRealmPath = [[NSBundle mainBundle] pathForResource: @"sgswiki" ofType: @"realm" inDirectory: @"db/"];
    [fm copyItemAtPath: bundledRealmPath toPath: expectedRealmPath error: &error];
  }
}

@end
