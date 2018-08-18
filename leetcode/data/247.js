{
	"difficulty":"2",
	"submit_num":"64446",
	"show_id":"247",
	"leetcode_id":"247",
	"answers":[
		{
			"lc_ans_id":"67280",
			"view":"16041",
			"top":"0",
			"title":"AC clean Java solution",
			"vote":"208",
			"content":"    public List<String> findStrobogrammatic(int n) {\\n        return helper(n, n);\\n    }\\n    \\n    List<String> helper(int n, int m) {\\n        if (n == 0) return new ArrayList<String>(Arrays.asList(\"\"));\\n        if (n == 1) return new ArrayList<String>(Arrays.asList(\"0\", \"1\", \"8\"));\\n        \\n        List<String> list = helper(n - 2, m);\\n        \\n        List<String> res = new ArrayList<String>();\\n        \\n        for (int i = 0; i < list.size(); i++) {\\n            String s = list.get(i);\\n            \\n            if (n != m) res.add(\"0\" + s + \"0\");\\n            \\n            res.add(\"1\" + s + \"1\");\\n            res.add(\"6\" + s + \"9\");\\n            res.add(\"8\" + s + \"8\");\\n            res.add(\"9\" + s + \"6\");\\n        }\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"67288",
			"view":"4628",
			"top":"1",
			"title":"Simple Java solution without recursion",
			"vote":"37",
			"content":"    public class Solution {\\n        public List<String> findStrobogrammatic(int n) {\\n            List<String> one = Arrays.asList(\"0\", \"1\", \"8\"), two = Arrays.asList(\"\"), r = two;\\n            if(n%2 == 1)\\n                r = one;\\n            for(int i=(n%2)+2; i<=n; i+=2){\\n                List<String> newList = new ArrayList<>();\\n                for(String str : r){\\n                    if(i != n)\\n                        newList.add(\"0\" + str + \"0\");\\n                    newList.add(\"1\" + str + \"1\");\\n                    newList.add(\"6\" + str + \"9\");\\n                    newList.add(\"8\" + str + \"8\");\\n                    newList.add(\"9\" + str + \"6\");\\n                }\\n                r = newList;\\n            }\\n            return r;   \\n        }\\n    \\n    }"
		},
		{
			"lc_ans_id":"67275",
			"view":"2163",
			"top":"2",
			"title":"Python recursive solution, need some observation, so far 97%",
			"vote":"27",
			"content":"Some observation to the sequence:\\n\\nn == 1:   [0, 1, 8]\\n\\nn == 2:   [11, 88, 69, 96]\\n\\nHow about n == `3`? \\n=> it can be retrieved if you insert `[0, 1, 8]` to the middle of solution of n == `2`\\n\\nn == `4`?\\n=> it can be retrieved if you insert `[11, 88, 69, 96, 00]` to the middle of solution of n == `2`\\n\\nn == `5`?\\n=> it can be retrieved if you insert `[0, 1, 8]` to the middle of solution of n == `4`\\n\\nthe same, for n == `6`, it can be retrieved if you insert `[11, 88, 69, 96, 00]` to the middle of solution of n == `4`\\n\\n        \\n        \\n    \\n    def findStrobogrammatic(self, n):\\n        evenMidCandidate = [\"11\",\"69\",\"88\",\"96\", \"00\"]\\n        oddMidCandidate = [\"0\", \"1\", \"8\"]\\n        if n == 1:\\n            return oddMidCandidate\\n        if n == 2:\\n            return evenMidCandidate[:-1]\\n        if n % 2:\\n            pre, midCandidate = self.findStrobogrammatic(n-1), oddMidCandidate\\n        else: \\n            pre, midCandidate = self.findStrobogrammatic(n-2), evenMidCandidate\\n        premid = (n-1)/2\\n        return [p[:premid] + c + p[premid:] for c in midCandidate for p in pre]"
		},
		{
			"lc_ans_id":"67328",
			"view":"3536",
			"top":"3",
			"title":"3 lines Ruby, 5 lines Python",
			"vote":"16",
			"content":"Build them inside out from the middle.\\n\\nRuby\\n\\n    def find_strobogrammatic(n)\\n      strobs = [[''], '018'.chars][n%2]\\n      (n/2).times { strobs.map! { |s| %W{0#{s}0 1#{s}1 8#{s}8 6#{s}9 9#{s}6} }.flatten! }\\n      strobs.select { |s| n < 2 || s[0] > '0' }\\n    end\\n\\nPython\\n\\n    def findStrobogrammatic(self, n):\\n        nums = n%2 * list('018') or ['']\\n        while n > 1:\\n            n -= 2\\n            nums = [a + num + b for a, b in '00 11 88 69 96'.split()[n<2:] for num in nums]\\n        return nums"
		},
		{
			"lc_ans_id":"67338",
			"view":"2662",
			"top":"4",
			"title":"Accepted Java solution using recursion",
			"vote":"14",
			"content":"    public List<String> findStrobogrammatic(int n) {\\n        findStrobogrammaticHelper(new char[n], 0, n - 1);\\n        return res;\\n    }\\n    \\n    List<String> res = new ArrayList<String>();\\n    \\n    public void findStrobogrammaticHelper(char[] a, int l, int r) {\\n        if (l > r) {\\n            res.add(new String(a));\\n            return;\\n        }\\n        if (l == r) {\\n            a[l] = '0'; res.add(new String(a));\\n            a[l] = '1'; res.add(new String(a));\\n            a[l] = '8'; res.add(new String(a));\\n            return;\\n        }\\n        \\n        if (l != 0) {\\n            a[l] = '0'; a[r] = '0';\\n            findStrobogrammaticHelper(a, l+1, r-1);\\n        }\\n        a[l] = '1'; a[r] = '1';\\n        findStrobogrammaticHelper(a, l+1, r-1);\\n        a[l] = '8'; a[r] = '8';\\n        findStrobogrammaticHelper(a, l+1, r-1);\\n        a[l] = '6'; a[r] = '9';\\n        findStrobogrammaticHelper(a, l+1, r-1);\\n        a[l] = '9'; a[r] = '6';\\n        findStrobogrammaticHelper(a, l+1, r-1);\\n    }"
		},
		{
			"lc_ans_id":"67273",
			"view":"2071",
			"top":"5",
			"title":"My Concise JAVA Solution using DFS",
			"vote":"12",
			"content":"    public class Solution {\\n        public List<String> findStrobogrammatic(int n) {\\n            Map<Character, Character> map = new HashMap<Character, Character>();\\n            map.put('0', '0');\\n            map.put('1', '1');\\n            map.put('6', '9');\\n            map.put('8', '8');\\n            map.put('9', '6');\\n            List<String> result = new ArrayList<String>();\\n            char[] buffer = new char[n];\\n            dfs(n, 0, buffer, result, map);\\n            return result;\\n        }\\n        \\n        private void dfs(int n, int index, char[] buffer, List<String> result, Map<Character, Character> map) {\\n            if (n == 0) {\\n                return;\\n            }\\n            if (index == (n + 1) / 2) {\\n                result.add(String.valueOf(buffer));\\n                return;\\n            }\\n            for (Character c : map.keySet()) {\\n                if (index == 0 && n > 1 && c == '0') {  // first digit cannot be '0' when n > 1\\n                    continue;\\n                }\\n                if (index == n / 2 && (c == '6' || c == '9')) {   // mid digit cannot be '6' or '9' when n is odd\\n                    continue;\\n                }\\n                buffer[index] = c;\\n                buffer[n - 1 - index] = map.get(c);\\n                dfs(n, index + 1, buffer, result, map);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67322",
			"view":"1483",
			"top":"6",
			"title":"14 lines concise and easy understand c++ solution",
			"vote":"10",
			"content":"    class Solution {\\n    public:\\n        vector<string> findStrobogrammatic(int n) {\\n            return helper(n , n);\\n        }\\n        vector<string> helper(int m, int n){\\n            if(m == 0) return vector<string>({\"\"});\\n            if(m == 1) return vector<string>({\"0\", \"1\", \"8\"});\\n            vector<string> tmp = helper(m - 2, n), res;\\n            for(int i = 0; i < tmp.size(); i++){\\n                if(m != n) res.push_back(\"0\" + tmp[i] + \"0\");\\n                res.push_back(\"1\" + tmp[i] + \"1\");\\n                res.push_back(\"6\" + tmp[i] + \"9\");\\n                res.push_back(\"8\" + tmp[i] + \"8\");\\n                res.push_back(\"9\" + tmp[i] + \"6\");\\n            }\\n            return res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"67307",
			"view":"847",
			"top":"7",
			"title":"My Concise Iterative Java Code",
			"vote":"5",
			"content":"\\n\\n    public List<String> findStrobogrammatic(int n) {\\n    \\tMap<Character, Character> map = buildMap();\\n    \\tList<String> ret = n % 2 == 0 ? Arrays.asList(\"\") : Arrays.asList(\"1\", \"8\", \"0\");\\n    \\n    \\tfor (int i = n % 2 == 0 ? 1 : 2; i < n; i += 2) {\\n    \\t\\tList<String> cur = new ArrayList<>();\\n    \\t\\tfor (char c : map.keySet()) {\\n    \\t\\t\\tfor (String s : ret) {\\n                    // don't add leading 0s!\\n    \\t\\t\\t\\tif (i != n - 1 || c != '0')\\n    \\t\\t\\t\\t\\tcur.add(c + s + map.get(c));\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\tret = cur;\\n    \\t}\\n    \\n    \\treturn ret;\\n    }\\n    \\n    private Map<Character, Character> buildMap() {\\n    \\tMap<Character, Character> map = new HashMap<>();\\n    \\tmap.put('1', '1');\\n    \\tmap.put('6', '9');\\n    \\tmap.put('8', '8');\\n    \\tmap.put('9', '6');\\n    \\tmap.put('0', '0');\\n    \\treturn map;\\n    }"
		},
		{
			"lc_ans_id":"67324",
			"view":"541",
			"top":"8",
			"title":"25 ms C++ solution using backtracking, BEAT 99.58%.",
			"vote":"4",
			"content":"Special thanks to @shuhuai_li.\\n\\n```c++\\nclass Solution \\n{\\n    // date: 2016-09-02     location: Vista Del Lago III Apartments\\n    vector<int> first = {0, 1, 6, 8, 9}, second = {0, 1, 9, 8, 6};\\npublic:\\n    vector<string> findStrobogrammatic(int n) \\n    {\\n        vector<string> res;\\n        string s (n, '0');\\n        helper(res, s, 0, s.size() / 2);\\n        return res;\\n    }\\n    \\n    void helper(vector<string>& res, string& s, int digit_start, int upper_border)\\n    {\\n        if (digit_start == upper_border)\\n        {\\n            res.push_back(s);\\n            if (s.size() == digit_start * 2)\\n                return;\\n            s[digit_start] = '1';\\n            res.push_back(s);\\n            s[digit_start] = '8';\\n            res.push_back(s);\\n            s[digit_start] = '0';\\n            return;\\n        }\\n        \\n        int mask_start = (digit_start == 0) ? 1 : 0;  \\n        for (int j = mask_start; j < 5; j ++)\\n        {\\n            s[digit_start] += first[j];\\n            s[s.size() - 1 - digit_start] += second[j];\\n            helper(res, s, digit_start + 1, upper_border);\\n            s[digit_start] -= first[j];\\n            s[s.size() - 1 - digit_start] -= second[j];\\n        }\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"67333",
			"view":"457",
			"top":"9",
			"title":"C++ solution using recursion, beating 96% others.",
			"vote":"4",
			"content":"    class Solution {\\n    public:\\n        vector<string> findStrobogrammatic(int n) {\\n            vector<string> ans;\\n            if(n <= 0)  return ans;\\n            string solution;\\n            for(int i = 0; i < n; i++) solution += \"0\";\\n            int l = 0, r = n-1;\\n            dfs(l,r,solution,ans);\\n            return ans;\\n        }\\n        \\n        void dfs(int l, int r, string solution, vector<string>& ans){\\n            if(l == r){\\n                solution[l] = '0';\\n                ans.push_back(solution);\\n                solution[l] = '1';\\n                ans.push_back(solution);\\n                solution[l] = '8';\\n                ans.push_back(solution);\\n                return;\\n            }\\n            else if(l > r){\\n                ans.push_back(solution);\\n                return;\\n            }\\n            \\n            solution[l] = solution[r] = '1';\\n            dfs(l+1,r-1,solution,ans);\\n            solution[l] = solution[r] = '8';\\n            dfs(l+1,r-1,solution,ans);\\n            solution[l] = '6', solution[r] = '9';\\n            dfs(l+1,r-1,solution,ans);\\n            solution[l] = '9', solution[r] = '6';\\n            dfs(l+1,r-1,solution,ans);\\n            if(l != 0){\\n                solution[l] = solution[r] = '0';\\n            dfs(l+1,r-1,solution,ans);\\n            }  \\n        }\\n    };"
		}
	],
	"id":"247",
	"title":"Strobogrammatic Number II",
	"content":"<p>A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).</p>\r\n<p>Find all strobogrammatic numbers that are of length = n. </p>\r\n<p>For example,<br>\r\nGiven n = 2, return <code>[\"11\",\"69\",\"88\",\"96\"]</code>.\r\n</p>",
	"frequency":"153",
	"ac_num":"26350"
}