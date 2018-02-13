{
	"difficulty":"2",
	"submit_num":"476599",
	"show_id":"49",
	"leetcode_id":"49",
	"answers":[
		{
			"lc_ans_id":"19176",
			"view":"55324",
			"top":"0",
			"title":"Share my short JAVA solution",
			"vote":"179",
			"content":"    public class Solution {\\n        public List<List<String>> groupAnagrams(String[] strs) {\\n            if (strs == null || strs.length == 0) return new ArrayList<List<String>>();\\n            Map<String, List<String>> map = new HashMap<String, List<String>>();\\n            for (String s : strs) {\\n                char[] ca = s.toCharArray();\\n                Arrays.sort(ca);\\n                String keyStr = String.valueOf(ca);\\n                if (!map.containsKey(keyStr)) map.put(keyStr, new ArrayList<String>());\\n                map.get(keyStr).add(s);\\n            }\\n            return new ArrayList<List<String>>(map.values());\\n        }\\n    }"
		},
		{
			"lc_ans_id":"19484",
			"view":"18705",
			"top":"1",
			"title":"What does it mean \"return all groups\"? But the return result is vector<string>? How can we return all groups?",
			"vote":"91",
			"content":"What does it mean \"return all groups\"? But the return result is vector<string>? How can we return all groups? I mean, for example, we have such vector [\"dog\",\"cat\",\"god\",\"tac\"]. What should I return?"
		},
		{
			"lc_ans_id":"19183",
			"view":"22712",
			"top":"2",
			"title":"Java beat 100%!!! use prime number",
			"vote":"84",
			"content":"    public static List<List<String>> groupAnagrams(String[] strs) { \\n       int[] prime = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103};//\\u6700\\u591a10609\\u4e2az\\n        \\n                List<List<String>> res = new ArrayList<>();\\n                HashMap<Integer, Integer> map = new HashMap<>();\\n                for (String s : strs) {\\n                    int key = 1;\\n                    for (char c : s.toCharArray()) {\\n                        key *= prime[c - 'a'];\\n                    }\\n                    List<String> t;\\n                    if (map.containsKey(key)) {\\n                        t = res.get(map.get(key));\\n                    } else {\\n                        t = new ArrayList<>();\\n                        res.add(t);\\n                        map.put(key, res.size() - 1);\\n                    }\\n                    t.add(s);\\n                }\\n                return res;\\n        }"
		},
		{
			"lc_ans_id":"19200",
			"view":"20170",
			"top":"3",
			"title":"10-lines 76ms Easy C++ Solution (Updated Function Signature)",
			"vote":"72",
			"content":"The function signature has been updated to return a more intuitive `vector<vector<string>>` which treats a single string as a group of anagrams consisting of only itself.\\n\\nThe idea is to use an `unordered_map` to store those strings that are anagrams. We use the sorted string as the key and the string itself as the value. The strings are stored in a `multiset` since there may be duplicates. Moreover, `multiset` will sort them by default as we desire.\\n\\nThe code is as follows.\\n\\n    class Solution {\\n    public:\\n        vector<vector<string>> groupAnagrams(vector<string>& strs) {\\n            unordered_map<string, multiset<string>> mp;\\n            for (string s : strs) {\\n                string t = s; \\n                sort(t.begin(), t.end());\\n                mp[t].insert(s);\\n            }\\n            vector<vector<string>> anagrams;\\n            for (auto m : mp) { \\n                vector<string> anagram(m.second.begin(), m.second.end());\\n                anagrams.push_back(anagram);\\n            }\\n            return anagrams;\\n        }\\n    };\\n\\n**Update**: as suggested by yswu1234 in the answer, general `sort` takes `O(nlogn)` time. In this problem, since the string only contains lower-case alphabets, we can write a sorting function using counting sort (`O(n)` time) to speed up the sorting process. I write a string sorting function `strSort` below and using it to sort the string achieves the overall running time 72ms for this problem.\\n\\n    class Solution {\\n    public:\\n        vector<vector<string>> groupAnagrams(vector<string>& strs) {\\n            unordered_map<string, multiset<string>> mp;\\n            for (string s : strs) {\\n                string t = strSort(s);\\n                mp[t].insert(s);\\n            }\\n            vector<vector<string>> anagrams;\\n            for (auto m : mp) { \\n                vector<string> anagram(m.second.begin(), m.second.end());\\n                anagrams.push_back(anagram);\\n            }\\n            return anagrams;\\n        }\\n    private:\\n        string strSort(string& s) {\\n            int count[26] = {0}, n = s.length();\\n            for (int i = 0; i < n; i++)\\n                count[s[i] - 'a']++;\\n            int p = 0;\\n            string t(n, 'a');\\n            for (int j = 0; j < 26; j++)\\n                for (int i = 0; i < count[j]; i++)\\n                    t[p++] += j;\\n            return t;\\n        } \\n    };"
		},
		{
			"lc_ans_id":"19233",
			"view":"11630",
			"top":"4",
			"title":"O(M * N) algorithm using hash, without sort()",
			"vote":"35",
			"content":"Assign a prime number for a to z, and then multiply all prime numbers together to form a hash value.\\n\\n\\n        \\n        private static final int[] PRIMES = new int[]{2, 3, 5, 7, 11 ,13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 107};\\n        \\n        public List<String> anagrams(String[] strs) {\\n            List<String> list = new LinkedList<>();\\n            Map<Integer, List<String>> mapString = new HashMap<>();\\n            int result = -1;\\n            for (int i = 0; i < strs.length; i++){\\n                int mapping = 1;\\n                for (int j = 0, max = strs[i].length(); j < max; j++) {\\n                    mapping *= PRIMES[strs[i].charAt(j) - 'a'];\\n                }\\n                List<String> strings = mapString.get(mapping);\\n                if (strings == null) {\\n                    strings = new LinkedList<>();\\n                    mapString.put(mapping, strings);\\n                }\\n                strings.add(strs[i]);\\n            }\\n            for (List<String> mapList : mapString.values()){\\n                if (mapList.size() > 1)\\n                    list.addAll(mapList);\\n            }\\n            return list;\\n        }"
		},
		{
			"lc_ans_id":"19468",
			"view":"5133",
			"top":"5",
			"title":"Why not list of list of strings as output?",
			"vote":"31",
			"content":"Why the output is list and not a list of list. What If there are multiple groups of anagrams?"
		},
		{
			"lc_ans_id":"19404",
			"view":"9398",
			"top":"6",
			"title":"Sharing my very concise solution with explanation",
			"vote":"29",
			"content":"    vector<string> anagrams(vector<string> &strs) {\\n        vector<string> result;\\n        vector<string> sortedStrs = strs;\\n        unordered_map<string, vector<int>> map;\\n        for(int i = 0; i < strs.size(); i++){\\n            sort(sortedStrs[i].begin(), sortedStrs[i].end());\\n            map[sortedStrs[i]].push_back(i);\\n        }\\n        for(auto it = map.begin(); it != map.end(); it++){\\n            if(it->second.size() > 1){\\n                for(int i = 0; i < it->second.size(); i++){\\n                    result.push_back(strs[it->second[i]]);\\n                }\\n            }\\n        }\\n        return result;\\n    }\\n\\nHere is basic idea for this problem.\\n\\nFirst, get a copy of \"strs\". Let's name this copy \"sortedStrs\".\\n\\nSecond, sort all strings in \"sortedStrs\".\\n\\nAnd we have a hash map `unordered_map<string, vector<int>> map`.\\n\\nEvery string in \"sortedStrs\" will be recorded in this hash map with its position.\\n\\nIn the second loop, we traverse this hash map. And find each value of which size is larger than 1. Then find the original string in \"strs\".\\n\\nDone."
		},
		{
			"lc_ans_id":"19203",
			"view":"8277",
			"top":"7",
			"title":"2-line Python solution, AC with 350ms (some useful Python tricks)",
			"vote":"29",
			"content":"\\n\\n        def anagrams(self, strs):\\n            count = collections.Counter([tuple(sorted(s)) for s in strs])\\n            return filter(lambda x: count[tuple(sorted(x))]>1, strs)\\n\\n\\n - collections.Counter creates a counter object. A counter object is like a specific kind of dictionary where it is build for counting  (objects that hashes to same value)\\n - tuple(sorted(s)) is used here so that anagrams will be hashed to the same value. tuple is used because sorted returns a list which cannot be hashed but tuples can be hashed\\n - filter: selects some elements of the list based on given function (first argument - a lambda function is given here)\\n - lambda function defined here returns True if number of anagrams of that elements is greater than 1"
		},
		{
			"lc_ans_id":"19224",
			"view":"2256",
			"top":"8",
			"title":"A clean c++ solution with unordered_map",
			"vote":"20",
			"content":"\\tvector<vector<string>> groupAnagrams(vector<string>& strs) {\\n\\t\\tunordered_map<string, vector<string>> count;\\n\\t\\tint i = 0;\\n\\t\\tfor (auto s : strs)\\n\\t\\t{\\n\\t\\t\\tsort(s.begin(), s.end());\\n\\t\\t\\tcount[s].push_back(strs[i++]);\\n\\t\\t}\\n\\t\\tvector<vector<string>> res;\\n\\t\\tfor (auto n : count){\\n\\t\\t\\tsort(n.second.begin(), n.second.end());\\n\\t\\t\\tres.push_back(n.second);\\n\\t\\t}\\n\\t\\treturn res;\\n\\t}"
		},
		{
			"lc_ans_id":"19202",
			"view":"2809",
			"top":"9",
			"title":"5-line Python solution, easy to understand",
			"vote":"18",
			"content":"    def groupAnagrams(self, strs):\\n        d = {}\\n        for w in sorted(strs):\\n            key = tuple(sorted(w))\\n            d[key] = d.get(key, []) + [w]\\n        return d.values()"
		}
	],
	"id":"49",
	"title":"Group Anagrams",
	"content":"<p>Given an array of strings, group anagrams together.\r\n</p>\r\n\r\n<p>For example, given: <code>[\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]</code>, <br>\r\nReturn:\r\n<pre>\r\n[\r\n  [\"ate\", \"eat\",\"tea\"],\r\n  [\"nat\",\"tan\"],\r\n  [\"bat\"]\r\n]</pre></p>\r\n\r\n<p><b>Note:</b> All inputs will be in lower-case.</p>",
	"frequency":"542",
	"ac_num":"178194"
}