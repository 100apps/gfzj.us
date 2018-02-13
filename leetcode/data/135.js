{
	"difficulty":"3",
	"submit_num":"301218",
	"show_id":"135",
	"leetcode_id":"135",
	"answers":[
		{
			"lc_ans_id":"42769",
			"view":"26049",
			"top":"0",
			"title":"A simple solution",
			"vote":"220",
			"content":"  \\n\\n      int candy(vector<int> &ratings)\\n     {\\n    \\t int size=ratings.size();\\n    \\t if(size<=1)\\n    \\t\\t return size;\\n    \\t vector<int> num(size,1);\\n    \\t for (int i = 1; i < size; i++)\\n    \\t {\\n    \\t\\t if(ratings[i]>ratings[i-1])\\n    \\t\\t\\t num[i]=num[i-1]+1;\\n    \\t }\\n    \\t for (int i= size-1; i>0 ; i--)\\n    \\t {\\n    \\t\\t if(ratings[i-1]>ratings[i])\\n    \\t\\t\\t num[i-1]=max(num[i]+1,num[i-1]);\\n    \\t }\\n    \\t int result=0;\\n    \\t for (int i = 0; i < size; i++)\\n    \\t {\\n    \\t\\t result+=num[i];\\n    \\t\\t// cout<<num[i]<<\" \";\\n    \\t }\\n    \\t return result;\\n     }"
		},
		{
			"lc_ans_id":"42770",
			"view":"9846",
			"top":"1",
			"title":"One-pass constant space Java solution",
			"vote":"75",
			"content":"Hi guys!\\n\\nThis solution picks each element from the input array only once. First, we give a candy to the first child. Then for each child we have three cases:\\n\\n 1. His/her rating is equal to the previous one -> give 1 candy.\\n 2. His/her rating is greater than the previous one -> give him (previous + 1) candies.\\n 3. His/her rating is less than the previous one -> don't know what to do yet, let's just count the number of such consequent cases.\\n \\nWhen we enter 1 or 2 condition we can check our count from 3. If it's not zero then we know that we were descending before and we have everything to update our total candies amount: number of children in descending sequence of raitings - coundDown, number of candies given at peak - prev (we don't update prev when descending). Total number of candies for \"descending\" children can be found through arithmetic progression formula (1+2+...+countDown). Plus we need to update our peak child if his number of candies is less then or equal to countDown. \\n\\nHere's a pretty concise code below.\\n\\n----------\\n\\n    public class Solution {\\n        public int candy(int[] ratings) {\\n            if (ratings == null || ratings.length == 0) return 0;\\n            int total = 1, prev = 1, countDown = 0;\\n            for (int i = 1; i < ratings.length; i++) {\\n                if (ratings[i] >= ratings[i-1]) {\\n                    if (countDown > 0) {\\n                        total += countDown*(countDown+1)/2; // arithmetic progression\\n                        if (countDown >= prev) total += countDown - prev + 1;\\n                        countDown = 0;\\n                        prev = 1;\\n                    }\\n                    prev = ratings[i] == ratings[i-1] ? 1 : prev+1;\\n                    total += prev;\\n                } else countDown++;\\n            }\\n            if (countDown > 0) { // if we were descending at the end\\n                total += countDown*(countDown+1)/2;\\n                if (countDown >= prev) total += countDown - prev + 1;\\n            }\\n            return total;\\n        }\\n    }\\n\\nHave a nice coding!"
		},
		{
			"lc_ans_id":"42794",
			"view":"4990",
			"top":"2",
			"title":"Simple O(n) Java solution with comments",
			"vote":"59",
			"content":"    public int candy(int[] ratings) {\\n        int candies[] = new int[ratings.length];        \\n        Arrays.fill(candies, 1);// Give each child 1 candy \\n        \\t\\n        for (int i = 1; i < candies.length; i++){// Scan from left to right, to make sure right higher rated child gets 1 more candy than left lower rated child\\n\\t        if (ratings[i] > ratings[i - 1]) candies[i] = (candies[i - 1] + 1);\\n\\t    }\\n\\t     \\n\\t    for (int i = candies.length - 2; i >= 0; i--) {// Scan from right to left, to make sure left higher rated child gets 1 more candy than right lower rated child\\n\\t\\t    if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], (candies[i + 1] + 1));\\n\\t    }\\n\\t    \\n        int sum = 0;        \\n        for (int candy : candies)  \\n        \\tsum += candy;        \\n        return sum;\\n\\t}"
		},
		{
			"lc_ans_id":"42774",
			"view":"3837",
			"top":"3",
			"title":"Very Simple Java Solution with detail explanation",
			"vote":"39",
			"content":"    We take ratings array as [5, 6, 2, 2, 4, 8, 9, 5, 4, 0, 5, 1]\\n\\nIn the given problem each student will have at least 1 candy. So distribute 1 candy to each.\\n\\n    ratings:     [5, 6, 2, 2, 4, 8, 9, 5, 4, 0, 5, 1]\\n    candies:     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]\\n\\nNow traverse the array from left to right. If the rating of (n+1) child is greater than (n) child then set the candy of (n+1) child as one candy more than the (n) child candies.\\n\\n    ratings:     [5, 6, 2, 2, 4, 8, 9, 5, 4, 0, 5, 1]\\n    candies:     [1, 2, 1, 1, 2, 3, 4, 1, 1, 1, 2, 1]\\n\\nNow  traverse the array from right to left. If the (n) child rating is more than (n+1) child and (n) child candies is less than one more than (n+1) child candies then update the candies of (n) child as 1+ (n+1) candies.\\n\\n    ratings:     [5, 6, 2, 2, 4, 8, 9, 5, 4, 0, 5, 1]\\n    candies:     [1, 2, 1, 1, 2, 3, 4, 3, 2, 1, 2, 1]\\n\\nTotal minimum candies: 23\\n\\n    public int candy(int[] ratings) {\\n            int sum=0;\\n            int[] a=new int[ratings.length];\\n            for(int i=0;i<a.length;i++)\\n            {\\n                a[i]=1;\\n            }\\n            for(int i=0;i<ratings.length-1;i++)\\n            {\\n                if(ratings[i+1]>ratings[i])\\n                {\\n                    a[i+1]=a[i]+1;\\n                }\\n            }\\n            for(int i=ratings.length-1;i>0;i--)\\n            {\\n                if(ratings[i-1]>ratings[i])\\n                {\\n                    if(a[i-1]<(a[i]+1))\\n                    {\\n                        a[i-1]=a[i]+1;\\n                    }\\n                }\\n            }\\n            for(int i=0;i<a.length;i++)\\n            {\\n                sum+=a[i];\\n            }\\n            return sum;\\n        }"
		},
		{
			"lc_ans_id":"42795",
			"view":"3487",
			"top":"4",
			"title":"Two C++ solutions given with explanation (both with O(N) time, one with O(1) space, the other with O(N) space)",
			"vote":"25",
			"content":"The question requires us to make sure a child with a higher rate has more candies than its left and right neighbors. One simple solution is to do two scans: one foward scan (from 1 to N-1) to make sure child i has more candies than its left neighbor if its rate is higher than its left neighbor. After the forward scan, we can guarantee that the left neighbor relationship is correct but we have to do more to make the right neighbor relationship in order; so we do the backwarad scan (from N-2 to 0) to make child i has more candies than its right neighbor i+1 if its rate is higher than its right neighbor. In the following implementation, we need a O(N) array number to save the number of candies needed for children, so it has O(N) space complexity and we do two linear scans so the time complexity is O(N) \\n\\n    class Solution {\\n    public:\\n        int candy(vector<int>& ratings) {\\n            int len = ratings.size(), res = 0, i;\\n            if(len>0)\\n            {\\n                vector<int> number(len,0); // to save the number of candies for child[0:N-1]\\n                number[0] = 1; \\n    // forward scan to calculate how many candies needed for child i to make sure it has more candies than its left neighbor if it has a higher rate, otherwise, give one candy to it\\n                for(i=1; i<len;++i) number[i] = ratings[i]>ratings[i-1]?number[i-1]+1:1;\\n    \\n    // backward scan to calculate to make sure child i has more candies than its right neighbor if it has a higher rate, pick the bigger one from forward and backward scans as the final number for child i\\n                for(i=len-2, res = number[len-1]; i>=0;--i)\\n                {\\n                    if( (ratings[i]>ratings[i+1]) && number[i]<(number[i+1]+1) ) number[i] = number[i+1]+1;\\n                    res += number[i];\\n                }\\n            }\\n            return res;\\n        }\\n    };\\n\\nNow, the question is can we do better? Do we really need two scans? If we do only forward scan, then the problem is we can not guarantee the right neighbor relationship holds. i.e. we don't know if the following order is descending (i>i+1>i+2>...). and that may cause issues. To fix that, we will detect the dips (the points at which the order switchs from increasing to decreasng). We will make sure all the local dips (minimum points) has only one candy and update its previous neighbors (which has hgher rates than its rate) accordingly. To do such update, we need to know when the decrease starts, so we use pPos to save that starting points. \\nSo the solution becomes: do the forward scan, if it is in an increasing order (child i rate > child i-1 order), check if it is a local dip (neg_peak == true): if so, update the candy number to make sure child i-1 has one candy. if not, just give one more candy to child i. If it is in an decreasing order (child i rate < child i-1 order)\\n, just give one less candy to i. don't forget at last, we still need to make sure child N-1 has one or more candy. So O(1) space , O(N) time\\n\\n        class Solution {\\n        public:\\n            int candy(vector<int>& ratings) {\\n                const int len = ratings.size();\\n                if(len<=1) return len;\\n                \\n                int i, pPos, res=1, peak=1; // peak: # candies given to the i-1 child\\n                bool neg_peak = false; // flag to indicate if it is a local dip\\n                for(i=1; i<len;i++)\\n                {\\n                    if(ratings[i] >= ratings[i-1]) \\n                    {   // it is increasing\\n                        if(neg_peak) \\n                        {  // it is a local dip, we need to make sure i-1 has one candy\\n                            res -= (peak-1) * (i-pPos - (peak>0));\\n                            peak = 1;\\n                            neg_peak = false;\\n                        }\\n                       // update child i candy number, if equal, set to 1\\n                        peak = (ratings[i] == ratings[i-1])? 1:++peak;\\n                        res += peak;\\n                    }\\n                    else\\n                    { // decreasing, just give one less candy, if it is the starting point of a decrease, update pPos\\n                        if(!neg_peak) {pPos = i-1; neg_peak = true;}\\n                        res += --peak;\\n                    }\\n                }\\n    // don't forget to update res, if the last one is a local dip\\n                return !neg_peak? res : res - (peak-1) * (i-pPos - (peak>0));\\n        \\n            }\\n        };"
		},
		{
			"lc_ans_id":"42768",
			"view":"1793",
			"top":"5",
			"title":"Why two adjacent children with equal rating don't get equal candies?",
			"vote":"18",
			"content":"The expect Output of [1,2,2] is 4, not 5. I think it's not reasonable."
		},
		{
			"lc_ans_id":"42878",
			"view":"3479",
			"top":"6",
			"title":"C++ easy to understand? Solution with lot of comments ( O(n), constant space, one pass)",
			"vote":"18",
			"content":"Let me know if you find it easy please.\\n\\n    Ratings:\\n                        Peak\\n            Peak        |\\n            |           | |\\n          | |           | | |   \\n        | | | |       | | | | |       | | |\\n      | | | | | |   | | | | | | |     | | |\\n    | | | | | | | | | | | | | | | | | | | |\\n                    Candies:\\n    1 2 3 4 5 3 2 1 2 3 5 4 3 2 1 1 1 2 1 1\\n    x---a---x\\n            x--b--x    \\n\\n\\n\\n\\n\\n    \\n\\n\\n\\n It seems easy to track the length of the slopes of the mountains (sequence of all ascending or \\n all descending ratings)\\n and then sum the candies for the two slopes (an easy n*(n+1)/2), with land sequences adding +1 each \\n rating value. \\n\\n It almost works.\\n Big problem is we don't know who the peak belongs (left or right slope?)\\n\\n Example: the first sequence \"a\" is made of 5 ascending elements. \\n    The second sequence \"b\" is made of 4 descending elements.\\n    Which slope gets the peak? \\n\\n Answer: the longest. So for the first mountain \"a\" slope is\\n \\n    L(a)=4    ==>  4+3+2+1 candies \\n\\nand \"b\" is \\n\\n    L(b)=3 ==> 3+2+1 candies\\n\\nPeak is \\n\\n    max(L(a),L(b)) + 1 ==>5 candies.\\n         \\n\\n Unfortunately we can know the longer side of the mountain at the end of the mountain only.\\n\\n So we use \"up\" and \"down\" variable to track the length of the slopes. We sum the candies \\n at the end of each mountain and then we reset the slopes to zero.\\n\\n Special case: we have same rating twice (land). This ends a mountain even if it was ascending \\n (that means: descending slope of length = 0)\\n\\n And to make things more complicated, the last element of a sequence \\n is also the beginning of the next sequence (another mountain or land),\\n so we take that into account.\\n\\n\\n    class Solution {\\n    public:\\n        // Candies for a slope of n elements\\n        int slope(int n)\\n        {\\n            return (n*(n+1))/2;\\n        }\\n    \\n        int candy(vector<int> &ratings) {\\n            if (ratings.size() <= 1 )\\n            {\\n                return ratings.size();\\n            }\\n            int tot = 0;        // The final amount of candies\\n            int up = 0;         // Lenght of the last ascending slope\\n            int down = 0;       // Lenght of the last descending slope\\n            int oldsign = 0;    // Previous ratings trend (1 = ascending, -1 == descending, 0 = stable) \\n    \\n            for (int i = 1; i< ratings.size(); i++)\\n            {\\n                            // Current ratings trend, same meaning as oldsign\\n                int newsign = ratings[i] > ratings[i-1] ? 1 : \\n                              ratings[i] < ratings[i-1] ? -1 : 0;\\n                            // We can calculate the contribution of a slope \\n                            // when that slope ends and it's not the peak of a mountain,\\n                            // that's why we have \"newsign == 0\" and not \"newsign <= 0\"\\n                if ((oldsign > 0 && newsign == 0)  ||\\n                    (oldsign < 0  && newsign >= 0) )\\n                    {\\n                            // The peak of the mountain should have max(up,down)+1\\n                            // candies, but the end of the mountain is the beginning of\\n                            // the next sequence, so we don't the candy at the end of \\n                            // the mountain\\n                        tot += slope(up) + slope(down) + std::max(up, down);\\n                        up = 0;\\n                        down = 0;\\n                    }\\n    \\n                if(newsign > 0)\\n                    up++;\\n                if(newsign < 0)\\n                    down++;\\n                        // Same rating of the previous child?\\n                        // Take one candy.If you are better then the next child\\n                        // the descending slope will take that into account, don't worry\\n                if(newsign == 0)\\n                    tot++;\\n                    \\n                oldsign = newsign;\\n            }\\n            \\n                        // Final sequence has to be closed\\n                        // Why +1? Because we don't have a sequence next!\\n            tot += ramp(up) + ramp(down) + std::max(up, down) + 1;\\n            return tot;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"42870",
			"view":"952",
			"top":"7",
			"title":"My two 36ms Codes - one pass O(1) space  plus another easy to understand code C++",
			"vote":"11",
			"content":"    class Solution { // O(n) single pass\\n    public:\\n        int candy(vector<int>& ratings) {\\n            int ans = 0;\\n            int i = 1; int dip = 1;\\n            if(ratings.size() == 1) return 1;\\n            while(i < ratings.size())\\n            {  \\n                int len2 = 1;\\n                while( i < ratings.size() && ratings[i] == ratings[i-1]){\\n                    i++; ans += len2;\\n                }\\n                while(i < ratings.size() && ratings[i-1] < ratings[i]){\\n                    len2++; i++;\\n                } ans += len2*(len2+1)/2;\\n                while( i < ratings.size() && ratings[i] == ratings[i-1]){\\n                    i++; ans += 1;\\n                    len2 = 1;\\n                }\\n                len2--;\\n                int len = 0;\\n                while( i < ratings.size() && ratings[i-1] > ratings[i]){\\n                    len++;  i++;\\n                }\\n                if( i-1 != ratings.size()-1 ) { ans -= 1; }\\n                ans += len*(len+1)/2;\\n                if(len > len2) ans += len-len2;\\n            }\\n            return ans;\\n        }\\n    };\\n\\nEasy to understand 2 pass code:    \\nIdea: Forward pass is intuitively ok and gives min candies, the second reverse pass doesn't break any thing from the previous pass and completes the reverse direction requirements too.\\n\\n    class Solution {\\n    public:\\n        int candy(vector<int>& arr) {\\n            int cand[100001] = {0};\\n            int n = arr.size();\\n            for(int i = 1; i < n; i++) \\n                if(arr[i] > arr[i-1]) cand[i] = cand[i-1] + 1;\\n            for(int i = n-2; i>= 0; i--) \\n                if(arr[i] > arr[i+1]) cand[i] = max(cand[i], cand[i+1] + 1);\\n            int sum = n;\\n            for(int i = 0; i < n; i++) sum += cand[i];\\n            return sum;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"42890",
			"view":"12294",
			"top":"8",
			"title":"Does anyone have a better idea?",
			"vote":"10",
			"content":"My code is accepted with **a run-time complexity of O(n)** and **a space complexity of nearly O(1), less than O(n)**.\\n\\nI deal with it for two times:\\n\\n1st, from left to right, I add all the rising points, including the right edges without the left edges.\\n\\n2nd, from right to left, I add all the rising points, which are falling points at the 1st time, including the right and left edges.\\n\\nThere are 4 points should be noticed:\\n\\n1) The right edges must be dealt with for two times, so I only add the difference values or 0. I use a stack to mark every tops' candies except for the last child.\\n\\n2) The left edges are not dealt with for the 1st time, but they are dealt with for the 2nd time.\\n\\n3) For the flat parts, the left edges are dealt with as rising points, while the right edges are dealt with by adding 1 for the 1st time. So for the 2nd time, I add the values they should have then minus 1 when meeting the right edges. The rest are dealt with by adding 1 for the 1st time and not dealt with for the 2nd time.\\n\\n4) As to the point 0, I deal with it if it's less than or equal to point 1 by adding 1. If it's larger than point 1, I don't deal with it until the 2nd time is finished.\\n\\nHere is the code:\\n\\n    class Solution {\\n    public:\\n    \\tint candy(vector<int> &ratings) {\\n    \\t\\t// IMPORTANT: Please reset any member data you declared, as\\n    \\t\\t// the same Solution instance will be reused for each test case.\\n    \\t\\tif( ratings.size()<2 )\\n    \\t\\t\\treturn ratings.size();\\n    \\t\\tint len=1, sum=0, flat=1, tmp;\\n    \\t\\tvector<int> tops;\\n    \\t\\tsum += ratings[0]>ratings[1] ? 0 : len ;\\n    \\t\\tfor(int i=1; i<ratings.size(); ++i)\\n    \\t\\t{\\n    \\t\\t\\tif( ratings[i]>ratings[i-1] )\\n    \\t\\t\\t\\tsum += ++len;\\n    \\t\\t\\telse if( ratings[i]==ratings[i-1] )\\n    \\t\\t\\t{\\n    \\t\\t\\t\\tlen = 1;\\n    \\t\\t\\t\\tsum += 1;\\n    \\t\\t\\t}\\n    \\t\\t\\telse if( ratings[i]<ratings[i-1] && len!=1 )\\n    \\t\\t\\t{\\n    \\t\\t\\t\\ttops.push_back(len);\\n    \\t\\t\\t\\tlen=1;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\tlen=1;\\n    \\t\\tfor(int i=ratings.size()-1; i>0; --i)\\n    \\t\\t{\\n    \\t\\t\\tif( ratings[i]<ratings[i-1] )\\n    \\t\\t\\t\\tsum += len++;\\n    \\t\\t\\tif( ratings[i]==ratings[i-1] )\\n    \\t\\t\\t{\\n    \\t\\t\\t\\tsum += len-1;\\n    \\t\\t\\t\\tlen = 1;\\n    \\t\\t\\t}\\n    \\t\\t\\telse if( ratings[i]>ratings[i-1] && len!=1 )\\n    \\t\\t\\t{\\n    \\t\\t\\t\\ttmp = tops.back();\\n    \\t\\t\\t\\ttops.pop_back();\\n    \\t\\t\\t\\tsum += len>tmp?(len-tmp):0;\\n    \\t\\t\\t\\tlen = 1;\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\tsum += ratings[0]>ratings[1] ? len : 0 ;\\n    \\t\\treturn sum;\\n    \\t}\\n    };\\n\\nDoes anyone have a better idea? My code has a complicated judgement and seems not elegant enough."
		},
		{
			"lc_ans_id":"42889",
			"view":"768",
			"top":"9",
			"title":"Simple python solution with two passes",
			"vote":"9",
			"content":"    class Solution:\\n        # @param {integer[]} ratings\\n        # @return {integer}\\n        def candy(self, ratings):\\n            # use two pass scan from left to right and vice versa to keep the candy level up to now\\n            # similar to like the Trapping Rain Water question\\n            res = [1]*len(ratings) # also compatable with [] input\\n            lbase = rbase = 1\\n            # left scan\\n            for i in xrange(1, len(ratings)):\\n                lbase = lbase + 1 if ratings[i] > ratings[i-1] else 1\\n                res[i] = lbase\\n            # right scan\\n            for i in xrange(len(ratings)-2, -1, -1):\\n                rbase = rbase + 1 if ratings[i] > ratings[i+1] else 1\\n                res[i] = max(rbase, res[i])\\n            return sum(res)"
		}
	],
	"id":"135",
	"title":"Candy",
	"content":"<p>\r\nThere are <i>N</i> children standing in a line. Each child is assigned a rating value. \r\n</p>\r\n<p>\r\nYou are giving candies to these children subjected to the following requirements:\r\n</p>\r\n<ul>\r\n<li>Each child must have at least one candy.</li>\r\n<li>Children with a higher rating get more candies than their neighbors.</li>\r\n</ul>\r\n<p>\r\nWhat is the minimum candies you must give?\r\n</p>",
	"frequency":"403",
	"ac_num":"75672"
}