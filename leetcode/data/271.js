{
	"difficulty":"2",
	"submit_num":"100967",
	"show_id":"271",
	"leetcode_id":"271",
	"answers":[
		{
			"lc_ans_id":"70412",
			"view":"21804",
			"top":"0",
			"title":"AC Java Solution",
			"vote":"158",
			"content":"    public class Codec {\\n        \\n        // Encodes a list of strings to a single string.\\n        public String encode(List<String> strs) {\\n            StringBuilder sb = new StringBuilder();\\n            for(String s : strs) {\\n                sb.append(s.length()).append('/').append(s);\\n            }\\n            return sb.toString();\\n        }\\n    \\n        // Decodes a single string to a list of strings.\\n        public List<String> decode(String s) {\\n            List<String> ret = new ArrayList<String>();\\n            int i = 0;\\n            while(i < s.length()) {\\n                int slash = s.indexOf('/', i);\\n                int size = Integer.valueOf(s.substring(i, slash));\\n                ret.add(s.substring(slash + 1, slash + size + 1));\\n                i = slash + size + 1;\\n            }\\n            return ret;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"70402",
			"view":"5610",
			"top":"1",
			"title":"Java with \"escaping\"",
			"vote":"36",
			"content":"Double any hashes inside the strings, then use standalone hashes (surrounded by spaces) to mark string endings. For example:\\n\\n    {\"abc\", \"def\"}    =>  \"abc # def # \"\\n    {'abc', '#def'}   =>  \"abc # ##def # \"\\n    {'abc##', 'def'}  =>  \"abc#### # def # \"\\n\\nFor decoding, just do the reverse: First split at standalone hashes, then undo the doubling in each string.\\n\\n    public String encode(List<String> strs) {\\n        StringBuffer out = new StringBuffer();\\n        for (String s : strs)\\n            out.append(s.replace(\"#\", \"##\")).append(\" # \");\\n        return out.toString();\\n    }\\n\\n    public List<String> decode(String s) {\\n        List strs = new ArrayList();\\n        String[] array = s.split(\" # \", -1);\\n        for (int i=0; i<array.length-1; ++i)\\n            strs.add(array[i].replace(\"##\", \"#\"));\\n        return strs;\\n    }\\n\\nOr with streaming:\\n\\n    public String encode(List<String> strs) {\\n        return strs.stream()\\n                   .map(s -> s.replace(\"#\", \"##\") + \" # \")\\n                   .collect(Collectors.joining());\\n    }\\n\\n    public List<String> decode(String s) {\\n        List strs = Stream.of(s.split(\" # \", -1))\\n                          .map(t -> t.replace(\"##\", \"#\"))\\n                          .collect(Collectors.toList());\\n        strs.remove(strs.size() - 1);\\n        return strs;\\n    }"
		},
		{
			"lc_ans_id":"70443",
			"view":"7120",
			"top":"2",
			"title":"Accepted simple C++ solution",
			"vote":"33",
			"content":"The rule is, for each str in strs, encode it as <length> + '@' + str\\n\\n    class Codec {\\n    public:\\n    \\n        // Encodes a list of strings to a single string.\\n        string encode(vector<string>& strs) {\\n            string encoded = \"\";\\n            for (string &str: strs) {\\n                int len = str.size();\\n                encoded += to_string(len) + \"@\" + str;\\n            }\\n            \\n            return encoded;\\n        }\\n    \\n        // Decodes a single string to a list of strings.\\n        vector<string> decode(string s) {\\n            vector<string> r;\\n            int head = 0;\\n            while (head < s.size())    {\\n                int at_pos = s.find_first_of('@', head);\\n                int len = stoi(s.substr(head, at_pos - head));\\n                head = at_pos + 1;\\n                r.push_back(s.substr(head, len));\\n                head += len;\\n            }\\n            \\n            return r;\\n        }\\n    };\\n    \\n    // Your Codec object will be instantiated and called as such:\\n    // Codec codec;\\n    // codec.decode(codec.encode(strs));"
		},
		{
			"lc_ans_id":"70448",
			"view":"4214",
			"top":"3",
			"title":"1+7 lines Python (length prefixes)",
			"vote":"23",
			"content":"    class Codec:\\n    \\n        def encode(self, strs):\\n            return ''.join('%d:' % len(s) + s for s in strs)\\n    \\n        def decode(self, s):\\n            strs = []\\n            i = 0\\n            while i < len(s):\\n                j = s.find(':', i)\\n                i = j + 1 + int(s[i:j])\\n                strs.append(s[j+1:i])\\n            return strs"
		},
		{
			"lc_ans_id":"70451",
			"view":"3334",
			"top":"4",
			"title":"Java solution, pretty straight-forward",
			"vote":"13",
			"content":"    // Encodes a list of strings to a single string.\\n    public String encode(List<String> strs) {\\n        return strs.stream()\\n                   .map(s -> s.replace(\"/\", \"//\").replace(\"*\", \"/*\") + \"*\")\\n                   .collect(Collectors.joining()); \\n    }\\n\\n    // Decodes a single string to a list of strings.\\n    public List<String> decode(String s) {\\n        List<String> res = new ArrayList<>();\\n        StringBuilder str = new StringBuilder();\\n        \\n        for (int i = 0; i < s.length(); i++) {\\n            if (s.charAt(i) == '/') {\\n                str.append(s.charAt(++i));\\n            } else if (s.charAt(i) == '*') { \\n                res.add(str.toString()); \\n                str.setLength(0); \\n            } else {\\n                str.append(s.charAt(i));\\n            }\\n        }\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"70465",
			"view":"3833",
			"top":"5",
			"title":"1-liners Ruby+Python",
			"vote":"12",
			"content":"Double the pipes inside the strings, then use standalone pipes to mark string endings.\\n\\n**Ruby**\\n\\n    def encode(strs)\\n      strs.map { |s| s.gsub('|', '||') + ' | ' }.join\\n    end\\n    \\n    def decode(s)\\n      s.split(' | ', -1)[0..-2].map { |s| s.gsub('||', '|') }\\n    end\\n\\n**Python**\\n\\n    def encode(self, strs):\\n        return ''.join(s.replace('|', '||') + ' | ' for s in strs)\\n\\n    def decode(self, s):\\n        return [t.replace('||', '|') for t in s.split(' | ')[:-1]]\\n\\n---\\n\\n**Python, joking**\\n\\nIt's forbidden, but I find it neat that Python lets me write the entire thing like that, so there :-)\\n\\n    class Codec: encode, decode = repr, eval"
		},
		{
			"lc_ans_id":"70479",
			"view":"1076",
			"top":"6",
			"title":"Line 5: error: cannot find symbol: variable ans",
			"vote":"9",
			"content":"Is anyone else getting this error? I get it for any input that doesn't have syntax errors, even if I just try to compile the blank problem skeleton."
		},
		{
			"lc_ans_id":"70475",
			"view":"1163",
			"top":"7",
			"title":"Simple C++ Solution",
			"vote":"7",
			"content":"The basic idea is to create a \"header\" with fixed number of characters to store the string length information. Here I used 20 characters (enough to store 2**64 length string)\\n\\n    class Codec {\\n    public:\\n       // Encodes a list of strings to a single string.                                                                                             \\n       std::string encode(std::vector<std::string>& strs) {\\n         std::ostringstream oss;\\n         for (int i = 0; i < static_cast<int>(strs.size()); ++i) {\\n           oss << std::setfill('0') << std::setw(20) << strs[i].size();\\n           oss << strs[i];\\n         }\\n       return oss.str();\\n     }\\n\\n     // Decodes a single string to a list of strings.                                                                                             \\n     std::vector<std::string> decode(std::string s) {\\n       int i = 0;\\n       std::vector<std::string> strs;\\n       while (i <= static_cast<int>(s.size()) - 20) {\\n         std::istringstream iss(s.substr(i, 20));\\n         int str_len;\\n         iss >> str_len;\\n         i += 20;\\n         if (str_len > 0)\\n           strs.push_back(s.substr(i, str_len));\\n         else\\n           strs.push_back(std::string(\"\"));                                                                                                       \\n         i += str_len;\\n      }\\n      return strs;\\n      }\\n    };"
		},
		{
			"lc_ans_id":"70452",
			"view":"947",
			"top":"8",
			"title":"C++ super clean code using stringstream and getline()",
			"vote":"3",
			"content":"    string encode(vector<string>& strs) {\\n        string res=\"\";\\n        for(string str:strs) res+=str+'\\\\0';\\n        return res;\\n    }\\n    vector<string> decode(string s) {\\n        stringstream ss(s);\\n        vector<string> res;\\n        string temp;\\n        while(getline(ss,temp,'\\\\0')) res.push_back(temp);\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"70460",
			"view":"738",
			"top":"9",
			"title":"A solution without delimiter",
			"vote":"3",
			"content":"Convert string length to a string. Because an int is four bytes in C++, this string's length will always be four.\\n\\nThe encoded vector will look like:  CONVERTED_5(len=4) abcde CONVERTED_3(len=4) abc ...\\n\\n    class Codec {\\n    public:\\n    \\n        // Encodes a list of strings to a single string.\\n        string encode(vector<string>& strs) {\\n            string ret;\\n            for (const auto& e: strs) {\\n                ret += int2string((int) e.length()) + e;\\n            }\\n            return ret;\\n        }\\n    \\n        // Decodes a single string to a list of strings.\\n        vector<string> decode(string s) {\\n            int i = 0;\\n            vector<string> ret;\\n            while (i < s.length()) {\\n                int len = string2int(s.substr(i, 4));\\n                i += 4;\\n                ret.push_back(s.substr(i, len));\\n                i += len;\\n            }\\n            return ret;\\n        }\\n    private:\\n        static string int2string(const int x) {\\n            char* s = (char* ) &x;\\n            string ret;\\n            for (int i = 0; i < 4; ++i) {\\n                ret += s[i];\\n            }\\n            return ret;\\n        }\\n        static int string2int(const string s) {\\n            char t[4];\\n            for (int i = 0; i < 4; ++i) {\\n                t[i] = s[i];\\n            }\\n            return *(int *) t;\\n        }\\n    };\\n    \\n    // Your Codec object will be instantiated and called as such:\\n    // Codec codec;\\n    // codec.decode(codec.encode(strs));"
		}
	],
	"id":"271",
	"title":"Encode and Decode Strings",
	"content":"<p>\r\nDesign an algorithm to encode <b>a list of strings</b> to <b>a string</b>. The encoded string is then sent over the network and is decoded back to the original list of strings.</p>\r\n\r\n<p>\r\nMachine 1 (sender) has the function:\r\n<pre>\r\nstring encode(vector&lt;string&gt; strs) {\r\n  // ... your code\r\n  return encoded_string;\r\n}</pre>\r\n\r\nMachine 2 (receiver) has the function:\r\n<pre>\r\nvector&lt;string&gt; decode(string s) {\r\n  //... your code\r\n  return strs;\r\n}</pre>\r\n</p>\r\n\r\n<p>\r\nSo Machine 1 does:\r\n<pre>string encoded_string = encode(strs);</pre>\r\n</p>\r\n\r\n<p>\r\nand Machine 2 does:\r\n<pre>vector&lt;string&gt; strs2 = decode(encoded_string);</pre>\r\n</p>\r\n\r\n<p>\r\n<code>strs2</code> in Machine 2 should be the same as <code>strs</code> in Machine 1.\r\n</p>\r\n\r\n<p>Implement the <code>encode</code> and <code>decode</code> methods.\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ul>\r\n<li>The string may contain any possible characters out of 256 valid ascii characters. Your algorithm should be generalized enough to work on any possible characters.</li>\r\n<li>Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.</li>\r\n<li>Do not rely on any library method such as <code>eval</code> or serialize methods. You should implement your own encode/decode algorithm.</li>\r\n</ul></p>",
	"frequency":"164",
	"ac_num":"26391"
}