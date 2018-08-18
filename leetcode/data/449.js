{
	"difficulty":"1",
	"submit_num":"78712",
	"show_id":"455",
	"leetcode_id":"455",
	"answers":[
		{
			"lc_ans_id":"93987",
			"view":"15163",
			"top":"0",
			"title":"Simple Greedy Java Solution",
			"vote":"48",
			"content":"```\\nArrays.sort(g);\\nArrays.sort(s);\\nint i = 0;\\nfor(int j=0;i<g.length && j<s.length;j++) {\\n\\tif(g[i]<=s[j]) i++;\\n}\\nreturn i;\\n```\\n\\nJust assign the cookies starting from the child with less greediness to maximize the number of happy children ."
		},
		{
			"lc_ans_id":"93997",
			"view":"6053",
			"top":"1",
			"title":"Array sort + Two pointer greedy solution O(nlogn)",
			"vote":"10",
			"content":"Two assign cookies to children optimaly we should give for each child the closest higher cookie. By using this greedy approach overall sum of wasted cookies will be minimum amoung all. To use this greedy solution in effective way we can sort both arrays and use two pointers. We should move pointer of children only if there is enough cookies to make that child content. In each step we will try to make content child at position pointerG by searching the closes higher cookie value.\\n```\\npublic class Solution {\\n    public int findContentChildren(int[] g, int[] s) {\\n        Arrays.sort(g);\\n        Arrays.sort(s);\\n        \\n        int pointG = 0;\\n        int pointS = 0;\\n        \\n        while (pointG<g.length && pointS<s.length) {\\n            if (g[pointG]<=s[pointS]) {\\n                pointG++;\\n                pointS++;\\n            } else {\\n                pointS++;\\n            }\\n        }\\n        \\n        return pointG;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"94063",
			"view":"2495",
			"top":"2",
			"title":"Simple PYTHON O(nlogn)",
			"vote":"8",
			"content":"```\\nclass Solution(object):\\n    def findContentChildren(self, g, s):\\n        \"\"\"\\n        :type g: List[int]\\n        :type s: List[int]\\n        :rtype: int\\n        \"\"\"\\n        g.sort()\\n        s.sort()\\n        \\n        childi = 0\\n        cookiei = 0\\n        \\n        while cookiei < len(s) and childi < len(g):\\n            if s[cookiei] >= g[childi]:\\n                childi += 1\\n            cookiei += 1\\n        \\n        return childi\\n                \\n```"
		},
		{
			"lc_ans_id":"94024",
			"view":"2943",
			"top":"3",
			"title":"Java Solution with binary search tree",
			"vote":"5",
			"content":"```\\npublic class AssignCookies {\\n    public static int findContentChildren(int[] g, int[] s) {\\n    \\tint count = 0;\\n    \\tTreeMap<Integer,Integer> tree = new TreeMap<>();\\n    \\tfor(int temp : s){\\n    \\t\\tInteger num = tree.get(temp);\\n    \\t\\tnum = num==null?0:num;\\n    \\t\\ttree.put(temp,num+1);\\n    \\t}\\n    \\tfor(int temp : g){\\n    \\t\\tInteger targ = tree.ceilingKey(temp);\\n    \\t\\tif(targ!=null){\\n    \\t\\t\\tInteger num = tree.get(targ);\\n    \\t\\t\\tif(num>0){\\n    \\t\\t\\t\\tcount++;\\n    \\t\\t\\t\\tif(num==1){\\n    \\t\\t\\t\\t\\ttree.remove(targ);\\n    \\t\\t\\t\\t}else{\\n                                        tree.put(targ, num - 1);\\n                                }\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t}\\n        return count;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"94008",
			"view":"1388",
			"top":"4",
			"title":"C++ short solution",
			"vote":"4",
			"content":"```   \\n int findContentChildren(vector<int>& g, vector<int>& s) {\\n        sort(g.begin(),g.end());\\n        sort(s.begin(),s.end());\\n        int i=g.size()-1, j=s.size()-1,count = 0;\\n        while(i>=0 && j>=0)\\n        {\\n            if(g[i]>s[j]) i--;\\n            else if(g[i--]<=s[j--]) count++;\\n        }\\n        return count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"93991",
			"view":"107",
			"top":"5",
			"title":"Easy Understanding C++ solution O(nlogn)",
			"vote":"3",
			"content":"````  \\n  int findContentChildren(vector<int>& g, vector<int>& s) {\\n        sort(g.begin(),g.end());\\n        sort(s.begin(),s.end());\\n        int i = 0, j=0;\\n        while(i<g.size() && j<s.size()){\\n            if(s[j]>=g[i])\\n                i++; // when the child get the cookie, foward child by 1\\n            j++;\\n        }\\n        return i;\\n    }\\n````"
		},
		{
			"lc_ans_id":"94009",
			"view":"979",
			"top":"6",
			"title":"Simple Python Solution",
			"vote":"3",
			"content":"    class Solution(object):\\n        def findContentChildren(self, g, s):\\n            g.sort()\\n            s.sort()\\n            i, j = 0, 0\\n            while i < len(g) and j < len(s):\\n                if s[j] >= g[i]:\\n                    i += 1\\n                j += 1\\n            return i"
		},
		{
			"lc_ans_id":"93988",
			"view":"574",
			"top":"7",
			"title":"C++ Two Priority_Queue Solution",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    int findContentChildren(vector<int>& g, vector<int>& s) {\\n        priority_queue<int, vector<int>, greater<int>> gq(g.begin(), g.end());\\n        priority_queue<int, vector<int>, greater<int>> sq(s.begin(), s.end());\\n        int res;\\n        while(!sq.empty() && !gq.empty())\\n        {\\n            if (sq.top()>=gq.top())\\n            {\\n                sq.pop();\\n                gq.pop();\\n                res++;\\n            }\\n            else\\n            {\\n                sq.pop();\\n            }\\n        }\\n\\n        return res;\\n    }\\n};\\n\\n```"
		},
		{
			"lc_ans_id":"94002",
			"view":"3332",
			"top":"8",
			"title":"Python concise & efficient solution",
			"vote":"3",
			"content":"My solution from the contest:\\n\\n```\\ndef findContentChildren(self, g, s):\\n    g.sort()\\n    s.sort()\\n    res = 0\\n    i = 0\\n    for e in s:\\n        if i == len(g):\\n            break\\n        if e >= g[i]:\\n            res += 1\\n            i += 1\\n    return res\\n```\\n\\nO(nlogn) time and O(1) space"
		},
		{
			"lc_ans_id":"93996",
			"view":"66",
			"top":"9",
			"title":"Any idea about a following up question like: what if each child can get more than 1 cookies?",
			"vote":"1",
			"content":"What if each child can get more than 1 cookies? Still each cookie can only be assigned to 1 child."
		}
	],
	"id":"449",
	"title":"Assign Cookies",
	"content":"<p>\r\nAssume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie. Each child i has a greed factor g<sub>i</sub>, which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s<sub>j</sub>. If s<sub>j</sub> >= g<sub>i</sub>, we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\nYou may assume the greed factor is always positive. <br />\r\nYou cannot assign more than one cookie to one child.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2,3], [1,1]\r\n\r\n<b>Output:</b> 1\r\n\r\n<b>Explanation:</b> You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. \r\nAnd even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.\r\nYou need to output 1.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1,2], [1,2,3]\r\n\r\n<b>Output:</b> 2\r\n\r\n<b>Explanation:</b> You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. \r\nYou have 3 cookies and their sizes are big enough to gratify all of the children, \r\nYou need to output 2.\r\n</pre>\r\n</p>",
	"frequency":"253",
	"ac_num":"37239"
}