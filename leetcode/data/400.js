{
	"difficulty":"1",
	"submit_num":"103535",
	"show_id":"400",
	"leetcode_id":"400",
	"answers":[
		{
			"lc_ans_id":"88363",
			"view":"26741",
			"top":"0",
			"title":"Java solution",
			"vote":"147",
			"content":"Straight forward way to solve the problem in 3 steps:\\n1. find the length of the number where the nth digit is from\\n2. find the actual number where the nth digit is from\\n3. find the nth digit and return\\n\\n```\\n\\tpublic int findNthDigit(int n) {\\n\\t\\tint len = 1;\\n\\t\\tlong count = 9;\\n\\t\\tint start = 1;\\n\\n\\t\\twhile (n > len * count) {\\n\\t\\t\\tn -= len * count;\\n\\t\\t\\tlen += 1;\\n\\t\\t\\tcount *= 10;\\n\\t\\t\\tstart *= 10;\\n\\t\\t}\\n\\n\\t\\tstart += (n - 1) / len;\\n\\t\\tString s = Integer.toString(start);\\n\\t\\treturn Character.getNumericValue(s.charAt((n - 1) % len));\\n\\t}\\n```"
		},
		{
			"lc_ans_id":"88369",
			"view":"11547",
			"top":"1",
			"title":"0ms C++ Solution with Detail-Explanation",
			"vote":"55",
			"content":"To make the problem much much more easier, I divide the problem into 3 parts:\\n1. calculate how many digits the number has.\\n2. calculate what the number is.\\n3. find out which digit in the number is we wanted.\\n\\nYou can find the relative code part in the **code** section.\\nHere is an example to help you to understand my code:\\n\\n**Example:**\\n- Input: 250\\n\\n- After step 1, you will find that the 250th digit must belong to a 3-digit number, since 1~9 can only provide 9 digits and 10~99 can only provide 180 digits. Here, `n` = 250 - 9 - 90 * 2 = 61, and `digits` = 3.\\n\\n- In step 2, we will find the target number, which named as `number` in my code. From step 1, the `n` becomes to 61, which means \"the 61st digit in 3-digit number is the digit we are looking for .\" Easily, we know the 61st digit in 3-digit number belongs to `number` = 100 + 61 / 3 = 100 + 20 = 120. `index` is the index of the target digit in `number`. If `index` equals to 0, it means the target digit is the last digit of `number`.\\n\\n- Step 3, from step 2, we know `index` = `n` % `digits` = 61 % 3 = 1, which means the target digit is the 1st digit in `number`. Then, return `1`.\\n\\n**Code:**   \\n```c++\\nclass Solution \\n{\\n    // date: 2016-09-18     location: Vista Del Lago III Apartments\\npublic:\\n    int findNthDigit(int n) \\n    {\\n        // step 1. calculate how many digits the number has.\\n        long base = 9, digits = 1;\\n        while (n - base * digits > 0)\\n        {\\n            n -= base * digits;\\n            base *= 10;\\n            digits ++;\\n        }\\n\\n        // step 2. calculate what the number is.\\n        int index = n % digits;\\n        if (index == 0)\\n            index = digits;\\n        long num = 1;\\n        for (int i = 1; i < digits; i ++)\\n            num *= 10;\\n        num += (index == digits) ? n / digits - 1 : n / digits;;\\n\\n        // step 3. find out which digit in the number is we wanted.\\n        for (int i = index; i < digits; i ++)\\n            num /= 10;\\n        return num % 10;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88375",
			"view":"7476",
			"top":"2",
			"title":"Short Python+Java",
			"vote":"25",
			"content":"Check the same-length ranges 1-9, 10-99, 100-999, 1000-9999, etc.\\n\\nPython:\\n\\n    def findNthDigit(self, n):\\n        n -= 1\\n        for digits in range(1, 11):\\n            first = 10**(digits - 1)\\n            if n < 9 * first * digits:\\n                return int(str(first + n/digits)[n%digits])\\n            n -= 9 * first * digits\\n\\nJava:\\n\\n    public int findNthDigit(int n) {\\n        n -= 1;\\n        int digits = 1, first = 1;\\n        while (n / 9 / first / digits >= 1) {\\n            n -= 9 * first * digits;\\n            digits++;\\n            first *= 10;\\n        }\\n        return (first + n/digits + \"\").charAt(n%digits) - '0';\\n    }\\n\\nUsing divisions instead of multiplications to prevent overflow."
		},
		{
			"lc_ans_id":"88372",
			"view":"5754",
			"top":"3",
			"title":"Sharing my thinking process",
			"vote":"14",
			"content":"Idea:\\n\\nThe first idea is: the result will only be within 0~9, can we find a cycle?\\n\\nFor input 1 to 20, the result is:\\n\\n1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5\\n\\nNo cycle found. While we can find that digits matter! The result sequence should be like:\\n\\n1~9: 1*9=9 in total\\n\\n10~99: 2*90=180 in total\\n\\n100~999: 3*900=2700 in total\\n\\nThen, 4*9000, 5*90000, k*9*10^k\\n\\n\\n\\nFor input 12345, we have 9+180+2700<12345<9+180+2700+36000, so the corresponding number is 1000+.\\n\\n12345-9-180-2700=9456-1=9455\\n\\n9455/4 = 2363+1000=3363, 9455%4=3, so the result should be 3. For 12346: 3, for 12347: 3, for 12348: 6, for 12349: 4\\n\\n\\n\\n336(12345 start from the next 3)3\\n\\n(12346)3(12347)3(12348)6(12349)4"
		},
		{
			"lc_ans_id":"88417",
			"view":"3826",
			"top":"4",
			"title":"4-liner in Python, and complexity analysis",
			"vote":"13",
			"content":"How many digits of size `size` can we have?\\n\\n1 * 9   (size 1, 1... 9)\\n2 * 90   (size 2, 10... 99)\\n3 * 900 (size 3, 100... 999)\\n\\nSo we can \"fast-skip\" those numbers until we find the size of the number that will hold our digit.\\nAt the end of the loop, we will have:\\n\\n1) `start`: first number of size `size` (will be power of 10)\\n2) `n`: will be the number of digits that we need to count after `start`\\n\\nHow do we get the number that will hold the digit? It will be `start + (n - 1) // size` (we use `n - 1` because we need zero-based index). Once we have that number, we can get the `n - 1 % size`-th digit of that number, and that will be our result.\\n\\n```\\nclass Solution(object):\\n    def findNthDigit(self, n):\\n        start, size, step = 1, 1, 9\\n        while n > size * step:\\n            n, size, step, start = n - (size * step), size + 1, step * 10, start * 10\\n        return int(str(start + (n - 1) // size)[(n - 1) % size])\\n```\\n\\nWhat is the complexity of this code?\\n\\nThe `while` loop takes `O(log(n))` time because a number `n` will have at most `O(log(n))` digits. Then the return statement takes `O(log(n))` time to convert the number to string. So total time complexity is `O(log(n))`, with `O(log(n))` extra space for the string.\\n\\nHere it's a preliminary `O(n)` code, that gets TLE but it's useful to start off with during the interview.\\n\\n```\\nclass Solution(object):\\n    def findNthDigit(self, n):\\n        start, size = 1, 1\\n        while n > size:\\n            n, start = n - size, start + 1\\n            size = len(str(start))\\n        return int(str(start)[n-1])\\n```"
		},
		{
			"lc_ans_id":"88434",
			"view":"1573",
			"top":"5",
			"title":"Intuitive solution with comments",
			"vote":"9",
			"content":"```/*\\nWe are tightening the range of our target gradually.\\n1. Is this number that has nth digit between 100~999, 1000~9999 or some other range?\\n2. What is this number?\\n3. Within thin number, which digit is the nth digit?\\n\\nnumber of the digits at each \"level\"\\n1-9: 9 digits\\n10-99 : 90 * 2 = 180 digits \\n100-999 : 900 * 3 = 2700 digits\\n1000-9999 : 9000 * 4 = 36000 digits\\n....\\n*/\\npublic class Solution {\\n    public int findNthDigit(int n) {\\n        if(n < 1) return 0;\\n        if(n < 10) return n;\\n        int counter = 1;  //stores the level number\\n        int base = 0;      //stores the biggest number from previous level\\n        while(n > (9 * Math.pow(10,counter -1) * (counter))){\\n            base += 9 * Math.pow(10,counter -1);\\n            n -= (9 * Math.pow(10,counter -1) * (counter));\\n            counter++;\\n        }\\n        //target is the actual number that has nth digit\\n        int target = base + ((n + counter - 1) / counter);  //to get the ceiling of n / counter\\n        int offset = n % counter;\\n        offset = (offset == 0) ? 0:counter - offset;\\n        for(int i = 0; i < offset; i++){\\n            target = target / 10;\\n        }\\n        return target % 10;\\n    }\\n}"
		},
		{
			"lc_ans_id":"88408",
			"view":"578",
			"top":"6",
			"title":"My C++ short and clean answer with explanation",
			"vote":"4",
			"content":"```\\n    int findNthDigit(int n) {\\n        long long multiplier = 9,digits = 1,begin = 1;\\n        while(n>multiplier*digits){\\n            n -= multiplier*digits++;\\n            multiplier *= 10;}\\n        int after = (n-1)/digits, location = (n-1)%digits;\\n        begin = pow(10,(digits-1));\\n        string a= (to_string(begin+after));\\n        a = a[location];\\n        return stoi(a);\\n```\\nMy code is done by following step: 1. to calculate how many digits the number has and the beginning of the corresponding digits number such as 10,100,1000. 2. to find how many numbers after the beginning number. 3. find the location of digit that we want"
		},
		{
			"lc_ans_id":"88370",
			"view":"1037",
			"top":"7",
			"title":"Share my 0ms C++ solution with explanation",
			"vote":"4",
			"content":"The original question is:\\n* Find the **nth digit** of the infinite integer sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ... \\n---\\n### **1. Take a try**\\n---\\n1) From **1** to **9**, we have **9 single-digit** numbers (**1\\xd79 digits**).\\n2) From **10** to **99**, we have **90 double-digit** numbers (**2\\xd790 digits**).\\n3) From **100** to **999**, we have **900 triple-digit** numbers (**3\\xd7900 digits**).\\n............................................................................................................\\n---\\n### **2. Divide the problem**\\n---\\nIf we suppose that the **nth digit** is in **integer X**, we can divide the problem into 3 steps:\\n\\n1) Find out the **TOTAL AMOUNT OF DIGITS** that **X** has in all. \\n    (**1**? **2**? **3**?..., which means **X** is between **1 and 9**? **10 and 99**? **100 and 999**? ...)\\n2) Find out **WHICH NUMBER** **X** is. \\n3) Find out the  **nth digit** is **WHICH DIGIT** in **X**, and output.\\n\\n---\\n### **3. Explanation**\\n---\\n#### **Step 1:** \\n---\\n**n** can be presented as:\\n\\n> ##### **n = 9 + 2 \\xd7 90 + 3 \\xd7 900 + ... + 9(k - 1) \\xd7 10^(k - 2) + M, M < 9k \\xd7 10^(k-1)**\\n\\nHere I need to find out **M** in order to locate **X**. I use an **recursive** solution.\\n\\nThe recursive function is named as `find(int n, int p)`\\n\\n1) Set the **initial** total amount of digits as **p = 1**;\\n2) Calculate the amount of all **p-digits** numbers' digits:  **num =  9p \\xd7 10^(p - 1)**\\n3) Judge if **n > num**\\n    If **TRUE**, return `find(n - num, p + 1)`.\\n    If **FALSE**, go to **Step 2**.\\n---\\n#### **Step 2:** \\n---\\n\\nHere I get **M**, and I know **X MUST** has **p digits**.\\n\\nHow to find **WHICH NUMBER** **X** is? Let's see some examples:\\n\\n1) If **M** is **1** to **p**, **X** is **10000....0 (p - 1 zeros , one 1)**.\\n2) If **M** is **p + 1** to **2p**, **X** is **10000...1 (p - 2 zeros, two 1's)**.\\n..............................................................................\\n\\nWe come to the **conclusion**:\\n\\n> ##### **X = (M - 1) / p + 10000....0 (p - 1 zeros , one 1) = (M - 1) / p + 10^(p - 1)**.\\n\\nAs **X** has been found, now the **nth digit** is the **kth digit** in **X**, where\\n\\n> ##### **k = (M - 1) mod p, 0 \\u2264 k \\u2264 p - 1**.\\n\\nThen we go to **Step 3**.\\n\\n---\\n#### **Step 3:** \\n--- \\nSuppose **X = A0A1A2...A(p - 1), which has p digits**.\\n\\nAs\\n\\n* **X / 10^(p - 1)** = A0. A0 mod 10 = **A0**;\\n* **X / 10^(p - 2)** = A0A1. A0A1 mod 10 = **A1**;\\n.................................\\n\\nThe **kth digit** in **X** is\\n\\n> ##### **X / 10^(p - k - 1) mod 10**\\n\\n---\\n### **4. Code**\\n\\n```\\nclass Solution {\\npublic:\\n    int find(int n, int p)\\n    {\\n        if(n > 9 * p * pow(10, p - 1))\\n        {\\n            // Step 1\\n            return find(n - 9 * p * pow(10, p - 1), p + 1);\\n        }else{\\n            // Step 2\\n            int x = (n - 1) / p + pow(10, p - 1);\\n            int k = (n - 1) % p;\\n            // Step 3\\n            return (x / (int) pow(10, p - k - 1)) % 10;\\n        }\\n    }\\n    \\n    int findNthDigit(int n) {\\n        return find (n, 1);\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"88383",
			"view":"264",
			"top":"8",
			"title":"java 5ms solution beats 94.03%",
			"vote":"3",
			"content":"```\\n  public  static int findNthDigit(int n) {\\n        int digit = 1;//digit level, we start at one digit.\\n        long counts = 9;//the number counts of current digit level,we start at one digit,there are 9 numbers(1-9)which is at one digit.\\n        /**\\n         * number [1-9] (there are 9 numbers)is of one digit,number[10-99](there are 90 numbers) is\\n         * of two digits,number[100-999](there are 900 numbers) is of three digits,so first we should\\n         * find what level(i mean which digits(one digit,two digit or so on)  by level) the nth digit locate,\\n         * once we find the digit level, we achieve half the process,\\n         */\\n        /**\\n         *if n - digit * counts > 0,it means the nth digit is not at the current digit level,we should\\n         * increase digit level to pass more number\\n         */\\n\\n        while (n - digit * counts > 0) {\\n            //every time we pass the number at current digit level\\n            n -= digit * counts;\\n\\n            digit++;\\n            //counts are grow as follows,9,90,900,9000.....since the counts maybe overflow so i use long type\\n            counts *= 10;\\n        }\\n        //after loop,the n means nth digits from the current baseNumber\\n\\n        //the base number is 1\\uff0c10\\uff0c100\\uff0c1000\\uff0c10000 and so on.\\n        int baseNumber = (int)Math.pow(10, digit - 1);\\n        //find the number where nth digit locate\\n        int number  = (n -1) / digit + baseNumber;\\n        //find the digit where nth digit locate at the number above\\n        int mod = (n - 1 ) % digit;\\n        return String.valueOf(number).charAt(mod) - '0';\\n    }\\n```"
		},
		{
			"lc_ans_id":"88400",
			"view":"564",
			"top":"9",
			"title":"Just explain, no code",
			"vote":"3",
			"content":"sequence  1  2  3  4  5  6  7  8  9  1    0   1    1   1     2     1   3   1     4     1     5     1     6 \\nNth digital 1  2  3  4  5  6  7  8  9 10 11  12  13  14  15  16  17  18  19   20   21  22    23\\n\\nI list sequence 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\\nblow the sequence is the Nth digital, like the 11th digital is 0, 12 is 1, 13 is 1, 14 is 1, 15 is 2, 16 is 1, 17 is 3.........\\n\\nSot ehe regular is very oberviously now:\\n1-------9       9*1 = 9 digits\\n10-----99     90 *2 = 180 digits\\n100---999    900 * 3 = 2700 digits\\n\\n\\nNow, for example gave N = 1000, then 1000-9-180 = 811, it means the 811th digit local in [100, 999], and we know each number like 100 has three digit, so 811 / 3 = 270, \\n\\nThen, we know the 270th number in [100, 999], is 270th + 100 (start from 100) = 370.\\n\\n370 still has three digit, which one is the answer? 3, 7, 0\\n\\n811 % 3 = 1, so the first one is the answer, so return 3."
		}
	],
	"id":"400",
	"title":"Nth Digit",
	"content":"<p>Find the <i>n</i><sup>th</sup> digit of the infinite integer sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... </p>\r\n\r\n<p><b>Note:</b><br />\r\n<i>n</i> is positive and will fit within the range of a 32-bit signed integer (<i>n</i> < 2<sup>31</sup>).\r\n</p>\r\n\r\n<p><b>Example 1:</b>\r\n<pre>\r\n<b>Input:</b>\r\n3\r\n\r\n<b>Output:</b>\r\n3\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b>\r\n<pre>\r\n<b>Input:</b>\r\n11\r\n\r\n<b>Output:</b>\r\n0\r\n\r\n<b>Explanation:</b>\r\nThe 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.\r\n</pre>\r\n</p>",
	"frequency":"242",
	"ac_num":"31235"
}