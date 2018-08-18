{
	"difficulty":"1",
	"submit_num":"252991",
	"show_id":"345",
	"leetcode_id":"345",
	"answers":[
		{
			"lc_ans_id":"81225",
			"view":"30601",
			"top":"0",
			"title":"Java Standard Two Pointer Solution",
			"vote":"71",
			"content":"In the inner while loop, don't forget the condition \"start less than end\" while incrementing start  and decrementing end. This is my friend's google phone interview question. Cheers!\\n// update! May use a HashSet<Character> to reduce the look up time to O(1)\\n\\n    public class Solution {\\n    public String reverseVowels(String s) {\\n        if(s == null || s.length()==0) return s;\\n        String vowels = \"aeiouAEIOU\";\\n        char[] chars = s.toCharArray();\\n        int start = 0;\\n        int end = s.length()-1;\\n        while(start<end){\\n            \\n            while(start<end && !vowels.contains(chars[start]+\"\")){\\n                start++;\\n            }\\n            \\n            while(start<end && !vowels.contains(chars[end]+\"\")){\\n                end--;\\n            }\\n            \\n            char temp = chars[start];\\n            chars[start] = chars[end];\\n            chars[end] = temp;\\n            \\n            start++;\\n            end--;\\n        }\\n        return new String(chars);\\n    }\\n   }"
		},
		{
			"lc_ans_id":"81240",
			"view":"5392",
			"top":"1",
			"title":"Super clean C++ solution using find_first_of and find_last_of",
			"vote":"37",
			"content":"    class Solution {\\n    public:\\n        string reverseVowels(string s) {\\n            int i = 0, j = s.size() - 1;\\n            while (i < j) {\\n                i = s.find_first_of(\"aeiouAEIOU\", i);\\n                j = s.find_last_of(\"aeiouAEIOU\", j);\\n                if (i < j) {\\n                    swap(s[i++], s[j--]);\\n                }\\n            }\\n            return s;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81262",
			"view":"10380",
			"top":"2",
			"title":"1-2 lines Python/Ruby",
			"vote":"32",
			"content":"**Ruby**\\n\\n    def reverse_vowels(s)\\n      vowels = s.scan(/[aeiou]/i)\\n      s.gsub(/[aeiou]/i) { vowels.pop }\\n    end\\n\\n---\\n\\n**Python**\\n\\n    def reverseVowels(self, s):\\n        vowels = re.findall('(?i)[aeiou]', s)\\n        return re.sub('(?i)[aeiou]', lambda m: vowels.pop(), s)\\n\\n---\\n\\nIt's possible in one line, but I don't really like it:\\n\\n    def reverseVowels(self, s):\\n        return re.sub('(?i)[aeiou]', lambda m, v=re.findall('(?i)[aeiou]', s): v.pop(), s)\\n\\n---\\n\\nAnother version, finding replacement vowels on the fly instead of collecting all in advance:\\n\\n    def reverseVowels(self, s):\\n        vowels = (c for c in reversed(s) if c in 'aeiouAEIOU')\\n        return re.sub('(?i)[aeiou]', lambda m: next(vowels), s)"
		},
		{
			"lc_ans_id":"81221",
			"view":"6680",
			"top":"3",
			"title":"One pass Java Solution 13ms",
			"vote":"20",
			"content":"    public class Solution {\\n        public String reverseVowels(String s) {\\n            char[] list=s.toCharArray();\\n            Set<Character> set=new HashSet<>();\\n            set.add('a');\\n            set.add('e');\\n            set.add('i');\\n            set.add('o');\\n            set.add('u');\\n            set.add('A');\\n            set.add('E');\\n            set.add('I');\\n            set.add('O');\\n            set.add('U');\\n            for (int i=0, j=list.length-1; i<j; ) {\\n                if (!set.contains(list[i])) {\\n                    i++;\\n                    continue;\\n                }\\n                if (!set.contains(list[j])) {\\n                    j--;\\n                    continue;\\n                }\\n                char temp=list[i];\\n                list[i]=list[j];\\n                list[j]=temp;\\n                i++;\\n                j--;\\n            }\\n            return String.valueOf(list);\\n        }\\n    }\\nWe could also initilize the set like this:\\n```\\nSet<Character> vowels = new HashSet<>(Arrays.asList(new Character[]{'a','e','i','o','u','A','E','I','O','U'}));\\n```"
		},
		{
			"lc_ans_id":"81233",
			"view":"3537",
			"top":"4",
			"title":"Python 2 Pointers Solution",
			"vote":"16",
			"content":"    class Solution(object):\\n        def reverseVowels(self, s):\\n            vowels = set(list(\"aeiouAEIOU\"))\\n            s = list(s)\\n            ptr_1, ptr_2 = 0, len(s) - 1\\n            while ptr_1 < ptr_2:\\n                if s[ptr_1] in vowels and s[ptr_2] in vowels:\\n                    s[ptr_1], s[ptr_2] = s[ptr_2], s[ptr_1]\\n                    ptr_1 += 1\\n                    ptr_2 -= 1\\n                if s[ptr_1] not in vowels:\\n                    ptr_1 += 1\\n                if s[ptr_2] not in vowels:\\n                    ptr_2 -= 1\\n            return ''.join(s)\\n\\nThe idea is really simple. But I think my code is somewhat ugly in two ways:\\n\\n 1. Convert string to list then convert back \\n 2. Pointer processing is verbose.\\n\\nAny suggestion? Thanks."
		},
		{
			"lc_ans_id":"81261",
			"view":"4385",
			"top":"5",
			"title":"C++ easy understanding solution",
			"vote":"14",
			"content":"    class Solution {\\n    public:\\n        string reverseVowels(string s) {\\n            int dict[256] = {0};\\n            dict['a'] = 1, dict['A'] = 1;\\n            dict['e'] = 1, dict['E'] = 1;\\n            dict['i'] = 1, dict['I'] = 1;\\n            dict['o'] = 1, dict['O'] = 1;\\n            dict['u'] = 1, dict['U'] = 1;\\n            int start = 0, end = (int)s.size() - 1;\\n            while(start < end){\\n                while(start < end && dict[s[start]] == 0) start++;\\n                while(start < end && dict[s[end]] == 0) end--;\\n                swap(s[start],s[end]);\\n                start++;end--;\\n            }\\n            return s;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81435",
			"view":"2575",
			"top":"6",
			"title":"C++, 12ms, two pointers, easy to understand",
			"vote":"11",
			"content":"    class Solution {\\n    public:\\n        string reverseVowels(string s) {\\n            auto p1 = s.begin(), p2 = s.end() - 1;\\n            string vowels = \"aeiouAEIOU\";\\n            while(p1 < p2) {\\n                while((vowels.find(*p1) == string::npos) && (p1 < p2)) p1++;\\n                while((vowels.find(*p2) == string::npos) && (p1 < p2)) p2--;\\n                if(p1 < p2) swap(*p1, *p2);\\n                p1++;\\n                p2--;\\n            }\\n            return s;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"81409",
			"view":"1343",
			"top":"7",
			"title":"Simple Java Solution using StringBuilder",
			"vote":"8",
			"content":"    public class Solution {\\n    public String reverseVowels(String s) {\\n        StringBuilder sb = new StringBuilder();\\n        int j = s.length() - 1;\\n        for (int i = 0; i < s.length(); i++)\\n        {\\n            if (\"AEIOUaeiou\".indexOf(s.charAt(i)) != -1)\\n            {\\n                while (j >= 0 && \"AEIOUaeiou\".indexOf(s.charAt(j)) == -1)\\n                {\\n                    j--;\\n                }\\n                sb.append(s.charAt(j));\\n                j--;\\n            }\\n            else\\n                sb.append(s.charAt(i));\\n        }\\n        return sb.toString();\\n    }\\n}\\n\\n}"
		},
		{
			"lc_ans_id":"81355",
			"view":"1822",
			"top":"8",
			"title":"Beat 99.7% using python two pointers",
			"vote":"7",
			"content":"    class Solution(object):\\n        def reverseVowels(self, s):\\n            \"\"\"\\n            :type s: str\\n            :rtype: str\\n            \"\"\"\\n            vowels = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'}\\n            L = list(s)\\n            i = 0\\n            j = len(L) - 1\\n            while i < j:\\n                while i < j and L[i] not in vowels:\\n                    i += 1\\n                while j > i and L[j] not in vowels:\\n                    j -= 1\\n                L[i], L[j] = L[j], L[i] \\n                i += 1\\n                j -= 1\\n            return ''.join(L)"
		},
		{
			"lc_ans_id":"81377",
			"view":"1083",
			"top":"9",
			"title":"My 4ms solution in Java (beats 98.20%!!!!!)",
			"vote":"7",
			"content":"        public static boolean isVowel(char a){\\n    \\t    switch(a){\\n    \\t         case ('a') : return true;\\n    \\t         case ('e') : return true;\\n    \\t         case ('i') : return true;\\n    \\t         case ('o') : return true;\\n    \\t         case ('u') : return true;\\n    \\t         case ('A') : return true;\\n    \\t         case ('E') : return true;\\n    \\t         case ('I') : return true;\\n    \\t         case ('O') : return true;\\n    \\t         case ('U') : return true;\\n    \\t         default : return false;\\n    \\t    }\\n        }\\n    \\n        public static String reverseVowels(String s) {\\n    \\t     if (s.length()<2) return s;\\n    \\t\\n    \\t     char[] tab = s.toCharArray();\\n    \\t     int j = tab.length - 1;\\n    \\t     int i = 0;\\n    \\t\\n    \\t     while( i < j ) {\\n\\n    \\t\\tif (!isVowel(tab[i]))\\n    \\t\\t\\ti++;\\t\\n    \\t\\telse {\\n    \\t\\t\\twhile (j!=i && !isVowel(tab[j]))\\n    \\t\\t\\t\\tj--;\\n    \\t\\t\\t\\n    \\t\\t\\tchar temp = tab[i];\\n    \\t\\t\\ttab[i] = tab[j];\\n    \\t\\t\\ttab[j] = temp;\\n    \\t\\t\\ti++;\\n    \\t\\t\\tj--;\\n    \\t\\t}\\n    \\t}\\n    \\treturn new String(tab);\\n    }"
		}
	],
	"id":"345",
	"title":"Reverse Vowels of a String",
	"content":"<p>Write a function that takes a string as input and reverse only the vowels of a string.</p>\r\n\r\n<p>\r\n<b>Example 1:</b><br />\r\nGiven s = \"hello\", return \"holle\".\r\n</p>\r\n\r\n<p>\r\n<b>Example 2:</b><br />\r\nGiven s = \"leetcode\", return \"leotcede\".\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nThe vowels does not include the letter \"y\".\r\n</p>",
	"frequency":"460",
	"ac_num":"98555"
}