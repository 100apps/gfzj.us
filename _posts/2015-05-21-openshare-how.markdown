---
layout: post
title: "OpenShare实现(2): how"
date: 2015-05-21 11:08:26
categories: series openshare
by: gf
description: 介绍iOS app之间通信的GET/POST方法，以及openshare监控官方sdk参数传递的方法。
---

我们自己的app中集成的官方SDK需要和官方客户端通信，在iOS中，调起其他app，基本上都是用：

```objc
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"weixin:"]];//app中调起微信
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://www.baidu.com"]];//app中调起Safari，并打开百度首页
```

这就类似于http中的GET方法，我们可以在`AppDelegate.m`的`-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation`中接收这个url然后做相应的处理。比如url如果是`weixin://app/wx0fff8fc7685bb2c6/auth/?scope=snsapi_userinfo`，那么微信就知道其他app请求的是auth，scope是snsapi_userinfo，urlschema是wx0fff8fc7685bb2c6，这样微信处理以后，就可以通过打开`wx0fff8fc7685bb2c6://处理结果`来调起我们自己的app，我们自己的app同样处理url，就能得到返回结果了。

这里最重要的是`URLScheme`,可以在`Info.plist`中设置，比如：

```xml
<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLName</key>
			<string>weixin</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>wx0fff8fc7685bb2c6</string>
				<string>wxd930ea5d5a258f4f</string>
			</array>
		</dict>
	</array>
```
这样如果其他的应用程序(包括Safari中的html页面中的href)，都可以通过打开`wx0fff8fc7685bb2c6`或`wxd930ea5d5a258f4f`掉起我们的app，比如Safari中给的链接地址是：

```
wx0fff8fc7685bb2c6://view/pid123456
```
这样我们在

在js中。比如下面的代码`AppDelegate.m`的`-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation`中解析一下，就知道用户想查看pid123456的商品，展现这个就对了。

类似于HTTP中的GET，通过url传递的信息毕竟是有长度上限的，虽然Apple并没有文档指定最大长度，但是对于需要传递的内容比较长的情况（比如分享文件到微信），最好用类似于HTTP中的POST方法，iOS中常用的是系统粘贴板。

粘贴板好像是一个全局（操作系统全局）的map，每个app都可以去set和get。而且目前还没有发现最大限制（除了系统内存限制），所以是一个很好的传递数据的方法。这样我想起很久以前浏览器中两个Tab中的页面通信的黑科技，有人就用粘贴板实现了，一个页面set，另一个页面循环get。

知道了通信原理。下一步要做的就是监控SDK调用这些方法的时候，传递的参数的格式。如果我们也能生成同样的参数，然后发起请求，官方的客户端也不能区分到底用的是OpenShare呢还是官方SDK。狸猫换太子，达到同样的效果。

监控的思路就是hook关键方法。比如在js中，我们想要在alert的时候输出到console再alert，可以：

```js
var oldAlert=alert;
alert=function(msg){
  console.log(msg);
  oldAlert(msg);
}
```
这样，如果调用`alert("Hello World");`，就能输出到console再弹窗了。

