{
	"difficulty":"3",
	"submit_num":"395907",
	"show_id":"42",
	"leetcode_id":"42",
	"answers":[
		{
			"lc_ans_id":"17357",
			"view":"46309",
			"top":"0",
			"title":"Sharing my simple c++ code: O(n) time, O(1) space",
			"vote":"368",
			"content":"    \\nHere is my idea: instead of calculating area by height*width, we can think it in a cumulative way. In other words, sum water amount of each bin(width=1). \\nSearch from left to right and maintain a max height of left and right separately, which is like a one-side wall of  partial container. Fix the higher one and flow water from the lower part. For example, if current height of left is lower, we fill water in the left bin. Until left meets right, we filled the whole container.\\n\\n    class Solution {\\n    public:\\n        int trap(int A[], int n) {\\n            int left=0; int right=n-1;\\n            int res=0;\\n            int maxleft=0, maxright=0;\\n            while(left<=right){\\n                if(A[left]<=A[right]){\\n                    if(A[left]>=maxleft) maxleft=A[left];\\n                    else res+=maxleft-A[left];\\n                    left++;\\n                }\\n                else{\\n                    if(A[right]>=maxright) maxright= A[right];\\n                    else res+=maxright-A[right];\\n                    right--;\\n                }\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"17391",
			"view":"25194",
			"top":"1",
			"title":"Share my short solution.",
			"vote":"203",
			"content":"Keep track of the maximum height from both forward directions backward directions, call them leftmax and rightmax. \\n\\n----------\\n\\n    public int trap(int[] A){\\n        int a=0;\\n        int b=A.length-1;\\n        int max=0;\\n        int leftmax=0;\\n        int rightmax=0;\\n        while(a<=b){\\n            leftmax=Math.max(leftmax,A[a]);\\n            rightmax=Math.max(rightmax,A[b]);\\n            if(leftmax<rightmax){\\n                max+=(leftmax-A[a]);       // leftmax is smaller than rightmax, so the (leftmax-A[a]) water can be stored\\n                a++;\\n            }\\n            else{\\n                max+=(rightmax-A[b]);\\n                b--;\\n            }\\n        }\\n        return max;\\n    }"
		},
		{
			"lc_ans_id":"17364",
			"view":"16243",
			"top":"2",
			"title":"7 lines C / C++",
			"vote":"108",
			"content":"Keep track of the already safe `level` and the total `water` so far. In each step, process and discard the `lower` one of the leftmost or rightmost elevation.\\n\\n---\\n\\n**C**\\n\\nChanging the given parameters to discard the lower border. I'm quite fond of this one.\\n\\n    int trap(int* height, int n) {\\n        int level = 0, water = 0;\\n        while (n--) {\\n            int lower = *height < height[n] ? *height++ : height[n];\\n            if (lower > level) level = lower;\\n            water += level - lower;\\n        }\\n        return water;\\n    }\\n\\nSlight variation with two pointers (left and right).\\n\\n    int trap(int* height, int n) {\\n        int *L = height, *R = L+n-1, level = 0, water = 0;\\n        while (L < R) {\\n            int lower = *L < *R ? *L++ : *R--;\\n            if (lower > level) level = lower;\\n            water += level - lower;\\n        }\\n        return water;\\n    }\\n\\n---\\n\\n**C++**\\n\\nWith left and right index.\\n\\n    int trap(vector<int>& height) {\\n        int l = 0, r = height.size()-1, level = 0, water = 0;\\n        while (l < r) {\\n            int lower = height[height[l] < height[r] ? l++ : r--];\\n            level = max(level, lower);\\n            water += level - lower;\\n        }\\n        return water;\\n    }\\n\\nWith left and right iterator.\\n\\n    int trap(vector<int>& height) {\\n        auto l = height.begin(), r = height.end() - 1;\\n        int level = 0, water = 0;\\n        while (l != r + 1) {\\n            int lower = *l < *r ? *l++ : *r--;\\n            level = max(level, lower);\\n            water += level - lower;\\n        }\\n        return water;\\n    }"
		},
		{
			"lc_ans_id":"17414",
			"view":"13402",
			"top":"3",
			"title":"A stack based solution for reference, inspired by Histogram",
			"vote":"91",
			"content":"Indeed this question can be solved in one pass and O(1) space, but it's probably hard to come up with in a short interview. If you have read the stack O(n) solution for Largest Rectangle in Histogram, you will find this solution is very very similar. \\n\\nThe main idea is : if we want to find out how much water on a bar(bot), we need to find out the left larger bar's index (il), and right larger bar's index(ir), so that the water is (min(A[il],A[ir])-A[bot])*(ir-il-1), use min since only the lower boundary can hold water, and we also need to handle the edge case that there is no il.\\n\\nTo implement this we use a stack that store the indices with decreasing bar height, once we find a bar who's height is larger, then let the top of the stack be bot, the cur bar is ir, and the previous bar is il. \\n\\n\\n    public int trap(int[] A) {\\n            if (A==null) return 0;\\n            Stack<Integer> s = new Stack<Integer>();\\n            int i = 0, maxWater = 0, maxBotWater = 0;\\n            while (i < A.length){\\n                if (s.isEmpty() || A[i]<=A[s.peek()]){\\n                    s.push(i++);\\n                }\\n                else {\\n                    int bot = s.pop();\\n                    maxBotWater = s.isEmpty()? // empty means no il\\n                    0:(Math.min(A[s.peek()],A[i])-A[bot])*(i-s.peek()-1);\\n                    maxWater += maxBotWater;\\n                }\\n            }\\n            return maxWater;\\n        }"
		},
		{
			"lc_ans_id":"17386",
			"view":"14710",
			"top":"4",
			"title":"Sharing my Java code: O(n) time, O(1) space",
			"vote":"65",
			"content":"Traverse one pass with two pointers, from two sides to the middle.\\n\\n\\n    public int trap(int[] A) {\\n        if (A.length < 3) return 0;\\n        \\n        int ans = 0;\\n        int l = 0, r = A.length - 1;\\n        \\n        // find the left and right edge which can hold water\\n        while (l < r && A[l] <= A[l + 1]) l++;\\n        while (l < r && A[r] <= A[r - 1]) r--;\\n        \\n        while (l < r) {\\n            int left = A[l];\\n            int right = A[r];\\n            if (left <= right) {\\n                // add volum until an edge larger than the left edge\\n                while (l < r && left >= A[++l]) {\\n                    ans += left - A[l];\\n                }\\n            } else {\\n                // add volum until an edge larger than the right volum\\n                while (l < r && A[--r] <= right) {\\n                    ans += right - A[r];\\n                }\\n            }\\n        }\\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"17564",
			"view":"4332",
			"top":"5",
			"title":"JAVA 10 lines accepted code, O(n) time, O(1) space. Is there a better solution?",
			"vote":"36",
			"content":"Basically this solution runs two pointers from two sides to the middle, and the plank is used to record the height of the elevation within a certain range, **plank height can only increase (or remain the same) from two sides to the middle**. If the current pointer is pointing at a number that is less than the current plank height, the difference between plank height and the number would be the amount of water trapped. Otherwise, A[i] == plank, no water is trapped. \\n\\n    public class Solution {\\n        public int trap(int[] A) {\\n            int i = 0, j = A.length - 1, result = 0, plank = 0;\\n            while(i <= j){\\n                plank = plank < Math.min(A[i], A[j]) ? Math.min(A[i], A[j]) : plank;\\n                result = A[i] >= A[j] ? result + (plank - A[j--]) : result + (plank - A[i++]);\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"17526",
			"view":"2727",
			"top":"6",
			"title":"Very Concise Java Solution No Stack with Explanations",
			"vote":"34",
			"content":"The idea is very simple. Begin scan from beginning and end of array. Compare value of left and right pointer, hold the greater one and move the other to inner array. Compute passed area when pointer gets inner.\\n\\n    public int trap(int[] height) {\\n\\t\\tint secHight = 0;\\n\\t\\tint left = 0;\\n\\t\\tint right = height.length - 1;\\n\\t\\tint area = 0;\\n\\t\\twhile (left < right) {\\n\\t\\t\\tif (height[left] < height[right]) {\\n\\t\\t\\t\\tsecHight = Math.max(height[left], secHight);\\n\\t\\t\\t\\tarea += secHight - height[left];\\n\\t\\t\\t\\tleft++;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tsecHight = Math.max(height[right], secHight);\\n\\t\\t\\t\\tarea += secHight - height[right];\\n\\t\\t\\t\\tright--;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn area;\\n\\t}"
		},
		{
			"lc_ans_id":"17395",
			"view":"3189",
			"top":"7",
			"title":"A different O(n) approach - easy to understand and simple code",
			"vote":"30",
			"content":"    class Solution {\\n    public:\\n        int trap(int a[], int n) {\\n            int i, res = 0;\\n            if(!n) return res;\\n            vector<int> ltr(n, 0), rtl(n, 0);\\n            for(i = 1, ltr[0] = a[0]; i < n; i++)\\n                ltr[i] = max(ltr[i-1], a[i]);\\n            for(i = n - 2, rtl[n-1] = a[n-1]; i >= 0; i--)\\n                rtl[i] = max(rtl[i+1], a[i]);\\n            for(i = 0; i < n; i++)\\n                res += min(ltr[i], rtl[i]) - a[i];\\n            return res;\\n        }\\n    };\\n\\nobservation:\\n\\nscan A both from left to right and right to left, record the largest seen during the scan; then for each position the water level should be the min of the 2 large value."
		},
		{
			"lc_ans_id":"17527",
			"view":"2163",
			"top":"8",
			"title":"My Accepted Java Solution",
			"vote":"22",
			"content":"    public class Solution {\\n    public int trap(int[] height) {\\n        if (height.length <= 2) return 0;\\n        int max = Integer.MIN_VALUE;\\n        int maxIndex = -1;\\n        for (int i = 0; i < height.length; i++) {\\n            if (height[i] > max) {\\n                max = height[i];\\n                maxIndex = i;\\n            }\\n        }\\n        \\n        int leftMax = height[0];\\n        int water = 0;\\n        for (int i = 1; i < maxIndex; i++) {\\n            if (height[i] > leftMax) {\\n                leftMax = height[i];\\n            } else {\\n                water += leftMax - height[i];\\n            }\\n        }\\n        \\n        int rightMax = height[height.length - 1];\\n        for (int i = height.length - 2; i > maxIndex; i--) {\\n            if (height[i] > rightMax) {\\n                rightMax = height[i];\\n            } else {\\n                water += rightMax - height[i];\\n            }\\n        }\\n        \\n        return water;\\n    }\\n}"
		},
		{
			"lc_ans_id":"17559",
			"view":"2248",
			"top":"9",
			"title":"My solution----inspired by 2 sum",
			"vote":"17",
			"content":"This code looks like O(n) algorithm of the question 2 sum:    \\n\\n    int trap(int A[], int n) {\\n        if (n == 0) return 0;\\n        int l = 0, r = n - 1;\\n        int lv = A[l], rv = A[r];\\n        int total = A[l] + A[r], rainTotal = total;\\n        while (l != r)\\n        {\\n            if (A[l] < A[r])\\n            {\\n                l++;\\n                total += A[l];\\n                lv = max(lv, A[l]);\\n                rainTotal += lv;\\n            }\\n            else\\n            {\\n                r--;\\n                total += A[r];\\n                rv = max(rv, A[r]);\\n                rainTotal += rv;\\n            }\\n        }\\n        return rainTotal - total;\\n    }\\n\\n \\nlv is A[0...l]'s max value, rv is A[r...n-1]'s max value.\\n rainTotal is the total volume after raining, total is Sigma(A[0...n-1])"
		}
	],
	"id":"42",
	"title":"Trapping Rain Water",
	"content":"<p>\r\nGiven <i>n</i> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining. \r\n</p>\r\n\r\n<p>\r\nFor example, <br />\r\nGiven <code>[0,1,0,2,1,0,1,3,2,1,2,1]</code>, return <code>6</code>.\r\n</p>\r\n\r\n<p>\r\n<img src=\"/static/images/problemset/rainwatertrap.png\" /><br />\r\n<p style=\"font-size: 11px\">The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. <b>Thanks Marcos</b> for contributing this image!</p>",
	"frequency":"580",
	"ac_num":"148154"
}