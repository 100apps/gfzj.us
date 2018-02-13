{
	"difficulty":"1",
	"submit_num":"89722",
	"show_id":"500",
	"leetcode_id":"500",
	"answers":[
		{
			"lc_ans_id":"97871",
			"view":"24549",
			"top":"0",
			"title":"Java 1-Line Solution via Regex and Stream",
			"vote":"56",
			"content":"```Java\\npublic String[] findWords(String[] words) {\\n    return Stream.of(words).filter(s -> s.toLowerCase().matches(\"[qwertyuiop]*|[asdfghjkl]*|[zxcvbnm]*\")).toArray(String[]::new);\\n}\\n```"
		},
		{
			"lc_ans_id":"97870",
			"view":"23945",
			"top":"1",
			"title":"Short Easy Java with Explanation",
			"vote":"38",
			"content":"```\\npublic class Solution {\\n    public String[] findWords(String[] words) {\\n        String[] strs = {\"QWERTYUIOP\",\"ASDFGHJKL\",\"ZXCVBNM\"};\\n        Map<Character, Integer> map = new HashMap<>();\\n        for(int i = 0; i<strs.length; i++){\\n            for(char c: strs[i].toCharArray()){\\n                map.put(c, i);//put <char, rowIndex> pair into the map\\n            }\\n        }\\n        List<String> res = new LinkedList<>();\\n        for(String w: words){\\n            if(w.equals(\"\")) continue;\\n            int index = map.get(w.toUpperCase().charAt(0));\\n            for(char c: w.toUpperCase().toCharArray()){\\n                if(map.get(c)!=index){\\n                    index = -1; //don't need a boolean flag. \\n                    break;\\n                }\\n            }\\n            if(index!=-1) res.add(w);//if index != -1, this is a valid string\\n        }\\n        return res.toArray(new String[0]);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"97913",
			"view":"15335",
			"top":"2",
			"title":"Easy understand solution in 7 lines for everyone",
			"vote":"35",
			"content":"First of all,\\n````\\nif you are python user {\\n please upvote if it makes sense;\\n} else if you are C++/Java user {\\n please let me know if somewhere is not clear;\\n}\\n````\\nI have used ```set``` to check the word.\\nI firstly make every line a set of letter. \\nThen I check every word if this word set is the subset if any line set.\\n\\n````\\ndef findWords(self, words):\\n    line1, line2, line3 = set('qwertyuiop'), set('asdfghjkl'), set('zxcvbnm')\\n    ret = []\\n    for word in words:\\n      w = set(word.lower())\\n      if w.issubset(line1) or w.issubset(line2) or w.issubset(line3):\\n        ret.append(word)\\n    return ret\\n````"
		},
		{
			"lc_ans_id":"97888",
			"view":"8287",
			"top":"3",
			"title":"one-liner Ruby + Python",
			"vote":"32",
			"content":"Just regular expressions...\\n\\nRuby\\n```\\ndef find_words(words)\\n  words.select { |w| w =~ /^([qwertyuiop]*|[asdfghjkl]*|[zxcvbnm]*)$/i }\\nend\\n```\\nPython\\n\\n    def findWords(self, words):\\n        return filter(re.compile('(?i)([qwertyuiop]*|[asdfghjkl]*|[zxcvbnm]*)$').match, words)"
		},
		{
			"lc_ans_id":"97881",
			"view":"4812",
			"top":"4",
			"title":"Solution in python using set",
			"vote":"20",
			"content":"Here is the code\\n```\\nclass Solution(object):\\n    def findWords(self, words):\\n        \"\"\"\\n        :type words: List[str]\\n        :rtype: List[str]\\n        \"\"\"\\n        a=set('qwertyuiop')\\n        b=set('asdfghjkl')\\n        c=set('zxcvbnm')\\n        ans=[]\\n        for word in words:\\n            t=set(word.lower())\\n            if a&t==t:\\n                ans.append(word)\\n            if b&t==t:\\n                ans.append(word)\\n            if c&t==t:\\n                ans.append(word)\\n        return ans\\n```"
		},
		{
			"lc_ans_id":"97924",
			"view":"1719",
			"top":"5",
			"title":"C++ solution use bit manipulations",
			"vote":"15",
			"content":"The idea is simple. Define a mask flag for each row. In my implementation, I define the flag for Row 1 (\"QWERTYUIOP\") as ```1 (001)```, Row 2 (\"ASDFGHJKL\") as ```2 (010)```, Row 3 (\"ZXCVBNM\") as ```4 (100)```.\\nFor each word, us ```7 (111)``` as base, do ```AND``` operation on each character. If all chars from same row, the final result will be one of ```(1, 2, 4)```. If any character from other row, the final result will be ```0```.\\n\\n```\\nclass Solution {\\npublic:\\n    vector<string> findWords(vector<string>& words) {\\n        vector<int> dict(26);\\n        vector<string> rows = {\"QWERTYUIOP\", \"ASDFGHJKL\", \"ZXCVBNM\"};\\n        for (int i = 0; i < rows.size(); i++) {\\n            for (auto c : rows[i]) dict[c-'A'] = 1 << i;\\n        }\\n        vector<string> res;\\n        for (auto w : words) {\\n            int r = 7;\\n            for (char c : w) {\\n                r &= dict[toupper(c)-'A'];\\n                if (r == 0) break;\\n            }\\n            if (r) res.push_back(w);\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"97873",
			"view":"10058",
			"top":"6",
			"title":"C++ solution",
			"vote":"12",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<string> findWords(vector<string>& words) {\\n        unordered_set<char> row1 {'q', 'w', 'e', 'r', 't', 'y','u', 'i', 'o', 'p'};\\n        unordered_set<char> row2 {'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'}; \\n        unordered_set<char> row3 { 'z', 'x', 'c', 'v', 'b' ,'n', 'm'};\\n        vector<unordered_set<char>> rows {row1, row2, row3};\\n        \\n        \\n        vector<string> validWords;\\n        for(int i=0; i<words.size(); ++i){\\n            int row=0;\\n            \\n            for(int k=0; k<3; ++k){\\n                if(rows[k].count((char)tolower(words[i][0])) > 0) row = k;\\n            }\\n            \\n            validWords.push_back(words[i]);\\n            for(int j=1; j<words[i].size(); ++j){\\n                if(rows[row].count((char)tolower(words[i][j])) == 0){\\n                    validWords.pop_back();\\n                    break;\\n                }\\n            }\\n            \\n        }\\n        return validWords;\\n    }\\n};"
		},
		{
			"lc_ans_id":"97867",
			"view":"607",
			"top":"7",
			"title":"Intuitive Javascript Solution",
			"vote":"8",
			"content":"```\\nvar findWords = function(words) {\\n    return words.filter((w) => {\\n        // remove word from array if it fails matching all three rows\\n        if (\\n            !/^[qwertyuiop]*$/i.test(w) &&\\n            !/^[asdfghjkl]*$/i.test(w) &&\\n            !/^[zxcvbnm]*$/i.test(w)\\n        ) return false;\\n        \\n        return true;\\n    });\\n};\\n```"
		},
		{
			"lc_ans_id":"97872",
			"view":"1641",
			"top":"8",
			"title":"C++ solution with 3 hash tables",
			"vote":"8",
			"content":"``` class Solution {\\npublic:\\n\\tvector<string> findWords(vector<string>& words) {\\n\\n\\t\\tstd::unordered_set <char> dict1 = { 'q','Q','w','W','e','E','r','R','t','T','y','Y','u','U','i','I','o','O','p','P' };\\n\\t\\tstd::unordered_set <char> dict2 = { 'a','A','s','S','d','D','f','F','g','G','h','H','j','J','k','K','l','L'};\\n\\t\\tstd::unordered_set <char> dict3 = { 'z','Z','x','X','c','C','v','V','b','B','n','N','m','M'};\\n\\n\\t\\tvector<string> res;\\n\\n\\t\\tfor (auto &word : words)\\n\\t\\t{\\n\\t\\t\\tbool d1 = true, d2 = true, d3 = true;\\n\\n\\t\\t\\tfor (auto & ch : word)\\n\\t\\t\\t{\\n\\t\\t\\t\\tif (d1) {\\n\\t\\t\\t\\t\\tauto it = dict1.find(ch);\\n\\t\\t\\t\\t\\tif (it == dict1.end()) d1 = false;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tif (d2) {\\n\\t\\t\\t\\t\\tauto it = dict2.find(ch);\\n\\t\\t\\t\\t\\tif (it == dict2.end()) d2 = false;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tif (d3) {\\n\\t\\t\\t\\t\\tauto it = dict3.find(ch);\\n\\t\\t\\t\\t\\tif (it == dict3.end()) d3 = false;\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\n\\t\\t\\tif (d1 || d2 || d3) res.push_back(word);\\n\\t\\t}\\n\\n\\t\\treturn res;\\n\\t}\\n};"
		},
		{
			"lc_ans_id":"97908",
			"view":"1363",
			"top":"9",
			"title":"Java AC Solution, Easy to understand beats 95.67% in 2ms",
			"vote":"5",
			"content":"```\\npublic class Solution \\n{\\n    String[] rows = new String[]{\"QWERTYUIOPqwertyuiop\",\"ASDFGHJKLasdfghjkl\",\"ZXCVBNMzxcvbnm\"};\\n        \\n    public String[] findWords(String[] words) \\n    {\\n        ArrayList<String> result = new ArrayList<String>();\\n    \\n        int currentRow = 0;\\n        boolean found = true;\\n        for(String s : words)\\n        {\\n            currentRow = getCurrentRow(s.charAt(0));\\n            found = true;\\n            for(char c: s.toCharArray())\\n            {\\n                if(rows[currentRow].indexOf(c) == -1)\\n                {\\n                    found = false;\\n                    break;\\n                }\\n            }\\n            if(found)\\n               result.add(s);\\n        }\\n        \\n        return result.toArray(new String[result.size()]);\\n    }\\n    \\n    private int getCurrentRow(char c)\\n    {\\n       for(int rowNumber = 0; rowNumber < 3 ; rowNumber++)\\n       {\\n           if (rows[rowNumber].indexOf(c) != -1)\\n           {\\n               return rowNumber;\\n           }\\n       }\\n       return -1;\\n    }\\n}\\n```"
		}
	],
	"id":"490",
	"title":"Keyboard Row",
	"content":"<p>Given a List of words, return the words that can be typed using letters of <b>alphabet</b> on only one row's of American keyboard like the image below. </p>\r\n\r\n<br/>\r\n<p>\r\n<img src=\"/static/images/problemset/keyboard.png\"  alt=\"American keyboard\" />\r\n</p>\r\n<br/>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [\"Hello\", \"Alaska\", \"Dad\", \"Peace\"]\r\n<b>Output:</b> [\"Alaska\", \"Dad\"]\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>You may use one character in the keyboard more than once.</li>\r\n<li>You may assume the input string will only contain letters of alphabet.</li>\r\n</ol>\r\n</p>",
	"frequency":"462",
	"ac_num":"53682"
}