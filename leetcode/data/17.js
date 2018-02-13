{
	"difficulty":"2",
	"submit_num":"580763",
	"show_id":"17",
	"leetcode_id":"17",
	"answers":[
		{
			"lc_ans_id":"8064",
			"view":"74221",
			"top":"0",
			"title":"My java solution with FIFO queue",
			"vote":"376",
			"content":"        public List<String> letterCombinations(String digits) {\\n        LinkedList<String> ans = new LinkedList<String>();\\n        String[] mapping = new String[] {\"0\", \"1\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\\n        ans.add(\"\");\\n        for(int i =0; i<digits.length();i++){\\n            int x = Character.getNumericValue(digits.charAt(i));\\n            while(ans.peek().length()==i){\\n                String t = ans.remove();\\n                for(char s : mapping[x].toCharArray())\\n                    ans.add(t+s);\\n            }\\n        }\\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"8097",
			"view":"39536",
			"top":"1",
			"title":"My iterative sollution, very simple under 15 lines",
			"vote":"77",
			"content":"This is my solution, FYI\\n\\n    vector<string> letterCombinations(string digits) {\\n        vector<string> res;\\n        string charmap[10] = {\"0\", \"1\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\\n        res.push_back(\"\");\\n        for (int i = 0; i < digits.size(); i++)\\n        {\\n            vector<string> tempres;\\n            string chars = charmap[digits[i] - '0'];\\n            for (int c = 0; c < chars.size();c++)\\n                for (int j = 0; j < res.size();j++)\\n                    tempres.push_back(res[j]+chars[c]);\\n            res = tempres;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"8090",
			"view":"20365",
			"top":"2",
			"title":"Iterative c++ solution in 0ms",
			"vote":"63",
			"content":"    vector<string> letterCombinations(string digits) {\\n        vector<string> result;\\n        if(digits.empty()) return vector<string>();\\n        static const vector<string> v = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"};\\n        result.push_back(\"\");   // add a seed for the initial case\\n        for(int i = 0 ; i < digits.size(); ++i) {\\n            int num = digits[i]-'0';\\n            if(num < 0 || num > 9) break;\\n            const string& candidate = v[num];\\n            if(candidate.empty()) continue;\\n            vector<string> tmp;\\n            for(int j = 0 ; j < candidate.size() ; ++j) {\\n                for(int k = 0 ; k < result.size() ; ++k) {\\n                    tmp.push_back(result[k] + candidate[j]);\\n                }\\n            }\\n            result.swap(tmp);\\n        }\\n        return result;\\n    }\\n\\n\\nSimple and efficient iterative solution.\\n\\nExplanation with sample input \"123\"\\n\\nInitial state:\\n\\n- result = {\"\"}\\n\\nStage 1 for number \"1\":\\n\\n- result has {\"\"}\\n- candiate is \"abc\"\\n- generate three strings \"\" + \"a\", \"\"+\"b\", \"\"+\"c\" and put into tmp,\\n  tmp = {\"a\", \"b\",\"c\"}\\n- swap result and tmp (swap does not take memory copy)\\n- Now result has {\"a\", \"b\", \"c\"}\\n \\nStage 2 for number \"2\":\\n\\n- result has {\"a\", \"b\", \"c\"}\\n- candidate is \"def\"\\n- generate nine strings and put into tmp,\\n   \"a\" + \"d\", \"a\"+\"e\", \"a\"+\"f\", \\n   \"b\" + \"d\", \"b\"+\"e\", \"b\"+\"f\",\\n   \"c\" + \"d\", \"c\"+\"e\", \"c\"+\"f\" \\n- so tmp has {\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\" }\\n- swap result and tmp\\n- Now result has {\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\" }\\n\\nStage 3 for number \"3\":\\n\\n- result has {\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\" }\\n- candidate is \"ghi\"\\n- generate 27 strings and put into tmp,\\n-  add \"g\" for each of \"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\" \\n-  add \"h\" for each of \"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\" \\n-  add \"h\" for each of \"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\" \\n- so, tmp has\\n            {\"adg\", \"aeg\", \"afg\", \"bdg\", \"beg\", \"bfg\", \"cdg\", \"ceg\", \"cfg\"\\n             \"adh\", \"aeh\", \"afh\", \"bdh\", \"beh\", \"bfh\", \"cdh\", \"ceh\", \"cfh\" \\n             \"adi\", \"aei\", \"afi\", \"bdi\", \"bei\", \"bfi\", \"cdi\", \"cei\", \"cfi\" }\\n- swap result and tmp\\n- Now result has\\n            {\"adg\", \"aeg\", \"afg\", \"bdg\", \"beg\", \"bfg\", \"cdg\", \"ceg\", \"cfg\"\\n             \"adh\", \"aeh\", \"afh\", \"bdh\", \"beh\", \"bfh\", \"cdh\", \"ceh\", \"cfh\" \\n             \"adi\", \"aei\", \"afi\", \"bdi\", \"bei\", \"bfi\", \"cdi\", \"cei\", \"cfi\" }\\n\\n\\nFinally, return result."
		},
		{
			"lc_ans_id":"8109",
			"view":"28247",
			"top":"3",
			"title":"My recursive solution using Java",
			"vote":"52",
			"content":"\\n \\n\\n       public class Solution {\\n        \\tprivate static final String[] KEYS = { \"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\" };\\n        \\n        \\tpublic List<String> letterCombinations(String digits) {\\n        \\t\\tList<String> ret = new LinkedList<String>();\\n        \\t\\tcombination(\"\", digits, 0, ret);\\n        \\t\\treturn ret;\\n        \\t}\\n        \\n        \\tprivate void combination(String prefix, String digits, int offset, List<String> ret) {\\n        \\t\\tif (offset >= digits.length()) {\\n        \\t\\t\\tret.add(prefix);\\n        \\t\\t\\treturn;\\n        \\t\\t}\\n        \\t\\tString letters = KEYS[(digits.charAt(offset) - '0')];\\n        \\t\\tfor (int i = 0; i < letters.length(); i++) {\\n        \\t\\t\\tcombination(prefix + letters.charAt(i), digits, offset + 1, ret);\\n        \\t\\t}\\n        \\t}\\n        }"
		},
		{
			"lc_ans_id":"8070",
			"view":"21706",
			"top":"4",
			"title":"One line python solution",
			"vote":"47",
			"content":"    class Solution:\\n        # @return a list of strings, [s1, s2]\\n        def letterCombinations(self, digits):\\n            if '' == digits: return []\\n            kvmaps = {\\n                '2': 'abc',\\n                '3': 'def',\\n                '4': 'ghi',\\n                '5': 'jkl',\\n                '6': 'mno',\\n                '7': 'pqrs',\\n                '8': 'tuv',\\n                '9': 'wxyz'\\n            }\\n            return reduce(lambda acc, digit: [x + y for x in acc for y in kvmaps[digit]], digits, [''])"
		},
		{
			"lc_ans_id":"8063",
			"view":"4962",
			"top":"5",
			"title":"Python solution",
			"vote":"31",
			"content":"    class Solution:\\n        # @param {string} digits\\n        # @return {string[]}\\n        def letterCombinations(self, digits):\\n            mapping = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', \\n                       '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}\\n            if len(digits) == 0:\\n                return []\\n            if len(digits) == 1:\\n                return list(mapping[digits[0]])\\n            prev = self.letterCombinations(digits[:-1])\\n            additional = mapping[digits[-1]]\\n            return [s + c for s in prev for c in additional]"
		},
		{
			"lc_ans_id":"8153",
			"view":"6504",
			"top":"6",
			"title":"8-line Backtracking-Function C++ Solution",
			"vote":"21",
			"content":"Most concise backtracking function, no?\\n\\n    class Solution {\\n    public:\\n        vector<string> letterCombinations(string digits) \\n        {\\n            vector<string> res;\\n            if(digits.size()==0) return res;\\n            string local;\\n            vector<vector<char>> table(2,vector<char>());\\n            table.push_back(vector<char>{'a','b','c'}); // index 2\\n            table.push_back(vector<char>{'d','e','f'}); // 3\\n            table.push_back(vector<char>{'g','h','i'});\\n            table.push_back(vector<char>{'j','k','l'}); // 5\\n            table.push_back(vector<char>{'m','n','o'});\\n            table.push_back(vector<char>{'p','q','r','s'}); // 7\\n            table.push_back(vector<char>{'t','u','v'});\\n            table.push_back(vector<char>{'w','x','y','z'}); // 9\\n            \\n            backtracking(table,res,local,0,digits);\\n            return res;\\n        }\\n        \\n        void backtracking(const vector<vector<char>>& table, vector<string>& res, string& local, int index, const string& digits) {\\n            if(index==digits.size())\\n                res.push_back(local);\\n            else\\n                for(int i=0;i<table[digits[index]-'0'].size();i++) {\\n                    local.push_back(table[digits[index]-'0'][i]);\\n                    backtracking(table, res, local, index+1, digits);\\n                    local.pop_back();\\n                }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"8118",
			"view":"6764",
			"top":"7",
			"title":"Easy understand Java Solution",
			"vote":"18",
			"content":" method **combine** is to add new letters to old list, using 2 for-loop.\\n\\nfor example:\\n\\ngave digits = \"23\"\\n\\ni=0 -> result=combine(\"abc\", [\"\"]) ---> [a,b,c];\\n\\ni=1 -> result=combine(\"def\", [a,b,c]) ---> [ad,bd,cd, ae,be,ce, af,bf,cf];\\n\\n \\n\\n      public class Solution {\\n            public static List<String> letterCombinations(String digits) {\\n                String digitletter[] = {\"\",\"\",\"abc\",\"def\",\"ghi\",\"jkl\",\"mno\",\"pqrs\",\"tuv\",\"wxyz\"};\\n                List<String> result = new ArrayList<String>();\\n        \\n                if (digits.length()==0) return result;\\n                \\n                result.add(\"\");\\n                for (int i=0; i<digits.length(); i++) \\n                    result = combine(digitletter[digits.charAt(i)-'0'],result);\\n                \\n                return result;\\n            }\\n            \\n            public static List<String> combine(String digit, List<String> l) {\\n                List<String> result = new ArrayList<String>();\\n                \\n                for (int i=0; i<digit.length(); i++) \\n                    for (String x : l) \\n                        result.add(x+digit.charAt(i));\\n        \\n                return result;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"8434",
			"view":"3250",
			"top":"8",
			"title":"My simple Java solution",
			"vote":"14",
			"content":"     public class Solution {\\n     String[][] refer={{},{},{\"a\",\"c\",\"b\"},{\"d\",\"e\",\"f\"},{\"g\",\"h\",\"i\"},{\"j\",\"k\",\"l\"},{\"m\",\"n\",\"o\"},{\"p\",\"q\",\"r\",\"s\"},{\"t\",\"u\",\"v\"},{\"w\",\"x\",\"y\",\"z\"}};\\n\\t    \\n\\t    public List<String> letterCombinations(String digits) {\\t        \\n\\t    \\tList<String> list=new ArrayList<String>();\\n\\t    \\tif(!digits.equals(\"\")){helper(list,digits,\"\"); return list;}\\n\\t    \\t return list;\\t    \\t\\n\\t    }\\n\\t    private void helper(List<String> list,String digits,String s){\\n\\t    \\t   if(digits.length()==0){ list.add(s); return;}\\n\\t    \\t\\tint idx=Integer.parseInt(digits.substring(0, 1)); \\n\\t    \\t\\tfor(String k:refer[idx]){\\n\\t    \\t\\t  helper(list,digits.substring(1,digits.length()),s+k);\\t\\n\\t    \\t\\t}\\t\\t\\n\\t    \\treturn;\\n\\t    }\\n\\t        \\n}"
		},
		{
			"lc_ans_id":"8454",
			"view":"3561",
			"top":"9",
			"title":"My C++ solution use DFS",
			"vote":"13",
			"content":"        vector<string> letterCombinations(string digits) {\\n        vector<string> str;//str for final resut\\n        string save;//save for temporary answer\\n        int convert[10] = {0, 3, 6, 9, 12, 15, 19, 22, 26};\\n        dfs(str, save, digits, 0, digits.size(), convert);\\n        return str;\\n        }\\n        void dfs(vector<string> &str, string save, \\n             string dig, int now, int size, int *convert){\\n        if(now == size){\\n            str.push_back(save);\\n            return;\\n        }\\n        int tmp = dig[now] - '0' - 2;//change '2' to 0, '3' to 1...\\n        for(int i = convert[tmp]; i < convert[tmp+1]; i++){\\n            save.push_back('a' + i);//ex: a,b,c | d,e,f\\n            dfs(str, save, dig, now + 1, size, convert);\\n            save.pop_back();\\n        }\\n        }"
		}
	],
	"id":"17",
	"title":"Letter Combinations of a Phone Number",
	"content":"<p>Given a digit string, return all possible letter combinations that the number could represent.\r\n</p>\r\n\r\n<p>\r\nA mapping of digit to letters (just like on the telephone buttons) is given below.</p>\r\n<p><img src=\"http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png\" /></p>\r\n\r\n<pre>\r\n<b>Input:</b>Digit string \"23\"\r\n<b>Output:</b> [\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\"].\r\n</pre>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nAlthough the above answer is in lexicographical order, your answer could be in any order you want.\r\n</p>",
	"frequency":"565",
	"ac_num":"208425"
}