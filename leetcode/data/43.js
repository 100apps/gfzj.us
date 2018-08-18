{
	"difficulty":"2",
	"submit_num":"458694",
	"show_id":"43",
	"leetcode_id":"43",
	"answers":[
		{
			"lc_ans_id":"17605",
			"view":"59031",
			"top":"0",
			"title":"Easiest JAVA Solution with Graph Explanation",
			"vote":"764",
			"content":"Remember how we do multiplication? \\n\\nStart from right to left, perform multiplication on every pair of digits, and add them together.  Let's draw the process! From the following draft, we can immediately conclude:\\n\\n     `num1[i] * num2[j]` will be placed at indices `[i + j`, `i + j + 1]` \\n \\n<hr>\\n\\n<a href='https://drscdn.500px.org/photo/130178585/m%3D2048/300d71f784f679d5e70fadda8ad7d68f' target='_blank'><img src='https://drscdn.500px.org/photo/130178585/m%3D2048/300d71f784f679d5e70fadda8ad7d68f' border='0' alt=\"Multiplication\" width=\"100%\"/></a>\\n\\n<hr>\\n\\nHere is my solution. Hope it helps!\\n\\n    public String multiply(String num1, String num2) {\\n        int m = num1.length(), n = num2.length();\\n        int[] pos = new int[m + n];\\n       \\n        for(int i = m - 1; i >= 0; i--) {\\n            for(int j = n - 1; j >= 0; j--) {\\n                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0'); \\n                int p1 = i + j, p2 = i + j + 1;\\n                int sum = mul + pos[p2];\\n\\n                pos[p1] += sum / 10;\\n                pos[p2] = (sum) % 10;\\n            }\\n        }  \\n        \\n        StringBuilder sb = new StringBuilder();\\n        for(int p : pos) if(!(sb.length() == 0 && p == 0)) sb.append(p);\\n        return sb.length() == 0 ? \"0\" : sb.toString();\\n    }\\n\\n\\n  [1]: http://postimg.org/image/tltx29dcx/"
		},
		{
			"lc_ans_id":"17646",
			"view":"19937",
			"top":"1",
			"title":"Brief C++ solution using only strings and without reversal",
			"vote":"177",
			"content":"This is the standard manual multiplication algorithm. We use two nested for loops, working backward from the end of each input number. We pre-allocate our result and accumulate our partial result in there. One special case to note is when our carry requires us to write to our sum string outside of our for loop.\\n\\nAt the end, we trim any leading zeros, or return 0 if we computed nothing but zeros.\\n\\n    string multiply(string num1, string num2) {\\n        string sum(num1.size() + num2.size(), '0');\\n        \\n        for (int i = num1.size() - 1; 0 <= i; --i) {\\n            int carry = 0;\\n            for (int j = num2.size() - 1; 0 <= j; --j) {\\n                int tmp = (sum[i + j + 1] - '0') + (num1[i] - '0') * (num2[j] - '0') + carry;\\n                sum[i + j + 1] = tmp % 10 + '0';\\n                carry = tmp / 10;\\n            }\\n            sum[i] += carry;\\n        }\\n        \\n        size_t startpos = sum.find_first_not_of(\"0\");\\n        if (string::npos != startpos) {\\n            return sum.substr(startpos);\\n        }\\n        return \"0\";\\n    }"
		},
		{
			"lc_ans_id":"17608",
			"view":"14783",
			"top":"2",
			"title":"AC solution in Java with explanation",
			"vote":"72",
			"content":"    public class Solution {\\n        public String multiply(String num1, String num2) {\\n            int n1 = num1.length(), n2 = num2.length();\\n            int[] products = new int[n1 + n2];\\n            for (int i = n1 - 1; i >= 0; i--) {\\n                for (int j = n2 - 1; j >= 0; j--) {\\n                    int d1 = num1.charAt(i) - '0';\\n                    int d2 = num2.charAt(j) - '0';\\n                    products[i + j + 1] += d1 * d2;\\n                }\\n            }\\n            int carry = 0;\\n            for (int i = products.length - 1; i >= 0; i--) {\\n                int tmp = (products[i] + carry) % 10;\\n                carry = (products[i] + carry) / 10;\\n                products[i] = tmp;\\n            }\\n            StringBuilder sb = new StringBuilder();\\n            for (int num : products) sb.append(num);\\n            while (sb.length() != 0 && sb.charAt(0) == '0') sb.deleteCharAt(0);\\n            return sb.length() == 0 ? \"0\" : sb.toString();\\n        }\\n    }\\n\\nIf we break it into steps, it will have the following steps. 1. compute products from each pair of digits from num1 and num2. 2. carry each element over. 3. output the solution.\\n\\nThings to note:\\n\\n1. The product of two numbers cannot exceed the sum of the two lengths. (e.g. 99 * 99 cannot be five digit)\\n\\n2.\\n\\n    int d1 = num1.charAt(i) - '0';\\n    int d2 = num2.charAt(j) - '0';\\n    products[i + j + 1] += d1 * d2;"
		},
		{
			"lc_ans_id":"17769",
			"view":"11183",
			"top":"3",
			"title":"One Easy solution with C++",
			"vote":"33",
			"content":"The key part is to use a vector to store all digits REVERSELY. after the calculation, find the rightmost NON-Zero digits and convert it to a string.\\n\\n\\n    class Solution {\\n    public:\\n        string multiply(string num1, string num2) {\\n            \\n            unsigned int l1=num1.size(),l2=num2.size();\\n            if (l1==0||l2==0) return \"0\";\\n            \\n            vector<int> v(l1+l2,0);\\n     \\n            for (unsigned int i=0;i<l1;i++){\\n                int carry=0;\\n                int n1=(int)(num1[l1-i-1]-'0');//Calculate from rightmost to left\\n                for (unsigned int j=0;j<l2;j++){\\n                    int n2=(num2[l2-j-1]-'0');//Calculate from rightmost to left\\n                    \\n                    int sum=n1*n2+v[i+j]+carry;\\n                    carry=sum/10;\\n                    v[i+j]=sum%10;\\n                }\\n                if (carry>0)\\n                    v[i+l2]+=carry;\\n \\n            }\\n            int start=l1+l2-1;\\n            while(v[start]==0) start--;\\n            if (start==-1) return \"0\";\\n            \\n            string s=\"\";\\n            for (int i=start;i>=0;i--)\\n                s+=(char)(v[i]+'0');\\n            return s;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"17759",
			"view":"6886",
			"top":"4",
			"title":"Clear JAVA solution without reversal",
			"vote":"25",
			"content":" \\n\\n    public String multiply(String num1, String num2) {\\n        int len1 = num1.length();\\n        int len2 = num2.length();\\n        int[] product = new int[len1 + len2];\\n        for (int i = len1 - 1; i >= 0; i--) {\\n            for (int j = len2 - 1; j >= 0; j--) {\\n                int index = len1 + len2 - i - j - 2;\\n                product[index] += (num1.charAt(i) - '0') * (num2.charAt(j) - '0');\\n                product[index + 1] += product[index] / 10;\\n                product[index] %= 10;\\n            }\\n        }\\n        StringBuilder stringBuilder = new StringBuilder();\\n        for (int i = product.length - 1; i > 0; i--) {\\n            if (stringBuilder.length() == 0 && product[i] == 0)\\n                continue;\\n            stringBuilder.append(product[i]);\\n        }\\n        stringBuilder.append(product[0]);\\n        return stringBuilder.toString();\\n    }"
		},
		{
			"lc_ans_id":"17771",
			"view":"1980",
			"top":"5",
			"title":"Very concise 16 ms c++ solution",
			"vote":"19",
			"content":"See comments inline for explanation.\\n\\n    class Solution {\\n    public:\\n        string multiply(string num1, string num2) {\\n            int i, j;\\n            int m = num1.size(), n = num2.size();\\n            // max (m + n) digits\\n            vector<int> product(m + n, 0);\\n            string result;\\n    \\n            // reverse for ease of calc\\n            reverse(num1.begin(), num1.end());\\n            reverse(num2.begin(), num2.end());\\n    \\n            // digit i * digit j contributes to digit i + j\\n            for (i = 0; i < m; i++) {\\n                for (j = 0; j < n; j++) {\\n                    product[i + j] += (num1[i] - '0') * (num2[j] - '0');\\n                    product[i + j + 1] += product[i + j] / 10;\\n                    product[i + j] %= 10;\\n                }\\n            }\\n    \\n            // remove leading 0; keep last 0 if all 0\\n            for (i = m + n - 1; i > 0 && 0 == product[i]; i--)\\n                ;\\n            \\n            for (; i >= 0; i--)\\n                result += to_string(product[i]);\\n    \\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"17615",
			"view":"5401",
			"top":"6",
			"title":"Simple Python solution, 18 lines",
			"vote":"15",
			"content":"\\n    def multiply(num1, num2):\\n        product = [0] * (len(num1) + len(num2))\\n        pos = len(product)-1\\n        \\n        for n1 in reversed(num1):\\n            tempPos = pos\\n            for n2 in reversed(num2):\\n                product[tempPos] += int(n1) * int(n2)\\n                product[tempPos-1] += product[tempPos]/10\\n                product[tempPos] %= 10\\n                tempPos -= 1\\n            pos -= 1\\n            \\n        pt = 0\\n        while pt < len(product)-1 and product[pt] == 0:\\n            pt += 1\\n    \\n        return ''.join(map(str, product[pt:]))"
		},
		{
			"lc_ans_id":"17731",
			"view":"1546",
			"top":"7",
			"title":"Short java AC solution",
			"vote":"14",
			"content":"        public String multiply(String num1, String num2) {\\n            int[] num = new int[num1.length()+num2.length()];\\n            int len1 = num1.length(), len2 = num2.length();\\n            for(int i=len1-1;i>=0;i--){\\n                for(int j=len2-1;j>=0;j--){\\n                    int temp = (num1.charAt(i)-'0')*(num2.charAt(j)-'0');\\n                    num[i+j] += (temp+num[i+j+1])/10;\\n                    num[i+j+1] = (num[i+j+1]+temp)%10;\\n                }\\n            }\\n            StringBuilder sb = new StringBuilder();\\n            for(int i: num) if(sb.length()>0||i>0)  sb.append(i);\\n            return (sb.length()==0)?\"0\":sb.toString();\\n        }\\nmultiply according to number's position."
		},
		{
			"lc_ans_id":"17723",
			"view":"2155",
			"top":"8",
			"title":"Simple && clear java solution",
			"vote":"12",
			"content":"    public class Solution {\\n        public String multiply(String num1, String num2) {\\n            int len1 = num1.length();\\n            int len2 = num2.length();\\n            int len = len1 + len2;\\n            int[] mul = new int[len];\\n            for (int i = len1 - 1; i >= 0; i--) {\\n                int a = num1.charAt(i) - '0';\\n                int k = len2 + i;\\n                for (int j = len2 - 1; j >= 0; j--) {\\n                    int b = num2.charAt(j) - '0';\\n                    int c = mul[k] + a * b;\\n                    mul[k] = c % 10;\\n                    mul[k - 1] = mul[k - 1] + c /10;\\n                    k--;\\n                }\\n            }\\n            int i = 0;\\n            while(mul[i] == 0 && i < len - 1)  i++;\\n            StringBuilder sb = new StringBuilder();\\n            for (; i < len; i++)\\n                sb.append(mul[i]);\\n            return sb.length() == 0 ? \"0\" : sb.toString();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"17631",
			"view":"1834",
			"top":"9",
			"title":"A clean and efficient solution accepted as best submission in C, well-explained",
			"vote":"11",
			"content":"In fact before we truly hack this problem, we might remember other calculations for [linked list][1] and [binary strings][2] and trying to reuse that kind of pattern; but soon we will find out that will cost much energy and time to solve this one: multiply for each digits, move one step for the next digit and then add them, so annoying and tedious.\\n\\nSo we will try another naive one to easily hack this, imitating the multiplication process we human do but convert it a little bit for easier latter work.  The following steps will use 34 * 56 to present the whole process:\\n\\n - first, we multiply the lowest digit 6 with all the first number 34 without any carry just store the numbers: 18, 24 - from left to right respectively (all the carry operations will be handled in the following steps); then the second lowest digit 5 and the result numbers will be 15, 20 from left to right respectively;\\n - second, actually when we human calculate, (15, 20) as a whole will be moved to the left by one digit, right? Why? Because digit 5 is left-er than the digit 6 by one digit; okay, things are now getting clearer now; here we are going to use an array to store the result of each *position* , still ignoring carry here; one thing should be remembered is that the position is determined by the position of the digit in both the first and second number; if you know how the multiplication process, then this will be easy to understand.\\n - third, we are almost there; strings are indexed from left to right, so the smaller the index of the digit the higher its digit base (100, 10, 1 etc) will be; so we will store the results following this fact, from left to right, the unit will be decreasing; as we have discussed in second part, the position will be determined by that of digits in both first and second number so arr[i+j] = (num1[i]-'0')\\\\*(num2[j]-'0') will be a good equation; but the same position might be used to store several results from different pairs of digits multiplication. So `arr[i+j] += (num1[i]-'0')*(num2[j]-'0')` and before we collect the results, we have to initialise all elements of arr to zero; at last arr[i+j+1] should be used instead of arr[i+j], why? we might have a carry at the heading position, right? You will understand it sooner or later after all the specification;\\n - fourth, collecting the result and constructing the result string to return: from the last to the first we get carried by `a[i-1] = a[i]/10; a[i] %= 10;` but the zero position here might be zero for no carry comes around so we should remove it, if it is that case otherwise we just collect it as usual.\\n\\n-------\\n - Space cost O(n)\\n - Time cost O(n)\\n\\n```\\n//AC - 4ms;\\nchar* multiply(char* num1, char* num2){\\n    if(*num1=='0' || *num2=='0') return \"0\";\\n    int len1 = strlen(num1);\\n    int len2 = strlen(num2);\\n    int len = len1+len2;\\n    int *arr = (int*)malloc(sizeof(int)*len); //the number of digits of the result - len is the top;\\n    memset(arr, 0, sizeof(int)*len); //this is critical;\\n    for(int i=len1-1; i > -1; i--)\\n        for(int j=len2-1; j > -1; j--)\\n            arr[i+j+1] += (num1[i]-'0')*(num2[j]-'0'); //collect result of each position;\\n    for(int i=len-1; i > 0; i--) {\\n        arr[i-1] += arr[i]/10;\\n        arr[i] %= 10;\\n    }\\n    char *s = (char*)malloc(sizeof(char)*(len+1)); //converting the digits result to string;\\n    int index = 0;\\n    int i = 0;\\n    if(arr[i]==0) i++; //in case the zero position has no carry, if it does, ignore it;\\n    while(i < len)\\n        s[index++] = arr[i++]+'0';\\n    s[index] = '\\\\0';\\n    return s;\\n}\\n```"
		}
	],
	"id":"43",
	"title":"Multiply Strings",
	"content":"<p>Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the product of <code>num1</code> and <code>num2</code>.</p>\r\n\r\n<p><b>Note:</b>\r\n<ol>\r\n<li>The length of both <code>num1</code> and <code>num2</code> is < 110.</li>\r\n<li>Both <code>num1</code> and <code>num2</code> contains only digits <code>0-9</code>.</li>\r\n<li>Both <code>num1</code> and <code>num2</code> does not contain any leading zero.</li>\r\n<li>You <b>must not use any built-in BigInteger library</b> or <b>convert the inputs to integer</b> directly.</li>\r\n</ol>\r\n</p>",
	"frequency":"476",
	"ac_num":"127741"
}