{
	"difficulty":"2",
	"submit_num":"174162",
	"show_id":"288",
	"leetcode_id":"288",
	"answers":[
		{
			"lc_ans_id":"73141",
			"view":"12694",
			"top":"0",
			"title":"Let me explain the question with better examples.",
			"vote":"158",
			"content":"The description (**A word's abbreviation is unique if no other word from the dictionary has the same abbreviation**) is clear however a bit twisting. It took me a few \"Wrong Answer\"s to finally understand what it's asking for.  \\nWe are trying to search for a word in a dictionary. If this word (also this word\\u2019s abbreviation) is not in the dictionary OR this word and only it\\u2019s abbreviation in the dictionary. We call a word\\u2019s abbreviation unique.  \\nEX:  \\n\\n    1) [\\u201cdog\\u201d]; isUnique(\\u201cdig\\u201d);   \\n\\n//False, because \\u201cdig\\u201d has the same abbreviation with \\u201cdog\" and \\u201cdog\\u201d is already in the dictionary. It\\u2019s not unique.  \\n\\n    2) [\\u201cdog\\u201d, \\u201cdog\"]; isUnique(\\u201cdog\\u201d);  \\n\\n //True, because \\u201cdog\\u201d is the only word that has \\u201cd1g\\u201d abbreviation.  \\n\\n    3) [\\u201cdog\\u201d, \\u201cdig\\u201d]; isUnique(\\u201cdog\\u201d);   \\n\\n//False, because if we have more than one word match to the same abbreviation, this abbreviation will never be unique."
		},
		{
			"lc_ans_id":"73143",
			"view":"11921",
			"top":"1",
			"title":"Java Solution with One HashMap<String, String> beats 90% of Submissions",
			"vote":"83",
			"content":"    public class ValidWordAbbr {\\n        HashMap<String, String> map;\\n        public ValidWordAbbr(String[] dictionary) {\\n            map = new HashMap<String, String>();\\n            for(String str:dictionary){\\n                String key = getKey(str);\\n                // If there is more than one string belong to the same key\\n                // then the key will be invalid, we set the value to \"\"\\n                if(map.containsKey(key)){\\n                    if(!map.get(key).equals(str)){\\n                        map.put(key, \"\");\\n                    }\\n                }\\n                else{\\n                    map.put(key, str);\\n                }\\n            }\\n        }\\n    \\n        public boolean isUnique(String word) {\\n            return !map.containsKey(getKey(word))||map.get(getKey(word)).equals(word);\\n        }\\n        \\n        String getKey(String str){\\n            if(str.length()<=2) return str;\\n            return str.charAt(0)+Integer.toString(str.length()-2)+str.charAt(str.length()-1);\\n        }\\n    }"
		},
		{
			"lc_ans_id":"73146",
			"view":"2045",
			"top":"2",
			"title":"I really don't understand some weird test cases and very very simple spec.",
			"vote":"24",
			"content":"I think working on unclear specs and weird test cases is \\n\\nREALLY REALLY \\n\\na waste of my life."
		},
		{
			"lc_ans_id":"73133",
			"view":"6558",
			"top":"3",
			"title":"8-lines in C++...",
			"vote":"24",
			"content":"To check for unique abbreviation, we maintain a mapping from a specific abbreviation to all words which have the abbreviation. Then we just need to check no other words have the same abbreviation as the given word.\\n\\nThe code is as follows.  \\n\\n    class ValidWordAbbr {\\n    public:\\n    \\tValidWordAbbr(vector<string> &dictionary) {\\n    \\t\\tfor (string& d : dictionary) {\\n    \\t\\t\\tint n = d.length();\\n    \\t\\t\\tstring abbr = d[0] + to_string(n) + d[n - 1];\\n    \\t\\t\\tmp[abbr].insert(d);\\n    \\t\\t}\\n    \\t}\\n    \\n    \\tbool isUnique(string word) {\\n    \\t\\tint n = word.length();\\n    \\t\\tstring abbr = word[0] + to_string(n) + word[n - 1];\\n    \\t\\treturn mp[abbr].count(word) == mp[abbr].size(); \\n    \\t}\\n    private:\\n    \\tunordered_map<string, unordered_set<string>> mp;\\n    };\\n     \\n     \\n    // Your ValidWordAbbr object will be instantiated and called as such:\\n    // ValidWordAbbr vwa(dictionary);\\n    // vwa.isUnique(\"hello\");\\n    // vwa.isUnique(\"anotherWord\");"
		},
		{
			"lc_ans_id":"73145",
			"view":"2379",
			"top":"4",
			"title":"Python short solution using defaultdict with comments.",
			"vote":"11",
			"content":"        \\n    def __init__(self, dictionary):\\n        self.dic = collections.defaultdict(set)\\n        for s in dictionary:\\n            val = s\\n            if len(s) > 2:\\n                s = s[0]+str(len(s)-2)+s[-1]\\n            self.dic[s].add(val)\\n\\n    def isUnique(self, word):\\n        val = word \\n        if len(word) > 2:\\n            word = word[0]+str(len(word)-2)+word[-1]\\n        # if word abbreviation not in the dictionary, or word itself in the dictionary (word itself may \\n        # appear multiple times in the dictionary, so it's better using set instead of list)\\n        return len(self.dic[word]) == 0 or (len(self.dic[word]) == 1 and val == list(self.dic[word])[0])"
		},
		{
			"lc_ans_id":"73209",
			"view":"1439",
			"top":"5",
			"title":"Share my Java solution",
			"vote":"9",
			"content":"The idea is pretty straightforward, we use a map to track a set of words that have the same abbreviation. The word is unique when its abbreviation does not exist in the map or it's the only one in the set.\\n\\n    public class ValidWordAbbr {\\n      Map<String, Set<String>> map = new HashMap<>();\\n      \\n      public ValidWordAbbr(String[] dictionary) {\\n        // build the hashmap\\n        // the key is the abbreviation\\n        // the value is a hash set of the words that have the same abbreviation\\n        for (int i = 0; i < dictionary.length; i++) {\\n          String a = abbr(dictionary[i]);\\n          Set<String> set = map.containsKey(a) ? map.get(a) : new HashSet<>();\\n          set.add(dictionary[i]);\\n          map.put(a, set);\\n        }\\n      }\\n      \\n      public boolean isUnique(String word) {\\n        String a = abbr(word);\\n        // it's unique when the abbreviation does not exist in the map or\\n        // it's the only word in the set\\n        return !map.containsKey(a) || (map.get(a).contains(word) && map.get(a).size() == 1);\\n      }\\n         \\n      String abbr(String s) {\\n        if (s.length() < 3) return s;\\n        return s.substring(0, 1) + String.valueOf(s.length() - 2) + s.substring(s.length() - 1);\\n      }\\n    }"
		},
		{
			"lc_ans_id":"73169",
			"view":"1073",
			"top":"6",
			"title":"Misleading in every sense, let me give a better statement",
			"vote":"7",
			"content":"First of all, definition of abbreviation is misleading. The way <number> was constructed has multiple ways of understanding. It will be much easier to say it is the length after the first and last character are trimmed. \\n(My understanding was that in the case of \"internationalization\" abbreviated into \"i18n\", 1 comes from the first 'n', i.e. the second character, 8 comes from the last digit of the number above the second character from the end. So my formula was \"10+(len(word)-2)%10\"....\\n\\n>              1    1  1\\n>     1---5----0----5--8\\n>     ^                ^\\n             \\nThis of course leads me to wrong result when a word is longer than 22 characters.)\\n\\nThen the definition of abbr uniqueness, should be stated like this:\\n**A word is abbreviation unique in a list if and only if one of the two cases is true:**\\n**1. The word is in the dictionary, then there should be no other word with the same abbr**\\n**2. If the word is not in the dictionary, then the dictionary should have no word with the given word\\u2019s abbr**\\n\\nNow if you look back at the definition in the original question, it's kinda of make sense, but why would you call it \"other\" if the word itself is not in the dictionary."
		},
		{
			"lc_ans_id":"73186",
			"view":"572",
			"top":"7",
			"title":"Who put \"doge\" in the test case?",
			"vote":"3",
			"content":"37 / 53 test cases passed.\\n\\n\\nInput:\\n\\n[\"dog\"],isUnique(\"dig\"),isUnique(\"dug\"),isUnique(\"dag\"),isUnique(\"dog\"),isUnique(\"doge\")\\n\\nOutput:\\n\\n[true,true,true,true,true]\\n\\nExpected:\\n\\n[false,false,false,true,true]\\n\\n\\n\\n\\nPlease google \"doge\"."
		},
		{
			"lc_ans_id":"73161",
			"view":"1243",
			"top":"8",
			"title":"7 lines concise and easy understand c++ solution",
			"vote":"3",
			"content":"    class ValidWordAbbr {\\n    public:\\n        ValidWordAbbr(vector<string> &dictionary) {\\n            for(auto word : dictionary){\\n                string tmp = word[0] + to_string(word.size()) + word[word.size() - 1];\\n                mp[tmp].insert(word);\\n            }\\n        }\\n    \\n        bool isUnique(string word) {\\n            string tmp = word[0] + to_string(word.size()) + word[word.size() - 1];\\n            return mp[tmp].count(word) == mp[tmp].size();\\n        }\\n    private:\\n        unordered_map<string, unordered_set<string>> mp;\\n    };"
		},
		{
			"lc_ans_id":"73185",
			"view":"1781",
			"top":"9",
			"title":"Why [\"hello\"],isUnique(\"hello\") should return [true]",
			"vote":"3",
			"content":"why should [\"hello\"],isUnique(\"hello\") return [true] ?\\n\\nbut in the case below\\nGiven dictionary = [ \"deer\", \"door\", \"cake\", \"card\" ]\\nisUnique(\"cane\") -> false"
		}
	],
	"id":"288",
	"title":"Unique Word Abbreviation",
	"content":"<p>An abbreviation of a word follows the form &lt;first letter&gt;&lt;number&gt;&lt;last letter&gt;. Below are some examples of word abbreviations:\r\n<pre>\r\na) it                      --> it    (no abbreviation)\r\n\r\n     1\r\nb) d|o|g                   --> d1g\r\n\r\n              1    1  1\r\n     1---5----0----5--8\r\nc) i|nternationalizatio|n  --> i18n\r\n\r\n              1\r\n     1---5----0\r\nd) l|ocalizatio|n          --> l10n\r\n</pre>\r\n\r\n<p>Assume you have a dictionary and given a word, find whether its abbreviation is unique in the dictionary. A word's abbreviation is unique if no <i>other</i> word from the dictionary has the same abbreviation.</p>\r\n\r\n<p>Example: </br>\r\n<pre>\r\nGiven dictionary = [ \"deer\", \"door\", \"cake\", \"card\" ]\r\n\r\nisUnique(\"dear\") -> <code>false</code>\r\nisUnique(\"cart\") -> <code>true</code>\r\nisUnique(\"cane\") -> <code>false</code>\r\nisUnique(\"make\") -> <code>true</code>\r\n</pre>\r\n</p>",
	"frequency":"139",
	"ac_num":"30683"
}