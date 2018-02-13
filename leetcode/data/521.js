{
	"difficulty":"2",
	"submit_num":"32409",
	"show_id":"537",
	"leetcode_id":"537",
	"answers":[
		{
			"lc_ans_id":"100440",
			"view":"3464",
			"top":"0",
			"title":"c++ using stringstream",
			"vote":"29",
			"content":"stringstream is very useful to extract num from a string\\n\\n```\\nclass Solution {\\npublic:\\n    string complexNumberMultiply(string a, string b) {\\n        int ra, ia, rb, ib;\\n        char buff;\\n        stringstream aa(a), bb(b), ans;\\n        aa >> ra >> buff >> ia >> buff;\\n        bb >> rb >> buff >> ib >> buff;\\n        ans << ra*rb - ia*ib << \"+\" << ra*ib + rb*ia << \"i\";\\n        return ans.str();\\n    }\\n};"
		},
		{
			"lc_ans_id":"100430",
			"view":"6266",
			"top":"1",
			"title":"Java 3-liner",
			"vote":"21",
			"content":"This solution relies on the fact that (a+bi)(c+di) = (ac - bd) + (ad+bc)i.\\n\\n```\\npublic String complexNumberMultiply(String a, String b) {\\n    int[] coefs1 = Stream.of(a.split(\"\\\\\\\\+|i\")).mapToInt(Integer::parseInt).toArray(), \\n          coefs2 = Stream.of(b.split(\"\\\\\\\\+|i\")).mapToInt(Integer::parseInt).toArray();\\n    return (coefs1[0]*coefs2[0] - coefs1[1]*coefs2[1]) + \"+\" + (coefs1[0]*coefs2[1] + coefs1[1]*coefs2[0]) + \"i\";\\n}\\n```"
		},
		{
			"lc_ans_id":"100431",
			"view":"3855",
			"top":"2",
			"title":"Java - (a1+b1)*(a2+b2) = (a1a2 + b1b2 + (a1b2+b1a2))",
			"vote":"16",
			"content":"    public String complexNumberMultiply(String a, String b) {\\n        String result = \"\";\\n        String[] A = a.split(\"\\\\\\\\+\");\\n        String[] B = b.split(\"\\\\\\\\+\");\\n        int a1 = Integer.parseInt(A[0]);\\n        int b1 = Integer.parseInt(A[1].replace(\"i\",\"\"));\\n\\n        int a2 = Integer.parseInt(B[0]);\\n        int b2 = Integer.parseInt(B[1].replace(\"i\",\"\"));\\n\\n        int a1a2 = a1 * a2;\\n        int b1b2 = b1 * b2;\\n        int a1b2a2b1 = (a1 * b2) + (b1 * a2);\\n\\n        String afinal = (a1a2 + (-1 * b1b2)) + \"\";\\n        String bfinal = a1b2a2b1 + \"i\";\\n        result = afinal+\"+\"+bfinal;\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"100500",
			"view":"1800",
			"top":"3",
			"title":"python simple 3 lines solution",
			"vote":"12",
			"content":"```\\nclass Solution(object):\\n    def complexNumberMultiply(self, a, b):\\n        \"\"\"\\n        :type a: str\\n        :type b: str\\n        :rtype: str\\n        \"\"\"\\n        a1, a2 = map(int, a[:-1].split('+'))\\n        b1, b2 = map(int, b[:-1].split('+'))\\n        return '%d+%di' % (a1 * b1 - a2 * b2, a1 * b2 + a2 * b1)\\n```"
		},
		{
			"lc_ans_id":"100428",
			"view":"1068",
			"top":"4",
			"title":"Java 7ms easy to understand solution",
			"vote":"4",
			"content":"```\\npublic class Solution {\\n    public String complexNumberMultiply(String a, String b) {\\n        int[] valA = getValue(a);\\n        int[] valB = getValue(b);\\n        \\n        int real = valA[0] * valB[0] - valA[1] * valB[1];\\n        int img = valA[0] * valB[1] + valA[1] * valB[0];\\n        \\n        return real + \"+\" + img + \"i\";\\n    }\\n    \\n    private int[] getValue(String s) {\\n        String[] str = s.split(\"\\\\\\\\+\");\\n        int[] val = new int[2];\\n        val[0] = Integer.valueOf(str[0]);\\n        int indexOfI = str[1].indexOf(\"i\");\\n        val[1] = Integer.valueOf(str[1].substring(0, indexOfI));\\n        \\n        return val;\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"100493",
			"view":"399",
			"top":"5",
			"title":"2 lines Python",
			"vote":"4",
			"content":"We can leverage that Python already has complex numbers and can `eval` expressions.\\n\\n    def complexNumberMultiply(self, a, b):\\n        z = eval(('(%s)*(%s)' % (a, b)).replace('i', 'j'))\\n        return '%d+%di' % (z.real, z.imag)\\n\\nEdit: Oh well, turns out it's not much work to calculate it myself:\\n\\n    def complexNumberMultiply(self, a, b):\\n        a, ai, b, bi = map(int, re.findall('-?\\\\d+', a+b))\\n        return '%d+%di' % (a*b - ai*bi, a*bi + ai*b)"
		},
		{
			"lc_ans_id":"100502",
			"view":"374",
			"top":"6",
			"title":"Python, Straightforward with Explanation",
			"vote":"3",
			"content":"This is a straightforward string manipulation problem.  Our goal is to extract the integers from the strings, deduce the answer, then output the answer in the required format.\\n\\nFirst, we should extract the integers from the string representation of the complex number.  We split a string like \"a+bi\" into parts **first** = \"a\", **second** = \"bi\", then truncate the \"i\" part in **second**.  We return these as integers.\\n\\nAfter, we perform the complex number multiplication:  (ar + i * ai) * (br + i * bi) = ar * br + i^2 * ai * bi + (ar * bi + ai * br) i.  Of course, i^2 can be simplified to -1.  We then format the output correctly using 'format'.\\n\\n```\\ndef convert_to_tuple(S):\\n  first, second = S.split('+')\\n  second = second[:-1]\\n  return int(first), int(second)\\n\\nar, ai = convert_to_tuple(a)\\nbr, bi = convert_to_tuple(b)\\nreal = ar * br - ai * bi\\nimag = ar * bi + br * ai\\nreturn \"{}+{}i\".format(real, imag)\\n```\\n*Note: I try to focus my editorials on the most repeatable and instructive solutions, not the most clever or short.*"
		},
		{
			"lc_ans_id":"100504",
			"view":"792",
			"top":"7",
			"title":"c++ solution",
			"vote":"2",
			"content":"    class Solution {\\n    public:\\n        string complexNumberMultiply(string a, string b) {\\n            pair<int, int> av = parse(a);\\n            pair<int, int> bv = parse(b);\\n            int ra = av.first * bv.first - av.second * bv.second;\\n            int rb = av.first * bv.second + av.second * bv.first;\\n            return to_string(ra) + \"+\" + to_string(rb) + \"i\";\\n        }\\n    \\n        pair<int, int> parse(const string& a) {\\n            int plus = find(a.begin(), a.end(), '+') - a.begin();\\n            int i = find(a.begin(), a.end(), 'i') - a.begin();\\n            int ra = stoi(a.substr(0, plus));\\n            int rb = stoi(a.substr(plus + 1, i - plus));\\n            return {ra, rb};\\n        }\\n    };"
		},
		{
			"lc_ans_id":"100441",
			"view":"105",
			"top":"8",
			"title":"Java OOP Solution",
			"vote":"1",
			"content":"```\\npublic class Solution {\\n    public class ComplexNumber {\\n        public int a;\\n        public int b;\\n        public ComplexNumber(int a, int b) {\\n            this.a = a;\\n            this.b = b;\\n        }\\n        public ComplexNumber(String s) {\\n            String[] tokens = s.split(\"[+i]\");\\n            a = Integer.parseInt(tokens[0]);\\n            b = Integer.parseInt(tokens[1]);\\n        }\\n        public ComplexNumber multiply(ComplexNumber o) {\\n            return new ComplexNumber(this.a * o.a - this.b * o.b, this.a * o.b + this.b * o.a);\\n        }\\n        public String toString() {\\n            return String.format(\"%d+%di\", a, b);    \\n        }\\n    }\\n    \\n    public String complexNumberMultiply(String a, String b) {\\n        ComplexNumber ca = new ComplexNumber(a);\\n        ComplexNumber cb = new ComplexNumber(b);\\n        return ca.multiply(cb).toString();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"100451",
			"view":"99",
			"top":"9",
			"title":"javascript simple solution",
			"vote":"1",
			"content":"match the `a + bi` pattern, so there must be only 1 `+` sign. split and then parse numbers.\\n\\n**javascript solution**\\n\\n```js\\nconst matchVars = (str) => str.slice(0, -1).split('+').map(n => Number.parseInt(n, 10))\\n\\n/**\\n * @param {string} a\\n * @param {string} b\\n * @return {string}\\n */\\nconst complexNumberMultiply = function(a, b) {\\n  const [arl, aim] = matchVars(a)\\n  const [brl, bim] = matchVars(b)\\n\\n  const [r, i] = [arl * brl + aim * bim * -1, arl * bim + aim * brl]\\n  return `${r}+${i}i`\\n}\\n```"
		}
	],
	"id":"521",
	"title":"Complex Number Multiplication",
	"content":"<p>\r\nGiven two strings representing two <a href = \"https://en.wikipedia.org/wiki/Complex_number\">complex numbers</a>.</p>\r\n\r\n<p>\r\nYou need to return a string representing their multiplication. Note i<sup>2</sup> = -1 according to the definition.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \"1+1i\", \"1+1i\"\r\n<b>Output:</b> \"0+2i\"\r\n<b>Explanation:</b> (1 + i) * (1 + i) = 1 + i<sup>2</sup> + 2 * i = 2i, and you need convert it to the form of 0+2i.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \"1+-1i\", \"1+-1i\"\r\n<b>Output:</b> \"0+-2i\"\r\n<b>Explanation:</b> (1 - i) * (1 - i) = 1 + i<sup>2</sup> - 2 * i = -2i, and you need convert it to the form of 0+-2i.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>The input strings will not have extra blank.</li>\r\n<li>The input strings will be given in the form of <b>a+bi</b>, where the integer <b>a</b> and <b>b</b> will both belong to the range of [-100, 100]. And <b>the output should be also in this form</b>.</li>\r\n</ol>\r\n</p>",
	"frequency":"205",
	"ac_num":"20688"
}