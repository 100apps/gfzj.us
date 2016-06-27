---
layout: post
title: "Custom iOS AlertView"
date: 2015-06-09 10:56:53
categories: series 读源代码学习iOS开发
img: https://github.com/wimagguc/ios-custom-alertview/raw/master/Docs/screen.png
by: gf
description: Custom iOS AlertView  源码分析
---
[Custom iOS AlertView](https://github.com/wimagguc/ios-custom-alertview) 是一个不错的控件，比较小，可以很方便的集成到自己的项目中。

![Custom iOS AlertView Demo gif](https://github.com/wimagguc/ios-custom-alertview/raw/master/Docs/screen.png)

# #使用：

{%highlight objc%}
// Here we need to pass a full frame
CustomIOSAlertView *alertView = [[CustomIOSAlertView alloc] init];

// Add some custom content to the alert view
[alertView setContainerView:  [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"demo"]] ];

// Modify the parameters
[alertView setButtonTitles:[NSMutableArray arrayWithObjects:@"Close1", @"Close2", @"Close3", nil]];
[alertView setDelegate:self];

// You may use a Block, rather than a delegate.
[alertView setOnButtonTouchUpInside:^(CustomIOSAlertView *alertView, int buttonIndex) {
NSLog(@"Block: Button at position %d is clicked on alertView %d.", buttonIndex, (int)[alertView tag]);
[alertView close];
}];

[alertView setUseMotionEffects:true];

// And launch the dialog
[alertView show];
{%endhighlight%}

# #按钮点击回调的实现

和普通的AlertView差不多。`CustomIOSAlertView`通过两个特殊的`property`实现：

{%highlight objc%}
@property (nonatomic, assign) id<CustomIOSAlertViewDelegate> delegate;
//注意这里的id<CustomIOSAlertViewDelegate> 
@property (copy) void (^onButtonTouchUpInside)(CustomIOSAlertView *alertView, int buttonIndex) ;
//注意这里是个block当property
{%endhighlight%}

这样，既可以通过delegate回调按钮点击事件，又能用block回调了。

# #屏幕旋转和键盘推出事件

{%highlight objc%}
[[UIDevice currentDevice] beginGeneratingDeviceOrientationNotifications];

[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(deviceOrientationDidChange:) name:UIDeviceOrientationDidChangeNotification object:nil];
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillShow:) name:UIKeyboardWillShowNotification object:nil];
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardWillHide:) name:UIKeyboardWillHideNotification object:nil];
{%endhighlight%}

# #MotionEffects
`MotionEffects`是iOS7以后对view添加的一种随着设备水平移动而移动的效果。iOS7+的springboard就用这种效果。

{%highlight objc%}
if (floor(NSFoundationVersionNumber) <= NSFoundationVersionNumber_iOS_6_1) {
return;
}

UIInterpolatingMotionEffect *horizontalEffect = [[UIInterpolatingMotionEffect alloc] initWithKeyPath:@"center.x"
type:UIInterpolatingMotionEffectTypeTiltAlongHorizontalAxis];
horizontalEffect.minimumRelativeValue = @(-kCustomIOS7MotionEffectExtent);
horizontalEffect.maximumRelativeValue = @( kCustomIOS7MotionEffectExtent);

UIInterpolatingMotionEffect *verticalEffect = [[UIInterpolatingMotionEffect alloc] initWithKeyPath:@"center.y"
type:UIInterpolatingMotionEffectTypeTiltAlongVerticalAxis];
verticalEffect.minimumRelativeValue = @(-kCustomIOS7MotionEffectExtent);
verticalEffect.maximumRelativeValue = @( kCustomIOS7MotionEffectExtent);

UIMotionEffectGroup *motionEffectGroup = [[UIMotionEffectGroup alloc] init];
motionEffectGroup.motionEffects = @[horizontalEffect, verticalEffect];

[dialogView addMotionEffect:motionEffectGroup];
{%endhighlight%}
