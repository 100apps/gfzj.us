---
layout: post
title: "MBProgressHUD源码分析"
date: 2015-07-13 09:44:37
categories: series 读源代码学习iOS开发
by: gf
description: 分析学习MBProgressHUD的源代码
---

[MBProgressHUD](https://github.com/jdg/MBProgressHUD)是一个非常常用的iOS库，用于显示提示文字。作者实现得也非常精简，只有两个文件`MBProgressHUD.m`和`MBProgressHUD.h`，再不用cocoapods的情况下，也非常容易集成到自己的项目。

#兼容性处理

首先因为`MBProgressHUD`支持ARC和非ARC，所以用了几个宏：

{%highlight objc%}
#if __has_feature(objc_arc)
	#define MB_AUTORELEASE(exp) exp
	#define MB_RELEASE(exp) exp
	#define MB_RETAIN(exp) exp
#else
	#define MB_AUTORELEASE(exp) [exp autorelease]
	#define MB_RELEASE(exp) [exp release]
	#define MB_RETAIN(exp) [exp retain]
#endif
{%endhighlight%}

另外，为了兼容iOS老版本的API，用到了：

{%highlight objc%}

#if __IPHONE_OS_VERSION_MIN_REQUIRED >= 60000
    #define MBLabelAlignmentCenter NSTextAlignmentCenter
#else
    #define MBLabelAlignmentCenter UITextAlignmentCenter
#endif

#if __IPHONE_OS_VERSION_MIN_REQUIRED >= 70000
	#define MB_TEXTSIZE(text, font) [text length] > 0 ? [text \
		sizeWithAttributes:@{NSFontAttributeName:font}] : CGSizeZero;
#else
	#define MB_TEXTSIZE(text, font) [text length] > 0 ? [text sizeWithFont:font] : CGSizeZero;
#endif
{%endhighlight%}
这样就可以：

