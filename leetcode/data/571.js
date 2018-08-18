{
	"difficulty":"2",
	"submit_num":"15464",
	"show_id":"592",
	"leetcode_id":"592",
	"answers":[
		{
			"lc_ans_id":"103384",
			"view":"5265",
			"top":"0",
			"title":"Small simple C++/Java/Python",
			"vote":"28",
			"content":"Keep the overall result in `A / B`, read the next fraction into `a / b`. Their sum is `(Ab + aB) / Bb` (but cancel their greatest common divisor).\\n\\n**C++:**\\n\\n    string fractionAddition(string expression) {\\n        istringstream in(expression);\\n        int A = 0, B = 1, a, b;\\n        char _;\\n        while (in >> a >> _ >> b) {\\n            A = A * b + a * B;\\n            B *= b;\\n            int g = abs(__gcd(A, B));\\n            A /= g;\\n            B /= g;\\n        }\\n        return to_string(A) + '/' + to_string(B);\\n    }\\n\\n**Java:**\\n\\n    public String fractionAddition(String expression) {\\n        Scanner sc = new Scanner(expression).useDelimiter(\"/|(?=[-+])\");\\n        int A = 0, B = 1;\\n        while (sc.hasNext()) {\\n            int a = sc.nextInt(), b = sc.nextInt();\\n            A = A * b + a * B;\\n            B *= b;\\n            int g = gcd(A, B);\\n            A /= g;\\n            B /= g;\\n        }\\n        return A + \"/\" + B;\\n    }\\n\\n    private int gcd(int a, int b) {\\n        return a != 0 ? gcd(b % a, a) : Math.abs(b);\\n    }\\n\\n**Python 3:**\\nAdded this after @lee215 reminded me about Python 3's `math.gcd` with his solution in the comments.\\n\\n    def fractionAddition(self, expression):\\n        ints = map(int, re.findall('[+-]?\\\\d+', expression))\\n        A, B = 0, 1\\n        for a in ints:\\n            b = next(ints)\\n            A = A * b + a * B\\n            B *= b\\n            g = math.gcd(A, B)\\n            A //= g\\n            B //= g\\n        return '%d/%d' % (A, B)"
		},
		{
			"lc_ans_id":"103388",
			"view":"3755",
			"top":"1",
			"title":"Concise Java Solution",
			"vote":"13",
			"content":"```\\npublic String fractionAddition(String expression) {\\n    String[] fracs = expression.split(\"(?=[-+])\"); // splits input string into individual fractions\\n    String res = \"0/1\";\\n    for (String frac : fracs) res = add(res, frac); // add all fractions together\\n    return res;\\n}\\n\\npublic String add(String frac1, String frac2) {\\n    int[] f1 = Stream.of(frac1.split(\"/\")).mapToInt(Integer::parseInt).toArray(), \\n          f2 = Stream.of(frac2.split(\"/\")).mapToInt(Integer::parseInt).toArray();\\n    int numer = f1[0]*f2[1] + f1[1]*f2[0], denom = f1[1]*f2[1];\\n    String sign = \"\";\\n    if (numer < 0) {sign = \"-\"; numer *= -1;}\\n    return sign + numer/gcd(numer, denom) + \"/\" + denom/gcd(numer, denom); // construct reduced fraction\\n}\\n\\n// Computes gcd using Euclidean algorithm\\npublic int gcd(int x, int y) { return x == 0 || y == 0 ? x + y : gcd(y, x % y); }\\n```"
		},
		{
			"lc_ans_id":"103387",
			"view":"793",
			"top":"2",
			"title":"Python easy understand 2-line solution",
			"vote":"9",
			"content":"````\\nfrom fractions import Fraction\\nclass Solution(object):\\n    def fractionAddition(self, exp):\\n        res = sum(map(Fraction, exp.replace('+', ' +').replace('-', ' -').split()))\\n        return str(res.numerator) + '/' + str(res.denominator)"
		},
		{
			"lc_ans_id":"103408",
			"view":"1708",
			"top":"3",
			"title":"Java Solution, Fraction Addition and GCD",
			"vote":"9",
			"content":"```\\npublic class Solution {\\n    public String fractionAddition(String expression) {\\n        List<String> nums = new ArrayList<>();\\n        int i = 0, j = 0;\\n        while (j <= expression.length()) {\\n            if (j == expression.length() || j != i && (expression.charAt(j) == '+' || expression.charAt(j) == '-')) {\\n                if (expression.charAt(i) == '+') {\\n                    nums.add(expression.substring(i + 1, j));\\n                }\\n                else {\\n                    nums.add(expression.substring(i, j));\\n                }\\n                    \\n                i = j;\\n            }\\n            j++;\\n        }\\n        \\n        String result = \"0/1\";\\n        \\n        for (String num : nums) {\\n            result = add(result, num);\\n        }\\n        \\n        return result;\\n    }\\n    \\n    private String add(String s1, String s2) {\\n        String[] sa1 = s1.split(\"/\");\\n        String[] sa2 = s2.split(\"/\");\\n        int n1 = Integer.parseInt(sa1[0]);\\n        int d1 = Integer.parseInt(sa1[1]);\\n        int n2 = Integer.parseInt(sa2[0]);\\n        int d2 = Integer.parseInt(sa2[1]);\\n        \\n        int n = n1 * d2 + n2 * d1;\\n        int d = d1 * d2;\\n        \\n        if (n == 0) return \"0/1\";\\n        \\n        boolean isNegative = n * d < 0;\\n        n = Math.abs(n);\\n        d = Math.abs(d);\\n        int gcd = getGCD(n, d);\\n        \\n        return (isNegative ? \"-\" : \"\") + (n / gcd) + \"/\" + (d / gcd);\\n    }\\n    \\n    private int getGCD(int a, int b) {\\n        if (a == 0 || b == 0) return a + b; // base case\\n        return getGCD(b, a % b);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103406",
			"view":"1374",
			"top":"4",
			"title":"C++ 12 lines (GCD)",
			"vote":"2",
			"content":"The initial fraction is 0/1 (n/d). We just need to read next fraction (nn/dd), normalize denominators between n/d and nn/dd (using GCD), and add/subtract the numerator (n +/- nn). In the end, we also need to use GCD to make the resulting fraction irreducible. \\n```\\nint GCD(int a, int b ){ return (b == 0) ? a : GCD(b, a % b); }\\nstring fractionAddition(string s) {\\n    int n = 0, d = 1, p = 0, p1 = 0, p2 = 0;\\n    if (s[0] != '-') s = \"+\" + s;\\n    while (p < s.size()) {\\n        for (p1 = p + 1; s[p1] != '/'; ++p1);\\n        for (p2 = p1 + 1; p2 < s.size() && s[p2] != '+' && s[p2] != '-'; ++p2);\\n        auto nn = stoi(s.substr(p + 1, p1 - p - 1)), dd = stoi(s.substr(p1 + 1, p2 - p1 - 1));\\n        auto gcd = GCD(d, dd);\\n        n = n * dd / gcd + (s[p] == '-' ? -1 : 1) * nn * d / gcd;\\n        d *= dd / gcd;\\n        p = p2;\\n    }    \\n    auto gcd = GCD(abs(n), d);\\n    return to_string(n / gcd) + \"/\" + to_string(d / gcd);\\n}\\n```"
		},
		{
			"lc_ans_id":"103419",
			"view":"112",
			"top":"5",
			"title":"Straightforward and short Python solution using regex and `fractions` module",
			"vote":"2",
			"content":"With the `fractions` module, doing rational number arithmetic becomes really trivial.\\n\\n```\\nclass Solution(object):\\n  def fractionAddition(self, expression):\\n    \"\"\"\\n    :type expression: str\\n    :rtype: str\\n    \"\"\"\\n    import re\\n    from fractions import Fraction\\n    # Append + to start if first fraction is positive for easier parsing.\\n    expression = ('+' + expression) if expression[0] != '-' else expression\\n    splitted = re.split('([-|\\\\+]\\\\d+\\\\/\\\\d+)', expression)\\n    splitted = [fragment for fragment in splitted if fragment.strip() != '']\\n  \\n    def parse_fraction(fraction):\\n      sign = fraction[0]\\n      numer, denom = [int(part) for part in fraction[1:].split('/')]\\n      return Fraction(numer if sign == '+' else -numer, denom)\\n  \\n    result = 0\\n    for fraction in [parse_fraction(part) for part in splitted]:\\n      result += fraction\\n    return \"{}/{}\".format(result.numerator, result.denominator)\\n      \\n```"
		},
		{
			"lc_ans_id":"103383",
			"view":"33",
			"top":"6",
			"title":"two python solutions",
			"vote":"1",
			"content":"method 1:\\n```\\n    def fractionAddition(self, expression):\\n        \"\"\"\\n        :type expression: str\\n        :rtype: str\\n        \"\"\"\\n        import re\\n\\n        def gcd(x, y):\\n            while y:\\n                x, y = y, x % y\\n            return x\\n\\n        nums = map(int, re.findall('[+-]?\\\\d+', expression))\\n        A, B = 0, 1\\n        for a, b in zip(nums[::2], nums[1::2]):\\n            A = A * b + B * a\\n            B *= b\\n            g = gcd(A, B)\\n            A /= g\\n            B /= g\\n        return '{0}/{1}'.format(A, B)\\n```\\nmethod 2:\\n```\\n    def fractionAddition1(self, expression):\\n        \"\"\"\\n        :type expression: str\\n        :rtype: str\\n        \"\"\"\\n        from fractions import Fraction\\n        result = sum(map(Fraction, expression.replace('+', ' +').replace('-', ' -').split()))\\n        return '{0}/{1}'.format(result.numerator, result.denominator)"
		},
		{
			"lc_ans_id":"103394",
			"view":"126",
			"top":"7",
			"title":"C++ clean code",
			"vote":"1",
			"content":"    int findgcd(int a, int b) {\\n        if(b == 0) return a;\\n        return findgcd(b, a%b);\\n    }\\n    void add(int& a, int& b, int c, int d) {\\n        int nume = a*d + c*b, deno = b*d;\\n        int gcd = findgcd(abs(nume), abs(deno));\\n        a = nume / gcd;\\n        b = deno / gcd;\\n    }\\n    string fractionAddition(string expression) {\\n        stringstream ss(expression);\\n        char op;\\n        int a, b, c, d;\\n        ss >> a; \\n        ss >> op; \\n        ss >> b;\\n        while(ss >> c) {\\n            ss >> op; \\n            ss >> d;\\n            add(a, b, c, d);\\n        }\\n        return to_string(a) + \"/\" + to_string(b);\\n    }"
		},
		{
			"lc_ans_id":"103389",
			"view":"150",
			"top":"8",
			"title":"Python G\\xc7D, L\\xc7M",
			"vote":"1",
			"content":"```\\nclass Solution(object):\\n    def fractionAddition(self, expression):\\n        \"\"\"\\n        :type expression: str\\n        :rtype: str\\n        \"\"\"\\n        def add(a, b):\\n            if a == \"0/1\":\\n                return b\\n            def gcd(a, b):\\n                while b != 0:\\n                    a, b = b, a % b\\n                return a\\n            (an, ad), (bn, bd) = map(int, a.split(\"/\")), map(int, b.split(\"/\"))\\n            lcm = (ad * bd) / (gcd(ad, bd))\\n            an, bn = an * (lcm / ad), bn * (lcm / bd)\\n            n = an + bn\\n            g = gcd(n, lcm)\\n            return str(n / g) + \"/\" + str(lcm / g)\\n            \\n        expression += \"+\"\\n        ans = \"0/1\"\\n        start = 0\\n        for i in range(1, len(expression)):\\n            if expression[i] in [\"+\", \"-\"]:\\n                num = expression[start:i]\\n                ans = add(ans, num)\\n                start = i\\n        return ans if ans[0] != \"+\" else ans[1:]\\n```"
		},
		{
			"lc_ans_id":"103411",
			"view":"137",
			"top":"9",
			"title":"C# short solution (Regex, Linq and GCD)",
			"vote":"1",
			"content":"Felt like having fun with LINQ.\\n\\n```\\nusing System.Text.RegularExpressions;\\n\\npublic class Solution\\n{\\n    public string FractionAddition(string expression)\\n    {\\n        return string.Join(\"/\", \\n            Regex.Matches(expression, @\"(-?\\\\d+)\\\\/(\\\\d+)\").OfType<Match>()\\n            .Select(m => new[] { int.Parse(m.Groups[1].Value), int.Parse(m.Groups[2].Value) })\\n            .Aggregate(new[] { 0, 1 }, (p, c) => Normalize(p[0] * c[1] + p[1] * c[0], p[1] * c[1])));\\n    }\\n\\n    private int Gcd(int a, int b) => a == 0 ? Math.Abs(b) : Gcd(b % a, a);\\n\\n    private int[] Normalize(int n, int d) => new[] { n / Gcd(n, d), d / Gcd(n, d) };\\n}\\n```\\n\\n1. First we convert the string expression to an enumerable of fractions. Each fraction is an int[2] array. Regular expression expects fractions like \"n/d\" where n could be negative. Plus signs are disregarded completely, we don't need them:\\n```\\nRegex.Matches(expression, @\"(-?\\\\d+)\\\\/(\\\\d+)\").OfType<Match>()\\n    .Select(m => new[] { int.Parse(m.Groups[1].Value), int.Parse(m.Groups[2].Value) })\\n```\\n2. Next we aggregate the results (this Linq function's analogue in javascript is called `reduce`, for example). We always start from value 0/1 and then sum it with the first number using the fraction rules from school: `a/b + c/d = (a*d + b*c) / b * d`. After that we use the `Normalize` helper function, which finds the greatest common denominator for numerator and denominator and uses it to normalize our current fraction.\\n```\\n.Aggregate(new[] { 0, 1 }, (p, c) => Normalize(p[0] * c[1] + p[1] * c[0], p[1] * c[1])));\\n```\\n3. After the last number was added, the resulting nominator and denominator are joined with \"/\" in between them with: ```string.Join```"
		}
	],
	"id":"571",
	"title":"Fraction Addition and Subtraction",
	"content":"<p>Given a string representing an expression of fraction addition and subtraction, you need to return the calculation result in string format. The final result should be <a href = \"https://en.wikipedia.org/wiki/Irreducible_fraction\">irreducible fraction</a>. If your final result is an integer, say <code>2</code>, you need to change it to the format of fraction that has denominator <code>1</code>. So in this case, <code>2</code> should be converted to <code>2/1</code>.</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b>\"-1/2+1/2\"\r\n<b>Output:</b> \"0/1\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b>\"-1/2+1/2+1/3\"\r\n<b>Output:</b> \"1/3\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b>\"1/3-1/2\"\r\n<b>Output:</b> \"-1/6\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 4:</b><br />\r\n<pre>\r\n<b>Input:</b>\"5/3+1/3\"\r\n<b>Output:</b> \"2/1\"\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The input string only contains <code>'0'</code> to <code>'9'</code>, <code>'/'</code>, <code>'+'</code> and <code>'-'</code>. So does the output.</li>\r\n<li>Each fraction (input and output) has format <code>±numerator/denominator</code>. If the first input fraction or the output is positive, then <code>'+'</code> will be omitted.</li>\r\n<li>The input only contains valid <b>irreducible fractions</b>, where the <b>numerator</b> and <b>denominator</b> of each fraction will always be in the range [1,10]. If the denominator is 1, it means this fraction is actually an integer in a fraction format defined above.</li> \r\n<li>The number of given fractions will be in the range [1,10].</li>\r\n<li>The numerator and denominator of the <b>final result</b> are guaranteed to be valid and in the range of 32-bit int.</li>\r\n</ol>\r\n</p>",
	"frequency":"110",
	"ac_num":"7120"
}