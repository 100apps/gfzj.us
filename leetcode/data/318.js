{
	"difficulty":"2",
	"submit_num":"129775",
	"show_id":"318",
	"leetcode_id":"318",
	"answers":[
		{
			"lc_ans_id":"76959",
			"view":"27033",
			"top":"0",
			"title":"JAVA----------Easy Version To Understand!!!!!!!!!!!!!!!!!",
			"vote":"215",
			"content":"    \\tpublic static int maxProduct(String[] words) {\\n\\t\\tif (words == null || words.length == 0)\\n\\t\\t\\treturn 0;\\n\\t\\tint len = words.length;\\n\\t\\tint[] value = new int[len];\\n\\t\\tfor (int i = 0; i < len; i++) {\\n\\t\\t\\tString tmp = words[i];\\n\\t\\t\\tvalue[i] = 0;\\n\\t\\t\\tfor (int j = 0; j < tmp.length(); j++) {\\n\\t\\t\\t\\tvalue[i] |= 1 << (tmp.charAt(j) - 'a');\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tint maxProduct = 0;\\n\\t\\tfor (int i = 0; i < len; i++)\\n\\t\\t\\tfor (int j = i + 1; j < len; j++) {\\n\\t\\t\\t\\tif ((value[i] & value[j]) == 0 && (words[i].length() * words[j].length() > maxProduct))\\n\\t\\t\\t\\t\\tmaxProduct = words[i].length() * words[j].length();\\n\\t\\t\\t}\\n\\t\\treturn maxProduct;\\n\\t}"
		},
		{
			"lc_ans_id":"77021",
			"view":"16849",
			"top":"1",
			"title":"32ms Java AC solution",
			"vote":"70",
			"content":"    public class Solution {\\n        public int maxProduct(String[] words) {\\n            int max = 0;\\n\\n            Arrays.sort(words, new Comparator<String>(){\\n                public int compare(String a, String b){\\n                    return b.length() - a.length();\\n                }\\n            });\\n    \\n            int[] masks = new int[words.length]; // alphabet masks\\n\\n            for(int i = 0; i < masks.length; i++){\\n                for(char c: words[i].toCharArray()){\\n                    masks[i] |= 1 << (c - 'a');\\n                }\\n            }\\n        \\n            for(int i = 0; i < masks.length; i++){\\n                if(words[i].length() * words[i].length() <= max) break; //prunning\\n                for(int j = i + 1; j < masks.length; j++){\\n                    if((masks[i] & masks[j]) == 0){\\n                        max = Math.max(max, words[i].length() * words[j].length());\\n                        break; //prunning\\n                    }\\n                }\\n            }\\n\\n            return max;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"76976",
			"view":"19397",
			"top":"2",
			"title":"Bit shorter C++",
			"vote":"57",
			"content":"Same algorithm as most, just written a bit shorter.\\n\\n    int maxProduct(vector<string>& words) {\\n        vector<int> mask(words.size());\\n        int result = 0;\\n        for (int i=0; i<words.size(); ++i) {\\n            for (char c : words[i])\\n                mask[i] |= 1 << (c - 'a');\\n            for (int j=0; j<i; ++j)\\n                if (!(mask[i] & mask[j]))\\n                    result = max(result, int(words[i].size() * words[j].size()));\\n        }\\n        return result;\\n    }\\n\\n**Update:** Here's an O(n+N) variation, where n is the number of words and N is the total number of characters in all words. Thanks to junhuangli for the suggestion.\\n\\n    int maxProduct(vector<string>& words) {\\n        unordered_map<int,int> maxlen;\\n        for (string word : words) {\\n            int mask = 0;\\n            for (char c : word)\\n                mask |= 1 << (c - 'a');\\n            maxlen[mask] = max(maxlen[mask], (int) word.size());\\n        }\\n        int result = 0;\\n        for (auto a : maxlen)\\n            for (auto b : maxlen)\\n                if (!(a.first & b.first))\\n                    result = max(result, a.second * b.second);\\n        return result;\\n    }\\n\\n**Or:** (thanks to junhuangli's further comment)\\n\\n    int maxProduct(vector<string>& words) {\\n        unordered_map<int,int> maxlen;\\n        int result = 0;\\n        for (string word : words) {\\n            int mask = 0;\\n            for (char c : word)\\n                mask |= 1 << (c - 'a');\\n            maxlen[mask] = max(maxlen[mask], (int) word.size());\\n            for (auto maskAndLen : maxlen)\\n                if (!(mask & maskAndLen.first))\\n                    result = max(result, (int) word.size() * maskAndLen.second);\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"76970",
			"view":"5784",
			"top":"3",
			"title":"Python solution, beats 99.67%",
			"vote":"32",
			"content":"    class Solution(object):\\n        def maxProduct(self, words):\\n            d = {}\\n            for w in words:\\n                mask = 0\\n                for c in set(w):\\n                    mask |= (1 << (ord(c) - 97))\\n                d[mask] = max(d.get(mask, 0), len(w))\\n            return max([d[x] * d[y] for x in d for y in d if not x & y] or [0])"
		},
		{
			"lc_ans_id":"76999",
			"view":"4980",
			"top":"4",
			"title":"Bit manipulation Java O(n^2)",
			"vote":"22",
			"content":"    public class Solution {\\n    public int maxProduct(String[] words) {\\n        int max = 0;\\n        int[] bytes = new int[words.length];\\n        for(int i=0;i<words.length;i++){\\n            int val = 0;\\n            for(int j=0;j<words[i].length();j++){\\n                val |= 1<<(words[i].charAt(j)-'a');\\n            }\\n            bytes[i] = val;\\n        }\\n        for(int i=0; i<bytes.length; i++){\\n            for(int j=i+1; j<bytes.length; j++){\\n                if((bytes[i] & bytes[j])==0)max = Math.max(max,words[i].length()*words[j].length());\\n            }\\n        }\\n        return max;\\n    }\\n}\\n\\n\\nPre-process the word, use bit to represent the words. We  can do this because we only need to compare if two words contains the same characters."
		},
		{
			"lc_ans_id":"77047",
			"view":"2581",
			"top":"5",
			"title":"Java Solution with comments",
			"vote":"18",
			"content":"    public class Solution {\\n    \\t/**\\n    \\t * @param words\\n    \\t * @return\\n    \\t * \\n    \\t * \\t\\tThe soultion is calcuated by doing a product of the length of\\n    \\t *         each string to every other string. Anyhow the constraint given is\\n    \\t *         that the two strings should not have any common character. This\\n    \\t *         is taken care by creating a unique number for every string. Image\\n    \\t *         a an 32 bit integer where 0 bit corresponds to 'a', 1st bit\\n    \\t *         corresponds to 'b' and so on.\\n    \\t * \\n    \\t *         Thus if two strings contain the same character when we do and\\n    \\t *         \"AND\" the result will not be zero and we can ignore that case.\\n    \\t */\\n    \\tpublic int maxProduct(String[] words) {\\n    \\t\\tint[] checker = new int[words.length];\\n    \\t\\tint max = 0;\\n    \\t\\t// populating the checker array with their respective numbers\\n    \\t\\tfor (int i = 0; i < checker.length; i++) {\\n    \\t\\t\\tint num = 0;\\n    \\t\\t\\tfor (int j = 0; j < words[i].length(); j++) {\\n    \\t\\t\\t\\tnum |= 1 << (words[i].charAt(j) - 'a');\\n    \\t\\t\\t}\\n    \\t\\t\\tchecker[i] = num;\\n    \\t\\t}\\n    \\n    \\t\\tfor (int i = 0; i < words.length; i++) {\\n    \\t\\t\\tfor (int j = i + 1; j < words.length; j++) {\\n    \\t\\t\\t\\tif ((checker[i] & checker[j]) == 0) //checking if the two strings have common character\\n    \\t\\t\\t\\t\\tmax = Math.max(max, words[i].length() * words[j].length());\\n    \\t\\t\\t}\\n    \\t\\t}\\n    \\t\\treturn max;\\n    \\t}\\n    \\n    }"
		},
		{
			"lc_ans_id":"77096",
			"view":"2140",
			"top":"6",
			"title":"116ms c++ solution use early pruning (faster than most O(N^2))",
			"vote":"15",
			"content":"Sort the vector first according to the length of string. Then use some early pruning to fasten the process.\\n\\nThe worst cases would still be O(N^2). It's faster than most O(N^2) solutions. I don't know whether we can do better. (Binary Search Seems Not work here) Any comments is welcomed.\\n\\nUpdate: We can use counting sort to improve the time complexity of sorting to O(N).\\n\\n    class Solution {\\n    public:\\n        int maxProduct(vector<string>& words) {\\n            int s=words.size();\\n            if(s==0) return 0;\\n            vector<int> bit(s,0);\\n            sort(words.begin(), words.end(), compare);  //sort the vector from longest to shortest\\n            for(int i=0; i<s; i++){ //bit manipulation\\n                for(int j=0; j<words[i].size(); j++) bit[i] |=(1<<(words[i][j]-'a')); \\n            }\\n            int maxlength=0;\\n            for(int i=0; i<s-1; i++){\\n                int si=words[i].size();\\n                if(si*si<=maxlength) break; //early pruning\\n                for(int j=i+1; j<s; j++){\\n                    int sj=words[j].size();\\n                    if(si*sj<=maxlength) break;  //early pruning\\n                    if((bit[i]&bit[j])==0) maxlength=si*sj;\\n                }\\n            }\\n            return maxlength;\\n        }\\n        static bool compare(string a, string b){\\n            return a.size()>b.size();\\n        }\\n    };"
		},
		{
			"lc_ans_id":"76992",
			"view":"1884",
			"top":"7",
			"title":"C++, 25 lines, 96ms, straight-forward solution",
			"vote":"11",
			"content":"      \\n    class Solution {\\n     public:\\n       int set_bit(string& str){\\n         int mybits = 0;\\n         for (char c : str){\\n           mybits |= (1 << (c-'a'));\\n           if ((mybits == 0x3FFFFFF)) break;\\n         }\\n         return mybits;\\n       }\\n    \\n       int maxProduct(vector<string>& words) {\\n         int m_val = 0, w_size = words.size();\\n         int m[w_size], m_w_size[w_size];\\n        \\n         for(int i = 0; i < w_size; i++) {\\n           m[i] = set_bit(words[i]);\\n           m_w_size[i] = words[i].size();\\n         }\\n    \\n         for (int i = 0; i < w_size; i++) \\n             for (int j = i+1; j < w_size; j++) \\n                if ((m[i] & m[j])==0) \\n                    m_val = max((int)(m_w_size[i] * m_w_size[j]), m_val);\\n    \\n        return m_val;\\n      }\\n    };"
		},
		{
			"lc_ans_id":"77024",
			"view":"2988",
			"top":"8",
			"title":"My java solution (12ms) O(n*n)",
			"vote":"11",
			"content":"    public class Solution {\\n    public int maxProduct(String[] words) {\\n        int len = words.length;\\n        int[] mark = new int[len];\\n        int[] leng = new int[len];\\n        for (int i = 0;i<len;i++) {\\n            int k = words[i].length();\\n            leng[i] = k;\\n            for (int j=0;j<k;j++) {\\n                int p = (int)(words[i].charAt(j)-'a');\\n                p = 1 << p;\\n                mark[i] = mark[i] | p;\\n            }\\n        }\\n        int ans = 0;\\n        for (int i = 0;i<len;i++)\\n         for (int j = i+1;j<len;j++) \\n         if ((mark[i]&mark[j])==0) \\n          if (ans<leng[i]*leng[j])\\n             ans=leng[i]*leng[j];\\n        return ans;\\n        }\\n    }\\n\\n\\nThe array store the length is necessary. If we calculate the length every time we need it, it will be very slow."
		},
		{
			"lc_ans_id":"77050",
			"view":"1634",
			"top":"9",
			"title":"C++ 92ms Bit manipulation",
			"vote":"9",
			"content":"    #include <iostream>\\n    #include <algorithm> //sort\\n    #include <vector>\\n    using namespace std;\\n\\n    class Solution {\\n    static bool sortFunction(string s1, string s2){return s1.length() < s2.length();}\\n    int strToBinary(string s);\\n    int solution2(vector<string> &v, const int sz);\\n    public:\\n    int maxProduct(vector<string>& words) {\\n        //return solution1(words);\\n        return solution2(words, words.size());\\n    }\\n    };\\n\\n    int Solution::strToBinary(string s){\\n    int res(0);\\n    for(int i = 0; i < s.length(); i++)\\n        res |= 1 << (s[i] - 97);\\n    return res;\\n    }\\n\\n    int Solution::solution2(vector<string> &v, const int sz){\\n    sort(v.begin(), v.end(), sortFunction);\\n    int res(0), a[sz] = {};\\n    for(int i = 0; i < sz; i++)     //convert string to int, each bit is a char\\n        a[i] = strToBinary(v[i]);\\n    for(int l = 0, r = sz - 1; l < r; r--){ \\n        int nl(-1);\\n        for(int i = l; i < r; i++)\\n            if(!(a[i] & a[r])) nl = i;\\n        if(nl != -1){    //each found will narrow next search range\\n            res = max(res, int(v[r].length()) * int(v[nl].length()));\\n            l = nl + 1;\\n        }\\n    }\\n    return res;\\n    }"
		}
	],
	"id":"318",
	"title":"Maximum Product of Word Lengths",
	"content":"<p>\r\n    Given a string array <code>words</code>, find the maximum value of <code>length(word[i]) * length(word[j])</code> where the two words do not share common letters.\r\n    You may assume that each word will contain only lower case letters.\r\n    If no such two words exist, return 0.\r\n</p>\r\n\r\n<p>\r\n    <b>Example 1:</b><br/>\r\n</p>\r\n<p>\r\n    Given <code>[\"abcw\", \"baz\", \"foo\", \"bar\", \"xtfn\", \"abcdef\"]</code><br/>\r\n    Return <code>16</code><br/>\r\n    The two words can be <code>\"abcw\", \"xtfn\"</code>.\r\n</p>\r\n<p>\r\n    <b>Example 2:</b><br/>\r\n</p>\r\n<p>\r\n    Given <code>[\"a\", \"ab\", \"abc\", \"d\", \"cd\", \"bcd\", \"abcd\"]</code><br/>\r\n    Return <code>4</code><br/>\r\n    The two words can be <code>\"ab\", \"cd\"</code>.\r\n</p>\r\n<p>\r\n    <b>Example 3:</b><br/>\r\n</p>\r\n<p>\r\n    Given <code>[\"a\", \"aa\", \"aaa\", \"aaaa\"]</code><br/>\r\n    Return <code>0</code><br/>\r\n    No such pair of words.    \r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/dietpepsi\">@dietpepsi</a> for adding this problem and creating all test cases.</p>",
	"frequency":"362",
	"ac_num":"58808"
}