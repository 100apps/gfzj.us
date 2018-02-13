{
	"difficulty":"1",
	"submit_num":"50395",
	"show_id":"408",
	"leetcode_id":"408",
	"answers":[
		{
			"lc_ans_id":"89523",
			"view":"6762",
			"top":"0",
			"title":"Short and easy to understand Java Solution",
			"vote":"36",
			"content":"```\\n    public boolean validWordAbbreviation(String word, String abbr) {\\n        int i = 0, j = 0;\\n        while (i < word.length() && j < abbr.length()) {\\n            if (word.charAt(i) == abbr.charAt(j)) {\\n                ++i;++j;\\n                continue;\\n            }\\n            if (abbr.charAt(j) <= '0' || abbr.charAt(j) > '9') {\\n                return false;\\n            }\\n            int start = j;\\n            while (j < abbr.length() && abbr.charAt(j) >= '0' && abbr.charAt(j) <= '9') {\\n                ++j;\\n            }\\n            int num = Integer.valueOf(abbr.substring(start, j));\\n            i += num;\\n        }\\n        return i == word.length() && j == abbr.length();\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"89541",
			"view":"3882",
			"top":"1",
			"title":"Simple Regex One-liner (Java, Python)",
			"vote":"20",
			"content":"## Update\\n\\nMuch nicer, I just turn an abbreviation like `\"i12iz4n\"` into a regular expression like `\"i.{12}iz.{4}n\"`. Duh.\\n\\nJava:\\n\\n    public boolean validWordAbbreviation(String word, String abbr) {\\n        return word.matches(abbr.replaceAll(\"[1-9]\\\\\\\\d*\", \".{$0}\"));\\n    }\\n\\nPython:\\n\\n    def validWordAbbreviation(self, word, abbr):\\n        return bool(re.match(re.sub('([1-9]\\\\d*)', r'.{\\\\1}', abbr) + '$', word))\\n\\n<br>\\n\\n---\\n\\n## Obsolete original\\n\\n(This now gets a memory error, since the exploding testcase I suggested at the end has been added to the test suite.)\\n\\n\"Clean\":\\n\\n    def validWordAbbreviation(self, word, abbr):\\n        regex = re.sub('\\\\d+', lambda m: '.' * int(m.group()), abbr)\\n        return bool(re.match(regex + '$', word)) and not re.search('(^|\\\\D)0', abbr)\\n\\n\"Dirty\" (abusing how Python handles the `>` there):\\n\\n    def validWordAbbreviation(self, word, abbr):\\n        regex = re.sub('\\\\d+', lambda m: '.' * int(m.group()), abbr)\\n        return re.match(regex + '$', word) > re.search('(^|\\\\D)0', abbr)\\n\\nI turn each number into that many dots to get a regular expression. For example, when asked whether `\"3t2de\"` is a valid abbreviation for word `\"leetcode\"`, I turn `\"3t2de\"` into `\"...t..de\"` and check whether that regular expression matches `\"leetcode\"`, which it does. I also need to rule out the number `\"0\"` and leading zeros, which I do with another regular expression.\\n\\n@1337c0d3r I suggest adding test case `\"bignumberhahaha\", \"999999999\"`, as that gets me a fully deserved MemoryError :-)"
		},
		{
			"lc_ans_id":"89579",
			"view":"1511",
			"top":"2",
			"title":"Concise C++ Solution",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    bool validWordAbbreviation(string word, string abbr) {\\n        int i = 0, j = 0;\\n        while (i < word.size() && j < abbr.size()) {\\n            if (isdigit(abbr[j])) {\\n                if (abbr[j] == '0') return false;\\n                int val = 0;\\n                while (j < abbr.size() && isdigit(abbr[j])) \\n                    val = val * 10 + abbr[j++] - '0';\\n                i += val;\\n            }\\n            else if (word[i++] != abbr[j++]) return false;\\n        }\\n        return i == word.size() && j == abbr.size();\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"89514",
			"view":"1490",
			"top":"3",
			"title":"Java straightforward, easy understand solution.",
			"vote":"4",
			"content":"```\\npublic boolean validWordAbbreviation(String word, String abbr) {\\n        if(word == null || abbr == null) return false;\\n        int num = 0;\\n        int idx = 0;\\n        \\n        for(char c: abbr.toCharArray()){\\n            if(c == '0' && num == 0) return false;\\n            if(c >= '0' && c <= '9'){\\n                num = num*10 + (c-'0');\\n            }else{\\n                idx += num;\\n                if(idx >= word.length() || c != word.charAt(idx)) return false;\\n                num = 0;\\n                idx++;\\n            }\\n        }\\n        \\n        return idx+num == word.length() ? true : false;\\n    }\\n\\n```"
		},
		{
			"lc_ans_id":"89512",
			"view":"598",
			"top":"4",
			"title":"Short Python Solution - 42ms",
			"vote":"2",
			"content":"```\\nclass Solution(object):\\n    def validWordAbbreviation(self, word, abbr):\\n        \"\"\"\\n        :type word: str\\n        :type abbr: str\\n        :rtype: bool\\n        \"\"\"\\n        i, n = 0, ''\\n        for c in abbr:\\n            if c.isalpha():\\n                i += int('0'+n)\\n                if i >= len(word) or c != word[i]: return False\\n                i, n = i+1, ''\\n            else:\\n                if n == '' and c == '0': return False\\n                n += c\\n        return i+int('0'+n) == len(word)\\n```"
		},
		{
			"lc_ans_id":"89528",
			"view":"509",
			"top":"5",
			"title":"Cant pass test case \"a\",\"01\"",
			"vote":"2",
			"content":"public class Solution {\\n\\n    public boolean validWordAbbreviation(String word, String abbr) {\\n        int i=0,j=0,jump=0;\\n        while(i<word.length()&&j<abbr.length()){\\n            if(isNumeric(abbr.charAt(j))){\\n                int start=j++;\\n                while(j<abbr.length()&&isNumeric(abbr.charAt(j))) j++;\\n                jump=Integer.valueOf(abbr.substring(start,j));\\n                i+=jump;\\n            }else{\\n                if(word.charAt(i++)!=abbr.charAt(j++))  return false;\\n            }\\n        }\\n        return i==word.length()&&j==abbr.length();\\n    }\\n    private boolean isNumeric(char c){\\n        return c-'0'>=0&&c-'9'<=0;\\n    }\\n\\n}\\n\\nThis is my solution, but can't pass the test case \"a\",\"01\". Also, I don't understand why this test case should return false. Could any one clarify it? Thanks."
		},
		{
			"lc_ans_id":"89585",
			"view":"1292",
			"top":"6",
			"title":"Simple Java Solution",
			"vote":"2",
			"content":"```\\npublic boolean validWordAbbreviation(String word, String abbr) {\\n        int lengthOfWord = word.length();\\n        int count = 0;\\n        int index = 0;\\n        while(index<abbr.length()){\\n            int digit = 0;\\n            while(index<abbr.length() && Character.isDigit(abbr.charAt(index))){\\n                if(abbr.charAt(index)=='0' && digit==0) return false;\\n                else{\\n                    digit = digit*10 + Integer.parseInt(abbr.charAt(index)+\"\");\\n                    index++;  \\n                }\\n            }\\n            count+=digit;\\n            if(index<abbr.length() && Character.isLetter(abbr.charAt(index))){\\n                if(count>=word.length()) return false;\\n                if(abbr.charAt(index)!=word.charAt(count)) return false;\\n                else{\\n                    count++;\\n                    index++;\\n                }\\n            }\\n        }\\n        return lengthOfWord==count;\\n    }\\n```"
		},
		{
			"lc_ans_id":"89533",
			"view":"191",
			"top":"7",
			"title":"Amazing corner cases test, the reason I love Leetcode so much! ^ ^",
			"vote":"1",
			"content":"This problem labeled as EASY, and looks also very straightforward, but it took me 1 hour to get it AC'ed. I'm amazed at the variety and comprehensiveness of its 315 test cases.\\nHere's a list of 11 corner/good test cases. I'm sharing it here for others to enjoy this question. ^ ^\\nAlso viewable [here](https://github.com/fishercoder1534/Leetcode/blob/master/leetcode-algorithms/src/test/java/com/stevesun/ValidWordAbbreviationTest.java).\\n\\n```\\n@Test\\n    public void test1(){\\n        word = \"internationalization\";\\n        abbr = \"i12iz4n\";\\n        expected = true;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n\\n    }\\n\\n    @Test\\n    public void test2(){\\n        word = \"apple\";\\n        abbr = \"a2e\";\\n        expected = false;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n\\n    }\\n\\n    @Test\\n    public void test3(){\\n        word = \"internationalization\";\\n        abbr = \"i5a11o1\";\\n        expected = true;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n\\n    }\\n\\n    @Test\\n    public void test4(){\\n        word = \"hi\";\\n        abbr = \"1\";\\n        expected = false;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n    }\\n\\n    @Test\\n    public void test5(){\\n        word = \"a\";\\n        abbr = \"1\";\\n        expected = true;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n    }\\n\\n    @Test\\n    public void test6(){\\n        word = \"a\";\\n        abbr = \"2\";\\n        expected = false;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n    }\\n\\n    @Test\\n    public void test7(){\\n        word = \"hi\";\\n        abbr = \"1i\";\\n        expected = true;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n    }\\n\\n    @Test\\n    public void test8(){\\n        word = \"hi\";\\n        abbr = \"3\";\\n        expected = false;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n    }\\n\\n    @Test\\n    public void test9(){\\n        word = \"hi\";\\n        abbr = \"11\";\\n        expected = false;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n    }\\n\\n    @Test\\n    public void test10(){\\n        word = \"word\";\\n        abbr = \"1o1d\";\\n        expected = true;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n    }\\n\\n    @Test\\n    public void test11(){\\n        word = \"abbreviation\";\\n        abbr = \"a010n\";\\n        expected = false;\\n        actual = test.validWordAbbreviation(word, abbr);\\n        assertEquals(expected, actual);\\n    }\\n```"
		},
		{
			"lc_ans_id":"89538",
			"view":"139",
			"top":"8",
			"title":"Clean & readable Java solution, beats 90%",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public boolean validWordAbbreviation(String word, String abbr) {\\n        int count = 0;\\n        int number = 0;\\n        \\n        for (char c : abbr.toCharArray()) {\\n            if (c >= '0' && c <= '9') {\\n                if (number == 0 && c == '0') {\\n                    return false;\\n                }\\n                number = number * 10;\\n                number += (c - '0');\\n            } else {\\n                count += number;\\n                number = 0;\\n                if (count >= word.length() || word.charAt(count) != c) {\\n                    return false;\\n                }\\n                count ++;\\n            }\\n        }\\n        \\n        count += number;\\n        \\n        return count == word.length();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"89549",
			"view":"303",
			"top":"9",
			"title":"Two Pointers Python Solution",
			"vote":"1",
			"content":"    class Solution(object):\\n        def validWordAbbreviation(self, word, abbr):\\n            \"\"\"\\n            :type word: str\\n            :type abbr: str\\n            :rtype: bool\\n            \"\"\"\\n            i, j = 0, 0\\n            while i < len(abbr):\\n                if j >= len(word):\\n                    return False\\n                if not abbr[i].isdigit():\\n                    if abbr[i] != word[j]:\\n                        return False\\n                    i += 1\\n                    j += 1\\n                else:\\n                    if abbr[i] == '0':\\n                        return False\\n                    n = ''\\n                    while i < len(abbr) and abbr[i].isdigit():\\n                        n += abbr[i]\\n                        i += 1\\n                    j += int(n)\\n            return j == len(word)"
		}
	],
	"id":"408",
	"title":"Valid Word Abbreviation",
	"content":"<p>\r\nGiven a <b>non-empty</b> string <code>s</code> and an abbreviation <code>abbr</code>, return whether the string matches with the given abbreviation.\r\n</p>\r\n\r\n<p>A string such as <code>\"word\"</code> contains only the following valid abbreviations:</p>\r\n\r\n<pre>[\"word\", \"1ord\", \"w1rd\", \"wo1d\", \"wor1\", \"2rd\", \"w2d\", \"wo2\", \"1o1d\", \"1or1\", \"w1r1\", \"1o2\", \"2r1\", \"3d\", \"w3\", \"4\"]\r\n</pre>\r\n\r\n<p>Notice that only the above abbreviations are valid abbreviations of the string <code>\"word\"</code>. Any other string is not a valid abbreviation of <code>\"word\"</code>.</p>\r\n\r\n<p><b>Note:</b><br />\r\nAssume <code>s</code> contains only lowercase letters and <code>abbr</code> contains only lowercase letters and digits.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nGiven <b>s</b> = \"internationalization\", <b>abbr</b> = \"i12iz4n\":\r\n\r\nReturn true.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\nGiven <b>s</b> = \"apple\", <b>abbr</b> = \"a2e\":\r\n\r\nReturn false.\r\n</pre>\r\n</p>",
	"frequency":"16",
	"ac_num":"14264"
}