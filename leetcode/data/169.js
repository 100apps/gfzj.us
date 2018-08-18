{
	"difficulty":"1",
	"submit_num":"503212",
	"show_id":"169",
	"leetcode_id":"169",
	"answers":[
		{
			"lc_ans_id":"51613",
			"view":"95142",
			"top":"0",
			"title":"O(n) time O(1) space fastest solution",
			"vote":"614",
			"content":"    public class Solution {\\n        public int majorityElement(int[] num) {\\n\\n            int major=num[0], count = 1;\\n            for(int i=1; i<num.length;i++){\\n                if(count==0){\\n                    count++;\\n                    major=num[i];\\n                }else if(major==num[i]){\\n                    count++;\\n                }else count--;\\n                \\n            }\\n            return major;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"51612",
			"view":"23895",
			"top":"1",
			"title":"6 Suggested Solutions in C++ with Explanations",
			"vote":"321",
			"content":"Well, if you have got this problem accepted, you may have noticed that there are 7 suggested solutions for this problem. The following passage will implement 6 of them except the `O(n^2)` brute force algorithm.\\n\\n----------\\n**Hash Table**\\n\\nThe hash-table solution is very straightforward. We maintain a mapping from each element to its number of appearances. While constructing the mapping, we update the majority element based on the max number of appearances we have seen. Notice that we do not need to construct the full mapping when we see that an element has appeared more than `n / 2` times.\\n\\nThe code is as follows, which should be self-explanatory.\\n\\n    class Solution {\\n    public:\\n        int majorityElement(vector<int>& nums) {\\n            unordered_map<int, int> counts; \\n            int n = nums.size();\\n            for (int i = 0; i < n; i++)\\n                if (++counts[nums[i]] > n / 2)\\n                    return nums[i];\\n        }\\n    };\\n\\n----------\\n**Sorting**\\n\\nSince the majority element appears more than `n / 2` times, the `n / 2`-th element in the sorted `nums` must be the majority element. This can be proved intuitively. Note that the majority element will take more than `n / 2` positions in the sorted `nums` (cover more than half of `nums`). If the first of it appears in the `0`-th position, it will also appear in the `n / 2`-th position to cover more than half of `nums`. It is similar if the last of it appears in the `n - 1`-th position. These two cases are that the contiguous chunk of the majority element is to the leftmost and the rightmost in `nums`. For other cases (imagine the chunk moves between the left and the right end), it must also appear in the `n / 2`-th position.\\n\\nThe code is as follows, being very short if we use the system `nth_element` (thanks for @qeatzy for pointing out such a nice function).\\n\\n    class Solution {\\n    public:\\n        int majorityElement(vector<int>& nums) {\\n            nth_element(nums.begin(), nums.begin() + nums.size() / 2, nums.end());\\n            return nums[nums.size() / 2];\\n        } \\n    };\\n\\n----------\\n**Randomization**\\n\\nThis is a really nice idea and works pretty well (16ms running time on the OJ, almost fastest among the C++ solutions). The proof is already given in the suggested solutions.\\n\\nThe code is as follows, randomly pick an element and see if it is the majority one.\\n\\n    class Solution {\\n    public:\\n        int majorityElement(vector<int>& nums) {\\n            int n = nums.size();\\n            srand(unsigned(time(NULL)));\\n            while (true) {\\n                int idx = rand() % n;\\n                int candidate = nums[idx];\\n                int counts = 0; \\n                for (int i = 0; i < n; i++)\\n                    if (nums[i] == candidate)\\n                        counts++; \\n                if (counts > n / 2) return candidate;\\n            }\\n        }\\n    };\\n\\n----------\\n**Divide and Conquer**\\n\\nThis idea is very algorithmic. However, the implementation of it requires some careful thought about the base cases of the recursion. The base case is that when the array has only one element, then it is the majority one. This solution takes 24ms.  \\n\\n    class Solution {\\n    public:\\n        int majorityElement(vector<int>& nums) {\\n            return majority(nums, 0, nums.size() - 1);\\n        }\\n    private:\\n        int majority(vector<int>& nums, int left, int right) {\\n            if (left == right) return nums[left];\\n            int mid = left + ((right - left) >> 1);\\n            int lm = majority(nums, left, mid);\\n            int rm = majority(nums, mid + 1, right);\\n            if (lm == rm) return lm;\\n            return count(nums.begin() + left, nums.begin() + right + 1, lm) > count(nums.begin() + left, nums.begin() + right + 1, rm) ? lm : rm;\\n        }\\n    }; \\n\\n----------\\n**Moore Voting Algorithm**\\n\\nA brilliant and easy-to-implement algorithm! It also runs very fast, about 20ms.\\n\\n    class Solution {\\n    public:\\n        int majorityElement(vector<int>& nums) {\\n            int major, counts = 0, n = nums.size();\\n            for (int i = 0; i < n; i++) {\\n                if (!counts) {\\n                    major = nums[i];\\n                    counts = 1;\\n                }\\n                else counts += (nums[i] == major) ? 1 : -1;\\n            }\\n            return major;\\n        }\\n    };\\n\\n----------\\n**Bit Manipulation**\\n\\nAnother nice idea! The key lies in how to count the number of `1`'s on a specific bit. Specifically, you need a `mask` with a `1` on the `i`-the bit and `0` otherwise to get the `i`-th bit of each element in `nums`. The code is as follows.\\n\\n    class Solution {\\n    public:\\n        int majorityElement(vector<int>& nums) {\\n            int major = 0, n = nums.size();\\n            for (int i = 0, mask = 1; i < 32; i++, mask <<= 1) {\\n                int bitCounts = 0;\\n                for (int j = 0; j < n; j++) {\\n                    if (nums[j] & mask) bitCounts++;\\n                    if (bitCounts > n / 2) {\\n                        major |= mask;\\n                        break;\\n                    }\\n                }\\n            } \\n            return major;\\n        } \\n    };"
		},
		{
			"lc_ans_id":"51611",
			"view":"20733",
			"top":"2",
			"title":"Java solutions (sorting, hashmap, moore voting, bit manipulation).",
			"vote":"156",
			"content":"    \\n    // Sorting\\n    public int majorityElement1(int[] nums) {\\n        Arrays.sort(nums);\\n        return nums[nums.length/2];\\n    }\\n    \\n    // Hashtable \\n    public int majorityElement2(int[] nums) {\\n        Map<Integer, Integer> myMap = new HashMap<Integer, Integer>();\\n        //Hashtable<Integer, Integer> myMap = new Hashtable<Integer, Integer>();\\n        int ret=0;\\n        for (int num: nums) {\\n            if (!myMap.containsKey(num))\\n                myMap.put(num, 1);\\n            else\\n                myMap.put(num, myMap.get(num)+1);\\n            if (myMap.get(num)>nums.length/2) {\\n                ret = num;\\n                break;\\n            }\\n        }\\n        return ret;\\n    }\\n    \\n    // Moore voting algorithm\\n    public int majorityElement3(int[] nums) {\\n        int count=0, ret = 0;\\n        for (int num: nums) {\\n            if (count==0)\\n                ret = num;\\n            if (num!=ret)\\n                count--;\\n            else\\n                count++;\\n        }\\n        return ret;\\n    }\\n    \\n    // Bit manipulation \\n    public int majorityElement(int[] nums) {\\n        int[] bit = new int[32];\\n        for (int num: nums)\\n            for (int i=0; i<32; i++) \\n                if ((num>>(31-i) & 1) == 1)\\n                    bit[i]++;\\n        int ret=0;\\n        for (int i=0; i<32; i++) {\\n            bit[i]=bit[i]>nums.length/2?1:0;\\n            ret += bit[i]*(1<<(31-i));\\n        }\\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"51649",
			"view":"7900",
			"top":"3",
			"title":"Share my solution [Java] - Count bits",
			"vote":"71",
			"content":"Definitely not the fastest solution but I post it here for your reference since it's different from the rest I saw. The problem reminded me of the approach I followed at Single Number II (problem 137).\\n\\nWe can iterate over the bits of all numbers and for every position find out if ones outnumber the zeros (among all numbers). If this is the case, the corresponding bit of the ret variable (which holds the result) is set. We essentially \"construct\" the number we look for.\\n\\nThe following code is simple and should be easy to understand.\\n\\n    public int majorityElement(int[] num) {\\n\\n        int ret = 0;\\n\\n        for (int i = 0; i < 32; i++) {\\n\\n            int ones = 0, zeros = 0;\\n\\n            for (int j = 0; j < num.length; j++) {\\n                if ((num[j] & (1 << i)) != 0) {\\n                    ++ones;\\n                }\\n                else\\n                    ++zeros;\\n            }\\n\\n            if (ones > zeros)\\n                ret |= (1 << i);\\n        }\\n        \\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"51828",
			"view":"9042",
			"top":"4",
			"title":"C++ solution using Moore's voting algorithm - O(n) runtime comlexity an no extra array or hash table",
			"vote":"71",
			"content":"This can be solved by Moore's voting algorithm. Basic idea of the algorithm is if we cancel out each occurrence of an element e with all the other elements that are different from e then e will exist till end if it is a majority element. Below code loops through each element and maintains a count of the element that has the potential of being the majority element. If next element is same then increments the count, otherwise decrements the count. If the count reaches 0 then update the potential index to the current element and sets count to 1.\\n\\n    int majorityElement(vector<int> &num) {\\n        int majorityIndex = 0;\\n        for (int count = 1, i = 1; i < num.size(); i++) {\\n            num[majorityIndex] == num[i] ? count++ : count--;\\n            if (count == 0) {\\n                majorityIndex = i;\\n                count = 1;\\n            }\\n        }\\n            \\n        return num[majorityIndex];\\n    }"
		},
		{
			"lc_ans_id":"51610",
			"view":"7692",
			"top":"5",
			"title":"One line solution in Python",
			"vote":"53",
			"content":"NOTICE that the majority element **always** exist in the array,so that  the middle **always**  is the answer\\n\\n    return sorted(num)[len(num)/2]"
		},
		{
			"lc_ans_id":"51711",
			"view":"5776",
			"top":"6",
			"title":"An easy way to solve the problem ( 24ms )",
			"vote":"50",
			"content":"Every number in the vector votes for itself, the majority number gets the most votes. Different number offsets the votes.\\n\\n    int majorityElement(vector<int> &num) {\\n        \\n        int vote = num[0];\\n    \\tint count = 1;\\n    \\tint size = num.size();\\n    \\t//vote from the second number\\n    \\tfor( int i = 1; i < size; i++ )\\n    \\t{\\n    \\t\\tif( count == 0 ) { vote = num[i]; count++; }\\n    \\t\\telse if( vote == num[i] )\\tcount++;\\n    \\t\\telse count--;\\n    \\t}\\n    \\treturn vote;\\n        }"
		},
		{
			"lc_ans_id":"51712",
			"view":"3473",
			"top":"7",
			"title":"Python different solutions (dictionary, bit manipulation, sorting, divide and conquer, brute force, etc).",
			"vote":"45",
			"content":"    \\n    # two pass + dictionary\\n    def majorityElement1(self, nums):\\n        dic = {}\\n        for num in nums:\\n            dic[num] = dic.get(num, 0) + 1\\n        for num in nums:\\n            if dic[num] > len(nums)//2:\\n                return num\\n        \\n    # one pass + dictionary\\n    def majorityElement2(self, nums):\\n        dic = {}\\n        for num in nums:\\n            if num not in dic:\\n                dic[num] = 1\\n            if dic[num] > len(nums)//2:\\n                return num\\n            else:\\n                dic[num] += 1 \\n    \\n    # TLE\\n    def majorityElement3(self, nums):\\n        for i in xrange(len(nums)):\\n            count = 0\\n            for j in xrange(len(nums)):\\n                if nums[j] == nums[i]:\\n                    count += 1\\n            if count > len(nums)//2:\\n                return nums[i]\\n                \\n    # Sotring            \\n    def majorityElement4(self, nums):\\n        nums.sort()\\n        return nums[len(nums)//2]\\n        \\n    # Bit manipulation    \\n    def majorityElement5(self, nums):\\n        bit = [0]*32\\n        for num in nums:\\n            for j in xrange(32):\\n                bit[j] += num >> j & 1\\n        res = 0\\n        for i, val in enumerate(bit):\\n            if val > len(nums)//2:\\n                # if the 31th bit if 1, \\n                # it means it's a negative number \\n                if i == 31:\\n                    res = -((1<<31)-res)\\n                else:\\n                    res |= 1 << i\\n        return res\\n                \\n    # Divide and Conquer\\n    def majorityElement6(self, nums):\\n        if not nums:\\n            return None\\n        if len(nums) == 1:\\n            return nums[0]\\n        a = self.majorityElement(nums[:len(nums)//2])\\n        b = self.majorityElement(nums[len(nums)//2:])\\n        if a == b:\\n            return a\\n        return [b, a][nums.count(a) > len(nums)//2]\\n        \\n    # the idea here is if a pair of elements from the\\n    # list is not the same, then delete both, the last \\n    # remaining element is the majority number\\n    def majorityElement(self, nums):\\n        count, cand = 0, 0\\n        for num in nums:\\n            if num == cand:\\n                count += 1\\n            elif count == 0:\\n                cand, count = num, 1\\n            else:\\n                count -= 1\\n        return cand"
		},
		{
			"lc_ans_id":"51906",
			"view":"3044",
			"top":"8",
			"title":"My O(n)time and O(1)space solution in c++",
			"vote":"42",
			"content":"    class Solution {\\n    public:\\n        int majorityElement(vector<int>& nums) {\\n            int max;\\n            int count = 0;\\n            int n = nums.size();\\n            for(int i = 0; i < n; i++) {\\n                if (count == 0) {\\n                    max = nums[i];\\n                    count = 1;\\n                    continue;\\n                }\\n                if (max != nums[i]) {\\n                    count--;\\n                } else {\\n                    count++;\\n                }\\n            }\\n            return max;\\n        }\\n        \\n    };"
		},
		{
			"lc_ans_id":"51949",
			"view":"2457",
			"top":"9",
			"title":"My c solution  10ms",
			"vote":"41",
			"content":"    int majorityElement(int num[], int n) {\\n        int cnt = 0, res;\\n        for (int i = 0; i < n; ++i) {\\n            if (cnt == 0) res = num[i];\\n            if (res == num[i]) ++cnt;\\n            else --cnt;\\n        }\\n        return res;\\n    }"
		}
	],
	"id":"169",
	"title":"Majority Element",
	"content":"<p>Given an array of size <i>n</i>, find the majority element. The majority element is the element that appears <b>more than</b> <code>&lfloor; n/2 &rfloor;</code> times.</p>\r\n\r\n<p>You may assume that the array is non-empty and the majority element always exist in the array.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"592",
	"ac_num":"239514"
}