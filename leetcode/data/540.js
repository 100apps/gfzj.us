{
	"difficulty":"1",
	"submit_num":"95370",
	"show_id":"557",
	"leetcode_id":"557",
	"answers":[
		{
			"lc_ans_id":"101909",
			"view":"6853",
			"top":"0",
			"title":"1 line Ruby / Python",
			"vote":"19",
			"content":"**Ruby:**\\n\\nOnce again Ruby is really nice, it's super short and you can just write the steps from left to right. Split the string into words, reverse each word, then join them back together.\\n```\\ndef reverse_words(s)\\n  s.split.map(&:reverse).join(\" \")\\nend\\n```\\n\\n**Python:**\\n\\nHere I first reverse the order of the words and then reverse the entire string.\\n\\n    def reverseWords(self, s):\\n        return ' '.join(s.split()[::-1])[::-1]\\n\\nThat's a bit shorter than the more obvious one:\\n\\n    def reverseWords(self, s):\\n        return ' '.join(x[::-1] for x in s.split())\\n\\n**Ruby again:**\\n\\nThat double reversal in Ruby:\\n```\\ndef reverse_words(s)\\n  s.split.reverse.join(\" \").reverse\\nend\\n```\\n**Python again:**\\n\\nThe double reversal is not just shorter but also faster. Trying both versions as well as the optimized obvious solution (using a list comprehension instead of a generator expression), five attempts each:\\n```\\n>>> from timeit import timeit\\n>>> setup = 's = \"Let\\\\'s take LeetCode contest\"'\\n>>> statements = (\"' '.join(s.split()[::-1])[::-1]\",\\n\\t          \"' '.join(x[::-1] for x in s.split())\",\\n\\t          \"' '.join([x[::-1] for x in s.split()])\")\\n>>> for stmt in statements:\\n        print ' '.join('%.2f' % timeit(stmt, setup) for _ in range(5)), 'seconds for:', stmt\\n\\n0.79 0.78 0.80 0.82 0.79 seconds for: ' '.join(s.split()[::-1])[::-1]\\n2.10 2.14 2.08 2.06 2.13 seconds for: ' '.join(x[::-1] for x in s.split())\\n1.27 1.26 1.28 1.28 1.26 seconds for: ' '.join([x[::-1] for x in s.split()])\\n```\\nWith many more words, the double reversal's advantage gets even bigger:\\n```\\n>>> setup = 's = \"Let\\\\'s take LeetCode contest\" * 1000'\\n>>> for stmt in statements:\\n        print ' '.join('%.2f' % timeit(stmt, setup, number=1000) for _ in range(5)), 'seconds for:', stmt\\n\\n0.16 0.14 0.13 0.14 0.14 seconds for: ' '.join(s.split()[::-1])[::-1]\\n0.69 0.71 0.69 0.70 0.70 seconds for: ' '.join(x[::-1] for x in s.split())\\n0.63 0.68 0.63 0.64 0.64 seconds for: ' '.join([x[::-1] for x in s.split()])\\n```"
		},
		{
			"lc_ans_id":"101905",
			"view":"3801",
			"top":"1",
			"title":"short java code without explanation",
			"vote":"18",
			"content":"```\\n    public String reverseWords(String s) {\\n        String[] str = s.split(\" \");\\n        for (int i = 0; i < str.length; i++) str[i] = new StringBuilder(str[i]).reverse().toString();\\n        StringBuilder result = new StringBuilder();\\n        for (String st : str) result.append(st + \" \");\\n        return result.toString().trim();\\n    } \\n```"
		},
		{
			"lc_ans_id":"101906",
			"view":"13286",
			"top":"2",
			"title":"[C++] [Java] Clean Code",
			"vote":"13",
			"content":"**C++**\\n```\\nclass Solution {\\npublic:\\n    string reverseWords(string s) {\\n        for (int i = 0; i < s.length(); i++) {\\n            if (s[i] != ' ') {   // when i is a non-space\\n                int j = i;\\n                for (; j < s.length() && s[j] != ' '; j++) { } // move j to the next space\\n                reverse(s.begin() + i, s.begin() + j);\\n                i = j - 1;\\n            }\\n        }\\n        \\n        return s;\\n    }\\n};\\n```\\n**Java**\\n```\\npublic class Solution {\\n    public String reverseWords(String s) {\\n        char[] ca = s.toCharArray();\\n        for (int i = 0; i < ca.length; i++) {\\n            if (ca[i] != ' ') {   // when i is a non-space\\n                int j = i;\\n                while (j + 1 < ca.length && ca[j + 1] != ' ') { j++; } // move j to the end of the word\\n                reverse(ca, i, j);\\n                i = j;\\n            }\\n        }\\n        return new String(ca);\\n    }\\n\\n    private void reverse(char[] ca, int i, int j) {\\n        for (; i < j; i++, j--) {\\n            char tmp = ca[i];\\n            ca[i] = ca[j];\\n            ca[j] = tmp;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"101963",
			"view":"6383",
			"top":"3",
			"title":"Easiest Java Solution (9ms) - Similar to Reverse Words in a String II",
			"vote":"11",
			"content":"I just wanted to use the same logic as Reverse Words in a String II. \\n\\nStep 1. Convert the string to char[] array\\nStep 2. Whenever I encounter a space ' ' , I call the reverse function ( just to keep the code clean )\\nStep 3. Repeat till the end!\\n\\nHope this helps! Thanks for voting :)\\n\\n\\n    public String reverseWords(String s) \\n    {\\n        char[] s1 = s.toCharArray();\\n        int i = 0;\\n        for(int j = 0; j < s1.length; j++)\\n        {\\n            if(s1[j] == ' ')\\n            {\\n                reverse(s1, i, j - 1);\\n                i = j + 1;\\n            }\\n        }\\n        reverse(s1, i, s1.length - 1);\\n        return new String(s1);\\n    }\\n    \\n    public void reverse(char[] s, int l, int r)\\n    {\\n    \\twhile(l < r)\\n    \\t{\\n    \\t\\tchar temp = s[l];\\n    \\t\\ts[l] = s[r];\\n    \\t\\ts[r] = temp;\\n    \\t\\tl++; r--;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"102004",
			"view":"1403",
			"top":"4",
			"title":"C solution",
			"vote":"10",
			"content":"```\\nvoid reverse(int b, int e, char *s){\\n    while(b < e) {\\n        s[b] = s[b] ^ s[e];\\n        s[e] = s[b] ^ s[e];\\n        s[b] = s[b] ^ s[e];\\n        b++;\\n        e--;\\n    }\\n}\\n\\nchar* reverseWords(char* s) {\\n    int i, s_len = strlen(s), index = 0;\\n    \\n    for(i = 0; i <= s_len; i++) {\\n        if((s[i] == ' ') || (s[i] == '\\\\0')){\\n            reverse(index, i - 1, s);\\n            index = i + 1;\\n        }\\n    }\\n    return s;\\n}\\n```"
		},
		{
			"lc_ans_id":"102105",
			"view":"3034",
			"top":"5",
			"title":"C++ Solution",
			"vote":"9",
			"content":"```cpp\\nclass Solution {\\npublic:\\n    string reverseWords(string s) {\\n        size_t front = 0;\\n        for(int i = 0; i <= s.length(); ++i){\\n            if(i == s.length() || s[i] == ' '){\\n                reverse(&s[front], &s[i]);\\n                front = i + 1;\\n            }\\n        }\\n        \\n        return s;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"101997",
			"view":"3553",
			"top":"6",
			"title":"1 line Python",
			"vote":"5",
			"content":"Straightforward one.\\n```\\nclass Solution(object):\\n    def reverseWords(self, s):\\n        \"\"\"\\n        :type s: str\\n        :rtype: str\\n        \"\"\"\\n        return \" \".join(map(lambda x: x[::-1], s.split()))\\n```"
		},
		{
			"lc_ans_id":"101873",
			"view":"1329",
			"top":"7",
			"title":"Java Solution",
			"vote":"3",
			"content":"    public String reverseWords(String s) {\\n        String[] strs = s.split(\" \");\\n        StringBuffer sb = new StringBuffer();\\n        for(String str: strs){\\n            StringBuffer temp = new StringBuffer(str);\\n            sb.append(temp.reverse());\\n            sb.append(\" \");\\n        }\\n        sb.setLength(sb.length()-1);\\n        return sb.toString();\\n    }"
		},
		{
			"lc_ans_id":"101875",
			"view":"380",
			"top":"8",
			"title":"Easy Javascript solution",
			"vote":"2",
			"content":"```\\nvar reverseWords = function(s) {\\n    var str = s.split(\" \");\\n    for(let i = 0;i < str.length;i++){\\n        str[i] = str[i].split(\"\").reverse().join(\"\");\\n    }\\n    return str.join(\" \");\\n};\\n```"
		},
		{
			"lc_ans_id":"102091",
			"view":"366",
			"top":"9",
			"title":"C++ Solution With istringstream",
			"vote":"2",
			"content":"``` cpp\\nstring reverseWords(string s) {\\n\\tistringstream iss{s};\\n\\tauto iter = s.begin();\\n\\tfor (string word; iss >> word;) {\\n\\t\\titer = copy(word.rbegin(), word.rend(), iter);\\n\\t\\tif (iter != s.end())\\n\\t\\t\\t++iter;\\n\\t}\\n\\treturn s;\\n}\\n```"
		}
	],
	"id":"540",
	"title":"Reverse Words in a String III",
	"content":"<p>Given a string, you need to reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"Let's take LeetCode contest\"\r\n<b>Output:</b> \"s'teL ekat edoCteeL tsetnoc\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\nIn the string, each word is separated by single space and there will not be any extra space in the string.\r\n</p>",
	"frequency":"465",
	"ac_num":"57214"
}