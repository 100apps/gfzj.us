{
	"difficulty":"1",
	"submit_num":"70855",
	"show_id":"266",
	"leetcode_id":"266",
	"answers":[
		{
			"lc_ans_id":"69582",
			"view":"11382",
			"top":"0",
			"title":"Java solution w/Set, one pass, without counters.",
			"vote":"106",
			"content":"The idea is to iterate over string, adding current character to `set` if `set` doesn't contain that character, or removing current character from `set` if `set` contains it.\\nWhen the iteration is finished, just return `set.size()==0 || set.size()==1`.\\n\\n`set.size()==0` corresponds to the situation when there are even number of any character in the string, and\\n`set.size()==1` corresponsds to the fact that there are even number of any character except one.\\n\\n    public class Solution {\\n        public boolean canPermutePalindrome(String s) {\\n            Set<Character> set=new HashSet<Character>();\\n            for(int i=0; i<s.length(); ++i){\\n                if (!set.contains(s.charAt(i)))\\n                    set.add(s.charAt(i));\\n                else \\n                    set.remove(s.charAt(i));\\n            }\\n            return set.size()==0 || set.size()==1;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"69574",
			"view":"8608",
			"top":"1",
			"title":"1-4 lines Python, Ruby, C++, C, Java",
			"vote":"52",
			"content":"Just check that no more than one character appears an odd number of times. Because if there is one, then it must be in the middle of the palindrome. So we can't have two of them.\\n\\n**Python**\\n\\nFirst count all characters in a `Counter`, then count the odd ones.\\n\\n    def canPermutePalindrome(self, s):\\n        return sum(v % 2 for v in collections.Counter(s).values()) < 2\\n\\n**Ruby**\\n\\nUsing an integer as a bitset (Ruby has arbitrarily large integers).\\n\\n    def can_permute_palindrome(s)\\n      x = s.chars.map { |c| 1 << c.ord }.reduce(0, :^)\\n      x & x-1 == 0\\n    end\\n\\n**C++**\\n\\nUsing a bitset.\\n\\n    bool canPermutePalindrome(string s) {\\n        bitset<256> b;\\n        for (char c : s)\\n            b.flip(c);\\n        return b.count() < 2;\\n    }\\n\\n**C**\\n\\nTricky one. Increase `odds` when the increased counter is odd, decrease it otherwise.\\n\\n    bool canPermutePalindrome(char* s) {\\n        int ctr[256] = {}, odds = 0;\\n        while (*s)\\n            odds += ++ctr[*s++] & 1 ? 1 : -1;\\n        return odds < 2;\\n    }\\n\\nThanks to jianchao.li.fighter for pointing out a nicer way in the comments to which I switched now because it's clearer and faster. Some speed test results (see comments for details):\\n\\n            odds += ++ctr[*s++] % 2 * 2 - 1;       // 1499 ms mean-of-five (my original)\\n            odds += (ctr[*s++] ^= 1) * 2 - 1;      // 1196 ms mean-of-five\\n            odds += ++ctr[*s++] % 2 ? 1 : -1;      // 1108 ms mean-of-five\\n            odds += ((++ctr[*s++] & 1) << 1) - 1;  // 1217 ms mean-of-five\\n            odds += ++ctr[*s++] & 1 ? 1 : -1;      // 1132 ms mean-of-five\\n\\n**Java**\\n\\nUsing a BitSet.\\n\\n    public boolean canPermutePalindrome(String s) {\\n        BitSet bs = new BitSet();\\n        for (byte b : s.getBytes())\\n            bs.flip(b);\\n        return bs.cardinality() < 2;\\n    }"
		},
		{
			"lc_ans_id":"69600",
			"view":"3693",
			"top":"2",
			"title":"5-lines simple JAVA solution with explanation",
			"vote":"21",
			"content":"**Explanation**\\n\\nThe basic idea is using HashSet to find the number of single characters, which should be at most 1.\\n\\n    public boolean canPermutePalindrome(String s) {\\n    \\tSet<Character>set = new HashSet<Character>();\\n    \\tfor (char c : s.toCharArray())  \\n    \\t\\tif (set.contains(c)) set.remove(c);// If char already exists in set, then remove it from set\\n    \\t\\telse set.add(c);// If char doesn't exists in set, then add it to set\\n    \\treturn set.size() <= 1;\\n    }"
		},
		{
			"lc_ans_id":"69684",
			"view":"1334",
			"top":"3",
			"title":"Python easy to follow solution.",
			"vote":"9",
			"content":"    \\n    def canPermutePalindrome(self, s):\\n        dic = {}\\n        for item in s:\\n            dic[item] = dic.get(item, 0) + 1\\n        # return sum(v % 2 for v in dic.values()) < 2\\n        count1 = 0\\n        for val in dic.values():\\n            if val % 2 == 1:\\n                count1 += 1\\n            if count1 > 1:\\n                return False\\n        return True"
		},
		{
			"lc_ans_id":"69636",
			"view":"2430",
			"top":"4",
			"title":"Java AC 8 lines",
			"vote":"6",
			"content":"    public class Solution {\\n        public boolean canPermutePalindrome(String s) {\\n            char[] A = new char[256];\\n            int count=0;\\n            for(int i=0; i<s.length(); i++){\\n                if(A[s.charAt(i)]>0)A[s.charAt(i)]--;\\n                else A[s.charAt(i)]++;\\n            }\\n            for(int i=0; i<256; i++){\\n                if(A[i]!=0)count++;\\n            }\\n            return count<=1;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"69591",
			"view":"1169",
			"top":"5",
			"title":"My simple C++ solution, using a hash-like data structure",
			"vote":"5",
			"content":"    bool canPermutePalindrome(string s) {\\n        int dict[256] = {0};\\n        for (auto c: s)\\n            dict[c]++;\\n        int cnt = 0;\\n        for (int i=0; i<256; i++){\\n            if (dict[i] % 2 != 0)   cnt++;\\n        }\\n        \\n        return cnt<=1;\\n    }"
		},
		{
			"lc_ans_id":"69599",
			"view":"144",
			"top":"6",
			"title":"java 6 lines with boolean[]",
			"vote":"4",
			"content":"    public boolean canPermutePalindrome(String s) {\\n        boolean[] map = new boolean[256];\\n        int count = 0;\\n        for (char c : s.toCharArray()) {\\n            count += map[c] ? -1 : 1;\\n            map[c] = !map[c];\\n        }\\n        return count <= 1;\\n    }"
		},
		{
			"lc_ans_id":"69647",
			"view":"659",
			"top":"7",
			"title":"Java 1ms O(n) time, O(1) space solution.",
			"vote":"4",
			"content":"To achieve O(1) space, an int array is used to count how many time each char has appeared. Notice that the array is of length 128, which holds only for standard ASCII chars.\\n\\n    public boolean canPermutePalindrome(String s) {\\n        if (s == null || s.length() == 0) {\\n            return false;\\n        }\\n        \\n        int[] chars = new int[128];\\n        for (char c : s.toCharArray()) {\\n            chars[(int) c]++;\\n        }\\n        \\n        int count = 0;\\n        for (int i : chars) {\\n            if (i % 2 == 1) {\\n                count++;\\n            }\\n        }\\n        if (count > 1) {\\n            return false;\\n        }\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"69640",
			"view":"620",
			"top":"8",
			"title":"Using char[] instead of map",
			"vote":"4",
			"content":"Here is my one pass char[] solution. Using char[] could be faster than map.\\n\\n    public class Solution {\\n        public boolean canPermutePalindrome(String s) {\\n            int[] mem = new int[256];\\n            char[] cs = s.toCharArray();\\n            for (int i = 0; i < cs.length; i++) {\\n                mem[cs[i]]++;\\n            }\\n            boolean flag = true;\\n            for (int i = 0; i < mem.length; i++) {\\n                if (flag) {\\n                    if (mem[i]%2 != 0) {\\n                        flag = false;\\n                    }\\n                } else {\\n                    if (mem[i]%2 != 0) {\\n                        return false;\\n                    }\\n                }\\n            }\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"69630",
			"view":"1624",
			"top":"9",
			"title":"Simple 4 lines C++ solution",
			"vote":"4",
			"content":"    bool canPermutePalindrome(string s) {\\n        bitset<26> bs;\\n        for (auto ch : s)\\n            bs[ch - 'a'].flip();\\n        return (bs.count() <= 1);\\n    }"
		}
	],
	"id":"266",
	"title":"Palindrome Permutation",
	"content":"<p>Given a string, determine if a permutation of the string could form a palindrome.</p>\r\n\r\n<p>For example,<br>\r\n<code>\"code\"</code> -> False, <code>\"aab\"</code> -> True, <code>\"carerac\"</code> -> True.\r\n</p>",
	"frequency":"261",
	"ac_num":"41052"
}