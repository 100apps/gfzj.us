---
layout: post
title: "iOS开发积累"
date: 2014-12-08 18:02:19
category: tech
img: /images/xcode512.png
by: gf
description: 积累一些iOS开发的经验，以备查阅。
---
#md5
objective-c计算`md5`的方法：

	- (NSString *) md5:(NSString *) input
	{
	    const char *cStr = [input UTF8String];
	    unsigned char digest[CC_MD5_DIGEST_LENGTH];
	    CC_MD5( cStr, strlen(cStr), digest );
	    NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
	    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
	        [output appendFormat:@"%02x", digest[i]];
	    return  output;
	}

#对应java的DES/CBC/PKCS5Padding加密算法

ios默认提供PKCS7Padding加密，但是 java时PKCS5Padding，所以需要fixkey，完整方法：

	-(NSString *)encrypt:(NSString*)input WithKey:(NSString *)key{
	    CCCryptorRef cryptor = NULL;
	    CCCryptorStatus status = kCCSuccess;
	    
	    NSMutableData *keyData = [[key dataUsingEncoding: NSUTF8StringEncoding] mutableCopy];
	    NSMutableData *ivData = [[key dataUsingEncoding: NSUTF8StringEncoding] mutableCopy];
	    NSData *inputData=[input dataUsingEncoding:NSUTF8StringEncoding];
	    [keyData setLength: 8];//非常重要！！！iOS默认API是PKCS7Padding，而java是PKCS5Padding
	    
	    status = CCCryptorCreate( kCCEncrypt, kCCAlgorithmDES, kCCOptionPKCS7Padding,
	                             [keyData bytes], [keyData length], [ivData bytes],
	                             &cryptor );
	    
	    size_t bufsize = CCCryptorGetOutputLength( cryptor, (size_t)[inputData length], true );
	    void * buf = malloc( bufsize );
	    size_t bufused = 0;
	    size_t bytesTotal = 0;
	    status = CCCryptorUpdate( cryptor, [inputData bytes], (size_t)[inputData length],
	                             buf, bufsize, &bufused );
	    bytesTotal += bufused;
	    status = CCCryptorFinal( cryptor, buf + bufused, bufsize - bufused, &bufused );
	    bytesTotal += bufused;
	    NSData *outputData=[NSData dataWithBytesNoCopy: buf length: bytesTotal] ;
	    
	    //NSData 转换成16进制字符串
	    const unsigned char *dataBuffer = (const unsigned char *)[outputData bytes];
	    NSUInteger          dataLength  = [outputData length];
	    NSMutableString     *hexString  = [NSMutableString stringWithCapacity:(dataLength * 2)];
	    for (int i = 0; i < dataLength; ++i)
	        [hexString appendString:[NSString stringWithFormat:@"%02lx", (unsigned long)dataBuffer[i]]];
	    
	    return [NSString stringWithString:hexString];
	}

#不响应屏幕旋转
{%highlight objc%}
/*ipad 不旋转。*/
- (BOOL)shouldAutorotate {
    return NO;
}
{%endhighlight%}
