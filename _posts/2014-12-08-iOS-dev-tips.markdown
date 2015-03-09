---
layout: post
title: "iOS开发积累"
date: 2014-12-08 18:02:19
category: tech
img: /images/xcode512.png
by: gf
description: 积累一些iOS开发的经验，以备查阅。
---
推荐其他链接：

- <http://www.jianshu.com/p/08f194e9904c>
- <http://www.jianshu.com/p/50b63a221f09>

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

#键盘问题
首先是点击其他地方，键盘隐藏

{%highlight objc%}
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    [self.view endEditing:YES];
}
{%endhighlight%}

键盘uiwebview样式，可以上一个／下一个，不隐藏uitextfield。用<https://github.com/hackiftekhar/IQKeyboardManager>，只需要pod install，什么也不需要做。

#更精确的sizeclass
sizeclass的屏幕区分粒度还是不大，比如，如果想区分iPhone4和iPhone5屏幕，直接用sizeclass就很困难。这时候可以用：
![xcode constaints也能connect](http://i.stack.imgur.com/BUwMv.gif)
{%highlight objc%}
- (void)updateViewConstraints {
    [super updateViewConstraints];
    if ([UIScreen mainScreen].bounds.size.height<=480) {
        self.bgConstraint.constant=100;
    }
}
{%endhighlight%}

#自定义字体不加载
要加载自定义字体，除了要在Info.plist里面加入：
{%highlight xml%}
<key>UIAppFonts</key>
	<array>
		<string>xidi.ttf</string>
	</array>
{%endhighlight%}

还需要在`Build Phases`->`Copy Bundle Resources`里面添加该字体。然后遍历字体名称：
{%highlight objc%}

  for (NSString* family in [UIFont familyNames])
    {
        NSLog(@"%@", family);
        for (NSString* name in [UIFont fontNamesForFamilyName: family])
        {
            NSLog(@"  %@", name);
        }
    }
{%endhighlight%}

#xcode在异常处中断
cmd＋7，新建（＋）breakpoint

#SDWebImage修改全局useragent
所有的image都是在SDWebImageDownloader里面下载的，修改`downloadImageWithURL`方法里面的NSMutableURLRequest即可
首先添加两个属性：

{%highlight objc%}
//by logan useragent
@property NSString *currentDate;
@property NSString *userAgent;
//然后
 //131 行 ，by logan override useragent;
        NSDateFormatter *formatter = [NSDateFormatter new];
        formatter.dateFormat=@"yyyy-MM-dd";
        NSString *theDate= [formatter stringFromDate:[NSDate new]];
        if (![theDate isEqualToString:wself.currentDate ]) {
            wself.currentDate=theDate;
            const char *cStr = [theDate UTF8String];
            unsigned char digest[CC_MD5_DIGEST_LENGTH];
            CC_MD5( cStr, (unsigned int)strlen(cStr), digest );
            NSMutableString *output = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
            for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
                [output appendFormat:@"%02x", digest[i]];
            wself.userAgent=[@"XidiApp/iOS " stringByAppendingString:output];
        }
        [request setValue:wself.userAgent forHTTPHeaderField:@"User-Agent"];
{%endhighlight%}

#uiwebview开启远程调试
只能在模拟器中使用，就像firebug一样。我们可以通过mac上的Safari调试uiwebview中的html和js。需要在appdelegate中的`didFinishLaunchingWithOptions`中加入：

{%highlight objc%}
#if (TARGET_IPHONE_SIMULATOR)
    [NSClassFromString(@"WebView") performSelector:@selector(_enableRemoteInspector)];
#endif
{%endhighlight%}

然后启动mac上的Safari，偏好设置－>高级－>在菜单中显示“开发”菜单。进入 开发－>iOS simulator即可

#Reveal再来30天
~/Library/Preferences/com.ittybittyapps.Reveal.plist 删除了就能再用 30 天。

#UIScrollView滚动完成回调
自动触发scroll，比如使用scrollRectToVisible或者setContentOffset，回调`scrollViewDidEndScrollingAnimation`；手动拖拽出发`scrollViewDidEndDecelerating`

#给uiview添加MotionEffect
就像在Home页的壁纸，随着手机角度移动，壁纸会动。
{%highlight objc%}
UIInterpolatingMotionEffect * xEffect = [[UIInterpolatingMotionEffect alloc] initWithKeyPath:@"center.x" type:UIInterpolatingMotionEffectTypeTiltAlongHorizontalAxis];
xEffect.minimumRelativeValue =  [NSNumber numberWithFloat:-40.0];
xEffect.maximumRelativeValue = [NSNumber numberWithFloat:40.0];
[img addMotionEffect:xEffect];
{%endhighlight%}
![UIview可以add的其他东西](/images/viewadd.png)

#OC的getter和setter方法命名
默认情况下，属性的getter方法用属性名，而不是getXxx。比如：
{%highlight objc%}
[[UILabel new]font];
[[UILabel new]setFont:nil]
{%endhighlight%}
在Cocoa中，一般用getXxx的参数表示返回值存放的位置。比如`NSData`中的：
{%highlight objc%}
- (void)getBytes:(void *)buffer/*指针*/;
{%endhighlight%}
这是命名惯例，希望遵守

#获取正在运行的程序
{%highlight objc%}
#import <sys/sysctl.h>


- (NSArray *)runningProcesses {
    
    int mib[4] = {CTL_KERN, KERN_PROC, KERN_PROC_ALL, 0};
    size_t miblen = 4;
    
    size_t size;
    int st = sysctl(mib, miblen, NULL, &size, NULL, 0);
    
    struct kinfo_proc * process = NULL;
    struct kinfo_proc * newprocess = NULL;
    
    do {
        
        size += size / 10;
        newprocess = realloc(process, size);
        
        if (!newprocess){
            
            if (process){
                free(process);
            }
            
            return nil;
        }
        
        process = newprocess;
        st = sysctl(mib, miblen, process, &size, NULL, 0);
        
    } while (st == -1 && errno == ENOMEM);
    
    if (st == 0){
        
        if (size % sizeof(struct kinfo_proc) == 0){
            int nprocess = size / sizeof(struct kinfo_proc);
            
            if (nprocess){
                
                NSMutableArray * array = [[NSMutableArray alloc] init];
                
                for (int i = nprocess - 1; i >= 0; i--){
                    
                    NSString * processID = [[NSString alloc] initWithFormat:@"%d", process[i].kp_proc.p_pid];
                    NSString * processName = [[NSString alloc] initWithFormat:@"%s", process[i].kp_proc.p_comm];
                    
                    NSDictionary * dict = [[NSDictionary alloc] initWithObjects:[NSArray arrayWithObjects:processID, processName, nil]
                                                                        forKeys:[NSArray arrayWithObjects:@"ProcessID", @"ProcessName", nil]];
                   
                    [array addObject:dict];
                }
                
                free(process);
                return array;
            }
        }
    }
    
    return nil;
}

 NSArray * processes = [self runningProcesses];
    for (NSDictionary * dict in processes){
        NSLog(@"%@ - %@", [dict objectForKey:@"ProcessID"], [dict objectForKey:@"ProcessName"]);
    }
{%endhighlight%}

#获取所有已经安装的app
{%highlight objc%}
#include <objc/runtime.h>

Class LSApplicationWorkspace_class = objc_getClass("LSApplicationWorkspace");
NSObject* workspace = [LSApplicationWorkspace_class performSelector:@selector(defaultWorkspace)];
NSLog(@"apps: %@", [workspace performSelector:@selector(allApplications)]);
{%endhighlight%}

#UIAlertView 在springboard弹出
使用 `CFUserNotificationCreate()`和 `CFUserNotificationReceiveResponse()`

#UItableview刷新cell高度
{%highlight objc%}
 [self.tableView reloadRowsAtIndexPaths:[NSArray arrayWithObject:[NSIndexPath indexPathForRow:textField.tag+1 inSection:0]] withRowAnimation:UITableViewRowAnimationFade];
{%endhighlight%}