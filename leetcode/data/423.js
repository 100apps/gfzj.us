{
	"difficulty":"2",
	"submit_num":"30609",
	"show_id":"423",
	"leetcode_id":"423",
	"answers":[
		{
			"lc_ans_id":"91207",
			"view":"10311",
			"top":"0",
			"title":"one pass O(n) JAVA Solution, Simple and Clear",
			"vote":"107",
			"content":"The idea is:\\n\\nfor zero, it's the only word has letter 'z',\\nfor two, it's the only word has letter 'w',\\n......\\nso we only need to count the unique letter of each word, Coz the input is always valid.\\n\\nCode:\\n\\n    public String originalDigits(String s) {\\n        int[] count = new int[10];\\n        for (int i = 0; i < s.length(); i++){\\n            char c = s.charAt(i);\\n            if (c == 'z') count[0]++;\\n            if (c == 'w') count[2]++;\\n            if (c == 'x') count[6]++;\\n            if (c == 's') count[7]++; //7-6\\n            if (c == 'g') count[8]++;\\n            if (c == 'u') count[4]++; \\n            if (c == 'f') count[5]++; //5-4\\n            if (c == 'h') count[3]++; //3-8\\n            if (c == 'i') count[9]++; //9-8-5-6\\n            if (c == 'o') count[1]++; //1-0-2-4\\n        }\\n        count[7] -= count[6];\\n        count[5] -= count[4];\\n        count[3] -= count[8];\\n        count[9] = count[9] - count[8] - count[5] - count[6];\\n        count[1] = count[1] - count[0] - count[2] - count[4];\\n        StringBuilder sb = new StringBuilder();\\n        for (int i = 0; i <= 9; i++){\\n            for (int j = 0; j < count[i]; j++){\\n                sb.append(i);\\n            }\\n        }\\n        return sb.toString();\\n    }"
		},
		{
			"lc_ans_id":"91210",
			"view":"4483",
			"top":"1",
			"title":"Fun fact",
			"vote":"18",
			"content":"The **even** digits all have a unique letter while the **odd** digits all don't:\\n\\n`zero`: Only digit with `z`\\n`two`: Only digit with `w`\\n`four`: Only digit with `u`\\n`six`: Only digit with `x`\\n`eight`: Only digit with `g`\\n\\nThe odd ones for easy looking, each one's letters all also appear in other digit words:\\n`one`, `three`, `five`, `seven`, `nine`"
		},
		{
			"lc_ans_id":"91203",
			"view":"4131",
			"top":"2",
			"title":"Share my simple and easy O(N) solution",
			"vote":"17",
			"content":"```\\npublic class Solution {\\n    public String originalDigits(String s) {\\n        if(s==null || s.length()==0) return \"\";\\n        int[] count = new int[128];\\n        for(int i=0;i<s.length();i++)  count[s.charAt(i)]++;\\n        int[] num = new int[10];\\n        num[0] = count['z'];\\n        num[2] = count['w'];\\n        num[4] = count['u'];\\n        num[6] = count['x'];\\n        num[8] = count['g'];\\n        num[1] = count['o']-count['z']-count['w']-count['u'];\\n        num[3] = count['h']-count['g'];\\n        num[5] = count['v']-count['s']+count['x'];\\n        num[7] = count['s']-count['x'];\\n        num[9] = count['i']-count['x']-count['g']-count['v']+count['s']-count['x'];\\n        String ret = new String();\\n        for(int i=0;i<10;i++)\\n            for(int j=num[i];j>0;j--) ret += String.valueOf(i);\\n        return ret;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"91195",
			"view":"2235",
			"top":"3",
			"title":"Straightforward C++ Accepted Solution",
			"vote":"10",
			"content":"```\\nclass Solution {\\npublic:\\n    string originalDigits(string s) {\\n        vector<string> words = {\"zero\", \"two\", \"four\", \"six\", \"eight\", \"one\", \"three\", \"five\", \"seven\", \"nine\"};\\n        vector<int> nums = {0, 2, 4, 6, 8, 1, 3, 5, 7, 9};\\n        vector<int> distinct_char = {'z', 'w', 'u', 'x', 'g', 'o', 'r', 'f', 'v', 'i'};\\n        vector<int> counts(26, 0);\\n        string result;\\n        for(auto ch : s){ counts[ch-'a']++;}\\n        for(int i = 0; i < 10; i++){\\n            int count = counts[distinct_char[i]-'a'];\\n            for(int j = 0; j < words[i].size(); j++)\\n                counts[words[i][j]-'a'] -= count;\\n            while(count--)\\n                result += to_string(nums[i]);\\n        }\\n        sort(result.begin(), result.end());\\n        return result;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91192",
			"view":"968",
			"top":"4",
			"title":"Short Matrix Solution",
			"vote":"7",
			"content":"**Solution**\\n```\\ndef original_digits(s)\\n  require 'matrix'\\n  a = ('a'..'z').map { |c| \"zero one two three four five six seven eight nine\".split.map { |w| w.count(c) } }\\n  b = ('a'..'z').map { |c| s.count(c) }\\n  x = Matrix[*a].lup.solve(b)\\n  (0..9).map { |i| i.to_s * x[i] }.join\\nend\\n```\\n**Explanation**\\n\\nUsing Ruby's `Matrix` class to solve the system of equations. We have one equation for each letter. For example, consider the letter 'n'. If the unknown digits are x<sub>0</sub> zeros, x<sub>1</sub> ones, etc, then the letter 'n' appears x<sub>1</sub> + x<sub>7</sub> + 2x<sub>9</sub> times. Each \"one\" or \"seven\" contributes one 'n', each \"nine\" contributes two 'n', and the other digits don't contribute any 'n'. Now for example if the input is `s = \"owoztneoer\"` then we have one 'n' and thus we have the equation **x<sub>1</sub> + x<sub>7</sub> + 2x<sub>9</sub> = 1**. Doing this for all 26 letters gives us 26 equations which we can write as a matrix equation `Ax = b`.\\n\\n- `A` is the 26&times;10 matrix with a<sub>i,j</sub> telling how often the i-th alphabet letter appears in the j-th digit name.\\n- `b` is the vector of size 26 with b<sub>i</sub> telling how often the i-th alphabet letter appears in the given `s`.\\n- `x` is the vector of size 10 with x<sub>i</sub> telling how often the i-th digit is encoded in the given `s`.\\n\\n---\\n\\n**Alternatives**\\n\\nSince `A` is always the same (doesn't depend on `s`), we can precompute it so it doesn't get computed every time our function is called:\\n```\\nrequire 'matrix'\\nA = ('a'..'z').map { |c| \"zero one two three four five six seven eight nine\".split.map { |w| w.count(c) } }\\nSolve = Matrix[*A].lup.method(:solve)\\n\\ndef original_digits(s)\\n  x = Solve[('a'..'z').map { |c| s.count(c) }]\\n  (0..9).map { |i| i.to_s * x[i] }.join\\nend\\n```\\nCould even make the actual function a one-liner then:\\n```\\ndef original_digits(s)\\n  Solve[('a'..'z').map { |c| s.count(c) }][0..9].map.with_index { |x, i| i.to_s * x }.join\\nend\\n```"
		},
		{
			"lc_ans_id":"91232",
			"view":"1727",
			"top":"5",
			"title":"C++ O(n) solution",
			"vote":"5",
			"content":"    class Solution {\\n    public:\\n        string originalDigits(string s) {\\n            vector<int> a(10, 0);\\n            vector<int> alpha(128, 0);\\n            for (char c : s)\\n                alpha[c]++;\\n            a[0] = alpha['z'];\\n            a[2] = alpha['w'];\\n            a[4] = alpha['u'];\\n            a[6] = alpha['x'];\\n            a[8] = alpha['g'];\\n            a[3] = alpha['h'] - a[8];\\n            a[5] = alpha['f'] - a[4];\\n            a[7] = alpha['v'] - a[5];\\n            a[1] = alpha['o'] - a[0] - a[2] - a[4];\\n            a[9] = alpha['i'] - a[5] - a[6] - a[8];\\n            string ans;\\n            for (int i = 0; i < 10; i++) {\\n                if (a[i] > 0)\\n                    ans += string(a[i], '0' + i);\\n            }\\n            return ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"91214",
			"view":"545",
			"top":"6",
			"title":"Stupid but easy understanding C++ solution",
			"vote":"4",
			"content":"```\\nclass Solution {\\npublic:\\n    string originalDigits(string s) {\\n        vector<int> res(10, 0);\\n        vector<int> cache(26, 0);\\n        for (auto ch : s) \\n            cache[ch - 'a']++;\\n        res[0] = cache['z' - 'a'];\\n        res[2] = cache['w' - 'a'];\\n        res[4] = cache['u' - 'a'];\\n        res[6] = cache['x' - 'a'];\\n        res[8] = cache['g' - 'a'];\\n        res[3] = cache['h' - 'a'] - res[8];\\n        res[7] = cache['s' - 'a'] - res[6];\\n        res[5] = cache['v' - 'a'] - res[7];\\n        res[1] = cache['o' - 'a'] - (res[0] + res[2] + res[4]);\\n        res[9] = (cache['n' - 'a'] - (res[1] + res[7])) / 2;\\n        string str = \"\";\\n        for (int i = 0; i < 10; i++) \\n            if (res[i]) \\n                str += string(res[i], i + '0');\\n        return str;    \\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"91233",
			"view":"310",
			"top":"7",
			"title":"Jave find unique char in each number and remove",
			"vote":"2",
			"content":"```\\npublic class Solution {\\n    public String originalDigits(String s) {\\n        int[] frequency = new int[26];\\n        for (char c : s.toCharArray()) {\\n            frequency[c - 'a']++;\\n        }\\n        List<Character> list = new ArrayList<>();\\n        removeDigit('z', '0', \"zero\", list, frequency);\\n        removeDigit('w', '2', \"two\", list, frequency);\\n        removeDigit('u', '4', \"four\", list, frequency);\\n        removeDigit('x', '6', \"six\", list, frequency);\\n        removeDigit('g', '8', \"eight\", list, frequency);\\n        removeDigit('o', '1', \"one\", list, frequency);\\n        removeDigit('h', '3', \"three\", list, frequency);\\n        removeDigit('f', '5', \"five\", list, frequency);\\n        removeDigit('s', '7', \"seven\", list, frequency);\\n        removeDigit('n', '9', \"nine\", list, frequency);\\n        \\n        Collections.sort(list);\\n        StringBuilder result = new StringBuilder();\\n        for (char c : list) {\\n            result.append(c);\\n        }\\n        return new String(result);\\n    }\\n    \\n    private void removeDigit(char symbol, char digit, String number, List<Character> list, int[] frequency) {\\n        while (frequency[symbol - 'a'] > 0) {\\n            list.add(digit);\\n            for (char c : number.toCharArray()) {\\n                frequency[c - 'a']--;\\n            }\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"91249",
			"view":"522",
			"top":"8",
			"title":"JAVA easy to understand + explanation",
			"vote":"2",
			"content":"Digits are uniquely identified by their letters as follows: first we eliminate the numbers **z**ero, t**w**o, fo**u**r, si**x,** ei**g**ht which are uniquely identified by their bolded character from all the possible digit strings. Next we  eliminate all occurences of digits: **o**ne, t**h**ree, **f**ive  cause out of the remaining digits these are uniquely identified by their respective bold characters. Lastly we are left with n**i**ne and se**v**en which are again identified by their i and v respectively.\\n\\n\\n\\n\\n                         \\n\\n\\n\\n    \\n    void getDigitByChar(char c, String digitString, int digit,  HashMap<Character,Integer> hm, List<Integer> ret)\\n    {\\n        if(hm.containsKey(c)){\\n            int nr=hm.get(c);\\n            for(char x : digitString.toCharArray()){\\n                hm.put(x, hm.get(x)-nr);\\n                if(hm.get(x)==0) hm.remove(x);\\n            }\\n             while(nr>0){\\n                 ret.add(digit); \\n                 nr--;\\n             }\\n        }\\n    }\\n    \\n    public String originalDigits(String s) \\n    {\\n        List<Integer> ret = new LinkedList<Integer>();\\n        HashMap<Character,Integer> hm = new HashMap<Character,Integer>();\\n        for(char c : s.toCharArray()){\\n            if(!hm.containsKey(c)) hm.put(c,0);\\n            hm.put(c,hm.get(c)+1);\\n        }\\n        getDigitByChar('z',\"zero\",0,hm,ret);\\n        getDigitByChar('w',\"two\",2,hm,ret);\\n        getDigitByChar('u',\"four\",4,hm,ret);\\n        getDigitByChar('x',\"six\",6,hm,ret);\\n        getDigitByChar('g',\"eight\",8,hm,ret);\\n        getDigitByChar('o',\"one\",1,hm,ret);\\n        getDigitByChar('h',\"three\",3,hm,ret);\\n        getDigitByChar('f',\"five\",5,hm,ret);\\n        getDigitByChar('v',\"seven\",7,hm,ret);\\n        getDigitByChar('i',\"nine\",9,hm,ret);\\n    \\n        Collections.sort(ret);\\n        String result=\"\";\\n        for(int x: ret) result+=x;\\n        \\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"91211",
			"view":"110",
			"top":"9",
			"title":"JavaScript O(n) solution",
			"vote":"1",
			"content":"```\\nvar originalDigits = function(s) {\\n    const words = { 'z': 'zero', 'x': 'six', 'w': 'two', 'u': 'four', 'g': 'eight', 's': 'seven', 'v': 'five', 'r': 'three', 'o': 'one', 'n': 'nine' };\\n    const nums = { 'z': 0, 'x': 6, 'w': 2, 'u': 4, 'g': 8, 's': 7, 'v': 5, 'r': 3, 'o': 1, 'n': 9 };\\n    let order = 'zxwugsvron';\\n    const counts = {};\\n    for (let c of s) {\\n        counts[c] = (counts[c] || 0) + 1;\\n    }\\n    const res = new Array(10);\\n    for (let key of order) {\\n        while (counts[key]) {\\n            for (let w of words[key]) {\\n                counts[w]--;\\n            }\\n            res[nums[key]] = (res[nums[key]] || '') + nums[key];\\n        }\\n    }\\n    return res.join('');\\n};\\n```\\nNot particularly fast on the OJ histogram but does the job in linear time and space."
		}
	],
	"id":"423",
	"title":"Reconstruct Original Digits from English",
	"content":"<p>Given a <b>non-empty</b> string containing an out-of-order English representation of digits <code>0-9</code>, output the digits in ascending order.</p>\r\n\r\n<p><b>Note:</b><br />\r\n<ol>\r\n<li>Input contains only lowercase English letters.</li>\r\n<li>Input is guaranteed to be valid and can be transformed to its original digits. That means invalid inputs such as \"abc\" or \"zerone\" are not permitted.</li>\r\n<li>Input length is less than 50,000.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\nInput: \"owoztneoer\"\r\n\r\nOutput: \"012\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\nInput: \"fviefuro\"\r\n\r\nOutput: \"45\"\r\n</pre>\r\n</p>",
	"frequency":"177",
	"ac_num":"13639"
}