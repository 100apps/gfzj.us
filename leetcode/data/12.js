{
	"difficulty":"2",
	"submit_num":"283790",
	"show_id":"12",
	"leetcode_id":"12",
	"answers":[
		{
			"lc_ans_id":"6274",
			"view":"48555",
			"top":"0",
			"title":"Simple Solution",
			"vote":"486",
			"content":"```\\npublic static String intToRoman(int num) {\\n    String M[] = {\"\", \"M\", \"MM\", \"MMM\"};\\n    String C[] = {\"\", \"C\", \"CC\", \"CCC\", \"CD\", \"D\", \"DC\", \"DCC\", \"DCCC\", \"CM\"};\\n    String X[] = {\"\", \"X\", \"XX\", \"XXX\", \"XL\", \"L\", \"LX\", \"LXX\", \"LXXX\", \"XC\"};\\n    String I[] = {\"\", \"I\", \"II\", \"III\", \"IV\", \"V\", \"VI\", \"VII\", \"VIII\", \"IX\"};\\n    return M[num/1000] + C[(num%1000)/100] + X[(num%100)/10] + I[num%10];\\n}\\n```"
		},
		{
			"lc_ans_id":"6310",
			"view":"23890",
			"top":"1",
			"title":"My java solution easy to understand",
			"vote":"147",
			"content":"Reference:\\nhttp://blog.csdn.net/beiyeqingteng/article/details/8547565\\n\\npublic class Solution {\\n    public String intToRoman(int num) {\\n        \\n        int[] values = {1000,900,500,400,100,90,50,40,10,9,5,4,1};\\n        String[] strs = {\"M\",\"CM\",\"D\",\"CD\",\"C\",\"XC\",\"L\",\"XL\",\"X\",\"IX\",\"V\",\"IV\",\"I\"};\\n        \\n        StringBuilder sb = new StringBuilder();\\n        \\n        for(int i=0;i<values.length;i++) {\\n            while(num >= values[i]) {\\n                num -= values[i];\\n                sb.append(strs[i]);\\n            }\\n        }\\n        return sb.toString();\\n    }\\n}"
		},
		{
			"lc_ans_id":"6281",
			"view":"15726",
			"top":"2",
			"title":"Two lines can do the job",
			"vote":"49",
			"content":"String[] romanPieces={\"\",\"I\",\"II\",\"III\",\"IV\",\"V\",\"VI\",\"VII\",\"VIII\",\"IX\",\\n\\t\\t\\t\\t\\t\\t\"\",\"X\",\"XX\",\"XXX\",\"XL\",\"L\",\"LX\",\"LXX\",\"LXXX\",\"XC\",\\n\\t\\t\\t\\t\\t\\t\"\",\"C\",\"CC\",\"CCC\",\"CD\",\"D\",\"DC\",\"DCC\",\"DCCC\",\"CM\",\\n\\t\\t\\t\\t\\t\\t\"\",\"M\",\"MM\",\"MMM\",\"MMMM\"};\\nreturn romanPieces[num/1000+30]+romanPieces[(num/100)%10+20]\\n\\t\\t\\t\\t\\t+romanPieces[(num/10)%10+10]+romanPieces[num%10];"
		},
		{
			"lc_ans_id":"6376",
			"view":"8801",
			"top":"3",
			"title":"Simple JAVA solution",
			"vote":"32",
			"content":"    public String intToRoman(int num) {\\n        String M[] = {\"\", \"M\", \"MM\", \"MMM\"};\\n        String C[] = {\"\", \"C\", \"CC\", \"CCC\", \"CD\", \"D\", \"DC\", \"DCC\", \"DCCC\", \"CM\"};\\n        String X[] = {\"\", \"X\", \"XX\", \"XXX\", \"XL\", \"L\", \"LX\", \"LXX\", \"LXXX\", \"XC\"};\\n        String I[] = {\"\", \"I\", \"II\", \"III\", \"IV\", \"V\", \"VI\", \"VII\", \"VIII\", \"IX\"};\\n        return M[num/1000] + C[(num%1000)/100]+ X[(num%100)/10] + I[num%10];\\n    }"
		},
		{
			"lc_ans_id":"6273",
			"view":"7123",
			"top":"4",
			"title":"Share My Python Solution 96ms",
			"vote":"31",
			"content":"    M = [\"\", \"M\", \"MM\", \"MMM\"];\\n    C = [\"\", \"C\", \"CC\", \"CCC\", \"CD\", \"D\", \"DC\", \"DCC\", \"DCCC\", \"CM\"];\\n    X = [\"\", \"X\", \"XX\", \"XXX\", \"XL\", \"L\", \"LX\", \"LXX\", \"LXXX\", \"XC\"];\\n    I = [\"\", \"I\", \"II\", \"III\", \"IV\", \"V\", \"VI\", \"VII\", \"VIII\", \"IX\"];\\n    return M[num/1000] + C[(num%1000)/100] + X[(num%100)/10] + I[num%10];"
		},
		{
			"lc_ans_id":"6432",
			"view":"2620",
			"top":"5",
			"title":"Easy to understand Java solution",
			"vote":"20",
			"content":"public class Solution {\\n\\n    public enum Type{\\n        M(1000),CM(900),D(500),CD(400),C(100),XC(90),L(50),XL(40),X(10),IX(9),V(5),IV(4),I(1);\\n        private final int value;\\n        Type(int value) {\\n            this.value = value;\\n        }\\n    };\\n    public String intToRoman(int num) {\\n        StringBuilder output = new StringBuilder();\\n        for (Type t:Type.values()) {\\n            while (num>=t.value) {\\n                output.append(t);\\n                num -= t.value;\\n            }\\n        }\\n        return output.toString();\\n    }\\n\\n}"
		},
		{
			"lc_ans_id":"6489",
			"view":"2443",
			"top":"6",
			"title":"Sharing my really simple solution with explanation",
			"vote":"19",
			"content":"    string intToRoman(int num) {\\n        string table[4][10] = {{\"\", \"I\", \"II\", \"III\", \"IV\", \"V\", \"VI\", \"VII\", \"VIII\", \"IX\"},\\n                               {\"\", \"X\", \"XX\", \"XXX\", \"XL\", \"L\", \"LX\", \"LXX\", \"LXXX\", \"XC\"},\\n                               {\"\", \"C\", \"CC\", \"CCC\", \"CD\", \"D\", \"DC\", \"DCC\", \"DCCC\", \"CM\"},\\n                               {\"\", \"M\", \"MM\", \"MMM\"}\\n                              };\\n        string result;\\n        int count = 0;\\n        while(num > 0){\\n            int temp = num % 10;\\n            result = table[count][temp] + result;\\n            num /= 10;\\n            count++;\\n        }\\n        return result;\\n    }\\n\\nThe basic idea is really simple: replace every digit in num by roman numerals.\\n\\nFor example, we have a num: 2438.\\n\\n2 --> \"MM\"\\n\\n4 --> \"CD\"\\n\\n3 --> \"XXX\"\\n\\n8 --> \"VIII\"\\n\\nThen the result is \"MMCDXXXVIII\"."
		},
		{
			"lc_ans_id":"6304",
			"view":"1419",
			"top":"7",
			"title":"Python simple solution.",
			"vote":"12",
			"content":"        \\n    def intToRoman1(self, num):\\n        values = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ]\\n        numerals = [ \"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\" ]\\n        res, i = \"\", 0\\n        while num:\\n            res += (num//values[i]) * numerals[i]\\n            num %= values[i]\\n            i += 1\\n        return res\\n        \\n    def intToRoman(self, num):\\n        values = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ]\\n        numerals = [ \"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\" ]\\n        res = \"\"\\n        for i, v in enumerate(values):\\n            res += (num//v) * numerals[i]\\n            num %= v\\n        return res"
		},
		{
			"lc_ans_id":"6473",
			"view":"2777",
			"top":"8",
			"title":"Esay C++ solution 43ms",
			"vote":"12",
			"content":"    class Solution {\\n    public:\\n    \\tconst static string THOUS[];\\n    \\tconst static string HUNDS[];\\n    \\tconst static string TENS[];\\n    \\tconst static string ONES[];\\n        string intToRoman(int num) {\\n    \\t\\tstring result;\\n    \\t\\tresult += THOUS[(int)(num/1000)%10];\\n    \\t\\tresult += HUNDS[(int)(num/100)%10];\\n    \\t\\tresult += TENS[(int)(num/10)%10];\\n    \\t\\tresult += ONES[num%10];\\n    \\t\\treturn result;\\n        }\\n    };\\n    \\n    const string Solution::THOUS[]\\t= {\"\",\"M\",\"MM\",\"MMM\"};\\n    const string Solution::HUNDS[]\\t= {\"\",\"C\",\"CC\",\"CCC\",\"CD\",\"D\",\"DC\",\"DCC\",\"DCCC\",\"CM\"};\\n    const string Solution::TENS[]\\t= {\"\",\"X\",\"XX\",\"XXX\",\"XL\",\"L\",\"LX\",\"LXX\",\"LXXX\",\"XC\"};\\n    const string Solution::ONES[]\\t= {\"\",\"I\",\"II\",\"III\",\"IV\",\"V\",\"VI\",\"VII\",\"VIII\",\"IX\"};"
		},
		{
			"lc_ans_id":"6469",
			"view":"4190",
			"top":"9",
			"title":"Share my iterative Solution",
			"vote":"12",
			"content":"    public String intToRoman(int num) {\\n        int[] weights={1000,900,500,400,100,90,50,40,10,9,5,4,1};\\n        String[] tokens={\"M\",\"CM\",\"D\",\"CD\",\"C\",\"XC\",\"L\",\"XL\",\"X\",\"IX\",\"V\",\"IV\",\"I\"};\\n        StringBuilder rs=new StringBuilder(\"\");\\n        int start=0;\\n        while(num>0){\\n            for(int i=start;i<13;i++){\\n                if(num>=weights[i]){\\n                    num-=weights[i];\\n                    rs.append(tokens[i]);\\n                    break;\\n                }\\n                start=i+1; // skip those impossible check, make it faster\\n            }\\n        }\\n        return rs.toString();\\n    }"
		}
	],
	"id":"12",
	"title":"Integer to Roman",
	"content":"<p>Given an integer, convert it to a roman numeral.\r\n</p>\r\n\r\n<p>Input is guaranteed to be within the range from 1 to 3999.</p>",
	"frequency":"613",
	"ac_num":"130134"
}