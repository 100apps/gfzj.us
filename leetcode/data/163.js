{
	"difficulty":"2",
	"submit_num":"151319",
	"show_id":"163",
	"leetcode_id":"163",
	"answers":[
		{
			"lc_ans_id":"50476",
			"view":"20098",
			"top":"0",
			"title":"Accepted Java solution with explanation",
			"vote":"73",
			"content":"    public List<String> findMissingRanges(int[] a, int lo, int hi) {\\n      List<String> res = new ArrayList<String>();\\n      \\n      // the next number we need to find\\n      int next = lo;\\n      \\n      for (int i = 0; i < a.length; i++) {\\n        // not within the range yet\\n        if (a[i] < next) continue;\\n        \\n        // continue to find the next one\\n        if (a[i] == next) {\\n          next++;\\n          continue;\\n        }\\n        \\n        // get the missing range string format\\n        res.add(getRange(next, a[i] - 1));\\n        \\n        // now we need to find the next number\\n        next = a[i] + 1;\\n      }\\n      \\n      // do a final check\\n      if (next <= hi) res.add(getRange(next, hi));\\n    \\n      return res;\\n    }\\n    \\n    String getRange(int n1, int n2) {\\n      return (n1 == n2) ? String.valueOf(n1) : String.format(\"%d->%d\", n1, n2);\\n    }"
		},
		{
			"lc_ans_id":"50475",
			"view":"10231",
			"top":"1",
			"title":"My concise java accepted solution",
			"vote":"37",
			"content":"    public class Solution {\\n        public List<String> findMissingRanges(int[] A, int lower, int upper) {\\n            List<String> result = new ArrayList<String>();\\n            int pre = lower - 1;\\n            for(int i = 0 ; i <= A.length  ; i++){\\n                int after = i == A.length ? upper + 1 : A[i]; \\n                if(pre + 2 == after){\\n                    result.add(String.valueOf(pre + 1));\\n                }else if(pre + 2 < after){\\n                    result.add(String.valueOf(pre + 1) + \"->\" + String.valueOf(after - 1));\\n                }\\n                pre = after;\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"50506",
			"view":"4131",
			"top":"2",
			"title":"Simple Java code",
			"vote":"28",
			"content":"        public List<String> findMissingRanges(int[] nums, int lower, int upper) {\\n            List<String> list = new ArrayList<String>();\\n            if(nums == null) return list;\\n            int n = nums.length;\\n            for(int i = 0; i <= n; i++) {\\n                int lt = (i == 0) ? lower : nums[i - 1] + 1;\\n                int gt = (i == n) ? upper : nums[i] - 1;\\n                addRange(list, lt, gt);\\n            }\\n            return list;\\n        }\\n        private void addRange(List<String> list, int lo, int hi) {\\n            if(lo > hi) return;\\n            else if(lo == hi) list.add(String.valueOf(lo));\\n            else list.add(lo + \"->\" + hi);\\n        }"
		},
		{
			"lc_ans_id":"50631",
			"view":"2054",
			"top":"3",
			"title":"Ten line python solution",
			"vote":"25",
			"content":"      def findMissingRanges(self, A, lower, upper):\\n            result = []\\n            A.append(upper+1)\\n            pre = lower - 1\\n            for i in A:\\n               if (i == pre + 2):\\n                   result.append(str(i-1))\\n               elif (i > pre + 2):\\n                   result.append(str(pre + 1) + \"->\" + str(i -1))\\n               pre = i\\n            return result"
		},
		{
			"lc_ans_id":"50468",
			"view":"1235",
			"top":"4",
			"title":"Accepted Java solution 8 lines & 0ms",
			"vote":"18",
			"content":"```\\npublic class Solution {\\n    public List<String> findMissingRanges(int[] nums, int lower, int upper) {\\n        List<String> res = new ArrayList<>();\\n        for(int i : nums) {\\n            if(i > lower) res.add(lower+((i-1 > lower)?\"->\"+(i-1):\"\"));\\n            if(i == upper) return res; // Avoid overflow\\n            lower = i+1;\\n        }\\n        if(lower <= upper) res.add(lower + ((upper > lower)?\"->\"+(upper):\"\"));\\n        return res;\\n    }\\n}\\n```\\nJust 8 lines but still very readable."
		},
		{
			"lc_ans_id":"50492",
			"view":"3558",
			"top":"5",
			"title":"Simply 0ms C++ solution",
			"vote":"11",
			"content":"    class Solution {\\n    public:\\n        string get_range(int start, int end)\\n        {\\n            return start==end? to_string(start) : to_string(start)+\"->\"+to_string(end);\\n        }\\n        vector<string> findMissingRanges(vector<int>& nums, int lower, int upper) {\\n            vector<string> result;\\n            int pre = lower-1;\\n            for(int i =0; i <= nums.size(); i++)\\n            {\\n               int cur = (i==nums.size()? upper+1:nums[i]);\\n               if(cur-pre>=2)\\n                result.push_back(get_range(pre+1,cur-1));\\n                pre = cur;\\n            }\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"50474",
			"view":"594",
			"top":"6",
			"title":"Concise Python Solution with Explanation",
			"vote":"7",
			"content":"Just simply  insert `lower-1` and `upper+1` into the list\\n\\nThe missing range should be `num[i]+1 ~ num[i+1]-1`\\n\\n    def findMissingRanges(self, nums, lower, upper):\\n        \"\"\"\\n        :type nums: List[int]\\n        :type lower: int\\n        :type upper: int\\n        :rtype: List[str]\\n        \"\"\"\\n        nums.insert(0,lower-1)\\n        nums.append(upper+1)\\n        res = []\\n        i = 0\\n        while i<len(nums)-1:\\n            left,right = nums[i],nums[i+1]\\n            if left!=right-1:\\n                if right-left==2:\\n                    res.append(str(right-1))\\n                else:\\n                    res.append(str(left+1)+\"->\"+str(right-1))\\n            i=i+1\\n        return res"
		},
		{
			"lc_ans_id":"50481",
			"view":"1539",
			"top":"7",
			"title":"Java - short and easy to understand with some comments.",
			"vote":"7",
			"content":"    private String outputRange(int n, int m) {\\n\\t\\treturn (n == m)?String.valueOf(n) : n + \"->\" + m;\\n\\t}\\n\\n\\tpublic List<String> findMissingRanges(int[] nums, int lower, int upper) {\\n\\t\\tList<String> ranges = new ArrayList<String>();\\n\\t\\tif (nums.length == 0) {  //Empty array misses the range lower->upper.\\n\\t\\t\\tranges.add(outputRange(lower, upper));\\n\\t\\t\\treturn ranges;\\n\\t\\t}\\n\\t\\tint prev;\\n\\t\\tif (nums[0] - lower > 0) {    //Handles lower boundary. Notice \"inclusive\".\\n\\t\\t\\tranges.add(outputRange(lower, nums[0] - 1));\\n\\t\\t\\tprev = nums[0];\\n\\t\\t} else {\\n\\t\\t\\tprev = lower;\\n\\t\\t}\\n\\t\\tfor (int cur : nums) {\\n\\t\\t\\tif (cur - prev > 1) { \\n\\t\\t\\t\\tranges.add(outputRange(prev + 1, cur - 1)); //Misses range if distance > 1.\\n\\t\\t\\t}\\n\\t\\t\\tprev = cur;\\n\\t\\t}\\n\\t\\tif (upper - prev > 0) {  //Handles the upper boundary.\\n\\t\\t\\tranges.add(outputRange(prev + 1, upper));\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn ranges;\\n\\t}"
		},
		{
			"lc_ans_id":"50505",
			"view":"1839",
			"top":"8",
			"title":"Shouldn't we also consider corner cases where INT_MIN and INT_MAX are involved?",
			"vote":"7",
			"content":"I noticed that OJ currently does not have test cases which involves extreme integer values, i.e. INT_MIN/INT_MAX. For instance, the following code:\\n\\n    vector<string> res;\\n    char buf[50];\\n    void addMissingRange(int left, int right, bool inc_left = false, bool inc_right = false)\\n    {\\n        if (right < left) return; // The range does not exist\\n        else if (right == left) sprintf(buf, \"%d\", left); // The range has only one element\\n        else sprintf(buf, \"%d->%d\", left, right); // A two element range\\n        \\n        res.push_back(buf);\\n    }\\n    \\n    vector<string> findMissingRanges(int A[], int n, int lower, int upper) {\\n        int last = lower-1;\\n        for (int i = 0; i < n; ++i)\\n        {\\n            addMissingRange(last+1, A[i]-1);\\n            last = A[i];\\n        }\\n        addMissingRange(last+1, upper); // Add the last range.\\n        return res;\\n    }\\n\\nwould pass OJ, but as a matter of fact, it fails on inputs like this:\\n\\n    A = [INT_MAX]; lower = 0, upper = INT_MAX;\\n\\nThe expected output should be: [\"0->2147483646\"], \\n\\nbut the actual output produced by the code above is: [\"0->2147483646\", \"-2147483648->2147483647\"]\\n\\nIt is because 'last+1' in the second last row overflows to INT_MIN, thus creating a giant range between 'last' and 'upper'.\\n\\n\\nSo my questions are:\\n\\n1. Do you guys think that we should add those corner cases to OJ?\\n\\n2. If I would like to make sure my code works for ALL possible inputs, is there any elegant trick that I can use to avoid the overflow problem?\\n\\nThanks."
		},
		{
			"lc_ans_id":"50540",
			"view":"180",
			"top":"9",
			"title":"Shortest Java solution, can pass new added INT_MAX case",
			"vote":"5",
			"content":"'''\\n\\n    public class Solution {\\n    \\n    public List<String> findMissingRanges(int[] nums, int lower, int upper){\\n        List<String> res = new ArrayList<String>();\\n        long low = (long)lower;\\n        long high = (long)lower;\\n        \\n        for(int i=0;i<=nums.length;i++){        //i<=nums.length can add last missing range\\n            low = i==0?low:(long)nums[i-1]+1;\\n            high = i==nums.length?(long)upper:(long)nums[i]-1;\\n            \\n            if(low==high) res.add(low+\"\");\\n            if(low<high) res.add(low+\"->\"+high); \\n        }\\n        return res;\\n    }\\n}\\n'''"
		}
	],
	"id":"163",
	"title":"Missing Ranges",
	"content":"<p>\r\nGiven a sorted integer array where <b>the range of elements are in the inclusive range [<i>lower</i>, <i>upper</i>]</b>, return its missing ranges.</p>\r\n\r\n<p>\r\nFor example, given <code>[0, 1, 3, 50, 75]</code>, <i>lower</i> = 0 and <i>upper</i> = 99, return <code>[\"2\", \"4->49\", \"51->74\", \"76->99\"].</code>\r\n</p>",
	"frequency":"246",
	"ac_num":"35543"
}