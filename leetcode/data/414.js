{
	"difficulty":"1",
	"submit_num":"188642",
	"show_id":"414",
	"leetcode_id":"414",
	"answers":[
		{
			"lc_ans_id":"90202",
			"view":"26369",
			"top":"0",
			"title":"Java neat and easy understand solution, O(n) time, O(1) space",
			"vote":"112",
			"content":"```\\n    public int thirdMax(int[] nums) {\\n        Integer max1 = null;\\n        Integer max2 = null;\\n        Integer max3 = null;\\n        for (Integer n : nums) {\\n            if (n.equals(max1) || n.equals(max2) || n.equals(max3)) continue;\\n            if (max1 == null || n > max1) {\\n                max3 = max2;\\n                max2 = max1;\\n                max1 = n;\\n            } else if (max2 == null || n > max2) {\\n                max3 = max2;\\n                max2 = n;\\n            } else if (max3 == null || n > max3) {\\n                max3 = n;\\n            }\\n        }\\n        return max3 == null ? max1 : max3;\\n    }\\n```"
		},
		{
			"lc_ans_id":"90209",
			"view":"13999",
			"top":"1",
			"title":"Short easy C++ using set",
			"vote":"40",
			"content":"Track the largest three values in a set.\\n\\n    int thirdMax(vector<int>& nums) {\\n        set<int> top3;\\n        for (int num : nums) {\\n            top3.insert(num);\\n            if (top3.size() > 3)\\n                top3.erase(top3.begin());\\n        }\\n        return top3.size() == 3 ? *top3.begin() : *top3.rbegin();\\n    }\\n\\nAlternatively (not sure which one I like better):\\n\\n    int thirdMax(vector<int>& nums) {\\n        set<int> top3;\\n        for (int num : nums)\\n            if (top3.insert(num).second && top3.size() > 3)\\n                top3.erase(top3.begin());\\n        return top3.size() == 3 ? *top3.begin() : *top3.rbegin();\\n    }"
		},
		{
			"lc_ans_id":"90207",
			"view":"3920",
			"top":"2",
			"title":"Intuitive and Short Python solution",
			"vote":"33",
			"content":"```\\nclass Solution(object):\\n    def thirdMax(self, nums):\\n        v = [float('-inf'), float('-inf'), float('-inf')]\\n        for num in nums:\\n            if num not in v:\\n                if num > v[0]:   v = [num, v[0], v[1]]\\n                elif num > v[1]: v = [v[0], num, v[1]]\\n                elif num > v[2]: v = [v[0], v[1], num]\\n        return max(nums) if float('-inf') in v else v[2]\\n```\\nTime complexity is O(n), space complexity is O(1)."
		},
		{
			"lc_ans_id":"90190",
			"view":"13138",
			"top":"3",
			"title":"Java PriorityQueue O(n) + O(1)",
			"vote":"28",
			"content":"```\\npublic class Solution {\\n    public int thirdMax(int[] nums) {\\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\\n        Set<Integer> set = new HashSet<>();\\n        for (int i : nums) {\\n            if (!set.contains(i)) {\\n                pq.offer(i);\\n                set.add(i);\\n                if (pq.size() > 3) {\\n                    set.remove(pq.poll());\\n                }\\n            }\\n        }\\n        if (pq.size() < 3) {\\n            while (pq.size() > 1) {\\n                pq.poll();\\n            }\\n        }\\n        return pq.peek();\\n    }\\n}"
		},
		{
			"lc_ans_id":"90201",
			"view":"6832",
			"top":"4",
			"title":"A python amusing solution, which actually beats 98%...",
			"vote":"27",
			"content":"```\\ndef thirdMax(self, nums):\\n        nums = set(nums)\\n        if len(nums) < 3:\\n            return max(nums)\\n        nums.remove(max(nums))\\n        nums.remove(max(nums))\\n        return max(nums)\\n```"
		},
		{
			"lc_ans_id":"90240",
			"view":"1892",
			"top":"5",
			"title":"Short Clear C++ solution, no set or pq.",
			"vote":"14",
			"content":"```\\nint thirdMax(vector<int>& nums) {\\n    long long a, b, c;\\n    a = b = c = LLONG_MIN;\\n    for (auto num : nums) {\\n        if (num <= c || num == b || num == a) continue;\\n        c = num;\\n        if (c > b) swap(b, c);\\n        if (b > a) swap(a, b);\\n    }\\n    return c == LLONG_MIN ? a : c;\\n}\\n```"
		},
		{
			"lc_ans_id":"90290",
			"view":"11975",
			"top":"6",
			"title":"Java solution in 0ms run time O(n) and space O(1).",
			"vote":"11",
			"content":"```\\npublic int thirdMax(int[] nums) {\\n        int max, mid, small, count;\\n        max = mid = small = Integer.MIN_VALUE;\\n        count = 0;  //Count how many top elements have been found.\\n\\n        for( int x: nums) {\\n            //Skip loop if max or mid elements are duplicate. The purpose is for avoiding right shift.\\n            if( x == max || x == mid ) {\\n                continue;\\n            }\\n\\n            if (x > max) {\\n                //right shift\\n                small = mid;\\n                mid = max;\\n\\n                max = x;\\n                count++;\\n            } else if( x > mid) {\\n                //right shift\\n                small = mid;\\n\\n                mid = x;\\n                count++;\\n            } else if ( x >= small) { //if small duplicated, that's find, there's no shift and need to increase count.\\n                small = x;\\n                count++;\\n            }\\n        }\\n\\n        //\"count\" is used for checking whether found top 3 maximum elements.\\n        if( count >= 3) { \\n            return small;\\n        } else {\\n            return max;\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"90417",
			"view":"805",
			"top":"7",
			"title":"Python O(n) time, O(1) space.",
			"vote":"9",
			"content":"```\\nimport sys\\nclass Solution(object):\\n    def thirdMax(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: int\\n        \"\"\"\\n        one = two = three = -sys.maxint\\n        for i in nums:\\n            if i > one:\\n                one, two, three = i, one, two\\n            elif i > two and i < one:\\n                two, three = i, two\\n            elif i > three and i < two:\\n                three = i\\n        return three if three != -sys.maxint else one"
		},
		{
			"lc_ans_id":"90404",
			"view":"1508",
			"top":"8",
			"title":"There is a missing test case [-2147483648, 1, 2]",
			"vote":"8",
			"content":"For the testing case [-2147483648, 1, 2], the third maximum number is -2147483648, but the \"Run\" command of this question returns 2"
		},
		{
			"lc_ans_id":"90396",
			"view":"1011",
			"top":"9",
			"title":"O(n) time O(1) space Java short solution",
			"vote":"7",
			"content":"```\\n\\npublic class Solution {\\n    public int thirdMax(int[] nums) {\\n        long first=Long.MIN_VALUE;\\n        long second=Long.MIN_VALUE;\\n        long third=Long.MIN_VALUE;\\n        for(int i:nums){\\n            if(i>first){\\n                third=second;\\n                second=first;\\n                first=i;\\n            }else if(i==first)\\n                continue;\\n            else if(i>second){\\n                third=second;\\n                second=i;\\n            }else if(i==second)\\n                continue;\\n            else if(i>third){\\n                third=i;\\n            }\\n        }\\n        return third==Long.MIN_VALUE?(int)first:(int)third;\\n    }\\n}\\n```"
		}
	],
	"id":"414",
	"title":"Third Maximum Number",
	"content":"<p>Given a <b>non-empty</b> array of integers, return the <b>third</b> maximum number in this array. If it does not exist, return the maximum number. The time complexity must be in O(n).</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [3, 2, 1]\r\n\r\n<b>Output:</b> 1\r\n\r\n<b>Explanation:</b> The third maximum is 1.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1, 2]\r\n\r\n<b>Output:</b> 2\r\n\r\n<b>Explanation:</b> The third maximum does not exist, so the maximum (2) is returned instead.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> [2, 2, 3, 1]\r\n\r\n<b>Output:</b> 1\r\n\r\n<b>Explanation:</b> Note that the third maximum here means the third maximum distinct number.\r\nBoth numbers with value 2 are both considered as second maximum.\r\n</pre>\r\n</p>",
	"frequency":"229",
	"ac_num":"52825"
}