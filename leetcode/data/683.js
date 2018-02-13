{
	"difficulty":"1",
	"submit_num":"24840",
	"show_id":"717",
	"leetcode_id":"717",
	"answers":[
		{
			"lc_ans_id":"108969",
			"view":"3110",
			"top":"0",
			"title":"Java solution, 1 or 2",
			"vote":"17",
			"content":"```\\nclass Solution {\\n    public boolean isOneBitCharacter(int[] bits) {\\n        int n = bits.length, i = 0;\\n        while (i < n - 1) {\\n            if (bits[i] == 0) i++;\\n            else i += 2;\\n        }\\n        return i == n - 1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108967",
			"view":"1088",
			"top":"1",
			"title":"JAVA, check only the end of array",
			"vote":"12",
			"content":"We don't need to traverse the whole array,  just check the last part of it.\\n1) if there is only one symbol in array the answer is always true (as last element is 0)\\n2) if there are two 0s at the end again the answer is true no matter what  the rest symbols are( ...1100, ...1000,)\\n3) if there is 1 right before the last element(...10), the outcome depends on the count of sequential 1, i.e.\\n    a) if there is odd amount of 1(10, ...01110, etc) the answer is false as there is  a single 1 without pair\\n  b) if it's even (110, ...011110, etc) the answer is true, as 0 at the end doesn't have anything to pair with\\n\\n```\\nclass Solution {\\n    public boolean isOneBitCharacter(int[] bits) {\\n        int ones = 0;\\n        //Starting from one but last, as last one is always 0.\\n        for (int i = bits.length - 2; i >= 0 && bits[i] != 0 ; i--) { \\n            ones++;\\n        }\\n        if (ones % 2 > 0) return false; \\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"108994",
			"view":"571",
			"top":"2",
			"title":"Java One-liner recursive",
			"vote":"3",
			"content":"```\\nclass Solution {\\n    public boolean isOneBitCharacter(int[] bits) {\\n        return bits.length <= 2 ? bits[0] == 0 : isOneBitCharacter(Arrays.copyOfRange(bits, bits[0] + 1, bits.length));\\n    }\\n}\\n```\\nand 3-liner iterative.\\n```\\nclass Solution {\\n    public boolean isOneBitCharacter(int[] bits) {\\n        int i = 0;\\n        for (; i < bits.length - 1; i += bits[i] + 1);\\n        return i < bits.length && bits[i] == 0;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109003",
			"view":"131",
			"top":"3",
			"title":"Definition is vague, answer is simple",
			"vote":"2",
			"content":"Just count how many continous 1's prior to the final 0.\\n```\\n    public boolean isOneBitCharacter(int[] bits) {\\n        if (bits == null) return false;\\n        boolean one = false;\\n        int i = bits.length - 2;\\n        while (i >= 0 && bits[i--] == 1) {\\n            one = one ^ true;\\n        }\\n        return !one;\\n    }\\n```"
		},
		{
			"lc_ans_id":"109008",
			"view":"493",
			"top":"4",
			"title":"Easy to understand C++ solution with modified for loop",
			"vote":"2",
			"content":"```\\nclass Solution {\\npublic:\\n    bool isOneBitCharacter(vector<int>& b) {\\n        bool c;\\n        for (int i = 0; i < b.size();) {\\n            if (b[i]) c = 0, i+=2;\\n            else c = 1, ++i;\\n        }\\n        return c;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"108979",
			"view":"229",
			"top":"5",
			"title":"Single Regular Expression - JS: ES6",
			"vote":"2",
			"content":"Because every problem is a regex problem!\\n```javascript\\nisOneBitCharacter = bits => /^(10|11|0)*0$/.test(bits.join(''));\\n```"
		},
		{
			"lc_ans_id":"109011",
			"view":"967",
			"top":"6",
			"title":"python solution, easy",
			"vote":"2",
			"content":"\\xb7\\xb7\\xb7\\n\\n        if not bits: return False\\n        n = len(bits)\\n        \\n        index = 0\\n        while index < n:\\n            if index == n-1 : return True\\n            if bits[index] == 1: \\n                index += 2              \\n            else: index += 1\\n        return False\\n   \\n\\xb7\\xb7\\xb7"
		},
		{
			"lc_ans_id":"109014",
			"view":"219",
			"top":"7",
			"title":"c++, both iterative and recursive solutions",
			"vote":"2",
			"content":"\\n1. iterative solution\\n```\\nclass Solution {\\npublic:\\n    bool isOneBitCharacter(vector<int>& bits) {\\n        int i = 0, n = bits.size() - 1;\\n        while (i < n) i += bits[i] + 1;\\n        return i == n;\\n    }\\n};\\n```\\n2. recursive solution\\n```\\nclass Solution {\\npublic:\\n    bool isOneBitCharacter(vector<int>& bits) {\\n        return dfs(bits, 0);        \\n    }\\nprivate:\\n    bool dfs(vector<int>& bits, int idx) {\\n        if (idx == bits.size()) return false;\\n        if (idx == bits.size() - 1 && bits[idx] == 0) return true;\\n        if (bits[idx] == 1) return dfs(bits, idx + 2);\\n        else return dfs(bits, idx + 1);\\n    }\\n```"
		},
		{
			"lc_ans_id":"109000",
			"view":"116",
			"top":"8",
			"title":"simple python code: search from the back",
			"vote":"1",
			"content":"search from the back\\n```\\nif len(bits) == 1: return True \\ns = 0\\ni = len(bits) - 2\\nwhile bits[i] == 1:\\n     s += 1\\n     i -= 1\\nreturn s/2*2 == s\\n```"
		},
		{
			"lc_ans_id":"109007",
			"view":"154",
			"top":"9",
			"title":"Regex Oneliners",
			"vote":"1",
			"content":"Current shortest from below:\\n```\\ndef is_one_bit_character(bits)\\n  bits.join !~ /^(0|1.)*1.$/\\nend\\n```\\n---\\n### Solution 1\\n\\nJust decode the text and check the last character.\\n\\nRuby:\\n```\\ndef is_one_bit_character(bits)\\n  bits.join.scan(/0|1./).last == '0'\\nend\\n```\\nPython:\\n\\n    def isOneBitCharacter(self, bits):\\n        return re.findall('0|1.', ''.join(map(str, bits)))[-1] == '0'\\n\\n### Solution 2\\n\\nLike solution 1, but with a slightly shorter/trickier regex:\\n```\\ndef is_one_bit_character(bits)\\n  bits.join.scan(/1?./).last == '0'\\nend\\n```\\n\\n### Solution 3\\n\\nUsing other people's *\"even number of ones before the final zero\"* rule.\\n```\\ndef is_one_bit_character(bits)\\n  bits.join.match?(/(^|0)(11)*0$/)\\nend\\n```\\nThe \"not odd\" version is a bit shorter, since `!~` returns a boolean, unlike `=~` would.\\n```\\ndef is_one_bit_character(bits)\\n  bits.join !~ /(^|0)(11)*10$/\\nend\\n```\\nA neat non-regex one:\\n```\\ndef is_one_bit_character(bits)\\n  bits.reverse.rotate.index(0).even?\\nend\\n```\\nThe `rotate` achieves two things: It removes the zero that I need to skip, and it places it at the other end to ensure that `index` finds a zero.\\n\\n### Solution 4\\n\\nSimilar to solution 1, but using the regex to check the last character. Inspired by @chris-rocco7's [solution](https://discuss.leetcode.com/topic/108788/single-regular-expression-js-es6).\\n\\nRuby:\\n```\\ndef is_one_bit_character(bits)\\n  bits.join.match?(/^(0|1.)*0$/)\\nend\\n```\\nThe \"not not\" version is shorter again:\\n```\\ndef is_one_bit_character(bits)\\n  bits.join !~ /^(0|1.)*1.$/\\nend\\n```\\nPython:\\n\\n    def isOneBitCharacter(self, bits):\\n        return bool(re.match('(0|1.)*0$', ''.join(map(str, bits))))\\n\\nJava:\\n\\n    public boolean isOneBitCharacter(int[] bits) {\\n        return Arrays.stream(bits).mapToObj(String::valueOf).collect(Collectors.joining()).matches(\"(0|1.)*0\");\\n    }\\n\\nThe matching part is nicer in Java, here it helps that Java means full match by default, but omg is turning the int[] to a String complicated. And that's already the nicest one I found [here](https://stackoverflow.com/q/38425623/1672429). Though I guess I could do a less efficient non-oneliner one:\\n\\n    public boolean isOneBitCharacter(int[] bits) {\\n        String s = \"\";\\n        for (int bit : bits)\\n            s += bit;\\n        return s.matches(\"(0|1.)*0\");\\n    }"
		}
	],
	"id":"683",
	"title":"1-bit and 2-bit Characters",
	"content":"<p>We have two special characters. The first character can be represented by one bit <code>0</code>. The second character can be represented by two bits (<code>10</code> or <code>11</code>).  </p>\r\n\r\n<p>Now given a string represented by several bits. Return whether the last character must be a one-bit character or not. The given string will always end with a zero.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nbits = [1, 0, 0]\r\n<b>Output:</b> True\r\n<b>Explanation:</b> \r\nThe only way to decode it is two-bit character and one-bit character. So the last character is one-bit character.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nbits = [1, 1, 1, 0]\r\n<b>Output:</b> False\r\n<b>Explanation:</b> \r\nThe only way to decode it is two-bit character and two-bit character. So the last character is NOT one-bit character.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li><code>1 <= len(bits) <= 1000</code>.</li>\r\n<li><code>bits[i]</code> is always <code>0</code> or <code>1</code>.</li>\r\n</p>",
	"frequency":"360",
	"ac_num":"12353"
}