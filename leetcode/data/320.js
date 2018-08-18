{
	"difficulty":"2",
	"submit_num":"59004",
	"show_id":"320",
	"leetcode_id":"320",
	"answers":[
		{
			"lc_ans_id":"77190",
			"view":"16384",
			"top":"0",
			"title":"Java backtracking solution",
			"vote":"175",
			"content":"The idea is: for every character, we can keep it or abbreviate it. To keep it, we add it to the current solution and carry on backtracking. To abbreviate it, we omit it in the current solution, but increment the count, which indicates how many characters have we abbreviated. When we reach the end or need to put a character in the current solution, and count is bigger than zero, we add the number into the solution.\\n\\n\\n\\n      public List<String> generateAbbreviations(String word){\\n            List<String> ret = new ArrayList<String>();\\n            backtrack(ret, word, 0, \"\", 0);\\n    \\n            return ret;\\n        }\\n    \\n        private void backtrack(List<String> ret, String word, int pos, String cur, int count){\\n            if(pos==word.length()){\\n                if(count > 0) cur += count;\\n                ret.add(cur);\\n            }\\n            else{\\n                backtrack(ret, word, pos + 1, cur, count + 1);\\n                backtrack(ret, word, pos+1, cur + (count>0 ? count : \"\") + word.charAt(pos), 0);\\n            }\\n        }"
		},
		{
			"lc_ans_id":"77218",
			"view":"8696",
			"top":"1",
			"title":"Java 14ms beats 100%",
			"vote":"60",
			"content":"For each char `c[i]`, either abbreviate it or not.\\n\\n 1. Abbreviate: count accumulate `num` of abbreviating chars, but don't append it yet. \\n 2. Not Abbreviate: append accumulated `num` as well as current char `c[i]`.\\n 3. In the end append remaining `num`.\\n 4. Using `StringBuilder` can decrease `36.4%` time. \\n\\nThis comes to the pattern I find powerful:\\n\\n    int len = sb.length(); // decision point\\n    ... backtracking logic ...\\n    sb.setLength(len);     // reset to decision point\\n\\nSimilarly, check out [remove parentheses][1] and [add operators][2].\\n\\n<hr>\\n\\n    public List<String> generateAbbreviations(String word) {\\n        List<String> res = new ArrayList<>();\\n        DFS(res, new StringBuilder(), word.toCharArray(), 0, 0);\\n        return res;\\n    }\\n    \\n    public void DFS(List<String> res, StringBuilder sb, char[] c, int i, int num) {\\n        int len = sb.length();  \\n        if(i == c.length) {\\n            if(num != 0) sb.append(num);\\n            res.add(sb.toString());\\n        } else {\\n            DFS(res, sb, c, i + 1, num + 1);               // abbr c[i]\\n\\n            if(num != 0) sb.append(num);                   // not abbr c[i]\\n            DFS(res, sb.append(c[i]), c, i + 1, 0);        \\n        }\\n        sb.setLength(len); \\n    }\\n\\n\\n  [1]: https://leetcode.com/discuss/72208/easiest-9ms-java-solution\\n  [2]: https://leetcode.com/discuss/75308/java-simple-and-fast-solution-beats-96-56%25"
		},
		{
			"lc_ans_id":"77179",
			"view":"5693",
			"top":"2",
			"title":"9 line easy JAVA solution",
			"vote":"41",
			"content":"\\n\\n    public class Solution {\\n        public List<String> generateAbbreviations(String word) {\\n            List<String> res = new ArrayList<String>();\\n            int len = word.length();\\n            res.add(len==0 ? \"\" : String.valueOf(len));\\n            for(int i = 0 ; i < len ; i++)\\n                for(String right : generateAbbreviations(word.substring(i+1))){\\n                    String leftNum = i > 0 ? String.valueOf(i) : \"\";\\n                    res.add( leftNum + word.substring(i,i + 1) + right );\\n                }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77280",
			"view":"2481",
			"top":"3",
			"title":"My backtracking C++ solution",
			"vote":"27",
			"content":"    class Solution {\\n    public:\\n        vector<string> generateAbbreviations(string word) {\\n            vector<string> result;\\n            generateAbbreviationsHelper(word, \"\", 0, result, false);\\n            return result;\\n        }\\n        \\n        void generateAbbreviationsHelper(string& word, string abbr, int i, vector<string>& result, bool prevNum) {\\n            if (i == word.length()) {\\n                result.push_back(abbr);\\n                return;\\n            }\\n            \\n            generateAbbreviationsHelper(word, abbr+word[i], i+1, result, false);\\n            if (!prevNum) {\\n                // Add number abbreviations only when we added a character instead of an abbreviation earlier\\n                for (int len = 1; i+len <= word.length(); ++len) {\\n                    generateAbbreviationsHelper(word, abbr+to_string(len), i+len, result, true);\\n                }\\n            }\\n        }\\n    };"
		},
		{
			"lc_ans_id":"77183",
			"view":"5968",
			"top":"4",
			"title":"Meet in Google Interview Solution with concise explanation.",
			"vote":"18",
			"content":"I meet this problem in Google Interview. However, I didn't solve it at that time because I was totally out of mind when I meet with this problem. The interviewer didn't say much about the output and he first ask me how many abbreviation are there with a given word length of n. It took me a long time to guess it was 2^n.\\nThe following solution is what based on the idea that each position has the chance to be abbreviated to 1 or not with a recursion function call. It is quite similar to the question of SubsetsII.\\n\\n    public class Solution {\\n        public List<String> generateAbbreviations(String word) {\\n            List<String> res = new LinkedList<>();\\n            recurse(res, word, 0);\\n            return res;\\n        }\\n        private void recurse(List<String> res, String word, int pos){\\n            if(pos==word.length()){ \\n            \\tres.add(word);\\n            \\treturn;\\n            \\t}\\n            /* The current position does not abbreviate to 1 and call the recursion with the next position */\\n    \\n            recurse(res, word, pos+1);\\n            String nstring = word.substring(0,pos)+\"1\"+word.substring(pos+1);\\n    \\n          /* Abbreviate the current position and we have to check the position prior to this position.\\n           If the position prior to this position is a number, we have to combine them together. \\n          But there is still a little tricky to deal with the output because if the combined output is \\n          those 9, 99, 999, then the next position should be pos+1 with recursion call. If not,\\n         the next position should remain the same pos. */\\n    \\n            if(pos>0 && Character.isDigit(word.charAt(pos-1))){\\n                int count = 0;\\n\\n               /*count the prior characters which is digits and we should combine them with 1 */\\n\\n                while((pos-count-1)>=0 && Character.isDigit(word.charAt(pos-count-1))){\\n                    count++;\\n                }\\n                int num = Integer.parseInt(word.substring(pos-count, pos));\\n                num = num+1;\\n                String nnum = num+\"\";\\n                if(nnum.length()>count){\\n                    nstring = word.substring(0, pos-count)+nnum+word.substring(pos+1);\\n                    recurse(res, nstring, pos+1);\\n                }else{\\n                    nstring = word.substring(0, pos-count)+nnum+word.substring(pos+1);\\n                    recurse(res, nstring, pos);\\n                }\\n            }else{\\n                recurse(res, nstring, pos+1);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77193",
			"view":"1423",
			"top":"5",
			"title":"Simple Python Solution with Explanation",
			"vote":"17",
			"content":"    class Solution(object):\\n        def generateAbbreviations(self, word):\\n            \"\"\"\\n            :type word: str\\n            :rtype: List[str]\\n            \"\"\"\\n            def helper(word, pos, cur, count, result):\\n                if len(word) == pos:\\n                    # Once we reach the end, append current to the result\\n                    result.append(cur + str(count) if count > 0 else cur)\\n                else:\\n                    # Skip current position, and increment count\\n                    helper(word, pos + 1, cur, count + 1, result)\\n                    # Include current position, and zero-out count\\n                    helper(word, pos + 1, cur + (str(count) if count > 0 else '') + word[pos], 0, result)\\n    \\n            result = []\\n            helper(word, 0, '', 0, result)\\n            return result"
		},
		{
			"lc_ans_id":"77209",
			"view":"1622",
			"top":"6",
			"title":"O(m*n) bit manipulation java",
			"vote":"13",
			"content":"    public List<String> generateAbbreviations(String word) {\\n        List<String> ret = new ArrayList<>();\\n        int n = word.length();\\n        for(int mask = 0;mask < (1 << n);mask++) {\\n            int count = 0;\\n            StringBuffer sb = new StringBuffer();\\n            for(int i = 0;i <= n;i++) {\\n                if(((1 << i) & mask) > 0) {\\n                    count++;\\n                } else {\\n                    if(count != 0) {\\n                        sb.append(count);\\n                        count = 0;\\n                    }\\n                    if(i < n) sb.append(word.charAt(i));\\n                }\\n            }\\n            ret.add(sb.toString());\\n        }\\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"77270",
			"view":"666",
			"top":"7",
			"title":"Share Java backtracking and bit manipulation solution with explanation",
			"vote":"9",
			"content":"First solution is backtracking, idea is very simple and similar to subset2, replace 1 to word.length characters. Tricky part is when the replace length is larger then 9, the next recursion position need to add length / 10(10 is two character, 100 is three character  etc..).\\n\\n    public List<String> generateAbbreviations(String word) {\\n        List<String> result = new ArrayList<>();\\n        help(word, 0, result);\\n        return result;\\n    }\\n    \\n    public void help(String word, int pos, List<String> result) {\\n        result.add(word);\\n        if (pos >= word.length()) {\\n            return;\\n        }\\n        for (int i = pos; i < word.length(); i++) {\\n            for (int j = 1; j + i - 1 < word.length(); j++) {\\n                String abbr = word.substring(0, i) + j + word.substring(j + i);\\n                help(abbr, i + 2 + j / 10, result);\\n            }\\n        }\\n    }\\n\\n\\n\\nAnd the bit manipulation idea is base on some previous idea, I made a few improvement and will give some explanation.\\n\\nSince we know the size of result set will be always pow(2, word.length()), so all the possible Abbreviation String can be presented as an integer(consider it in binary). In my case, 0 means the letter will not be replaced and 1 means the letter will be replaced.\\n\\nTake \"word\" as example, word -> 0000,   1ord -> 1000,  wo2 -> 0011,  4 -> 1111 etc..\\n\\nAnd I use long so the word length can be longer(Although in OJ integer works, I believe no test case's word is longer than 32).\\n\\n    public List<String> generateAbbreviations(String word) {\\n        long size = 1 << word.length();\\n        List<String> result = new ArrayList<>();\\n        for (long i = 0; i < size; i++) {\\n            result.add(generateString(word, i));\\n        }\\n        return result;\\n    }\\n    \\n    public String generateString(String word, long number) {\\n        StringBuilder sb = new StringBuilder();\\n        int consecutiveOne = 0;\\n        for (int i = 0; i < word.length(); i++) {\\n            long bit = (number >> i) & 1;\\n            if (bit == 1) {\\n                consecutiveOne++;\\n            } else {\\n                if (consecutiveOne != 0) {\\n                    sb.append(consecutiveOne);\\n                    consecutiveOne = 0;\\n                }\\n                sb.append(word.charAt(i));\\n            }\\n        }\\n        if (consecutiveOne != 0) {\\n            sb.append(consecutiveOne);\\n        }\\n        return sb.toString();\\n    }\\n\\n\\nPlease let me know if there is any more improvement."
		},
		{
			"lc_ans_id":"77211",
			"view":"2064",
			"top":"8",
			"title":"Two easy straight forward methods in JAVA with exp: backtracking, Divide & Conquer",
			"vote":"9",
			"content":"Backtracking:\\n    \\n    public class Solution {\\n            public List<String> generateAbbreviations(String word) {\\n                List<String> res = new ArrayList<String>();\\n                helper(word, 0, \"\", res, false);\\n                return res;\\n            }\\n            // isAbbrPrev: false, we can add alphabet or abbreviation(number) next round\\n            // isAbbrPrev: true,  we can add alphabet ONLY next round\\n            public void helper(String word, int start, String cur, List<String> res, boolean isAbbrPrev) {\\n                if (start == word.length()) {\\n                    res.add(cur);\\n                    return;\\n                }\\n                if (isAbbrPrev == false) { // we can add abbreviation (num)\\n                    for(int end=start+1; end<=word.length(); end++) { // iterate all abbreviations from 'start'\\n                        helper(word, end, cur + Integer.toString(end-start), res, true);\\n                    }\\n                }\\n                helper(word, start+1, cur + word.charAt(start), res, false); // adding one word each time\\n            }\\n        }\\n\\n\\nD & C:\\n\\n    public class Solution {\\n        public List<String> generateAbbreviations(String word) {\\n            Set<String> s = helper(word);\\n            List<String> res = new ArrayList<String>(s);\\n            return res;\\n        }\\n    \\n        public Set<String> helper(String word) {\\n            int length = word.length();\\n            Set<String> res = new HashSet<String>();\\n            if (length == 0) {\\n                res.add(\"\");\\n                return res;\\n            }\\n            res.add(Integer.toString(length));\\n            for(int i=0; i<length; i++) {    // we separate String into two parts with word.charAt(i)\\n                Set<String> left = helper(word.substring(0,i));\\n                Set<String> right = helper(word.substring(i+1, length));\\n                for(String strLeft : left) {\\n                    for(String strRight : right) {\\n                        res.add(strLeft + word.charAt(i) + strRight);\\n                    }\\n                }\\n            }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"77225",
			"view":"1918",
			"top":"9",
			"title":"Python solutions",
			"vote":"9",
			"content":"**Solution 1**\\n\\nI use `product` to generate masked words like \"w##d\" and then use `sub` to turn them into the desired format like \"w2d\".\\n\\n    def generateAbbreviations(self, word):\\n        return [re.sub('#+', lambda m: str(len(m.group())), ''.join(masked))\\n                for masked in itertools.product(*(c+'#' for c in word))]\\n\\n---\\n\\n**Solution 2a**\\n\\nRecursive, `word[first:last+1]` is the first part that I replace with a number.\\n\\n    def generateAbbreviations(self, word):\\n        return [word] + [word[:first] + str(last - first + 1) + word[last+1:last+2] + rest\\n                         for last in range(len(word))\\n                         for first in range(last + 1)\\n                         for rest in self.generateAbbreviations(word[last+2:])]\\n\\n---\\n\\n**Solution 2b**\\n\\nSimilar to 2a, just a variation.\\n\\n    def generateAbbreviations(self, word):\\n        return [word] + [word[:begin] + str(end - begin) + word[end:end+1] + rest\\n                         for begin, end in itertools.combinations(range(len(word)+1), 2)\\n                         for rest in self.generateAbbreviations(word[end+1:])]"
		}
	],
	"id":"320",
	"title":"Generalized Abbreviation",
	"content":"<p>Write a function to generate the generalized abbreviations of a word.</p>\r\n\r\n<p>\r\n    <b>Example:</b><br/>\r\n</p>\r\n<p>Given word = <code>\"word\"</code>, return the following list (order does not matter):<br />\r\n<pre>[\"word\", \"1ord\", \"w1rd\", \"wo1d\", \"wor1\", \"2rd\", \"w2d\", \"wo2\", \"1o1d\", \"1or1\", \"w1r1\", \"1o2\", \"2r1\", \"3d\", \"w3\", \"4\"]\r\n</pre>\r\n</p>",
	"frequency":"246",
	"ac_num":"27164"
}