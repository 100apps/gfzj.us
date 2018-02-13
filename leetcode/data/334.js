{
	"difficulty":"2",
	"submit_num":"134674",
	"show_id":"334",
	"leetcode_id":"334",
	"answers":[
		{
			"lc_ans_id":"78993",
			"view":"18178",
			"top":"0",
			"title":"Clean and short, with comments, C++",
			"vote":"163",
			"content":"    bool increasingTriplet(vector<int>& nums) {\\n        int c1 = INT_MAX, c2 = INT_MAX;\\n        for (int x : nums) {\\n            if (x <= c1) {\\n                c1 = x;           // c1 is min seen so far (it's a candidate for 1st element)\\n            } else if (x <= c2) { // here when x > c1, i.e. x might be either c2 or c3\\n                c2 = x;           // x is better than the current c2, store it\\n            } else {              // here when we have/had c1 < c2 already and x > c2\\n                return true;      // the increasing subsequence of 3 elements exists\\n            }\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"79004",
			"view":"15693",
			"top":"1",
			"title":"Concise Java solution with comments.",
			"vote":"154",
			"content":"       public boolean increasingTriplet(int[] nums) {\\n            // start with two largest values, as soon as we find a number bigger than both, while both have been updated, return true.\\n            int small = Integer.MAX_VALUE, big = Integer.MAX_VALUE;\\n            for (int n : nums) {\\n                if (n <= small) { small = n; } // update small if n is smaller than both\\n                else if (n <= big) { big = n; } // update big only if greater than small but smaller than big\\n                else return true; // return if you find a number bigger than both\\n            }\\n            return false;\\n        }"
		},
		{
			"lc_ans_id":"79000",
			"view":"9583",
			"top":"2",
			"title":"My accepted JAVA solution for this question, only 7-lines, clear and concise.",
			"vote":"51",
			"content":"The main idea is keep two values when check all elements in the array: the minimum value *min* until now and the second minimum value *secondMin* from the minimum value's position until now. Then if we can find the third one that larger than those two values at the same time, it must exists the triplet subsequence and return true.\\n\\nWhat need to be careful is: we need to include the condition that some value has the same value with minimum number, otherwise this condition will cause the secondMin change its value.\\n\\n    public class Solution {\\n        public boolean increasingTriplet(int[] nums) {\\n            int min = Integer.MAX_VALUE, secondMin = Integer.MAX_VALUE;\\n            for(int num : nums){\\n                if(num <= min) min = num;\\n                else if(num < secondMin) secondMin = num;\\n                else if(num > secondMin) return true;\\n            }\\n            return false;\\n        }\\n    }\\n\\n\\nThe running time complexity is O(n)."
		},
		{
			"lc_ans_id":"78995",
			"view":"4192",
			"top":"3",
			"title":"Python Easy O(n) Solution",
			"vote":"37",
			"content":"Start with the maximum numbers for the first and second element. Then:\\n(1) Find the first smallest number in the 3 subsequence\\n(2) Find the second one greater than the first element, reset the first one if it's smaller\\n\\n    def increasingTriplet(nums):\\n        first = second = float('inf')\\n        for n in nums:\\n            if n <= first:\\n                first = n\\n            elif n <= second:\\n                second = n\\n            else:\\n                return True\\n        return False"
		},
		{
			"lc_ans_id":"79002",
			"view":"4252",
			"top":"4",
			"title":"Simple Java Solution...Easy to understand!!!!",
			"vote":"25",
			"content":"    public class Solution {\\n        public boolean increasingTriplet(int[] nums) {\\n            if (nums ==  null || nums.length < 3 ){\\n                return false;\\n            }\\n            int min = Integer.MAX_VALUE;\\n            int secondMin = Integer.MAX_VALUE;\\n            \\n            for (int i = 0; i < nums.length; i++){\\n                if (nums[i] <= min){\\n                    min = nums[i];\\n                }\\n                else if (nums[i] <= secondMin){\\n                    secondMin = nums[i];\\n                }\\n                else {\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"79114",
			"view":"1955",
			"top":"5",
			"title":"*Java* 7 lines, O(n) time and O(1) space",
			"vote":"15",
			"content":"Key idea: use two variables to store the value with increasing subsequence of length 1 and length 2, respectively. Keep updating the two variables if we get to a smaller candidate ending up with the same length.\\n\\n    public boolean increasingTriplet(int[] nums) {\\n        int length1EndHere = 0x7fffffff, length2EndHere = 0x7fffffff;\\n        for(int i=0, N=nums.length; i<N; i++) {\\n            if(nums[i] > length2EndHere) return true;\\n            else if(nums[i] > length1EndHere) length2EndHere = Math.min(nums[i], length2EndHere);\\n            else length1EndHere = nums[i];\\n        }\\n        return false;\\n    }\\n\\nIf you are interested in my other posts, please feel free to check my Github page here: [https://github.com/F-L-A-G/Algorithms-in-Java][1]\\n\\n\\n  [1]: https://github.com/F-L-A-G/Algorithms-in-Java"
		},
		{
			"lc_ans_id":"79071",
			"view":"1456",
			"top":"6",
			"title":"Clean Java Solution with Clear Explanation",
			"vote":"12",
			"content":"Assume we found one number A and another number B that is larger than A. If we could find a third number C that is larger than B, we can return a true. So the problem becomes how to update A and B to make them ready for C to be discovered.\\n\\nNow the process becomes simple and clear, keep updating A to be the minimum value ever visited and keep B being the smallest value that is larger than A. Once C > B is encountered, return true;\\n\\n    public boolean increasingTriplet(int[] nums) {\\n\\t\\tint first = Integer.MAX_VALUE;\\n\\t\\tint second = Integer.MAX_VALUE;\\n\\n\\t\\tfor (int n : nums) {\\n\\t\\t\\tif (n <= first) {\\n\\t\\t\\t\\tfirst = n;\\n\\t\\t\\t} else if (n <= second) {\\n\\t\\t\\t\\tsecond = n;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\treturn true;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn false;\\n\\t}"
		},
		{
			"lc_ans_id":"79070",
			"view":"1575",
			"top":"7",
			"title":"My C++ O(n) solution",
			"vote":"11",
			"content":"  \\n\\n    class Solution {\\n        public:\\n            bool increasingTriplet(const vector<int>& nums) {\\n                int min = INT_MAX;\\n                int mid = INT_MAX;\\n                for(auto n : nums)\\n                {\\n                    if(n < min)\\n                    {\\n                        min = n;\\n                    }\\n                    else if(n > min)\\n                    {\\n                        if(mid < n)\\n                            return true;\\n                        mid = n;\\n                    }\\n                }\\n                return false;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"79097",
			"view":"857",
			"top":"8",
			"title":"Sharing a simple C solution, only 4 ms",
			"vote":"9",
			"content":"\\nbool increasingTriplet(int* nums, int numsSize) {\\n\\n    if (numsSize < 3) return false;\\n    int l = nums[0], m = 0x7fffffff;\\n    for (int i = 1; i < numsSize; i++) {\\n        int a = nums[i];\\n        if (a <= l) l = a;\\n        else if (a < m) m = a;\\n        else if (a > m) return true;\\n    }\\n    return false;\\n\\n}"
		},
		{
			"lc_ans_id":"78997",
			"view":"2479",
			"top":"9",
			"title":"Generalization in Python",
			"vote":"9",
			"content":"Hardcoded for k=3:\\n---\\n\\nUsing [**EAFP**](https://docs.python.org/2/glossary.html#term-eafp) (easier to ask for forgiveness than permission):\\n\\n    def increasingTriplet(self, nums):\\n        try:\\n            inc = [float('inf')] * 2\\n            for x in nums:\\n                inc[bisect.bisect_left(inc, x)] = x\\n            return False\\n        except:\\n            return True\\n\\nUsing [**LBYL**](https://docs.python.org/2/glossary.html#term-lbyl) (look before you leap):\\n\\n    def increasingTriplet(self, nums):\\n        inc = [float('inf')] * 2\\n        for x in nums:\\n            i = bisect.bisect_left(inc, x)\\n            if i >= 2:\\n                return True\\n            inc[i] = x\\n        return False\\n\\n---\\n\\nFor any k >= 0:\\n---\\n\\nUsing [**EAFP**](https://docs.python.org/2/glossary.html#term-eafp) (easier to ask for forgiveness than permission):\\n\\n    def increasingSubsequence(self, nums, k):\\n        try:\\n            inc = [float('inf')] * (k - 1)\\n            for x in nums:\\n                inc[bisect.bisect_left(inc, x)] = x\\n            return k == 0\\n        except:\\n            return True\\n\\nUsing [**LBYL**](https://docs.python.org/2/glossary.html#term-lbyl) (look before you leap):\\n\\n    def increasingSubsequence(self, nums, k):\\n        inc = [float('inf')] * (k - 1)\\n        for x in nums:\\n            i = bisect.bisect_left(inc, x)\\n            if i >= k - 1:\\n                return True\\n            inc[i] = x\\n        return k == 0"
		}
	],
	"id":"334",
	"title":"Increasing Triplet Subsequence",
	"content":"<p>\r\nGiven an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.\r\n</p>\r\n<p>\r\nFormally the function should:<br />\r\n<blockquote>Return true if there exists <i>i, j, k </i> <br>\r\nsuch that <i>arr[i]</i> &lt; <i>arr[j]</i> &lt; <i>arr[k]</i> given 0 &le; <i>i</i> &lt; <i>j</i> &lt; <i>k</i> &le; <i>n</i>-1 </i>\r\nelse return false.\r\n</blockquote>\r\n</p>\r\n<p>\r\nYour algorithm should run in O(<i>n</i>) time complexity and O(<i>1</i>) space complexity.\r\n</p>\r\n<p>\r\n<b>Examples:</b><br />\r\nGiven <code>[1, 2, 3, 4, 5]</code>,<br />\r\nreturn <code>true</code>.\r\n</p>\r\n<p>\r\nGiven <code>[5, 4, 3, 2, 1]</code>,<br />\r\nreturn <code>false</code>.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/DjangoUnchained\">@DjangoUnchained</a> for adding this problem and creating all test cases.</p>",
	"frequency":"358",
	"ac_num":"53913"
}