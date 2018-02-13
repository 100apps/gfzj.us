{
	"difficulty":"1",
	"submit_num":"429767",
	"show_id":"13",
	"leetcode_id":"13",
	"answers":[
		{
			"lc_ans_id":"6529",
			"view":"70356",
			"top":"0",
			"title":"My solution for this question but I don't know is there any easier way?",
			"vote":"120",
			"content":"count every Symbol and add its value to the sum, and minus the extra part of special cases. \\n\\n    public int romanToInt(String s) {\\n         int sum=0;\\n        if(s.indexOf(\"IV\")!=-1){sum-=2;}\\n        if(s.indexOf(\"IX\")!=-1){sum-=2;}\\n        if(s.indexOf(\"XL\")!=-1){sum-=20;}\\n        if(s.indexOf(\"XC\")!=-1){sum-=20;}\\n        if(s.indexOf(\"CD\")!=-1){sum-=200;}\\n        if(s.indexOf(\"CM\")!=-1){sum-=200;}\\n        \\n        char c[]=s.toCharArray();\\n        int count=0;\\n        \\n       for(;count<=s.length()-1;count++){\\n           if(c[count]=='M') sum+=1000;\\n           if(c[count]=='D') sum+=500;\\n           if(c[count]=='C') sum+=100;\\n           if(c[count]=='L') sum+=50;\\n           if(c[count]=='X') sum+=10;\\n           if(c[count]=='V') sum+=5;\\n           if(c[count]=='I') sum+=1;\\n           \\n       }\\n       \\n       return sum;\\n        \\n    }"
		},
		{
			"lc_ans_id":"6547",
			"view":"29446",
			"top":"1",
			"title":"Clean O(n) c++ solution",
			"vote":"83",
			"content":"Problem is simpler to solve by working the string from back to front and using a map.  Runtime speed is 88 ms.\\n\\n\\n\\n    int romanToInt(string s) \\n    {\\n        unordered_map<char, int> T = { { 'I' , 1 },\\n                                       { 'V' , 5 },\\n                                       { 'X' , 10 },\\n                                       { 'L' , 50 },\\n                                       { 'C' , 100 },\\n                                       { 'D' , 500 },\\n                                       { 'M' , 1000 } };\\n                                       \\n       int sum = T[s.back()];\\n       for (int i = s.length() - 2; i >= 0; --i) \\n       {\\n           if (T[s[i]] < T[s[i + 1]])\\n           {\\n               sum -= T[s[i]];\\n           }\\n           else\\n           {\\n               sum += T[s[i]];\\n           }\\n       }\\n       \\n       return sum;\\n    }"
		},
		{
			"lc_ans_id":"6524",
			"view":"12536",
			"top":"2",
			"title":"I strongly suggest leetcode explains the conversion rule clearer.",
			"vote":"73",
			"content":"It would help a lot for those who are not familiar with Roman numerals if the conversion rule is provided, or a conversion table similar to [Roman Numerals Chart][1] is given.\\n\\n\\n  [1]: http://literacy.kent.edu/Minigrants/Cinci/romanchart.htm"
		},
		{
			"lc_ans_id":"6537",
			"view":"17564",
			"top":"3",
			"title":"My Straightforward Python Solution",
			"vote":"70",
			"content":"\\n    class Solution:\\n    # @param {string} s\\n    # @return {integer}\\n    def romanToInt(self, s):\\n        roman = {'M': 1000,'D': 500 ,'C': 100,'L': 50,'X': 10,'V': 5,'I': 1}\\n        z = 0\\n        for i in range(0, len(s) - 1):\\n            if roman[s[i]] < roman[s[i+1]]:\\n                z -= roman[s[i]]\\n            else:\\n                z += roman[s[i]]\\n        return z + roman[s[-1]]\\n\\n\\n*Note: The trick is that the last letter is always added. Except the last one, if one letter is less than its latter one, this letter is subtracted."
		},
		{
			"lc_ans_id":"6509",
			"view":"27259",
			"top":"4",
			"title":"7ms solution in Java. easy to understand",
			"vote":"59",
			"content":"     public int romanToInt(String s) {\\n        int nums[]=new int[s.length()];\\n        for(int i=0;i<s.length();i++){\\n            switch (s.charAt(i)){\\n                case 'M':\\n                    nums[i]=1000;\\n                    break;\\n                case 'D':\\n                    nums[i]=500;\\n                    break;\\n                case 'C':\\n                    nums[i]=100;\\n                    break;\\n                case 'L':\\n                    nums[i]=50;\\n                    break;\\n                case 'X' :\\n                    nums[i]=10;\\n                    break;\\n                case 'V':\\n                    nums[i]=5;\\n                    break;\\n                case 'I':\\n                    nums[i]=1;\\n                    break;\\n            }\\n        }\\n        int sum=0;\\n        for(int i=0;i<nums.length-1;i++){\\n            if(nums[i]<nums[i+1])\\n                sum-=nums[i];\\n            else\\n                sum+=nums[i];\\n        }\\n        return sum+nums[nums.length-1];\\n    }"
		},
		{
			"lc_ans_id":"6811",
			"view":"3821",
			"top":"5",
			"title":"My easy-to-understand C++ solutions",
			"vote":"26",
			"content":"       class Solution {\\n        public:\\n            int romanToInt(string s) {\\n                int num = 0;\\n                int size = s.size();\\n                \\n                for (int i = 0; i < size; i++) {\\n                \\tif (i < (size - 1) && romanCharToInt(s[i]) < romanCharToInt(s[i + 1])) {\\n                \\t\\tnum -= romanCharToInt(s[i]);\\n                \\t} else {\\n        \\t\\t\\t\\tnum += romanCharToInt(s[i]);\\n        \\t\\t\\t}\\n                }\\n                return num;\\n            }\\n            \\n            int romanCharToInt(char c) {\\n            \\tswitch (c) {\\n            \\t\\tcase 'I': \\treturn 1;\\n            \\t\\tcase 'V':\\treturn 5;\\n            \\t\\tcase 'X':\\treturn 10;\\n            \\t\\tcase 'L':\\treturn 50;\\n            \\t\\tcase 'C':\\treturn 100;\\n            \\t\\tcase 'D':\\treturn 500;\\n            \\t\\tcase 'M':\\treturn 1000;\\n            \\t\\tdefault:\\treturn 0;\\n            \\t}\\n            }\\n        };\\n\\n[The code is faster][1] if the body of the for loop is replaced with:\\n\\n    \\tif (i < (size - 1) && (\\n    \\t\\t'I' == s[i] && ('V' == s[i + 1] || 'X' == s[i + 1]) ||\\n    \\t\\t'X' == s[i] && ('L' == s[i + 1] || 'C' == s[i + 1]) ||\\n    \\t\\t'C' == s[i] && ('D' == s[i + 1] || 'M' == s[i + 1]) )) {\\n    \\t\\tnum -= romanCharToInt(s[i]);\\n    \\t} else {\\n\\t\\t\\tnum += romanCharToInt(s[i]);\\n\\t\\t}\\n\\n \\n\\n\\n  [1]: http://xiaohuiliucuriosity.blogspot.com/2014/12/problem-given-roman-numeral-convert-it.html"
		},
		{
			"lc_ans_id":"6542",
			"view":"3622",
			"top":"6",
			"title":"4 lines in Python",
			"vote":"25",
			"content":"    d = {'M':1000, 'D':500, 'C':100, 'L':50, 'X':10, 'V':5, 'I':1}\\n    \\n    def romanToInt(self, s):\\n        res, p = 0, 'I'\\n        for c in s[::-1]:\\n            res, p = res - d[c] if d[c] < d[p] else res + d[c], c\\n        return res"
		},
		{
			"lc_ans_id":"6520",
			"view":"3380",
			"top":"7",
			"title":"JAVA----------------Easy Version To Understand!!!!",
			"vote":"20",
			"content":"    \\tpublic static int romanToInt(String s) {\\n\\t\\tif (s == null || s.length() == 0)\\n\\t\\t\\treturn -1;\\n\\t\\tHashMap<Character, Integer> map = new HashMap<Character, Integer>();\\n\\t\\tmap.put('I', 1);\\n\\t\\tmap.put('V', 5);\\n\\t\\tmap.put('X', 10);\\n\\t\\tmap.put('L', 50);\\n\\t\\tmap.put('C', 100);\\n\\t\\tmap.put('D', 500);\\n\\t\\tmap.put('M', 1000);\\n\\t\\tint len = s.length(), result = map.get(s.charAt(len - 1));\\n\\t\\tfor (int i = len - 2; i >= 0; i--) {\\n\\t\\t\\tif (map.get(s.charAt(i)) >= map.get(s.charAt(i + 1)))\\n\\t\\t\\t\\tresult += map.get(s.charAt(i));\\n\\t\\t\\telse\\n\\t\\t\\t\\tresult -= map.get(s.charAt(i));\\n\\t\\t}\\n\\t\\treturn result;\\n\\t}"
		},
		{
			"lc_ans_id":"6851",
			"view":"1812",
			"top":"8",
			"title":"Simple 56ms C++ solution",
			"vote":"12",
			"content":"Processing the roman number from right to left turns out to be a bit easier since we can easily tell when to add or subtract:\\n\\n    class Solution {\\n    public:\\n        int romanToInt(string s) {\\n            if (s.empty()) { return 0; }\\n            unordered_map<char, int> mp { {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000} };\\n            int sum = mp[s.back()];\\n            for (int i = s.size() - 2; i >= 0; --i) {\\n                sum += mp[s[i]] >= mp[s[i + 1]] ? mp[s[i]] : -mp[s[i]];\\n            }\\n            return sum;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"6862",
			"view":"1918",
			"top":"9",
			"title":"Python solution",
			"vote":"12",
			"content":"        def romanToInt(self, s):\\n\\n            romans = {'M': 1000, 'D': 500 , 'C': 100, 'L': 50, 'X': 10,'V': 5,'I': 1}\\n\\n            prev_value = running_total =0\\n            \\n            for i in range(len(s)-1, -1, -1):\\n                int_val = romans[s[i]]\\n                if int_val < prev_value:\\n                    running_total -= int_val\\n                else:\\n                    running_total += int_val\\n                prev_value = int_val\\n            \\n            return running_total"
		}
	],
	"id":"13",
	"title":"Roman to Integer",
	"content":"<p>Given a roman numeral, convert it to an integer.</p>\r\n\r\n<p>Input is guaranteed to be within the range from 1 to 3999.</p>",
	"frequency":"628",
	"ac_num":"203751"
}