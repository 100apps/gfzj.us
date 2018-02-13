{
	"difficulty":"2",
	"submit_num":"461125",
	"show_id":"165",
	"leetcode_id":"165",
	"answers":[
		{
			"lc_ans_id":"50774",
			"view":"24296",
			"top":"0",
			"title":"Accepted small Java solution.",
			"vote":"146",
			"content":"This code assumes that next level is zero if no mo levels in shorter version number. And than compare levels.\\n\\n\\n    public int compareVersion(String version1, String version2) {\\n        String[] levels1 = version1.split(\"\\\\\\\\.\");\\n        String[] levels2 = version2.split(\"\\\\\\\\.\");\\n        \\n        int length = Math.max(levels1.length, levels2.length);\\n        for (int i=0; i<length; i++) {\\n        \\tInteger v1 = i < levels1.length ? Integer.parseInt(levels1[i]) : 0;\\n        \\tInteger v2 = i < levels2.length ? Integer.parseInt(levels2[i]) : 0;\\n        \\tint compare = v1.compareTo(v2);\\n        \\tif (compare != 0) {\\n        \\t\\treturn compare;\\n        \\t}\\n        }\\n        \\n        return 0;\\n    }"
		},
		{
			"lc_ans_id":"50767",
			"view":"10988",
			"top":"1",
			"title":"My 2ms easy solution with C/C++",
			"vote":"92",
			"content":"    int compareVersion(string version1, string version2) {\\n        int i = 0; \\n        int j = 0;\\n        int n1 = version1.size(); \\n        int n2 = version2.size();\\n        \\n        int num1 = 0;\\n        int num2 = 0;\\n        while(i<n1 || j<n2)\\n        {\\n            while(i<n1 && version1[i]!='.'){\\n                num1 = num1*10+(version1[i]-'0');\\n                i++;\\n            }\\n            \\n            while(j<n2 && version2[j]!='.'){\\n                num2 = num2*10+(version2[j]-'0');;\\n                j++;\\n            }\\n            \\n            if(num1>num2) return 1;\\n            else if(num1 < num2) return -1;\\n            \\n            num1 = 0;\\n            num2 = 0;\\n            i++;\\n            j++;\\n        }\\n        \\n        return 0;\\n    }"
		},
		{
			"lc_ans_id":"51044",
			"view":"4500",
			"top":"2",
			"title":"Cudos on who invent such a boring question",
			"vote":"63",
			"content":"Why would anyone have a version number of:\\n\"19.8.3.17.5.01.0.0.4.0.0.0.0.0.0.0.0.0.0.0.0.0.00.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.000000.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.000000\"\\n\\nThis guy must be bored to hell."
		},
		{
			"lc_ans_id":"50994",
			"view":"6190",
			"top":"3",
			"title":"Java solution with fewer if logic",
			"vote":"59",
			"content":"I checked other Java solution and the basic idea is the same. In addition, I simply the logic by making the two version number same length. For example, if version1 = \"1.0.2\", and version2 = \"1.0\", the I will convert the version2 to \"1.0.0\".\\n\\n>     public int compareVersion(String version1, String version2) {\\n>         \\n>         String[] v1 = version1.split(\"\\\\\\\\.\");\\n>         String[] v2 = version2.split(\"\\\\\\\\.\");\\n>         \\n>         for ( int i = 0; i < Math.max(v1.length, v2.length); i++ ) {\\n>             int num1 = i < v1.length ? Integer.parseInt( v1[i] ) : 0;\\n>             int num2 = i < v2.length ? Integer.parseInt( v2[i] ) : 0;\\n>             if ( num1 < num2 ) {\\n>                 return -1;\\n>             } else if ( num1 > num2 ) {\\n>                 return +1;\\n>             }\\n>         } \\n>         \\n>         return 0;\\n>     }"
		},
		{
			"lc_ans_id":"50788",
			"view":"4362",
			"top":"4",
			"title":"My JAVA solution without split",
			"vote":"51",
			"content":"    public class Solution {\\n    public int compareVersion(String version1, String version2) {\\n        int temp1 = 0,temp2 = 0;\\n        int len1 = version1.length(),len2 = version2.length();\\n        int i = 0,j = 0;\\n        while(i<len1 || j<len2) {\\n            temp1 = 0;\\n            temp2 = 0;\\n            while(i<len1 && version1.charAt(i) != '.') {\\n                temp1 = temp1*10 + version1.charAt(i++)-'0';\\n                \\n            }\\n            while(j<len2 && version2.charAt(j) != '.') {\\n                temp2 = temp2*10 + version2.charAt(j++)-'0';\\n                \\n            }\\n            if(temp1>temp2) return 1;\\n            else if(temp1<temp2) return -1;\\n            else {\\n                i++;\\n                j++;\\n                \\n            }\\n            \\n        }\\n        return 0;\\n        \\n    }\\n    \\n}"
		},
		{
			"lc_ans_id":"50804",
			"view":"2584",
			"top":"5",
			"title":"10 line concise solution. (C++)",
			"vote":"40",
			"content":"This is a concise solution using stringstream to format string into int.\\n \\n    int compareVersion(string version1, string version2) {\\n        for(auto& w : version1) if (w == '.') w=' ';\\n        for(auto& w : version2) if (w == '.') w=' ';\\n        istringstream s1(version1), s2(version2);\\n        while(1) {\\n            int n1,n2;\\n            if (not(s1 >> n1) ) n1 = 0;\\n            if (not(s2 >> n2) ) n2 = 0;\\n            if (not s1 and not s2) return 0;\\n            if (n1<n2) return -1;\\n            if (n1>n2) return 1;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"50959",
			"view":"3828",
			"top":"6",
			"title":"My solutions in 3 languages",
			"vote":"31",
			"content":"Java, >400ms:\\n\\n    public class Solution {\\n        public int compareVersion(String version1, String version2) {\\n            String[] v1 = version1.split(\"\\\\\\\\.\");\\n            String[] v2 = version2.split(\"\\\\\\\\.\");\\n            for (int i = 0; i < Math.max(v1.length, v2.length); i++) {\\n                int gap = (i < v1.length ? Integer.parseInt(v1[i]) : 0) - (i < v2.length ? Integer.parseInt(v2[i]) : 0);\\n                if (gap != 0) {\\n                    return gap > 0 ? 1 : -1;\\n                }\\n            }\\n            return 0;\\n        }\\n    }\\n\\nC++, 4ms:\\n\\n    class Solution {\\n    public:\\n        int compareVersion(string version1, string version2) {\\n            for (; version1 != version2; version1 = nextSubstr(version1), version2 = nextSubstr(version2)) {\\n                int gap = stoi(version1) - stoi(version2);\\n                if (gap != 0) {\\n                    return gap > 0 ? 1 : -1;\\n                }\\n            }\\n            return 0;\\n        }\\n        \\n        string nextSubstr(string str) {\\n            for (int i = 0; i < str.size(); i++) {\\n                if (str.at(i) == '.') {\\n                    return str.substr(i + 1);\\n                }\\n            }\\n            return \"0\";\\n        }\\n    };\\n\\nPython, around 100ms:\\n\\n    class Solution:\\n        # @param a, a string\\n        # @param b, a string\\n        # @return a boolean\\n        def compareVersion(self, version1, version2):\\n            v1 = version1.split('.')\\n            v2 = version2.split('.')\\n            for i in range(max(len(v1), len(v2))):\\n                gap = (int(v1[i]) if i < len(v1) else 0) - (int(v2[i]) if i < len(v2) else 0)\\n                if gap != 0:\\n                    return 1 if gap > 0 else -1\\n            return 0"
		},
		{
			"lc_ans_id":"50952",
			"view":"1435",
			"top":"7",
			"title":"Python 10 lines solution",
			"vote":"25",
			"content":"    def compareVersion(self, version1, version2):\\n            versions1 = [int(v) for v in version1.split(\".\")]\\n            versions2 = [int(v) for v in version2.split(\".\")]\\n            for i in range(max(len(versions1),len(versions2))):\\n                v1 = versions1[i] if i < len(versions1) else 0\\n                v2 = versions2[i] if i < len(versions2) else 0\\n                if v1 > v2:\\n                    return 1\\n                elif v1 < v2:\\n                    return -1;\\n            return 0;"
		},
		{
			"lc_ans_id":"50800",
			"view":"2430",
			"top":"8",
			"title":"2-4 lines Python, 3 different ways",
			"vote":"25",
			"content":"**Solution 1: *Pad with `izip_longest` with `fillvalue=0`***\\n\\n    def compareVersion(self, version1, version2):\\n        splits = (map(int, v.split('.')) for v in (version1, version2))\\n        return cmp(*zip(*itertools.izip_longest(*splits, fillvalue=0)))\\n\\n**Solution 2: *Pad with `[0] * lengthDifference`***\\n\\n    def compareVersion(self, version1, version2):\\n        v1, v2 = (map(int, v.split('.')) for v in (version1, version2))\\n        d = len(v2) - len(v1)\\n        return cmp(v1 + [0]*d, v2 + [0]*-d)\\n\\n**Solution 3: *Recursive, add zeros on the fly***\\n\\n    def compareVersion(self, version1, version2):\\n        main1, _, rest1 = ('0' + version1).partition('.')\\n        main2, _, rest2 = ('0' + version2).partition('.')\\n        return cmp(int(main1), int(main2)) or \\\\\\n               len(rest1+rest2) and self.compareVersion(rest1, rest2)"
		},
		{
			"lc_ans_id":"50811",
			"view":"2983",
			"top":"9",
			"title":"Simple JAVA Solution",
			"vote":"25",
			"content":"    public class Solution {\\n        public int compareVersion(String version1, String version2) {\\n            String[] v1 = version1.split(\"\\\\\\\\.\");\\n            String[] v2 = version2.split(\"\\\\\\\\.\");\\n            \\n            int longest = v1.length > v2.length? v1.length: v2.length;\\n            \\n            for(int i=0; i<longest; i++)\\n            {\\n                int ver1 = i<v1.length? Integer.parseInt(v1[i]): 0;\\n                int ver2 = i<v2.length? Integer.parseInt(v2[i]): 0;\\n                \\n                if(ver1> ver2) return 1;\\n                if(ver1 < ver2) return -1;\\n            }\\n            return 0;\\n        }\\n    }\\n\\nAny comments would be appreciated.\\nBasically I split the string with regex \".\" (it was written \"\\\\\\\\.\" since \".\" only means any character), then using looping, I tried to find out the value of the version using parseInt. \\nIf one version has a lesser subversion than the others, it will be filled with zeros.\\n\\nfor example: 1 vs 1.01 --> 1.00 vs 1.01\\n\\nit ran in about 230ms, any suggestion to make it faster with Java language?\\nWhat can be optimized?"
		}
	],
	"id":"165",
	"title":"Compare Version Numbers",
	"content":"<p>Compare two version numbers <i>version1</i> and <i>version2</i>.<br />\r\nIf <i>version1</i> &gt; <i>version2</i> return 1, if <i>version1</i> &lt; <i>version2</i> return -1, otherwise return 0.</p>\r\n\r\n<p>You may assume that the version strings are non-empty and contain only digits and the <code>.</code> character.<br />\r\nThe <code>.</code> character does not represent a decimal point and is used to separate number sequences.<br />\r\nFor instance, <code>2.5</code> is not \"two and a half\" or \"half way to version three\", it is the fifth second-level revision of the second first-level revision.</p>\r\n\r\n<p>Here is an example of version numbers ordering:</p>\r\n<pre>0.1 &lt; 1.1 &lt; 1.2 &lt; 13.37</pre>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"416",
	"ac_num":"95078"
}