同样在objc中，我们可以用runtime提供的API进行[Method Swizzling](http://nshipster.com/method-swizzling/)。

我们首先把各种官方提供的Demo运行一下，然后在appdelegate中对我们确定的几个方法进行Swizzling：

```objc
#import <objc/runtime.h>

//对UIApplication的openURL:方法进行hook
-(void)swizzleOpenUrl{
    SEL openUrlSEL=@selector(openURL:);
    BOOL (*openUrlIMP)(id,SEL,id) =(BOOL(*)(id,SEL,id))[UIApplication instanceMethodForSelector:openUrlSEL];
    static int count=0;
    BOOL (^myOpenURL)(id SELF,NSURL * url)=^(id SELF,NSURL *url){
        NSLog(@"\n----------open url: %d----------\n%@\n%@\n",count++,url,@"\n"/*[NSThread callStackSymbols]*/);
        
        return (BOOL)openUrlIMP(SELF,openUrlSEL,url);
    };
    class_replaceMethod([UIApplication class], openUrlSEL, imp_implementationWithBlock(myOpenURL), NULL);
}
//pasteboardWithName:create:方法进行hook，注意这是一个类方法
-(void)swizzlePasteboard{
    SEL pasteboardWithNameSEL=@selector(pasteboardWithName:create:);
    UIPasteboard* (*pasteboardWithNameIMP)(id,SEL,id,BOOL) =(UIPasteboard* (*)(id,SEL,id,BOOL))[UIPasteboard methodForSelector:pasteboardWithNameSEL];
    
    static int count=0;
    UIPasteboard* (^mypasteboardWithName)(id SELF,NSString *name,BOOL create)=^(id SELF,NSString *name,BOOL create){
        NSLog(@"\n----------pasteboardWithName: %d----------\n%@\n%d\n",count++,name,create);
        return (UIPasteboard*)pasteboardWithNameIMP(SELF,pasteboardWithNameSEL,name,create);
    };
    class_replaceMethod(/*类方法hook http://stackoverflow.com/a/3267898/3825920*/object_getClass((id)[UIPasteboard class]), pasteboardWithNameSEL, imp_implementationWithBlock(mypasteboardWithName), NULL);
}

//粘贴板setData:forPasteboardType:
-(void)swizzlePasteboardSetData{
    SEL swizzlePasteboardSetDataSEL=@selector(setData:forPasteboardType:);
    void (*swizzlePasteboardSetDataIMP)(id,SEL,id,id)=(void(*)(id,SEL,id,id))[UIPasteboard instanceMethodForSelector:swizzlePasteboardSetDataSEL];
    
    static int count=0;
    void (^mypasteboardSetData)(id SELF,NSData *data,NSString *type)=^(id SELF,NSData *data,NSString *type){
        
        NSLog(@"\n----------swizzlePasteboardSetData: %d----------\n%@\n%@\n%@\n",count++,[((UIPasteboard *)SELF) name], type,[NSPropertyListSerialization propertyListWithData:data options:0 format:0 error:nil]);
        swizzlePasteboardSetDataIMP(SELF,swizzlePasteboardSetDataSEL,data,type);
    };
    class_replaceMethod([UIPasteboard class], swizzlePasteboardSetDataSEL, imp_implementationWithBlock(mypasteboardSetData), NULL);
}

//粘贴板 dataForPasteboardType:
-(void)swizzlePasteboardGetData{
    SEL swizzlePasteboardGetDataSEL=@selector(dataForPasteboardType:);
    NSData* (*swizzlePasteboardGetDataIMP)(id,SEL,id)=(NSData*(*)(id,SEL,id))[UIPasteboard instanceMethodForSelector:swizzlePasteboardGetDataSEL];
    
    static int count=0;
    NSData* (^mypasteboardGetData)(id SELF,NSString *type)=^(id SELF,NSString *type){//
        NSData *ret=(NSData*)swizzlePasteboardGetDataIMP(SELF,swizzlePasteboardGetDataSEL,type);
        NSLog(@"\n----------pasteboardGetData: %d----------\n%@\n%@\n%@\n%@",count++,[((UIPasteboard *)SELF) name], type,ret,ret);
        return ret;
    };
    class_replaceMethod([UIPasteboard class], swizzlePasteboardGetDataSEL, imp_implementationWithBlock(mypasteboardGetData), NULL);
}
```

这样可以在`- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions`中调用一下`[self swizzle];`就可以监控了。

其中还遇到一些坑，比如研究Sina微博的时候，监控不到粘贴板数据，百思不得其解。于是用lldb添加断点：

```bash
    breakpoint set -r '\[UIPasteboard .*\]$'
    br l
```
这样就能把所有调用`UIPasteboard`的方法都打印出来了。原来Sina微博用的是`[UIPasteboard generalPasteboard].items`方法设置粘贴板。这个方法没有hook当然监控不到啦。

我们知道粘贴板传递的数据了，得到的是一个NSData类型，还需要猜测这个二进制NSData是如何生成和解码的。通过把NSData写入到文件，隐约看到bplist的身影，于是用node.js和`plutil`试一下：

```js
#!/usr/bin/env node

/*
pbpaste |./decodeBplist.js
从粘贴板读取数据。然后转换成xml
*/
var buffer = require('buffer');
var fs = require('fs');

var input = "";

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		input += chunk;
	}
});
process.stdin.on('end', function() {
	process.stdout.write(input);
	var fn = "/tmp/bp.plist";
	input = input.replace(/ |>|</g, "");
	input = new Buffer(input, "hex");
	fs.writeFile(fn, input);

	var exec = require('child_process').exec,
		child;

	child = exec('/usr/bin/plutil -convert xml1 ' + fn,
		function(error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			} else {
				console.log("\n\n" + fs.readFileSync(fn));
			}
		});

});
```
果然可以解析出来。最后经过尝试，目前只发现两种序列化方式：
	
```objc
NSData *output=[NSKeyedArchiver archivedDataWithRootObject:data];
NSDictionary *dic=[NSKeyedUnarchiver unarchiveObjectWithData:output;

NSData *output=[NSPropertyListSerialization dataWithPropertyList:data format:NSPropertyListBinaryFormat_v1_0 options:0 error:&err];
NSDictionary *dic=[NSPropertyListSerialization propertyListWithData:output];
```

这样就能解决app和客户端之间通信的问题了