{%highlight objc%}
	label.textAlignment = MBLabelAlignmentCenter;//设置居中。
{%endhighlight%}
这是一种不错的方法。比如以前我在[OpenShare中遇到的 containsString的问题](https://github.com/100apps/openshare/pull/6)：

{%highlight objc%}
[url.absoluteString containsString:@"//safepay/"]//iOS8的API
[url.absoluteString rangeOfString:@"//safepay/"].location != NSNotFound//iOS7的API
{%endhighlight%}
这样我们也可以用宏，在NSString(Custom)中扩展containsString，来保持API一致。

#在drawRect中画UI，通过kvo更新
比如`MBBarProgressView:UIView`整个UI是通过`- (void)drawRect:(CGRect)rect`中的`CGContextFillPath`类似方法画出来的。进度通过`@property (nonatomic, assign) float progres`来设置。而在drawRect中通过progres来控制画出来的样子。如果只有一个progres参数控制，我们可以在setter中：

{%highlight objc%}
-(void)setProgres:(float)prog{
	_progress.prog;
	[self setNeedsDisplay];//更新UI
}
{%endhighlight%}
但是如果，我们是通过很多属性来控制的，一个个的在setter里面「hook」就不方便了。这时候我们可以用KVO：

{%highlight objc%}

- (void)registerForKVO {
	for (NSString *keyPath in [self observableKeypaths]) {
		[self addObserver:self forKeyPath:keyPath options:NSKeyValueObservingOptionNew context:NULL];
	}
}

- (void)unregisterFromKVO {
	for (NSString *keyPath in [self observableKeypaths]) {
		[self removeObserver:self forKeyPath:keyPath];
	}
}

- (NSArray *)observableKeypaths {
	return [NSArray arrayWithObjects:@"mode", @"customView", @"labelText", @"labelFont", @"labelColor",
			@"detailsLabelText", @"detailsLabelFont", @"detailsLabelColor", @"progress", @"activityIndicatorColor", nil];
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context {
	if (![NSThread isMainThread]) {
		[self performSelectorOnMainThread:@selector(updateUIForKeypath:) withObject:keyPath waitUntilDone:NO];
	} else {
		[self updateUIForKeypath:keyPath];
	}
}

- (void)updateUIForKeypath:(NSString *)keyPath {
//setter hook中的设置
	if ([keyPath isEqualToString:@"mode"] || [keyPath isEqualToString:@"customView"] ||
		[keyPath isEqualToString:@"activityIndicatorColor"]) {
		[self updateIndicators];
	} else if ([keyPath isEqualToString:@"labelText"]) {
		label.text = self.labelText;
	} else if ([keyPath isEqualToString:@"labelFont"]) {
		label.font = self.labelFont;
	} else if ([keyPath isEqualToString:@"labelColor"]) {
		label.textColor = self.labelColor;
	} else if ([keyPath isEqualToString:@"detailsLabelText"]) {
		detailsLabel.text = self.detailsLabelText;
	} else if ([keyPath isEqualToString:@"detailsLabelFont"]) {
		detailsLabel.font = self.detailsLabelFont;
	} else if ([keyPath isEqualToString:@"detailsLabelColor"]) {
		detailsLabel.textColor = self.detailsLabelColor;
	} else if ([keyPath isEqualToString:@"progress"]) {
		if ([indicator respondsToSelector:@selector(setProgress:)]) {
			[(id)indicator setValue:@(progress) forKey:@"progress"];
		}
		return;
	}
	[self setNeedsLayout];
	[self setNeedsDisplay];//更新UI
}
{%endhighlight%}
这样hook setter方法，更方便。在`MBProgressHUD.m`中`MBProgressHUD : UIView`、`MBRoundProgressView : UIView `、`MBBarProgressView : UIView`中更新UI全是用的KVO的方法。

#屏幕旋转
因为drawRect的时候已经考虑到宽度和高度了，所以屏幕旋转之后，只需要`[self setNeedsDisplay]`即可。

{%highlight objc%}

- (void)registerForNotifications {
	NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];

	[nc addObserver:self selector:@selector(statusBarOrientationDidChange:)
			   name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
}

- (void)unregisterFromNotifications {
	NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
	[nc removeObserver:self name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
}

- (void)statusBarOrientationDidChange:(NSNotification *)notification {
	UIView *superview = self.superview;
	if (!superview) {
		return;
	} else {
		[self updateForCurrentOrientationAnimated:YES];
	}
}

- (void)updateForCurrentOrientationAnimated:(BOOL)animated {
    // Stay in sync with the superview in any case
    if (self.superview) {
        self.bounds = self.superview.bounds;
        [self setNeedsDisplay];
    }
//iOS8之前只有window的第一个view能获得到roate事件，否则需要自己实现：
//via http://stackoverflow.com/questions/14704273/uiview-added-on-top-of-window-does-not-rotate-on-ios

    // Not needed on iOS 8+, compile out when the deployment target allows,
    // to avoid sharedApplication problems on extension targets
#if __IPHONE_OS_VERSION_MIN_REQUIRED < 80000
    // Only needed pre iOS 7 when added to a window
    BOOL iOS8OrLater = kCFCoreFoundationVersionNumber >= kCFCoreFoundationVersionNumber_iOS_8_0;
    if (iOS8OrLater || ![self.superview isKindOfClass:[UIWindow class]]) return;

	UIInterfaceOrientation orientation = [UIApplication sharedApplication].statusBarOrientation;
	CGFloat radians = 0;
	if (UIInterfaceOrientationIsLandscape(orientation)) {
		if (orientation == UIInterfaceOrientationLandscapeLeft) { radians = -(CGFloat)M_PI_2; } 
		else { radians = (CGFloat)M_PI_2; }
		// Window coordinates differ!
		self.bounds = CGRectMake(0, 0, self.bounds.size.height, self.bounds.size.width);
	} else {
		if (orientation == UIInterfaceOrientationPortraitUpsideDown) { radians = (CGFloat)M_PI; } 
		else { radians = 0; }
	}
	rotationTransform = CGAffineTransformMakeRotation(radians);
	
	if (animated) {
		[UIView beginAnimations:nil context:nil];
		[UIView setAnimationDuration:0.3];
	}
	[self setTransform:rotationTransform];
	if (animated) {
		[UIView commitAnimations];
	}
#endif
}
{%endhighlight%}

#执行block的时候显示

{%highlight objc%}
- (IBAction)showUsingBlocks:(id)sender {
#if NS_BLOCKS_AVAILABLE
	MBProgressHUD *hud = [[MBProgressHUD alloc] initWithView:self.navigationController.view];
	[self.navigationController.view addSubview:hud];
	hud.labelText = @"With a block";
	
	[hud showAnimated:YES whileExecutingBlock:^{
		[self myTask];
	} completionBlock:^{
		[hud removeFromSuperview];
		[hud release];
	}];
#endif
}
- (IBAction)showOnWindow:(id)sender {
	// The hud will dispable all input on the window
	HUD = [[MBProgressHUD alloc] initWithView:self.view.window];
	[self.view.window addSubview:HUD];
	
	HUD.delegate = self;
	HUD.labelText = @"Loading";
	
	[HUD showWhileExecuting:@selector(myTask) onTarget:self withObject:nil animated:YES];
}
{%endhighlight%}
这个方法是非常有用的，可以直接省略hide和show的调用。而且逻辑也清晰。对于网络请求，我们也可以用这种思路，封装一下。

{%highlight objc%}
- (void)showAnimated:(BOOL)animated whileExecutingBlock:(dispatch_block_t)block onQueue:(dispatch_queue_t)queue
	 completionBlock:(MBProgressHUDCompletionBlock)completion {
	self.taskInProgress = YES;
	self.completionBlock = completion;
	dispatch_async(queue, ^(void) {
		block();
		dispatch_async(dispatch_get_main_queue(), ^(void) {
			[self cleanUp];
		});
	});
	[self show:animated];
}

- (void)showWhileExecuting:(SEL)method onTarget:(id)target withObject:(id)object animated:(BOOL)animated {
	methodForExecution = method;
	targetForExecution = MB_RETAIN(target);
	objectForExecution = MB_RETAIN(object);	
	// Launch execution in new thread
	self.taskInProgress = YES;
	[NSThread detachNewThreadSelector:@selector(launchExecution) toTarget:self withObject:nil];
	// Show HUD view
	[self show:animated];
}
{%endhighlight%}
不得不说，把block当参数，程序设计方便很多。

#MBProgressHUD使用
为了方便，MBProgressHUD提供了两类API：
1. 类方法
2. 实例是方法

类方法hide的时候，会找出所有MBProgressHUD，然后hide。`+ (NSUInteger)hideAllHUDsForView:(UIView *)view animated:(BOOL)animated `

