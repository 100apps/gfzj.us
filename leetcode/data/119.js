{
	"difficulty":"1",
	"submit_num":"361576",
	"show_id":"119",
	"leetcode_id":"119",
	"answers":[
		{
			"lc_ans_id":"38420",
			"view":"29924",
			"top":"0",
			"title":"Here is my brief O(k) solution",
			"vote":"117",
			"content":"The basic idea is to iteratively update the array from the end to the beginning. \\n\\n    class Solution {\\n    public:\\n        vector<int> getRow(int rowIndex) {\\n            vector<int> A(rowIndex+1, 0);\\n            A[0] = 1;\\n            for(int i=1; i<rowIndex+1; i++)\\n                for(int j=i; j>=1; j--)\\n                    A[j] += A[j-1];\\n            return A;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"38478",
			"view":"20387",
			"top":"1",
			"title":"My accepted java solution, any better code?",
			"vote":"58",
			"content":"      public List<Integer> getRow(int rowIndex) {\\n\\t\\tList<Integer> list = new ArrayList<Integer>();\\n\\t\\tif (rowIndex < 0)\\n\\t\\t\\treturn list;\\n\\n\\t\\tfor (int i = 0; i < rowIndex + 1; i++) {\\n\\t\\t\\tlist.add(0, 1);\\n\\t\\t\\tfor (int j = 1; j < list.size() - 1; j++) {\\n\\t\\t\\t\\tlist.set(j, list.get(j) + list.get(j + 1));\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn list;\\n\\t}"
		},
		{
			"lc_ans_id":"38437",
			"view":"9140",
			"top":"2",
			"title":"My 8 lines java solution use ArrayList",
			"vote":"39",
			"content":"    public List<Integer> getRow(int rowIndex) {\\n        List<Integer> res = new ArrayList<Integer>();\\n        for(int i = 0;i<rowIndex+1;i++) {\\n        \\t\\tres.add(1);\\n        \\t\\tfor(int j=i-1;j>0;j--) {\\n        \\t\\t\\tres.set(j, res.get(j-1)+res.get(j));\\n        \\t\\t}\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"38467",
			"view":"5574",
			"top":"3",
			"title":"Very simple Python solution",
			"vote":"36",
			"content":"```\\nclass Solution(object):\\n    def getRow(self, rowIndex):\\n        \"\"\"\\n        :type rowIndex: int\\n        :rtype: List[int]\\n        \"\"\"\\n        row = [1]\\n        for _ in range(rowIndex):\\n            row = [x + y for x, y in zip([0]+row, row+[0])]\\n        return row\\n```\\n\\nUpdated according to @greg-irl 's suggestion below. It runs 30% faster than using ```map()```"
		},
		{
			"lc_ans_id":"38454",
			"view":"6644",
			"top":"4",
			"title":"Sharing my c++ code, very simple",
			"vote":"33",
			"content":"    class Solution {\\n    public:\\n        vector<int> getRow(int rowIndex) {\\n            vector<int> vi(rowIndex + 1);\\n           \\tvi[0] = 1;\\n            for (int i = 0; i <= rowIndex ; ++i)\\n            {\\n            \\tfor (int j = i; j > 0; --j)\\n            \\t{\\n    \\t        \\tvi[j] = vi[j] + vi[j-1];\\n            \\t}\\n            }\\n            return vi;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"38482",
			"view":"2465",
			"top":"5",
			"title":"My 12 Lines of C++ Solution in 2ms, with only one loop. O(k) time and O(k) space.",
			"vote":"25",
			"content":"class Solution {\\npublic:\\n\\n    vector<int> getRow(int rowIndex) {\\n        vector<int> ans(rowIndex+1,1);\\n        int small = rowIndex/2;\\n        long comb = 1;\\n        int j = 1;\\n        for (int i=rowIndex; i>=small; i--){\\n            comb *= i;\\n            comb /= j;\\n            j ++;\\n            ans[i-1] = (int)comb;\\n            ans[j-1] = (int)comb;\\n        }\\n        return ans;\\n    }\\n\\n};\\n\\nNote that this solution is math derived from number of Combinations. \\n\\nEach line of Pascal's Triangle is a full set of Combination number based on k .\\n\\ncomb(k,p) = k! /( p! *(k-p)!) = comb(k,k-p)\\n\\nif p < k-p\\n\\ncomb(k,p) = comb(k,p-1) * (k-p+1) / p\\n\\n                                          \\nBecause :\\n\\ncomb(k,p) =     [ k * (k-1) * (k-2) *... (k-p+1)] /   [1 * 2      * 3       *...(p)]"
		},
		{
			"lc_ans_id":"38513",
			"view":"3151",
			"top":"6",
			"title":"My clean O(k) java solution",
			"vote":"23",
			"content":"Based on rules:\\n\\nrow k of Pascal's Triangle: \\n\\n`[C(k,0), C(k,1), ..., C(k, k-1), C(k, k)]`\\n\\nand\\n\\n`C[k,i] = C[k,i-1]*(k-i+1)/i`\\n\\n \\n \\n\\n        public class Solution {\\n            public List<Integer> getRow(int rowIndex) {\\n                Integer[] rowList = new Integer[rowIndex+1];\\n                rowList[0] = 1;\\n                for(int i=1; i<rowList.length;i++) {\\n                    rowList[i] = (int)((long)rowList[i-1]*(rowIndex-(i-1))/(i));\\n                }\\n                return Arrays.asList(rowList);\\n            }\\n        }"
		},
		{
			"lc_ans_id":"38584",
			"view":"1875",
			"top":"7",
			"title":"Another accepted Java solution",
			"vote":"22",
			"content":"    public class Solution {\\n        public List<Integer> getRow(int k) {\\n            Integer[] arr = new Integer[k + 1];\\n            Arrays.fill(arr, 0);\\n            arr[0] = 1;\\n            \\n            for (int i = 1; i <= k; i++) \\n                for (int j = i; j > 0; j--) \\n                    arr[j] = arr[j] + arr[j - 1];\\n            \\n            return Arrays.asList(arr);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"38645",
			"view":"1205",
			"top":"8",
			"title":"C++ solution, 0ms, one pass, no extra space",
			"vote":"13",
			"content":"Two considerations:\\n1) At Nth row, each k-th element is determined by a well-known formula: C(n, k) = n! / (k!*(n-k)!). Obviously, we don't want to calculate factorial each time since we need to fill in the whole row, so we can just multiply both the numerator and denominator sequentially\\n\\n2) A row in Pascal triangle is always symmetric, so we fill up two elements at each loop iteration\\n\\nA drawback: In order to avoid overflows, we need to employ ugly casts to unsigned long\\n\\n\\n    class Solution {\\n    public:\\n        vector<int> getRow(int rowIndex) {\\n            vector<int> r;\\n            r.resize(rowIndex + 1);\\n            r[0] = r[rowIndex] = 1;\\n            for(auto i = 1; i < (r.size() + 1)/2; ++i)\\n            {\\n                r[i] = r[rowIndex - i] = (unsigned long)r[i - 1]*(unsigned long)(rowIndex - i + 1)/i;\\n            }\\n            return r;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"38473",
			"view":"1072",
			"top":"9",
			"title":"Java O(k) solution with explanation",
			"vote":"12",
			"content":"When generating each row, we can use the previous row directly, so this way we only use O(k) space with k being the number of row.  For each new row, we append a `1`, letting j iterate from `i - 1` backward to `1`, and set the `jth` element as `res.set(j, res.get(j-1) + res.get(j))`.  For example, when `k = 4`, the process goes like this:\\n\\n    k == 0\\n    [1] \\n    k == 1\\n    [11] \\n    k == 2\\n    [111]  add 1\\n    [121]  calculate jth spot\\n    k == 3\\n    [1211]  add 1\\n    [1331]   calculate jth spot\\n    k == 4\\n    [13311]  add 1\\n    [14641]  calculate jth spot\\n\\n\\nJava\\n\\n       public List<Integer> getRow(int rowIndex) {\\n            List<Integer> res = new ArrayList<>();\\n            for(int i = 0; i <= rowIndex; i++) {\\n                res.add(1);\\n                for(int j = i-1; j > 0; j--) {\\n                    res.set(j, res.get(j-1) + res.get(j));\\n                }\\n            }\\n            return res;\\n        }"
		}
	],
	"id":"119",
	"title":"Pascal's Triangle II",
	"content":"<p>Given an index <i>k</i>, return the <i>k</i><sup>th</sup> row of the Pascal's triangle.</p>\n\n<p>\nFor example, given <i>k</i> = 3,<br />\nReturn <code>[1,3,3,1]</code>.\n</p>\n\n<p>\n<b>Note:</b><br />\nCould you optimize your algorithm to use only <i>O</i>(<i>k</i>) extra space?\n</p>",
	"frequency":"398",
	"ac_num":"136772"
}