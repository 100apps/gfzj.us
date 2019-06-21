{
	"difficulty":"1",
	"submit_num":"173444",
	"show_id":"371",
	"leetcode_id":"371",
	"answers":[
		{
			"lc_ans_id":"84278",
			"view":"61001",
			"top":"0",
			"title":"A summary: how to use bit manipulation to solve problems easily and efficiently",
			"vote":"637",
			"content":"### Wiki\\nBit manipulation is the act of algorithmically manipulating bits or other pieces of data shorter than a word. Computer programming tasks that require bit manipulation include low-level device control, error detection and correction algorithms, data compression, encryption algorithms, and optimization. For most other tasks, modern programming languages allow the programmer to work directly with abstractions instead of bits that represent those abstractions. Source code that does bit manipulation makes use of the bitwise operations: AND, OR, XOR, NOT, and bit shifts.\\n\\nBit manipulation, in some cases, can obviate or reduce the need to loop over a data structure and can give many-fold speed ups, as bit manipulations are processed in parallel, but the code can become more difficult to write and maintain. \\n\\n### Details\\n\\n#### Basics\\nAt the heart of bit manipulation are the bit-wise operators & (and), | (or), ~ (not) and ^ (exclusive-or, xor) and shift operators a << b and a >> b. \\n\\n> There is no boolean operator counterpart to bitwise exclusive-or, but there is a simple explanation. The exclusive-or operation takes two inputs and returns a 1 if either one or the other of the inputs is a 1, but not if both are. That is, if both inputs are 1 or both inputs are 0, it returns 0. Bitwise exclusive-or, with the operator of a caret, ^, performs the exclusive-or operation on each pair of bits. Exclusive-or is commonly abbreviated XOR. \\n\\n- Set union A | B\\n- Set intersection A & B\\n- Set subtraction A & ~B\\n- Set negation ALL_BITS ^ A or ~A\\n- Set bit A |= 1 << bit\\n- Clear bit A &= ~(1 << bit)\\n- Test bit (A & 1 << bit) != 0\\n- Extract last bit A&-A or A&~(A-1) or x^(x&(x-1)) \\n- Remove last bit A&(A-1)\\n- Get all 1-bits ~0\\n\\n#### Examples\\nCount the number of ones in the binary representation of the given number\\n```\\nint count_one(int n) {\\n    while(n) {\\n        n = n&(n-1);\\n        count++;\\n    }\\n    return count;\\n}\\n```\\n\\nIs power of four (actually map-checking, iterative and recursive methods can do the same)\\n```\\nbool isPowerOfFour(int n) {\\n    return !(n&(n-1)) && (n&0x55555555);\\n    //check the 1-bit location;\\n}\\n```\\n\\n#### `^` tricks\\nUse `^` to remove even exactly same numbers and save the odd, or save the distinct bits and remove the same.\\n##### Sum of Two Integers\\nUse `^` and `&` to add two integers\\n```\\nint getSum(int a, int b) {\\n    return b==0? a:getSum(a^b, (a&b)<<1); //be careful about the terminating condition;\\n}\\n```\\n##### Missing Number\\nGiven an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.  For example, Given nums = [0, 1, 3] return 2. (Of course, you can do this by math.)\\n```\\nint missingNumber(vector<int>& nums) {\\n    int ret = 0;\\n    for(int i = 0; i < nums.size(); ++i) {\\n        ret ^= i;\\n        ret ^= nums[i];\\n    }\\n    return ret^=nums.size();\\n}\\n```\\n\\n#### `|` tricks\\nKeep as many 1-bits as possible \\n\\nFind the largest power of 2 (most significant bit in binary form), which is less than or equal to the given number N.\\n```\\nlong largest_power(long N) {\\n    //changing all right side bits to 1.\\n    N = N | (N>>1);\\n    N = N | (N>>2);\\n    N = N | (N>>4);\\n    N = N | (N>>8);\\n    N = N | (N>>16);\\n    return (N+1)>>1;\\n}\\n```\\n\\n##### Reverse Bits\\nReverse bits of a given 32 bits unsigned integer.\\n###### Solution\\n```\\nuint32_t reverseBits(uint32_t n) {\\n    unsigned int mask = 1<<31, res = 0;\\n    for(int i = 0; i < 32; ++i) {\\n        if(n & 1) res |= mask;\\n        mask >>= 1;\\n        n >>= 1;\\n    }\\n    return res;\\n}\\n```\\n```\\nuint32_t reverseBits(uint32_t n) {\\n\\tuint32_t mask = 1, ret = 0;\\n\\tfor(int i = 0; i < 32; ++i){\\n\\t\\tret <<= 1;\\n\\t\\tif(mask & n) ret |= 1;\\n\\t\\tmask <<= 1;\\n\\t}\\n\\treturn ret;\\n}\\n```\\n#### `&` tricks\\nJust selecting certain bits\\n\\nReversing the bits in integer\\n```\\nx = ((x & 0xaaaaaaaa) >> 1) | ((x & 0x55555555) << 1);\\nx = ((x & 0xcccccccc) >> 2) | ((x & 0x33333333) << 2);\\nx = ((x & 0xf0f0f0f0) >> 4) | ((x & 0x0f0f0f0f) << 4);\\nx = ((x & 0xff00ff00) >> 8) | ((x & 0x00ff00ff) << 8);\\nx = ((x & 0xffff0000) >> 16) | ((x & 0x0000ffff) << 16);\\n```\\n##### Bitwise AND of Numbers Range\\nGiven a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.  For example, given the range [5, 7], you should return 4.\\n###### Solution\\n```\\nint rangeBitwiseAnd(int m, int n) {\\n    int a = 0;\\n    while(m != n) {\\n        m >>= 1;\\n        n >>= 1;\\n        a++;\\n    }\\n    return m<<a; \\n}\\n```\\n##### Number of 1 Bits\\nWrite a function that takes an unsigned integer and returns the number of \\u20191' bits it has (also known as the Hamming weight).\\n###### Solution\\n```\\nint hammingWeight(uint32_t n) {\\n\\tint count = 0;\\n\\twhile(n) {\\n\\t\\tn = n&(n-1);\\n\\t\\tcount++;\\n\\t}\\n\\treturn count;\\n}\\n```\\n\\n```\\nint hammingWeight(uint32_t n) {\\n    ulong mask = 1;\\n    int count = 0;\\n    for(int i = 0; i < 32; ++i){ //31 will not do, delicate;\\n        if(mask & n) count++;\\n        mask <<= 1;\\n    }\\n    return count;\\n}\\n```\\n\\n#### Application\\n##### Repeated DNA Sequences\\nAll DNA is composed of a series of nucleotides abbreviated as A, C, G, and T, for example: \"ACGAATTCCG\". When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.  Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.  \\nFor example, \\nGiven s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\", \\nReturn: [\"AAAAACCCCC\", \"CCCCCAAAAA\"].\\n###### Solution\\n```\\nclass Solution {\\npublic:\\n    vector<string> findRepeatedDnaSequences(string s) {\\n        int sLen = s.length();\\n        vector<string> v;\\n        if(sLen < 11) return v;\\n        char keyMap[1<<21]{0};\\n        int hashKey = 0;\\n        for(int i = 0; i < 9; ++i) hashKey = (hashKey<<2) | (s[i]-'A'+1)%5;\\n        for(int i = 9; i < sLen; ++i) {\\n            if(keyMap[hashKey = ((hashKey<<2)|(s[i]-'A'+1)%5)&0xfffff]++ == 1)\\n                v.push_back(s.substr(i-9, 10));\\n        }\\n        return v;\\n    }\\n};\\n```\\n> But the above solution can be invalid when repeated sequence appears too many times, in which case we should use `unordered_map<int, int> keyMap` to replace `char keyMap[1<<21]{0}`here.\\n##### Majority Element\\nGiven an array of size n, find the majority element. The majority element is the element that appears more than \\u230a n/2 \\u230b times. (bit-counting as a usual way, but here we actually also can adopt sorting and Moore Voting Algorithm)\\n###### Solution\\n```\\nint majorityElement(vector<int>& nums) {\\n    int len = sizeof(int)*8, size = nums.size();\\n    int count = 0, mask = 1, ret = 0;\\n    for(int i = 0; i < len; ++i) {\\n        count = 0;\\n        for(int j = 0; j < size; ++j)\\n            if(mask & nums[j]) count++;\\n        if(count > size/2) ret |= mask;\\n        mask <<= 1;\\n    }\\n    return ret;\\n}\\n```\\n##### Single Number III\\nGiven an array of integers, every element appears three times except for one. Find that single one. (Still this type can be solved by bit-counting easily.) But we are going to solve it by `digital logic design`\\n###### Solution\\n```\\n//inspired by logical circuit design and boolean algebra;\\n//counter - unit of 3;\\n//current   incoming  next\\n//a b            c    a b\\n//0 0            0    0 0\\n//0 1            0    0 1\\n//1 0            0    1 0\\n//0 0            1    0 1\\n//0 1            1    1 0\\n//1 0            1    0 0\\n//a = a&~b&~c + ~a&b&c;\\n//b = ~a&b&~c + ~a&~b&c;\\n//return a|b since the single number can appear once or twice;\\nint singleNumber(vector<int>& nums) {\\n    int t = 0, a = 0, b = 0;\\n    for(int i = 0; i < nums.size(); ++i) {\\n        t = (a&~b&~nums[i]) | (~a&b&nums[i]);\\n        b = (~a&b&~nums[i]) | (~a&~b&nums[i]);\\n        a = t;\\n    }\\n    return a | b;\\n}\\n;\\n```\\n##### Maximum Product of Word Lengths\\nGiven a string array words, find the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. You may assume that each word will contain only lower case letters. If no such two words exist, return 0.\\n\\n> Example 1:\\nGiven [\"abcw\", \"baz\", \"foo\", \"bar\", \"xtfn\", \"abcdef\"]\\nReturn 16\\nThe two words can be \"abcw\", \"xtfn\".\\n\\n> Example 2:\\nGiven [\"a\", \"ab\", \"abc\", \"d\", \"cd\", \"bcd\", \"abcd\"]\\nReturn 4\\nThe two words can be \"ab\", \"cd\".\\n\\n> Example 3:\\nGiven [\"a\", \"aa\", \"aaa\", \"aaaa\"]\\nReturn 0\\nNo such pair of words.\\n\\n###### Solution\\nSince we are going to use the length of the word very frequently and we are to compare the letters of two words checking whether they have some letters in common:\\n- using an array of int to pre-store the length of each word reducing the frequently *measuring* process; \\n- since int has 4 bytes, a 32-bit type, and there are only 26 different letters, so we can just use one bit to indicate the existence of the letter in a word.\\n```\\nint maxProduct(vector<string>& words) {\\n    vector<int> mask(words.size());\\n    vector<int> lens(words.size());\\n    for(int i = 0; i < words.size(); ++i) lens[i] = words[i].length();\\n    int result = 0;\\n    for (int i=0; i<words.size(); ++i) {\\n        for (char c : words[i])\\n            mask[i] |= 1 << (c - 'a');\\n        for (int j=0; j<i; ++j)\\n            if (!(mask[i] & mask[j]))\\n                result = max(result, lens[i]*lens[j]);\\n    }\\n    return result;\\n}\\n```\\n\\n#### Attention\\n\\n- result after shifting left(or right) too much is undefined\\n- right shifting operations on negative values are undefined\\n- right operand in shifting should be non-negative, otherwise the result is undefined\\n- The & and | operators have lower precedence than comparison operators\\n\\n### Sets\\nAll the subsets\\nA big advantage of bit manipulation is that it is trivial to iterate over all the subsets of an N-element set: every N-bit value represents some subset. Even better, `if A is a subset of B then the number representing A is less than that representing B`, which is convenient for some dynamic programming solutions.\\n\\nIt is also possible to iterate over all the subsets of a particular subset (represented by a bit pattern), provided that you don\\u2019t mind visiting them in reverse order (if this is problematic, put them in a list as they\\u2019re generated, then walk the list backwards). The trick is similar to that for finding the lowest bit in a number. If we subtract 1 from a subset, then the lowest set element is cleared, and every lower element is set. However, we only want to set those lower elements that are in the superset. So the iteration step is just `i = (i - 1) & superset`.\\n\\n```\\nvector<vector<int>> subsets(vector<int>& nums) {\\n    vector<vector<int>> vv;\\n    int size = nums.size(); \\n    if(size == 0) return vv;\\n    int num = 1 << size;\\n    vv.resize(num);\\n    for(int i = 0; i < num; ++i) {\\n        for(int j = 0; j < size; ++j)\\n            if((1<<j) & i) vv[i].push_back(nums[j]);   \\n    }\\n    return vv;\\n}\\n```\\nActually there are two more methods to handle this using `recursion` and `iteration` respectively.\\n\\n### Bitset\\nA [bitset](http://www.cplusplus.com/reference/bitset/bitset/?kw=bitset) stores bits (elements with only two possible values: 0 or 1, true or false, ...).\\nThe class emulates an array of bool elements, but optimized for space allocation: generally, each element occupies only one bit (which, on most systems, is eight times less than the smallest elemental type: char).\\n```\\n// bitset::count\\n#include <iostream>       // std::cout\\n#include <string>         // std::string\\n#include <bitset>         // std::bitset\\n\\nint main () {\\n  std::bitset<8> foo (std::string(\"10110011\"));\\n  std::cout << foo << \" has \";\\n  std::cout << foo.count() << \" ones and \";\\n  std::cout << (foo.size()-foo.count()) << \" zeros.\\\\n\";\\n  return 0;\\n}\\n```\\n\\nAlways welcom new ideas and `practical` tricks, just leave them in the comments!"
		},
		{
			"lc_ans_id":"84290",
			"view":"46206",
			"top":"1",
			"title":"Java simple easy understand solution with explanation",
			"vote":"237",
			"content":"I have been confused about bit manipulation for a very long time. So I decide to do a summary about it here.\\n\\n\"&\" AND operation, for example, 2 (0010) & 7 (0111) => 2 (0010)\\n\\n\"^\" XOR operation, for example, 2 (0010) ^ 7 (0111) => 5 (0101)\\n\\n\"~\" NOT operation, for example, ~2(0010) => -3 (1101) what??? Don't get frustrated here. It's called two's complement.\\n\\n1111 is -1, in two's complement\\n\\n1110 is -2, which is ~2 + 1, ~0010 => 1101, 1101 + 1 = 1110 => 2 \\n\\n1101 is -3, which is ~3 + 1\\n\\nso if you want to get a negative number, you can simply do ~x + 1\\n\\nReference:\\n\\n[https://en.wikipedia.org/wiki/Two%27s_complement][1]\\n\\n[https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html][2]\\n\\nFor this, problem, for example, we have a = 1, b = 3,\\n\\nIn bit representation, a = 0001, b = 0011,\\n\\nFirst, we can use \"and\"(\"&\") operation between a and b to find a carry.\\n\\ncarry = a & b, then carry = 0001\\n\\nSecond, we can use \"xor\" (\"^\") operation between a and b to find the different bit, and assign it to a, \\n\\nThen, we shift carry one position left and assign it to b, b = 0010.\\n\\nIterate until there is no carry (or b == 0)\\n\\n    // Iterative\\n    public int getSum(int a, int b) {\\n\\t\\tif (a == 0) return b;\\n\\t\\tif (b == 0) return a;\\n\\n\\t\\twhile (b != 0) {\\n\\t\\t\\tint carry = a & b;\\n\\t\\t\\ta = a ^ b;\\n\\t\\t\\tb = carry << 1;\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn a;\\n    }\\n\\n    // Iterative\\n    public int getSubtract(int a, int b) {\\n\\t\\twhile (b != 0) {\\n\\t\\t\\tint borrow = (~a) & b;\\n\\t\\t\\ta = a ^ b;\\n\\t\\t\\tb = borrow << 1;\\n\\t\\t}\\n\\t\\t\\n\\t\\treturn a;\\n\\t}\\n\\n    // Recursive\\n\\tpublic int getSum(int a, int b) {\\n\\t\\treturn (b == 0) ? a : getSum(a ^ b, (a & b) << 1);\\n\\t}\\n\\n\\t// Recursive\\n\\tpublic int getSubtract(int a, int b) {\\n\\t\\treturn (b == 0) ? a : getSubtract(a ^ b, (~a & b) << 1);\\n\\t}\\n\\t\\n\\t// Get negative number\\n\\tpublic int negate(int x) {\\n\\t\\treturn ~x + 1;\\n\\t}\\n\\n\\n  [1]: https://en.wikipedia.org/wiki/Two%27s_complement\\n  [2]: https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html"
		},
		{
			"lc_ans_id":"84283",
			"view":"20614",
			"top":"2",
			"title":"0ms AC java solution",
			"vote":"76",
			"content":"test cases all pass\\n\\n0 ms\\n\\n       public int getSum(int a, int b) {\\n         if(b == 0){//\\u6ca1\\u6709\\u8fdb\\u4e3a\\u7684\\u65f6\\u5019\\u5b8c\\u6210\\u8fd0\\u7b97\\n            return a;\\n        }\\n        int sum,carry;\\n        sum = a^b;//\\u5b8c\\u6210\\u7b2c\\u4e00\\u6b65\\u52a0\\u53d1\\u7684\\u8fd0\\u7b97\\n        carry = (a&b)<<1;//\\u5b8c\\u6210\\u7b2c\\u4e8c\\u6b65\\u8fdb\\u4f4d\\u5e76\\u4e14\\u5de6\\u79fb\\u8fd0\\u7b97\\n        return getSum(sum,carry);//\\n        }"
		},
		{
			"lc_ans_id":"84305",
			"view":"16741",
			"top":"3",
			"title":"Share my C++ solutions,easy to understand",
			"vote":"52",
			"content":"    class Solution {\\n    public:\\n        int getSum(int a, int b) {\\n            int sum = a;\\n            \\n            while (b != 0)\\n            {\\n                sum = a ^ b;//calculate sum of a and b without thinking the carry \\n                b = (a & b) << 1;//calculate the carry\\n                a = sum;//add sum(without carry) and carry\\n            }\\n            \\n            return sum;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"84282",
			"view":"15386",
			"top":"4",
			"title":"Python solution with no \"+-*/%\", completely bit manipulation guaranteed",
			"vote":"51",
			"content":"```\\nclass Solution(object):\\n    def getSum(self, a, b):\\n        \"\"\"\\n        :type a: int\\n        :type b: int\\n        :rtype: int\\n        \"\"\"\\n        # 32 bits integer max\\n        MAX = 0x7FFFFFFF\\n        # 32 bits interger min\\n        MIN = 0x80000000\\n        # mask to get last 32 bits\\n        mask = 0xFFFFFFFF\\n        while b != 0:\\n            # ^ get different bits and & gets double 1s, << moves carry\\n            a, b = (a ^ b) & mask, ((a & b) << 1) & mask\\n        # if a is negative, get a's 32 bits complement positive first\\n        # then get 32-bit positive's Python complement negative\\n        return a if a <= MAX else ~(a ^ mask)\\n```"
		},
		{
			"lc_ans_id":"84277",
			"view":"4275",
			"top":"5",
			"title":"One liner with detailed explanation",
			"vote":"31",
			"content":"The chosen answer from this post: [adding-two-numbers-without-operator-clarification][1] helps me understand how it works, and recursion proves to be more intuitive to me than iterative.\\nBasically, with key points:\\n\\n1. exclusive or (***^***) handles these cases: 1+0 and 0+1 \\n2. AND (***&***) handles this case: 1+1, where ***carry*** occurs, in this case, we'll have to shift carry to the left, why? Think about this example: 001 + 101 = 110 (binary format), the least significant digits of the two operands are both '1', thus trigger a carry = 1, with this carry, their least significant digits: 1+1 = 0, thus we need to shift the carry to the left by 1 bit in order to get their correct sum: 2\\n\\nMy initial submission with inspiration from that post:\\n\\n    public int getSum(int a, int b) {\\n        if(b == 0) return a;\\n        int carry = (a & b) << 1;\\n        int sum = a ^ b;\\n        return getSum(sum, carry);\\n    }\\n\\nThen I found the above solution could be shortened to one-liner:\\n\\n    public int getSum(int a, int b) {\\n        return b == 0 ? a : getSum(a^b, (a&b)<<1);\\n    }\\n\\n\\n  [1]: http://stackoverflow.com/questions/9070937/adding-two-numbers-without-operator-clarification"
		},
		{
			"lc_ans_id":"84456",
			"view":"2249",
			"top":"6",
			"title":"One line JAVA code",
			"vote":"14",
			"content":"a^b is the sum of a and b bitwise without carrier, (a&b)<<1 is the carrier computation bitwise, when the carrier is equal to 0, the recursion terminate, the code is much like Euclidean gcd:\\n\\n    public int getSum(int a, int b) {\\n        return b == 0 ? a : getSum(a ^ b, (a & b) << 1);\\n    }"
		},
		{
			"lc_ans_id":"84435",
			"view":"2713",
			"top":"7",
			"title":"I don't think anyone will ask this question in an interview",
			"vote":"13",
			"content":"If anyone asks me this question in an interview, I won't be willing to work with him/her."
		},
		{
			"lc_ans_id":"84287",
			"view":"2918",
			"top":"8",
			"title":"My C++ code with proof",
			"vote":"11",
			"content":"I saw a lot of the solution just give code, while no proof is given or even discussed. So I tried to give my informal math proof of my algorithm (see proof below code) in order to show why this algorithm is correct:\\n>     int getSum(int a, int b) {\\n>         int ans = a ^ b;\\n>         int c = a & b;\\n>         while(c != 0) {\\n>             c <<= 1;\\n>             int ans_prim = ans ^ c;\\n>             c = ans & c;\\n>             ans = ans_prim;\\n>         }\\n>         return ans;\\n>      }\\n\\nHere, variable **c** is carry, and **ans** is return value. Denote ^ is xor operation.\\n\\n***Proof**: the loop invariant of the while loop above code is: if there is no carry in any ith bit of **a** + **b** exists, **a** ^ **b** must equal to **a** + **b**: let's consider a example: 2 in 2 base is 10, and 1 in 2 base is 01, there is no carry in any bit of (2 + 1), that's the time (2+1) = (2^1) exists. **Otherwise,** if we know **a** ^ **b** and carry for each bit of **a** + **b**, let's say **c**, then (**a** ^ **b**) + (**c**<<1) must equal to **a** + **b**; Here is an example: 3 in 2 base is 11, while 1 in 2 base is 01, obviously, carry is 01 corresponding to each bit, therefore, 3+1 = 3^1+(1<<1) holds (3^1 = 2, 1<<1 = 2).* \\n\\n*in the beginning,  \"c = a & b\" and \"c != 0\" used to check if there is any carry for **a** + **b** exists: **if not**, then we got result directly (case 2 + 1), **if there is any carry bit** (case 3+1), then \"c <<= 1\" used to shift and \"ans ^ c\" used to calculate new \"bit adding result\", after new adding result is calculate, we have two situation: if the result is final result, then new carry must be zero, otherwise not (according to loop invariant); so carry is updated for each bit \"c = ans & c\". After above step, the ans keeps the xor result of ans and carry **c**, carry **c** holds the result of new carry for each bit of (previous ans + previous c<<1), till carry is gone, then ans holds final result.*"
		},
		{
			"lc_ans_id":"84333",
			"view":"1847",
			"top":"9",
			"title":"Not really that \"Easy\"",
			"vote":"10",
			"content":"Implementing arithmetical operators using bitwise operations is a fine problem, but it is harder (and more specific) than reversing a string (another \"Easy\" problem).\\n\\nI think this problem deserves to be rated \"Medium\"."
		}
	],
	"id":"371",
	"title":"Sum of Two Integers",
	"content":"<p>Calculate the sum of two integers <i>a</i> and <i>b</i>, but you are <b>not allowed</b> to use the operator <code>+</code> and <code>-</code>.</p>\r\n\r\n<p><b>Example:</b><br />\r\nGiven <i>a</i> = 1 and <i>b</i> = 2, return 3.\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/fujiaozhu\">@fujiaozhu</a> for adding this problem and creating all test cases.</p>",
	"frequency":"611",
	"ac_num":"88606"
}