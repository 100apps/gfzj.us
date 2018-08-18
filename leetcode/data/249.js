{
	"difficulty":"2",
	"submit_num":"71089",
	"show_id":"249",
	"leetcode_id":"249",
	"answers":[
		{
			"lc_ans_id":"67442",
			"view":"17688",
			"top":"0",
			"title":"My Concise JAVA Solution",
			"vote":"71",
			"content":"    public class Solution {\\n        public List<List<String>> groupStrings(String[] strings) {\\n            List<List<String>> result = new ArrayList<List<String>>();\\n            Map<String, List<String>> map = new HashMap<String, List<String>>();\\n            for (String str : strings) {\\n                int offset = str.charAt(0) - 'a';\\n                String key = \"\";\\n                for (int i = 0; i < str.length(); i++) {\\n                    char c = (char) (str.charAt(i) - offset);\\n                    if (c < 'a') {\\n                        c += 26;\\n                    }\\n                    key += c;\\n                }\\n                if (!map.containsKey(key)) {\\n                    List<String> list = new ArrayList<String>();\\n                    map.put(key, list);\\n                }\\n                map.get(key).add(str);\\n            }\\n            for (String key : map.keySet()) {\\n                List<String> list = map.get(key);\\n                Collections.sort(list);\\n                result.add(list);\\n            }\\n            return result;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67451",
			"view":"8422",
			"top":"1",
			"title":"4ms Easy C++ Solution with Explanations",
			"vote":"32",
			"content":"The key to this problem is how to identify strings that are in the same shifting sequence. There are different ways to encode this.\\n\\nIn the following code, this manner is adopted: for a string `s` of length `n`, we encode its shifting feature as `\"s[1] - s[0], s[2] - s[1], ..., s[n - 1] - s[n - 2],\"`.\\n\\nThen we build an `unordered_map`, using the above shifting feature string as key and strings that share the shifting feature as value. We store all the strings that share the same shifting feature in a `vector`. Well, remember to `sort` the `vector` since the problem requires them to be in lexicographic order :-)\\n\\nA final note, since the problem statement has given that `\"az\"` and `\"ba\"` belong to the same shifting sequence. So if `s[i] - s[i - 1]` is negative, we need to add `26` to it to make it positive and give the correct result. BTW, taking the suggestion of @StefanPochmann, we change the difference from numbers to lower-case alphabets using `'a' + diff`. \\n\\nThe code is as follows. \\n\\n    class Solution {\\n    public:\\n        vector<vector<string>> groupStrings(vector<string>& strings) {\\n            unordered_map<string, vector<string> > mp;\\n            for (string  s : strings)\\n                mp[shift(s)].push_back(s);\\n            vector<vector<string> > groups;\\n            for (auto m : mp) {\\n                vector<string> group = m.second;\\n                sort(group.begin(), group.end());\\n                groups.push_back(group);\\n            }\\n            return groups;\\n        }\\n    private:\\n        string shift(string& s) {\\n            string t;\\n            int n = s.length();\\n            for (int i = 1; i < n; i++) {\\n                int diff = s[i] - s[i - 1];\\n                if (diff < 0) diff += 26;\\n                t += 'a' + diff + ',';\\n            }\\n            return t;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"67452",
			"view":"4542",
			"top":"2",
			"title":"Concise 10-lines JAVA Solution with explanation",
			"vote":"22",
			"content":"**Explanation**\\n\\nThe basic idea is to set a key for each group: the sum of the difference between the adjacent chars in one string. Then we can easily group the strings belonging to the same shifting sequence with the same key. The code is as the following:\\n\\n    public List<List<String>> groupStrings(String[] strs) {\\n    \\tHashMap<String, ArrayList<String>> map = new HashMap<String, ArrayList<String>>();\\n        Arrays.sort(strs);    \\t\\n    \\tfor (String s : strs) {\\n    \\t\\tString key = \"\";\\n    \\t\\tfor (int i = 1; i < s.length(); i++) \\n    \\t\\t\\tkey += String.format(\"%2d\", (s.charAt(i) - s.charAt(i-1) + 26) % 26);//Difference from the previous char.\\n    \\t\\tif (!map.containsKey(key)) map.put(key, new ArrayList<String>());\\n    \\t\\tmap.get(key).add(s);    \\t\\t\\n    \\t} \\n    \\treturn new ArrayList<List<String>>(map.values());\\n    }"
		},
		{
			"lc_ans_id":"67466",
			"view":"3785",
			"top":"3",
			"title":"1-4 lines, Ruby and Python",
			"vote":"21",
			"content":"To identify each group, compute the modulo 26 difference between each letter in a word with the first letter in it.\\n\\n`Note:` Originally the problem required each group to be sorted. Not anymore. I now added adapted solutions but kept the old ones.\\n\\n**Solution 1: Ruby with `group_by`**\\n\\n    def group_strings(strings)\\n      strings.group_by { |s| s.bytes.map { |b| (b - s[0].ord) % 26 } }.values\\n    end\\n\\nOld solutions:\\n\\n    def group_strings(strings)\\n      strings.sort.group_by { |s| s.bytes.map { |b| (b - s[0].ord) % 26 } }.values\\n    end\\n\\nCan be a bit faster to group first and sort (each group) afterwards:\\n\\n    def group_strings(strings)\\n      strings.group_by { |s| s.bytes.map { |b| (b - s[0].ord) % 26 } }.values.map &:sort\\n    end\\n\\n**Solution 2: Python with `groupby`**\\n\\n    def groupStrings(self, strings):\\n        key = lambda s: [(ord(c) - ord(s[0])) % 26 for c in s]\\n        return [list(g) for _, g in itertools.groupby(sorted(strings, key=key), key)]\\n\\nOld solution:\\n\\n    def groupStrings(self, strings):\\n        key = lambda s: [(ord(c) - ord(s[0])) % 26 for c in s]\\n        return [sorted(g) for _, g in itertools.groupby(sorted(strings, key=key), key)]\\n\\n**Solution 3: Python with `defaultdict`**\\n\\n    def groupStrings(self, strings):\\n        groups = collections.defaultdict(list)\\n        for s in strings:\\n            groups[tuple((ord(c) - ord(s[0])) % 26 for c in s)] += s,\\n        return groups.values()\\n\\nOld solution:\\n\\n    def groupStrings(self, strings):\\n        groups = collections.defaultdict(list)\\n        for s in strings:\\n            groups[tuple((ord(c) - ord(s[0])) % 26 for c in s)] += s,\\n        return map(sorted, groups.values())"
		},
		{
			"lc_ans_id":"67459",
			"view":"2990",
			"top":"4",
			"title":"1-4 lines in Java",
			"vote":"15",
			"content":"Not sure I did it as good as it can be, as I'm still a beginner at Java streaming. If you can improve this, I'll be happy to see how.\\n\\n    public List<List<String>> groupStrings(String[] strings) {\\n        return new ArrayList(Stream.of(strings).collect(Collectors.groupingBy(\\n            s -> s.chars().mapToObj(c -> (c - s.charAt(0) + 26) % 26)\\n                  .collect(Collectors.toList())\\n        )).values());\\n    }"
		},
		{
			"lc_ans_id":"67484",
			"view":"1219",
			"top":"5",
			"title":"Why [\"az\",\"ba\"]is the answer in the exampe?Shift right instead of shift left?",
			"vote":"12",
			"content":"I don't quite understand the question. Successive letter means in alphabet order or the next letter in the string. And is \"ba\" the result of shifting \"az\" to the right? And we can't shift \"az\" to the left because z is the last letter in the alphabet?"
		},
		{
			"lc_ans_id":"67450",
			"view":"1394",
			"top":"6",
			"title":"12 lines Java solution with explanation",
			"vote":"9",
			"content":"    public List<List<String>> groupStrings(String[] strs) {\\n        //Create a hashmap. key is a number (the offset compared to its first char), \\n        //value is a list of strings which have the same offset.\\n        //For each string, convert it to char array \\n        //Then subtract its first character for every character\\n        //eg. \"abc\" -> \"0,1,2,\"        \"am\"->\"0,12,\"\\n        Map<String,List<String>> map = new HashMap<>();\\n        for(String str : strs) {\\n            String key = \"\";\\n            char first = str.charAt(0);\\n            for(char c:str.toCharArray())\\n                key+=(c-first<0?c-first+26:c-first)+\",\";\\n            if(!map.containsKey(key))\\n                map.put(key,new ArrayList<String>());\\n            map.get(key).add(str);\\n        }\\n        for(String key:map.keySet())\\n            Collections.sort(map.get(key));\\n        return new ArrayList<List<String>>(map.values());\\n    }"
		},
		{
			"lc_ans_id":"67549",
			"view":"1401",
			"top":"7",
			"title":"Around 13 lines code in java",
			"vote":"6",
			"content":"  \\n\\n     public class Solution {\\n        public List<List<String>> groupStrings(String[] strings) {\\n            \\n            List<List<String>> res = new ArrayList<List<String>>();\\n            HashMap<String, List<String>> map = new HashMap<String, List<String>>();\\n            \\n            for(String word : strings){\\n                String key = \"\";\\n                int offset = word.charAt(0) - 'a';\\n                for(int i = 1; i < word.length(); i++){\\n                    key += (word.charAt(i) - offset + 26) % 26;\\n                }\\n                \\n                if(!map.containsKey(key)){\\n                    map.put(key, new ArrayList<String>());\\n                }\\n                map.get(key).add(word);\\n            }\\n            \\n            for(List<String> list : map.values()){\\n                Collections.sort(list);\\n                res.add(list);\\n            }\\n            \\n            return res;\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"67567",
			"view":"908",
			"top":"8",
			"title":"4ms C++ solution",
			"vote":"6",
			"content":"    vector<vector<string>> groupStrings(vector<string>& strings) {\\n\\t\\tunordered_map<string, vector<string>> hmap;\\n\\n\\t\\tfor (int i = 0; i<strings.size(); i++) {\\n\\t\\t\\tstring t = strings[i];\\n\\t\\t\\tint diff = t[0] - 'a';\\n\\t\\t\\tfor (int j = 0; j<strings[i].size(); j++) {\\n\\t\\t\\t\\tif (t[j] - diff - 'a' >= 0)\\n\\t\\t\\t\\t\\tt[j] = t[j] - diff;\\n\\t\\t\\t\\telse \\n\\t\\t\\t\\t\\tt[j] = (t[j] - diff) + 26;\\n\\t\\t\\t}\\n\\n\\t\\t\\thmap[t].push_back(strings[i]);\\n\\t\\t}\\n\\n\\t\\tvector<vector<string>> result;\\n\\t\\tfor (auto iter = hmap.begin(); iter != hmap.end(); ++iter) {\\n\\t\\t\\tresult.push_back(iter->second);\\n\\t\\t\\tsort(result.back().begin(), result.back().end());\\n\\t\\t}\\n\\n\\t\\treturn result;\\n\\t}"
		},
		{
			"lc_ans_id":"67552",
			"view":"942",
			"top":"9",
			"title":"48 ms Python Solution easy to understand",
			"vote":"4",
			"content":"    class Solution(object):\\n        def groupStrings(self, strings):\\n            \"\"\"\\n            :type strings: List[str]\\n            :rtype: List[List[str]]\\n            \"\"\"\\n            dictionary = {}\\n            for i in strings:\\n                hs = self.strHash(i)\\n                if hs not in dictionary.keys():\\n                    dictionary[hs] = [str(i)]\\n                else:\\n                    self.insertStr(dictionary[hs],str(i))\\n            return [dictionary[key] for key in dictionary.keys()]\\n        \\n        def strHash(self,astring):\\n            hslist = [(ord(i)-ord(astring[0])) % 26 for i in astring]\\n            return tuple(hslist)\\n        \\n        def insertStr(self, alist, astring):\\n            i = 0\\n            while i < len(alist) and ord(astring[0]) > ord(alist[i][0]):\\n                i += 1\\n            if i == len(alist):\\n                alist.append(astring)\\n            else:\\n                alist[:] = alist[0:i] + [astring] + alist[i:]"
		}
	],
	"id":"249",
	"title":"Group Shifted Strings",
	"content":"<p>Given a string, we can \"shift\" each of its letter to its successive letter, for example: <code>\"abc\" -> \"bcd\"</code>. We can keep \"shifting\" which forms the sequence:</p>\r\n<pre>\"abc\" -> \"bcd\" -> ... -> \"xyz\"</pre>\r\n\r\n<p>Given a list of strings which contains only lowercase alphabets, group all strings that belong to the same shifting sequence.</p>\r\n\r\n<p>For example, given: <code>[\"abc\", \"bcd\", \"acef\", \"xyz\", \"az\", \"ba\", \"a\", \"z\"]</code>, <br>\r\nA solution is:\r\n<pre>\r\n[\r\n  [\"abc\",\"bcd\",\"xyz\"],\r\n  [\"az\",\"ba\"],\r\n  [\"acef\"],\r\n  [\"a\",\"z\"]\r\n]</pre></p>",
	"frequency":"210",
	"ac_num":"30893"
}