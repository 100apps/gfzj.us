{
	"difficulty":"2",
	"submit_num":"47662",
	"show_id":"503",
	"leetcode_id":"503",
	"answers":[
		{
			"lc_ans_id":"98273",
			"view":"13897",
			"top":"0",
			"title":"Java 10 lines and C++ 12 lines linear time complexity O(n) with explanation",
			"vote":"91",
			"content":"The approach is same as *Next Greater Element I*\\nSee explanation in [my solution to the previous problem](https://discuss.leetcode.com/topic/77916/java-10-lines-linear-time-complexity-o-n-with-explanation)\\nThe only difference here is that we use ```stack``` to keep the **indexes** of the **decreasing** subsequence\\n\\n**Java**\\n```\\n    public int[] nextGreaterElements(int[] nums) {\\n        int n = nums.length, next[] = new int[n];\\n        Arrays.fill(next, -1);\\n        Stack<Integer> stack = new Stack<>(); // index stack\\n        for (int i = 0; i < n * 2; i++) {\\n            int num = nums[i % n]; \\n            while (!stack.isEmpty() && nums[stack.peek()] < num)\\n                next[stack.pop()] = num;\\n            if (i < n) stack.push(i);\\n        }   \\n        return next;\\n    }\\n```\\n**C++**\\n```\\n    vector<int> nextGreaterElements(vector<int>& nums) {\\n        int n = nums.size();\\n        vector<int> next(n, -1);\\n        stack<int> s; // index stack\\n        for (int i = 0; i < n * 2; i++) {\\n            int num = nums[i % n]; \\n            while (!s.empty() && nums[s.top()] < num) {\\n                next[s.top()] = num;\\n                s.pop();\\n            }\\n            if (i < n) s.push(i);\\n        }   \\n        return next;\\n    }\\n```"
		},
		{
			"lc_ans_id":"98262",
			"view":"6589",
			"top":"1",
			"title":"Typical ways to solve circular array problems. Java solution.",
			"vote":"24",
			"content":"The first typical way to solve circular array problems is to extend the original array to twice length, 2nd half has the same element as first half. Then everything become simple.\\nNaive by simple solution, just look for the next greater element directly. Time complexity: O(n^2).\\n```\\npublic class Solution {\\n    public int[] nextGreaterElements(int[] nums) {\\n        int max = Integer.MIN_VALUE;\\n        for (int num : nums) {\\n            max = Math.max(max, num);\\n        }\\n        \\n        int n = nums.length;\\n        int[] result = new int[n];\\n        int[] temp = new int[n * 2];\\n        \\n        for (int i = 0; i < n * 2; i++) {\\n            temp[i] = nums[i % n];\\n        }\\n        \\n        for (int i = 0; i < n; i++) {\\n            result[i] = -1;\\n            if (nums[i] == max) continue;\\n            \\n            for (int j = i + 1; j < n * 2; j++) {\\n                if (temp[j] > nums[i]) {\\n                    result[i] = temp[j];\\n                    break;\\n                }\\n            }\\n        }\\n        \\n        return result;\\n    }\\n}\\n```\\n\\nThe second way is to use a ```stack``` to facilitate the look up. First we put all indexes into the stack, ```smaller``` index on the ```top```. Then we start from ```end``` of the array look for the first element (index) in the stack which is greater than the current one. That one is guaranteed to be the ```Next Greater Element```. Then put the current element (index) into the stack.\\nTime complexity: O(n).\\n```\\npublic class Solution {\\n    public int[] nextGreaterElements(int[] nums) {\\n        int n = nums.length;\\n        int[] result = new int[n];\\n        \\n        Stack<Integer> stack = new Stack<>();\\n        for (int i = n - 1; i >= 0; i--) {\\n            stack.push(i);\\n        }\\n        \\n        for (int i = n - 1; i >= 0; i--) {\\n            result[i] = -1;\\n            while (!stack.isEmpty() && nums[stack.peek()] <= nums[i]) {\\n                stack.pop();\\n            }\\n            if (!stack.isEmpty()){\\n                result[i] = nums[stack.peek()];\\n            }\\n            stack.add(i);\\n        }\\n        \\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98270",
			"view":"2413",
			"top":"2",
			"title":"Python 6 lines solution using stack",
			"vote":"17",
			"content":"```\\ndef nextGreaterElements(self, nums):\\n        stack, res = [], [-1] * len(nums)\\n        for i in range(len(nums)) * 2:\\n            while stack and (nums[stack[-1]] < nums[i]):\\n                res[stack.pop()] = nums[i]\\n            stack.append(i)\\n        return res"
		},
		{
			"lc_ans_id":"98264",
			"view":"1027",
			"top":"3",
			"title":"NO STACK: O(n) time complexity and O(1) space complexity using DP",
			"vote":"7",
			"content":"The idea is to use the array to be returned to store information rather than an extra Stack. We use the array called result to store index of next larger element and replace with actual values before returning it. In first iteration, we move from right to left and find next greater element assuming array to be non-cyclical. Then we do another iteration from right to left. This time, we assume array is cyclical and find next larger element for the elements that do not have next larger element if array is not cyclical. \\n```\\npublic class Solution {\\n    public int[] nextGreaterElements(int[] nums) {\\n\\n        //Case when array is empty\\n        if(nums.length == 0) return nums;\\n      \\n        int[] result = new int[nums.length];\\n\\n        //Assuming array to be non-cyclical, last element does not have next larger element\\n        result[nums.length - 1] = -1;\\n\\n        //Case when only one element is there in array     \\n        if(result.length == 1) return result;\\n\\n        for (int i = nums.length - 2; i >= 0; i--){   \\n            //Starting from next element\\n            int k = i + 1;\\n\\n            //Keep tracking next larger element until you find it or you find element with no next larger element\\n            while(nums[i] >= nums[k] && result[k] != -1){\\n                k = result[k];\\n            }\\n            \\n            //If next larger element is found, store index      \\n            if(nums[k] > nums[i]) result[i] = k;\\n            //If not found, it doesn't have next larger element\\n            else result[i] = -1;\\n        }\\n        \\n        //Second iteration assuming cyclical array, last element can also have next larger element\\n        for (int i = nums.length - 1; i >= 0; i--){   \\n\\n            //If next larger element assuming non-cyclical array already exists, continue\\n            if(result[i] != -1) continue;\\n      \\n            //Case when i + 1 is greater than length of array: when on last element\\n            int k = (i + 1) % nums.length;\\n\\n            //Keep tracking next larger element until you find it or you find element with no next larger element\\n            while(nums[i] >= nums[k] && result[k] != -1){\\n                k = result[k];\\n            }\\n\\n            //If next larger element is found, store it's index\\n            if(nums[k] > nums[i]) result[i] = k;\\n            //If not found, it doesn't have next larger element\\n            else result[i] = -1;\\n        }\\n\\n        //Replace indices with actual values\\n        for(int i = 0; i < nums.length; i++){\\n            if(result[i] != -1) result[i] = nums[result[i]];\\n        }\\n\\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98328",
			"view":"877",
			"top":"4",
			"title":"Python solution with detailed explanation",
			"vote":"3",
			"content":"**Solution with discussion** https://discuss.leetcode.com/topic/78268/python-solution-with-detailed-explanation\\n\\n**Next Greater Element II** https://leetcode.com/problems/next-greater-element-ii/\\n\\n**Algorithm**\\n* **Stack for next greater element**: Suppose we have a decreasing sequence followed by a greater number. For example [5, 4, 3, 2, 1, 6] then the greater number 6 is the next greater element for all previous numbers in the sequence.\\n*  **Handling duplicates in input**: Push the index and value tuple on the stack instead of just the value. This makes sure duplicated elements are correctly handled. Example:[100,1,11,1,120,111,123,1,-1,-100] - we need to have the right answer for both 1s.\\n*  **Handling circular array**: Process it twice. Example: [5,4,3,2,1]. By processing it twice, you are essentially doing: [5,4,3,2,1]+[5,4,3,2,1]. Typical pattern to solve circular array problems is to extend the original array to twice length, 2nd half has the same element as first half. Then everything become simple.\\nhttps://discuss.leetcode.com/topic/77881/typical-way-to-solve-circular-array-problems-java-solution\\n\\n```\\nclass Solution(object):\\n    def nextGreaterElements(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        cache, st = {}, []\\n        for idx,x in enumerate(nums):\\n            while st and st[-1][1] < x:\\n                a,b = st.pop()\\n                cache[a] = x\\n            st.append((idx,x))\\n        for idx,x in enumerate(nums):\\n            while st and st[-1][1] < x:\\n                a,b = st.pop()\\n                cache[a] = x\\n            st.append((idx,x))\\n        result = [-1]*len(nums)\\n        for idx,x in enumerate(nums):\\n            if idx in cache:\\n                result[idx] = cache[idx]\\n        return result        \\n```"
		},
		{
			"lc_ans_id":"98303",
			"view":"1575",
			"top":"5",
			"title":"Python O(n*n) time limit exceeded ?",
			"vote":"3",
			"content":"From viewing other solutions I think in some other languages O(n * n) are accepted.  Can my code be improved for O(n * n) or do I have to use another language or approach?\\n\\n```\\nclass Solution(object):\\n    def nextGreaterElements(self, nums):\\n\\n        if not nums:\\n            return []\\n            \\n        n = len(nums)\\n        result = [-1 for _ in range(len(nums))]\\n        max_num = max(nums)\\n        \\n        for i, num in enumerate(nums):\\n\\n            if num == max_num:\\n                continue\\n\\n            j = i\\n            while nums[j] <= num:\\n                j += 1\\n                j %= n\\n            result[i] = nums[j]\\n\\n        return result"
		},
		{
			"lc_ans_id":"98308",
			"view":"425",
			"top":"6",
			"title":"Java 1pass O(n)time & O(n)space solution beats 99%",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public int[] nextGreaterElements(int[] nums) {\\n        int[] r = new int[nums.length];\\n        if(nums.length == 0) return r;\\n        Arrays.fill(r, -1);\\n        int[] N = new int[nums.length];\\n        int[] P = new int[nums.length]; \\n        N[0] = nums[0];\\n        P[0] = 0;\\n        int p = 0, l = 2 * r.length;\\n        for(int i = 1; i < l - 1; ++i){\\n            int ri = i % r.length;\\n            if(nums[ri] <= N[p]){\\n                if(++p >= r.length) break;\\n                N[p] = nums[ri];\\n                P[p] = ri;\\n            } else {\\n                while(p >= 0 && N[p] < nums[ri]){\\n                    r[P[p]] = nums[ri];\\n                    --p;\\n                }\\n                N[++p] = nums[ri];\\n                P[p] = ri;\\n            }\\n        }\\n        return r;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98284",
			"view":"166",
			"top":"7",
			"title":"concise c++ solution using stack that beats 98%",
			"vote":"1",
			"content":"```   \\n vector<int> nextGreaterElements(vector<int>& nums) {\\n        int n = nums.size();\\n        vector<int> vec(n, -1);\\n        stack<int> stack;\\n        for(int i=0, j=0; i<2*n-1; i++){\\n            j = (i<n)?i:i-n;\\n            while(!stack.empty() && nums[stack.top()]<nums[j]){\\n                vec[stack.top()] = nums[j];\\n                stack.pop();\\n            }\\n            if(i<n)stack.push(i);\\n        }\\n        return vec;\\n    }\\n```"
		},
		{
			"lc_ans_id":"98276",
			"view":"165",
			"top":"8",
			"title":"21ms Java Solution beats 99.84% with comments and explanations",
			"vote":"1",
			"content":"summary:\\nfind first occurance of the greatest element, set `maxIndex`= its index.\\n\\ndeclare an array holds the index of next greater element, set `index[maxIndex]=-1`.Then calculate each the other elements from right to left. Assuming we're calculating `index[i]`, so we've calculated `index[i+1], index[i+2]...`. There're two situations:\\n\\n1. `nums[i]<nums[i+1]`. Just set `index[i] = i+1` (leave alone mod operations...)\\n2. `nums[i] >= nums[i+1]`. We already known that the next element whose value greater than nums[i+1] stored in index[i+1], we can retrieve that greater value and compare to see if it is greater than nums[i]. If so, `set index[i] = index[i+1]`. Otherwise, repeat the process. (Proof: nums[i]>nums[i+1] and the closest greater element locates in nums[index[i+1]], so elements between nums[i+1]...nums[index[i+1]-1] are smaller than nums[i+1] so smaller than nums[i] appearantly, so we don't have to compare them one by one in linear search, which skips serval elements and makes the algorithm more efficient.)\\n\\nThen declare another array to store the result, loop and set `result[i]=nums[index[i]]`\\n\\n\\n```\\npublic class Solution {\\n    public int[] nextGreaterElements(int[] nums) {\\n        if (nums==null||nums.length==0) return new int[0];\\n        int maxIndex = 0;\\n        for (int i = 0; i < nums.length; i++) {\\n            if (nums[i] > nums[maxIndex]) {\\n                maxIndex = i;  //find the largest element\\n            }\\n        }  \\n        int[] index = new int[nums.length]; //declare an array that holds the index of next greater element\\n        index[maxIndex] = -1; //set the max element's value to -1\\n        for (int i = (maxIndex - 1 + nums.length) % nums.length; i != maxIndex; i = (i - 1 + nums.length) % nums.length) { //the array is circular. pay attention to 'i'\\n            if (nums[i] < nums[(i + 1) % nums.length]) {\\n                index[i] = (i + 1) % nums.length; //set index[i] = (i+1)%nums.length if index[(i+1)%nums.length]>index[i]\\n            } else {\\n                int res = index[(i + 1 + nums.length) % nums.length]; //res = index of the cloest element whose value greater than nums[(i+1)%nums.length]\\n                while (res != -1 && index[res] != -1 && nums[i] >= nums[res]) {  //find the closet index makes nums[index] > nums[i]\\n                    res = index[res]; //if nums[i] >= nums[res], try nums[index[res]], index[res] is the index of the closest element whose value is greater than nums[res]. repeat the process until we find such an element. \\n                }\\n                if (res != -1 && nums[res] == nums[i]) { //res==-1 or index[res]==-1 means current element is another largest element, just set index[i] = -1.\\n                    res = -1;\\n                }\\n                index[i] = res;\\n            }\\n        }\\n        int[] result = new int[nums.length]; // retrieve value with index recorded previously\\n        for (int i = 0; i < result.length; i++) {\\n            int temp = index[i] != -1 ? nums[index[i]] : -1;\\n            result[i] = temp;\\n        }\\n        return result;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"98288",
			"view":"72",
			"top":"9",
			"title":"Java 20ms beat 99.96%",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public int[] nextGreaterElements(int[] nums) {\\n        int n = nums.length;\\n        int[] res = new int[n];\\n        if(n==0) return res;\\n        int max = nums[0],index = 0;\\n        for(int i=0;i<n;i++){\\n            if(nums[i]>max){\\n                res[i-1] = i;\\n                res[index] = i;\\n                max = nums[i];\\n                index = i;\\n            }\\n        }\\n        res[index] = -1;\\n        for(int i=index-1;i>index-n;i--){\\n            int real = (i+n)%n;\\n            if(res[real]!=0) continue;\\n            res[real] = real==n-1?0:real+1;\\n            while(res[real]!=-1&&nums[real]>=nums[res[real]]){\\n                res[real] = res[res[real]];\\n            }\\n        }\\n        for(int i=0;i<n;i++){\\n            if(res[i]!=-1){\\n              res[i] = nums[res[i]]; \\n            }\\n        }\\n        return res;"
		}
	],
	"id":"493",
	"title":"Next Greater Element II",
	"content":"<p>\r\nGiven a circular array (the next element of the last element is the first element of the array), print the Next Greater Number for every element. The Next Greater Number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, output -1 for this number.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,1]\r\n<b>Output:</b> [2,-1,2]\r\n<b>Explanation:</b> The first 1's next greater number is 2; </br>The number 2 can't find next greater number; </br>The second 1's next greater number needs to search circularly, which is also 2.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nThe length of given array won't exceed 10000.\r\n</p>",
	"frequency":"202",
	"ac_num":"22824"
}