{
	"difficulty":"2",
	"submit_num":"295266",
	"show_id":"228",
	"leetcode_id":"228",
	"answers":[
		{
			"lc_ans_id":"63219",
			"view":"19251",
			"top":"0",
			"title":"Accepted JAVA solution--easy to understand",
			"vote":"79",
			"content":"    List<String> list=new ArrayList();\\n    \\tif(nums.length==1){\\n    \\t\\tlist.add(nums[0]+\"\");\\n    \\t\\treturn list;\\n    \\t}\\n        for(int i=0;i<nums.length;i++){\\n        \\tint a=nums[i];\\n        \\twhile(i+1<nums.length&&(nums[i+1]-nums[i])==1){\\n        \\t\\ti++;\\n        \\t}\\n        \\tif(a!=nums[i]){\\n        \\t\\tlist.add(a+\"->\"+nums[i]);\\n        \\t}else{\\n        \\t\\tlist.add(a+\"\");\\n        \\t}\\n        }\\n        return list;"
		},
		{
			"lc_ans_id":"63193",
			"view":"8957",
			"top":"1",
			"title":"6 lines in Python",
			"vote":"50",
			"content":"Three versions of the same algorithm, all take O(n) time.\\n\\n---\\n\\n**Solution 1**\\n\\nJust collect the ranges, then format and return them.\\n\\n    def summaryRanges(self, nums):\\n        ranges = []\\n        for n in nums:\\n            if not ranges or n > ranges[-1][-1] + 1:\\n                ranges += [],\\n            ranges[-1][1:] = n,\\n        return ['->'.join(map(str, r)) for r in ranges]\\n\\n---\\n\\n**Solution 2**\\n\\nA variation of solution 1, holding the current range in an extra variable `r` to make things easier. Note that `r` contains at most two elements, so the `in`-check takes constant time.\\n\\n    def summaryRanges(self, nums):\\n        ranges, r = [], []\\n        for n in nums:\\n            if n-1 not in r:\\n                r = []\\n                ranges += r,\\n            r[1:] = n,\\n        return ['->'.join(map(str, r)) for r in ranges]\\n\\n---\\n\\n**Solution 3**\\n\\nA tricky short version.\\n\\n    def summaryRanges(self, nums):\\n        ranges = r = []\\n        for n in nums:\\n            if `n-1` not in r:\\n                r = []\\n                ranges += r,\\n            r[1:] = `n`,\\n        return map('->'.join, ranges)\\n\\n---\\n\\n**About the commas :-)**\\n\\nThree people asked about them in the comments, so I'll also explain it here as well. I have these two basic cases:\\n\\n    ranges += [],\\n    r[1:] = n,\\n\\nWhy the trailing commas? Because it turns the right hand side into a tuple and I get the same effects as these more common alternatives:\\n\\n    ranges += [[]]\\n    or\\n    ranges.append([])\\n\\n    r[1:] = [n]\\n\\nWithout the comma, ...\\n\\n - `ranges += []` wouldn't add `[]` itself but only its elements, i.e., nothing.\\n - `r[1:] = n` wouldn't work, because my `n` is not an iterable.\\n\\nWhy do it this way instead of the more common alternatives I showed above? Because it's shorter and faster (according to tests I did a while back)."
		},
		{
			"lc_ans_id":"63284",
			"view":"7167",
			"top":"2",
			"title":"10 line c++ easy understand",
			"vote":"42",
			"content":"       vector<string> summaryRanges(vector<int>& nums) {\\n        const int size_n = nums.size();\\n        vector<string> res;\\n        if ( 0 == size_n) return res;\\n        for (int i = 0; i < size_n;) {\\n            int start = i, end = i;\\n            while (end + 1 < size_n && nums[end+1] == nums[end] + 1) end++;\\n            if (end > start) res.push_back(to_string(nums[start]) + \"->\" + to_string(nums[end]));\\n            else res.push_back(to_string(nums[start]));\\n            i = end+1;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"63386",
			"view":"4011",
			"top":"3",
			"title":"My concise Java solution",
			"vote":"26",
			"content":"    public List<String> summaryRanges(int[] nums) {\\n        int length = nums.length;\\n        List<String> result = new ArrayList<String>(length);\\n        for (int i = 0; i < length; i++) {\\n            int num = nums[i];\\n            while (i < length - 1 && nums[i] + 1 == nums[i + 1]) {\\n                i++;\\n            }\\n            if (num != nums[i]) {\\n                result.add(num + \"->\" + nums[i]);\\n            } else {\\n                result.add(num + \"\");\\n            }\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"63474",
			"view":"1878",
			"top":"4",
			"title":"Idea + 1-Liner: Group by number-index",
			"vote":"24",
			"content":"**The Idea**\\n\\nThe difference between a number and its index identifies the range. Consider the given example input:\\n\\n    numbers:  [0, 1, 2, 4, 5, 7]\\n    indexes:  [0, 1, 2, 3, 4, 5]\\n    subtract: [0, 0, 0, 1, 1, 2]\\n\\nYou can see I have three differences (0, 1 and 2), corresponding to the three ranges. That can then be used to group the elements.\\n\\n---\\n\\n**Solution 1**\\n\\nRuby and Python can exploit it particularly well, thanks to their groupby functions:\\n\\nRuby:\\n\\n    def summary_ranges(nums)\\n      nums.each_with_index.group_by{|n,i| n-i}.map{|d,r| [r[0][0], r[-1][0]].uniq.join('->')}\\n    end\\n\\nPython:\\n\\n    def summaryRanges(self, nums):\\n        return [re.sub('->.*>', '->', '->'.join(`n` for i, n in g))\\n                for _, g in itertools.groupby(enumerate(nums), lambda (i, n): n-i)]\\n\\n---\\n\\n**Solution 2**\\n\\nHere I build two dicts, telling me the first and last number of each range. For the given example I get:\\n\\n    first = {0: 0, 1: 4, 2: 7}\\n    last  = {0: 2, 1: 5, 2: 7}\\n\\nThe code:\\n\\n    def summaryRanges(self, nums):\\n        diff = [(n-i, n) for i, n in enumerate(nums)]\\n        first, last = dict(diff[::-1]), dict(diff)\\n        return [`n` + ('->'+`last[d]`)*(n<last[d]) for d, n in sorted(first.items())]\\n\\n---\\n\\n**Solution 3**\\n\\nStoring `[first, last]` for each range in a dict (`last` being optional).\\n\\n    def summaryRanges(self, nums):\\n        ranges = collections.defaultdict(list)\\n        for i, n in enumerate(nums):\\n            ranges[n-i][1:] = n,\\n        return ['->'.join(map(str, r)) for r in sorted(ranges.values())]"
		},
		{
			"lc_ans_id":"63236",
			"view":"1727",
			"top":"5",
			"title":"My java 0ms(not always Luckily !You are here! Your runtime beats 97.90% of java submissions.)",
			"vote":"13",
			"content":"    public class Solution {\\n        public List<String> summaryRanges(int[] nums) {\\n    \\t\\tList<String> list = new ArrayList<>();\\n    \\t\\tfor (int i = 0, len = nums.length, k; i < len; i = k + 1) {\\n    \\t\\t\\tk = help(nums, i, len);\\n    \\t\\t\\tif (i != k)\\n    \\t\\t\\t\\tlist.add(\"\" + nums[i] + \"->\" + nums[k]);\\n    \\t\\t\\telse\\n    \\t\\t\\t\\tlist.add(\"\" + nums[i]);\\n    \\t\\t}\\n    \\t\\treturn list;\\n    \\t}\\n    \\n    \\tprivate int help(int[] nums, int l, int r) {\\n    \\t\\twhile (l + 1 < r) {\\n    \\t\\t\\tint m = (l + r) / 2;\\n    \\t\\t\\tif (nums[m] - nums[l] == m - l)\\n    \\t\\t\\t\\tl = m;\\n    \\t\\t\\telse\\n    \\t\\t\\t\\tr = m;\\n    \\t\\t}\\n    \\t\\treturn l;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"63451",
			"view":"1386",
			"top":"6",
			"title":"9 lines, c++, 0ms solution",
			"vote":"13",
			"content":"     vector<string> summaryRanges(vector<int>& nums) {\\n        int i = 0, size = nums.size();\\n        vector<string> result; \\n        while(i < size){\\n            int j = 1; \\n            while(i + j < size && nums[i + j] - nums[i] == j) ++j;\\n            result.push_back(j <= 1 ? to_string(nums[i]) : to_string(nums[i]) + \"->\" + to_string(nums[i + j - 1]));\\n            i += j; \\n        }\\n        return result; \\n    }"
		},
		{
			"lc_ans_id":"63446",
			"view":"1045",
			"top":"7",
			"title":"My easy to understand Python solution",
			"vote":"10",
			"content":"    def summaryRanges(self, nums):\\n        if not nums:\\n            return []\\n        res, i, start = [], 0, 0\\n        while i < len(nums)-1:\\n            if nums[i]+1 != nums[i+1]:\\n                res.append(self.printRange(nums[start], nums[i]))\\n                start = i+1\\n            i += 1\\n        res.append(self.printRange(nums[start], nums[i]))\\n        return res\\n    \\n    def printRange(self, l, r):\\n        if l == r:\\n            return str(l)\\n        else:\\n            return str(l) + \"->\" + str(r)"
		},
		{
			"lc_ans_id":"63372",
			"view":"666",
			"top":"8",
			"title":"My c++ solution using only one for loop",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        vector<string> summaryRanges(vector<int>& nums) {\\n            vector<string> ret;\\n            int s = 0;\\n            for(int i = 0; i < nums.size(); i++){\\n                if(i + 1 == nums.size() || nums[i] + 1 != nums[i+1]){\\n                    string tmp = to_string(nums[s]);\\n                    if(i != s) tmp += \"->\" + to_string(nums[i]);\\n                    ret.push_back(tmp);\\n                    s = i + 1;\\n                }\\n            }\\n            \\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"63455",
			"view":"392",
			"top":"9",
			"title":"Share my Accepted JavaScript Solution",
			"vote":"9",
			"content":"Use a '#' to mark the end of the array, similar to Leetcode 38 Count and Say.\\n\\n    var summaryRanges = function(nums) {\\n        var t = 0\\n        var ans = []\\n        nums.push('#')\\n        for(var i=1;i<nums.length;i++)\\n            if(nums[i]-nums[t] !== i-t){\\n                if(i-t>1)\\n                    ans.push(nums[t]+'->'+(nums[i-1]))\\n                else\\n                    ans.push(nums[t].toString())\\n                t = i\\n            }\\n        return ans\\n    }"
		}
	],
	"id":"228",
	"title":"Summary Ranges",
	"content":"<p>\r\nGiven a sorted integer array without duplicates, return the summary of its ranges.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [0,1,2,4,5,7]\r\n<b>Output:</b> [\"0->2\",\"4->5\",\"7\"]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [0,2,3,4,6,8,9]\r\n<b>Output:</b> [\"0\",\"2->4\",\"6\",\"8->9\"]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jianchao.li.fighter\">@jianchao.li.fighter</a> for adding this problem and creating all test cases.</p>",
	"frequency":"493",
	"ac_num":"92901"
}