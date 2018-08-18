{
	"difficulty":"1",
	"submit_num":"39276",
	"show_id":"422",
	"leetcode_id":"422",
	"answers":[
		{
			"lc_ans_id":"91125",
			"view":"8126",
			"top":"0",
			"title":"Java AC Solution Easy to Understand",
			"vote":"25",
			"content":"Simply check for each row and columns, return false if not match.\\n```\\npublic class Solution {\\n    public boolean validWordSquare(List<String> words) {\\n        if(words == null || words.size() == 0){\\n            return true;\\n        }\\n        int n = words.size();\\n        for(int i=0; i<n; i++){\\n            for(int j=0; j<words.get(i).length(); j++){\\n                if(j >= n || words.get(j).length() <= i || words.get(j).charAt(i) != words.get(i).charAt(j))\\n                    return false;\\n            }\\n        }\\n        return true;\\n    }\\n}\\n````"
		},
		{
			"lc_ans_id":"91126",
			"view":"4792",
			"top":"1",
			"title":"1-liner Python",
			"vote":"23",
			"content":"**Solution:**\\n\\n    def validWordSquare(self, words):\\n        return map(None, *words) == map(None, *map(None, *words))\\n\\nOr saving some work but taking two lines:\\n\\n    def validWordSquare(self, words):\\n        t = map(None, *words)\\n        return t == map(None, *t)\\n\\n**Explanation:**\\n\\nThe `map(None, ...)` transposes the \"matrix\", filling missing spots with `None`. For example:\\n```\\n[\"abc\",           [('a', 'd', 'f'),\\n \"de\",     =>      ('b', 'e', None),\\n \"f\"]              ('c', None, None)]\\n```\\nAnd then I just need to check whether transposing it once more changes it."
		},
		{
			"lc_ans_id":"91144",
			"view":"2466",
			"top":"2",
			"title":"Accepted concise C++ solution",
			"vote":"12",
			"content":"```\\n   bool validWordSquare(vector<string>& words) {\\n        for(int i = 0; i < words.size(); ++i) {\\n            for(int j = 0; j < words[i].size(); ++j)             {\\n                if(j >= words.size() || words[j].size() <= i || words[j][i] != words[i][j])\\n                   return false;\\n            }\\n        }\\n        return true;\\n   }"
		},
		{
			"lc_ans_id":"91150",
			"view":"1851",
			"top":"3",
			"title":"Highly Readable Code in Java",
			"vote":"9",
			"content":"Code readability is also an important aspect when we are doing interviews. Split it into two functions.\\n```\\npublic class Solution {\\n    public boolean validWordSquare(List<String> words) {\\n        if(words.size() == 0) return true;\\n        \\n        for(int i=0; i<words.size(); i++){\\n            String s = words.get(i);\\n            if(!s.equals(getVerticalString(i, words))){\\n                return false;\\n            }\\n        }\\n        \\n        return true;\\n    }\\n    \\n    String getVerticalString(int col, List<String> words){\\n        StringBuilder sb = new StringBuilder();\\n        \\n        for(int i=0; i<words.size(); i++){\\n            String word = words.get(i);\\n            if(col < word.length()){\\n                sb.append(word.charAt(col));\\n            }\\n            \\n        }\\n        \\n        return sb.toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"91167",
			"view":"581",
			"top":"4",
			"title":"Only three false conditions: too short, too long, letter not equal",
			"vote":"8",
			"content":"```\\npublic boolean validWordSquare(List<String> words) {\\n        if (words.size() == 0 || words == null) return true;\\n        int n = words.size();\\n        for (int i = 0; i < n; i++) {\\n            String tmp = words.get(i);\\n            for (int j = 0; j < tmp.length(); j++) {\\n                // too long\\n                if (j >= n)\\n                    return false;\\n                // too short\\n                if (words.get(j).length() <= i)\\n                    return false;\\n                // letter not equal\\n                if (tmp.charAt(j) != words.get(j).charAt(i))\\n                    return false;\\n            }\\n        }\\n        return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"91164",
			"view":"442",
			"top":"5",
			"title":"Python Swapping Index",
			"vote":"7",
			"content":"![alt text](https://pic1.zhimg.com/80/v2-fbd4327af036b3aa4af54ad9f3e9aa6c_r.jpg)\\n\\n    class Solution(object):\\n        def validWordSquare(self, words):\\n            for i in range(len(words)):\\n                for j in range(len(words[i])):\\n                    if j >= len(words) or i >= len(words[j]) or words[i][j] != words[j][i]:\\n                        return False\\n            return True"
		},
		{
			"lc_ans_id":"91169",
			"view":"222",
			"top":"6",
			"title":"Python Solution using IndexError, no extra space",
			"vote":"3",
			"content":"```\\nclass Solution(object):\\n    def validWordSquare(self, words):\\n        try:\\n            for i in xrange(len(words)):\\n                for j in xrange(len(words[i])):\\n                    if words[i][j] != words[j][i]:\\n                        return False\\n            return True\\n        except IndexError:\\n            return False\\n        \\n```"
		},
		{
			"lc_ans_id":"91158",
			"view":"192",
			"top":"7",
			"title":"66ms, 7 lines, beating 95% - Python Code",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def validWordSquare(self, words):\\n        \"\"\"\\n        :type words: List[str]\\n        :rtype: bool\\n        \"\"\"\\n        length = len( words )\\n        for k, v in enumerate(words):\\n             if len( v ) > length:\\n                return False\\n             if len( v ) < length:\\n                words[ k ] += ' '* ( length - len( v ) )\\n                                            \\n        return words == list(map(''.join,zip(*words)))\\n```"
		},
		{
			"lc_ans_id":"91162",
			"view":"334",
			"top":"8",
			"title":"JAVA 8ms.....",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public boolean validWordSquare(List<String> words) {\\n        int height = words.size();\\n        if (height==0) return false;\\n        int width = words.get(0).length();\\n        if (height!=width) return false;\\n        \\n        char[][] square = new char[height][width];\\n        for (int i=0; i<height; i++) {\\n            int j=0;\\n            for (char c: words.get(i).toCharArray()) {\\n                if (j==width) return false;\\n                square[i][j++]=c;\\n            }\\n        }\\n        \\n        for (int i=1; i<width; i++) {\\n            for (int j=0; j<i; j++) {\\n                if (square[i][j] != square[j][i]) return false;\\n            }\\n        }\\n        \\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"91170",
			"view":"340",
			"top":"9",
			"title":"Very Concise Java Solution, and easy to understand and fast",
			"vote":"2",
			"content":"     public class Solution {\\n         public boolean validWordSquare(List<String> words) {\\n                if(words == null) return false;\\n                if(words.size() <= 1) return true;\\n        \\n                for(int i = 0; i < words.size(); i++)\\n                {\\n                       String s = words.get(i);\\n                       for(int j = 0; j < s.length(); j++)\\n                       {\\n                             try\\n                             {\\n                                   if(s.charAt(j) != words.get(j).charAt(i)) return false;\\n                             }\\n                             catch(Exception e)\\n                             {\\n                                   return false;\\n                             }\\n                       }\\n               }\\n        \\n             return true;\\n       }\\n}"
		}
	],
	"id":"422",
	"title":"Valid Word Square",
	"content":"<p>Given a sequence of words, check whether it forms a valid word square.</p>\r\n\r\n<p>A sequence of words forms a valid word square if the <i>k</i><sup>th</sup> row and column read the exact same string, where 0 &le; <i>k</i> &lt; max(numRows, numColumns).</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ol>\r\n<li>The number of words given is at least 1 and does not exceed 500.</li>\r\n<li>Word length will be at least 1 and does not exceed 500.</li>\r\n<li>Each word contains only lowercase English alphabet <code>a-z</code>.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b>\r\n[\r\n  \"abcd\",\r\n  \"bnrt\",\r\n  \"crmy\",\r\n  \"dtye\"\r\n]\r\n\r\n<b>Output:</b>\r\ntrue\r\n\r\n<b>Explanation:</b>\r\nThe first row and first column both read \"abcd\".\r\nThe second row and second column both read \"bnrt\".\r\nThe third row and third column both read \"crmy\".\r\nThe fourth row and fourth column both read \"dtye\".\r\n\r\nTherefore, it is a valid word square.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b>\r\n[\r\n  \"abcd\",\r\n  \"bnrt\",\r\n  \"crm\",\r\n  \"dt\"\r\n]\r\n\r\n<b>Output:</b>\r\ntrue\r\n\r\n<b>Explanation:</b>\r\nThe first row and first column both read \"abcd\".\r\nThe second row and second column both read \"bnrt\".\r\nThe third row and third column both read \"crm\".\r\nThe fourth row and fourth column both read \"dt\".\r\n\r\nTherefore, it is a valid word square.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b>\r\n<pre>\r\n<b>Input:</b>\r\n[\r\n  \"ball\",\r\n  \"area\",\r\n  \"read\",\r\n  \"lady\"\r\n]\r\n\r\n<b>Output:</b>\r\nfalse\r\n\r\n<b>Explanation:</b>\r\nThe third row reads \"read\" while the third column reads \"lead\".\r\n\r\nTherefore, it is <b>NOT</b> a valid word square.\r\n</pre>\r\n</p>",
	"frequency":"26",
	"ac_num":"14376"
}