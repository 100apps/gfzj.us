{
	"difficulty":"2",
	"submit_num":"703983",
	"show_id":"6",
	"leetcode_id":"6",
	"answers":[
		{
			"lc_ans_id":"3403",
			"view":"56791",
			"top":"0",
			"title":"Easy to understand Java solution",
			"vote":"327",
			"content":"Create nRows StringBuffers, and keep collecting characters from original string to corresponding StringBuffer. Just take care of your index to keep them in bound.\\n\\n    public String convert(String s, int nRows) {\\n        char[] c = s.toCharArray();\\n        int len = c.length;\\n        StringBuffer[] sb = new StringBuffer[nRows];\\n        for (int i = 0; i < sb.length; i++) sb[i] = new StringBuffer();\\n        \\n        int i = 0;\\n        while (i < len) {\\n            for (int idx = 0; idx < nRows && i < len; idx++) // vertically down\\n                sb[idx].append(c[i++]);\\n            for (int idx = nRows-2; idx >= 1 && i < len; idx--) // obliquely up\\n                sb[idx].append(c[i++]);\\n        }\\n        for (int idx = 1; idx < sb.length; idx++)\\n            sb[0].append(sb[idx]);\\n        return sb[0].toString();\\n    }"
		},
		{
			"lc_ans_id":"3435",
			"view":"34315",
			"top":"1",
			"title":"If you are confused with zigzag pattern,come and see!",
			"vote":"271",
			"content":"    /*n=numRows\\n    \\u0394=2n-2    1                           2n-1                         4n-3\\n    \\u0394=        2                     2n-2  2n                    4n-4   4n-2\\n    \\u0394=        3               2n-3        2n+1              4n-5       .\\n    \\u0394=        .           .               .               .            .\\n    \\u0394=        .       n+2                 .           3n               .\\n    \\u0394=        n-1 n+1                     3n-3    3n-1                 5n-5\\n    \\u0394=2n-2    n                           3n-2                         5n-4\\n    */\\nthat's the zigzag pattern the question asked!\\nBe careful with nR=1 && nR=2\\n\\n----------\\n\\n\\n----------\\n\\n\\n----------\\n\\n\\n----------\\n\\n\\n----------\\n\\n\\n----------\\n\\n\\n----------\\n\\n\\n----------\\n\\n\\nmy 16ms code in c++:\\n\\n    class Solution {\\n    public:\\n        string convert(string s, int numRows) {\\n            string result=\"\";\\n            if(numRows==1)\\n    \\t\\t\\treturn s;\\n            int step1,step2;\\n            int len=s.size();\\n            for(int i=0;i<numRows;++i){\\n                step1=(numRows-i-1)*2;\\n                step2=(i)*2;\\n                int pos=i;\\n                if(pos<len)\\n                    result+=s.at(pos);\\n                while(1){\\n                    pos+=step1;\\n                    if(pos>=len)\\n                        break;\\n    \\t\\t\\t\\tif(step1)\\n    \\t\\t\\t\\t\\tresult+=s.at(pos);\\n                    pos+=step2;\\n                    if(pos>=len)\\n                        break;\\n    \\t\\t\\t\\tif(step2)\\n    \\t\\t\\t\\t\\tresult+=s.at(pos);\\n                }\\n            }\\n            return result;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"3465",
			"view":"19966",
			"top":"2",
			"title":"Share simple C++ solution",
			"vote":"109",
			"content":"The problem statement itself is unclear for many. Especially for 2-row case. \"ABCD\", 2 --> \"ACBD\". The confusion most likely is from the character placement. I would like to extend it a little bit to make ZigZag easy understood.\\n\\nThe example can be written as follow:\\n\\n1. P.......A........H.......N\\n2. ..A..P....L..S....I...I....G\\n3. ....Y.........I........R\\n\\nTherefore, <ABCD, 2> can be arranged as:\\n\\n 1. A....C\\n 2. ...B....D\\n\\nMy simple accepted code:\\n\\n    string convert(string s, int nRows) {\\n        \\n        if (nRows <= 1)\\n            return s;\\n    \\n        const int len = (int)s.length();\\n        string *str = new string[nRows];\\n    \\n        int row = 0, step = 1;\\n        for (int i = 0; i < len; ++i)\\n        {\\n            str[row].push_back(s[i]);\\n    \\n            if (row == 0)\\n                step = 1;\\n            else if (row == nRows - 1)\\n                step = -1;\\n    \\n            row += step;\\n        }\\n    \\n        s.clear();\\n        for (int j = 0; j < nRows; ++j)\\n        {\\n            s.append(str[j]);\\n        }\\n    \\n        delete[] str;\\n        return s;\\n    }"
		},
		{
			"lc_ans_id":"3404",
			"view":"10062",
			"top":"3",
			"title":"Python O(n) Solution in 96ms (99.43%)",
			"vote":"61",
			"content":"    class Solution(object):\\n        def convert(self, s, numRows):\\n            \"\"\"\\n            :type s: str\\n            :type numRows: int\\n            :rtype: str\\n            \"\"\"\\n            if numRows == 1 or numRows >= len(s):\\n                return s\\n    \\n            L = [''] * numRows\\n            index, step = 0, 1\\n    \\n            for x in s:\\n                L[index] += x\\n                if index == 0:\\n                    step = 1\\n                elif index == numRows -1:\\n                    step = -1\\n                index += step\\n    \\n            return ''.join(L)"
		},
		{
			"lc_ans_id":"3453",
			"view":"14076",
			"top":"4",
			"title":"JAVA solution--easy and clear ( interesting approach )",
			"vote":"55",
			"content":"    public class Solution {\\n    public String convert(String s, int numRows) {\\n        if(numRows<=1)return s;\\n        StringBuilder[] sb=new StringBuilder[numRows];\\n        for(int i=0;i<sb.length;i++){\\n            sb[i]=new StringBuilder(\"\");   //init every sb element **important step!!!!\\n        }\\n        int incre=1;\\n        int index=0;\\n        for(int i=0;i<s.length();i++){\\n            sb[index].append(s.charAt(i));\\n            if(index==0){incre=1;}\\n            if(index==numRows-1){incre=-1;}\\n            index+=incre;\\n        }\\n        String re=\"\";\\n        for(int i=0;i<sb.length;i++){\\n            re+=sb[i];\\n        }\\n        return re.toString();\\n    }\\n}"
		},
		{
			"lc_ans_id":"3417",
			"view":"9209",
			"top":"5",
			"title":"A 10-lines one-pass o(n)-time o(1)-space accepted solution with detailed explantation",
			"vote":"43",
			"content":" The distribution of the elements is period. \\n\\n    P   A   H   N\\n    A P L S I I G\\n    Y   I   R\\nFor example, the following has 4 periods(cycles):\\n\\n    P   | A   | H   | N\\n    A P | L S | I I | G\\n    Y   | I   | R   |\\n\\nThe size of every period is defined as \"cycle\"\\n\\n    cycle = (2*nRows - 2), except nRows == 1.\\n\\nIn this example,  (2*nRows - 2) = 4. \\n\\nIn every period, every row has 2 elements, except the first row and the last row.\\n\\nSuppose the current row is i, the index of the first element is j:\\n\\n    j = i + cycle*k, k = 0, 1, 2, ...\\n\\nThe index of the second element is secondJ:\\n\\n    secondJ = (j - i) + cycle - i\\n\\n (j-i) is the start of current period, (j-i) + cycle is the start of next period.\\n\\n\\n    string convert(string s, int nRows) {\\n            if(nRows <= 1) return s;\\n            string result = \"\";\\n            //the size of a cycle(period)\\n            int cycle = 2 * nRows - 2;\\n            for(int i = 0; i < nRows; ++i)\\n            {\\n                for(int j = i; j < s.length(); j = j + cycle){\\n                   result = result + s[j];\\n                   int secondJ = (j - i) + cycle - i;\\n                   if(i != 0 && i != nRows-1 && secondJ < s.length())\\n                       result = result + s[secondJ];\\n                }\\n            }\\n            return result;\\n        }"
		},
		{
			"lc_ans_id":"3819",
			"view":"2980",
			"top":"6",
			"title":"Two ways of O(n) solutions one follows the order of input string and other follows the order of output string",
			"vote":"26",
			"content":"Both the algorithms are of O(n) time complexity as every character in the input string is **traversed only once**.\\nIn the first version of algorithm, the output string's string buffer get populated based on the output string order i.e, **string builder gets populated incrementally from 0 to size-1**.\\n\\n    0             6            12             18\\n\\n    1       5     7      11    13       17    19\\n \\n    2    4        8  10        14  16         20\\n\\n    3             9            15             21 \\n\\n\\nIn the above sample case the number of rows is 4, when the first iteration is completed the locations **0,1,2,3 of the string builder gets filled with the locations 0,6,12,18 of the input string** it goes on further for other three rows.\\n\\n    public class Solution {\\n        public String convert(String s, int nRows) {\\n            if (nRows == 1)\\n                return s;\\n            StringBuilder strBuilder = new StringBuilder();\\n            int borderRowStep = 2 * nRows - 2;\\n            for (int i = 0; i < nRows; i++) {\\n                if (i == 0 || i == nRows - 1) {\\n                    for (int j = i; j < s.length(); j = j + borderRowStep) {\\n                        strBuilder.append(s.charAt(j));\\n                    }\\n                } else {\\n                    int j = i;\\n                    boolean flag = true;\\n                    int insideRowLargeStep = 2 * (nRows - 1 - i);\\n                    int insideRowSmallStep = borderRowStep - insideRowLargeStep;\\n                    while (j < s.length()) {\\n                       strBuilder.append(s.charAt(j));\\n                        if (flag)\\n                            j = j + insideRowLargeStep;\\n                        else\\n                            j = j + insideRowSmallStep;\\n                        flag = !flag;\\n                    }\\n                }\\n            }\\n            return strBuilder.toString();\\n        \\n    }\\n    }\\n\\nIn the second version of algorithm string buffer is filled in the order of input string  i.e, the **string buffer gets filled in the zig zag order**, when the first iteration of the outer while loop completes the locations **0,5,11,17 in string builder gets filled with the locations 0,1,2,3, from the input string**\\n\\n    class Solution{\\n    public String convert(String s, int nRows) {\\n        char[] c = s.toCharArray();\\n        int len = c.length;\\n        StringBuffer[] sb = new StringBuffer[nRows];\\n        for (int z=0; z < sb.length; z++) sb[z] = new StringBuffer();\\n        int k=0;\\n        while (k < len) {\\n            for (int zigZagIndex = 0; zigZagIndex < nRows && k < len; zigZagIndex++) // vertically down\\n                sb[zigZagIndex].append(c[k++]);\\n            for (int zigZagIndex = nRows-2; zigZagIndex >= 1 && k < len; zigZagIndex--) // obliquely up\\n                sb[zigZagIndex].append(c[k++]);\\n        }\\n        for (int index = 1; index < sb.length; index++)\\n            sb[0].append(sb[index]);\\n        return sb[0].toString();\\n    }\\n    }"
		},
		{
			"lc_ans_id":"3830",
			"view":"3917",
			"top":"7",
			"title":"What does zigzag means?",
			"vote":"24",
			"content":"The case that provided is a special case which we can easily handle.\\n\\nWhen there are more than 3 rows, what does zigzag mean?\\n\\n    A        F\\n\\n    B  E   G\\n\\n    C       H\\n\\n    D       I"
		},
		{
			"lc_ans_id":"3744",
			"view":"1917",
			"top":"8",
			"title":"A simple python solution, 97ms, 8 lines",
			"vote":"19",
			"content":"    def convert(self, s, nRows):\\n        if nRows==1:\\n            return s\\n        period= 2*(nRows -1)\\n        lines=[\"\" for i in range(nRows)]\\n        d={} # dict remainder:line\\n        for i in xrange(period):\\n            if i<nRows:\\n                d[i]=i\\n            else:\\n    \\t        d[i]=period-i\\n\\n        for i in xrange(len(s)):\\n            lines[ d[i%period] ] +=s[i]\\n    \\n        return \"\".join(lines)\\n\\nThe idea is to use the remainder (index%period) to determine which line the character at the given index will be. The period is calculated first based on nRows. A dictionary with remainder:line as key:value is then created (this can also be done with a list or a tuple). Once these are done, we simply go through s, assign each character to its new line, and then combine these lines to get the converted string.\\n\\nThe code can be further shortened to 8 lines by using dict comprehension:  \\n\\n       d={i:i if i<nRows else (period-i) for i in xrange(period)}\\n\\n<br>\\n\\n    def convert(self, s, nRows):\\n        if nRows==1:\\n            return s\\n        period= 2*(nRows -1)\\n        lines=[\"\" for i in range(nRows)]\\n        d={i:i if i<nRows else (period-i) for i in xrange(period)}\\n\\n        for i in xrange(len(s)):\\n            lines[ d[i%period] ] +=s[i]\\n    \\n        return \"\".join(lines)"
		},
		{
			"lc_ans_id":"3980",
			"view":"2669",
			"top":"9",
			"title":"C++ code, the problem is solved very easy",
			"vote":"17",
			"content":"class Solution {\\npublic:\\n    string convert(string s, int nRows) {\\n        \\n\\n\\n        if(nRows==1)\\n            return s;\\n        \\n        int y=0;\\n        bool flag= true;\\n        string sArray[nRows];\\n        for(int i=0;i<nRows;i++)\\n            sArray[i]=\"\";\\n        \\n        for(int i=0;i<s.length();i++){\\n            \\n            sArray[y]+=s[i];\\n            \\n            if(y==0){\\n                flag=true;\\n            }\\n            if(y==nRows-1){\\n                flag=false;\\n            }\\n            \\n            if(flag==true){\\n                y++;\\n            }else{\\n                y--;\\n            }\\n            \\n\\n        }\\n\\n        string ret=\"\";\\n        \\n        for(int i=0;i<nRows;i++){\\n            ret+=sArray[i];\\n        }\\n        \\n        return ret;\\n    }\\n};"
		}
	],
	"id":"6",
	"title":"ZigZag Conversion",
	"content":"<p>\r\nThe string <code>\"PAYPALISHIRING\"</code> is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)\r\n<pre>\r\nP   A   H   N\r\nA P L S I I G\r\nY   I   R\r\n</pre>\r\n\r\nAnd then read line by line: <code>\"PAHNAPLSIIGYIR\"</code></p>\r\n\r\n<p>\r\nWrite the code that will take a string and make this conversion given a number of rows:\r\n\r\n<pre>string convert(string text, int nRows);</pre>\r\n\r\n<code>convert(\"PAYPALISHIRING\", 3)</code> should return <code>\"PAHNAPLSIIGYIR\"</code>.\r\n</p>",
	"frequency":"620",
	"ac_num":"191073"
}