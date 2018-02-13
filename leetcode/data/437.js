{
	"difficulty":"1",
	"submit_num":"27881",
	"show_id":"443",
	"leetcode_id":"443",
	"answers":[
		{
			"lc_ans_id":"92530",
			"view":"3080",
			"top":"0",
			"title":"Java O(n), two pointers and a counter",
			"vote":"5",
			"content":"````\\npublic int compress(char[] chars) {        \\n        int start = 0;\\n        for(int end = 0, count = 0; end < chars.length; end++) {\\n            count++;\\n            if(end == chars.length-1 || chars[end] != chars[end + 1] ) {\\n                //We have found a difference or we are at the end of array\\n                chars[start] = chars[end]; // Update the character at start pointer\\n                start++;\\n                if(count != 1) {\\n                    // Copy over the character count to the array\\n                    char[] arr = String.valueOf(count).toCharArray();\\n                    for(int i=0;i<arr.length;i++, start++)\\n                        chars[start] = arr[i];\\n                }\\n                // Reset the counter\\n                count = 0;\\n            }\\n        }\\n        return start;\\n    }\\n````"
		},
		{
			"lc_ans_id":"92553",
			"view":"1408",
			"top":"1",
			"title":"Python 5-liner, O(N) time, no pointers!",
			"vote":"5",
			"content":"Here's a more functional approach to get the compressed string.\\n\\nTaking `[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]` as input, this is what you get after each line:\\n\\n- `flips` - `[('a', 0), ('b', 2), ('c', 4), (None, 7)]`\\n- `chunks` - `[('a', 2), ('b', 2), ('c', 3)]`\\n- `compressed` - `['a', '2', 'b', '2', 'c', '3']`\\n\\nLastly, overwrite the original array with `compressed`.\\n\\n```\\nclass Solution(object):\\n    def compress(self, c):\\n        flips = [(c[0], 0)] + [(c[i], i) for i in range(1, len(c)) if c[i] != c[i - 1]] + [(None, len(c))]\\n        chunks = [(b[0], a[1] - b[1]) for (a, b) in zip(flips[1:], flips)]\\n        compressed = reduce(lambda a, b: (a + [b[0]] + (list(str(b[1])) if (b[1] > 1) else [])), chunks, [])\\n        c[:len(compressed)] = compressed\\n        return len(compressed)\\n```\\n\\n*- Yangshun*"
		},
		{
			"lc_ans_id":"92559",
			"view":"1106",
			"top":"2",
			"title":"Simple Easy to Understand Java solution",
			"vote":"4",
			"content":"```\\npublic int compress(char[] chars) {\\n        int indexAns = 0, index = 0;\\n        while(index < chars.length){\\n            char currentChar = chars[index];\\n            int count = 0;\\n            while(index < chars.length && chars[index] == currentChar){\\n                index++;\\n                count++;\\n            }\\n            chars[indexAns++] = currentChar;\\n            if(count != 1)\\n                for(char c : Integer.toString(count).toCharArray()) \\n                    chars[indexAns++] = c;\\n        }\\n        return indexAns;\\n    }\\n```"
		},
		{
			"lc_ans_id":"92568",
			"view":"738",
			"top":"3",
			"title":"Python Two Pointers - O(n) time O(1) space",
			"vote":"3",
			"content":"1. Group the array into repeated chunks, keeping track of the character and the count. This forms the encoded contents.\\n2. Update the original array with the encodede contents. We maintain a `left` pointer to know which position to update the original array with the encoded contents and increment it according to the length of the encoded contents.\\n\\nThe encoded contents will definitely be shorter than the original contents, so we can overwrite the original without worries.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def compress(self, chars):\\n        left = i = 0\\n        while i < len(chars):\\n            char, length = chars[i], 1\\n            while (i + 1) < len(chars) and char == chars[i + 1]:\\n                length, i = length + 1, i + 1\\n            chars[left] = char\\n            if length > 1:\\n                len_str = str(length)\\n                chars[left + 1:left + 1 + len(len_str)] = len_str\\n                left += len(len_str)\\n            left, i = left + 1, i + 1\\n        return left\\n```"
		},
		{
			"lc_ans_id":"92548",
			"view":"295",
			"top":"4",
			"title":"C++ simple O(n) time O(1) space in-place solution",
			"vote":"1",
			"content":"```\\n    int compress(vector<char>& chars) {\\n        if(chars.size()<2) return chars.size();\\n        int pre=-1, ct=1, size=chars.size();\\n        char c=chars[0];\\n        for(int i=1;i<chars.size();i++) {\\n            if(chars[i]==chars[i-1]) ct++;\\n            if(chars[i]!=chars[i-1]) {\\n                chars[++pre]=c;\\n                if(ct>1) {\\n                    string s=to_string(ct);\\n                    for(int j=0;j<s.size();j++, pre++) chars[pre+1]=s[j];\\n                }\\n                ct=1;\\n                c=chars[i];\\n            }\\n        }\\n        chars[++pre]=c;\\n        if(ct>1) {\\n            string s=to_string(ct);\\n            for(int j=0;j<s.size();j++, pre++) chars[pre+1]=s[j];\\n        }\\n        for(int i=pre+1;i<size;i++) chars.pop_back();\\n        return pre+1;\\n    }\\n};"
		},
		{
			"lc_ans_id":"92562",
			"view":"378",
			"top":"5",
			"title":"1-liner",
			"vote":"1",
			"content":"Using a regular expression to replace repeats by numbers.\\n\\nRuby:\\n```\\ndef compress(chars)\\n  chars.replace(chars.join.gsub(/(?<=(.))\\\\1+/) { |s| 1 + s.size }.chars).size\\nend\\n```\\nPython version, not quite as nice/short:\\n\\n    def compress(self, chars):\\n        chars[:] = re.sub(r'(?<=(.))\\\\1+', lambda m: str(1 + len(m.group())), ''.join(chars))\\n        return len(chars)"
		},
		{
			"lc_ans_id":"92570",
			"view":"257",
			"top":"6",
			"title":"C++, O(n) time O(1) space",
			"vote":"1",
			"content":"```\\nclass Solution {\\npublic:\\n    int compress(vector<char>& chars) {\\n        int n = chars.size(), i = 0;\\n        for (int j = 0; j < n;) {\\n            if (j == n-1 || chars[j] != chars[j+1]) \\n                chars[i++] = chars[j++];\\n            else {\\n                int k = j;\\n                while (j < n && chars[j] == chars[k])\\n                    j++;\\n                chars[i++] = chars[k];\\n                string s = to_string(j-k);\\n                for (char c:s) chars[i++] = c;\\n            }\\n        }\\n        return i;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"92571",
			"view":"136",
			"top":"7",
			"title":"C# Solution",
			"vote":"1",
			"content":"Iterate over the array, count and use a current ptr to update the array in place.\\n\\n~~~\\n public int Compress(char[] chars) {\\n            int i = 0;\\n            int ptr = 0;\\n\\n            while (i < chars.Length)\\n            {\\n                int count = 1;\\n                char ch = chars[i];\\n                i++;\\n\\n                while (i < chars.Length && chars[i] == ch)\\n                {\\n                    count++;\\n                    i++;\\n                }\\n\\n                chars[ptr++] = ch;                \\n\\n                if (count > 1)\\n                {\\n                    foreach (var item in count.ToString().ToCharArray())\\n                    {\\n                        chars[ptr++] = item;                        \\n                    }\\n                }\\n            }\\n\\n            return ptr;\\n    }\\n~~~"
		},
		{
			"lc_ans_id":"92528",
			"view":"3",
			"top":"8",
			"title":"Clean Java Code",
			"vote":"0",
			"content":"```\\nclass Solution {\\n    public int compress(char[] chars) {\\n        if (chars == null || chars.length == 0) {\\n            return 0;\\n        }\\n        int idx = 0;\\n        int cnt = 0;\\n        char curr = 'a';\\n        for (char c : chars) {\\n            if (c == curr) {\\n                cnt++;\\n            } else {\\n                // append previous \\n                if (cnt != 0) {\\n                    chars[idx++] = curr;\\n                    if (cnt != 1) {\\n                        char[] temp = String.valueOf(cnt).toCharArray();\\n                        for (char t : temp) {\\n                            chars[idx++] = t;\\n                        }\\n                    }\\n                }\\n                // update\\n                curr = c;\\n                cnt = 1;\\n            }\\n        }\\n        chars[idx++] = curr;\\n        if (cnt != 1) {\\n            char[] temp = String.valueOf(cnt).toCharArray();\\n            for (char t : temp) {\\n                chars[idx++] = t;\\n            }\\n        }\\n        return idx;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"92529",
			"view":"5",
			"top":"9",
			"title":"JAVA O(n) time, O(1) space easy to understand explanation",
			"vote":"0",
			"content":"Just throwing my two cents in incase it can help someone...\\n\\nWe can complete this question with the help of two pointers,\\n\\nread: the next index to read in\\nwrite: the next index to write to\\n\\nWrite will hold our final answer\\n\\nSince chars with no successive duplicates do not need to be followed by \"1\" we know this method can work without overwriting a new number we have not read yet\\n\\nWe know that we are going to need a O(n) solution since there is no particular order to the elements, so we will have to read to the end of the array to figure out all counts. We create a for loop to do this\\n\\nAt each repeat of the for loop the read head is at a new character (new meaning it does not match with the one before it) - this is our invariant. As such we know we have to record it and increment the write and read heads \\n\\n```\\nchars[write++] = chars[read++];\\n```\\n\\nNow we need to consider if this character has duplicates following it. We simply update a counter (totalDups) as long as this character matches the previous one. We also increment read each time. At the end of the while loop, read would either be at an index outside of the scope of the string or at a character that does not match our dup trail. So on the next tick of the for loop read will be at a \"new\" character thus maintaining our invariant\\n\\nAll we have left to do is to write the dup count. If the count is 1, meaning it is a single character with no dups following it, we have noting to write. Otherwise we need to write each digit of the variable totalDups. We can get the digit count by turning it to a String and taking the length\\n\\nTo get each digit, we can divide by the necessary power of 10 and then mod our number with that same power of 10 in order to repeat and get the next digit. For example:\\n\\nSuppose we had a totalDups count of 1234 we want to push \"1\" then \"2\" then \"3\" then \"4\"\\nFirst we use 1000\\n1234 / 1000 = 1 we push that\\n1234 % 1000 = 234 \\n\\nSo on the next iteration of our loop, we have 234 / 100 this is 2 so we push that\\n2 % 100 = 34\\n\\n.. and so on\\n\\n```\\nclass Solution {\\n    public int compress(char[] chars) {\\n        int read = 0, write = 0;\\n        for (; read < chars.length;) {\\n            // at new char\\n            chars[write++] = chars[read++];\\n            // if dup we need a number\\n            int totalDups = 1;\\n            while (read < chars.length && chars[read] == chars[read-1]) {totalDups++; read++;}\\n            // no dups means no numbers needed\\n            if (totalDups == 1) continue;\\n            \\n            int lenNeeded = Integer.toString(totalDups).length();\\n            for (int select = (int)Math.pow(10, lenNeeded-1); select >= 1; select /= 10) {\\n                chars[write++] = Character.forDigit(totalDups/select, 10);\\n                totalDups = totalDups % select;\\n            }\\n        }\\n        return write;\\n    }\\n}\\n```"
		}
	],
	"id":"437",
	"title":"String Compression",
	"content":"<p>Given an array of characters, compress it <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><b>in-place</b></a>.</p>\r\n\r\n<p>The length after compression must always be smaller than or equal to the original array.</p>\r\n\r\n<p>Every element of the array should be a <b>character</b> (not int) of length 1.</p>\r\n \r\n<p>After you are done <b>modifying the input array <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\">in-place</a></b>, return the new length of the array.</p>\r\n\r\n<br />\r\n\r\n<p><b>Follow up:</b><br />\r\nCould you solve it using only O(1) extra space?\r\n</p>\r\n\r\n<br />\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]\r\n\r\n<b>Output:</b>\r\nReturn 6, and the first 6 characters of the input array should be: [\"a\",\"2\",\"b\",\"2\",\"c\",\"3\"]\r\n\r\n<b>Explanation:</b>\r\n\"aa\" is replaced by \"a2\". \"bb\" is replaced by \"b2\". \"ccc\" is replaced by \"c3\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[\"a\"]\r\n\r\n<b>Output:</b>\r\nReturn 1, and the first 1 characters of the input array should be: [\"a\"]\r\n\r\n<b>Explanation:</b>\r\nNothing is replaced.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b>\r\n[\"a\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\"]\r\n\r\n<b>Output:</b>\r\nReturn 4, and the first 4 characters of the input array should be: [\"a\",\"b\",\"1\",\"2\"].\r\n\r\n<b>Explanation:</b>\r\nSince the character \"a\" does not repeat, it is not compressed. \"bbbbbbbbbbbb\" is replaced by \"b12\".\r\nNotice each digit has it's own entry in the array.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>All characters have an ASCII value in <code>[35, 126]</code>.</li>\r\n<li><code>1 <= len(chars) <= 1000</code>.</li>\r\n</ol>\r\n</p>",
	"frequency":"158",
	"ac_num":"10293"
}