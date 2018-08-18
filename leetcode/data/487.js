{
	"difficulty":"1",
	"submit_num":"84411",
	"show_id":"496",
	"leetcode_id":"496",
	"answers":[
		{
			"lc_ans_id":"97595",
			"view":"35189",
			"top":"0",
			"title":"Java 10 lines linear time complexity O(n) with explanation",
			"vote":"229",
			"content":"Key observation:\\nSuppose we have a decreasing sequence followed by a greater number\\nFor example ```[5, 4, 3, 2, 1, 6]``` then the greater number ```6``` is the next greater element for all previous numbers in the sequence\\n\\nWe use a stack to keep a **decreasing** sub-sequence, whenever we see a number ```x``` greater than ```stack.peek()``` we pop all elements less than ```x``` and for all the popped ones, their next greater element is ```x```\\nFor example ```[9, 8, 7, 3, 2, 1, 6]```\\nThe stack will first contain ```[9, 8, 7, 3, 2, 1]``` and then we see ```6``` which is greater than ```1``` so we pop ```1 2 3``` whose next greater element should be ```6```\\n```\\n    public int[] nextGreaterElement(int[] findNums, int[] nums) {\\n        Map<Integer, Integer> map = new HashMap<>(); // map from x to next greater element of x\\n        Stack<Integer> stack = new Stack<>();\\n        for (int num : nums) {\\n            while (!stack.isEmpty() && stack.peek() < num)\\n                map.put(stack.pop(), num);\\n            stack.push(num);\\n        }   \\n        for (int i = 0; i < findNums.length; i++)\\n            findNums[i] = map.getOrDefault(findNums[i], -1);\\n        return findNums;\\n    }\\n```"
		},
		{
			"lc_ans_id":"97613",
			"view":"9150",
			"top":"1",
			"title":"C++ stack + unordered_map",
			"vote":"51",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<int> nextGreaterElement(vector<int>& findNums, vector<int>& nums) {\\n        stack<int> s;\\n        unordered_map<int, int> m;\\n        for (int n : nums) {\\n            while (s.size() && s.top() < n) {\\n                m[s.top()] = n;\\n                s.pop();\\n            }\\n            s.push(n);\\n        }\\n        vector<int> ans;\\n        for (int n : findNums) ans.push_back(m.count(n) ? m[n] : -1);\\n        return ans;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"97616",
			"view":"5613",
			"top":"2",
			"title":"Meh, 1000 is small",
			"vote":"25",
			"content":"    def nextGreaterElement(self, findNums, nums):\\n        return [next((y for y in nums[nums.index(x):] if y > x), -1) for x in findNums]"
		},
		{
			"lc_ans_id":"97604",
			"view":"8952",
			"top":"3",
			"title":"Python Solution with O(n)",
			"vote":"22",
			"content":"```\\n        d = {}\\n        st = []\\n        ans = []\\n        \\n        for x in nums:\\n            while len(st) and st[-1] < x:\\n                d[st.pop()] = x\\n            st.append(x)\\n\\n        for x in findNums:\\n            ans.append(d.get(x, -1))\\n            \\n        return ans\\n```"
		},
		{
			"lc_ans_id":"97594",
			"view":"2440",
			"top":"4",
			"title":"Whys is it -1 for findNums[2] = 2 instead of 4.",
			"vote":"18",
			"content":"Input: nums1 = [4,1,2], nums2 = [1,3,4,2].\\nOutput: [-1,3,-1]\\n\\nin the above test case why is the result for findNums[2] = -1. Considering the third value is 2 and its corresponding nums value is 4 which is larger than it. So shouldn't the answer be [-1,3,4]"
		},
		{
			"lc_ans_id":"97620",
			"view":"2688",
			"top":"5",
			"title":"Python solution with detailed explanation",
			"vote":"9",
			"content":"**Solution**\\n\\n**Next Greater Element I** https://leetcode.com/problems/next-greater-element-i/\\n\\n**Algorithm**\\n* https://discuss.leetcode.com/topic/77916/java-10-lines-linear-time-complexity-o-n-with-explanation\\n* Suppose we have a decreasing sequence followed by a greater number. For example [5, 4, 3, 2, 1, 6] then the greater number 6 is the next greater element for all previous numbers in the sequence.\\n* We use a stack to keep a decreasing sub-sequence, whenever we see a number x greater than stack.peek() we pop all elements less than x and for all the popped ones, their next greater element is x.\\n* For example [9, 8, 7, 3, 2, 1, 6]. The stack will first contain [9, 8, 7, 3, 2, 1] and then we see 6 which is greater than 1 so we pop 1 2 3 whose next greater element should be 6.\\n\\n```\\nclass Solution(object):\\n    def nextGreaterElement(self, findNums, nums):\\n        \"\"\"\\n        :type findNums: List[int]\\n        :type nums: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        cache, st = {}, []\\n        for x in nums:\\n            if len(st) == 0:\\n                st.append(x)\\n            elif x <= st[-1]:\\n                st.append(x)\\n            else:\\n                while st and st[-1] < x:\\n                    cache[st.pop()] = x\\n                st.append(x)\\n        result = []\\n        for x in findNums:\\n            if x in cache:\\n                result.append(cache[x])\\n            else:\\n                result.append(-1)\\n        return result\\n```\\n\\n\\n**Condensed Code**\\n```\\nclass Solution(object):\\n    def nextGreaterElement(self, findNums, nums):\\n        \"\"\"\\n        :type findNums: List[int]\\n        :type nums: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        cache, st = {}, []\\n        for x in nums:\\n            while st and st[-1] < x:\\n                cache[st.pop()] = x\\n            st.append(x)\\n        result = [-1]*len(findNums)\\n        for idx,x in enumerate(findNums):\\n            if x in cache:\\n                result[idx] = cache[x]\\n        return result\\n```"
		},
		{
			"lc_ans_id":"97648",
			"view":"4300",
			"top":"6",
			"title":"Simple O(m + n) java solution using stack",
			"vote":"8",
			"content":"```\\npublic class Solution {\\n    public int[] nextGreaterElement(int[] findNums, int[] nums) {\\n        int[] ret = new int[findNums.length];\\n        ArrayDeque<Integer> stack = new ArrayDeque<>();\\n        HashMap<Integer, Integer> map = new HashMap<>();\\n        for(int i = nums.length - 1; i >= 0; i--) {\\n            while(!stack.isEmpty() && stack.peek() <= nums[i]) {\\n                stack.pop();\\n            }\\n            if(stack.isEmpty()) map.put(nums[i], -1);\\n            else map.put(nums[i], stack.peek());\\n            stack.push(nums[i]);\\n        }\\n        for(int i = 0; i < findNums.length; i++) {\\n            ret[i] = map.get(findNums[i]);\\n        }\\n        return ret;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97596",
			"view":"1111",
			"top":"7",
			"title":"Java O(n) HashMap method, beats 95% currently",
			"vote":"6",
			"content":"    public int[] nextGreaterElement(int[] findNums, int[] nums) {\\n        Map<Integer, Integer> m = new HashMap<>();\\n        // go through each element in nums and set its location in HashMap\\n        for(int i =0;i<nums.length;++i)\\n            m.put(nums[i],i); //since every element is unique, there is no need (getOrDefault)\\n        \\n        //scan each element in the first array    \\n        for(int i=0;i<findNums.length;++i)\\n        {\\n            int minIndex =-1;  //initially, set the finding index to be -1\\n            int index = m.get(findNums[i]); //findout the corresponding index in the second (nums) array.\\n            while(++index < nums.length) \\n            {\\n                if(nums[index]>findNums[i])\\n                {\\n                    minIndex =index;\\n                    break;\\n                }\\n            }\\n            if(minIndex ==-1) findNums[i] = -1;\\n            else findNums[i] = nums[minIndex];\\n        }\\n        return findNums;\\n    }"
		},
		{
			"lc_ans_id":"97654",
			"view":"938",
			"top":"8",
			"title":"Intuitive Javascript Solution",
			"vote":"5",
			"content":"```\\nvar nextGreaterElement = function(findNums, nums) {\\n    return findNums.map(n => {\\n        let found = nums.indexOf(n);\\n        \\n        if (found !== -1) {\\n            // find the next greater element's index\\n            while (nums[++found] < n);\\n            // -1 if not found\\n            if (found >= nums.length) found = -1;\\n            else found = nums[found];\\n        }\\n        \\n        return found;\\n    });\\n};\\n```"
		},
		{
			"lc_ans_id":"97691",
			"view":"340",
			"top":"9",
			"title":"straightforward python solution",
			"vote":"5",
			"content":"```\\n    def nextGreaterElement(self, findNums, nums):\\n        def helper(num):\\n            for tmp in nums[nums.index(num):]:\\n                if tmp > num:\\n                    return tmp\\n            return -1\\n\\n        return map(helper, findNums)\\n```"
		}
	],
	"id":"487",
	"title":"Next Greater Element I",
	"content":"<p>\nYou are given two arrays <b>(without duplicates)</b> <code>nums1</code> and <code>nums2</code> where <code>nums1</code>’s elements are subset of <code>nums2</code>. Find all the next greater numbers for <code>nums1</code>'s elements in the corresponding places of <code>nums2</code>. \n</p>\n\n<p>\nThe Next Greater Number of a number <b>x</b> in <code>nums1</code> is the first greater number to its right in <code>nums2</code>. If it does not exist, output -1 for this number.\n</p>\n\n<p><b>Example 1:</b><br />\n<pre>\n<b>Input:</b> <b>nums1</b> = [4,1,2], <b>nums2</b> = [1,3,4,2].\n<b>Output:</b> [-1,3,-1]\n<b>Explanation:</b>\n    For number 4 in the first array, you cannot find the next greater number for it in the second array, so output -1.\n    For number 1 in the first array, the next greater number for it in the second array is 3.\n    For number 2 in the first array, there is no next greater number for it in the second array, so output -1.\n</pre>\n</p>\n\n<p><b>Example 2:</b><br />\n<pre>\n<b>Input:</b> <b>nums1</b> = [2,4], <b>nums2</b> = [1,2,3,4].\n<b>Output:</b> [3,-1]\n<b>Explanation:</b>\n    For number 2 in the first array, the next greater number for it in the second array is 3.\n    For number 4 in the first array, there is no next greater number for it in the second array, so output -1.\n</pre>\n</p>\n\n\n<p><b>Note:</b><br>\n<ol>\n<li>All elements in <code>nums1</code> and <code>nums2</code> are unique.</li>\n<li>The length of both <code>nums1</code> and <code>nums2</code> would not exceed 1000.</li>\n</ol>\n</p>",
	"frequency":"313",
	"ac_num":"47835"
}