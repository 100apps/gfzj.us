{
	"difficulty":"1",
	"submit_num":"543807",
	"show_id":"67",
	"leetcode_id":"67",
	"answers":[
		{
			"lc_ans_id":"24475",
			"view":"30563",
			"top":"0",
			"title":"Short code by c++",
			"vote":"233",
			"content":"    class Solution\\n    {\\n    public:\\n        string addBinary(string a, string b)\\n        {\\n            string s = \"\";\\n            \\n            int c = 0, i = a.size() - 1, j = b.size() - 1;\\n            while(i >= 0 || j >= 0 || c == 1)\\n            {\\n                c += i >= 0 ? a[i --] - '0' : 0;\\n                c += j >= 0 ? b[j --] - '0' : 0;\\n                s = char(c % 2 + '0') + s;\\n                c /= 2;\\n            }\\n            \\n            return s;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"24488",
			"view":"31111",
			"top":"1",
			"title":"Short AC solution in Java with explanation",
			"vote":"158",
			"content":"    public class Solution {\\n        public String addBinary(String a, String b) {\\n            StringBuilder sb = new StringBuilder();\\n            int i = a.length() - 1, j = b.length() -1, carry = 0;\\n            while (i >= 0 || j >= 0) {\\n                int sum = carry;\\n                if (j >= 0) sum += b.charAt(j--) - '0';\\n                if (i >= 0) sum += a.charAt(i--) - '0';\\n                sb.append(sum % 2);\\n                carry = sum / 2;\\n            }\\n            if (carry != 0) sb.append(carry);\\n            return sb.reverse().toString();\\n        }\\n    }\\n\\nComputation from string usually can be simplified by using a carry as such."
		},
		{
			"lc_ans_id":"24524",
			"view":"24123",
			"top":"2",
			"title":"Simple accepted java solution",
			"vote":"68",
			"content":"    public class Solution {\\n        public String addBinary(String a, String b) {\\n            if(a == null || a.isEmpty()) {\\n                return b;\\n            }\\n            if(b == null || b.isEmpty()) {\\n                return a;\\n            }\\n            char[] aArray = a.toCharArray();\\n            char[] bArray = b.toCharArray();\\n            StringBuilder stb = new StringBuilder();\\n    \\n            int i = aArray.length - 1;\\n            int j = bArray.length - 1;\\n            int aByte;\\n            int bByte;\\n            int carry = 0;\\n            int result;\\n    \\n            while(i > -1 || j > -1 || carry == 1) {\\n                aByte = (i > -1) ? Character.getNumericValue(aArray[i--]) : 0;\\n                bByte = (j > -1) ? Character.getNumericValue(bArray[j--]) : 0;\\n                result = aByte ^ bByte ^ carry;\\n                carry = ((aByte + bByte + carry) >= 2) ? 1 : 0;\\n                stb.append(result);\\n            }\\n            return stb.reverse().toString();\\n        }\\n    }\\n\\nAddition bits are calculated by xor. Carry bit is calculated as simple integer addition."
		},
		{
			"lc_ans_id":"24500",
			"view":"10066",
			"top":"3",
			"title":"An accepted concise Python recursive solution 10 lines",
			"vote":"34",
			"content":"    #add two binary from back to front, I think it is very self explained, when 1+1 we need a carry.\\n       class Solution:\\n            def addBinary(self, a, b):\\n                if len(a)==0: return b\\n                if len(b)==0: return a\\n                if a[-1] == '1' and b[-1] == '1':\\n                    return self.addBinary(self.addBinary(a[0:-1],b[0:-1]),'1')+'0'\\n                if a[-1] == '0' and b[-1] == '0':\\n                    return self.addBinary(a[0:-1],b[0:-1])+'0'\\n                else:\\n                    return self.addBinary(a[0:-1],b[0:-1])+'1'"
		},
		{
			"lc_ans_id":"24756",
			"view":"7685",
			"top":"4",
			"title":"Very concise C++ solution without calculating longest string",
			"vote":"30",
			"content":"I am not sure if this can be made even more concise (possibly yes), but I believe this is sufficiently concise without sacrificing readability.\\n\\n    string addBinary(string a, string b) \\n    {\\n        string result = \"\";\\n        int apos = a.size() - 1;\\n        int bpos = b.size() - 1;\\n        int adigit, bdigit, carry = 0;\\n        \\n        while (apos >= 0 || bpos >= 0 || carry == 1)\\n        {\\n            adigit = bdigit = 0;\\n            \\n            if (apos >= 0) adigit = a[apos--] == '1';\\n            if (bpos >= 0) bdigit = b[bpos--] == '1';\\n            \\n            // Another way: the digit is 1 if adigit + bdigit + carry == 1 or == 3, but I noticed that\\n            // XOR is more concise:\\n            result = static_cast<char>(adigit ^ bdigit ^ carry + '0') + result; \\n            carry = adigit + bdigit + carry >= 2;\\n        }\\n        \\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"24759",
			"view":"2317",
			"top":"5",
			"title":"Tiny clean C++ solution, quite readable",
			"vote":"25",
			"content":"    class Solution {\\n    public:\\n            string addBinary(string a, string b) {\\n                    string ret = \"\";\\n                    int carry = 0;\\n                    for (int i = a.size() - 1, j = b.size() - 1; i >= 0 || j >= 0; i--, j--) {\\n                            int m = (i >= 0 && a[i] == '1');\\n                            int n = (j >= 0 && b[j] == '1');\\n                            ret = to_string((m + n + carry) & 0x1) + ret;\\n                            carry = (m + n + carry) >> 1;\\n                    }\\n                    return carry ? '1' + ret : ret;\\n            }\\n    };"
		},
		{
			"lc_ans_id":"24562",
			"view":"4054",
			"top":"6",
			"title":"One line Python solution.",
			"vote":"14",
			"content":"    class Solution:\\n        def addBinary(self, a, b):\\n            return bin(eval('0b' + a) + eval('0b' + b))[2:]"
		},
		{
			"lc_ans_id":"24667",
			"view":"3914",
			"top":"7",
			"title":"13 Lines Easy JAVA Solution, Simple and Elegant",
			"vote":"14",
			"content":"    public String addBinary(String a, String b) {\\n        int lena = a.length();\\n        int lenb = b.length();\\n        int i =0, carry = 0;\\n        String res = \"\";\\n        while(i<lena || i<lenb || carry!=0){\\n            int x = (i<lena) ? Character.getNumericValue(a.charAt(lena - 1 - i)) : 0;\\n            int y = (i<lenb) ? Character.getNumericValue(b.charAt(lenb - 1 - i)) : 0;\\n            res = (x + y + carry)%2 + res;\\n            carry = (x + y + carry)/2;\\n            i++;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"24585",
			"view":"2443",
			"top":"8",
			"title":"My simple 4ms JAVA Solution. Clean and consice.",
			"vote":"12",
			"content":"      public String addBinary(String a, String b) {\\n        int aLength = a.length();\\n        int bLength = b.length();\\n        StringBuilder sb = new StringBuilder();\\n        int carry = 0;\\n        while(Math.max(aLength, bLength) > 0) {\\n          int aNum = aLength > 0 ? (a.charAt(aLength---1) - '0') : 0;\\n          int bNum = bLength > 0 ? (b.charAt(bLength---1) - '0') : 0;\\n          int cNum = aNum + bNum + carry;\\n          sb.append(cNum%2);\\n          carry = cNum / 2;\\n        }\\n        return (carry == 1)?sb.append(1).reverse().toString():sb.reverse().toString();\\n      }"
		},
		{
			"lc_ans_id":"24708",
			"view":"1636",
			"top":"9",
			"title":"Another simple java.",
			"vote":"11",
			"content":"    public String addBinary(String a, String b) {\\n        if(a == null || b ==null)\\n            return a == null? b: a;\\n            \\n        int carry =0;\\n        StringBuilder sb = new StringBuilder();        \\n        \\n        for(int i = a.length()-1, j = b.length() -1;  i >=0 || j >=0 || carry >0 ; i --, j --){\\n            int sum = 0;\\n            sum += (i >=0) ? a.charAt(i) - '0' : 0;\\n            sum += (j >=0) ? b.charAt(j) - '0' : 0;\\n            sum += carry;\\n            \\n            carry = sum /2;\\n            sum %=2;\\n            sb.append(sum);\\n        }\\n        \\n        return sb.reverse().toString();\\n    }"
		}
	],
	"id":"67",
	"title":"Add Binary",
	"content":"<p>\r\nGiven two binary strings, return their sum (also a binary string).\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\na = <code>\"11\"</code><br />\r\nb = <code>\"1\"</code><br />\r\nReturn <code>\"100\"</code>.\r\n</p>",
	"frequency":"550",
	"ac_num":"183071"
}