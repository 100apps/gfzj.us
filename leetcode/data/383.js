{
	"difficulty":"1",
	"submit_num":"151099",
	"show_id":"383",
	"leetcode_id":"383",
	"answers":[
		{
			"lc_ans_id":"85783",
			"view":"24226",
			"top":"0",
			"title":"Java O(n) Solution---Easy to understand",
			"vote":"89",
			"content":"```\\npublic class Solution {\\n    public boolean canConstruct(String ransomNote, String magazine) {\\n        int[] arr = new int[26];\\n        for (int i = 0; i < magazine.length(); i++) {\\n            arr[magazine.charAt(i) - 'a']++;\\n        }\\n        for (int i = 0; i < ransomNote.length(); i++) {\\n            if(--arr[ransomNote.charAt(i)-'a'] < 0) {\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85837",
			"view":"8103",
			"top":"1",
			"title":"O(m+n) one-liner Python",
			"vote":"24",
			"content":"O(m+n) with m and n being the lengths of the strings.\\n\\n    def canConstruct(self, ransomNote, magazine):\\n        return not collections.Counter(ransomNote) - collections.Counter(magazine)"
		},
		{
			"lc_ans_id":"85881",
			"view":"6247",
			"top":"2",
			"title":"Java Map solution",
			"vote":"17",
			"content":"```\\n public boolean canConstruct(String ransomNote, String magazine) {\\n        Map<Character, Integer> magM = new HashMap<>();\\n        for (char c:magazine.toCharArray()){\\n            int newCount = magM.getOrDefault(c, 0)+1;\\n            magM.put(c, newCount);\\n        }\\n        for (char c:ransomNote.toCharArray()){\\n            int newCount = magM.getOrDefault(c,0)-1;\\n            if (newCount<0)\\n                return false;\\n            magM.put(c, newCount);\\n        }\\n        return true;\\n    }\\n```"
		},
		{
			"lc_ans_id":"85801",
			"view":"5598",
			"top":"3",
			"title":"Share My Easy to Understand 5 lines of Java Code, 13ms beats 96%",
			"vote":"16",
			"content":"The code is fast mainly because it uses the ASCII value of the char in the string as the index of an array, resulting in direct access and thus significantly increases efficiency of the algorithm.\\n```\\npublic boolean canConstruct(String ransomNote, String magazine) {\\n    int[] table = new int[128];\\n    for (char c : magazine.toCharArray())   table[c]++;\\n    for (char c : ransomNote.toCharArray())\\n        if (--table[c] < 0) return false;\\n    return true;\\n}\\n```\\nIf you think the above code has created some unnecessary spaces, the following code may be what you are looking for\\n```\\npublic boolean canConstruct2(String ransomNote, String magazine) {\\n    int[] table = new int[26];\\n    for (char c : magazine.toCharArray())   table[c - 'a']++;\\n    for (char c : ransomNote.toCharArray())\\n        if (--table[c - 'a'] < 0) return false;\\n    return true;\\n}\\n```\\nHere's another solution using Hash Map. Same idea, just using different data structures. And this solution obviously is less efficient than previous two.\\n```\\npublic boolean canConstruct3(String ransomNote, String magazine) {\\n    Map<Character, Integer> map = new HashMap<>();\\n    for (char c : magazine.toCharArray()) {\\n        int count = map.containsKey(c) ? map.get(c) + 1 : 1;\\n        map.put(c, count);\\n    }\\n    for (char c : ransomNote.toCharArray()) {\\n        int newCount = map.containsKey(c) ? map.get(c) - 1 : -1;\\n        if (newCount == -1) return false;\\n        map.put(c, newCount);\\n    }\\n    return true;\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"85822",
			"view":"5035",
			"top":"4",
			"title":"Two AC C++ solutions (unordered_map/vector)",
			"vote":"15",
			"content":"The complexity is O(N), N is the length of magazine. \\n```\\nclass Solution {\\npublic:\\n    bool canConstruct(string ransomNote, string magazine) {\\n        unordered_map<char, int> map(26);\\n        for (int i = 0; i < magazine.size(); ++i)\\n            ++map[magazine[i]];\\n        for (int j = 0; j < ransomNote.size(); ++j)\\n            if (--map[ransomNote[j]] < 0)\\n                return false;\\n        return true;\\n    }\\n};\\n```\\n\\nOr you can use a vector with size 26 instead of an unordered_map.\\n\\n```\\nclass Solution {\\npublic:\\n    bool canConstruct(string ransomNote, string magazine) {\\n        vector<int> vec(26, 0);\\n        for (int i = 0; i < magazine.size(); ++i)\\n            ++vec[magazine[i] - 'a'];\\n        for (int j = 0; j < ransomNote.size(); ++j)\\n            if (--vec[ransomNote[j] - 'a'] < 0)\\n                return false;\\n        return true;\\n    }\\n};\\n```\\n\\nI remember that there are two variations of this question, perhaps they will come in the next few days :)\\n1. If you can only pick letters from the magazine in order.\\n2. If the magazine is double sided."
		},
		{
			"lc_ans_id":"85757",
			"view":"1855",
			"top":"5",
			"title":"python,set(),count()",
			"vote":"9",
			"content":"```python\\nclass Solution(object):\\n    def canConstruct(self, ransomNote, magazine):\\n        \"\"\"\\n        :type ransomNote: str\\n        :type magazine: str\\n        :rtype: bool\\n        \"\"\"\\n        for i in set(ransomNote):\\n            if ransomNote.count(i) > magazine.count(i):\\n                return False\\n        return True\\n```"
		},
		{
			"lc_ans_id":"85940",
			"view":"1052",
			"top":"6",
			"title":"Many different ways: 1-liners, 2-liners & Concise 4-liner in Python, 80ms",
			"vote":"7",
			"content":"Trivial but the shortest method:\\n```\\nclass Solution(object):\\n    def canConstruct(self, ransomNote, magazine):\\n        return all(ransomNote.count(c)<=magazine.count(c) for c in ransomNote)\\n```\\nBased on the trivial method, we can use ```set``` to avoid some duplication. This works amazingly fast for the test cases. \\n```\\nclass Solution(object):\\n    def canConstruct(self, ransomNote, magazine):\\n        return all(ransomNote.count(c)<=magazine.count(c) for c in set(ransomNote))\\n```\\nOr even exploiting the given condition that there are only small letters:\\n```\\nclass Solution(object):\\n    def canConstruct(self, ransomNote, magazine):\\n        return all(ransomNote.count(c)<=magazine.count(c) for c in string.ascii_lowercase)\\n```\\nIt gave me 80 ms, the fastest method listed here.\\n\\n=================================\\n\\nOk, here come some more \"proper\" ways. Proper, as in they don't assume anything about the alphabet.\\n\\nProper Method 1: Use Counter and compare letters' counts:\\n```\\nclass Solution(object):\\n    def canConstruct(self, ransomNote, magazine):\\n        c1, c2 = collections.Counter(ransomNote), collections.Counter(magazine)\\n        return all(k in c2 and c2[k]>=c1[k] for k in c1)\\n```\\n\\n\\nProper Method 2: Sort the strings and do a traversal.\\n```\\nclass Solution(object):\\n    def canConstruct(self, ransomNote, magazine):\\n        s, i = sorted(ransomNote), 0\\n        for c in sorted(magazine):\\n            i += i<len(s) and s[i]==c\\n        return i==len(s)\\n```\\nLonger but easier to understand version. There is an extra check ```c>s1[i]``` for faster termination, but it's not really faster for the test cases here.\\n```\\nclass Solution(object):\\n    def canConstruct(self, ransomNote, magazine):\\n        s1, s2, i = sorted(ransomNote), sorted(magazine), 0\\n        for c in s2:\\n            if i==len(s1) or c>s1[i]:\\n                break\\n            if c==s1[i]:\\n                i += 1\\n        return i==len(s1)\\n```"
		},
		{
			"lc_ans_id":"85772",
			"view":"512",
			"top":"7",
			"title":"My javascript solution",
			"vote":"6",
			"content":"```\\n\\nvar canConstruct = function(ransomNote, magazine) {\\n    if (ransomNote.length > magazine.length) { return false; }\\n    var ransomNoteArr = ransomNote.split('');\\n    var oldMagazineLength = magazine.length;\\n    ransomNoteArr.forEach(function(item,index){\\n        magazine = magazine.replace(item,'');\\n    });\\n    if(oldMagazineLength == magazine.length +ransomNoteArr.length) {\\n        return true;\\n    } else {\\n        return false;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"85763",
			"view":"463",
			"top":"8",
			"title":"Improved Solution: Shortcut on the Magazine not the RansomNote",
			"vote":"5",
			"content":"As the magazine could be much longer than the RansomNote, shortcutting the loop on the magazine will result in much better running complexity.\\n\\nFirst build the HashMap for the RansomNote, then loop on the magazine, and return true as soon as you removed all the characters from the Map.\\n\\nThis change resulted in improving the running time from ~80ms to ~20ms for my code.\\n\\n```\\npublic boolean canConstruct(String ransomNote, String magazine) {\\n\\tif(ransomNote.length()>magazine.length()) return false;\\n\\tif(ransomNote.isEmpty() && magazine.isEmpty()) return true;\\n\\tMap<Character,Integer> charsCount = new HashMap<>();\\n\\tfor(char c: ransomNote.toCharArray()) {\\n\\t\\tif(charsCount.containsKey(c)) {\\n\\t\\t\\tcharsCount.put(c, charsCount.get(c)+1);\\n\\t\\t} else {\\n\\t\\t\\tcharsCount.put(c, 1);\\n\\t\\t}\\n\\t}\\n\\tfor(char c: magazine.toCharArray()) {\\n\\t\\tif(charsCount.containsKey(c)) {\\n\\t\\t\\tint count = charsCount.get(c);\\n\\t\\t\\tif(--count==0) charsCount.remove(c);\\n\\t\\t\\telse charsCount.put(c, count);\\n\\t\\t}\\n\\t\\tif(charsCount.keySet().size()==0) {\\n\\t\\t\\treturn true;\\n\\t\\t}\\n\\t}\\n\\treturn false;\\n}\\n```"
		},
		{
			"lc_ans_id":"85916",
			"view":"1578",
			"top":"9",
			"title":"6 Lines 32ms C++ Clean Solution",
			"vote":"5",
			"content":"```\\nbool canConstruct(string ransomNote, string magazine) {\\n        vector<int> magazLetters(128, 0);\\n        for(char m : magazine)\\n            magazLetters[m]++;\\n        for(char r : ransomNote)\\n            if(--magazLetters[r]<0) return false;\\n        return true;\\n    }\\n```"
		}
	],
	"id":"383",
	"title":"Ransom Note",
	"content":"<p>\r\nGiven an arbitrary ransom note string and another string containing letters from all the magazines, write a function that will return true if the ransom \r\nnote can be constructed from the magazines ; otherwise, it will return false. \r\n</p>\r\n<p>\r\nEach letter in the magazine string can only be used once in your ransom note.\r\n</p>\r\n\r\n<p><b>Note:</b><br />\r\nYou may assume that both strings contain only lowercase letters.\r\n</p>\r\n\r\n<pre>\r\ncanConstruct(\"a\", \"b\") -> false\r\ncanConstruct(\"aa\", \"ab\") -> false\r\ncanConstruct(\"aa\", \"aab\") -> true\r\n</pre>\r\n",
	"frequency":"478",
	"ac_num":"72005"
}