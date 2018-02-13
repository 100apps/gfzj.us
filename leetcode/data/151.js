{
	"difficulty":"2",
	"submit_num":"1178107",
	"show_id":"151",
	"leetcode_id":"151",
	"answers":[
		{
			"lc_ans_id":"47740",
			"view":"41539",
			"top":"0",
			"title":"In place simple solution",
			"vote":"97",
			"content":"First, reverse the whole string, then reverse each word.\\n\\n    void reverseWords(string &s) {\\n        reverse(s.begin(), s.end());\\n        int storeIndex = 0;\\n        for (int i = 0; i < s.size(); i++) {\\n            if (s[i] != ' ') {\\n                if (storeIndex != 0) s[storeIndex++] = ' ';\\n                int j = i;\\n                while (j < s.size() && s[j] != ' ') { s[storeIndex++] = s[j++]; }\\n                reverse(s.begin() + storeIndex - (j - i), s.begin() + storeIndex);\\n                i = j;\\n            }\\n        }\\n        s.erase(s.begin() + storeIndex, s.end());\\n    }"
		},
		{
			"lc_ans_id":"47720",
			"view":"22689",
			"top":"1",
			"title":"Clean Java two-pointers solution (no trim( ), no split( ), no StringBuilder)",
			"vote":"94",
			"content":"    public class Solution {\\n      \\n      public String reverseWords(String s) {\\n        if (s == null) return null;\\n        \\n        char[] a = s.toCharArray();\\n        int n = a.length;\\n        \\n        // step 1. reverse the whole string\\n        reverse(a, 0, n - 1);\\n        // step 2. reverse each word\\n        reverseWords(a, n);\\n        // step 3. clean up spaces\\n        return cleanSpaces(a, n);\\n      }\\n      \\n      void reverseWords(char[] a, int n) {\\n        int i = 0, j = 0;\\n          \\n        while (i < n) {\\n          while (i < j || i < n && a[i] == ' ') i++; // skip spaces\\n          while (j < i || j < n && a[j] != ' ') j++; // skip non spaces\\n          reverse(a, i, j - 1);                      // reverse the word\\n        }\\n      }\\n      \\n      // trim leading, trailing and multiple spaces\\n      String cleanSpaces(char[] a, int n) {\\n        int i = 0, j = 0;\\n          \\n        while (j < n) {\\n          while (j < n && a[j] == ' ') j++;             // skip spaces\\n          while (j < n && a[j] != ' ') a[i++] = a[j++]; // keep non spaces\\n          while (j < n && a[j] == ' ') j++;             // skip spaces\\n          if (j < n) a[i++] = ' ';                      // keep only one space\\n        }\\n      \\n        return new String(a).substring(0, i);\\n      }\\n      \\n      // reverse a[] from a[i] to a[j]\\n      private void reverse(char[] a, int i, int j) {\\n        while (i < j) {\\n          char t = a[i];\\n          a[i++] = a[j];\\n          a[j--] = t;\\n        }\\n      }\\n      \\n    }"
		},
		{
			"lc_ans_id":"47706",
			"view":"32939",
			"top":"2",
			"title":"My accepted Java solution",
			"vote":"75",
			"content":"    String[] parts = s.trim().split(\"\\\\\\\\s+\");\\n    String out = \"\";\\n    for (int i = parts.length - 1; i > 0; i--) {\\n        out += parts[i] + \" \";\\n    }\\n    return out + parts[0];\\n\\nI'm splitting on the regex for one-or-more whitespace, this takes care of multiple spaces/tabs/newlines/etc in the input. Since the input could have leading/trailing whitespace, which would result in empty matches, I first trim the input string.\\n\\nNow there could be three possibilities:\\n\\n 1. The input is empty: \"\", parts will contain [\"\"]. The for loop is skipped and \"\" + \"\" is returned.\\n 2. The input contains only one part: \"a\", parts will contain [\"a\"]. The for loop is skipped and \"\" + \"a\" is returned.\\n 3. The input contains multiple parts: \"a b c\", reverse the order of all but the first part: \"c b \" in the for loop and return \"c b \" + \"a\".\\n\\nObviously this is not the fastest or most memory efficient way to solve the problem, but optimizations should *only* be done when they are needed. Readable code is usually more important than efficient code.\\n\\nHow to make it efficient?\\n\\n 1. Use a StringBuilder to concatenate the string parts, instead of concatenating strings directly. This will (I assume) build something like a linked-list of string parts, and only allocate the new string when you need it, instead of on each concatenation.\\n 2. Iterate over the string, instead of using trim/split. Store the index of the last character in the word, when you find the first character, copy the substring to the output string.\\n 3. Instead of using substring, insert the word-characters directly in the StringBuilder. Assuming they're using a linked-list or tree, this could be a whole last faster."
		},
		{
			"lc_ans_id":"47840",
			"view":"19151",
			"top":"3",
			"title":"C++ solution, in place: runtime O(n), memory O(1)",
			"vote":"52",
			"content":"The idea is to ignore the extra spaces, reverse words one by one and reverse the whole string in the end.\\nI think for the interview it is good to show that substr or istringstream can be used too.\\n[The idea is taken from here][1]\\n\\n    class Solution {\\n    public:\\n    \\n        // function to reverse any part of string from i to j (just one word or entire string)\\n        void reverseword(string &s, int i, int j){\\n            while(i<j){\\n              char t=s[i];\\n              s[i++]=s[j];\\n              s[j--]=t;\\n            } \\n        }\\n        \\n        void reverseWords(string &s) {\\n            \\n            int i=0, j=0;\\n            int l=0;\\n            int len=s.length();\\n            int wordcount=0;\\n            \\n            while(true){\\n                while(i<len && s[i] == ' ') i++;  // skip spaces in front of the word\\n                if(i==len) break;\\n                if(wordcount) s[j++]=' ';\\n                l=j;\\n                while(i<len && s[i] != ' ') {s[j]=s[i]; j++; i++;} \\n                reverseword(s,l,j-1);                // reverse word in place\\n                wordcount++;\\n                \\n            }\\n            \\n            s.resize(j);                           // resize result string\\n            reverseword(s,0,j-1);                  // reverse whole string\\n        }\\n    };\\n\\n\\n  [1]: http://www.ardendertat.com/2011/10/31/programming-interview-questions-12-reverse-words-in-a-string/"
		},
		{
			"lc_ans_id":"47781",
			"view":"12528",
			"top":"4",
			"title":"Java 3-line builtin solution",
			"vote":"47",
			"content":"    public String reverseWords(String s) {\\n        String[] words = s.trim().split(\" +\");\\n        Collections.reverse(Arrays.asList(words));\\n        return String.join(\" \", words);\\n    }"
		},
		{
			"lc_ans_id":"47770",
			"view":"1946",
			"top":"5",
			"title":"Why when input is \" \", expected is \"\"?",
			"vote":"35",
			"content":"I got \"Wrong answer\" as:\\nInput:\\t\" \"\\nOutput:\\t\" \"\\nExpected:\\t\"\"\\n\\nI think for input \" \", the output is supposed to be \" \" when reversing the string, am I missing something here?"
		},
		{
			"lc_ans_id":"47777",
			"view":"6094",
			"top":"6",
			"title":"5 lines C++ using <stringstream>",
			"vote":"29",
			"content":"    void reverseWords(string &s) {\\n        istringstream is(s);\\n        string tmp;\\n        is >> s;\\n        while(is >> tmp) s = tmp + \" \" + s;\\n        if(s[0] == ' ') s = \"\";\\n    }"
		},
		{
			"lc_ans_id":"47915",
			"view":"9070",
			"top":"7",
			"title":"Accepted simple cpp code in just a few lines",
			"vote":"29",
			"content":"    class Solution {\\n    public:\\n        void reverseWords(string &s) {\\n            string result;\\n            int pos = 0;\\n            for (int i = 0; i < s.size(); i ++){\\n                if (s[i] == ' '){\\n                    if (i > pos )\\n                        result = s.substr(pos,i-pos)+ \" \" + result ;\\n                    pos = i + 1;\\n                }\\n                else if (i == s.size()-1)\\n                    result = s.substr(pos,s.size()-pos)+\" \"+result;\\n            }\\n            s = result.substr(0,result.size()-1) ;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"47726",
			"view":"4851",
			"top":"8",
			"title":"My Accept Answer of Python with one line",
			"vote":"20",
			"content":"My Python code using the function of array and string. Both time and memory is O(n).\\n\\n    class Solution:\\n    # @param s, a string\\n    # @return a string\\n    def reverseWords(self, s):\\n        return \" \".join(s.strip().split()[::-1])"
		},
		{
			"lc_ans_id":"47821",
			"view":"25628",
			"top":"9",
			"title":"Is my solution good enough?",
			"vote":"16",
			"content":"Following is my accepted solution. However I found it quite long and not concise. Can someone help me improving my code?\\n\\n    void reverseStr(string &s, int start, int end)\\n        {\\n            int i = start;\\n            int j = end;\\n            while(i<j)\\n            {\\n                swap(s[i],s[j]);\\n                i++;\\n                j--;\\n            }\\n        }\\n        void reverseStr(string &s)\\n        {\\n            reverseStr(s, 0, s.size()-1);\\n        }\\n        void reverseWords(string &s) {\\n            //reverse entire\\n            reverseStr(s);\\n            //reverse each word\\n            int start = 0;\\n            int end = 0;\\n            int i = 0;\\n            //remove leading space\\n            while(s.size() >0 && s[0] == ' ')\\n            {\\n                s.erase(0,1);\\n            }\\n            //add one space to the end so that it is easy to read word\\n            s += ' ';\\n            for(int i = 0; i < s.size(); ++i)\\n            {\\n                if(s[i] != ' ')\\n                    end++;\\n                //remove multiple space\\n                while(s[i] == ' ' && i < s.size()-1 && s[i+1] == ' ')\\n                {\\n                    s.erase(i,1);\\n                }\\n                //reverse word\\n                if(s[i] == ' ')\\n                {\\n                    if(end>start)\\n                    {\\n                        reverseStr(s, start, end-1);\\n                        start = end + 1;\\n                        end = start;\\n                    }\\n                }\\n            }\\n            //remove last ' '\\n            s.erase(s.size()-1, 1);\\n            \\n            \\n        }"
		}
	],
	"id":"151",
	"title":"Reverse Words in a String",
	"content":"<p>\r\nGiven an input string, reverse the string word by word.\r\n</p>\r\n\r\n<p>\r\nFor example,<br>\r\nGiven s = \"<code>the sky is blue</code>\",<br>\r\nreturn \"<code>blue is sky the</code>\".\r\n</p>\r\n\r\n<p>\r\n<b><font color=\"red\">Update (2015-02-12):</font></b><br>\r\nFor C programmers: Try to solve it <i>in-place</i> in <i>O</i>(1) space.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">click to show clarification.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Clarification:</b>\r\n\r\n<p>\r\n<ul>\r\n<li>What constitutes a word?<br>\r\nA sequence of non-space characters constitutes a word.</li>\r\n<li>Could the input string contain leading or trailing spaces?<br>\r\nYes. However, your reversed string should not contain leading or trailing spaces.</li>\r\n<li>How about multiple spaces between two words?<br>\r\nReduce them to a single space in the reversed string.</li>\r\n</ul>\r\n</p>\r\n</div>",
	"frequency":"584",
	"ac_num":"184818"
}