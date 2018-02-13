{
	"difficulty":"1",
	"submit_num":"353153",
	"show_id":"344",
	"leetcode_id":"344",
	"answers":[
		{
			"lc_ans_id":"80937",
			"view":"37960",
			"top":"0",
			"title":"[JAVA] Simple and Clean with Explanations [6 Solutions]",
			"vote":"82",
			"content":"https://www.ratchapong.com/algorithm-practice/leetcode/reverse-string [Full solutions]\\n```\\npublic class Solution {\\n    public String reverseString(String s) {\\n        char[] word = s.toCharArray();\\n        int i = 0;\\n        int j = s.length() - 1;\\n        while (i < j) {\\n            char temp = word[i];\\n            word[i] = word[j];\\n            word[j] = temp;\\n            i++;\\n            j--;\\n        }\\n        return new String(word);\\n    }\\n}\\n```\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4>\\n    <p>\\n        <b>Time Complexity:</b>\\n        `O(n)` (Average Case) and `O(n)` (Worst Case) where `n` is the total number character in the input string.\\n        The algorithm need to reverse the whole string.\\n    </p>\\n    <p>\\n        <b>Auxiliary Space:</b>\\n        `O(n)` space is used where `n` is the total number character in the input string. Space is needed to transform\\n        string to character array.\\n    </p>\\n</div>\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4>\\n    <p>\\n        <b>Approach:</b>\\n        Iterative Swapping Using Two Pointers\\n    </p>\\n    <p>\\n        One pointer is pointing at the start of the string while the other pointer is pointing at the end of the string.\\n        Both pointers will keep swapping its element and travel towards each other. The algorithm basically simulating\\n        rotation of a string with respect to its midpoint.\\n    </p>\\n</div>\\n\\n```\\npublic class Solution {\\n    public String reverseString(String s) {\\n        byte[] bytes = s.getBytes();\\n        int i = 0;\\n        int j = s.length() - 1;\\n        while (i < j) {\\n            byte temp = bytes[i];\\n            bytes[i] = bytes[j];\\n            bytes[j] = temp;\\n            i++;\\n            j--;\\n        }\\n        return new String(bytes);\\n    }\\n}\\n```\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4>\\n    <p>\\n        <b>Time Complexity:</b>\\n        `O(n)` (Average Case) and `O(n)` (Worst Case) where `n` is the total number character in the input string.\\n        The algorithm need to reverse the whole string. Each character is `1` byte.\\n    </p>\\n    <p>\\n        <b>Auxiliary Space:</b>\\n        `O(n)` space is used where `n` is the total number character in the input string. Space is needed to transform\\n        string to byte array.\\n    </p>\\n</div>\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4>\\n    <p>\\n        <b>Approach:</b>\\n        Iterative Swapping Using Two Pointers\\n    </p>\\n    <p>\\n        One pointer is pointing at the start of the byte array while the other pointer is pointing at the end of the\\n        byte array.\\n        Both pointers will keep swapping its element and travel towards each other. The algorithm basically simulating\\n        rotation of a string with respect to its midpoint.\\n    </p>\\n    <p>\\n        Note that this assume that the input string is encoded using\\n        ASCII format. This will not work with Unicode value where one character may be more than 1 byte.\\n    </p>\\n</div>\\n\\n```\\npublic class Solution {\\n    public String reverseString(String s) {\\n        char[] word = s.toCharArray();\\n        int i = 0;\\n        int j = s.length() - 1;\\n        while (i < j) {\\n            word[i] = (char) (word[i] ^ word[j]);\\n            word[j] = (char) (word[i] ^ word[j]);\\n            word[i] = (char) (word[i] ^ word[j]);\\n            i++;\\n            j--;\\n        }\\n        return new String(bytes);\\n    }\\n}\\n```\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4>\\n    <p>\\n        <b>Time Complexity:</b>\\n        `O(n)` (Average Case) and `O(n)` (Worst Case) where `n` is the total number character in the input string.\\n        The algorithm need to reverse the whole string.\\n    </p>\\n    <p>\\n        <b>Auxiliary Space:</b>\\n        `O(n)` space is used where `n` is the total number character in the input string. Space is needed to transform\\n        string to character array.\\n    </p>\\n</div>\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4>\\n    <p>\\n        <b>Approach:</b>\\n        Iterative Swapping Using Two Pointers\\n    </p>\\n    <p>\\n        One pointer is pointing at the start of the string while the other pointer is pointing at the end of the string.\\n        Both pointers will keep swapping its element and travel towards each other. The algorithm basically simulating\\n        rotation of a string with respect to its midpoint. The swapping is done by using <code>XOR</code> swapping\\n        algorithm.\\n    </p>\\n    <div align=\"center\" class=\"margin-bottom-10 margin-top-10\">\\n        <table class=\"table table-bordered\" style=\"width: 60%\">\\n            <thead>\\n                <tr>\\n                    <th class=\"text-center\">Operation</th>\\n                    <th class=\"text-center\">Result</th>\\n                </tr>\\n            </thead>\\n            <tbody>\\n                <tr>\\n                    <td align=\"center\">`a = a \\\\oplus b`</td>\\n                    <td align=\"left\">`a = a \\\\oplus b`</td>\\n                </tr>\\n                <tr>\\n                    <td align=\"center\">`b = a \\\\oplus b`</td>\\n                    <td align=\"left\">`b = (a \\\\oplus b) \\\\oplus b = a \\\\oplus b \\\\oplus b = a`</td>\\n                </tr>\\n                <tr>\\n                    <td align=\"center\">`a = a \\\\oplus b`</td>\\n                    <td align=\"left\">`a = (a \\\\oplus b) \\\\oplus a = a \\\\oplus b \\\\oplus a = b`</td>\\n                </tr>\\n            </tbody>\\n        </table>\\n    </div>\\n    <p>\\n        Note that this assume that the input string is encoded using\\n        ASCII format. This will not work with Unicode value where one character may be more than 1 byte.\\n    </p>\\n</div>\\n\\n```\\npublic class Solution {\\n    public String reverseString(String s) {\\n        byte[] bytes = s.getBytes();\\n        int i = 0;\\n        int j = s.length() - 1;\\n        while (i < j) {\\n            bytes[i] = (byte) (bytes[i] ^ bytes[j]);\\n            bytes[j] = (byte) (bytes[i] ^ bytes[j]);\\n            bytes[i] = (byte) (bytes[i] ^ bytes[j]);\\n            i++;\\n            j--;\\n        }\\n        return new String(bytes);\\n    }\\n}\\n```\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4>\\n    <p>\\n        <b>Time Complexity:</b>\\n        `O(n)` (Average Case) and `O(n)` (Worst Case) where `n` is the total number character in the input string.\\n        The algorithm need to reverse the whole string. Each character is `1` byte.\\n    </p>\\n    <p>\\n        <b>Auxiliary Space:</b>\\n        `O(n)` space is used where `n` is the total number character in the input string. Space is needed to transform\\n        string to byte array.\\n    </p>\\n</div>\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4>\\n    <p>\\n        <b>Approach:</b>\\n        Iterative Swapping Using Two Pointers\\n    </p>\\n    <p>\\n        One pointer is pointing at the start of the byte array while the other pointer is pointing at the end of the\\n        byte array.\\n        Both pointers will keep swapping its element and travel towards each other. The algorithm basically simulating\\n        rotation of a string with respect to its midpoint. The swapping is done by using <code>XOR</code> swapping\\n        algorithm.\\n    </p>\\n    <div align=\"center\" class=\"margin-bottom-10 margin-top-10\">\\n        <table class=\"table table-bordered\" style=\"width: 60%\">\\n            <thead>\\n                <tr>\\n                    <th class=\"text-center\">Operation</th>\\n                    <th class=\"text-center\">Result</th>\\n                </tr>\\n            </thead>\\n            <tbody>\\n                <tr>\\n                    <td align=\"center\">`a = a \\\\oplus b`</td>\\n                    <td align=\"left\">`a = a \\\\oplus b`</td>\\n                </tr>\\n                <tr>\\n                    <td align=\"center\">`b = a \\\\oplus b`</td>\\n                    <td align=\"left\">`b = (a \\\\oplus b) \\\\oplus b = a \\\\oplus b \\\\oplus b = a`</td>\\n                </tr>\\n                <tr>\\n                    <td align=\"center\">`a = a \\\\oplus b`</td>\\n                    <td align=\"left\">`a = (a \\\\oplus b) \\\\oplus a = a \\\\oplus b \\\\oplus a = b`</td>\\n                </tr>\\n            </tbody>\\n        </table>\\n    </div>\\n    <p>\\n        Note that this assume that the input string is encoded using\\n        ASCII format. This will not work with Unicode value where one character may be more than 1 byte.\\n    </p>\\n</div>\\n\\n```\\npublic class Solution {\\n    public String reverseString(String s) {\\n        return new StringBuilder(s).reverse().toString();\\n    }\\n}\\n```\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4>\\n    <p>\\n        <b>Time Complexity:</b>\\n        `O(n)` (Average Case) and `O(n)` (Worst Case) where `n` is the total number character in the input string.\\n        Depending on the implementation. However, it is not possible to reverse string in less than `O(n)`.\\n    </p>\\n    <p>\\n        <b>Auxiliary Space:</b>\\n        `O(n)` space is used where `n` is the total number character in the input string. Space is needed to transform\\n        immutable string into character buffer in <code>StringBuilder</code>.\\n    </p>\\n</div>\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4>\\n    <p>\\n        <b>Approach:</b>\\n        Using Java Library\\n    </p>\\n    <p>\\n        Java's library is probably slower that direct implementation due to extra overhead in check various edge cases\\n        such as surrogate pairs.\\n    </p>\\n</div>\\n\\n```\\npublic class Solution {\\n    public String reverseString(String s) {\\n        int length = s.length();\\n        if (length <= 1) return s;\\n        String leftStr = s.substring(0, length / 2);\\n        String rightStr = s.substring(length / 2, length);\\n        return reverseString(rightStr) + reverseString(leftStr);\\n    }\\n}\\n```\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Complexity Analysis</h4>\\n    <p>\\n        <b>Time Complexity:</b>\\n        `O(n log(n))` (Average Case) and `O(n * log(n))` (Worst Case) where `n` is the total number character in the\\n        input string.\\n        The recurrence equation is `T(n) = 2 * T(n/2) + O(n)`. `O(n)` is due to the fact that concatenation function\\n        takes linear time.\\n        The recurrence equation can be solved to get `O(n * log(n))`.\\n    </p>\\n    <p>\\n        <b>Auxiliary Space:</b>\\n        `O(h)` space is used where `h` is the depth of recursion tree generated which is `log(n)`. Space is needed for\\n        activation stack during recursion calls.\\n    </p>\\n</div>\\n<div class=\"margin-bottom-20\">\\n    <h4 class=\"text-uppercase margin-bottom-10\">Algorithm</h4>\\n    <p>\\n        <b>Approach:</b>\\n        Divide and Conquer (Recursive)\\n    </p>\\n    <p>\\n        The string is split into half. Each substring will be further divided. This process continues until the string\\n        can no longer be divided (length `<= 1`). The conquering process will take they previously split strings and\\n        concatenate them in reverse order.\\n    </p>\\n</div>"
		},
		{
			"lc_ans_id":"80935",
			"view":"15262",
			"top":"1",
			"title":"Simple C++ solution",
			"vote":"31",
			"content":"    class Solution {\\n    public:\\n        string reverseString(string s) {\\n            int i = 0, j = s.size() - 1;\\n            while(i < j){\\n                swap(s[i++], s[j--]); \\n            }\\n            \\n            return s;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"80946",
			"view":"5954",
			"top":"2",
			"title":"Python (3 solutions: Recursive, Classic, Pythonic)",
			"vote":"22",
			"content":"```\\nclass Solution(object):\\n    def reverseString(self, s):\\n        l = len(s)\\n        if l < 2:\\n            return s\\n        return self.reverseString(s[l/2:]) + self.reverseString(s[:l/2])\\n\\n\\nclass SolutionClassic(object):\\n    def reverseString(self, s):\\n        r = list(s)\\n        i, j  = 0, len(r) - 1\\n        while i < j:\\n            r[i], r[j] = r[j], r[i]\\n            i += 1\\n            j -= 1\\n\\n        return \"\".join(r)\\n\\nclass SolutionPythonic(object):\\n    def reverseString(self, s):\\n        return s[::-1]\\n```"
		},
		{
			"lc_ans_id":"80961",
			"view":"12979",
			"top":"3",
			"title":"Python solution",
			"vote":"21",
			"content":" Python:\\n\\n       class Solution(object):\\n            def reverseString(self, s):\\n                \"\"\"\\n                :type s: str\\n                :rtype: str\\n                \"\"\"\\n                return s[::-1]"
		},
		{
			"lc_ans_id":"81156",
			"view":"2123",
			"top":"4",
			"title":"C solution sharing",
			"vote":"14",
			"content":"    char* reverseString(char* s) {\\n     int l = 0;\\n     int r = strlen(s)-1;\\n     char c;\\n     \\n     while(l<r)\\n     {\\n         // swap chars\\n         c = s[l];\\n         s[l] = s[r];\\n         s[r] = c;\\n         l++;\\n         r--;\\n     }\\n     \\n     return s;\\n    }"
		},
		{
			"lc_ans_id":"81063",
			"view":"12622",
			"top":"5",
			"title":"Java- easiest method- 2-line code, attached another method",
			"vote":"14",
			"content":"   \\n\\n    //method 1: use StringBuilder\\n        public String reverseString(String s) {\\n            StringBuilder sb = new StringBuilder(s);\\n            return sb.reverse().toString();\\n        }\\n    \\n        //method 2: use swap method\\n        public String reverseString(String s){\\n            if(s == null || s.length() == 0)\\n                return \"\";\\n            char[] cs = s.toCharArray();\\n            int begin = 0, end = s.length() - 1;\\n            while(begin <= end){\\n                char c = cs[begin];\\n                cs[begin] = cs[end];\\n                cs[end] = c;\\n                begin++;\\n                end--;\\n            }\\n            \\n            return new String(cs);\\n        }"
		},
		{
			"lc_ans_id":"81199",
			"view":"3252",
			"top":"6",
			"title":"Python one line solution",
			"vote":"11",
			"content":"    class Solution(object):\\n        def reverseString(self, s):\\n            \"\"\"\\n            :type s: str\\n            :rtype: str\\n            \"\"\"\\n            return s[::-1]"
		},
		{
			"lc_ans_id":"81152",
			"view":"1701",
			"top":"7",
			"title":"Python recursive solution",
			"vote":"10",
			"content":"    class Solution(object):\\n        def reverseString(self, s):\\n            \"\"\"\\n            :type s: str\\n            :rtype: str\\n            \"\"\"\\n            if len(s)<=1:\\n                return s\\n            n=len(s)\\n            return self.reverseString(s[n//2:])+self.reverseString(s[:n//2])"
		},
		{
			"lc_ans_id":"81206",
			"view":"1822",
			"top":"8",
			"title":"Java swapping char array.",
			"vote":"8",
			"content":"    public String reverseString(String s) {\\n            char[] c = s.toCharArray();\\n            for (int i=0,j=c.length-1;i<j;i++,j--){\\n                char temp = c[i];\\n                c[i]=c[j];\\n                c[j]=temp;\\n            }\\n            return new String(c);\\n        }"
		},
		{
			"lc_ans_id":"81074",
			"view":"5002",
			"top":"9",
			"title":"2ms Java solution",
			"vote":"7",
			"content":"    public class Solution {\\n        public String reverseString(String s) {\\n            if(s == null) return null;\\n            if(s.equals(\"\")) return s;\\n            char[] arrChar = s.toCharArray();\\n            for (int i = 0, j = arrChar.length-1; i <= j; i++, j--) {\\n                char temp = arrChar[i];\\n                arrChar[i] = arrChar[j];\\n                arrChar[j] = temp;\\n            }\\n            return new String(arrChar);\\n        }\\n    }"
		}
	],
	"id":"344",
	"title":"Reverse String",
	"content":"<p>Write a function that takes a string as input and returns the string reversed.</p>\r\n\r\n<p>\r\n<b>Example:</b><br />\r\nGiven s = \"hello\", return \"olleh\".\r\n</p>",
	"frequency":"626",
	"ac_num":"211703"
}