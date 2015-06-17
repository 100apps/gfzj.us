---
layout: post
title: "在interface builder中设置UIView的borderColor和背景图片"
date: 2015-06-17 21:59:01
category: tech
by: gf
description: IB的界面中有提供了「User Defined Runtime Attributes」可以设置很多属性，但是界面中key path的value类型有限，不能设置CGColor，通过扩展CALayer来实现设置UIView的borderColor和背景图片
---
如下效果：

![效果](/images/calayer-uicolor-demo.png)

头像有borderColor，而类型是`CGColorRef`，在IB中没有这个类型，所以无法设置，需要设置cell的背景，也无法直接设置。所以扩展了Calayer：

`CALayer+UIColor.h`
{%highlight objc%}
#import <QuartzCore/QuartzCore.h>
#import <UIKit/UIKit.h>
@interface CALayer (UIColor)
@property(nonatomic, assign) UIColor* borderUIColor;

//setting background for UIView 
@property(nonatomic, assign) UIColor* contentsUIImage;
@end
{%endhighlight%}

`CALayer+UIColor.m`

{%highlight objc%}

#import "CALayer+UIColor.h"

@implementation CALayer (UIColor)

- (void)setBorderUIColor:(UIColor*)color {
    self.borderColor = color.CGColor;
}

- (UIColor*)borderUIColor {
    return [UIColor colorWithCGColor:self.borderColor];
}

-(void)setContentsUIImage:(UIImage*)bgImage{
    self.contents=(__bridge id)(bgImage.CGImage);
}
-(UIImage*)contentsUIImage{
    return self.contents;
}
@end

{%endhighlight%}

这样只需要在IB中设置：

![设置背景图片](/images/calayer-cellview-bg.png)
![设置borderColor](/images/calayer-cellview-bc.png)

特别鸣谢：<http://stackoverflow.com/a/27986696/3825920>
