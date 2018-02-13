{
	"difficulty":"2",
	"submit_num":"1498704",
	"show_id":"8",
	"leetcode_id":"8",
	"answers":[
		{
			"lc_ans_id":"4654",
			"view":"69380",
			"top":"0",
			"title":"My simple solution",
			"vote":"218",
			"content":"I think we only need to handle four cases: \\n\\n 1. discards all leading whitespaces\\n 2. sign of the number\\n 3. overflow\\n 4. invalid input\\n\\nIs there any better solution? Thanks for pointing out!\\n\\n    int atoi(const char *str) {\\n        int sign = 1, base = 0, i = 0;\\n        while (str[i] == ' ') { i++; }\\n        if (str[i] == '-' || str[i] == '+') {\\n            sign = 1 - 2 * (str[i++] == '-'); \\n        }\\n        while (str[i] >= '0' && str[i] <= '9') {\\n            if (base >  INT_MAX / 10 || (base == INT_MAX / 10 && str[i] - '0' > 7)) {\\n                if (sign == 1) return INT_MAX;\\n                else return INT_MIN;\\n            }\\n            base  = 10 * base + (str[i++] - '0');\\n        }\\n        return base * sign;\\n    }"
		},
		{
			"lc_ans_id":"4640",
			"view":"25909",
			"top":"1",
			"title":"Such a shitty problem",
			"vote":"187",
			"content":"The description is not clear not all unless you click on the hint. What's the point of testing all the \"+-1\" or \"-+1\" without any input spec nor any situation where input is obtained."
		},
		{
			"lc_ans_id":"4643",
			"view":"33345",
			"top":"2",
			"title":"Java Solution with 4 steps explanations",
			"vote":"128",
			"content":"    public int myAtoi(String str) {\\n        int index = 0, sign = 1, total = 0;\\n        //1. Empty string\\n        if(str.length() == 0) return 0;\\n\\n        //2. Remove Spaces\\n        while(str.charAt(index) == ' ' && index < str.length())\\n            index ++;\\n\\n        //3. Handle signs\\n        if(str.charAt(index) == '+' || str.charAt(index) == '-'){\\n            sign = str.charAt(index) == '+' ? 1 : -1;\\n            index ++;\\n        }\\n        \\n        //4. Convert number and avoid overflow\\n        while(index < str.length()){\\n            int digit = str.charAt(index) - '0';\\n            if(digit < 0 || digit > 9) break;\\n\\n            //check if total will be overflow after 10 times and add digit\\n            if(Integer.MAX_VALUE/10 < total || Integer.MAX_VALUE/10 == total && Integer.MAX_VALUE %10 < digit)\\n                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;\\n\\n            total = 10 * total + digit;\\n            index ++;\\n        }\\n        return total * sign;\\n    }"
		},
		{
			"lc_ans_id":"4672",
			"view":"14110",
			"top":"3",
			"title":"JAVA-------Easy  Version To Understand!!!!!!!!!!",
			"vote":"46",
			"content":"    \\tpublic static int myAtoi(String str) {\\n\\t\\tif (str == null || str.length() == 0)\\n\\t\\t\\treturn 0;//\\n\\t\\tstr = str.trim();\\n\\t\\tchar firstChar = str.charAt(0);\\n\\t\\tint sign = 1, start = 0, len = str.length();\\n\\t\\tlong sum = 0;\\n\\t\\tif (firstChar == '+') {\\n\\t\\t\\tsign = 1;\\n\\t\\t\\tstart++;\\n\\t\\t} else if (firstChar == '-') {\\n\\t\\t\\tsign = -1;\\n\\t\\t\\tstart++;\\n\\t\\t}\\n\\t\\tfor (int i = start; i < len; i++) {\\n\\t\\t\\tif (!Character.isDigit(str.charAt(i)))\\n\\t\\t\\t\\treturn (int) sum * sign;\\n\\t\\t\\tsum = sum * 10 + str.charAt(i) - '0';\\n\\t\\t\\tif (sign == 1 && sum > Integer.MAX_VALUE)\\n\\t\\t\\t\\treturn Integer.MAX_VALUE;\\n\\t\\t\\tif (sign == -1 && (-1) * sum < Integer.MIN_VALUE)\\n\\t\\t\\t\\treturn Integer.MIN_VALUE;\\n\\t\\t}\\n\\n\\t\\treturn (int) sum * sign;\\n\\t}"
		},
		{
			"lc_ans_id":"4642",
			"view":"19965",
			"top":"4",
			"title":"8ms C++ solution, easy to understand",
			"vote":"45",
			"content":"    int myAtoi(string str) {\\n        long result = 0;\\n        int indicator = 1;\\n        for(int i = 0; i<str.size();)\\n        {\\n            i = str.find_first_not_of(' ');\\n            if(str[i] == '-' || str[i] == '+')\\n                indicator = (str[i++] == '-')? -1 : 1;\\n            while('0'<= str[i] && str[i] <= '9') \\n            {\\n                result = result*10 + (str[i++]-'0');\\n                if(result*indicator >= INT_MAX) return INT_MAX;\\n                if(result*indicator <= INT_MIN) return INT_MIN;                \\n            }\\n            return result*indicator;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"4673",
			"view":"3856",
			"top":"5",
			"title":"60ms python solution; OJ says this beats 100% python submissions",
			"vote":"18",
			"content":"    class Solution(object):\\n        def myAtoi(self, s):\\n            \"\"\"\\n            :type str: str\\n            :rtype: int\\n            \"\"\"\\n            ###better to do strip before sanity check (although 8ms slower):\\n            #ls = list(s.strip())\\n            #if len(ls) == 0 : return 0\\n            if len(s) == 0 : return 0\\n            ls = list(s.strip())\\n            \\n            sign = -1 if ls[0] == '-' else 1\\n            if ls[0] in ['-','+'] : del ls[0]\\n            ret, i = 0, 0\\n            while i < len(ls) and ls[i].isdigit() :\\n                ret = ret*10 + ord(ls[i]) - ord('0')\\n                i += 1\\n            return max(-2**31, min(sign * ret,2**31-1))"
		},
		{
			"lc_ans_id":"4710",
			"view":"2682",
			"top":"6",
			"title":"My Nice Java Code 3ms",
			"vote":"16",
			"content":"    public class Solution {\\n    \\tpublic int myAtoi(String str) {\\n    \\t\\tif (str.isEmpty())\\n    \\t\\t\\treturn 0;\\n    \\t\\tstr = str.trim();\\n    \\t\\tint i = 0, ans = 0, sign = 1, len = str.length();\\n    \\t\\tif (str.charAt(i) == '-' || str.charAt(i) == '+')\\n    \\t\\t\\tsign = str.charAt(i++) == '+' ? 1 : -1;\\n    \\t\\tfor (; i < len; ++i) {\\n    \\t\\t\\tint tmp = str.charAt(i) - '0';\\n    \\t\\t\\tif (tmp < 0 || tmp > 9)\\n    \\t\\t\\t\\tbreak;\\n    \\t\\t\\tif (ans > Integer.MAX_VALUE / 10\\n    \\t\\t\\t\\t\\t|| (ans == Integer.MAX_VALUE / 10 && Integer.MAX_VALUE % 10 < tmp))\\n    \\t\\t\\t\\treturn sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;\\n    \\t\\t\\telse\\n    \\t\\t\\t\\tans = ans * 10 + tmp;\\n    \\t\\t}\\n    \\t\\treturn sign * ans;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"4909",
			"view":"2963",
			"top":"7",
			"title":"8 line C++ concise solution",
			"vote":"16",
			"content":"    int myAtoi(string str) {\\n        int ret = 0, sign = 1, i = str.find_first_not_of(' '), base = INT_MAX / 10;\\n        if (str[i] == '+' || str[i] == '-') sign = str[i++] == '+' ?: -1;\\n        while (isdigit(str[i])) {\\n            if (ret > base || (ret == base && str[i] - '0' > 7)) \\n                return sign > 0 ? INT_MAX : INT_MIN;\\n            ret = 10 * ret + (str[i++] - '0');\\n        }\\n        return sign * ret;\\n    }"
		},
		{
			"lc_ans_id":"4653",
			"view":"4812",
			"top":"8",
			"title":"Python solution based on RegEx",
			"vote":"16",
			"content":"    class Solution:\\n        # @return an integer\\n        def atoi(self, str):\\n            str = str.strip()\\n            str = re.findall('(^[\\\\+\\\\-0]*\\\\d+)\\\\D*', str)\\n    \\n            try:\\n                result = int(''.join(str))\\n                MAX_INT = 2147483647\\n                MIN_INT = -2147483648\\n                if result > MAX_INT > 0:\\n                    return MAX_INT\\n                elif result < MIN_INT < 0:\\n                    return MIN_INT\\n                else:\\n                    return result\\n            except:\\n                return 0"
		},
		{
			"lc_ans_id":"4671",
			"view":"1052",
			"top":"9",
			"title":"Javascript \"seriously?\" code",
			"vote":"12",
			"content":"    var myAtoi = function(str) {\\n        return Math.max(Math.min(parseInt(str) || 0, 2147483647), -2147483648)\\n    };\\n\\napparently the included `parseInt()` function does most of the requirements already"
		}
	],
	"id":"8",
	"title":"String to Integer (atoi)",
	"content":"<p>Implement <span style=\"font-family:monospace\">atoi</span> to convert a string to an integer.</p>\r\n\r\n<p><b>Hint:</b> Carefully consider all possible input cases. If you want a challenge, please do not see below and ask yourself what are the possible input cases.</p>\r\n\r\n<p>\r\n<b>Notes:</b> \r\nIt is intended for this problem to be specified vaguely (ie, no given input specs). You are responsible to gather all the input requirements up front. </p>\r\n\r\n<p>\r\n<b><font color=\"red\">Update (2015-02-10):</font></b><br>\r\nThe signature of the <code>C++</code> function had been updated. If you still see your function signature accepts a <code>const char *</code> argument, please click the reload button <span class=\"glyphicon glyphicon-refresh\"></span> to reset your code definition.\r\n</p>\r\n\r\n<p class=\"showspoilers\"><a href=\"#\" onclick=\"showSpoilers(this); return false;\">spoilers alert... click to show requirements for atoi.</a></p>\r\n\r\n<div class=\"spoilers\"><b>Requirements for atoi:</b>\r\n\r\n<p>The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.</p>\r\n\r\n<p>The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.</p>\r\n\r\n<p>If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.</p>\r\n\r\n<p>If no valid conversion could be performed, a zero value is returned. If the correct value is out of the range of representable values, INT_MAX (2147483647) or INT_MIN (-2147483648) is returned.\r\n</p>\r\n</div>",
	"frequency":"538",
	"ac_num":"208980"
}