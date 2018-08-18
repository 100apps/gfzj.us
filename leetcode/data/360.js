{
	"difficulty":"2",
	"submit_num":"34189",
	"show_id":"360",
	"leetcode_id":"360",
	"answers":[
		{
			"lc_ans_id":"83322",
			"view":"14557",
			"top":"0",
			"title":"Java O(n) incredibly short yet easy to understand AC solution",
			"vote":"111",
			"content":"the problem seems to have many cases a>0, a=0,a<0, (when a=0, b>0, b<0). However, they can be combined into just 2 cases: a>0 or a<0\\n\\n1.a>0, two ends in original array are bigger than center if you learned middle school math before.\\n\\n2.a<0, center is bigger than two ends.\\n\\nso use two pointers i, j and do a merge-sort like process. depending on sign of a, you may want to start from the beginning or end of the transformed array. For a==0 case, it does not matter what b's sign is.\\nThe function is monotonically increasing or decreasing. you can start with either beginning or end.\\n\\n\\n\\n    public class Solution {\\n        public int[] sortTransformedArray(int[] nums, int a, int b, int c) {\\n            int n = nums.length;\\n            int[] sorted = new int[n];\\n            int i = 0, j = n - 1;\\n            int index = a >= 0 ? n - 1 : 0;\\n            while (i <= j) {\\n                if (a >= 0) {\\n                    sorted[index--] = quad(nums[i], a, b, c) >= quad(nums[j], a, b, c) ? quad(nums[i++], a, b, c) : quad(nums[j--], a, b, c);\\n                } else {\\n                    sorted[index++] = quad(nums[i], a, b, c) >= quad(nums[j], a, b, c) ? quad(nums[j--], a, b, c) : quad(nums[i++], a, b, c);\\n                }\\n            }\\n            return sorted;\\n        }\\n        \\n        private int quad(int x, int a, int b, int c) {\\n            return a * x * x + b * x + c;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83317",
			"view":"3922",
			"top":"1",
			"title":"My easy to understand Java AC solution using Two pointers",
			"vote":"14",
			"content":"The idea is simple: \\nFor a parabola, \\nif a >= 0, the min value is at its vertex. So our our sorting should goes from two end points towards the vertex, high to low.\\nif a < 0, the max value is at its vertex. So our sort goes the opposite way.\\n\\n```\\npublic class Solution {\\n    public int[] sortTransformedArray(int[] nums, int a, int b, int c) {\\n        int[] res = new int[nums.length];\\n        int start = 0;\\n        int end = nums.length - 1;\\n        int i = a >= 0 ? nums.length - 1 : 0;\\n        while(start <= end) {\\n            int startNum = getNum(nums[start], a, b, c);\\n            int endNum = getNum(nums[end], a, b, c);\\n            if(a >= 0) {\\n                if(startNum >= endNum) {\\n                    res[i--] = startNum;\\n                    start++;\\n                }\\n                else{\\n                    res[i--] = endNum;\\n                    end--;\\n                }\\n            }\\n            else{\\n                if(startNum <= endNum) {\\n                    res[i++] = startNum;\\n                    start++;\\n                }\\n                else{\\n                    res[i++] = endNum;\\n                    end--;\\n                }\\n            }\\n        }\\n        return res;\\n    }\\n    public int getNum(int x, int a, int b, int c) {\\n        return a * x * x + b * x + c;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"83331",
			"view":"1360",
			"top":"2",
			"title":"Python O(n) Two-Pointers Solution",
			"vote":"9",
			"content":"*d* is the increment of *i*.\\n\\n    def sortTransformedArray(self, nums, a, b, c):\\n        nums = [x*x*a + x*b + c for x in nums]\\n        ret = [0] * len(nums)\\n        p1, p2 = 0, len(nums) - 1\\n        i, d = (p1, 1) if a < 0 else (p2, -1)\\n        while p1 <= p2:\\n            if nums[p1] * -d > nums[p2] * -d:\\n                ret[i] = nums[p1]\\n                p1 += 1\\n            else:\\n                ret[i] = nums[p2]\\n                p2 -=1\\n            i += d\\n        return ret"
		},
		{
			"lc_ans_id":"83320",
			"view":"2536",
			"top":"3",
			"title":"Python one-liner",
			"vote":"5",
			"content":"Because the input is sorted and the function is a second degree polynomial, simply applying the function will result in at most two increasing/decreasing runs. Which [Python's sort function](https://en.wikipedia.org/wiki/Timsort) will recognize and simply reverse/merge in O(n).\\n\\n    def sortTransformedArray(self, nums, a, b, c):\\n        return sorted(a*x*x + b*x + c for x in nums)"
		},
		{
			"lc_ans_id":"83370",
			"view":"4145",
			"top":"4",
			"title":"Simple and concise O(n) solution",
			"vote":"5",
			"content":"ax<sup>2</sup>+bx+c = a(x + b/2a)<sup>2</sup> + c - b<sup>2</sup>/4a</p>\\n\\nSo use offset as **c - b<sup>2</sup>/4a</p>**\\n\\n**ax<sup>2</sup>+bx+c - offset** will be always positive or negative\\n\\nThen iteratively pop max (or min if a is negative) from both ends and push it into final array\\n\\n    function sortTransformedArray(nums, a, b, c) {\\n        var arr = nums.map(n => a * n * n + b * n + c);\\n        var offset = a ? c - (b * b) / (4 * a) : Math.min(arr[0], arr.slice(-1)[0]);\\n        var res = [];\\n    \\n        for (var l = 0, r = arr.length - 1; l <= r;) {\\n            if (Math.abs(arr[l] - offset) >= Math.abs(arr[r] - offset)) {\\n                res.push(arr[l++]);\\n            } else {\\n                res.push(arr[r--]);\\n            }\\n        }\\n    \\n        return res[0] > res[res.length - 1] ? res.reverse() : res;\\n    }"
		},
		{
			"lc_ans_id":"83366",
			"view":"1455",
			"top":"5",
			"title":"C++ solution 8ms",
			"vote":"3",
			"content":"    class Solution {\\n        public:\\n            vector<int> sortTransformedArray(vector<int>& nums, int a, int b, int c) {\\n                vector<int> res(nums.size());\\n                if (nums.size() == 0) return res;\\n                int i = 0, j = nums.size() - 1;\\n                if (a > 0) {\\n                    int index = nums.size() - 1;\\n                    while (i <= j) {\\n                        if (transform(nums[i], a, b, c) > transform(nums[j], a, b, c)) {\\n                            res[index--] = transform(nums[i], a, b, c);\\n                            i++;\\n                        } else {\\n                            res[index--] = transform(nums[j], a, b, c);\\n                            j--;\\n                        }\\n                    }\\n                } else {\\n                    int index = 0;\\n                    while (i <= j) {\\n                        if (transform(nums[i], a, b, c) < transform(nums[j], a, b, c)) {\\n                            res[index++] = transform(nums[i], a, b, c);\\n                            i++;\\n                        } else {\\n                            res[index++] = transform(nums[j], a, b, c);\\n                            j--;\\n                        }\\n                    }\\n                }\\n                return res;\\n            }\\n    \\n            int transform(int num, int a, int b, int c) {\\n                return a * num * num + b * num + c;\\n            }\\n    };"
		},
		{
			"lc_ans_id":"83347",
			"view":"298",
			"top":"6",
			"title":"Very clear method , using basic property of parabola and linear function, beats 98%.",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def sortTransformedArray(self, nums, a, b, c):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type a: int\\n        :type b: int\\n        :type c: int\\n        :rtype: List[int]\\n        \"\"\"\\n        \\n        res = []\\n        l, r = 0 , len(nums) - 1\\n        \\n        if a == 0:      # if a == 0, the objective function is monotone linear function .\\n           res = [b * i + c for i in nums]\\n           return res if b > 0 else res[::-1]    \\n        \\n        else:  # the function is a Quadratic function\\n           axis = float(-b) / (2 * a)  # the axis of symmetry\\n           while l <= r:\\n                x1 , x2 = nums[l] , nums[r]\\n                if abs(x1 - axis) >= abs(x2 - axis):  # each time choose the either leftmost element or rightmost element\\n                    res += [int(a * x1 ** 2 + b * x1 + c)]\\n                    l += 1\\n                else:\\n                    res += [int(a * x2 ** 2 + b * x2 + c)]\\n                    r -= 1\\n                \\n           return res if a < 0 else res[::-1]"
		},
		{
			"lc_ans_id":"83371",
			"view":"396",
			"top":"7",
			"title":"My solution with some optimization",
			"vote":"2",
			"content":"This is a kind of long solution, but the idea is to boost the running time by some optimization. There are 4 cases:\\n\\n 1. a, b, c are all zero, return an array with zeros.\\n 2. a, b are zero, return an array with c.\\n 3. a is zero, apply linear equation on input.\\n 4. a is not zero, apply quadratic equation on input.\\n\\nBy dealing with each case separately, we can get rid of the unnecessary multiplication operations given the input. Another minor 2 optimizations are:\\n\\n 1. when using the 2 pointer approach to fill in the output array, calculate f(x) only once for each x;\\n 2. use f(x) = x * (a * x + b) + c, instead of f(x) = a * x * x + b * x + c; you can reduce one multiplication operation per function call.\\n\\nThanks.\\n\\n\\n\\n    public class Solution {\\n        public int[] sortTransformedArray(int[] nums, int a, int b, int c) {\\n            int n = nums.length;\\n            int [] ret = new int[n];\\n            \\n            if (a == 0 && b == 0 && c == 0) {\\n                Arrays.fill(ret, 0);\\n            } else if (a == 0 && b == 0) {\\n                Arrays.fill(ret, c);\\n            } else if (a == 0) {\\n                for (int i = 0; i < n; i++) {\\n                    int fx = b * nums[i] + c;\\n                    if (b > 0) {\\n                        ret[i] = fx;\\n                    } else {\\n                        ret[n - i - 1] = fx;\\n                    }\\n                }\\n            } else {\\n                int l = 0;\\n                int r = n - 1;\\n                int valL = f(nums[l], a, b, c);\\n                int valR = f(nums[r], a, b, c);\\n                \\n                if (a > 0) {\\n                    int index = n - 1;\\n                    while (l < r) {\\n                        if (valL < valR) {\\n                            ret[index--] = valR;\\n                            r--;\\n                            valR = f(nums[r], a, b, c);\\n                        } else {\\n                            ret[index--] = valL;\\n                            l++;\\n                            valL = f(nums[l], a, b, c);\\n                        }\\n                    }\\n                    ret[index] = f(nums[l], a, b, c);\\n                } else {\\n                    int index = 0;\\n                    while (l < r) {\\n                        if (valL < valR) {\\n                            ret[index++] = valL;\\n                            l++;\\n                            valL = f(nums[l], a, b, c);\\n                        } else {\\n                            ret[index++] = valR;\\n                            r--;\\n                            valR = f(nums[r], a, b, c);\\n                        }\\n                    }\\n                    ret[index] = f(nums[l], a, b, c);\\n                }\\n            }\\n            return ret;\\n        }\\n        \\n        private int f(int x, int a, int b, int c) {\\n            return x * (a * x + b) + c;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83380",
			"view":"487",
			"top":"8",
			"title":"O(n) Solution using JAVA",
			"vote":"2",
			"content":"It is parabolic relation. After convert nums to a*x^2 + bx + c. If a > 0, there will be bottom in the arr; if a < 0, there it top in the arr. Find the bottom or top then go left and right.\\n\\n    public class Solution {\\n        public int[] sortTransformedArray(int[] nums, int a, int b, int c) {\\n            int n = nums.length;\\n            int[] arr = new int[n];\\n            for (int i = 0; i < n; i++) arr[i] = a * nums[i] * nums[i] + b * nums[i] + c;\\n            if (n <= 1) return arr;\\n            if (a == 0) {\\n                if (b >= 0) return arr;\\n                else return reverse(arr);\\n            }\\n            double bottom = (double)-b / (2 * a);\\n            int lo = 0, hi = n - 1; //binary search to find low/top point\\n            while (lo <= hi) {\\n                int mid = lo + (hi - lo) / 2;\\n                if (nums[mid] <= bottom) lo = mid + 1;\\n                else hi = mid - 1;\\n            }\\n            if (hi == n - 1) return a > 0? reverse(arr) : arr;\\n            if (hi == -1) return a > 0? arr : reverse(arr);\\n            int i = hi, j = lo;\\n            int[] res = new int[n];\\n            if (a > 0) {\\n                int k = 0;\\n                while (i >= 0 || j < n) {\\n                    if (i < 0) res[k++] = arr[j++];\\n                    else if (j >= n) res[k++] = arr[i--];\\n                    else if (arr[i] < arr[j]) res[k++] = arr[i--];\\n                    else res[k++] = arr[j++];\\n                }\\n            }\\n            else {\\n                int k = n - 1;\\n                while (i >= 0 || j < n) {\\n                    if (i < 0) res[k--] = arr[j++];\\n                    else if (j >= n) res[k--] = arr[i--];\\n                    else if (arr[i] > arr[j]) res[k--] = arr[i--];\\n                    else res[k--] = arr[j++];\\n                }\\n            }\\n            return res;\\n        }\\n        \\n        private int[] reverse(int[] nums) {\\n            int i = 0, j = nums.length - 1;\\n            while (i < j) {\\n                int temp = nums[i];\\n                nums[i] = nums[j];\\n                nums[j] = temp;\\n                i++;\\n                j--;\\n            }\\n            return nums;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83352",
			"view":"330",
			"top":"9",
			"title":"Clean python solution with two pointers and merge",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def sortTransformedArray(self, nums, a, b, c):\\n\\n        def f(x): return a*x*x + b*x + c\\n            \\n        res = []\\n        low, high = 0, len(nums)-1\\n        \\n        while low <= high:\\n            f_low, f_high = f(nums[low]), f(nums[high])\\n            if (a > 0) ^ (f_low > f_high):\\n                res.append(f_high)\\n                high -= 1\\n            else:\\n                res.append(f_low)\\n                low += 1\\n        return res[::-1] if a > 0 else res\\n                \\n```\\n\\nThe solution combine the case where `a==0` or `b==0` into the else condition."
		}
	],
	"id":"360",
	"title":"Sort Transformed Array",
	"content":"<p>\r\nGiven a <b>sorted</b> array of integers <i>nums</i> and integer values <i>a</i>, <i>b</i> and <i>c</i>.  Apply a quadratic function of the form f(<i>x</i>) = <i>ax</i><sup>2</sup> + <i>bx</i> + <i>c</i> to each element <i>x</i> in the array. </p>\r\n\r\n<p>The returned array must be in <b>sorted order</b>.</p>\r\n\r\n<p>Expected time complexity: <b>O(<i>n</i>)</b></p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\nnums = [-4, -2, 2, 4], a = 1, b = 3, c = 5,\r\n\r\nResult: [3, 9, 15, 33]\r\n\r\nnums = [-4, -2, 2, 4], a = -1, b = 3, c = 5\r\n\r\nResult: [-23, -5, 1, 7]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/elmirap\">@elmirap</a> for adding this problem and creating all test cases.</p>",
	"frequency":"134",
	"ac_num":"15308"
}