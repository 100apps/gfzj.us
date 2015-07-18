---
layout: post
title: "PureLayout源代码分析"
date: 2015-07-18 15:09:48
categories: series 读源代码学习iOS开发
img: /images/xcode512.png
by: gf
description: PureLayout源码分析，更好地理解autolayout。
---
[PureLayout](https://github.com/smileyborg/PureLayout)是一个不错的autolayout工具，直接写NSLayoutConstraint，无非只有两个API：

1. [NSLayoutConstraint constraintWithItem:<#(id)#> attribute:<#(NSLayoutAttribute)#> relatedBy:<#(NSLayoutRelation)#> toItem:<#(id)#> attribute:<#(NSLayoutAttribute)#> multiplier:<#(CGFloat)#> constant:<#(CGFloat)#>]
2. [NSLayoutConstraint constraintsWithVisualFormat:<#(NSString *)#> options:<#(NSLayoutFormatOptions)#> metrics:<#(NSDictionary *)#> views:<#(NSDictionary *)#>]

尽管Apple已经很努力的发明了[Visual Format Language](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/VisualFormatLanguage/VisualFormatLanguage.html)，但是使用还是不是很方便（或许是因为我写的VFL太少了），所以辅助工具应运而生。目前比较出名的有两个：

1. [Masonry](https://github.com/SnapKit/Masonry)
2. [PureLayout](https://github.com/smileyborg/PureLayout)

我下载了Masonry感觉比PureLayout略显复杂（文件多）。我个人倾向于简单的东西，所以先看了一下PureLayout的源代码。

PureLayout主要对`ALView`(UIView for iOS/NSView for mac)、`NSArray`(可以是ALView或者NSLayoutConstraint)、`NSLayoutConstraint`进行扩展，核心是把自己的语法翻译成NSLayoutConstraint，然后addConstraint。除了翻译语法以外，还提供了autoInstall功能(声称Constraints当时可以不active)，并且还可以设置Priority（避免冲突）和Identifier（方便调试）。

###翻译语法

Masonry的Layout设置确实非常方便：

对单个View：


{%highlight objc%}
+ autoCreateConstraintsWithoutInstalling://(在block中)创建非active的Constraints，可以通过autoInstallConstraints／autoRemoveConstraints来toggle
+ autoSetPriority:forConstraints://(在block中)创建带有Priority的Constraints
+ autoSetIdentifier:forConstraints: // iOS 7.0+, OS X 10.9+ only(在block中)创建带有Identifier的Constraints
- autoCenterInSuperview://居中
- autoAlignAxisToSuperviewAxis://水平、垂直居中
- autoCenterInSuperviewMargins: // iOS 8.0+ only
- autoAlignAxisToSuperviewMarginAxis: // iOS 8.0+ only
- autoPinEdgeToSuperviewEdge:(withInset:)//某条边距离superview的距离(已经自动修正下、右、Trailing负数问题，同css margin-left)
- autoPinEdgesToSuperviewEdgesWithInsets:(excludingEdge:)//除了某条边意外margin
- autoPinEdgeToSuperviewMargin: // iOS 8.0+ only
- autoPinEdgesToSuperviewMargins(ExcludingEdge:) // iOS 8.0+ only
- autoPinEdge:toEdge:ofView:(withOffset:)//两个View的变的距离
- autoAlignAxis:toSameAxisOfView:(withOffset:|withMultiplier:)//和某个view水平、垂直对齐
- autoMatchDimension:toDimension:ofView:(withOffset:|withMultiplier:)//和某个view的长/宽 关系
- autoSetDimension(s)ToSize://固定长x宽
- autoConstrainAttribute:toAttribute:ofView:(withOffset:|withMultiplier:)//
- autoPinTo(Top|Bottom)LayoutGuideOfViewController:withInset: // iOS only//到上下LayoutGuide的距离
{%endhighlight%}


API大体分三类：设置长／宽(可以是具体数值或者相对于其他view)；设置到父View的距离(同css margin)；设置某条边到其他view的某条边的距离。

对于多个View(NSArray<UIView>):

{%highlight objc%}
- autoAlignViewsToEdge://类似于PS中的涂层对其按钮。某条边对其
- autoAlignViewsToAxis://水平、垂直对其
- autoMatchViewsDimension://设置等宽／等高
- autoSetViewsDimension:toSize://某条边的大小
- autoSetViewsDimensionsToSize://按照给定的size设置宽和高
- autoDistributeViewsAlongAxis:alignedTo:withFixedSpacing:(insetSpacing:)(matchedSizes:)//在水平(垂直)方向按照给定的间距、大小设置
- autoDistributeViewsAlongAxis:alignedTo:withFixedSize:(insetSpacing:)
{%endhighlight%}

对于`Constraint`，提供了autoInstall/Remove的API来应用(取消)这个(些)Constraint

###如何实现autoInstall/Remove
上面的API，比如

{%highlight objc%}
[aView autoCenterInSuperview];//居中显示
{%endhighlight%}
可以直接添加约束，也可以生成一个约束但是不添加，通过：

{%highlight objc%}
NSArray *constraints = [UIView autoCreateConstraintsWithoutInstalling:^{
	[aView autoCenterInSuperview];
}];
//这样并没有应用这个约束，可以这样应用：
[constraints autoInstallConstraints];
{%endhighlight%}

另外`Priority`和`Identifier`也可以这样设置。实现的秘密在于：

{%highlight objc%}
+ (NSArray *)autoCreateConstraintsWithoutInstalling:(ALConstraintsBlock)block
{
    NSAssert(block, @"The constraints block cannot be nil.");
    NSArray *createdConstraints = nil;
    if (block) {
        [[self al_arraysOfCreatedConstraints] addObject:[NSMutableArray new]];//添加了一个元素，所以al_preventAutomaticConstraintInstallation返回YES
        block();//执行添加Constraints的方法，但是由于已经设置了al_preventAutomaticConstraintInstallation，所以并没有这的添加到view上
        createdConstraints = [self al_currentArrayOfCreatedConstraints];//把Constraints返回
        [[self al_arraysOfCreatedConstraints] removeLastObject];//删除最后一个元素，清除标志位
    }
    return createdConstraints;
}

//添加Constraint的方法
- (void)al_addConstraint:(NSLayoutConstraint *)constraint
{
   
    [ALView al_applyGlobalStateToConstraint:constraint];//应用Priority和Identifier
    if ([ALView al_preventAutomaticConstraintInstallation]) {//al_currentArrayOfCreatedConstraints长度大于1，
        [[ALView al_currentArrayOfCreatedConstraints] addObject:constraint];//放到al_currentArrayOfCreatedConstraints中，不添加。
    } else {
        [self addConstraint:constraint];//直接添加
    }
}

+ (void)al_applyGlobalStateToConstraint:(NSLayoutConstraint *)constraint
{
    if ([ALView al_isExecutingPriorityConstraintsBlock]) {//是否应用priority
        constraint.priority = [ALView al_currentGlobalConstraintPriority];
    }
#if __PureLayout_MinBaseSDK_iOS_8_0
    NSString *globalConstraintIdentifier = [ALView al_currentGlobalConstraintIdentifier];
    if (globalConstraintIdentifier) {//是否应用Identifier
        [constraint autoIdentify:globalConstraintIdentifier];
    }
#endif /* __PureLayout_MinBaseSDK_iOS_8_0 */
}
{%endhighlight%}

###API内部／外部调用的方法
PureLayout有一个`PureLayout+Internal.h`文件。这个文件都在`.m`中引入，所以对于我们自己的项目只引入了`PureLayout.h`，是不会有Internal中的方法的。实现了类似于private的功能。

###改进
使用过程中，对于UIView的初始化，可以用：

{%highlight objc%}
[UIView newAutoLayoutView];
[[UIView alloc]initForAutoLayout];
{%endhighlight%}
但是对于`UIButton`呢？只能是：
{%highlight objc%}
UIButton *btn=[UIButton buttonWithType:UIButtonTypeInfoDark];
btn.translatesAutoresizingMaskIntoConstraints=NO;
{%endhighlight%}
所以我修改了`initForAutoLayout`方法，可以用：

{%highlight objc%}
[[UIButton buttonWithType:UIButtonTypeInfoDark]initForAutoLayout]
{%endhighlight%}
已经向作者提交了一个[Pull requests](https://github.com/smileyborg/PureLayout/pull/75)，不知道能否通过。

###一个例子
使用UIScrollView，可以尝试一下，当屏幕旋转的时候，autolayout的威力就显示出来了。
{%highlight objc%}

#import "ALiOSDemo11ViewController.h"
#import <PureLayout/PureLayout.h>


@interface ALiOSDemo11ViewController ()
@property UIScrollView *sv;
@property UIImageView *avatar;
@property UILabel *userName;
@property UILabel *time;
@property UILabel *mainImage;
@property UILabel *vote;
@property UIButton *voteBtn;
@property UIButton *commentBtn;
@property UIButton *actionBtn;
@property NSLayoutConstraint *svHeight;
@property UIView *wrapper;
@end

@interface UIView (XDView)
-(void) addSubviews:(UIView *)view,...;
@end

@implementation UIView (XDView)

-(void) addSubviews:(UIView *)view, ...{//注意调用的时候，以nil结尾，否则引用出去了。
    va_list args;
    va_start(args, view);
    [self addSubview:view];
    
    UIView * v;
    while ((v = va_arg(args, UIView *))) {
        [self addSubview:v];
    }
    va_end(args);
}

@end


@implementation ALiOSDemo11ViewController
@synthesize sv,avatar,userName,time,mainImage,vote,voteBtn,commentBtn,actionBtn,wrapper,svHeight;

-(void)loadView{
    [super loadView];
    [self.view addSubview:sv=[UIScrollView newAutoLayoutView]];
    [sv addSubviews:avatar=[UIImageView newAutoLayoutView],userName=[UILabel newAutoLayoutView],time=[UILabel newAutoLayoutView],mainImage=[UILabel newAutoLayoutView],vote=[UILabel newAutoLayoutView],voteBtn=[UIButton newAutoLayoutView],commentBtn=[UIButton newAutoLayoutView],actionBtn=[UIButton newAutoLayoutView],nil];
    
    //with color
    self.view.backgroundColor=[UIColor blueColor];
    sv.backgroundColor=[UIColor yellowColor];
    avatar.backgroundColor=[UIColor redColor];
    mainImage.backgroundColor=[UIColor redColor];
    userName.textColor=[UIColor blueColor];
    vote.textColor=[UIColor blueColor];
    time.textColor=[UIColor grayColor];
    for (UIButton *btn in @[voteBtn,commentBtn,actionBtn]) {
        btn.backgroundColor=[UIColor lightGrayColor];
        btn.layer.cornerRadius=2;
        [btn setTitleColor:[UIColor darkGrayColor] forState:UIControlStateNormal];
        btn.contentEdgeInsets=UIEdgeInsetsMake(5, 10, 5, 10);
    }

    //set size
    
    [sv autoPinEdgesToSuperviewEdgesWithInsets:ALEdgeInsetsZero];
    [sv autoMatchDimension:ALDimensionWidth toDimension:ALDimensionWidth ofView:self.view withOffset:0];
    
    [avatar autoSetDimensionsToSize:CGSizeMake(32, 32)];
    avatar.layer.cornerRadius=16;
    [avatar autoPinEdgeToSuperviewEdge:ALEdgeLeading withInset:15];
    [avatar autoPinEdgeToSuperviewEdge:ALEdgeTop withInset:15];
    
    userName.text=@"Steve Jobs";
    [userName autoPinEdge:ALEdgeLeading toEdge:ALEdgeTrailing ofView:avatar withOffset:10];
    
    time.text=@"7小时";
    [time autoPinEdgeToSuperviewEdge:ALEdgeTrailing withInset:15];
    [@[avatar,userName,time] autoAlignViewsToAxis:ALAxisHorizontal];
    
    mainImage.numberOfLines=0;
    mainImage.text=@"In my example 'body' is a UITextView, but it could be anything else. If you happen to be using a UITextView as well note that in order for it to grow vertically it must have a height constraint that gets set in viewDidLayoutSubviews. So add the following constraint in viewDidLoad and keep a reference to it:In my example 'body' is a UITextView, but it could be anything else. If you happen to be using a UITextView as well note that in order for it to grow vertically it must have a height constraint that gets set in viewDidLayoutSubviews. So add the following constraint in viewDidLoad and keep a reference to it:In my example 'body' is a UITextView, but it could be anything else. If you happen to be using a UITextView as well note that in order for it to grow vertically it must have a height constraint that gets set in viewDidLayoutSubviews. So add the following constraint in viewDidLoad and keep a reference to it:In my example 'body' is a UITextView, but it could be anything else. If you happen to be using a UITextView as well note that in order for it to grow vertically it must have a height constraint that gets set in viewDidLayoutSubviews. So add the following constraint in viewDidLoad and keep a reference to it:In my example 'body' is a UITextView, but it could be anything else. If you happen to be using a UITextView as well note that in order for it to grow vertically it must have a height constraint that gets set in viewDidLayoutSubviews. So add the following constraint in viewDidLoad and keep a reference to it:In my example 'body' is a UITextView, but it could be anything else. If you happen to be using a UITextView as well note that in order for it to grow vertically it must have a height constraint that gets set in viewDidLayoutSubviews. So add the following constraint in viewDidLoad and keep a reference to it:";
    [mainImage autoPinEdgeToSuperviewEdge:ALEdgeLeading withInset:5];
    [mainImage autoPinEdgeToSuperviewEdge:ALEdgeTrailing withInset:5];
    [mainImage autoMatchDimension:ALDimensionWidth toDimension:ALDimensionWidth ofView:self.view withOffset:-10];
    [mainImage autoPinEdge:ALEdgeTop toEdge:ALEdgeBottom ofView:avatar withOffset:10];
    
    vote.text=@"12次赞";
    [vote autoPinEdge:ALEdgeTop toEdge:ALEdgeBottom ofView:mainImage withOffset:10];
    [vote autoPinEdgeToSuperviewEdge:ALEdgeLeading withInset:15];
    
    [voteBtn setTitle:@"赞" forState:UIControlStateNormal];
    [commentBtn setTitle:@"评论" forState:UIControlStateNormal];
    [actionBtn setTitle:@"……" forState:UIControlStateNormal];
    [voteBtn autoPinEdgeToSuperviewEdge:ALEdgeLeading withInset:15];
    [commentBtn autoPinEdge:ALEdgeLeading toEdge:ALEdgeTrailing ofView:voteBtn withOffset:4];
    [actionBtn autoPinEdgeToSuperviewEdge:ALEdgeTrailing withInset:15];
    [@[voteBtn,commentBtn,actionBtn]autoAlignViewsToAxis:ALAxisHorizontal];
    [voteBtn autoPinEdge:ALEdgeTop toEdge:ALEdgeBottom ofView:vote withOffset:10];
    
    [sv autoPinEdge:ALEdgeBottom toEdge:ALEdgeBottom ofView:voteBtn withOffset:10];

}
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end

{%endhighlight%}

