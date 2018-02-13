{
	"difficulty":"2",
	"submit_num":"39549",
	"show_id":"535",
	"leetcode_id":"535",
	"answers":[
		{
			"lc_ans_id":"100268",
			"view":"36587",
			"top":"0",
			"title":"Two solutions and thoughts",
			"vote":"95",
			"content":"My first solution produces short URLs like `http://tinyurl.com/0`, `http://tinyurl.com/1`, etc, in that order.\\n```\\nclass Codec:\\n\\n    def __init__(self):\\n        self.urls = []\\n\\n    def encode(self, longUrl):\\n        self.urls.append(longUrl)\\n        return 'http://tinyurl.com/' + str(len(self.urls) - 1)\\n\\n    def decode(self, shortUrl):\\n        return self.urls[int(shortUrl.split('/')[-1])]\\n```\\nUsing increasing numbers as codes like that is simple but has some disadvantages, which the below solution fixes:\\n- If I'm asked to encode the same long URL several times, it will get several entries. That wastes codes and memory.\\n- People can find out how many URLs have already been encoded. Not sure I want them to know.\\n- People might try to get special numbers by spamming me with repeated requests shortly before their desired number comes up.\\n- Only using digits means the codes can grow unnecessarily large. Only offers a million codes with length 6 (or smaller). Using six digits or lower or upper case letters would offer (10+26*2)<sup>6</sup> = 56,800,235,584 codes with length 6.\\n\\nThe following solution doesn't have these problems. It produces short URLs like `http://tinyurl.com/KtLa2U`, using a random code of six digits or letters. If a long URL is already known, the existing short URL is used and no new entry is generated.\\n```\\nclass Codec:\\n\\n    alphabet = string.ascii_letters + '0123456789'\\n\\n    def __init__(self):\\n        self.url2code = {}\\n        self.code2url = {}\\n\\n    def encode(self, longUrl):\\n        while longUrl not in self.url2code:\\n            code = ''.join(random.choice(Codec.alphabet) for _ in range(6))\\n            if code not in self.code2url:\\n                self.code2url[code] = longUrl\\n                self.url2code[longUrl] = code\\n        return 'http://tinyurl.com/' + self.url2code[longUrl]\\n\\n    def decode(self, shortUrl):\\n        return self.code2url[shortUrl[-6:]]\\n```\\nIt's possible that a randomly generated code has already been generated before. In that case, another random code is generated instead. Repeat until we have a code that's not already in use. How long can this take? Well, even if we get up to using half of the code space, which is a whopping 62<sup>6</sup>/2 = 28,400,117,792 entries, then each code has a 50% chance of not having appeared yet. So the expected/average number of attempts is 2, and for example only one in a billion URLs takes more than 30 attempts. And if we ever get to an even larger number of entries and this does become a problem, then we can just use length 7. We'd need to anyway, as we'd be running out of available codes."
		},
		{
			"lc_ans_id":"100280",
			"view":"12786",
			"top":"1",
			"title":"A true stateless one in C++ (joke)",
			"vote":"51",
			"content":"```\\nclass Solution {\\npublic:\\n\\n    // Encodes a URL to a shortened URL.\\n    string encode(string longUrl) {\\n        return longUrl;\\n    }\\n\\n    // Decodes a shortened URL to its original URL.\\n    string decode(string shortUrl) {\\n        return shortUrl;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"100276",
			"view":"18303",
			"top":"2",
			"title":"Easy solution in java, 5 line code.",
			"vote":"26",
			"content":"below is the tiny url solution in java, also this is the similar method in industry. In industry, most of shorten url service is by database, one auto increasing long number as primary key. whenever a long url need to be shorten, append to the database, and return the primary key number. (the database is very easy to distribute to multiple machine like HBase,  or even you can use the raw file system to store data and improve performance by shard and replica).\\nNote, it's meaningless to promise the same long url to be shorten as the same short url. if you do the promise and use something like hash to check existing, the benefit is must less than the cost.\\nNote: if you want the shorted url contains '0-9a-zA-Z' instead of '0-9', then you need to use 62 number system, not 10 number system(decimal) to convert the primary key number. like 123->'123' in decimal, 123->'1Z' in 62 number system (or '0001Z' for align).\\n\\n```\\npublic class Codec {\\n    List<String> urls = new ArrayList<String>();\\n    // Encodes a URL to a shortened URL.\\n    public String encode(String longUrl) {\\n        urls.add(longUrl);\\n        return String.valueOf(urls.size()-1);\\n    }\\n\\n    // Decodes a shortened URL to its original URL.\\n    public String decode(String shortUrl) {\\n        int index = Integer.valueOf(shortUrl);\\n        return (index<urls.size())?urls.get(index):\"\";\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100270",
			"view":"6476",
			"top":"3",
			"title":"Three different approaches in java",
			"vote":"12",
			"content":"Approach 1- Using simple counter\\n```\\npublic class Codec {\\n    Map<Integer, String> map = new HashMap<>();\\n    int i=0;\\n    public String encode(String longUrl) {\\n        map.put(i,longUrl);\\n        return \"http://tinyurl.com/\"+i++;\\n    }\\n    public String decode(String shortUrl) {\\n        return map.get(Integer.parseInt(shortUrl.replace(\"http://tinyurl.com/\", \"\")));\\n    }\\n}\\n```\\nApproach 2- using hashcode\\n```\\npublic class Codec {\\n    Map<Integer, String> map = new HashMap<>();\\n    public String encode(String longUrl) {\\n        map.put(longUrl.hashCode(),longUrl);\\n        return \"http://tinyurl.com/\"+longUrl.hashCode();\\n    }\\n    public String decode(String shortUrl) {\\n        return map.get(Integer.parseInt(shortUrl.replace(\"http://tinyurl.com/\", \"\")));\\n    }\\n}\\n```\\n\\nApproach 3- using random function\\n\\n```\\npublic class Codec {\\n    Map<Integer, String> map = new HashMap<>();\\n    Random r=new Random();\\n    int key=r.nextInt(10000);\\n    public String encode(String longUrl) {\\n        while(map.containsKey(key))\\n            key= r.nextInt(10000);\\n        map.put(key,longUrl);\\n        return \"http://tinyurl.com/\"+key;\\n    }\\n    public String decode(String shortUrl) {\\n        return map.get(Integer.parseInt(shortUrl.replace(\"http://tinyurl.com/\", \"\")));\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100277",
			"view":"6561",
			"top":"4",
			"title":"C++ solution",
			"vote":"10",
			"content":"```class Solution {\\npublic:\\n    string dict = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\";\\n    int id = 0;\\n    unordered_map<string,string> m;  //key is longURL, value is shortURL\\n    unordered_map<int, string> idm;  //key is id in DB, value is longURL\\n    // Encodes a URL to a shortened URL.\\n    string encode(string longUrl) {\\n        if(m.find(longUrl) != m.end())return m[longUrl];\\n        string res = \"\";\\n        id++;\\n        int count = id;\\n        while(count > 0)\\n        {\\n            res = dict[count%62] + res;\\n            count /= 62;\\n        }\\n        while(res.size() < 6)\\n        {\\n            res = \"0\" + res;\\n        }\\n        m[longUrl] = res;\\n        idm[id] = longUrl;\\n        return res;\\n    }\\n\\n    // Decodes a shortened URL to its original URL.\\n    string decode(string shortUrl) {\\n        int id = 0;\\n        for(int i = 0; i < shortUrl.size(); i++)\\n        {\\n            id = 62*id + (int)(dict.find(shortUrl[i]));\\n        }\\n        if(idm.find(id) != idm.end())return idm[id];\\n        return \"\";\\n    }\\n};\\n\\n// Your Solution object will be instantiated and called as such:\\n// Solution solution;\\n// solution.decode(solution.encode(url));"
		},
		{
			"lc_ans_id":"100290",
			"view":"216",
			"top":"5",
			"title":"Javascript solution",
			"vote":"5",
			"content":"```\\nlet urls = {};\\n\\nvar encode = function(longUrl) {\\n    let uniqueKey = Date.now().toString(36);\\n    urls[uniqueKey] = longUrl;\\n    return \"http://tinyurl.com/\" + uniqueKey;\\n};\\n\\nvar decode = function(shortUrl) {\\n    return urls[shortUrl.split(\"com/\")[1]];\\n};\\n```"
		},
		{
			"lc_ans_id":"100341",
			"view":"1535",
			"top":"6",
			"title":"Easy to Understand in Python",
			"vote":"5",
			"content":"The main idea is to increase the global index, and transform the index into 26 * 2 + 10 based number in string format. \\nAnd I used 2-way dictionary to simulate database queries on backend.\\n```\\nclass Codec:\\n    import string\\n    letters = string.ascii_letters + string.digits\\n    full_tiny = {}\\n    tiny_full = {}\\n    global_counter = 0\\n    def encode(self, longUrl):\\n        \"\"\"Encodes a URL to a shortened URL.\\n        \\n        :type longUrl: str\\n        :rtype: str\\n        \"\"\"\\n        def decto62(dec):\\n            ans = \"\"\\n            while 1:\\n                ans = self.letters[dec % 62] + ans\\n                dec //= 62\\n                if not dec:\\n                    break\\n            return ans\\n                \\n        suffix = decto62(self.global_counter)\\n        if longUrl not in self.full_tiny:\\n            self.full_tiny[longUrl] = suffix\\n            self.tiny_full[suffix] = longUrl\\n            self.global_counter += 1\\n        return \"http://tinyurl.com/\" + suffix\\n        \\n        \\n\\n    def decode(self, shortUrl):\\n        \"\"\"Decodes a shortened URL to its original URL.\\n        \\n        :type shortUrl: str\\n        :rtype: str\\n        \"\"\"\\n        idx = shortUrl.split('/')[-1]\\n        if idx in self.tiny_full:\\n            return self.tiny_full[idx]\\n        else:\\n            return None```"
		},
		{
			"lc_ans_id":"100350",
			"view":"2641",
			"top":"7",
			"title":"Can anyone help me to understand the question?",
			"vote":"4",
			"content":"The questions states:\\n```Note: Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.```\\n\\nMaybe I misunderstand the question, but does it means we are not allowed to use hashtable/database to store the original and shortened url? As I understand the url shortening services are rely on database and cache to store the hash to the original url, otherwise this is more like a string compression algorithm.\\n\\nAny comments are highly appreciated."
		},
		{
			"lc_ans_id":"100307",
			"view":"252",
			"top":"8",
			"title":"Directly return the given String got passed and beat 90%+",
			"vote":"3",
			"content":"Maybe this question should restrict more.\\n\\n```\\n// Encodes a URL to a shortened URL.\\n    public String encode(String longUrl) {\\n        return longUrl;\\n    }\\n\\n    // Decodes a shortened URL to its original URL.\\n    public String decode(String shortUrl) {\\n        return shortUrl;\\n    } \\n```"
		},
		{
			"lc_ans_id":"100282",
			"view":"316",
			"top":"9",
			"title":"Python Solution with comments 45ms",
			"vote":"2",
			"content":"This solution got accepted with all tests passing and beat at least 72% of accepted solutions.\\n\\n```\\nimport random\\nimport string\\n\\nclass Codec:\\n    def __init__(self):\\n        self.url_pair = {}\\n\\n    def encode(self, longUrl):\\n        \"\"\"Encodes a URL to a shortened URL.\"\"\"\\n        # Get a set of characters that will make up the suffix\\n        suffix_set = string.ascii_letters + string.digits\\n\\n        # Make a tinyurl template\\n        tiny_url = \"http://tinyurl.com/\".join(random.choice(suffix_set) for _ in range(6))\\n        \\n        # Store the pair in the dictionary\\n        self.url_pair[tiny_url] = longUrl\\n\\n        return tiny_url\\n\\n    def decode(self, shortUrl):\\n        \"\"\"Decodes the shortened URL to its original URL.\"\"\"\\n        # Return the value from a given key from the dictionary\\n        return self.url_pair.get(shortUrl)\\n```"
		}
	],
	"id":"519",
	"title":"Encode and Decode TinyURL",
	"content":"<blockquote>Note: This is a companion problem to the <a href=\"https://leetcode.com/problemset/system-design/\">System Design</a> problem: <a href=\"https://leetcode.com/problems/design-tinyurl/\">Design TinyURL</a>.</blockquote>\r\n\r\n<p>TinyURL is a URL shortening service where you enter a URL such as <code>https://leetcode.com/problems/design-tinyurl</code> and it returns a short URL such as <code>http://tinyurl.com/4e9iAk</code>.</p>\r\n\r\n<p>Design the <code>encode</code> and <code>decode</code> methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.</p>",
	"frequency":"602",
	"ac_num":"29234"
}