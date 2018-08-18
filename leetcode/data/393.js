{
	"difficulty":"2",
	"submit_num":"57611",
	"show_id":"393",
	"leetcode_id":"393",
	"answers":[
		{
			"lc_ans_id":"87462",
			"view":"10620",
			"top":"0",
			"title":"Concise C++ implementation",
			"vote":"86",
			"content":"```\\nclass Solution {\\npublic:\\n    bool validUtf8(vector<int>& data) {\\n        int count = 0;\\n        for (auto c : data) {\\n            if (count == 0) {\\n                if ((c >> 5) == 0b110) count = 1;\\n                else if ((c >> 4) == 0b1110) count = 2;\\n                else if ((c >> 3) == 0b11110) count = 3;\\n                else if ((c >> 7)) return false;\\n            } else {\\n                if ((c >> 6) != 0b10) return false;\\n                count--;\\n            }\\n        }\\n        return count == 0;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"87447",
			"view":"4852",
			"top":"1",
			"title":"Feeling like an English reading comprehension problem",
			"vote":"33",
			"content":"Finally I see it is to judge a UTF-8 char sequence, while the rules described are for a single char.\\nI feel more likely working on an English reading comprehension problem rather than algorithm.\\nSigh."
		},
		{
			"lc_ans_id":"87464",
			"view":"6091",
			"top":"2",
			"title":"Bit Manipulation, Java, 6ms",
			"vote":"16",
			"content":"```\\npublic boolean validUtf8(int[] data) {\\n\\tif(data==null || data.length==0) return false;\\n\\tboolean isValid = true;\\n\\tfor(int i=0;i<data.length;i++) {\\n\\t\\tif(data[i]>255) return false; // 1 after 8th digit, 100000000\\n\\t\\tint numberOfBytes = 0;\\n\\t\\tif((data[i] & 128) == 0) { // 0xxxxxxx, 1 byte, 128(10000000)\\n\\t\\t\\tnumberOfBytes = 1;\\n\\t\\t} else if((data[i] & 224) == 192) { // 110xxxxx, 2 bytes, 224(11100000), 192(11000000)\\n\\t\\t\\tnumberOfBytes = 2;\\n\\t\\t} else if((data[i] & 240) == 224) { // 1110xxxx, 3 bytes, 240(11110000), 224(11100000)\\n\\t\\t\\tnumberOfBytes = 3;\\n\\t\\t} else if((data[i] & 248) == 240) { // 11110xxx, 4 bytes, 248(11111000), 240(11110000)\\n\\t\\t\\tnumberOfBytes = 4;\\n\\t\\t} else {\\n\\t\\t\\treturn false;\\n\\t\\t}\\n\\t\\tfor(int j=1;j<numberOfBytes;j++) { // check that the next n bytes start with 10xxxxxx\\n\\t\\t\\tif(i+j>=data.length) return false;\\n\\t\\t\\tif((data[i+j] & 192) != 128) return false; // 192(11000000), 128(10000000)\\n\\t\\t}\\n\\t\\ti=i+numberOfBytes-1;\\n\\t}\\n\\treturn isValid;\\n}\\n```"
		},
		{
			"lc_ans_id":"87470",
			"view":"5005",
			"top":"3",
			"title":"one pass simple solution",
			"vote":"12",
			"content":"public class Solution {\\n\\n    public bool ValidUtf8(int[] data) {\\n        int bitCount = 0;\\n        \\n        foreach(int n in data){\\n            \\n            if(n >= 192){\\n                if(bitCount != 0)\\n                    return false;\\n                else if(n >= 240)\\n                    bitCount = 3;\\n                else if(n >= 224)\\n                    bitCount = 2;\\n                else\\n                    bitCount = 1;\\n            }else if(n >= 128){\\n                bitCount--;\\n                if(bitCount < 0)\\n                    return false;\\n            }else if(bitCount > 0){\\n                return false;\\n            }\\n        }\\n        \\n        return bitCount == 0;\\n    }\\n}"
		},
		{
			"lc_ans_id":"87494",
			"view":"1399",
			"top":"4",
			"title":"Short'n'Clean 12-lines Python solution",
			"vote":"8",
			"content":"```\\ndef check(nums, start, size):\\n    for i in range(start + 1, start + size + 1):\\n        if i >= len(nums) or (nums[i] >> 6) != 0b10: return False\\n    return True\\n\\nclass Solution(object):\\n    def validUtf8(self, nums, start=0):\\n        while start < len(nums):\\n            first = nums[start]\\n            if   (first >> 3) == 0b11110 and check(nums, start, 3): start += 4\\n            elif (first >> 4) == 0b1110  and check(nums, start, 2): start += 3\\n            elif (first >> 5) == 0b110   and check(nums, start, 1): start += 2\\n            elif (first >> 7) == 0:                                 start += 1\\n            else:                                                   return False\\n        return True\\n\\n# 45 / 45 test cases passed.\\n# Status: Accepted\\n# Runtime: 89 ms\\n```"
		},
		{
			"lc_ans_id":"87485",
			"view":"398",
			"top":"5",
			"title":"O(n) JAVA solution, with detailed explaination",
			"vote":"5",
			"content":"```\\npublic class Solution {\\n    /*\\n     * Thought-way: \\n     * As long as every byte in the array is of right type, it is a valid UTF-8 encoding.\\n     * \\n     * Method: \\n     * Start from index 0, determine each byte's type and check its validity.\\n     *\\n     * There are five kinds of valid byte type: 0**, 10**, 110**,1110** and 11110**\\n     * Give them type numbers, 0, 1, 2, 3, 4 which are the index of the first 0 from left. \\n     * So, the index of the first 0 determines the byte type.\\n     *\\n     * if a byte belongs to one of them:\\n        1 : if it is type 0, continue\\n        2 : if it is type 2 or 3 or 4, check whether the following 1, 2, and 3 byte(s) are of type 1 or not\\n                if not, return false;\\n     * else if a byte is type 1 or not of valid type, return false\\n     *\\n     * Analysis :\\n     * The faster you can determine the type, the quicker you can get. \\n     * Time O(n), space O(1)\\n     * real performance: 7ms\\n     */\\n     \\n    // Hard code \"masks\" array to find the index of the first appearance of 0 in the lower 8 bits of each integer.\\n    private int[] masks = {128, 64, 32, 16, 8};\\n    public boolean validUtf8(int[] data) {\\n        int len = data.length;\\n        for (int i = 0; i < len; i ++) {\\n            int curr = data[i];\\n            int type = getType(curr);\\n            if (type == 0) {\\n                continue;\\n            } else if (type > 1 && i + type <= len) {\\n                while (type-- > 1) {\\n                    if (getType(data[++i]) != 1) {\\n                        return false;\\n                    }\\n                }\\n            } else {\\n                return false;\\n            }\\n        }\\n        return true;\\n    }\\n    \\n    public int getType(int num) {\\n        for (int i = 0; i < 5; i ++) {\\n            if ((masks[i] & num) == 0) {\\n                return i;\\n            }\\n        }\\n        return -1;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"87451",
			"view":"508",
			"top":"6",
			"title":"The problem description is super vague to me.",
			"vote":"3",
			"content":"For those who are not familiar with UTF-8, the two examples given didn't tell us what should we do if the number like 11110xxx shows up more than once.\\n\\nIt appears to me that once we found out one complete sequence like 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx, we can disregard the rest. But the truth is until lots of 'wrong answer's I couldn't figure out that we needa repeat the sequence cycle after cycle till finishing the list data."
		},
		{
			"lc_ans_id":"87520",
			"view":"907",
			"top":"7",
			"title":"Short O(n) Java solution, scan only once",
			"vote":"3",
			"content":"```\\npublic boolean validUtf8(int[] data) {\\n  int idx = 0;\\n  while(idx < data.length) {\\n    int utfIdx = idx++;\\n    if ((data[utfIdx] & (1<<7)) == 0) continue; //single byte\\n    for(int i = 6; i>=0; i--) {\\n      if ((data[utfIdx] & (1<<i)) > 0) { //find one more byte in multiple bytes\\n        if (idx >= data.length) return false; //not enough bytes\\n        if (((data[idx] & (1<<7)) == 0) || ((data[idx] & (1<<6))>0)) return false; //not starting with 10xxxxxx\\n        idx++;\\n      } else if (i==6) return false;  //for fist byte in multiple bytes is 10xxxxxx, at least 110xxxxx\\n      else break; //meet 0, remaining as utf content\\n    }\\n  }\\n  return true;\\n}\\n```"
		},
		{
			"lc_ans_id":"87489",
			"view":"1682",
			"top":"8",
			"title":"O(n) solution using Java",
			"vote":"3",
			"content":"\\n```\\npublic class Solution {\\n    public boolean validUtf8(int[] data) {\\n        int n = data.length;\\n        if (n == 0) return true;\\n        int skip = 0b10000000;\\n        int check = 0;\\n        for (int i = 0; i < data.length; i++) {\\n            if (check > 0) {\\n                if ((data[i] & skip) == skip) check--;\\n                else return false;\\n            } else {\\n                check = getOneBitCountFromHead(data[i]);\\n                if (check < 0) return false;\\n            }\\n        }\\n        return check == 0;\\n    }\\n    private int getOneBitCountFromHead(int num) {\\n        if ((num & 0b11110000) == 0b11110000) return 3;\\n        if ((num & 0b11100000) == 0b11100000) return 2;\\n        if ((num & 0b11000000) == 0b11000000) return 1;\\n        if ((num & 0b10000000) == 0b10000000) return -1; //error\\n        return 0;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"87496",
			"view":"655",
			"top":"9",
			"title":"Simple one pass concise Java solution beating 99%",
			"vote":"2",
			"content":"So, I wrote a literal translation of the problem statement in Java. This works in O(n), obviously.\\n\\n```\\npublic class Solution {\\n\\tpublic boolean validUtf8(int[] data) {\\n\\t\\tint varCharLeft = 0;\\n\\t\\tfor (int b: data) {\\n\\t\\t\\tif (varCharLeft == 0) {\\n\\t\\t\\t\\tif ((b & 0b010000000) == 0)  varCharLeft = 0;\\n\\t\\t\\t\\telse if ((b & 0b011100000) == 0b11000000)  varCharLeft = 1;\\n\\t\\t\\t\\telse if ((b & 0b011110000) == 0b11100000)  varCharLeft = 2;\\n\\t\\t\\t\\telse if ((b & 0b011111000) == 0b11110000)  varCharLeft = 3;\\n\\t\\t\\t\\telse return false;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tif ((b & 0b011000000) != 0b10000000)  return false;\\n\\t\\t\\t\\tvarCharLeft--;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\treturn varCharLeft==0;\\n\\t}\\n}\\n```\\n\\nJust bragging, this beats 99.86% submissions. But, seems like in leetcode, timing is very inconsistent nowadays. \\n![0_1475701198342_Capture.PNG](/uploads/files/1475701270757-capture.png)"
		}
	],
	"id":"393",
	"title":"UTF-8 Validation",
	"content":"<p>A character in UTF8 can be from <b>1 to 4 bytes</b> long, subjected to the following rules:</p>\r\n<ol>\r\n<li>For 1-byte character, the first bit is a 0, followed by its unicode code.</li>\r\n<li>For n-bytes character, the first n-bits are all one's, the n+1 bit is 0, followed by n-1 bytes with most significant 2 bits being 10.</li>\r\n</ol>\r\n<p>This is how the UTF-8 encoding would work:</p>\r\n\r\n<pre><code>   Char. number range  |        UTF-8 octet sequence\r\n      (hexadecimal)    |              (binary)\r\n   --------------------+---------------------------------------------\r\n   0000 0000-0000 007F | 0xxxxxxx\r\n   0000 0080-0000 07FF | 110xxxxx 10xxxxxx\r\n   0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx\r\n   0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx\r\n</code></pre>\r\n<p>\r\nGiven an array of integers representing the data, return whether it is a valid utf-8 encoding.\r\n</p>\r\n<p>\r\n<b>Note:</b><br />\r\nThe input is an array of integers. Only the <b>least significant 8 bits</b> of each integer is used to store the data. This means each integer represents only 1 byte of data.\r\n</p>\r\n\r\n<p>\r\n<b>Example 1:</b>\r\n<pre>\r\ndata = [197, 130, 1], which represents the octet sequence: <b>11000101 10000010 00000001</b>.\r\n\r\nReturn <b>true</b>.\r\nIt is a valid utf-8 encoding for a 2-bytes character followed by a 1-byte character.\r\n</pre>\r\n</p>\r\n\r\n<p>\r\n<b>Example 2:</b>\r\n<pre>\r\ndata = [235, 140, 4], which represented the octet sequence: <b>11101011 10001100 00000100</b>.\r\n\r\nReturn <b>false</b>.\r\nThe first 3 bits are all one's and the 4th bit is 0 means it is a 3-bytes character.\r\nThe next byte is a continuation byte which starts with 10 and that's correct.\r\nBut the second continuation byte does not start with 10, so it is invalid.\r\n</pre>\r\n</p>",
	"frequency":"217",
	"ac_num":"19997"
}