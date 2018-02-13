{
	"difficulty":"2",
	"submit_num":"27447",
	"show_id":"370",
	"leetcode_id":"370",
	"answers":[
		{
			"lc_ans_id":"84217",
			"view":"13293",
			"top":"0",
			"title":"Java O(K + N)time complexity Solution",
			"vote":"135",
			"content":"Just store every start index for each value and at end index plus one minus it \\n\\nfor example it will look like:\\n\\n[1 , 3 , 2]   ,  [2, 3,  3]  (length = 5)\\n\\nres[ 0, 2, ,0, 0 -2 ]\\n\\nres[ 0 ,2, 3, 0, -5]\\n\\nsum 0, 2, 5, 5, 0\\n\\nres[0, 2, 5, 5, 0] \\n\\n\\n\\n     public int[] getModifiedArray(int length, int[][] updates) {\\n\\n        int[] res = new int[length];\\n         for(int[] update : updates) {\\n            int value = update[2];\\n            int start = update[0];\\n            int end = update[1];\\n            \\n            res[start] += value;\\n            \\n            if(end < length - 1)\\n                res[end + 1] -= value;\\n            \\n        }\\n        \\n        int sum = 0;\\n        for(int i = 0; i < length; i++) {\\n            sum += res[i];\\n            res[i] = sum;\\n        }\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"84225",
			"view":"3191",
			"top":"1",
			"title":"Detailed explanation if you don't understand, especially \"put negative inc at [endIndex+1]\"",
			"vote":"50",
			"content":"You may see many of the elegant solutions (such as [this solution](https://discuss.leetcode.com/topic/49666/my-simple-c-solution)) that **puts inc at startIndex and -inc at endIndex + 1**, but it might take you a while to understand why it works, if you are still stuck, read on.\\n\\nThe idea seems tricky at first look but is actually simple after you understand it, basically we want to achieve the final result array in two passes:\\n1. Iterate through the k update operations and \"somehow\" mark them in the [0, 0, 0, 0, 0] array (using length 5 for example), for each operation, only update startIndex and endIndex + 1. this is O(k) in total.\\n2. iterate through the marked array and \"somehow\" transforms it to the final result array. this is O(n) in total (n = length).\\nAll in all it is O(n + k).\\n\\nNow think in a simpler way first, if you have **only one update operation**, suppose input is (n = 5, updates = { {1, 3, 2} }), what does the O(n + k) solution do?\\n\\n* Initialize the result array as length of n + 1, because we will operate on endIndex + 1: \\nresult = [0, 0, 0, 0, 0, 0]\\n* Then marks index 1 as 2 and marks index 3+1 as -2: \\nresult = [0, 2, 0, 0, -2, 0]\\n* Next, iterate through result, and accumulates previous sum to current position, just like [303. Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/): \\nresult = [0, 0 + 2, 0 + 2, 0 + 2, 2 + (-2), 0] = [0, 2, 2, 2, 0, 0]\\n* Finally, trivial work to discard the last element because we don't need it: \\nresult = [0, 2, 2, 2, 0], which is the final result.\\n\\nNow you might see why we do \"puts inc at startIndex and -inc at endIndex + 1\":\\n* Put inc at startIndex allows the **inc to be carried** to the next index starting from startIndex when we do the sum accumulation.\\n* Put -inc at endIndex + 1 simply means **cancel out the previous carry** from the next index of the endIndex, because the previous carry should not be counted beyond endIndex.\\n\\nAnd finally, because each of the update operation is independent and the list operation is just an accumulation of the \"marks\" we do, so it can be \"makred\" all at once first and do the range sum at one time at last step.\\n\\nCode in c++ is simply:\\n```\\nvector<int> getModifiedArray(int length, vector<vector<int>>& updates) {\\n    vector<int> result(length + 1, 0);\\n    for (auto &e : updates) {\\n        result[e[0]] += e[2];\\n        result[e[1] + 1] -= e[2];\\n    }\\n    \\n    // do range sum\\n    for (int i = 1; i < length; ++ i) {\\n        result[i] += result[i - 1];\\n    }\\n    \\n    result.pop_back();\\n    return result;\\n}\\n```"
		},
		{
			"lc_ans_id":"84219",
			"view":"6180",
			"top":"2",
			"title":"Java O(n+k) time O(1) space with algorithm explained",
			"vote":"13",
			"content":"segment [i,j] is made of two parts [0,i-1] and [0, j]\\nso [i,j] increase 2 is same as [0,j] increase 2 and [0,i-1] increase -2. so you only need to update value at nums[j] with inc and nums[i-1] -inc. initially nums[i] is defined as all elements [0,i]  increases inc\\n\\nthen think from length-1 to 0 backward. The last spot nums[length-1] does not need any modification.\\nnums[length-2] value should be updated as nums[length-2] + nums[length-1] as the latter covers the front. but front does not influence what is after it. so every spot should be updated as + the accumulate sum from the end.\\n\\n    public class Solution {\\n        public int[] getModifiedArray(int length, int[][] updates) {\\n            int[] nums = new int[length];\\n            for (int[] update : updates) {\\n                nums[update[1]] += update[2];\\n                if (update[0] > 0) {\\n                    nums[update[0] - 1] -= update[2];\\n                } \\n            }\\n            \\n            int sum = nums[length - 1];\\n            for (int i = length - 2; i >= 0; i--) {\\n                int tmp = sum + nums[i];\\n                nums[i] += sum;\\n                sum = tmp; \\n            }\\n            return nums;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"84223",
			"view":"2538",
			"top":"3",
			"title":"My Simple C++ Solution",
			"vote":"13",
			"content":"From the hint, we only need to update first and end element, so we update the startIndex with inc, then update endIndex + 1 with -inc. \\nUsing the example in the problem, We get vector nums = {-2, 2, 3, 2, -2, -3}, then we compute range sum ( [Range Sum Query - Immutable][1]), that is the final result = {-2, 0, 3, 5, 3}. \\n\\n    class Solution {\\n    public:\\n        vector<int> getModifiedArray(int length, vector<vector<int>>& updates) {\\n            vector<int> res, nums(length + 1, 0);\\n            for (int i = 0; i < updates.size(); ++i) {\\n                nums[updates[i][0]] += updates[i][2];\\n                nums[updates[i][1] + 1] -= updates[i][2];\\n            }\\n            int sum = 0;\\n            for (int i = 0; i < length; ++i) {\\n                sum += nums[i];\\n                res.push_back(sum);\\n            }\\n            return res;\\n        }\\n    };\\n\\n\\n  [1]: https://leetcode.com/problems/range-sum-query-immutable/"
		},
		{
			"lc_ans_id":"84270",
			"view":"2132",
			"top":"4",
			"title":"In case you have no idea",
			"vote":"11",
			"content":"Just use the first position and the __last + 1__ position. The last + 1 position add the opposite value. So when you add the numbers from start to end you will have correct result."
		},
		{
			"lc_ans_id":"84220",
			"view":"789",
			"top":"5",
			"title":"O(n+k) Python Solution",
			"vote":"3",
			"content":"```\\nclass Solution(object):\\n    def getModifiedArray(self, length, updates):\\n        \"\"\"\\n        :type length: int\\n        :type updates: List[List[int]]\\n        :rtype: List[int]\\n        \"\"\"\\n        res = [0] * length\\n        for update in updates:\\n            start, end, inc = update\\n            res[start] += inc\\n            \\n            if end + 1 <= length - 1:\\n                res[end+1] -= inc\\n\\n        sum = 0\\n        for i in range(length):\\n            sum += res[i]\\n            res[i] = sum\\n        return res\\n```"
		},
		{
			"lc_ans_id":"84271",
			"view":"511",
			"top":"6",
			"title":"3ms Java O(n+k) time O(1) space Solution",
			"vote":"3",
			"content":"    public class Solution {\\n        public int[] getModifiedArray(int length, int[][] updates) {\\n            int[] nums = new int[length];\\n            for (int[] update : updates) {\\n                nums[update[1]] += update[2];\\n                if (update[0] > 0) nums[update[0] - 1] -= update[2];\\n            }\\n            for (int i = length - 2; i >= 0; i--) {\\n                nums[i] = nums[i + 1] + nums[i];\\n            }\\n            return nums;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"84272",
			"view":"322",
			"top":"7",
			"title":"4ms O(N+K) straightforward JAVA solution",
			"vote":"2",
			"content":"Logic example: \\n\\n1)  If the array needs to be added with val=5 from index  3 to 10, then just add the value 5 on 3rd index and -5 on the 11th index of the result array. \\n\\n2) Then traverse from left to right to see what should be the value of the current array index i.e. the sum of all the elements in the result array formed in step 1.\\n\\n\\n\\n    public int[] getModifiedArray(int length, int[][] updates) {\\n            \\n            int idx=0,k=updates.length, curr_sum = 0;\\n            int[] arr = new int[length];\\n            \\n            for(idx=0;idx<k;idx++){\\n                \\n                arr[updates[idx][0]] += updates[idx][2];\\n                \\n                if(updates[idx][1]<length-1){\\n                    arr[updates[idx][1]+1] -= updates[idx][2];\\n                }\\n            \\n            }\\n            \\n            for(idx=0;idx<length;idx++){\\n                curr_sum += arr[idx];\\n                arr[idx] = curr_sum;\\n            }\\n            \\n            return arr;\\n        }"
		},
		{
			"lc_ans_id":"84273",
			"view":"424",
			"top":"8",
			"title":"30ms JAVA nlogk solution similar to merge intervals",
			"vote":"2",
			"content":"Sort the intervals with start first, use a heap (use end as compare) to maintain current valid intervals while iterating the result array.\\n\\n    public class Solution {\\n        public int[] getModifiedArray(int length, int[][] updates) {\\n            int[] res = new int[length];\\n            List<int[]> list = new ArrayList<>();\\n            for (int[] update : updates) list.add(update);\\n            Collections.sort(list, new Comparator<int[]>() {\\n               @Override\\n               public int compare(int[] a, int[] b) {\\n                   return a[0] - b[0];\\n               }\\n            });\\n            \\n            PriorityQueue<int[]> q = new PriorityQueue<int[]>(10, new Comparator<int[]>() {\\n               @Override\\n               public int compare(int[] a, int[] b) {\\n                   return a[1] - b[1];\\n               }\\n            });\\n            \\n            int index = 0, sum = 0;\\n            for (int i = 0; i < length; i++) {\\n                while (index < list.size() && list.get(index)[0] == i) {\\n                    sum += list.get(index)[2];\\n                    q.offer(list.get(index++));\\n                }\\n                while (!q.isEmpty() && q.peek()[1] < i) {\\n                    sum -= q.poll()[2];\\n                }\\n                res[i] = sum;\\n            }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"84234",
			"view":"211",
			"top":"9",
			"title":"C++ 8 line with 95ms beats 100%",
			"vote":"1",
			"content":"class Solution {\\npublic:\\n    vector<int> getModifiedArray(int length, vector<vector<int>>& updates) {\\n        vector<int> res(length+1, 0);\\n        for(auto& u : updates) {\\n            res[u[0]] += u[2];\\n            res[u[1]+1] -= u[2];\\n        }\\n        for(int i = 1; i <= length; i++) { res[i] += res[i-1]; }\\n        res.pop_back();\\n        return res;\\n    }\\n};"
		}
	],
	"id":"370",
	"title":"Range Addition",
	"content":"<p>Assume you have an array of length <b><i>n</i></b> initialized with all <b>0</b>'s and are given <b><i>k</i></b> update operations.</p>\r\n\r\n<p>Each operation is represented as a triplet: <b>[startIndex, endIndex, inc]</b> which increments each element of subarray <b>A[startIndex ... endIndex]</b> (startIndex and endIndex inclusive) with <b>inc</b>.</p>\r\n\r\n<p>Return the modified array after all <b><i>k</i></b> operations were executed.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nGiven:\r\n\r\n    length = 5,\r\n    updates = [\r\n        [1,  3,  2],\r\n        [2,  4,  3],\r\n        [0,  2, -2]\r\n    ]\r\n\r\nOutput:\r\n\r\n    [-2, 0, 3, 5, 3]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Explanation:</b>\r\n<pre>\r\nInitial state:\r\n[ 0, 0, 0, 0, 0 ]\r\n\r\nAfter applying operation [1, 3, 2]:\r\n[ 0, 2, 2, 2, 0 ]\r\n\r\nAfter applying operation [2, 4, 3]:\r\n[ 0, 2, 5, 5, 3 ]\r\n\r\nAfter applying operation [0, 2, -2]:\r\n[-2, 0, 3, 5, 3 ]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/vinod23\">@vinod23</a> for adding this problem and creating all test cases.</p>",
	"frequency":"80",
	"ac_num":"15646"
}