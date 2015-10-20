//
//  ExifContainer.h
//  Pods
//
//  Created by Nikita Tuk on 02/02/15.
//
//

#import <Foundation/Foundation.h>

@class CLLocation;

@interface ExifContainer : NSObject

- (void)addLocation:(CLLocation *)currentLocation;
- (void)addUserComment:(NSString*)comment;
- (void)addCreationDate:(NSDate *)date;
- (void)addDescription:(NSString*)description;
- (void)setExifData:(NSMutableDictionary *) dic;
- (void)setTIFFData:(NSMutableDictionary *) dic;

- (NSDictionary *)exifData;
@end
