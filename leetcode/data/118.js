{
	"difficulty":"1",
	"submit_num":"399706",
	"show_id":"118",
	"leetcode_id":"118",
	"answers":[
		{
			"lc_ans_id":"38141",
			"view":"33721",
			"top":"0",
			"title":"My concise solution in Java",
			"vote":"130",
			"content":"    public class Solution {\\n    public List<List<Integer>> generate(int numRows)\\n\\t{\\n\\t\\tList<List<Integer>> allrows = new ArrayList<List<Integer>>();\\n\\t\\tArrayList<Integer> row = new ArrayList<Integer>();\\n\\t\\tfor(int i=0;i<numRows;i++)\\n\\t\\t{\\n\\t\\t\\trow.add(0, 1);\\n\\t\\t\\tfor(int j=1;j<row.size()-1;j++)\\n\\t\\t\\t\\trow.set(j, row.get(j)+row.get(j+1));\\n\\t\\t\\tallrows.add(new ArrayList<Integer>(row));\\n\\t\\t}\\n\\t\\treturn allrows;\\n\\t\\t\\n\\t}\\n}"
		},
		{
			"lc_ans_id":"38125",
			"view":"15256",
			"top":"1",
			"title":"Solution in Java",
			"vote":"96",
			"content":"two loops, one go through the row, one go through the column\\n\\ndatabase: pretty straight forward, ArrayList\\n\\ncalculate element value: K(i)(j)=K(i-1)(j-1)+K(i-1)(j) except for the first and last element\\n\\n    public class Solution {\\n        public List<List<Integer>> generate(int numRows) {\\n            List<List<Integer>> triangle = new ArrayList<List<Integer>>();\\n            if (numRows <=0){\\n                return triangle;\\n            }\\n            for (int i=0; i<numRows; i++){\\n                List<Integer> row =  new ArrayList<Integer>();\\n                for (int j=0; j<i+1; j++){\\n                    if (j==0 || j==i){\\n                        row.add(1);\\n                    } else {\\n                        row.add(triangle.get(i-1).get(j-1)+triangle.get(i-1).get(j));\\n                    }\\n                }\\n                triangle.add(row);\\n            }\\n            return triangle;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"38128",
			"view":"7505",
			"top":"2",
			"title":"Python 4 lines short solution using map.",
			"vote":"80",
			"content":"    def generate(self, numRows):\\n            res = [[1]]\\n            for i in range(1, numRows):\\n                res += [map(lambda x, y: x+y, res[-1] + [0], [0] + res[-1])]\\n            return res[:numRows]\\n\\n\\nexplanation: Any row can be constructed using the offset sum of the previous row. Example:\\n\\n        \\n        1 3 3 1 0 \\n     +  0 1 3 3 1\\n     =  1 4 6 4 1"
		},
		{
			"lc_ans_id":"38171",
			"view":"10407",
			"top":"3",
			"title":"Maybe shortest c++ solution",
			"vote":"61",
			"content":"    class Solution {\\n    public:\\n        vector<vector<int> > generate(int numRows) {\\n            vector<vector<int>> r(numRows);\\n    \\n            for (int i = 0; i < numRows; i++) {\\n                r[i].resize(i + 1);\\n                r[i][0] = r[i][i] = 1;\\n      \\n                for (int j = 1; j < i; j++)\\n                    r[i][j] = r[i - 1][j - 1] + r[i - 1][j];\\n            }\\n            \\n            return r;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"38260",
			"view":"4300",
			"top":"4",
			"title":"Java clean Code 1ms dp",
			"vote":"20",
			"content":"    public class Solution {\\n    \\tpublic List<List<Integer>> generate(int numRows) {\\n    \\t\\tList<List<Integer>> res = new ArrayList<List<Integer>>();\\n    \\t\\tList<Integer> row, pre = null;\\n    \\t\\tfor (int i = 0; i < numRows; ++i) {\\n    \\t\\t\\trow = new ArrayList<Integer>();\\n    \\t\\t\\tfor (int j = 0; j <= i; ++j)\\n    \\t\\t\\t\\tif (j == 0 || j == i)\\n    \\t\\t\\t\\t\\trow.add(1);\\n    \\t\\t\\t\\telse\\n    \\t\\t\\t\\t\\trow.add(pre.get(j - 1) + pre.get(j));\\n    \\t\\t\\tpre = row;\\n    \\t\\t\\tres.add(row);\\n    \\t\\t}\\n    \\t\\treturn res;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"38150",
			"view":"3224",
			"top":"5",
			"title":"My C++ code, 0ms",
			"vote":"18",
			"content":"just do it in a straightforward, each time generate a new line, first push all 1 vector into res and then update the elements from 1 to i-1.\\n\\n    class Solution {\\n    public:\\n        vector<vector<int>> generate(int numRows) {\\n            vector<vector<int>> res;\\n            for(auto i=0;i<numRows;++i)\\n            {\\n                res.push_back(vector<int>(i+1,1));\\n                for(auto j=1; j<i; ++j) res[i][j] = res[i-1][j-1] + res[i-1][j];\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"38347",
			"view":"1357",
			"top":"6",
			"title":"My 10 lines c++ code",
			"vote":"11",
			"content":"    class Solution {\\n    public:\\n        vector<vector<int>> generate(int numRows) {\\n            vector<vector<int> > ret(numRows, vector<int>());\\n            for(int i=0; i<numRows; i++) {\\n                for(int j=0; j<=i; j++) {\\n                    ret[i].push_back(j == 0 ? 1 : j == i ? 1 : ret[i-1][j-1] + ret[i-1][j]);\\n                }\\n            }\\n            return ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"38136",
			"view":"2685",
			"top":"7",
			"title":"A simple python solution",
			"vote":"11",
			"content":"    class Solution:\\n    # @return a list of lists of integers\\n    def generate(self, numRows):\\n        lists = []\\n        for i in range(numRows):\\n            lists.append([1]*(i+1))\\n            if i>1 :\\n                for j in range(1,i):\\n                    lists[i][j]=lists[i-1][j-1]+lists[i-1][j]\\n        return lists"
		},
		{
			"lc_ans_id":"38277",
			"view":"818",
			"top":"8",
			"title":"Simple Python 4 lines",
			"vote":"9",
			"content":"    def generate(numRows):\\n        pascal = [[1]*(i+1) for i in range(numRows)]\\n        for i in range(numRows):\\n            for j in range(1,i):\\n                pascal[i][j] = pascal[i-1][j-1] + pascal[i-1][j]\\n        return pascal"
		},
		{
			"lc_ans_id":"38182",
			"view":"966",
			"top":"9",
			"title":"Short C++ solution using only O(k) extra space",
			"vote":"8",
			"content":"Starting with empty array. Because row i + 1 is longer than row i by 1, and the last number in each row is always 1.\\n\\nSo suppose we are just done with row i, when when proceed with row i + 1:\\n\\n1) We need to push a \"1\" to the current array first we have (with row i's result), \\n\\n2) Then update index 1 through i. Observing that first number of array always will be 1 too, which doesn't need to be updated since we already did that when we deal with row 0 (last and first index are both 0 for row 0).\\n\\n    class Solution {\\n    public:\\n        vector<vector<int>> generate(int numRows) {\\n            vector<vector<int>> result;\\n            \\n            vector<int> row;\\n            for(int i = 0; i < numRows; i++){\\n                row.push_back(1);\\n                for(int j = i - 1; j > 0; j--){\\n                    row[j] = row[j - 1] + row[j];\\n                }\\n                result.push_back(row);\\n            }\\n            \\n            return result;\\n        }\\n    };"
		}
	],
	"id":"118",
	"title":"Pascal's Triangle",
	"content":"<p>Given <i>numRows</i>, generate the first <i>numRows</i> of Pascal's triangle.</p>\n\n<p>\nFor example, given <i>numRows</i> = 5,<br />\nReturn\n<pre>\n[\n     [1],\n    [1,1],\n   [1,2,1],\n  [1,3,3,1],\n [1,4,6,4,1]\n]\n</pre>\n</p>",
	"frequency":"530",
	"ac_num":"158467"
}