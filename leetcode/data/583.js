{
	"difficulty":"1",
	"submit_num":"19897",
	"show_id":"604",
	"leetcode_id":"604",
	"answers":[
		{
			"lc_ans_id":"103828",
			"view":"2825",
			"top":"0",
			"title":"Java Concise Single Queue Solution",
			"vote":"12",
			"content":"```\\npublic class StringIterator {\\n    \\n    Queue<int[]> queue = new LinkedList<>();\\n    \\n    public StringIterator(String s) {\\n        int i = 0, n = s.length();\\n        while (i < n) {\\n            int j = i+1;\\n            while (j < n && s.charAt(j) - 'A' < 0) j++;\\n            queue.add(new int[]{s.charAt(i) - 'A',  Integer.parseInt(s.substring(i+1, j))});\\n            i = j;\\n        }\\n    }\\n    \\n    public char next() {\\n        if (queue.isEmpty()) return ' ';\\n        int[] top = queue.peek();\\n        if (--top[1] == 0) queue.poll();\\n        return (char) ('A' + top[0]);\\n    }\\n    \\n    public boolean hasNext() {\\n        return !queue.isEmpty();\\n    }\\n\\n}\\n```"
		},
		{
			"lc_ans_id":"103878",
			"view":"1671",
			"top":"1",
			"title":"[C++] [Java] Clean Code",
			"vote":"6",
			"content":"**C++**\\n```\\nclass StringIterator {\\npublic:\\n    StringIterator(string cs) : cs(cs), i(0), rep(0), ch(' ') { }\\n\\n    char next() {\\n        if (rep > 0) {\\n            rep--;\\n            return ch;\\n        }\\n        else if (i < cs.size()) {\\n            ch = cs[i];\\n            int j = i + 1;\\n            while (j < cs.size() && isdigit(cs[j])) { j++; }\\n            string num = cs.substr(i + 1, j - 1 - i);\\n            rep = atoi(num.c_str()) - 1;\\n            i = j;\\n            return ch;\\n        }\\n        else {\\n            return ' ';\\n        }\\n    }\\n\\n    bool hasNext() {\\n        return rep > 0 || i < cs.size();\\n    }\\n\\nprivate:\\n    string cs;\\n    int i;\\n    long rep;\\n    char ch;\\n};\\n```\\n\\n**Java**\\n```\\npublic class StringIterator {\\n    private char[] cs;\\n    private int i;\\n    private long rep;\\n    private char ch;\\n\\n    public StringIterator(String compressedString) {\\n        cs = compressedString.toCharArray();\\n    }\\n    \\n    public char next() {\\n        if (rep > 0) {\\n            rep--;\\n            return ch;\\n        }\\n        else if (i < cs.length) {\\n            ch = cs[i];\\n            int j = i + 1;\\n            while (j < cs.length && Character.isDigit(cs[j])) { j++; }\\n            String num = new String(cs, i + 1, j - 1 - i);\\n            rep = Integer.valueOf(num) - 1;\\n            i = j;\\n            return ch;\\n        }\\n        else {\\n            return ' ';\\n        }        \\n    }\\n    \\n    public boolean hasNext() {\\n        return rep > 0 || i < cs.length;\\n    }\\n}\\n```\\n\\n**Java2**\\n```\\npublic class StringIterator {\\n    private int i;\\n    private long rep;\\n    private char ch;\\n    private char[] cs;\\n    public StringIterator(String compressedString) {\\n        cs = compressedString.toCharArray();\\n    }\\n    \\n    public char next() {\\n        if (rep > 0) {\\n            rep--;\\n            return ch;\\n        }\\n        else if (i < cs.length) {\\n            ch = cs[i];\\n            int j = i + 1;\\n            while (j < cs.length && Character.isDigit(cs[j])) {\\n                rep = rep * 10 + cs[j] - '0';\\n                j++;\\n            }\\n            rep--;\\n            i = j;\\n            return ch;\\n        }\\n        else {\\n            return ' ';\\n        }        \\n    }\\n    \\n    public boolean hasNext() {\\n        return rep > 0 || i < cs.length;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103866",
			"view":"425",
			"top":"2",
			"title":"Python, Straightforward with Explanation",
			"vote":"5",
			"content":"Let's store the tokens like ```[('L', 1), ('e', 2), ('t', 1), ('c', 1), ('o', 1), ('d', 1), ('e', 1)]```, except in reverse.  When we want a token, we pop it off the stack: ```t, n = 'L', 1``` and return ```t```.  When there is more than one character represented, we need to put the excess back on the stack: ```t, n = 'e', 2``` then ```tokens.append(('e', 1))```.\\n\\nWe can use a regular expression to find the tokens quickly.  The pattern ```\\\\D\\\\d+``` means a non-digit character, followed by 1 or more digit characters.  (The ```+``` denotes a kleene plus, a wildcard character meaning \"one or more of the preceding match.\")  All of our tokens (and only our tokens) match this pattern as desired.\\n\\n```\\nimport re\\nclass StringIterator(object):\\n    def __init__(self, compressedString):\\n        self.tokens = []\\n        for token in re.findall('\\\\D\\\\d+', compressedString):\\n            self.tokens.append((token[0], int(token[1:])))\\n        self.tokens = self.tokens[::-1]\\n\\n    def next(self):\\n        if not self.tokens: return ' '\\n        t, n = self.tokens.pop()\\n        if n > 1: \\n            self.tokens.append((t, n - 1))\\n        return t\\n\\n    def hasNext(self):\\n        return bool(self.tokens)\\n```"
		},
		{
			"lc_ans_id":"103864",
			"view":"1563",
			"top":"3",
			"title":"A bit of Java 8, regex and very short solution",
			"vote":"5",
			"content":"The idea is simple, to use regex to seperate out the characters and their frequencies and then loop through them.\\n```\\npublic class StringIterator {\\n    int i;\\n    String[] arr;\\n    int[] counts;\\n\\n    public StringIterator(String str) {\\n        arr = str.split(\"\\\\\\\\d+\");\\n        counts = Arrays.stream(str.substring(1).split(\"[a-zA-Z]+\")).mapToInt(Integer::parseInt).toArray();\\n    }\\n    \\n    public char next() {\\n        if(!hasNext()) return ' ';\\n        char ch = arr[i].charAt(0);\\n        if(--counts[i] == 0) ++i;\\n        return ch;\\n    }\\n\\n    public boolean hasNext() {\\n        if(i == arr.length) return false;\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103855",
			"view":"783",
			"top":"4",
			"title":"Short Solution of C++ using stringstream & Python using re",
			"vote":"5",
			"content":"c++ solution:\\n```\\nclass StringIterator {\\n    istringstream iss;\\n    char c;\\n    int count;\\npublic:\\n    StringIterator(string compressedString) {\\n        iss = istringstream(compressedString);\\n        count = c = 0;\\n    }\\n\\n    char next() {\\n        if ( hasNext() ) {\\n            --count;\\n            return c;\\n        } else {\\n            return ' ';\\n        }\\n    }\\n\\n    bool hasNext() {\\n        if ( count == 0 ) {\\n            iss >> c >> count;\\n        }\\n        return count > 0;\\n    }\\n};\\n```\\npython solution, you can use `re.finditer` instead to save some memory if you like.\\n```\\nclass StringIterator(object):\\n\\n    def __init__(self, compressedString):\\n        \"\"\"\\n        :type compressedString: str\\n        \"\"\"\\n        self.__data = re.findall(r\"([a-zA-Z])(\\\\d+)\", compressedString)\\n        self.__index, self.__count = -1, 0\\n\\n    def next(self):\\n        \"\"\"\\n        :rtype: str\\n        \"\"\"\\n        if self.hasNext():\\n            self.__count -= 1\\n            return self.__data[self.__index][0]\\n        else:\\n            return ' '\\n\\n    def hasNext(self):\\n        \"\"\"\\n        :rtype: bool\\n        \"\"\"\\n        if self.__count == 0 and self.__index + 1 < len(self.__data):\\n            self.__index += 1\\n            self.__count = int(self.__data[self.__index][1])\\n        return self.__count > 0\\n```"
		},
		{
			"lc_ans_id":"103873",
			"view":"703",
			"top":"5",
			"title":"Java Solution, two Lists",
			"vote":"3",
			"content":"One array for character another for corresponding count of that character.\\n```\\npublic class StringIterator {\\n    List<Character> chars = new ArrayList<>();\\n    List<Integer> counts = new ArrayList<>();\\n    int ptr = 0;\\n    \\n    public StringIterator(String str) {\\n        int i = 0;\\n        while (i < str.length()) {\\n            chars.add(str.charAt(i));\\n            int j = i + 1;\\n            while (j < str.length() && Character.isDigit(str.charAt(j))) j++;\\n            counts.add(Integer.parseInt(str.substring(i + 1, j)));\\n            i = j;\\n        }\\n    }\\n    \\n    public char next() {\\n        if (!hasNext()) return ' ';\\n        \\n        char result = chars.get(ptr);\\n        counts.set(ptr, counts.get(ptr) - 1);\\n        if (counts.get(ptr) == 0) ptr++;\\n        return result;\\n    }\\n    \\n    public boolean hasNext() {\\n        return ptr < chars.size();\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"103841",
			"view":"134",
			"top":"6",
			"title":"Python using re.split()",
			"vote":"2",
			"content":"\\n    def __init__(self, compressedString):\\n        self.values = re.split('[a-zA-Z]+', compressedString)[1:][::-1]\\n        self.letter = re.split('[0-9]+', compressedString)[0:-1][::-1]\\n\\n    def next(self):\\n        if self.hasNext():\\n            value = self.values.pop()\\n            letter = self.letter.pop()\\n            if int(value) > 1:\\n                self.values.append(str(int(value)-1))\\n                self.letter.append(letter)\\n            return letter\\n        return ' '\\n\\n    def hasNext(self):\\n        return not (len(self.values) == 0)"
		},
		{
			"lc_ans_id":"103829",
			"view":"413",
			"top":"7",
			"title":"Compact and readable Python solution",
			"vote":"2",
			"content":"```\\nclass StringIterator(object):\\n    def __init__(self, compressedString):\\n        self.lastFreq = 0 \\n        self.lastChar = None\\n        self.arr = re.findall('[a-zA-Z]\\\\d+', compressedString)\\n\\n    def next(self):\\n        if self.lastFreq == 0 and len(self.arr) == 0: \\n            return ' '\\n        if self.lastFreq > 0: \\n            self.lastFreq -= 1\\n            return self.lastChar\\n        \\n        pair = self.arr.pop(0)\\n        self.lastChar, self.lastFreq = pair[0], int(pair[1:])-1\\n        return self.lastChar \\n\\n    def hasNext(self):\\n        return self.lastFreq > 0 or len(self.arr) > 0\\n```"
		},
		{
			"lc_ans_id":"103825",
			"view":"59",
			"top":"8",
			"title":"An iterator which works like an iterator Java O(1) space",
			"vote":"1",
			"content":"```\\n    char currentChar;\\n    Integer currCharCount;\\n    Integer currCharMaxCount;\\n    int index;\\n    String compressedString;\\n    public StringIterator(String compressedString) {\\n        index = 0;\\n        this.compressedString = compressedString;\\n    }\\n    \\n    public char next() {\\n        if(hasNext()){\\n            if(currCharCount == currCharMaxCount){\\n                currentChar = compressedString.charAt(index);\\n                currCharMaxCount = 0;\\n                index++;\\n                while(index<compressedString.length() && Character.isDigit(compressedString.charAt(index))){\\n                    currCharMaxCount = 10*currCharMaxCount + (compressedString.charAt(index++) - '0');\\n                }\\n                currCharCount = 0;\\n            }\\n            currCharCount++;\\n            return currentChar;\\n        }else return ' ';\\n        \\n    }\\n    \\n    public boolean hasNext() {\\n        return index<compressedString.length() || currCharCount < currCharMaxCount;\\n    }\\n```"
		},
		{
			"lc_ans_id":"103872",
			"view":"149",
			"top":"9",
			"title":"Straightforward Java solution no fancy data structure",
			"vote":"1",
			"content":"\\nThe idea is straighforward.\\n\\nIf the current character is not consumed (count > 0), output the current character.\\nIf current character is consumed (count == 0), fetch next character. If no more, output ' '\\n\\n```\\npublic class StringIterator {\\n    String compressedString;\\n    Character cur;\\n    int count;\\n    int i;\\n  \\n    public StringIterator(String compressedString) {\\n        this.compressedString = compressedString;\\n        this.cur = null;\\n        this.i = 0;\\n        this.count = 0;\\n    }\\n    \\n    public char next() {\\n        if (count == 0) {\\n            if (i >= compressedString.length()) {return ' ';}\\n            cur = compressedString.charAt(i++);\\n            while (i < compressedString.length() && compressedString.charAt(i) >= '0' && compressedString.charAt(i) <= '9') {\\n                count = 10 * count + (compressedString.charAt(i)-'0');\\n                i++;\\n            }\\n        }\\n        count--;\\n        return cur;\\n    }\\n    \\n    public boolean hasNext() {\\n        return i < compressedString.length() || count != 0;\\n    }\\n}\\n```"
		}
	],
	"id":"583",
	"title":"Design Compressed String Iterator",
	"content":"<p>\r\nDesign and implement a data structure for a compressed string iterator. It should support the following operations: <code>next</code> and <code>hasNext</code>.\r\n</p>\r\n\r\n<p>\r\nThe given compressed string will be in the form of each letter followed by a positive integer representing the number of this letter existing in the original uncompressed string.\r\n</p>\r\n\r\n<p>\r\n<code>next()</code> - if the original string still has uncompressed characters, return the next letter; Otherwise return a white space.<br>\r\n<code>hasNext()</code> - Judge whether there is any letter needs to be uncompressed.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br />\r\nPlease remember to <b>RESET</b> your class variables declared in StringIterator, as static/class variables are <b>persisted across multiple test cases</b>. Please see <a href=\"https://leetcode.com/faq/#different-output\">here</a> for more details.\r\n</p>\r\n\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nStringIterator iterator = new StringIterator(\"L1e2t1C1o1d1e1\");\r\n\r\niterator.next(); // return 'L'\r\niterator.next(); // return 'e'\r\niterator.next(); // return 'e'\r\niterator.next(); // return 't'\r\niterator.next(); // return 'C'\r\niterator.next(); // return 'o'\r\niterator.next(); // return 'd'\r\niterator.hasNext(); // return true\r\niterator.next(); // return 'e'\r\niterator.hasNext(); // return false\r\niterator.next(); // return ' '\r\n</pre>\r\n</p>",
	"frequency":"22",
	"ac_num":"6569"
}