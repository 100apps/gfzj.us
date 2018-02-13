{
	"difficulty":"3",
	"submit_num":"150137",
	"show_id":"158",
	"leetcode_id":"158",
	"answers":[
		{
			"lc_ans_id":"49598",
			"view":"22115",
			"top":"0",
			"title":"A simple Java code",
			"vote":"119",
			"content":"        private int buffPtr = 0;\\n        private int buffCnt = 0;\\n        private char[] buff = new char[4];\\n        public int read(char[] buf, int n) {\\n            int ptr = 0;\\n            while (ptr < n) {\\n                if (buffPtr == 0) {\\n                    buffCnt = read4(buff);\\n                }\\n                if (buffCnt == 0) break;\\n                while (ptr < n && buffPtr < buffCnt) {\\n                    buf[ptr++] = buff[buffPtr++];\\n                }\\n                if (buffPtr >= buffCnt) buffPtr = 0;\\n            }\\n            return ptr;\\n        }\\n\\n\\nI used buffer pointer (buffPtr) and buffer Counter (buffCnt) to store the data received in previous calls. In the while loop, if buffPtr reaches current buffCnt, it will be set as zero to be ready to read new data."
		},
		{
			"lc_ans_id":"49601",
			"view":"11385",
			"top":"1",
			"title":"What is the difference between call once and call multiple times?",
			"vote":"60",
			"content":"Just wondering what is the difference between call once and call multiple times."
		},
		{
			"lc_ans_id":"49618",
			"view":"10923",
			"top":"2",
			"title":"Simple short Java / C++",
			"vote":"33",
			"content":"Just keep copying as long as more is both desired and available (read more on the fly when needed).\\n\\nIt's also fast, 2 ms for Java and 0 ms for C++, there are no faster ones.\\n\\n**Java**\\n\\n    public class Solution extends Reader4 {\\n        public int read(char[] buf, int n) {\\n            int i = 0;\\n            while (i < n && (i4 < n4 || (i4 = 0) < (n4 = read4(buf4))))\\n                buf[i++] = buf4[i4++];\\n            return i;\\n        }\\n        char[] buf4 = new char[4];\\n        int i4 = 0, n4 = 0;\\n    }\\n\\n**C++**\\n\\n    class Solution {\\n    public:\\n        int read(char *buf, int n) {\\n            int i = 0;\\n            while (i < n && (i4 < n4 || (i4 = 0) < (n4 = read4(buf4))))\\n                buf[i++] = buf4[i4++];\\n            return i;\\n        }\\n        char buf4[4];\\n        int i4 = 0, n4 = 0;\\n    };"
		},
		{
			"lc_ans_id":"49607",
			"view":"1254",
			"top":"3",
			"title":"The missing clarification you wish the question provided",
			"vote":"21",
			"content":"It took me many hours by try and error as well as looking at many solutions to figure out the following 3 key clarifications the question failed to provide.\\n\\nWith the provided clarifications, it's not difficult to think of a solution using a `char buffer[5]` to store results from `read4()` and then read chars from it.\\n\\n1. `read4()` has its own file pointer, much like `FILE *fp` in C.\\n\\n```cpp\\n// file is \"abc\", initially fp points to 'a'\\nread(1) // returns buf = \"a\", now fp points to 'b'\\nread(1) // returns buf = \"b\", now fp points to 'c'\\nread(2) // returns buf = \"c\", now fp points to end of file\\n```\\n2. `char *buf` is **destination** not source, similar to that of `scanf(\"%s\", buf)`, OJ outputs this `buf` value.\\n\\n3. Each time `read()` is called, we need to provide a new `buf` to store read characters, therefore, the return value of `int read()` is simply the length of `buf`.\\n\\n```cpp\\nclass Solution {\\nprivate:\\n    int bp = 0;\\n    int len = 0;\\n    char buffer[5];\\npublic:\\n    int read(char *buf, int n) {\\n        int i = 0;\\n        while (i < n) {\\n            if (bp == len) {\\n                bp = 0;\\n                len = read4(buffer);\\n                if (len == 0)\\n                    break;\\n            }\\n            buf[i++] = buffer[bp++];\\n        }\\n\\n        return i;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"49615",
			"view":"1979",
			"top":"4",
			"title":"Clean solution in Java",
			"vote":"19",
			"content":"Keep a buffer of size 4 as a class variable, call it **prevBuf**.\\nWhenever we call read(n), read from **prevBuf** first until all characters in **prevBuf** are consumed (to do this, we need 2 more int variables **prevSize** and **prevIndex**, which tracks the actual size of **prevBuf** and the index of next character to read from **prevBuf**). Then call read4 to read characters into **prevBuf**.\\nThe code is quite clean I think.\\n```\\n/* The read4 API is defined in the parent class Reader4.\\n      int read4(char[] buf); */\\n// 2ms\\n// beats 58%\\npublic class Solution extends Reader4 {\\n    /**\\n     * @param buf Destination buffer\\n     * @param n   Maximum number of characters to read\\n     * @return    The number of characters read\\n     */\\n    char[] prevBuf = new char[4];\\n    int prevSize = 0;\\n    int prevIndex = 0;\\n    \\n    public int read(char[] buf, int n) {\\n        int counter = 0;\\n        \\n        while (counter < n) {\\n            if (prevIndex < prevSize) {\\n                buf[counter++] = prevBuf[prevIndex++];\\n            } else {\\n                prevSize = read4(prevBuf);\\n                prevIndex = 0;\\n                if (prevSize == 0) {\\n                    // no more data to consume from stream\\n                    break;\\n                }\\n            }\\n        }\\n        return counter;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"49656",
			"view":"3903",
			"top":"5",
			"title":"18 Lines Clean and Neat C++ Solution 2ms",
			"vote":"12",
			"content":"    // Forward declaration of the read4 API.\\n    int read4(char *buf);\\n    \\n    class Solution {\\n    public:\\n        /**\\n         * @param buf Destination buffer\\n         * @param n   Maximum number of characters to read\\n         * @return    The number of characters read\\n         */\\n        queue<int> left;\\n        int read(char *buf, int n) {\\n            int len = 0;\\n            int c;\\n            while (left.size() > 0) {\\n                buf[len++] = left.front();\\n                left.pop();\\n                if (len == n) return len;\\n            }\\n            \\n            while (len < n) {\\n                c = read4(buf+len);\\n                len += c;\\n                if (c < 4) break;\\n            }\\n            \\n            for (int i=n; i<len; i++) {\\n                left.push(buf[i]);\\n            }\\n            int e = min(len, n);\\n            buf[e] = '\\\\0';\\n            return e;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"49633",
			"view":"3957",
			"top":"6",
			"title":"Clean accepted java solution",
			"vote":"10",
			"content":"The key is to store memorized variable in the class level and remember offset position and remaining number of elements.\\n\\n\\n    /* The read4 API is defined in the parent class Reader4.\\n          int read4(char[] buf); */\\n    \\n    public class Solution extends Reader4 {\\n        \\n        private int offSet = 0;\\n        private int remaining = 0;\\n        private boolean isEndOfFile = false;\\n        private char[] buffer = new char[4];\\n        \\n        /**\\n         * @param buf Destination buffer\\n         * @param n   Maximum number of characters to read\\n         * @return    The number of characters read\\n         */\\n        public int read(char[] buf, int n) {\\n            int readBytes = 0;\\n            while (readBytes < n && (remaining != 0 || !isEndOfFile)) {\\n                int readSize = 0;\\n                if (remaining != 0) {\\n                    readSize = remaining;\\n                } else {\\n                    offSet = 0;\\n                    readSize = read4(buffer);\\n                    if (readSize != 4) {\\n                        isEndOfFile = true;\\n                    }\\n                }\\n                int length = Math.min(n - readBytes, readSize);\\n                for (int i= offSet; i<offSet + length; i++) {\\n                    buf[readBytes++] = buffer[i];\\n                }\\n                remaining = readSize - length;\\n                if (remaining != 0) {\\n                    offSet += length;\\n                }\\n            }\\n            return readBytes;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"49599",
			"view":"3062",
			"top":"7",
			"title":"My python 40ms solution",
			"vote":"8",
			"content":"    class Solution:\\n    # @param buf, Destination buffer (a list of characters)\\n    # @param n,   Maximum number of characters to read (an integer)\\n    # @return     The number of characters read (an integer)\\n    def __init__(self):\\n        self.queue = []\\n    \\n    def read(self, buf, n):\\n        idx = 0\\n        while True:\\n            buf4 = [\"\"]*4\\n            l = read4(buf4)\\n            self.queue.extend(buf4)\\n            curr = min(len(self.queue), n-idx)\\n            for i in xrange(curr):\\n                buf[idx] = self.queue.pop(0)\\n                idx+=1\\n            if curr == 0:\\n                break \\n        return idx"
		},
		{
			"lc_ans_id":"49649",
			"view":"1076",
			"top":"8",
			"title":"C++ Solution - Followup from the easy problem",
			"vote":"5",
			"content":"This is a followup solution from my easy solution here: https://leetcode.com/discuss/98349/c-solution-7-lines-kind-of-socket-reading-problem - The idea is having a local buffer of size 4 which we can read. The first loop checks if we have any data available which was left over from the previous call to read. the %4 operator just mimics a circular buffer. The second loop simply keeps reading until we hit the end of file which is bytes == 0 or we are done reading till n.\\n\\n      /**\\n         * @param buf Destination buffer\\n         * @param n   Maximum number of characters to read\\n         * @return    The number of characters read\\n         */\\n        int read(char *buf, int n) {\\n           \\tif (n <= 0) return n; int i = 0;\\n        \\twhile (available > 0 && i < n) {\\n        \\t\\tbuf[i++] = store[curp++%4]; --available; // If we have some data left lets read that\\n        \\t}\\n        \\tint bytes = 0;\\n        \\twhile (true)\\n        \\t{\\n        \\t\\tif (i >= n) return i;\\n        \\t\\tbytes = read4(store);\\n        \\t\\tif (bytes == 0) return i;\\n        \\t\\twhile (bytes && i < n) { // populate our buffer given we have bytes to read\\n        \\t\\t\\tbuf[i++] = store[curp++%4]; --bytes; \\n        \\t\\t}\\n        \\t\\tavailable = bytes; // set the remaining bytes - we might need them in next read call\\n        \\t}\\n        }\\n        int available = 0, curp = 0;\\n        char store[4];"
		},
		{
			"lc_ans_id":"49653",
			"view":"454",
			"top":"9",
			"title":"A tip for c++ programmers: don't use static variables here",
			"vote":"4",
			"content":"As the static variables are only initialized once during one run, which apparently includes multiple test cases."
		}
	],
	"id":"158",
	"title":"Read N Characters Given Read4 II - Call multiple times",
	"content":"<p>\r\nThe API: <code>int read4(char *buf)</code> reads 4 characters at a time from a file.\r\n</p>\r\n\r\n<p>\r\nThe return value is the actual number of characters read. For example, it returns 3 if there is only 3 characters left in the file.\r\n</p>\r\n\r\n<p>\r\nBy using the <code>read4</code> API, implement the function <code>int read(char *buf, int n)</code> that reads <i>n</i> characters from the file.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\nThe <code>read</code> function may be called multiple times.\r\n</p>",
	"frequency":"231",
	"ac_num":"37117"
}