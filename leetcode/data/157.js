{
	"difficulty":"1",
	"submit_num":"149303",
	"show_id":"157",
	"leetcode_id":"157",
	"answers":[
		{
			"lc_ans_id":"49501",
			"view":"21713",
			"top":"0",
			"title":"What is the objective of this question",
			"vote":"132",
			"content":"This question is very unclear to me. what are we supposed to accomplish in this problem. Our read function returns an int but the expected result looks like its a String. if we are forced to read 4 chars at a time how do we ever read n chars that are not a factor of 4 if we actually use the read4 method? is 'n' the max we can return or must we return exactly n assuming at least n items exist other wise return the number of items. clearly I'm missing a lot here can someone please explain this problem to me."
		},
		{
			"lc_ans_id":"49496",
			"view":"16846",
			"top":"1",
			"title":"Another accepted Java solution",
			"vote":"77",
			"content":"    public int read(char[] buf, int n) {\\n      boolean eof = false;      // end of file flag\\n      int total = 0;            // total bytes have read\\n      char[] tmp = new char[4]; // temp buffer\\n      \\n      while (!eof && total < n) {\\n        int count = read4(tmp);\\n        \\n        // check if it's the end of the file\\n        eof = count < 4;\\n        \\n        // get the actual count\\n        count = Math.min(count, n - total);\\n        \\n        // copy from temp buffer to buf\\n        for (int i = 0; i < count; i++) \\n          buf[total++] = tmp[i];\\n      }\\n      \\n      return total;\\n    }"
		},
		{
			"lc_ans_id":"49557",
			"view":"11006",
			"top":"2",
			"title":"Accepted clean java solution",
			"vote":"21",
			"content":"    /* The read4 API is defined in the parent class Reader4.\\n          int read4(char[] buf); */\\n    \\n    public class Solution extends Reader4 {\\n        /**\\n         * @param buf Destination buffer\\n         * @param n   Maximum number of characters to read\\n         * @return    The number of characters read\\n         */\\n        public int read(char[] buf, int n) {\\n            \\n            char[] buffer = new char[4];\\n            boolean endOfFile = false;\\n            int readBytes = 0;\\n            \\n            while (readBytes < n && !endOfFile) {\\n                int currReadBytes = read4(buffer);\\n                if (currReadBytes !=4) {\\n                    endOfFile = true;\\n                }\\n                int length = Math.min(n - readBytes, currReadBytes);\\n                for (int i=0; i<length; i++) {\\n                    buf[readBytes + i] = buffer[i];\\n                }\\n                readBytes += length;\\n            }\\n            return readBytes;\\n        }\\n    }\\n\\n\\npersonally, I feel this problem is hard to understand. I would prefer the return result is the buf instead of an int.   copy the buf is error prone as it is a fixed array size.  lots of assumption."
		},
		{
			"lc_ans_id":"49499",
			"view":"8573",
			"top":"3",
			"title":"AP Solution C++ 0ms 6lines",
			"vote":"12",
			"content":"    int read(char *buf, int n) {\\n        int res = 0;\\n        for(int i = 0, curr; i <= n/4 && curr != 0; i++){\\n            curr = read4(buf + res);\\n            res += curr;\\n        }\\n        return min(res, n);\\n    }"
		},
		{
			"lc_ans_id":"49509",
			"view":"4216",
			"top":"4",
			"title":"C++ concise solution.",
			"vote":"10",
			"content":"        \\n    int read(char *buf, int n) {\\n        int res = 0;\\n        while (n > 0) {\\n            int tmp = min(read4(buf), n);\\n            res += tmp;\\n            buf += tmp;\\n            if (tmp < 4)\\n                break;\\n            n -= 4;\\n        }\\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"49512",
			"view":"2983",
			"top":"5",
			"title":"9-line 61ms AC python solution with comments",
			"vote":"10",
			"content":"    class Solution:\\n        def read(self, buf, n):\\n            idx = 0\\n            while True:\\n                buf4 = [\"\"]*4\\n                curr = min(read4(buf4),n-idx)  # curr is the number of chars that reads\\n                for i in xrange(curr):\\n                    buf[idx] = buf4[i]\\n                    idx+=1\\n                if curr!=4 or idx==n:  # return if it reaches the end of file or reaches n\\n                    return idx"
		},
		{
			"lc_ans_id":"49521",
			"view":"2060",
			"top":"6",
			"title":"0ms C++ Solution",
			"vote":"7",
			"content":"To read `n` characters, we first call `read4` for `n / 4` times. For example, if we want to read `10` characters, we will read them in the `8 (4 * 2) + 2` manner by first calling `read4` for `2 (n / 4)` times to read the `8` characters.\\n\\nThen we see if there are any remaining characters to read (in this case, `remain = 2`).\\n \\nIf `remain > 0`, we read them again using `read4`. However, we may not be able to read all of them. For example, `buf` has `9` characters and we need to read `10`. After reading the `8` characters we can only read the remaining `1` character. In this case, we simply add the minimum of `remain` and the actual number of characters read by `read4` to the couter (`total`) and return it. Otherwise, we are done and just return `n` .\\n\\nThe code is as follows.  \\n\\n    // Forward declaration of the read4 API.\\n    int read4(char *buf);\\n    \\n    class Solution {\\n    public:\\n        /** \\n         * @param buf Destination buffer\\n         * @param n   Maximum number of characters to read\\n         * @return    The number of characters read\\n         */\\n        int read(char *buf, int n) {\\n            int total = 0;\\n            for (int i = 0; i < n / 4; i++)\\n                total += read4(buf + total);\\n            int remain = n - total;\\n            if (remain) {\\n                int read = read4(buf + total);\\n                return total + min(read, remain);\\n            }\\n            return n;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"49556",
			"view":"856",
			"top":"7",
			"title":"Simple and clean java solution",
			"vote":"6",
			"content":"The question is indeed vague. read4(buf) actually means read 4 characters into buf.\\n\\n       public int read(char[] buf, int n) {\\n        \\tchar[] buffer = new char[4];//temp buffer for each call to read4()\\n        \\tint read = 0;//actual num of char read by the current call to read4()   \\t\\n        \\tint hasRead = 0;//running total of char read\\n        \\twhile (true){\\n        \\t\\tread = read4(buffer);//read4\\n            \\tint toRead=Math.min(read, n-hasRead);//determine how many char to copy over to buf from buffer\\n            \\tfor (int i = 0; i<toRead; i++){//do the copy\\n            \\t\\tbuf[hasRead++]=buffer[i];\\n            \\t}\\n            \\tif (read<4) return hasRead;\\n            \\tif (hasRead==n) return n;\\n        \\t}"
		},
		{
			"lc_ans_id":"49520",
			"view":"2808",
			"top":"8",
			"title":"Python solution with explainations and comments",
			"vote":"6",
			"content":"Simplified from solution to #158 in this [post][1]\\n\\ni.e., easy to extend to multi-call case\\n\\n    def read(self, buf, n):\\n        idx = 0\\n        while n > 0:\\n            # read file to buf4\\n            buf4 = [\"\"]*4\\n            l = read4(buf4)\\n            # if no more char in file, return\\n            if not l:\\n                return idx\\n            # write buf4 into buf directly\\n            for i in range(min(l, n)):\\n                buf[idx] = buf4[i]\\n                idx += 1\\n                n -= 1\\n        return idx\\n\\n  [1]: https://leetcode.com/discuss/75081/python-solution-with-explainations-and-comments"
		},
		{
			"lc_ans_id":"49527",
			"view":"289",
			"top":"9",
			"title":"Come and see if you do not understand the question",
			"vote":"3",
			"content":"Some people think we should return the buf [](or *buf), and they think just returning an int is meaningless.\\n\\nIn fact, the read() method just does two things:\\n1. It returns an int to show how long the file is.\\n2. After we pass char[] to the read() method, and the char[] is filled with characters extracted from the files by read().\\n\\nSince we cannot return multiple values, we just return an int to show the length of the file. The content of the file is stored in the char[]. The trick is we could actually visit the char[] after we use read() to get the content of the file, which does not require return statement to prevent multiple return values."
		}
	],
	"id":"157",
	"title":"Read N Characters Given Read4",
	"content":"<p>\r\nThe API: <code>int read4(char *buf)</code> reads 4 characters at a time from a file.\r\n</p>\r\n\r\n<p>\r\nThe return value is the actual number of characters read. For example, it returns 3 if there is only 3 characters left in the file.\r\n</p>\r\n\r\n<p>\r\nBy using the <code>read4</code> API, implement the function <code>int read(char *buf, int n)</code> that reads <i>n</i> characters from the file.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\nThe <code>read</code> function will only be called once for each test case.\r\n</p>",
	"frequency":"251",
	"ac_num":"43577"
}