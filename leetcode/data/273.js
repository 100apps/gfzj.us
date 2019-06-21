{
	"difficulty":"3",
	"submit_num":"233750",
	"show_id":"273",
	"leetcode_id":"273",
	"answers":[
		{
			"lc_ans_id":"70625",
			"view":"33757",
			"top":"0",
			"title":"My clean Java solution, very easy to understand",
			"vote":"217",
			"content":"    private final String[] LESS_THAN_20 = {\"\", \"One\", \"Two\", \"Three\", \"Four\", \"Five\", \"Six\", \"Seven\", \"Eight\", \"Nine\", \"Ten\", \"Eleven\", \"Twelve\", \"Thirteen\", \"Fourteen\", \"Fifteen\", \"Sixteen\", \"Seventeen\", \"Eighteen\", \"Nineteen\"};\\n\\tprivate final String[] TENS = {\"\", \"Ten\", \"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\", \"Ninety\"};\\n\\tprivate final String[] THOUSANDS = {\"\", \"Thousand\", \"Million\", \"Billion\"};\\n\\t\\n    public String numberToWords(int num) {\\n        if (num == 0) return \"Zero\";\\n\\n        int i = 0;\\n        String words = \"\";\\n        \\n        while (num > 0) {\\n            if (num % 1000 != 0)\\n        \\t    words = helper(num % 1000) +THOUSANDS[i] + \" \" + words;\\n        \\tnum /= 1000;\\n        \\ti++;\\n        }\\n        \\n        return words.trim();\\n    }\\n    \\n    private String helper(int num) {\\n        if (num == 0)\\n            return \"\";\\n        else if (num < 20)\\n            return LESS_THAN_20[num] + \" \";\\n        else if (num < 100)\\n            return TENS[num / 10] + \" \" + helper(num % 10);\\n        else\\n            return LESS_THAN_20[num / 100] + \" Hundred \" + helper(num % 100);\\n    }"
		},
		{
			"lc_ans_id":"70627",
			"view":"11094",
			"top":"1",
			"title":"Short clean Java solution",
			"vote":"115",
			"content":"    public class Solution {\\n        private final String[] belowTen = new String[] {\"\", \"One\", \"Two\", \"Three\", \"Four\", \"Five\", \"Six\", \"Seven\", \"Eight\", \"Nine\"};\\n        private final String[] belowTwenty = new String[] {\"Ten\", \"Eleven\", \"Twelve\", \"Thirteen\", \"Fourteen\", \"Fifteen\", \"Sixteen\", \"Seventeen\", \"Eighteen\", \"Nineteen\"};\\n        private final String[] belowHundred = new String[] {\"\", \"Ten\", \"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\", \"Ninety\"};\\n        \\n        public String numberToWords(int num) {\\n            if (num == 0) return \"Zero\";\\n            return helper(num); \\n        }\\n        \\n        private String helper(int num) {\\n            String result = new String();\\n            if (num < 10) result = belowTen[num];\\n            else if (num < 20) result = belowTwenty[num -10];\\n            else if (num < 100) result = belowHundred[num/10] + \" \" + helper(num % 10);\\n            else if (num < 1000) result = helper(num/100) + \" Hundred \" +  helper(num % 100);\\n            else if (num < 1000000) result = helper(num/1000) + \" Thousand \" +  helper(num % 1000);\\n            else if (num < 1000000000) result = helper(num/1000000) + \" Million \" +  helper(num % 1000000);\\n            else result = helper(num/1000000000) + \" Billion \" + helper(num % 1000000000);\\n            return result.trim();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"70651",
			"view":"8729",
			"top":"2",
			"title":"Fairly Clear 4ms C++ solution",
			"vote":"51",
			"content":"    class Solution {\\n    public:\\n        static string numberToWords(int n) {\\n            if(n == 0) return \"Zero\";\\n            else return int_string(n).substr(1);\\n        }\\n    private:\\n        static const char * const below_20[];\\n        static const char * const below_100[];\\n        static string int_string(int n) {\\n            if(n >= 1000000000)   return int_string(n / 1000000000) + \" Billion\" + int_string(n - 1000000000 * (n / 1000000000));\\n            else if(n >= 1000000) return int_string(n / 1000000) + \" Million\" + int_string(n - 1000000 * (n / 1000000));\\n            else if(n >= 1000)    return int_string(n / 1000) + \" Thousand\" + int_string(n - 1000 * (n / 1000));\\n            else if(n >= 100)     return int_string(n / 100) + \" Hundred\" + int_string(n - 100 * (n / 100));\\n            else if(n >= 20)      return string(\" \") + below_100[n / 10 - 2] + int_string(n - 10 * (n / 10));\\n            else if(n >= 1)       return string(\" \") + below_20[n - 1];\\n            else return \"\";\\n            }\\n        }\\n    };\\n\\n    const char * const Solution::below_20[] =  {\"One\", \"Two\", \"Three\", \"Four\",\"Five\",\"Six\",\"Seven\",\"Eight\",\"Nine\",\"Ten\", \"Eleven\",\"Twelve\",\"Thirteen\",\"Fourteen\",\"Fifteen\",\"Sixteen\",\"Seventeen\",\"Eighteen\",\"Nineteen\"};\\n    const char * const Solution::below_100[] = {\"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\", \"Ninety\"};"
		},
		{
			"lc_ans_id":"70632",
			"view":"6523",
			"top":"3",
			"title":"Recursive Python",
			"vote":"42",
			"content":"    def numberToWords(self, num):\\n        to19 = 'One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve ' \\\\\\n               'Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen'.split()\\n        tens = 'Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety'.split()\\n        def words(n):\\n            if n < 20:\\n                return to19[n-1:n]\\n            if n < 100:\\n                return [tens[n/10-2]] + words(n%10)\\n            if n < 1000:\\n                return [to19[n/100-1]] + ['Hundred'] + words(n%100)\\n            for p, w in enumerate(('Thousand', 'Million', 'Billion'), 1):\\n                if n < 1000**(p+1):\\n                    return words(n/1000**p) + [w] + words(n%1000**p)\\n        return ' '.join(words(num)) or 'Zero'"
		},
		{
			"lc_ans_id":"70759",
			"view":"4128",
			"top":"4",
			"title":"My Java Solution",
			"vote":"14",
			"content":"    public String numberToWords(int num) {\\n        if(num == 0)\\n            return \"Zero\";\\n        String[] bigString = new String[]{\"Thousand\",\"Million\",\"Billion\"};\\n        String result =  numberToWordsHelper(num%1000);\\n        num = num/1000;\\n        if(num > 0 && num%1000>0){\\n            result = numberToWordsHelper(num%1000) + \"Thousand \" + result;\\n        }\\n        num = num/1000;\\n        if(num > 0 && num%1000>0){\\n            result = numberToWordsHelper(num%1000) + \"Million \" + result;\\n        }\\n        num = num/1000;\\n        if(num > 0){\\n            result = numberToWordsHelper(num%1000) + \"Billion \" + result;\\n        }\\n        return result.trim();\\n    }\\n    \\n    public String numberToWordsHelper(int num){\\n        String[] digitString = new String[]{\"Zero\", \"One\", \"Two\", \"Three\", \"Four\", \"Five\", \"Six\", \"Seven\", \"Eight\", \"Nine\"};\\n        String[] teenString = new String[]{\"Ten\", \"Eleven\", \"Twelve\", \"Thirteen\", \"Fourteen\", \"Fifteen\", \"Sixteen\", \"Seventeen\",\"Eighteen\", \"Nineteen\"};\\n        String[] tenString = new String[]{\"\",\"\",\"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\", \"Ninety\"};\\n        String result = \"\";\\n        if(num > 99){\\n            result += digitString[num/100] + \" Hundred \";\\n        }\\n        num = num % 100;\\n        if(num < 20 && num > 9){\\n            result += teenString[num%10]+\" \";\\n        }else{\\n            if(num > 19){\\n                result += tenString[num/10]+\" \";\\n            }\\n            num = num % 10;\\n            if(num > 0)\\n                result += digitString[num]+\" \";\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"70688",
			"view":"1465",
			"top":"5",
			"title":"Python Clean Solution",
			"vote":"13",
			"content":"    def __init__(self):\\n        self.lessThan20 = [\"\",\"One\",\"Two\",\"Three\",\"Four\",\"Five\",\"Six\",\"Seven\",\"Eight\",\"Nine\",\"Ten\",\"Eleven\",\"Twelve\",\"Thirteen\",\"Fourteen\",\"Fifteen\",\"Sixteen\",\"Seventeen\",\"Eighteen\",\"Nineteen\"]\\n        self.tens = [\"\",\"Ten\",\"Twenty\",\"Thirty\",\"Forty\",\"Fifty\",\"Sixty\",\"Seventy\",\"Eighty\",\"Ninety\"]\\n        self.thousands = [\"\",\"Thousand\",\"Million\",\"Billion\"]\\n    \\n    def numberToWords(self, num):\\n        if num == 0:\\n            return \"Zero\"\\n        res = \"\"\\n        for i in range(len(self.thousands)):\\n            if num % 1000 != 0:\\n                res = self.helper(num%1000) + self.thousands[i] + \" \" + res\\n            num /= 1000\\n        return res.strip()\\n    \\n    def helper(self, num):\\n        if num == 0:\\n            return \"\"\\n        elif num < 20:\\n            return self.lessThan20[num] + \" \"\\n        elif num < 100:\\n            return self.tens[num/10] + \" \" + self.helper(num%10)\\n        else:\\n            return self.lessThan20[num/100] + \" Hundred \" + self.helper(num%100)"
		},
		{
			"lc_ans_id":"70756",
			"view":"2079",
			"top":"6",
			"title":"Short clean C++ code, with explanation",
			"vote":"11",
			"content":"Function hundredStr() produces a string from integer less than 100.\\n\\nAnd in numberToWords() it uses a for loop to set \"Thousand\",\"Million\",\"Billion\".\\n\\n    class Solution {\\n    public:\\n        string hundredStr(int num){\\n            vector<string> arr1={\"\",\"One\",\"Two\",\"Three\",\"Four\",\"Five\",\"Six\",\"Seven\",\"Eight\",\"Nine\",\"Ten\",\\n            \"Eleven\",\"Twelve\",\"Thirteen\",\"Fourteen\",\"Fifteen\",\"Sixteen\",\"Seventeen\",\"Eighteen\",\"Nineteen\"};\\n            vector<string> arr2={\"\",\"\",\"Twenty\",\"Thirty\",\"Forty\",\"Fifty\",\"Sixty\",\"Seventy\",\"Eighty\",\"Ninety\"};\\n            string ret;\\n            ret=num%100<20?arr1[num%100]:arr2[(num%100)/10]+(num%10?\" \"+arr1[num%10]:\"\");\\n            if(num>99)ret=arr1[num/100]+\" Hundred\"+(num%100?\" \"+ret:\"\");\\n            return ret;\\n        }\\n        string numberToWords(int num) {\\n            string ret;\\n            vector<string> strarr={\"Thousand\",\"Million\",\"Billion\"};\\n            ret=hundredStr(num%1000);\\n            for(int i=0;i<3;i++){\\n                num/=1000;\\n                ret=num%1000?hundredStr(num%1000)+\" \"+strarr[i]+\" \"+ ret:ret;\\n            }\\n            while(ret.back()==' ')ret.pop_back();\\n            return ret.empty()?\"Zero\":ret;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"70755",
			"view":"2059",
			"top":"7",
			"title":"C++ solution 4ms",
			"vote":"11",
			"content":"//8ms\\t\\n\\n    string helper(int& num){\\n    \\t\\tconst static char* less_ten[] =\\n    \\t\\t{ \"\", \" One\", \" Two\", \" Three\", \" Four\", \" Five\", \" Six\", \" Seven\", \" Eight\", \" Nine\" };\\n    \\t\\tconst static char* less_twenty[] =\\n    \\t\\t{ \" Ten\", \" Eleven\", \" Twelve\", \" Thirteen\", \" Fourteen\", \" Fifteen\", \" Sixteen\", \" Seventeen\", \" Eighteen\", \" Nineteen\" };\\n    \\t\\tconst static char* less_hundred[] =\\n    \\t\\t{ \"\", \"\", \" Twenty\", \" Thirty\", \" Forty\", \" Fifty\", \" Sixty\", \" Seventy\", \" Eighty\", \" Ninety\" };\\n    \\n    \\t\\tint less_thousand = num % 1000;\\n    \\t\\tnum /= 1000;\\n    \\t\\tstring s; \\n    \\t\\t\\n    \\t\\tif (less_thousand != 0){\\n    \\t\\t\\tint hundred = less_thousand / 100;\\n    \\t\\t\\tless_thousand %= 100; \\n    \\t\\t\\tint tenth = less_thousand / 10; \\n    \\t\\t\\tint single = less_thousand % 10; \\n    \\t\\t\\t\\n    \\t\\t\\tif (hundred) s = s + less_ten[hundred] + \" Hundred\";\\n    \\t\\t\\t\\n    \\t\\t\\tif (tenth){\\n    \\t\\t\\t\\tif (tenth == 1){\\n    \\t\\t            s += less_twenty[single];\\n    \\t\\t\\t\\t\\treturn s;\\n    \\t\\t\\t\\t}\\n    \\t\\t\\t\\telse  s += less_hundred[tenth];\\n    \\n    \\t\\t\\t}\\n    \\t\\t\\tif (single) s += less_ten[single];\\n    \\t\\t}\\n    \\t\\treturn s;\\n    \\t}\\n    \\tstring numberToWords(int num) {\\n    \\t\\tconst static char* unit[] = \\n    \\t\\t    { \"\", \" Thousand\", \" Million\", \" Billion\", \" Triliion\" };\\n    \\t\\t    \\n    \\t\\tstring s;\\n    \\t\\tint i = 0;\\n    \\t\\twhile (num){\\n    \\t\\t\\tstring part = helper(num);\\n    \\t\\t\\tif(i++ == 0){\\n    \\t\\t\\t    s = part; \\n    \\t\\t\\t} \\n    \\t\\t\\telse if (part.size()) s = part + unit[i] + s;\\n    \\t\\t}\\n    \\t\\ts = s.size() ? s.substr(1) : \"Zero\";\\n    \\t\\treturn s;\\n    \\t}\\n\\n\\nA faster version and maybe easier to understand (4ms):\\n\\n    string helper(int num){\\n    \\tconst static char* less_ten[] =\\n    \\t{ \"\", \" One\", \" Two\", \" Three\", \" Four\", \" Five\", \" Six\", \" Seven\", \" Eight\", \" Nine\" };\\n    \\tconst static char* less_twenty[] =\\n    \\t{ \" Ten\", \" Eleven\", \" Twelve\", \" Thirteen\", \" Fourteen\", \" Fifteen\", \" Sixteen\", \" Seventeen\", \" Eighteen\", \" Nineteen\" };\\n    \\tconst static char* less_hundred[] =\\n    \\t{ \"\", \"\", \" Twenty\", \" Thirty\", \" Forty\", \" Fifty\", \" Sixty\", \" Seventy\", \" Eighty\", \" Ninety\" };\\n    \\n    \\tstring s; \\n    \\t\\n    \\tif (num != 0){\\n    \\t    //get hundredth, tenth, and single digit\\n    \\t\\tint hundred = num / 100;\\n    \\t\\tnum %= 100; \\n    \\t\\tint tenth = num / 10; \\n    \\t\\tint single = num % 10; \\n    \\t\\t\\n    \\t\\tif (hundred) s = s + less_ten[hundred] + \" Hundred\";\\n    \\t\\t\\n    \\t\\tif (tenth){\\n    \\t\\t\\tif (tenth == 1){ //special handling, choose from less_twenty based on value of single\\n    \\t            s += less_twenty[single];\\n    \\t\\t\\t\\treturn s;\\n    \\t\\t\\t}\\n    \\t\\t\\telse  s += less_hundred[tenth];\\n    \\n    \\t\\t}\\n    \\t\\tif (single) s += less_ten[single];\\n    \\t}\\n    \\treturn s;\\n    }\\n    string numberToWords(int num) {\\n    \\tconst static char* unit[] = \\n    \\t    { \"\", \" Thousand\", \" Million\", \" Billion\" };\\n    \\tint parts[4] = {0};\\n    \\tfor(int i  = 0; i < 4; ++i){\\n    \\t    parts[i] = num % 1000;\\n    \\t    num /= 1000; \\n    \\t}\\n    \\tstring s; \\n    \\tfor(int i = 0; i < 4; ++i){\\n    \\t    if(parts[i] == 0) continue; \\n    \\t    s = helper(parts[i]) + unit[i] + s;  \\n    \\t}\\n    \\ts = s.size() ? s.substr(1) : \"Zero\";\\n    \\treturn s;\\n    }"
		},
		{
			"lc_ans_id":"70635",
			"view":"960",
			"top":"8",
			"title":"4ms Clean Java Solution",
			"vote":"6",
			"content":"    public class Solution {\\n        public String[] oneToNineteen = new String[]{\\n            \"\",\\n            \"One\",\\n            \"Two\",\\n            \"Three\",\\n            \"Four\",\\n            \"Five\",\\n            \"Six\",\\n            \"Seven\",\\n            \"Eight\",\\n            \"Nine\",\\n            \"Ten\",\\n            \"Eleven\",\\n            \"Twelve\",\\n            \"Thirteen\",\\n            \"Fourteen\",\\n            \"Fifteen\",\\n            \"Sixteen\",\\n            \"Seventeen\",\\n            \"Eighteen\",\\n            \"Nineteen\"\\n        };\\n        \\n        public String[] twentyToNinety = new String[]{\\n            \"\",\\n            \"Ten\",\\n            \"Twenty\",\\n            \"Thirty\",\\n            \"Forty\",\\n            \"Fifty\",\\n            \"Sixty\",\\n            \"Seventy\",\\n            \"Eighty\",\\n            \"Ninety\"\\n        };\\n        \\n        public String[] hunderedToBillion = new String[]{\\n            \"Hundred\",\\n            \"Thousand\",\\n            \"Million\",\\n            \"Billion\"\\n        };\\n        \\n        public String numberToWords(int num) {\\n            if(num == 0){\\n                return \"Zero\";\\n            }\\n            \\n            StringBuilder builder = new StringBuilder();\\n            convert(num, builder);\\n            return builder.toString().trim();\\n        }\\n        \\n        public void convert(int n, StringBuilder builder){\\n            if(n == 0){\\n            \\treturn;\\n            }\\n            \\t\\n            if(n < 20){\\n                builder.append(oneToNineteen[n]);\\n                builder.append(\" \");\\n            }else if(n < 100){\\n                builder.append(twentyToNinety[n/10]);\\n                builder.append(\" \");\\n                convert(n%10, builder);\\n            }else if(n<1000){\\n                convert(n/100, builder);\\n                builder.append(hunderedToBillion[0]);\\n                builder.append(\" \");\\n                convert(n%100, builder);\\n            }else if(n<1000000){\\n                convert(n/1000, builder);\\n                builder.append(hunderedToBillion[1]);\\n                builder.append(\" \");\\n                convert(n%1000, builder);\\n            }else if(n<1000000000){\\n                convert(n/1000000, builder);\\n                builder.append(hunderedToBillion[2]);\\n                builder.append(\" \");\\n                convert(n%1000000, builder);\\n            }else{\\n                convert(n/1000000000, builder);\\n                builder.append(hunderedToBillion[3]);\\n                builder.append(\" \");\\n                convert(n%1000000000, builder);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"70731",
			"view":"1000",
			"top":"9",
			"title":"Share my clean Java Solution",
			"vote":"6",
			"content":"    public String numberToWords(int num) {\\n        if (num == 0) return \"Zero\";\\n        String[] big= {\"\", \"Thousand\", \"Million\", \"Billion\"};\\n        String[] small = {\"Ten\", \"Eleven\", \"Twelve\", \"Thirteen\", \"Fourteen\", \"Fifteen\", \"Sixteen\", \"Seventeen\", \"Eighteen\", \"Nineteen\"};\\n        String[] tens = {\"Twenty\", \"Thirty\", \"Forty\", \"Fifty\", \"Sixty\", \"Seventy\", \"Eighty\", \"Ninety\"};\\n        String[] ones = {\"\", \"One\", \"Two\", \"Three\", \"Four\", \"Five\", \"Six\", \"Seven\", \"Eight\", \"Nine\"};\\n        StringBuilder res = new StringBuilder();\\n        int count = 0;\\n        while (num != 0) {\\n            int cur = num % 1000;\\n            int o = cur % 10, t = (cur / 10) % 10, h = cur / 100;\\n            StringBuilder tmp = new StringBuilder();\\n            if (h != 0) tmp.append(ones[h] + \" Hundred \");\\n            if (t == 1) tmp.append(small[o] + \" \");\\n            else {\\n                if (t > 1) tmp.append(tens[t-2] + \" \");\\n                if (o > 0) tmp.append(ones[o] + \" \");\\n            }\\n            if(tmp.length() != 0) tmp.append(big[count] + \" \");\\n            res.insert(0, tmp);\\n            num /= 1000;\\n            count++;\\n        }\\n        return res.toString().trim();\\n    }"
		}
	],
	"id":"273",
	"title":"Integer to English Words",
	"content":"<p>\r\nConvert a non-negative integer to its english words representation. Given input is guaranteed to be less than 2<sup>31</sup> - 1.\r\n</p>\r\n\r\n<p>For example,<br>\r\n<pre>\r\n123 -> \"One Hundred Twenty Three\"\r\n12345 -> \"Twelve Thousand Three Hundred Forty Five\"\r\n1234567 -> \"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven\"</pre></p>",
	"frequency":"497",
	"ac_num":"52938"
}