{
	"difficulty":"2",
	"submit_num":"55644",
	"show_id":"468",
	"leetcode_id":"468",
	"answers":[
		{
			"lc_ans_id":"95491",
			"view":"9640",
			"top":"0",
			"title":"Java Simple Solution",
			"vote":"22",
			"content":"```\\npublic String validIPAddress(String IP) {\\n\\tif(isValidIPv4(IP)) return \"IPv4\";\\n\\telse if(isValidIPv6(IP)) return \"IPv6\";\\n\\telse return \"Neither\";\\n}\\n\\npublic boolean isValidIPv4(String ip) {\\n\\tif(ip.length()<7) return false;\\n\\tif(ip.charAt(0)=='.') return false;\\n\\tif(ip.charAt(ip.length()-1)=='.') return false;\\n\\tString[] tokens = ip.split(\"\\\\\\\\.\");\\n\\tif(tokens.length!=4) return false;\\n\\tfor(String token:tokens) {\\n\\t\\tif(!isValidIPv4Token(token)) return false;\\n\\t}\\n\\treturn true;\\n}\\npublic boolean isValidIPv4Token(String token) {\\n\\tif(token.startsWith(\"0\") && token.length()>1) return false;\\n\\ttry {\\n\\t\\tint parsedInt = Integer.parseInt(token);\\n\\t\\tif(parsedInt<0 || parsedInt>255) return false;\\n\\t\\tif(parsedInt==0 && token.charAt(0)!='0') return false;\\n\\t} catch(NumberFormatException nfe) {\\n\\t\\treturn false;\\n\\t}\\n\\treturn true;\\n}\\n\\t\\npublic boolean isValidIPv6(String ip) {\\n\\tif(ip.length()<15) return false;\\n\\tif(ip.charAt(0)==':') return false;\\n\\tif(ip.charAt(ip.length()-1)==':') return false;\\n\\tString[] tokens = ip.split(\":\");\\n\\tif(tokens.length!=8) return false;\\n\\tfor(String token: tokens) {\\n\\t\\tif(!isValidIPv6Token(token)) return false;\\n\\t}\\n\\treturn true;\\n}\\npublic boolean isValidIPv6Token(String token) {\\n\\tif(token.length()>4 || token.length()==0) return false;\\n\\tchar[] chars = token.toCharArray();\\n\\tfor(char c:chars) {\\n\\t\\tboolean isDigit = c>=48 && c<=57;\\n\\t\\tboolean isUppercaseAF = c>=65 && c<=70;\\n\\t\\tboolean isLowerCaseAF = c>=97 && c<=102;\\n\\t\\tif(!(isDigit || isUppercaseAF || isLowerCaseAF)) \\n\\t\\t\\treturn false;\\n\\t}\\n\\treturn true;\\n}\\n```"
		},
		{
			"lc_ans_id":"95565",
			"view":"2547",
			"top":"1",
			"title":"C++ solution straightforward string processing",
			"vote":"10",
			"content":"```\\n    const string validIPv6Chars = \"0123456789abcdefABCDEF\";\\n    \\n    bool isValidIPv4Block(string& block) {\\n    \\tint num = 0;\\n    \\tif (block.size() > 0 && block.size() <= 3) {\\n    \\t    for (int i = 0; i < block.size(); i++) {\\n    \\t        char c = block[i];\\n    \\t        // special case: if c is a leading zero and there are characters left\\n    \\t        if (!isalnum(c) || (i == 0 && c == '0' && block.size() > 1))\\n    \\t\\t    return false;\\n    \\t        else {\\n    \\t\\t    num *= 10;\\n    \\t\\t    num += c - '0';\\n    \\t        }\\n    \\t    }\\n    \\t    return num <= 255;\\n    \\t}\\n    \\treturn false;\\n    }\\n    \\n    bool isValidIPv6Block(string& block) {\\n    \\tif (block.size() > 0 && block.size() <= 4) {\\n    \\t    for (int i = 0; i < block.size(); i++) {\\n    \\t        char c = block[i];\\n    \\t        if (validIPv6Chars.find(c) == string::npos)\\n    \\t    \\t    return false;\\n    \\t    }\\n    \\t    return true;\\n    \\t}\\n    \\treturn false;\\n    }\\n    \\n    string validIPAddress(string IP) {\\n    \\tstring ans[3] = {\"IPv4\", \"IPv6\", \"Neither\"};\\n    \\tstringstream ss(IP);\\n    \\tstring block;\\n    \\t// ipv4 candidate\\n    \\tif (IP.substr(0, 4).find('.') != string::npos) {\\n    \\t    for (int i = 0; i < 4; i++) {\\n    \\t\\tif (!getline(ss, block, '.') || !isValidIPv4Block(block))\\n    \\t   \\t    return ans[2];\\n    \\t    }\\n    \\t    return ss.eof() ? ans[0] : ans[2];\\n    \\t}\\n    \\t// ipv6 candidate\\n    \\telse if (IP.substr(0, 5).find(':') != string::npos) {\\n    \\t    for (int i = 0; i < 8; i++) {\\n    \\t\\tif (!getline(ss, block, ':') || !isValidIPv6Block(block))\\n    \\t\\t    return ans[2];\\n    \\t    }\\n    \\t    return ss.eof() ? ans[1] : ans[2];\\n    \\t}\\n    \\n    \\treturn ans[2];\\n    }\\n```"
		},
		{
			"lc_ans_id":"95504",
			"view":"1588",
			"top":"2",
			"title":"Java Simple Solution with RegExp",
			"vote":"8",
			"content":"Thanks for pointing out my mistake.Now the modified solution is:\\n```\\npublic class Solution {\\n    public String validIPAddress(String IP) {\\n        if(IP.matches(\"(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\\\\\\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\"))return \"IPv4\";\\n        if(IP.matches(\"(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})\"))return \"IPv6\";\\n        return \"Neither\";\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"95482",
			"view":"3891",
			"top":"3",
			"title":"Short RegExp solution",
			"vote":"8",
			"content":"```\\nconst ip4 = /^([1-9]\\\\d{0,2}|0)(?:\\\\.([1-9]\\\\d{0,2}|0)){3}$/;\\nconst ip6 = /^([0-9a-fA-F]{1,4})(\\\\:[0-9a-fA-F]{1,4}){7}$/;\\n\\nvar validIPAddress = function(IP) {\\n    const isIp4 = ip4.exec(IP);\\n    if (isIp4 && isIp4.slice(1).every(d => parseInt(d, 10) < 256))\\n        return 'IPv4';\\n\\n    const isIp6 = ip6.exec(IP);\\n    if (isIp6)\\n        return 'IPv6';\\n    \\n    return 'Neither';\\n};\\n```"
		},
		{
			"lc_ans_id":"95483",
			"view":"2313",
			"top":"4",
			"title":"Python Solution",
			"vote":"8",
			"content":"```\\nclass Solution(object):\\n    def validIPAddress(self, IP):\\n        def is_hex(s):\\n            hex_digits = set(\"0123456789abcdefABCDEF\")\\n            for char in s:\\n                if not (char in hex_digits):\\n                    return False\\n            return True\\n        ary = IP.split('.')\\n        if len(ary) == 4:\\n            for i in xrange(len(ary)):\\n                if not ary[i].isdigit() or not 0 <= int(ary[i]) < 256 or (ary[i][0] == '0' and len(ary[i]) > 1):\\n                    return \"Neither\"\\n            return \"IPv4\"\\n        ary = IP.split(':')\\n        if len(ary) == 8:\\n            for i in xrange(len(ary)):\\n                tmp = ary[i]\\n                if len(tmp) == 0 or not len(tmp) <= 4 or not is_hex(tmp):    \\n                    return \"Neither\"\\n            return \"IPv6\"\\n        return \"Neither\"\\n```"
		},
		{
			"lc_ans_id":"95478",
			"view":"195",
			"top":"5",
			"title":"Concise C++ Solution - One function is enough!! Verify IPv4 and IPv6 in the same way.  (20 lines)",
			"vote":"3",
			"content":"There is no need to define two verifying functions. \\nUsing istringstream, IPv6 and IPv4 addresses could be verified in the same way.\\n\\n    string validIPAddress(string IP) {\\n        if(IP.find_first_of('-') != string::npos) return \"Neither\";\\n        auto isIPv4 = verify<4, '.', dec, 1, 0xFF>;\\n        auto isIPv6 = verify<8, ':', hex, 4, 0xFFFF>;\\n        return isIPv4(IP) ? \"IPv4\" : isIPv6(IP) ? \"IPv6\" : \"Neither\";\\n    }\\n    \\n    template<int count, char delim, decltype(dec) mode, int maxZeroCount, int maxNum>\\n    static bool verify(string IP){\\n        istringstream iss(IP += delim);\\n        int num; char c;\\n        for(int i = 0, pos; pos = iss.tellg(), i < count; ++i) {\\n            auto start0 = iss.peek() == '0';\\n            iss >> mode >> num >> c;\\n            if(iss.fail() || start0 && (iss.tellg() - pos > 1 + maxZeroCount) || c != delim || num > maxNum) return false;            \\n        }\\n        return iss.peek() == EOF;\\n    }"
		},
		{
			"lc_ans_id":"95484",
			"view":"142",
			"top":"6",
			"title":"Python easy understand solution",
			"vote":"2",
			"content":"````\\ndef validIPAddress(self, IP):\\n        \\n        def isIPv4(s):\\n            try: return str(int(s)) == s and 0 <= int(s) <= 255\\n            except: return False\\n            \\n        def isIPv6(s):\\n            if len(s) > 4: return False\\n            try: return int(s, 16) >= 0 and s[0] != '-'\\n            except: return False\\n\\n        if IP.count(\".\") == 3 and all(isIPv4(i) for i in IP.split(\".\")): \\n            return \"IPv4\"\\n        if IP.count(\":\") == 7 and all(isIPv6(i) for i in IP.split(\":\")): \\n            return \"IPv6\"\\n        return \"Neither\""
		},
		{
			"lc_ans_id":"95527",
			"view":"194",
			"top":"7",
			"title":"This question should be fixed to accept proper v6 addresses",
			"vote":"2",
			"content":"This problem is terrible it accepts some version of ipv6 that's not correct it should be changed to accept valid ipv4 addresses and valid ipv6 addresses as according to man 3 inet_pton.\\n\\n```\\nAF_INET\\n              src points to a character string containing an IPv4 network\\n              address in dotted-decimal format, \"ddd.ddd.ddd.ddd\", where ddd\\n              is a decimal number of up to three digits in the range 0 to\\n              255.  The address is converted to a struct in_addr and copied\\n              to dst, which must be sizeof(struct in_addr) (4) bytes (32\\n              bits) long.\\n\\n       AF_INET6\\n              src points to a character string containing an IPv6 network\\n              address.  The address is converted to a struct in6_addr and\\n              copied to dst, which must be sizeof(struct in6_addr) (16)\\n              bytes (128 bits) long.  The allowed formats for IPv6 addresses\\n              follow these rules:\\n\\n              1. The preferred format is x:x:x:x:x:x:x:x.  This form\\n                 consists of eight hexadecimal numbers, each of which\\n                 expresses a 16-bit value (i.e., each x can be up to 4 hex\\n                 digits).\\n\\n              2. A series of contiguous zero values in the preferred format\\n                 can be abbreviated to ::.  Only one instance of :: can\\n                 occur in an address.  For example, the loopback address\\n                 0:0:0:0:0:0:0:1 can be abbreviated as ::1.  The wildcard\\n                 address, consisting of all zeros, can be written as ::.\\n\\n              3. An alternate format is useful for expressing IPv4-mapped\\n                 IPv6 addresses.  This form is written as\\n                 x:x:x:x:x:x:d.d.d.d, where the six leading xs are\\n                 hexadecimal values that define the six most-significant\\n                 16-bit pieces of the address (i.e., 96 bits), and the ds\\n                 express a value in dotted-decimal notation that defines the\\n                 least significant 32 bits of the address.  An example of\\n                 such an address is ::FFFF:204.152.189.116.\\n\\n              See RFC 2373 for further details on the representation of IPv6\\n              addresses.\\n```"
		},
		{
			"lc_ans_id":"95531",
			"view":"580",
			"top":"8",
			"title":"C++ Simple Solution",
			"vote":"2",
			"content":"```\\nclass Solution {\\nprivate:\\n    bool validIPv4(string &IP) {\\n        int begin = 0, end = 0, cnt = 0;\\n        while (end < IP.size()) {\\n            int leadingZeroCount = 0, num = 0;\\n            while (end < IP.size() && isdigit(IP[end])) {\\n                num = num * 10 + IP[end] - '0';\\n                if (IP[end] == '0' && num == 0) leadingZeroCount++;\\n                if ((leadingZeroCount > 0 && num != 0)\\n                || leadingZeroCount > 1\\n                || end - begin + 1 > 3\\n                || num > 255) return false;\\n                ++end;\\n            }\\n            if (end == begin) return false;\\n            ++cnt;\\n            if (cnt <= 3) {\\n                if (end >= IP.size() || IP[end] != '.') return false;\\n                begin = ++end;\\n            } else {\\n                if (end != IP.size()) return false;\\n            }\\n        }\\n        return cnt == 4;\\n    }\\n    \\n    bool validIPv6(string &IP) {\\n        int cnt = 0, begin = 0, end = 0;\\n        while (end < IP.size()) {\\n            while (end < IP.size() && isalnum(IP[end])) {\\n                if ((IP[end] > 'f' && IP[end] <= 'z')\\n                || (IP[end] > 'F' && IP[end] <= 'Z')\\n                || end - begin + 1 > 4) return false;\\n                ++end;\\n            }\\n            if (begin == end) return false;\\n            ++cnt;\\n            if (cnt <= 7) {\\n                if (end >= IP.size() || IP[end] != ':') return false;\\n                begin = ++end;\\n            } else {\\n                if (end != IP.size()) return false;\\n            }\\n        }\\n        return cnt == 8;\\n    }\\npublic:\\n    string validIPAddress(string IP) {\\n        if (validIPv4(IP)) return \"IPv4\";\\n        if (validIPv6(IP)) return \"IPv6\";\\n        return \"Neither\";\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"95480",
			"view":"94",
			"top":"9",
			"title":"A very clear Java Solution",
			"vote":"1",
			"content":"    public class Solution {\\n    private boolean isIpV4(String ip) {\\n        if (ip == null || ip.isEmpty()) {\\n            return false;\\n        }\\n        String[] splits = ip.split(\"\\\\\\\\.\", -1);\\n        if (splits.length != 4) return false;\\n        for (int i = 0; i < 4; i++) {\\n            try {\\n                int val = Integer.parseInt(splits[i], 10);\\n                if (val < 0 || val > (1 << 8) - 1) return false;\\n            } catch (Exception e) {\\n                return false;\\n            }\\n            if (splits[i].charAt(0) == '-' || splits[i].charAt(0) == '+') return false;\\n            if (splits[i].charAt(0) == '0' && splits[i].length() > 1) return false;\\n        }\\n        return true;\\n    }\\n    \\n    private boolean isIpV6(String ip) {\\n        if (ip == null || ip.isEmpty()) {\\n            return false;\\n        }\\n        String[] splits = ip.split(\":\", - 1);\\n        if (splits.length != 8) return false;\\n        for (int i = 0; i < 8; i++) {\\n            try {\\n                int val = Integer.parseInt(splits[i], 16);\\n                if (val < 0 || val > (1 << 16) - 1) return false;\\n            } catch (Exception e) {\\n                return false;\\n            }\\n            if (splits[i].charAt(0) == '-' || splits[i].charAt(0) == '+') return false;\\n            if (splits[i].length() > 4) return false;\\n        }\\n        return true;\\n    }\\n    \\n    public String validIPAddress(String IP) {\\n        if (isIpV4(IP)) {\\n            return \"IPv4\";\\n        } else if (isIpV6(IP)) {\\n            return \"IPv6\";\\n        } else {\\n            return \"Neither\";\\n        }\\n    }\\n}"
		}
	],
	"id":"462",
	"title":"Validate IP Address",
	"content":"<p>\r\nWrite a function to check whether an input string is a valid IPv4 address or IPv6 address or neither.\r\n</p>\r\n\r\n<p>\r\n<b>IPv4</b> addresses are canonically represented in dot-decimal notation, which consists of four decimal numbers, each ranging from 0 to 255, separated by dots (\".\"), e.g.,<code>172.16.254.1</code>;\r\n</p>\r\n\r\n<p>\r\nBesides, leading zeros in the IPv4 is invalid. For example, the address <code>172.16.254.01</code> is invalid.\r\n</p>\r\n\r\n<p>\r\n<b>IPv6</b> addresses are represented as eight groups of four hexadecimal digits, each group representing 16 bits. The groups are separated by colons (\":\"). For example, the address <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code> is a valid one. Also, we could omit some leading zeros among four hexadecimal digits and some low-case characters in the address to upper-case ones, so <code>2001:db8:85a3:0:0:8A2E:0370:7334</code> is also a valid IPv6 address(Omit leading zeros and using upper cases).\r\n</p>\r\n\r\n\r\n<p>\r\nHowever, we don't replace a consecutive group of zero value with a single empty group using two consecutive colons (::) to pursue simplicity. For example, <code>2001:0db8:85a3::8A2E:0370:7334</code> is an invalid IPv6 address.\r\n</p>\r\n\r\n<p>\r\nBesides, extra leading zeros in the IPv6 is also invalid. For example, the address <code>02001:0db8:85a3:0000:0000:8a2e:0370:7334</code> is invalid.\r\n</p>\r\n\r\n\r\n<p><b>Note:</b>\r\nYou may assume there is no extra space or special characters in the input string.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"172.16.254.1\"\r\n\r\n<b>Output:</b> \"IPv4\"\r\n\r\n<b>Explanation:</b> This is a valid IPv4 address, return \"IPv4\".\r\n</pre>\r\n</p>\r\n\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"2001:0db8:85a3:0:0:8A2E:0370:7334\"\r\n\r\n<b>Output:</b> \"IPv6\"\r\n\r\n<b>Explanation:</b> This is a valid IPv6 address, return \"IPv6\".\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> \"256.256.256.256\"\r\n\r\n<b>Output:</b> \"Neither\"\r\n\r\n<b>Explanation:</b> This is neither a IPv4 address nor a IPv6 address.\r\n</pre>\r\n</p>",
	"frequency":"129",
	"ac_num":"11505"
}