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

#应用闪退
打开应用后，直接闪退，肯定是App crash了，并且不出现在UI上，一般可以检查`AppDelegate`里面的方法调用，比如网络异常等，如果没有try－catch都有可能导致App直接崩溃。

#Xcode调试中失去连接
xcode启动程序以后，断开连接，这是证书原因。debug 的时候不能用distribute证书。另外，如果有today extension之类的，这是一个新的target，需要单独设置证书：

![xcode设置target](/images/xcode-targets-cer.png)

#自动转换类型的问题
比如下面的代码：

{%highlight objc%}
#import <Foundation/Foundation.h>
int main(int argc,const char *argv[]){
	NSArray *items = @[@1, @2, @3];
	for (int i = -1; i < items.count; i++) {
	    NSLog(@"%d", i);
	}
}
{%endhighlight%}

编译运行`gcc -ObjC -framework Foundation test.m && ./a.out`我们发现，什么也没有输出。这是因为，在for循环中，items.count是`NSUInteger（typedef unsigned long NSUInteger）`类型的，－1被强制转换，变成一个很大的数。

#iOS7 企业账号发布应用出现两个图标

![两个图标](/images/ios-adhoc-double-icon.png)

这个问题出在plist上，google了一番，有的说是bundle id不一致导致的，但是亲测，bundle id即使一致，也存在这个问题。最后发现是`metadata`的`title`的问题，我这个和com.xidibuy.`moa`中的`moa`一致。会出现两个图标，

其中一个`正在安装`的图标是删不掉的。发布一个新应用（xcode新建一个）bundle id设置成和原来的一样。然后adhoc发布，安装。这时候不论是否安装成功，都会覆盖掉原来的，这样就能删除了。

#xcode6 新建的应用在iOS7下出现上下黑边
因为xcode6种启动屏改成了`LaunchScreen.xib`，所以就没有了`Default-568h@2x.png`,这样在iOS7下，系统就认为不支持iPhone5的分辨率，所以按iPhone4的分辨率启动了，产生黑边。
