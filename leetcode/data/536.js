{
	"difficulty":"2",
	"submit_num":"21779",
	"show_id":"553",
	"leetcode_id":"553",
	"answers":[
		{
			"lc_ans_id":"101687",
			"view":"9125",
			"top":"0",
			"title":"Easy to understand simple O(n) solution with explanation",
			"vote":"40",
			"content":"X1/X2/X3/../Xn will always be equal to (X1/X2) * Y, no matter how you place parentheses. i.e no matter how you place parentheses, X1 always goes to the numerator and X2 always goes to the denominator. Hence you just need to maximize Y. And Y is maximized when it is equal to X3 *..*Xn. So the answer is always X1/(X2/X3/../Xn) = (X1 *X3 *..*Xn)/X2\\n```\\nclass Solution {\\npublic:\\n    string optimalDivision(vector<int>& nums) {\\n        string ans;\\n        if(!nums.size()) return ans;\\n        ans = to_string(nums[0]);\\n        if(nums.size()==1) return ans;\\n        if(nums.size()==2) return ans + \"/\" + to_string(nums[1]);\\n        ans += \"/(\" + to_string(nums[1]);\\n        for(int i = 2; i < nums.size();++i)\\n            ans += \"/\" + to_string(nums[i]);\\n        ans += \")\";\\n        return ans;\\n};\\n```"
		},
		{
			"lc_ans_id":"101697",
			"view":"4821",
			"top":"1",
			"title":"Java Solution, Backtracking",
			"vote":"15",
			"content":"```\\npublic class Solution {\\n    class Result {\\n        String str;\\n        double val;\\n    }\\n    \\n    public String optimalDivision(int[] nums) {\\n        int len = nums.length;\\n        return getMax(nums, 0, len - 1).str;\\n    }\\n    \\n    private Result getMax(int[] nums, int start, int end) {\\n        Result r = new Result();\\n        r.val = -1.0;\\n        \\n        if (start == end) {\\n            r.str = nums[start] + \"\";\\n            r.val = (double)nums[start];\\n        }\\n        else if (start + 1 == end) {\\n            r.str = nums[start] + \"/\" + nums[end];\\n            r.val = (double)nums[start] / (double)nums[end];\\n        }\\n        else {\\n            for (int i = start; i < end; i++) {\\n                Result r1 = getMax(nums, start, i);\\n                Result r2 = getMin(nums, i + 1, end);\\n                if (r1.val / r2.val > r.val) {\\n                    r.str = r1.str + \"/\" + (end - i >= 2 ? \"(\" + r2.str + \")\" : r2.str);\\n                    r.val = r1.val / r2.val;\\n                }\\n            }\\n        }\\n        \\n        //System.out.println(\"getMax \" + start + \" \" + end + \"->\" + r.str + \":\" + r.val);\\n        return r;\\n    }\\n    \\n    private Result getMin(int[] nums, int start, int end) {\\n        Result r = new Result();\\n        r.val = Double.MAX_VALUE;\\n        \\n        if (start == end) {\\n            r.str = nums[start] + \"\";\\n            r.val = (double)nums[start];\\n        }\\n        else if (start + 1 == end) {\\n            r.str = nums[start] + \"/\" + nums[end];\\n            r.val = (double)nums[start] / (double)nums[end];\\n        }\\n        else {\\n            for (int i = start; i < end; i++) {\\n                Result r1 = getMin(nums, start, i);\\n                Result r2 = getMax(nums, i + 1, end);\\n                if (r1.val / r2.val < r.val) {\\n                    r.str = r1.str + \"/\" + (end - i >= 2 ? \"(\" + r2.str + \")\" : r2.str);\\n                    r.val = r1.val / r2.val;\\n                }\\n            }\\n        }\\n        \\n        //System.out.println(\"getMin \" + start + \" \" + end + \"->\" + r.str + \":\" + r.val);\\n        return r;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101684",
			"view":"1641",
			"top":"2",
			"title":"Brute force with memory in case of your interviewer forbid tricky solution",
			"vote":"10",
			"content":"This is an Amazon interview question that could be solved in a very tricky way. Since a lot of people have already posted their solutions, I just post a brute force solution in case of the interviewer want a normal way.\\n\\nI use recursion. For each recursion, I find the maximum result and also the minimum result. For example, if you want to know the maximum result of A/B, where A and B are also some expressions, then you only need to know the maximum result of A and the minimum result of B. However, if you want to know the maximum result of C/(A/B), then you also need to know the minimum result of A/B. That's why both maximum and minimum should be stored. \\n\\n```\\n// by fallcreek\\npublic class Solution {\\n\\n    public String optimalDivision(int[] nums) {\\n        Map<String, pair> memory = new HashMap<>();\\n        pair sol = divid(nums,0,nums.length-1, memory);\\n        return sol.maxS;\\n    }\\n    \\n    public pair divid(int[] nums, int start, int end, Map<String, pair> memory){\\n        String key = start + \" \" + end;\\n        if(memory.containsKey(key)) return memory.get(key);\\n        if(start == end)    return new pair(nums[start], \"\" + nums[start],nums[start], \"\" + nums[start]);\\n        \\n        pair sol = new pair(0,\"\",0,\"\");\\n        \\n        for(int i = start; i < end; i++){\\n            pair left = divid(nums, start, i, memory);\\n            pair right = divid(nums, i + 1, end, memory);\\n            \\n            double min = left.min / right.max;\\n            String minS = left.minS + \"/\" + (i + 1 == end ? right.maxS : \"(\" + right.maxS + \")\"); \\n            double max = left.max / right.min;\\n            String maxS = left.maxS + \"/\" + (i + 1 == end ? right.minS : \"(\" + right.minS + \")\"); \\n            if(sol.min == 0 || min < sol.min){\\n                sol.min = min;\\n                sol.minS = minS;\\n            }\\n            if(max > sol.max){\\n                sol.max = max;\\n                sol.maxS = maxS;\\n            }\\n        }\\n        memory.put(key, sol);\\n        return sol;\\n    }\\n}\\n\\nclass pair{\\n    double min;\\n    String minS;\\n    double max;\\n    String maxS;\\n    \\n    public pair(double min, String minS, double max, String maxS){\\n        this.min = min;\\n        this.minS = minS;\\n        this.max = max;\\n        this.maxS = maxS;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101683",
			"view":"5292",
			"top":"3",
			"title":"O(n) very easy Java solution.",
			"vote":"10",
			"content":"```\\npublic class Solution {\\n    public String optimalDivision(int[] nums) {\\n        StringBuilder builder = new StringBuilder();\\n        builder.append(nums[0]);\\n        for (int i = 1; i < nums.length; i++) {\\n            if (i == 1 && nums.length > 2) {\\n                builder.append(\"/(\").append(nums[i]);\\n            } else {\\n                builder.append(\"/\").append(nums[i]);\\n            }\\n        }\\n        \\n        return nums.length > 2 ? builder.append(\")\").toString() : builder.toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101701",
			"view":"2194",
			"top":"4",
			"title":"Python, Straightforward with Explanation (Insightful Approach)",
			"vote":"7",
			"content":"Regardless of parentheses, every element is either in the numerator or denominator of the final fraction.  The expression A[0] / **(** A[1] / A[2] / ... / A[N-1] **)** has every element in the numerator except A[1], and it is impossible for A[1] to be in the numerator, so it is the largest.  We must also be careful with corner cases.\\n\\n```\\ndef optimalDivision(self, A):\\n    A = map(str, A)\\n    if len(A) <= 2: return '/'.join(A)\\n    return '{}/({})'.format(A[0], '/'.join(A[1:]))\\n```"
		},
		{
			"lc_ans_id":"101720",
			"view":"575",
			"top":"5",
			"title":"[C++] [Java] Clean Code",
			"vote":"3",
			"content":"1st number has to be a multiplier.\\n2nd number has to be a divisor.\\nEvery number after though, can be effectively multipliers if divide the 2nd number. like this:\\n    <code>a / (b / c / d / e / f)</code>\\nis the same as:\\n    <code> a / b * c * d * e * f</code> \\n**C++**\\n```\\nclass Solution {\\npublic:\\n    string optimalDivision(vector<int>& nums) {\\n        int n = nums.size();\\n        string expr;\\n        for (int i = 0; i < n; i++) {\\n            if (i > 0) {\\n                expr += \"/\";\\n            }\\n            if (i == 1 && n > 2) {\\n                expr += \"(\";\\n            }\\n            expr += to_string(nums[i]);\\n            if (i == n - 1 && n > 2) {\\n                expr += \")\";\\n            }\\n        }\\n        return expr;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public String optimalDivision(int[] nums) {\\n        int n = nums.length;\\n        String expr = \"\";\\n        for (int i = 0; i < n; i++) {\\n            if (i > 0) {\\n                expr += \"/\";\\n            }\\n            if (i == 1 && n > 2) {\\n                expr += \"(\";\\n            }\\n            expr += nums[i];\\n            if (i == n - 1 && n > 2) {\\n                expr += \")\";\\n            }\\n        }\\n        return expr;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101719",
			"view":"758",
			"top":"6",
			"title":"Simple Java Solution",
			"vote":"3",
			"content":"\\n```\\npublic class Solution {\\n    public String optimalDivision(int[] nums) {\\n        if (nums.length == 1)\\n            return nums[0] + \"\";\\n        if (nums.length == 2)\\n            return nums[0] + \"/\" + nums[1];\\n        String res = nums[0] + \"/(\" + nums[1];\\n        for (int i = 2; i < nums.length; i++) {\\n            res += \"/\" + nums[i];\\n        }\\n        return res + \")\";\\n    }\\n}"
		},
		{
			"lc_ans_id":"101690",
			"view":"209",
			"top":"7",
			"title":"Is this question a joke?  [7ms easy java solution]",
			"vote":"2",
			"content":"The answer has such pattern:    \\n    if nums.length == 1  ------ first-element itself.\\n    if nums.length == 2  ------ first-element / second-element.\\n    if nums.length > 2  ------ first-element / ( the other elements, separated by '/' ) ,  no matter what.\\n\\n```\\npublic class Solution {\\n    public String optimalDivision(int[] nums) {\\n        String str = \"\";\\n        if(nums.length == 0){\\n            return str;\\n        }\\n        str = str + nums[0];\\n        if(nums.length == 1){\\n            return str;\\n        }\\n        str = str + \"/\";\\n        if(nums.length == 2){\\n            return str + nums[1];\\n        }\\n        str = str + \"(\" + nums[1];\\n        for(int i = 2; i < nums.length; i++){\\n            str = str + \"/\" + nums[i];\\n        }\\n        str = str + \")\";\\n        return str;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101709",
			"view":"311",
			"top":"8",
			"title":"[553. Optimal Division] C++_O(n)",
			"vote":"2",
			"content":"....Pretty tricky question..\\n\\n    class Solution {\\n    public:\\n     string optimalDivision(vector<int>& nums) {\\n        if(nums.empty()) return \"\";\\n        string res = to_string(nums[0]);\\n        if(nums.size() > 2){\\n            res += \"/(\";\\n            for(int i = 1; i < nums.size(); ++i){\\n                res += to_string(nums[i]) + '/';\\n            }\\n            res.pop_back();\\n            res += ')';\\n        }else if(nums.size() == 2){\\n            res += '/' + to_string(nums[1]);\\n        }\\n        return res;\\n    }\\n    };"
		},
		{
			"lc_ans_id":"101707",
			"view":"219",
			"top":"9",
			"title":"Java Backtrack Solution using DP 13ms",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    \\n    class Tuple {\\n        String s;\\n        double v;\\n        public Tuple(String _s, double _v) {\\n            s = _s;\\n            v = _v;\\n        }\\n    }\\n    \\n    Tuple[][][] mem;\\n    \\n    public Tuple helper(int[] nums, int i, int j, boolean isMax) {\\n        if(i==j)\\n            return new Tuple(\"\"+nums[i], 1.0*nums[i]);\\n        if(mem[i][j][isMax?0:1]!=null)\\n            return mem[i][j][isMax?0:1];\\n        if(isMax) {\\n            Tuple maxT = new Tuple(\"\",0);\\n            for(int k=i; k<j; k++) {\\n                Tuple t1 = helper(nums, i, k, true);\\n                Tuple t2 = helper(nums, k+1, j, false);\\n                if(t1.v/t2.v > maxT.v) {\\n                    maxT.v = t1.v/t2.v;\\n                    maxT.s = t1.s + (k+1==j ? (\"/\" + t2.s) : (\"/(\" + t2.s + \")\"));\\n                }\\n            }\\n            mem[i][j][0] = maxT;\\n            return maxT;\\n        } else {\\n            Tuple minT = new Tuple(\"\",Double.MAX_VALUE);\\n            for(int k=i; k<j; k++) {\\n                Tuple t1 = helper(nums, i, k, false);\\n                Tuple t2 = helper(nums, k+1, j, true);\\n                if(t1.v/t2.v < minT.v) {\\n                    minT.v = t1.v/t2.v;\\n                    minT.s = t1.s + (k+1==j ? (\"/\" + t2.s) : (\"/(\" + t2.s + \")\"));\\n                }\\n            }\\n            mem[i][j][1] = minT;\\n            return minT;\\n        }\\n    }\\n    \\n    public String optimalDivision(int[] nums) {\\n        mem = new Tuple[nums.length][nums.length][2];\\n        return helper(nums, 0, nums.length-1, true).s;\\n    }\\n}"
		}
	],
	"id":"536",
	"title":"Optimal Division",
	"content":"<p>Given a list of <b>positive integers</b>, the adjacent integers will perform the float division. For example, [2,3,4] -> 2 / 3 / 4.</p>\r\n\r\n<p>However, you can add any number of parenthesis at any position to change the priority of operations. You should find out how to add parenthesis to get the <b>maximum</b> result, and return the corresponding expression in string format. <b>Your expression should NOT contain redundant parenthesis.</b></p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\n<b>Input:</b> [1000,100,10,2]\r\n<b>Output:</b> \"1000/(100/10/2)\"\r\n<b>Explanation:</b>\r\n1000/(100/10/2) = 1000/((100/10)/2) = 200\r\nHowever, the bold parenthesis in \"1000/(<b>(</b>100/10<b>)</b>/2)\" are redundant, <br/>since they don't influence the operation priority. So you should return \"1000/(100/10/2)\". \r\n\r\nOther cases:\r\n1000/(100/10)/2 = 50\r\n1000/(100/(10/2)) = 50\r\n1000/100/10/2 = 0.5\r\n1000/100/(10/2) = 2\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>The length of the input array is [1, 10].</li>\r\n<li>Elements in the given array will be in range [2, 1000].</li>\r\n<li>There is only one optimal division for each test case.</li>\r\n</ol>\r\n</p>",
	"frequency":"180",
	"ac_num":"12015"
}