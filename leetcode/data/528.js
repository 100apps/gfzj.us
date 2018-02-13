{
	"difficulty":"2",
	"submit_num":"8880",
	"show_id":"544",
	"leetcode_id":"544",
	"answers":[
		{
			"lc_ans_id":"101274",
			"view":"1579",
			"top":"0",
			"title":"[C++] [Java] Clean Code",
			"vote":"22",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    string findContestMatch(int n) {\\n        vector<string> m(n);\\n        for (int i = 0; i < n; i++) {\\n            m[i] = to_string(i + 1);\\n        }\\n\\n        while (n > 1) {\\n            for (int i = 0; i < n / 2; i++) {\\n                m[i] = \"(\" + m[i] + \",\" + m[n - 1 - i] + \")\";\\n            }\\n            n /= 2;\\n        }\\n        \\n        return m[0];\\n    }\\n};\\n```\\n\\n**Java**\\n```\\npublic class Solution {\\n    public String findContestMatch(int n) {\\n        String[] m = new String[n];\\n        for (int i = 0; i < n; i++) {\\n            m[i] = String.valueOf(i + 1);\\n        }\\n\\n        while (n > 1) {\\n            for (int i = 0; i < n / 2; i++) {\\n                m[i] = \"(\" + m[i] + \",\" + m[n - 1 - i] + \")\";\\n            }\\n            n /= 2;\\n        }\\n        \\n        return m[0];\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101226",
			"view":"4397",
			"top":"1",
			"title":"Java 10 lines",
			"vote":"20",
			"content":"```\\npublic class Solution {\\n    public String findContestMatch(int n) {\\n        List<String> matches = new ArrayList<>();\\n        for(int i = 1; i <= n; i++) matches.add(String.valueOf(i));\\n        \\n        while(matches.size() != 1){\\n            List<String> newRound = new ArrayList<>();\\n            for(int i = 0; i < matches.size()/2; i++)   \\n                newRound.add(\"(\" + matches.get(i) + \",\" + matches.get(matches.size() - i - 1) + \")\");\\n            matches = newRound;\\n        }\\n        return matches.get(0);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101230",
			"view":"865",
			"top":"2",
			"title":"5 lines Python",
			"vote":"8",
			"content":"Pretty straight forward one, just keep going until ```n == 1```.\\n```\\nclass Solution(object):\\n    def findContestMatch(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: str\\n        \"\"\"\\n        res = map(str, range(1, n+1))\\n        while n > 1:\\n            res = [\"(\" + res[i] + \",\" + res[n-1-i] + \")\" for i in range(n >> 1)]\\n            n >>= 1\\n        return res[0]\\n```"
		},
		{
			"lc_ans_id":"101248",
			"view":"1232",
			"top":"3",
			"title":"Hacks",
			"vote":"5",
			"content":"**Ruby:**\\n```\\ndef find_contest_match(n)\\n  a = (1..n).map(&:to_s)\\n  a.map! { |x| \"(#{x},#{a.pop})\" } while a.size > 1\\n  a[0]\\nend\\n```\\n**Python:**\\n\\n    def findContestMatch(self, n):\\n        a = range(1, n+1)\\n        while len(a) > 1:\\n            a = zip(a, a[:len(a)/2-1:-1])\\n        return str(a[0]).replace(' ', '')"
		},
		{
			"lc_ans_id":"101228",
			"view":"472",
			"top":"4",
			"title":"3 ms Java Recursive clean code",
			"vote":"4",
			"content":"```\\n    public String findContestMatch(int n) {\\n        StringBuilder sb = new StringBuilder();\\n        helper(sb, 3, n, 1);\\n        return sb.toString();\\n    }\\n\\n    void helper(StringBuilder sb, int sum, int n, int val) {\\n        if (sum > n + 1) {\\n            sb.append(val);\\n            return;\\n        }\\n        sb.append('(');\\n        helper(sb, (sum << 1) - 1, n, val);\\n        sb.append(',');\\n        helper(sb, (sum << 1) - 1, n, sum - val);\\n        sb.append(')');        \\n    }\\n```"
		},
		{
			"lc_ans_id":"101256",
			"view":"57",
			"top":"5",
			"title":"Simple Java Recursive Solution With No Extra Space",
			"vote":"2",
			"content":"```\\n\\n    public String findContestMatch(int n) {\\n        return generateMatch(n, 1, 2);\\n    }\\n    \\n    private String generateMatch(int n, int top, int level){\\n        if (level == n)\\n            return \"(\" + top +\",\" + (level + 1 - top) + \")\";\\n        return \"(\" + generateMatch(n, top, level << 1) +\",\" + generateMatch(n, level + 1 - top, level << 1) + \")\";\\n    }\\n```"
		},
		{
			"lc_ans_id":"101270",
			"view":"208",
			"top":"6",
			"title":"Python, Simple with Explanation",
			"vote":"2",
			"content":"For each round R consisting of a list of match results, pair the new round by matching player i with len(R)-1-i.\\n```\\ndef findContestMatch(self, n):\\n    R = tuple(range(1, n+1))\\n    while len(R) > 2:\\n        R = tuple((R[i],R[~i]) for i in xrange(len(R)/2))\\n    return str(R).replace(' ','')\\n```"
		},
		{
			"lc_ans_id":"101269",
			"view":"756",
			"top":"7",
			"title":"Java 8 line solution, two iterative LinkedList",
			"vote":"2",
			"content":"It is obvious that the Matching Pattern is ```Strongest``` v.s. ```Weakest```. Thus we keep create Matching Group until there is only ```1``` group left.\\n\\n```\\npublic class Solution {\\n    public String findContestMatch(int n) {\\n        LinkedList<String> res = new LinkedList<>();\\n        \\n        for (int i = 1; i <= n; i++) res.add(i + \"\");\\n        \\n        while (res.size() > 1) {\\n            LinkedList<String> tmp = new LinkedList<>();\\n            \\n            while (!res.isEmpty()) {\\n                tmp.add(\"(\" + res.remove(0) + \",\" + res.remove(res.size() - 1) + \")\");\\n            }\\n            \\n            res = tmp;\\n        }\\n        \\n        return res.get(0);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101225",
			"view":"292",
			"top":"8",
			"title":"Java Recursive Solution",
			"vote":"1",
			"content":"I know the space complexity is not good, but this solution is quite straight forward.\\n\\npublic class Solution {\\n\\n    public String findContestMatch(int n) {\\n        List<String> s = new ArrayList<>();\\n        for (int i = 1; i <= n; i++) {\\n            s.add(i + \"\");\\n        }\\n        get(n, s);\\n        return s.get(0);\\n    }\\n    \\n    public void get(int n, List<String> s) {\\n        if (n == 1) return;\\n        for (int i = 0; i < n; i++) {\\n            s.set(i, \"(\" + s.get(i) + \",\" + s.get(n - i - 1) + \")\");\\n        }\\n        get(n / 2, s);\\n    }\\n}"
		},
		{
			"lc_ans_id":"101223",
			"view":"65",
			"top":"9",
			"title":"A/C Python solution, easy to understand, beat 15%",
			"vote":"0",
			"content":"    def __init__(self):\\n        self.res = ()\\n    def findContestMatch(self, n):\\n        \"\"\"\\n        :type n: int\\n        :rtype: str\\n        \"\"\"\\n        #print \"n = \", n\\n\\n        teamArray = [i for i in range(1, n+1)]\\n        #print \"teamArray = \", teamArray\\n\\n\\n        def generateHalf(remainingTeamArray):\\n            #print \"remainingTeamArray = \", remainingTeamArray #[1,2,3,4,...]\\n            lenRemainingTeamArrray = len(remainingTeamArray)\\n\\n            half1, half2 = [], []\\n            tmpArray = []\\n\\n            #while (len(half1) !=1 ) and (len(half2) != 1):\\n            while (len(remainingTeamArray) != 1):\\n                curHalf = 0\\n                #print \"0 curHalf = \", curHalf\\n                #print \"0 remainingTeamArray = \", remainingTeamArray\\n                #print \"0 tmpArray = \", tmpArray\\n                #print \"0 half1 = \", half1\\n                #print \"0 half2 = \", half2\\n\\n                while (len(remainingTeamArray) > 1):\\n                    #print \"before pop remainingTeamArray = \", remainingTeamArray\\n\\n                    if len(remainingTeamArray) < 2:\\n                        #print \"0 break\"\\n                        break\\n                    else:\\n                        teamFirst = remainingTeamArray.pop(0)\\n                        teamLast = remainingTeamArray.pop()\\n                        teamMatch = (teamFirst, teamLast)\\n                        #print \"teamFirst = \", teamFirst, \" teamLast = \", teamLast\\n                        #print \"teamMatch = \", teamMatch\\n                        #print \"1 half1 = \", half1\\n                        #print \"1 half2 = \", half2\\n                        #print \"after pop, remainingTeamArray = \", remainingTeamArray\\n\\n                        if len(half1) > len(half2):\\n                            #print \"1 half2 append\"\\n                            half2.append(teamMatch)\\n                            tmpArray.append(teamMatch)\\n                        elif len(half1) < len(half2):\\n                            #print \"1 half1 append\"\\n                            half1.append(teamMatch)\\n                            tmpArray.append(teamMatch)\\n                        elif len(half1) == len(half2):\\n                            if curHalf == 0:\\n                                #print \"2 half1 append\"\\n                                half1.append(teamMatch)\\n                                tmpArray.append(teamMatch)\\n                                curHalf = 1\\n                            elif curHalf == 1:\\n                                #print \"2 half2 append\"\\n                                half2.append(teamMatch)\\n                                tmpArray.append(teamMatch)\\n                                curHalf = 0\\n\\n                    # print \"2 half1 = \", half1\\n                    # print \"2 half2 = \", half2\\n                    # print \"2 tmpArray = \", tmpArray\\n                    # print \"2 remainingTeamArray = \", remainingTeamArray\\n\\n                remainingTeamArray = tmpArray\\n                # print \"after add remainingTeamArray = \", remainingTeamArray\\n                # print \"len(remainingTeamArray) = \", len(remainingTeamArray)\\n                half1, half2, tmpArray = [], [], []\\n                self.res = remainingTeamArray\\n                #print \"res = \", self.res\\n\\n\\n        generateHalf(teamArray)\\n\\n        # print \"in the end, self.res = \", self.res\\n        str1 = ''.join(str(e) for e in self.res)\\n\\n        # print \"str1.replace(\" \", \"\") = \", str1.replace(\" \", \"\")\\n        return str1.replace(\" \", \"\")"
		}
	],
	"id":"528",
	"title":"Output Contest Matches",
	"content":"<p>\r\nDuring the NBA playoffs, we always arrange the rather strong team to play with the rather weak team, like make the rank 1 team play with the rank n<sub>th</sub> team, which is a good strategy to make the contest more interesting. Now, you're given <b>n</b> teams, you need to output their <b>final</b> contest matches in the form of a string.\r\n</p>\r\n\r\n<p>The <b>n</b> teams are given in the form of positive integers from 1 to n, which represents their initial rank. (Rank 1 is the strongest team and Rank n is the weakest team.) We'll use parentheses('(', ')') and commas(',') to represent the contest team pairing - parentheses('(' , ')') for pairing and commas(',') for partition. During the pairing process in each round, you always need to follow the strategy of making the rather strong one pair with the rather weak one.</p> \r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> 2\r\n<b>Output:</b> (1,2)\r\n<b>Explanation:</b> \r\nInitially, we have the team 1 and the team 2, placed like: 1,2.\r\nThen we pair the team (1,2) together with '(', ')' and ',', which is the final answer.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> 4\r\n<b>Output:</b> ((1,4),(2,3))\r\n<b>Explanation:</b> \r\nIn the first round, we pair the team 1 and 4, the team 2 and 3 together, as we need to make the strong team and weak team together.\r\nAnd we got (1,4),(2,3).\r\nIn the second round, the winners of (1,4) and (2,3) need to play again to generate the final winner, so you need to add the paratheses outside them.\r\nAnd we got the final answer ((1,4),(2,3)).\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> 8\r\n<b>Output:</b> (((1,8),(4,5)),((2,7),(3,6)))\r\n<b>Explanation:</b> \r\nFirst round: (1,8),(2,7),(3,6),(4,5)\r\nSecond round: ((1,8),(4,5)),((2,7),(3,6))\r\nThird round: (((1,8),(4,5)),((2,7),(3,6)))\r\nSince the third round will generate the final winner, you need to output the answer (((1,8),(4,5)),((2,7),(3,6))).\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The <b>n</b> is in range [2, 2<sup>12</sup>].</li>\r\n<li>We ensure that the input <b>n</b> can be converted into the form 2<sup>k</sup>, where k is a positive integer.</li>\r\n</ol>\r\n</p>",
	"frequency":"109",
	"ac_num":"6383"
}