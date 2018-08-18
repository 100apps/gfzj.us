{
	"difficulty":"2",
	"submit_num":"273313",
	"show_id":"187",
	"leetcode_id":"187",
	"answers":[
		{
			"lc_ans_id":"53867",
			"view":"32330",
			"top":"0",
			"title":"Clean Java solution (hashmap + bits manipulation)",
			"vote":"179",
			"content":"    public List<String> findRepeatedDnaSequences(String s) {\\n        Set<Integer> words = new HashSet<>();\\n        Set<Integer> doubleWords = new HashSet<>();\\n        List<String> rv = new ArrayList<>();\\n        char[] map = new char[26];\\n        //map['A' - 'A'] = 0;\\n        map['C' - 'A'] = 1;\\n        map['G' - 'A'] = 2;\\n        map['T' - 'A'] = 3;\\n\\n        for(int i = 0; i < s.length() - 9; i++) {\\n            int v = 0;\\n            for(int j = i; j < i + 10; j++) {\\n                v <<= 2;\\n                v |= map[s.charAt(j) - 'A'];\\n            }\\n            if(!words.add(v) && doubleWords.add(v)) {\\n                rv.add(s.substring(i, i + 10));\\n            }\\n        }\\n        return rv;\\n    }"
		},
		{
			"lc_ans_id":"53855",
			"view":"21488",
			"top":"1",
			"title":"7 lines simple Java, O(n)",
			"vote":"155",
			"content":"    public List<String> findRepeatedDnaSequences(String s) {\\n        Set seen = new HashSet(), repeated = new HashSet();\\n        for (int i = 0; i + 9 < s.length(); i++) {\\n            String ten = s.substring(i, i + 10);\\n            if (!seen.add(ten))\\n                repeated.add(ten);\\n        }\\n        return new ArrayList(repeated);\\n    }"
		},
		{
			"lc_ans_id":"53877",
			"view":"21010",
			"top":"2",
			"title":"I did it in 10 lines of C++",
			"vote":"140",
			"content":"The main idea is to store the substring as int in map to bypass the memory limits.\\n\\nThere are only four possible character A, C, G, and T, but I want to use 3 bits per letter instead of 2.\\n\\nWhy? It's easier to code.\\n\\nA is 0x41, C is 0x43, G is 0x47, T is 0x54. Still don't see it? Let me write it in octal.\\n\\nA is 0101, C is 0103, G is 0107, T is 0124. The last digit in octal are different for all four letters. That's all we need!\\n\\nWe can simply use `s[i] & 7` to get the last digit which are just the last 3 bits, it's much easier than lookup table or switch or a bunch of if and else, right?\\n\\nWe don't really need to generate the substring from the int. While counting the number of occurrences, we can push the substring into result as soon as the count becomes 2, so there won't be any duplicates in the result.\\n\\n    vector<string> findRepeatedDnaSequences(string s) {\\n        unordered_map<int, int> m;\\n        vector<string> r;\\n        int t = 0, i = 0, ss = s.size();\\n        while (i < 9)\\n            t = t << 3 | s[i++] & 7;\\n        while (i < ss)\\n            if (m[t = t << 3 & 0x3FFFFFFF | s[i++] & 7]++ == 1)\\n                r.push_back(s.substr(i - 10, 10));\\n        return r;\\n    }\\n\\nBTW, the OJ doesn't seems to have test cases which the given string length is smaller than 9, so I didn't check it to make the code simpler.\\n\\nAny suggestions?\\n\\nUpdate:\\n\\nI realised that I can use `s[i] >> 1 & 3` to get 2 bits, but then I won't be able to remove the first loop as 1337c0d3r suggested."
		},
		{
			"lc_ans_id":"53902",
			"view":"11853",
			"top":"3",
			"title":"Short Java \"rolling-hash\" solution",
			"vote":"40",
			"content":"Hi guys!\\n\\nThe idea is to use [rolling hash][1] technique or in case of string search also known as [Rabin-Karp algorithm][2]. As our alphabet A consists of only 4 letters we can be not afraid of collisions. The hash for a current window slice could be found in a constant time by subtracting the former first character times size of the A in the power of 9 and updating remaining hash by the standard rule: hash = hash*A.size() + curr_char.\\n\\nCheck out the Java code below.\\n\\nHope it helps!\\n\\n----------\\n\\n    public class Solution {\\n        private static final Map<Character, Integer> A = new HashMap<>();\\n        static { A.put('A',0); A.put('C',1); A.put('G',2); A.put('T',3); }\\n        private final int A_SIZE_POW_9 = (int) Math.pow(A.size(), 9);\\n    \\n        public List<String> findRepeatedDnaSequences(String s) {\\n            Set<String> res = new HashSet<>();\\n            Set<Integer> hashes = new HashSet<>();\\n            for (int i = 0, rhash = 0; i < s.length(); i++) {\\n                if (i > 9) rhash -= A_SIZE_POW_9 * A.get(s.charAt(i-10));\\n                rhash = A.size() * rhash + A.get(s.charAt(i));\\n                if (i > 8 && !hashes.add(rhash)) res.add(s.substring(i-9,i+1));\\n            }\\n            return new ArrayList<>(res);\\n        }\\n    }\\n\\n  [1]: http://en.wikipedia.org/wiki/Rolling_hash\\n  [2]: http://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm"
		},
		{
			"lc_ans_id":"53964",
			"view":"7027",
			"top":"4",
			"title":"10 lines C++ code, 8 ms passed!",
			"vote":"34",
			"content":"    vector<string> findRepeatedDnaSequences(string s) {\\n        char  hashMap[1048576] = {0};\\n        vector<string> ans;\\n        int len = s.size(),hashNum = 0;\\n        if (len < 11) return ans;\\n        for (int i = 0;i < 9;++i)\\n            hashNum = hashNum << 2 | (s[i] - 'A' + 1) % 5;\\n        for (int i = 9;i < len;++i)\\n            if (hashMap[hashNum = (hashNum << 2 | (s[i] - 'A' + 1) % 5) & 0xfffff]++ == 1)\\n                ans.push_back(s.substr(i-9,10));\\n        return ans;\\n    }"
		},
		{
			"lc_ans_id":"53900",
			"view":"4078",
			"top":"5",
			"title":"Am I understanding the problem wrongly? What about AAAACCCCCA?",
			"vote":"32",
			"content":"Am I understanding the problem wrongly? In the example given in the problem, \\nAren't AAAACCCCCA, AAACCCCCAA, AACCCCCAAA and ACCCCCAAAA valid repetition of sequences as well?"
		},
		{
			"lc_ans_id":"53952",
			"view":"2842",
			"top":"6",
			"title":"20 ms solution (C++) with explanation",
			"vote":"26",
			"content":"One obvious way to do this is to use a hash table mapping strings to counts.  (e.g. H[\"AAAAAAAAAA\"] represents the number of times we have seen AAAAAAAAAA.  This will work in O(n) time, but its useful to discuss why this is not a good solution:\\n\\n - Runtime constant (from hashing): When using a hash table, there is a runtime hit for hashing the string.  In this case, converting the string to a table index.  That will presumably mean looking at each character of the string. Since each character is part of 10 different substrings (other than the end characters), that means 10n character reads.  Still linear, but we can do better on the constant.\\n - Memory (values): There isn't any reason to store a count. Each\\n   possible string has only 3 states we need to track: \"never been\\n   seen\", \"been seen once\", and \"been seen more than once\".  This\\n   requires only two bits to track -- not the 4-8 bytes needed for an\\n   integer.\\n - Memory (keys): A hash table needs to store each key (to resolve collisions).  At 10 bytes per key, thats 10*n bytes -- a potential problem if n is every large, and completely unnecessary.\\n\\nHere is how we address the three problems:\\n\\n**Hashing**: We compute the hash ourselves, but take advantage of the overlapping.  We treat each letter as a two-bit number.  (Arbitrarily, A=0, C=1, G=2, T=3.) We treat ten consecutive letters as a 20-bit integer.  We can calculate the first one with:\\n\\n        int val = 0;\\n        for (int i=0; i < 10; i++)\\n            val = (val << 2) | char2val(s[i]);\\n\\nNow, to compute the next string:\\n\\n       val = ((val << 2) & mask) | char2val(s[10]);\\n\\nWhere:\\n\\n 1. mask: 20 consecutive bits ((1 << 21) -1).  \\n 2. ((val << 2) & mask: shift everything over two bits, and get rid of the most significant bits.\\n 3. ((val << 2) & mask) | char2val(s[10]): Replace the right-most two bits with the character code.\\n\\nMuch faster than looking at every character 10 times.\\n\\n\\n**Hash table**: We instead use two bit-sets.  There are 2^{21}-1 possible strings.  We need a bit in each set for each possible string. The first set (S1) tells us if the string has been seen once or not.  The second set (S2) tell us whether the string has been seen more than once.\\n\\n \\nCode:\\n\\n    vector<string> findRepeatedDnaSequences(string s) {\\n        if (s.size() <= 10)\\n            return vector<string>();\\n            \\n        vector<string> R;\\n        bitset<1<<20> S1;\\n        bitset<1<<20> S2;\\n        \\n        int val = 0;\\n        for (int i=0; i < 10; i++)   // Calc. the has value for the first string.\\n            val = (val << 2) | char2val(s[i]);\\n        S1.set(val);\\n        cout << val << \" | \";\\n        \\n        int mask = (1 << 20) - 1;\\n        for (int i=10; i < s.size(); i++) {\\n            // Calc the hash value for the string ending at position i.\\n            val = ((val << 2) & mask) | char2val(s[i]);  \\n            if (S2[val])\\n                continue;\\n            if (S1[val]) {\\n                R.push_back(s.substr(i-10+1, 10));\\n                S2.set(val);\\n            }\\n            else\\n                S1.set(val);\\n        }\\n        return R;\\n    }\\n    \\n    int char2val(char c) {\\n        switch (c) {\\n            case 'A': return 0;\\n            case 'C': return 1;\\n            case 'G': return 2;\\n            case 'T': return 3;\\n        }\\n     }"
		},
		{
			"lc_ans_id":"53990",
			"view":"2494",
			"top":"7",
			"title":"~11ms Solution with Unified Hash Fxn",
			"vote":"22",
			"content":"Appricate for advice.\\n\\n    vector<string> findRepeatedDnaSequences(string s)\\n    {\\n        vector<string> ret;\\n        if ( s.length() < 11 )\\n        {\\n        \\treturn ret;\\n        }\\n        \\n        char table[1048576] = \"\";\\n        unsigned int hash = 0U;\\n        \\n        for ( size_t i = 0; i < 10; ++i )\\n        {\\n        \\t/** 'A' - 'A' + 1 = 1  = 1 (mod 5)\\n        \\t *  'C' - 'A' + 1 = 3  = 3 (mod 5)\\n        \\t *  'G' - 'A' + 1 = 7  = 2 (mod 5)\\n        \\t *  'T' - 'A' + 1 = 20 = 0 (mod 5)\\n        \\t */\\n        \\thash = ( hash << 2 ) | ( ( s[i] - 'A' + 1 ) % 5 );\\n        }\\n        \\t\\n        table[hash] = 1;\\n        \\n        for ( size_t i = 10; i < s.length(); ++i )\\n        {\\n        \\thash = ( ( hash << 2 )\\n                 ^ ( ( s[ i - 10 ] - 'A' + 1 ) % 5 ) << 20 )\\n                 | ( ( s[i] - 'A' + 1 ) % 5 );\\n        \\t         \\n        \\tif ( table[hash] == 0 )\\n        \\t{\\n        \\t\\ttable[hash] = 1;\\n        \\t}\\n        \\telse if ( table[hash] == 1 )\\n        \\t{\\n        \\t\\ttable[hash] = 2;\\n        \\t\\tret.push_back( string( s, i - 9, 10 ) );\\n        \\t}\\n        }\\n        \\n        return ret;\\n    }"
		},
		{
			"lc_ans_id":"54076",
			"view":"3959",
			"top":"8",
			"title":"Just 7 lines of code!",
			"vote":"20",
			"content":"I am too lazy to design my own hash function; Hence I just used the one provided by C++.\\n\\n\\n\\n \\n\\n    vector<string> findRepeatedDnaSequences(string s) {\\n            \\n            unordered_map<size_t,int> MP;\\n            hash<string> hash_fn;\\n            vector<string> ret;\\n            \\n            for(int i = 0; i < int(s.size()) - 9; ++i)\\n                if(MP[hash_fn(s.substr(i,10))]++ == 1 )\\n                   ret.push_back(s.substr(i,10));\\n                   \\n          return ret;\\n        }"
		},
		{
			"lc_ans_id":"53971",
			"view":"2032",
			"top":"9",
			"title":"Easy understand and straightforward java solution",
			"vote":"19",
			"content":"    public class Solution {\\n        public List<String> findRepeatedDnaSequences(String s) {\\n            List<String> res = new ArrayList<String>();\\n            Set<String> resset = new HashSet<String>();\\n            if(s == null || s.length() <= 10){\\n                return res;\\n            }\\n            Set<String> set = new HashSet<String>();\\n            int len = s.length();\\n            for(int i = 0; i <= len - 10; i++){\\n                String sub = s.substring(i, i + 10);\\n                if(!set.add(sub)){\\n                    resset.add(sub);\\n                }\\n            }\\n            res.addAll(resset);\\n            return res;\\n        }\\n    }\\n\\n\\nmy idea is to get all the possible 10 letter long sequences and put them into set, it the operation failed, it means there are duplicates. so put the sequence into another set(\"AAAAAAAAAAAA\" could have three \"AAAAAAAAAA\" sequences, so this set will remove the duplicates) then add all the set to the final list."
		}
	],
	"id":"187",
	"title":"Repeated DNA Sequences",
	"content":"<p>\r\nAll DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: \"ACGAATTCCG\". When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.</p>\r\n\r\n<p>Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.</p>\r\n\r\n<p>\r\nFor example,</p>\r\n<pre>\r\nGiven s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\",\r\n\r\nReturn:\r\n[\"AAAAACCCCC\", \"CCCCCAAAAA\"].\r\n</pre>",
	"frequency":"459",
	"ac_num":"89285"
}