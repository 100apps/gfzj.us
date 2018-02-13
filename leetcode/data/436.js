{
	"difficulty":"2",
	"submit_num":"87059",
	"show_id":"442",
	"leetcode_id":"442",
	"answers":[
		{
			"lc_ans_id":"92387",
			"view":"32214",
			"top":"0",
			"title":"Java Simple Solution",
			"vote":"133",
			"content":"```\\npublic class Solution {\\n    // when find a number i, flip the number at position i-1 to negative. \\n    // if the number at position i-1 is already negative, i is the number that occurs twice.\\n    \\n    public List<Integer> findDuplicates(int[] nums) {\\n        List<Integer> res = new ArrayList<>();\\n        for (int i = 0; i < nums.length; ++i) {\\n            int index = Math.abs(nums[i])-1;\\n            if (nums[index] < 0)\\n                res.add(Math.abs(index+1));\\n            nums[index] = -nums[index];\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92392",
			"view":"11408",
			"top":"1",
			"title":"Very simple C++ solution",
			"vote":"25",
			"content":"Firstly, we put each element x in nums[x - 1]. Since x ranges from 1 to N, then x - 1 ranges from 0 to N - 1, it won't exceed the bound of the array.\\nSecondly, we check through the array. If a number x doesn't present in nums[x - 1], then x is absent.\\n```\\nclass Solution {\\npublic:\\n    vector<int> findDuplicates(vector<int>& nums) {\\n        vector<int> res;\\n        int i = 0;\\n        while (i < nums.size()) {\\n            if (nums[i] != nums[nums[i]-1]) swap(nums[i], nums[nums[i]-1]);\\n            else i++;\\n        }\\n        for (i = 0; i < nums.size(); i++) {\\n            if (nums[i] != i + 1) res.push_back(nums[i]);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"92390",
			"view":"8064",
			"top":"2",
			"title":"Python O(n) time O(1) space",
			"vote":"20",
			"content":"O(1) space not including the input and output variables\\n\\nThe idea is we do a linear pass using the input array itself as a hash to store which numbers have been seen before. We do this by making elements at certain indexes negative. See the full explanation here\\n\\nhttp://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/\\n\\n```\\nclass Solution(object):\\n    def findDuplicates(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: List[int]\\n        \"\"\"\\n        res = []\\n        for x in nums:\\n            if nums[abs(x)-1] < 0:\\n                res.append(abs(x))\\n            else:\\n                nums[abs(x)-1] *= -1\\n        return res\\n```"
		},
		{
			"lc_ans_id":"92448",
			"view":"11548",
			"top":"3",
			"title":"Java solution without destroying the input array. O(n) time. O(1) space.",
			"vote":"17",
			"content":"Code:\\n\\npublic class Solution {\\n\\n    public List<Integer> findDuplicates(int[] nums) {\\n         List<Integer> result = new ArrayList<Integer>();\\n        if(nums == null)\\n            return result;\\n        for(int i=0; i<nums.length; i++){\\n            int location = Math.abs(nums[i])-1;\\n            if(nums[location] < 0){\\n                result.add(Math.abs(nums[i]));\\n            }else{\\n                nums[location] = -nums[location];\\n            }\\n        }\\n        for(int i=0; i<nums.length; i++)\\n            nums[i] = Math.abs(nums[i]);\\n       \\n        return result;\\n    }\\n}"
		},
		{
			"lc_ans_id":"92395",
			"view":"3067",
			"top":"4",
			"title":"C++ beats 98%",
			"vote":"10",
			"content":"```\\nvector<int> findDuplicates(vector<int>& nums) {\\n        vector<int> res;\\n        for(int i = 0; i < nums.size(); i ++){\\n            nums[abs(nums[i])-1] = -nums[abs(nums[i])-1];\\n            if(nums[abs(nums[i])-1] > 0) res.push_back(abs(nums [i]));\\n        }\\n        return res;\\n    }\\n```\\n\\nSame mark by negation as a lot of people use, if you ever come across a value that is positive after negating if you know you've seen it before!"
		},
		{
			"lc_ans_id":"92429",
			"view":"4830",
			"top":"5",
			"title":"Java Easy to understand solution without extra space and in O(n) time",
			"vote":"9",
			"content":"The concept here is to negate each number's index as the input is 1 <= a[i] <= n (n = size of array). Once a value is negated, if it requires to be negated again then it is a duplicate.\\n\\n'''    \\npublic List<Integer> findDuplicates(int[] nums) {\\n \\n        List<Integer> newList = new ArrayList<Integer>();     // creating a new List\\n        for(int i=0;i<nums.length;i++){  \\n           int index =Math.abs(nums[i]);             // Taking the absolute value to find index\\n           if(nums[index-1] >0){ \\n                    nums[index-1] = - nums[index-1];\\n            }else{\\n                   // If it is not greater than 0 (i.e) negative then the number is a duplicate\\n                    newList.add(Math.abs(nums[i])); \\n            }\\n        }\\n        return newList;\\n    }"
		},
		{
			"lc_ans_id":"92461",
			"view":"521",
			"top":"6",
			"title":"C++ simple solution leveraging the highest bit",
			"vote":"4",
			"content":"```\\n/*\\n  The solution is based on the fact that all the input number are signed int, and\\n  given the condition that each number is larger than 0, we can leverage the highest\\n  bit in each number to store the information whether the number has been found already.\\n  If yes, just add the number in the vector to return, if not, we set the number's highest bit.\\n*/\\nvector<int> findDuplicates(vector<int>& nums) {\\n\\tvector<int> r;\\n\\tfor (int i = 0; i < nums.size(); ++i) {\\n\\t\\tint index = nums[i] & 0x7fffffff;\\n\\t\\tif (nums[index - 1] < 0) {\\n\\t\\t\\tr.push_back(index);\\n\\t\\t}\\n\\t\\telse {\\n\\t\\t\\tnums[index - 1] |= 0x80000000;\\n\\t\\t}\\n\\t}\\n\\treturn r;\\n}\\n```"
		},
		{
			"lc_ans_id":"92411",
			"view":"710",
			"top":"7",
			"title":"Java O(1) space O(n) time solution with swapping",
			"vote":"4",
			"content":"Hi there! I couldn't find absolutely the same idea as mine in the discussions, therefore decided to share it. Basic idea is to put each element to the corresponding position, so that a[0] = 1, a[1] = 2, a[2] = 3 ... etc. (1<=a[i]<=n). \\nFor understanding, find below the code with comments. I think it is not hard to read and understand.\\n```\\npublic class Solution {\\n    public List<Integer> findDuplicates(int[] nums) {\\n        List<Integer> res=  new ArrayList<>();\\n        if(nums == null || nums.length == 0) return res;\\n        int i = 0;\\n        int n = nums.length;\\n        while(i<n){ //traverse the array  till the end\\n            if(nums[i] == i+1){  // if number stays at it's supposed position, just continue\\n                i++;\\n                continue;\\n            }\\n            int num = nums[i];\\n            if(num == -1){ // if the duplicate number in that position is already found continue\\n                i++;\\n                continue;\\n            }\\n            if(nums[num-1] == num){ // if current  num is equals to the number at supposed position,\\n                res.add(num);       // then it is duplicate.\\n                nums[i] = -1;       // mark this position, in order to denote that duplicate has found\\n                i++;\\n                continue;\\n            }\\n            swap(nums, i, num-1);  // if current numbers supposed position is occupied by another number swap and consider that number\\n        }\\n        return res;\\n    }\\n    \\n    public void swap(int nums[], int i ,int j){\\n        int tmp = nums[i];\\n        nums[i] = nums[j];\\n        nums[j] = tmp;\\n    }\\n}"
		},
		{
			"lc_ans_id":"92451",
			"view":"208",
			"top":"8",
			"title":"Simple Java Solution using HashSet!",
			"vote":"2",
			"content":"The idea is - HashSet doesn't allow to add duplicate values. \\n\\n```public class Solution {\\n    public List<Integer> findDuplicates(int[] nums) {\\n        List<Integer> result = new ArrayList<Integer>();\\n        Set<Integer> newSet = new HashSet<Integer>();\\n        for (int i =0 ; i<nums.length; i++)\\n        {\\n            if (!newSet.add(nums[i]))\\n            {\\n                result.add(nums[i]);\\n            }\\n        }\\n        return result;\\n        \\n        \\n    }\\n}```"
		},
		{
			"lc_ans_id":"92432",
			"view":"756",
			"top":"9",
			"title":"C++_O(n), in-place swap",
			"vote":"2",
			"content":"This question is very similar like: [448. Find All Numbers Disappeared in an Array](https://discuss.leetcode.com/topic/66997/c-_time-o-n-space-o-1)\\n\\n     class Solution {\\n    public:\\n    vector<int> findDuplicates(vector<int>& nums) {\\n        vector<int> res;\\n        if(nums.empty()) return res;\\n        \\n        for(int i = 0; i < nums.size(); ++i){\\n            while(nums[nums[i] - 1] != nums[i]){\\n                swap(nums[nums[i] - 1], nums[i]);\\n            }\\n        }\\n        \\n        for(int i = 0; i < nums.size(); ++i){\\n            if(nums[i] != i + 1){\\n                res.push_back(nums[i]);\\n            }\\n        }\\n        return res;\\n    }\\n    };"
		}
	],
	"id":"436",
	"title":"Find All Duplicates in an Array",
	"content":"<p>Given an array of integers, 1 &le; a[i] &le; <i>n</i> (<i>n</i> = size of array), some elements appear <b>twice</b> and others appear <b>once</b>.</p>\r\n\r\n<p>Find all the elements that appear <b>twice</b> in this array.</p>\r\n\r\n<p>Could you do it without extra space and in O(<i>n</i>) runtime?</p>\r\n</p>\r\n<p><b>Example:</b><br/>\r\n<pre>\r\n<b>Input:</b>\r\n[4,3,2,7,8,2,3,1]\r\n\r\n<b>Output:</b>\r\n[2,3]\r\n</pre>",
	"frequency":"424",
	"ac_num":"49298"
}