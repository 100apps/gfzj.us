{
	"difficulty":"1",
	"submit_num":"760800",
	"show_id":"14",
	"leetcode_id":"14",
	"answers":[
		{
			"lc_ans_id":"6910",
			"view":"56902",
			"top":"0",
			"title":"Java code with 13 lines",
			"vote":"97",
			"content":"\\n    public String longestCommonPrefix(String[] strs) {\\n        if(strs == null || strs.length == 0)    return \"\";\\n        String pre = strs[0];\\n        int i = 1;\\n        while(i < strs.length){\\n            while(strs[i].indexOf(pre) != 0)\\n                pre = pre.substring(0,pre.length()-1);\\n            i++;\\n        }\\n        return pre;\\n    }"
		},
		{
			"lc_ans_id":"6916",
			"view":"19570",
			"top":"1",
			"title":"What does Longest Common Prefix mean ?",
			"vote":"76",
			"content":"The problem statement is confusing and unclear. Can someone throw light on this ?\\n\\nIs it to find prefix between each pair of strings and return the one which is longest. Or\\nall the strings has to have a common prefix?"
		},
		{
			"lc_ans_id":"6924",
			"view":"30446",
			"top":"2",
			"title":"Sorted the array, Java solution, 2 ms",
			"vote":"75",
			"content":"Sort the array first, and then you can simply compare the first and last elements in the sorted array.\\n\\n\\n        public String longestCommonPrefix(String[] strs) {\\n            StringBuilder result = new StringBuilder();\\n            \\n            if (strs!= null && strs.length > 0){\\n            \\n                Arrays.sort(strs);\\n                \\n                char [] a = strs[0].toCharArray();\\n                char [] b = strs[strs.length-1].toCharArray();\\n                \\n                for (int i = 0; i < a.length; i ++){\\n                    if (b.length > i && b[i] == a[i]){\\n                        result.append(b[i]);\\n                    }\\n                    else {\\n                        return result.toString();\\n                    }\\n                }\\n            return result.toString();\\n        }"
		},
		{
			"lc_ans_id":"6911",
			"view":"14720",
			"top":"3",
			"title":"Simple Python solution",
			"vote":"45",
			"content":"Might be a bit slow, but here's my relatively elegant Python solution:\\n\\n    class Solution:\\n        # @return a string\\n        def longestCommonPrefix(self, strs):\\n            if not strs:\\n                return \"\"\\n                \\n            for i, letter_group in enumerate(zip(*strs)):\\n                if len(set(letter_group)) > 1:\\n                    return strs[0][:i]\\n            else:\\n                return min(strs)"
		},
		{
			"lc_ans_id":"6926",
			"view":"21377",
			"top":"4",
			"title":"Accepted c++ 6 lines 4ms",
			"vote":"42",
			"content":"    class Solution {\\n    public:\\n        string longestCommonPrefix(vector<string>& strs) {\\n            string prefix = \"\";\\n            for(int idx=0; strs.size()>0; prefix+=strs[0][idx], idx++)\\n                for(int i=0; i<strs.size(); i++)\\n                    if(idx >= strs[i].size() ||(i > 0 && strs[i][idx] != strs[i-1][idx]))\\n                        return prefix;\\n            return prefix;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"6946",
			"view":"8617",
			"top":"5",
			"title":"Fast and simple Java code 231ms",
			"vote":"28",
			"content":"    public class Solution {\\n        public String longestCommonPrefix(List<String> strs) {\\n            if(strs.size()==0) return \"\";\\n            StringBuilder lcp=new StringBuilder();\\n            for(int i=0;i<strs.get(0).length();i++){\\n                char c=strs.get(0).charAt(i);\\n                for(String s:strs){\\n                    if(s.length()<i+1||c!=s.charAt(i)) return lcp.toString();\\n                }\\n                lcp.append(c);\\n            }\\n            return lcp.toString();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"6940",
			"view":"4568",
			"top":"6",
			"title":"Java ------ We Love Clear Code!",
			"vote":"24",
			"content":"    public String longestCommonPrefix(String[] strs) {\\n        if (strs == null) return null;\\n        if (strs.length == 0) return \"\";\\n        \\n        Arrays.sort(strs);\\n        char[] first = strs[0].toCharArray();\\n        char[] last  = strs[strs.length - 1].toCharArray();\\n         \\n        int i = 0, len = Math.min(first.length, last.length);\\n        while (i < len && first[i] == last[i]) i++;\\n        return strs[0].substring(0, i);\\n    }"
		},
		{
			"lc_ans_id":"6918",
			"view":"2558",
			"top":"7",
			"title":"Short Python Solution",
			"vote":"19",
			"content":"```\\n def longestCommonPrefix(self, strs):\\n        \"\"\"\\n        :type strs: List[str]\\n        :rtype: str\\n        \"\"\"\\n        if not strs:\\n            return \"\"\\n        shortest = min(strs,key=len)\\n        for i, ch in enumerate(shortest):\\n            for other in strs:\\n                if other[i] != ch:\\n                    return shortest[:i]\\n        return shortest \\n```"
		},
		{
			"lc_ans_id":"7258",
			"view":"3377",
			"top":"8",
			"title":"3 diffrent C++ solutions, each one costs 8ms.",
			"vote":"13",
			"content":"First one: check from strs[0][0] to strs[i][0]. If matches, check strs[0][1] to strs[i][1].\\n\\nCode:\\n\\n    class Solution {\\n    public:\\n        string longestCommonPrefix(vector<string>& strs) {\\n            if(strs.size()==0)\\n            return \"\";\\n            string ans=\"\";\\n            int max=INT_MAX;\\n            for(auto& s:strs)\\n            {\\n                max=(max>s.length())?s.length():max;\\n            }\\n            for(int i=0;i<max;i++)\\n            {\\n                bool flag=true;\\n                char x=strs[0][i];\\n                for(auto& s:strs)\\n                {\\n                    if(s[i]!=x)\\n                    {\\n                        flag=false;\\n                        break;\\n                    }\\n                }\\n                if(flag==false)\\n                return ans;\\n                ans+=x;\\n            }\\n            return ans;\\n        }\\n    };\\n\\nSecond one: assume the prefix is strs[0]. Compair with strs[i], and cut the letters which don't match.\\n\\nCode:\\n\\n    class Solution {\\n    public:\\n        string longestCommonPrefix(vector<string>& strs) {\\n            if(strs.size()==0)\\n            return \"\";\\n            string ans=strs[0];\\n            int max=INT_MAX;\\n            for(auto& s:strs)\\n            {\\n                if(s.length()==0)\\n                return \"\";\\n                int i=0;\\n                for(i=0;i<ans.length()&&i<s.length();i++)\\n                {\\n                    if(s[i]!=ans[i])\\n                    break;\\n                }\\n                ans=ans.substr(0,i);\\n            }\\n    \\n            return ans;\\n        }\\n    };\\n\\nThird one:  use a Trie data structure to save the strs. Search the trie, and stops when a TrieNode has more than one son.\\n\\nCode:\\n\\n    class TrieNode{\\n    public:\\n    \\tbool val;\\n    \\tTrieNode* next[52];\\n    \\tint sons;\\n    \\tTrieNode() :val(false), sons(0)\\n    \\t{\\n    \\t\\tfor (int i = 0; i < 52; i++)\\n    \\t\\t\\tnext[i] = nullptr;\\n    \\t}\\n    };\\n    class Trie{\\n    private:\\n    \\tTrieNode* putst(string& s, TrieNode * node, int loc, TrieNode *father)\\n    \\t{\\n    \\t\\tif (s.length() == 0)\\n    \\t\\t{\\n    \\t\\t\\tnode->val = true;\\n    \\t\\t\\tnode->sons++;\\n    \\t\\t\\treturn node;\\n    \\t\\t}\\n    \\t\\tif (node == nullptr)\\n    \\t\\t{\\n    \\t\\t\\tnode = new TrieNode();\\n    \\t\\t\\tif (father != nullptr)\\n    \\t\\t\\t\\tfather->sons++;\\n    \\t\\t}\\n    \\t\\tif (loc == s.length())\\n    \\t\\t{\\n    \\t\\t\\tnode->val = true;\\n    \\t\\t\\treturn node;\\n    \\t\\t}\\n    \\t\\tif (s[loc] >= 'a')\\n    \\t\\t\\tnode->next[s[loc] - 'a'] = putst(s, node->next[s[loc] - 'a'], loc + 1, node);\\n    \\t\\telse\\n    \\t\\t\\tnode->next[s[loc] - 'A' + 26] = putst(s, node->next[s[loc] - 'A' + 26], loc + 1, node);\\n    \\t\\treturn node;\\n    \\t}\\n    public:\\n    \\tTrieNode *root;\\n    \\tvoid insert(string & str){ putst(str, root, 0, nullptr); }\\n    \\tTrie(){ root = new TrieNode(); }\\n    };\\n    class Solution {\\n    private:\\n    \\tstring findPre(TrieNode * node)\\n    \\t{\\n    \\t\\tif (node == nullptr || (node != nullptr&&node->sons > 1))\\n    \\t\\t\\treturn string(\"\");\\n    \\t\\tint i = 0;\\n    \\t\\tfor (i = 0; i < 52; i++)\\n    \\t\\t{\\n    \\t\\t\\tif (node->next[i] != nullptr)\\n    \\t\\t\\t\\tbreak;\\n    \\t\\t}\\n    \\t\\tif (i == 52)\\n    \\t\\t\\treturn string(\"\");\\n    \\t\\tchar temp1 = ((i>25) ? ('A' + i) : ('a' + i));\\n    \\t\\tstring temp;\\n    \\t\\ttemp.insert(temp.begin(), temp1);\\n    \\t\\tif (node->val)\\n    \\t\\t{\\n    \\t\\t\\treturn string(\"\");\\n    \\t\\t}\\n    \\t\\telse\\n    \\t\\t{\\n    \\t\\t\\treturn temp + findPre(node->next[i]);\\n    \\t\\t}\\n    \\t}\\n    public:\\n    \\tstring longestCommonPrefix(vector<string>& strs) {\\n    \\t\\tTrie a;\\n    \\t\\tfor (auto& str : strs)\\n    \\t\\t\\ta.insert(str);\\n    \\t\\treturn findPre(a.root);\\n    \\t}\\n    };"
		},
		{
			"lc_ans_id":"7242",
			"view":"1637",
			"top":"9",
			"title":"Already implemented in Python",
			"vote":"12",
			"content":"    import os\\n    \\n    class Solution:\\n        # @param {string[]} strs\\n        # @return {string}\\n        def longestCommonPrefix(self, strs):\\n            return os.path.commonprefix(strs)"
		}
	],
	"id":"14",
	"title":"Longest Common Prefix",
	"content":"<p>Write a function to find the longest common prefix string amongst an array of strings.\r\n</p>",
	"frequency":"619",
	"ac_num":"240339"
}