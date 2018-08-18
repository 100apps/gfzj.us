{
	"difficulty":"2",
	"submit_num":"478752",
	"show_id":"11",
	"leetcode_id":"11",
	"answers":[
		{
			"lc_ans_id":"6099",
			"view":"57256",
			"top":"0",
			"title":"Yet another way to see what happens in the O(n) algorithm",
			"vote":"385",
			"content":"The O(n) solution with proof by contradiction doesn't look intuitive enough to me. Before moving on, read [the algorithm][1] first if you don't know it yet.\\n\\nHere's another way to see what happens in a matrix representation:\\n\\nDraw a matrix where the row is the first line, and the column is the second line. For example, say `n=6`.\\n\\nIn the figures below, `x` means we don't need to compute the volume for that case: (1) On the diagonal, the two lines are overlapped; (2) The lower left triangle area of the matrix is symmetric to the upper right area.\\n\\nWe start by computing the volume at `(1,6)`, denoted by `o`. Now if the left line is shorter than the right line, then all the elements left to `(1,6)` on the first row have smaller volume, so we don't need to compute those cases (crossed by `---`).\\n \\n\\n      1 2 3 4 5 6\\n    1 x ------- o\\n    2 x x\\n    3 x x x \\n    4 x x x x\\n    5 x x x x x\\n    6 x x x x x x\\n\\nNext we move the left line and compute `(2,6)`. Now if the right line is shorter, all cases below `(2,6)` are eliminated.\\n\\n      1 2 3 4 5 6\\n    1 x ------- o\\n    2 x x       o\\n    3 x x x     |\\n    4 x x x x   |\\n    5 x x x x x |\\n    6 x x x x x x\\nAnd no matter how this `o` path goes, we end up only need to find the max value on this path, which contains `n-1` cases.\\n\\n      1 2 3 4 5 6\\n    1 x ------- o\\n    2 x x - o o o\\n    3 x x x o | |\\n    4 x x x x | |\\n    5 x x x x x |\\n    6 x x x x x x\\nHope this helps. I feel more comfortable seeing things this way.\\n\\n\\n  [1]: https://oj.leetcode.com/discuss/1074/anyone-who-has-a-o-n-algorithm"
		},
		{
			"lc_ans_id":"6090",
			"view":"29643",
			"top":"1",
			"title":"Simple and fast C++/C with explanation",
			"vote":"238",
			"content":"Start by evaluating the widest container, using the first and the last line. All other possible containers are less wide, so to hold more water, they need to be higher. Thus, after evaluating that widest container, skip lines at both ends that don't support a higher height. Then evaluate that new container we arrived at. Repeat until there are no more possible containers left.\\n\\n**C++**\\n\\n    int maxArea(vector<int>& height) {\\n        int water = 0;\\n        int i = 0, j = height.size() - 1;\\n        while (i < j) {\\n            int h = min(height[i], height[j]);\\n            water = max(water, (j - i) * h);\\n            while (height[i] <= h && i < j) i++;\\n            while (height[j] <= h && i < j) j--;\\n        }\\n        return water;\\n    }\\n\\n**C**\\n\\nA bit shorter and perhaps faster because I can use raw int pointers, but a bit longer because I don't have `min` and `max`.\\n\\n    int maxArea(int* heights, int n) {\\n        int water = 0, *i = heights, *j = i + n - 1;\\n        while (i < j) {\\n            int h = *i < *j ? *i : *j;\\n            int w = (j - i) * h;\\n            if (w > water) water = w;\\n            while (*i <= h && i < j) i++;\\n            while (*j <= h && i < j) j--;\\n        }\\n        return water;\\n    }"
		},
		{
			"lc_ans_id":"6091",
			"view":"25148",
			"top":"2",
			"title":"Easy Concise Java O(N) Solution with Proof and Explanation",
			"vote":"158",
			"content":"AKA, the general idea to find some max is to go through all cases where max value can possibly occur and keep updating the max value. The efficiency of the scan depends on the size of cases you plan to scan.\\nTo increase efficiency, all we need to do is to find a smart way of scan to cut off the useless cases and meanwhile 100% guarantee the max value can be reached through the rest of cases.\\n\\nIn this problem, the smart scan way is to set two pointers initialized at both ends of the array. Every time move the smaller value pointer to inner array. Then after the two pointers meet, all possible max cases have been scanned and the max situation is 100% reached somewhere in the scan. Following is a brief prove of this.\\n\\nGiven a1,a2,a3.....an as input array. Lets assume a10 and a20 are the max area situation. We need to prove that a10 can be reached by left pointer and during the time left pointer stays at a10, a20 can be reached by right pointer. That is to say, the core problem is to prove: when left pointer is at a10 and right pointer is at a21, the next move must be right pointer to a20. \\n\\nSince we are always moving the pointer with the smaller value, i.e. if a10 > a21, we should move pointer at a21 to a20, as we hope. Why a10 >a21? Because if a21>a10, then area of a10 and a20 must be less than area of a10 and a21. Because the area of a10 and a21 is at least height[a10] * (21-10) while the area of a10 and a20 is at most height[a10] * (20-10). So there is a contradiction of assumption a10 and a20 has the max area. So, a10 must be greater than a21, then next move a21 has to be move to a20. The max cases must be reached. \\n\\n    public int maxArea(int[] height) {\\n        int left = 0, right = height.length - 1;\\n\\t\\tint maxArea = 0;\\n\\n\\t\\twhile (left < right) {\\n\\t\\t\\tmaxArea = Math.max(maxArea, Math.min(height[left], height[right])\\n\\t\\t\\t\\t\\t* (right - left));\\n\\t\\t\\tif (height[left] < height[right])\\n\\t\\t\\t\\tleft++;\\n\\t\\t\\telse\\n\\t\\t\\t\\tright--;\\n\\t\\t}\\n\\n\\t\\treturn maxArea;\\n    }"
		},
		{
			"lc_ans_id":"6100",
			"view":"11671",
			"top":"3",
			"title":"Simple and clear proof/explanation",
			"vote":"111",
			"content":"I've seen some \"proofs\" for the common O(n) solution, but I found them very confusing and lacking. Some even didn't explain anything but just used lots of variables and equations and were like \"Tada! See?\". I think mine makes more sense:\\n\\n**Idea / Proof:**\\n\\n 1. The widest container (using first and last line) is a good candidate, because of its width. Its water level is the height of the smaller one of first and last line.\\n 2. All other containers are less wide and thus would need a higher water level in order to hold more water.\\n 3. The smaller one of first and last line doesn't support a higher water level and can thus be safely removed from further consideration.\\n\\n**Implementation:** (Python)\\n\\n    class Solution:\\n        def maxArea(self, height):\\n            i, j = 0, len(height) - 1\\n            water = 0\\n            while i < j:\\n                water = max(water, (j - i) * min(height[i], height[j]))\\n                if height[i] < height[j]:\\n                    i += 1\\n                else:\\n                    j -= 1\\n            return water\\n\\n**Further explanation:**\\n\\nVariables `i` and `j` define the container under consideration. We initialize them to first and last line, meaning the widest container. Variable `water` will keep track of the highest amount of water we managed so far. We compute `j - i`, the width of the current container, and `min(height[i], height[j])`, the water level that this container can support. Multiply them to get how much water this container can hold, and update `water` accordingly. Next remove the smaller one of the two lines from consideration, as justified above in \"Idea / Proof\". Continue until there is nothing left to consider, then return the result."
		},
		{
			"lc_ans_id":"6110",
			"view":"17759",
			"top":"4",
			"title":"Very simple O(n) solution",
			"vote":"83",
			"content":"The idea is : to compute area, we need to take min(height[i],height[j]) as our height. Thus if `height[i]<height[j]`, then the expression `min(height[i],height[j])` will always lead to at maximum `height[i]` for all other j(i being fixed), hence no point checking them. Similarly when `height[i]>height[j]` then all the other i's can be ignored for that particular j.\\n\\n    class Solution {\\n    public:\\n        int maxArea(vector<int> &height)\\n        {\\n            int j=height.size()-1,i=0,mx=0;\\n            \\n            while(i<j)\\n            {\\n                mx=max(mx,((j-i)*(min(height[i],height[j]))));\\n                \\n                if(height[i]<height[j])\\n                 i++;\\n                 else if(height[i]>=height[j])\\n                 j--;\\n            }\\n            return mx;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"6150",
			"view":"3975",
			"top":"5",
			"title":"For someone who is not so clear on this question",
			"vote":"43",
			"content":"      y ^\\n        |\\n        |     a2\\n        |     |  a3          an\\n        |  a1 |  |     a5    | \\n        |  |  |  |  a4 |     |\\n        |  |  |  |  |  | ..  |\\n        --------------------------->\\n       0   1  2  3  4  5 ..  n     x\\n    \\n\\n 1. For someone who is not clear on this question. It's not like\\n    \"https://leetcode.com/problems/trapping-rain-water/ \" Which is to\\n    get the total water for all the bars problem, It actually is to find\\n    the any 2 bars ai, aj, which hold most water together with x-axis.\\n    This post give a very good detail explanation as well.\\n    https://leetcode.com/discuss/37631/simple-and-clear-proof-explanation\\n\\n------------------------------------------------------------------------"
		},
		{
			"lc_ans_id":"6126",
			"view":"1847",
			"top":"6",
			"title":"C++ O(n) solution with thought process applying simple bucket theory",
			"vote":"40",
			"content":"The brute force solution can definitely lead us to the right answer just by doing too many redundant comparisons. When two pointer approach comes to mind, it is intuitive to set both pointers `i, j` at each end of this array, and move them strategically to the middle of array, update the answer during this process return the answer when we reach the end of array. Suppose now we have the scenarios below:\\n\\n    7, 5, 6, 9\\n    \\n    i        j\\n\\nWhen `i = 1,  j = 4`, \\n\\n    ans = min(7, 9) * (4 - 1) = 21 \\n\\nWhat's next? Should we move `i` or `j`? We notice that to calculate the area, the height is really identified by the `smaller number / shorter end` between the two ends, since it's required that you may not slant the water, so it sounds like Bucket theory: how much water a bucket can contain depends on the shortest plank. So, as to find the next potential maximum area, we disregard the shorter end by moving it to the next position. So in the above case, the next status is to move `i` to the left, \\n\\n    7, 5, 6, 9\\n    \\n       i     j\\n\\nupdate:\\n\\n    area (i, j) = area(2, 4) = min(5, 9) * (4 - 2) = 10\\n    ans = max(21, 10) = 21\\n\\nYou may notice that, if we move `j` instead, you actually get a larger area for length of 2: \\n\\n    area (i, j) = area(1, 3) = min(7, 6) * (3 - 1) = 18\\n\\nDoes that mean this approach will not work? If you look at this way, we move pointer as to get the next potential max, so it doesn't need to be the maximum for all combinations with length `l`. Even though `18` is greater than `10`, it's smaller than `21` right? So don't worry, we can move on to find the next potential maximum result. Now we need to prove, why disregard the shorter end can safely lead us to the right answer by doing a little maths. \\n\\n    Given an array: a1, a2, a3, a4, ai, ......, aj, ......, an\\n                                     i           j\\n\\nAssume the maximum area so far is `ans`, we prove that \\n\\n    \"By moving shorter end pointer further doesn't eliminate the final answer (with two ends at maxi, maxj respectively) in our process\"\\n\\nSuppose we have two ends at (`i, j`) respectively at this moment:\\n\\n(i) If the final answer equals what we have already achieved, it's done! In this scenario, we must have\\n\\n    maxi <= i, maxj >= j \\n\\n(ii) Otherwise, we know as we move any pointer further, the length of the next rectangle decreases, so the height needs to increase as to result in a larger area. So we have \\n\\n    min(height[maxi], height[maxj]) > min(height[i], height[j]) \\nSo the smaller one in height[`i`], height[`j`] won't become any end in the maximum rectangle, so it's safe to move forward without it.\\n\\nTill now, it has been proved that this approach can work in O(n) time since we advance one end towards the middle in each iteration, and update ans takes constant time in each iteration.\\n\\n    class Solution {\\n    public:\\n        int maxArea(vector<int>& height) {\\n            int ans = 0;\\n            int i = 0, j = height.size() - 1;          \\n            while(i < j){\\n                ans = max(ans, (j - i) * min(height[i], height[j]));\\n                height[i] > height[j] ? j-- : i++;  \\n            }\\n            \\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"6149",
			"view":"3903",
			"top":"7",
			"title":"*Java* 3ms solution with step-by-step explanations (beats 85%)",
			"vote":"30",
			"content":"It took me quite some time to finally optimize my solution from 21ms to 3ms :(\\n\\nIf you have difficulty understanding the following code, check [this link][1] for a detailed explanation.\\n\\n    public int maxArea(int[] height) {\\n        int L = height.length, lo = 0, hi = L-1;\\n        int max = 0;\\n        while(lo<hi) {\\t  \\n\\t        int loMax = height[lo], hiMax = height[hi];      \\n\\t\\n        \\tint candidate = (hi-lo) * (loMax<hiMax ? loMax : hiMax);\\n        \\tmax = candidate > max ? candidate : max;\\n\\n        \\tif(height[lo]<=height[hi]) \\n        \\t    while(lo<hi && height[lo]<=loMax) ++lo; \\n        \\telse \\n        \\t    while(hi>lo && height[hi]<=hiMax) --hi;\\n        }\\n        return max;\\n    }\\n\\n\\n  [1]: https://github.com/F-L-A-G/Algorithms-in-Java/commit/479a42fdbbf4303d89beef8df9e270a29580110d"
		},
		{
			"lc_ans_id":"6089",
			"view":"39303",
			"top":"8",
			"title":"Anyone who has a O(N) algorithm ?",
			"vote":"25",
			"content":"anyone who has a O(N) algorithm ?\\n\\nI am using the following code but the time exceeds the limit for the extreme case (ascending sequece) , so I added some special code to handle the extreme case to get a pass.  Anyone who has better solution?\\n\\n\\n    \\tpublic  int maxArea1(int[] height){\\n\\t\\tif ( (height == null) || (height.length <= 1) )\\n\\t\\t\\treturn 0 ;\\n\\t\\tint result = 0 ;\\n\\t\\tArrayList<Integer> seq = new ArrayList<Integer>();\\n\\t\\tseq.add(new Integer(0));\\n\\t\\tfor (int i = 1 ; i < height.length; i++){\\n\\t\\t\\tfor ( Integer idx : seq ){\\n\\t\\t\\t\\tint ht = height[i] > height[idx.intValue()] ? height[idx.intValue()] : height[i] ;\\n\\t\\t\\t\\tint area = (i - idx.intValue()) * ht ;\\n\\t\\t\\t\\tif ( area > result ) result = area ;\\n\\t\\t\\t}\\n\\t\\t\\tint lastIdx = seq.get(seq.size() - 1).intValue();\\n\\t\\t\\tif ( height[i] > height[lastIdx]){\\n\\t\\t\\t\\tseq.add(new Integer(i)) ;\\n\\t\\t\\t}\\n\\t\\t}\\t\\t\\n\\t\\treturn result ;\\n\\t\\t\\n\\t}"
		},
		{
			"lc_ans_id":"6213",
			"view":"2227",
			"top":"9",
			"title":"My short and easy c++ code in O(n)",
			"vote":"22",
			"content":"    class Solution {\\n    public:\\n        int maxArea(vector<int>& height) {\\n            int i=0,j=height.size()-1,ans = 0;\\n            while(j>i)\\n            {\\n                ans = max(min(height[i],height[j])*(j-i),ans);\\n                if(height[i]>height[j]) j--;\\n                else i++;\\n            }\\n            return ans;\\n        }\\n    };"
		}
	],
	"id":"11",
	"title":"Container With Most Water",
	"content":"<p>Given <i>n</i> non-negative integers <i>a<sub>1</sub></i>, <i>a<sub>2</sub></i>, ..., <i>a<sub>n</sub></i>, where each represents a point at coordinate (<i>i</i>, <i>a<sub>i</sub></i>). <i>n</i> vertical lines are drawn such that the two endpoints of line <i>i</i> is at (<i>i</i>, <i>a<sub>i</sub></i>) and (<i>i</i>, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.\r\n</p>\r\n<p>Note: You may not slant the container and <i>n</i> is at least 2.\r\n</p>",
	"frequency":"616",
	"ac_num":"177121"
}