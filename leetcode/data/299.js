{
	"difficulty":"2",
	"submit_num":"181130",
	"show_id":"299",
	"leetcode_id":"299",
	"answers":[
		{
			"lc_ans_id":"74621",
			"view":"21868",
			"top":"0",
			"title":"One pass Java solution",
			"vote":"217",
			"content":"The idea is to iterate over the numbers in `secret` and in `guess` and count all bulls right away. For cows maintain an array that stores count of the number appearances in `secret` and in `guess`. Increment cows when either number from `secret` was already seen in `guest` or vice versa.\\n\\n\\n    public String getHint(String secret, String guess) {\\n        int bulls = 0;\\n        int cows = 0;\\n        int[] numbers = new int[10];\\n        for (int i = 0; i<secret.length(); i++) {\\n            int s = Character.getNumericValue(secret.charAt(i));\\n            int g = Character.getNumericValue(guess.charAt(i));\\n            if (s == g) bulls++;\\n            else {\\n                if (numbers[s] < 0) cows++;\\n                if (numbers[g] > 0) cows++;\\n                numbers[s] ++;\\n                numbers[g] --;\\n            }\\n        }\\n        return bulls + \"A\" + cows + \"B\";\\n    }\\n\\nA slightly more concise version:\\n\\n    public String getHint(String secret, String guess) {\\n        int bulls = 0;\\n        int cows = 0;\\n        int[] numbers = new int[10];\\n        for (int i = 0; i<secret.length(); i++) {\\n            if (secret.charAt(i) == guess.charAt(i)) bulls++;\\n            else {\\n                if (numbers[secret.charAt(i)-'0']++ < 0) cows++;\\n                if (numbers[guess.charAt(i)-'0']-- > 0) cows++;\\n            }\\n        }\\n        return bulls + \"A\" + cows + \"B\";\\n    }"
		},
		{
			"lc_ans_id":"74618",
			"view":"7080",
			"top":"1",
			"title":"[C++] 4ms Straight forward solution two pass O(N) time",
			"vote":"42",
			"content":"The idea is simple, if two char is match, add aCnt, otherwise, record it and process bCnt in second pass.\\n\\n    class Solution {\\n    public:\\n        // only contains digits \\n        string getHint(string secret, string guess) {\\n            int aCnt = 0;\\n            int bCnt = 0;\\n            vector<int> sVec(10, 0); // 0 ~ 9 for secret\\n            vector<int> gVec(10, 0); // 0 ~ 9 for guess \\n            if (secret.size() != guess.size() || secret.empty()) { return \"0A0B\"; }\\n            for (int i = 0; i < secret.size(); ++i) {\\n                char c1 = secret[i]; char c2 = guess[i];\\n                if (c1 == c2) {\\n                    ++aCnt; \\n                } else {\\n                    ++sVec[c1-'0'];\\n                    ++gVec[c2-'0'];\\n                }\\n            }\\n            // count b \\n            for (int i = 0; i < sVec.size(); ++i) {\\n                bCnt += min(sVec[i], gVec[i]);\\n            }\\n            return to_string(aCnt) + 'A' + to_string(bCnt) + 'B';\\n        }\\n    };"
		},
		{
			"lc_ans_id":"74629",
			"view":"4157",
			"top":"2",
			"title":"My 3ms Java solution may help u",
			"vote":"34",
			"content":"    public class Solution {\\n        public String getHint(String secret, String guess) {\\n            int len = secret.length();\\n    \\t\\tint[] secretarr = new int[10];\\n    \\t\\tint[] guessarr = new int[10];\\n    \\t\\tint bull = 0, cow = 0;\\n    \\t\\tfor (int i = 0; i < len; ++i) {\\n    \\t\\t\\tif (secret.charAt(i) == guess.charAt(i)) {\\n    \\t\\t\\t\\t++bull;\\n    \\t\\t\\t} else {\\n    \\t\\t\\t\\t++secretarr[secret.charAt(i) - '0'];\\n    \\t\\t\\t\\t++guessarr[guess.charAt(i) - '0'];\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\tfor (int i = 0; i < 10; ++i) {\\n    \\t\\t\\tcow += Math.min(secretarr[i], guessarr[i]);\\n    \\t\\t}\\n    \\t\\treturn \"\" + bull + \"A\" + cow + \"B\";\\n        }\\n    }"
		},
		{
			"lc_ans_id":"74644",
			"view":"4629",
			"top":"3",
			"title":"Python 3 lines solution",
			"vote":"34",
			"content":"use `Counter` to count `guess` and `secret` and sum their overlap. Then use `zip` to count `A`.\\n\\n        s, g = Counter(secret), Counter(guess)\\n        a = sum(i == j for i, j in zip(secret, guess))\\n        return '%sA%sB' % (a, sum((s & g).values()) - a)"
		},
		{
			"lc_ans_id":"74735",
			"view":"3434",
			"top":"4",
			"title":"Very easy solution using two arrays",
			"vote":"28",
			"content":"    public class Solution {\\n    public String getHint(String secret, String guess) {\\n        int temp = 0;\\n        int bulls = 0;\\n        int[] nums1 = new int[10];\\n        int[] nums2 = new int[10];\\n        for(int i = 0; i < secret.length(); i++){\\n            char s = secret.charAt(i);\\n            char g = guess.charAt(i);\\n            if(s == g){\\n                bulls++;\\n            }\\n            else{\\n                nums1[s - '0']++;\\n                nums2[g - '0']++;\\n            }\\n        }\\n        int cows = 0;\\n        for(int i = 0; i < 10; i++){\\n            cows += Math.min(nums1[i], nums2[i]);\\n        }\\n        String res = bulls + \"A\" + cows + \"B\";\\n        return res;\\n    }\\n}"
		},
		{
			"lc_ans_id":"74616",
			"view":"3151",
			"top":"5",
			"title":"3 lines in Python",
			"vote":"25",
			"content":"    def getHint(self, secret, guess):\\n        bulls = sum(map(operator.eq, secret, guess))\\n        both = sum(min(secret.count(x), guess.count(x)) for x in '0123456789')\\n        return '%dA%dB' % (bulls, both - bulls)"
		},
		{
			"lc_ans_id":"74788",
			"view":"1626",
			"top":"6",
			"title":"Java solution with two buckets",
			"vote":"23",
			"content":"    public class Solution {\\n        public String getHint(String secret, String guess) {\\n            int bull = 0, cow = 0;\\n            \\n            int[] sarr = new int[10];\\n            int[] garr = new int[10];\\n            \\n            for(int i = 0; i < secret.length(); i++){\\n                if(secret.charAt(i) != guess.charAt(i)){\\n                    sarr[secret.charAt(i)-'0']++;\\n                    garr[guess.charAt(i)-'0']++;\\n                }else{\\n                    bull++;\\n                }\\n            }\\n            \\n            for(int i = 0; i <= 9; i++){\\n                cow += Math.min(sarr[i], garr[i]);\\n            }\\n            \\n            return (bull + \"A\" + cow + \"B\");\\n        }\\n    }"
		},
		{
			"lc_ans_id":"74716",
			"view":"1650",
			"top":"7",
			"title":"Java solution without hashing, 3ms",
			"vote":"18",
			"content":"public String getHint(String secret, String guess) {\\n        \\n        if(secret.length() == 0){return \"0A0B\";}\\n        \\n        int bull = 0;\\n        int cow = 0;\\n        int [] result = new int [10];\\n        \\n        for(int i = 0;i<secret.length();i++)\\n        {\\n            int x = secret.charAt(i) - 48;\\n            int y = guess.charAt(i) - 48;\\n            \\n            if(x == y)\\n            {\\n                bull++;\\n            }\\n            else\\n            {\\n                if(result[x] < 0){cow++;}\\n                result[x]++;\\n                \\n                if(result[y] > 0){cow++;}\\n                result[y]--;\\n            }\\n        }\\n        \\n        return bull+\"A\"+cow+\"B\";\\n        \\n    }"
		},
		{
			"lc_ans_id":"74820",
			"view":"1836",
			"top":"8",
			"title":"C++, one pass, O(N) time, O(1) space",
			"vote":"11",
			"content":"    class Solution {\\n    public:\\n        string getHint(string secret, string guess) {\\n            unordered_map<char, int> s_map;\\n            unordered_map<char, int> g_map;\\n            int n = secret.size();\\n            int A = 0, B = 0;\\n            for (int i = 0; i < n; i++)\\n            {\\n                char s = secret[i], g = guess[i];\\n                if (s == g)\\n                    A++;\\n                else\\n                {\\n                    (s_map[g] > 0) ? s_map[g]--, B++ : g_map[g]++;\\n                    (g_map[s] > 0) ? g_map[s]--, B++ : s_map[s]++; \\n                }\\n            }\\n            return to_string(A) + \"A\" + to_string(B) + \"B\";;\\n        }         \\n    };"
		},
		{
			"lc_ans_id":"74722",
			"view":"658",
			"top":"9",
			"title":"Python simple solution",
			"vote":"10",
			"content":"    class Solution(object):\\n        def getHint(self, secret, guess):\\n            \"\"\"\\n            :type secret: str\\n            :type guess: str\\n            :rtype: str\\n            \"\"\"\\n            bulls = 0\\n            l1, l2 = [0]*10, [0]*10\\n            nums1, nums2 = map(int, secret), map(int, guess)\\n            length = len(secret)\\n            for i in xrange(length):\\n                if nums1[i] == nums2[i]:\\n                    bulls += 1\\n                else:\\n                    l1[nums1[i]] += 1\\n                    l2[nums2[i]] += 1\\n            cows = sum(map(min, zip(l1,l2)))\\n            return '%dA%dB' % (bulls, cows)"
		}
	],
	"id":"299",
	"title":"Bulls and Cows",
	"content":"<p>You are playing the following <a href=\"https://en.wikipedia.org/wiki/Bulls_and_Cows\" target=\"_blank\">Bulls and Cows</a> game with your friend: You write down a number and ask your friend to guess what the number is. Each time your friend makes a guess, you provide a hint that indicates how many digits in said guess match your secret number exactly in both digit and position (called \"bulls\") and how many digits match the secret number but locate in the wrong position (called \"cows\"). Your friend will use successive guesses and hints to eventually derive the secret number.</p>\r\n\r\n<p>\r\nFor example:\r\n<pre>\r\nSecret number:  \"1807\"\r\nFriend's guess: \"7810\"\r\n</pre>\r\nHint: <code>1</code> bull and <code>3</code> cows. (The bull is <code>8</code>, the cows are <code>0</code>, <code>1</code> and <code>7</code>.)\r\n</p>\r\n\r\n<p>Write a function to return a hint according to the secret number and friend's guess, use <code>A</code> to indicate the bulls and <code>B</code> to indicate the cows. In the above example, your function should return <code>\"1A3B\"</code>. </p>\r\n\r\n<p>Please note that both secret number and friend's guess may contain duplicate digits, for example:\r\n<pre>\r\nSecret number:  \"1123\"\r\nFriend's guess: \"0111\"\r\n</pre>\r\nIn this case, the 1st <code>1</code> in friend's guess is a bull, the 2nd or 3rd <code>1</code> is a cow, and your function should return <code>\"1A1B\"</code>.\r\n</p>\r\n\r\n<p>You may assume that the secret number and your friend's guess only contain digits, and their lengths are always equal.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/jeantimex\">@jeantimex</a> for adding this problem and creating all test cases.</p>",
	"frequency":"393",
	"ac_num":"64512"
}