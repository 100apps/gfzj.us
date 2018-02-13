{
	"difficulty":"2",
	"submit_num":"376812",
	"show_id":"179",
	"leetcode_id":"179",
	"answers":[
		{
			"lc_ans_id":"53158",
			"view":"29430",
			"top":"0",
			"title":"My Java Solution to share",
			"vote":"143",
			"content":"The idea here is basically implement a String comparator to decide which String  should come first during concatenation. Because when you have 2 numbers (let's convert them into String), you'll face only 2 cases:\\nFor example:\\n```\\nString s1 = \"9\";\\nString s2 = \"31\";\\n\\nString case1 =  s1 + s2; // 931\\nString case2 = s2 + s1; // 319\\n\\n```\\nApparently, case1 is greater than case2 in terms of value.\\nSo, we should always put s1 in front of s2.\\n\\nI have received many good suggestions from you in this discussion. Below is the modified version of codes based on your suggestions:\\n\\n```\\npublic class Solution {\\n     public String largestNumber(int[] num) {\\n\\t\\tif(num == null || num.length == 0)\\n\\t\\t    return \"\";\\n\\t\\t\\n\\t\\t// Convert int array to String array, so we can sort later on\\n\\t\\tString[] s_num = new String[num.length];\\n\\t\\tfor(int i = 0; i < num.length; i++)\\n\\t\\t    s_num[i] = String.valueOf(num[i]);\\n\\t\\t\\t\\n\\t\\t// Comparator to decide which string should come first in concatenation\\n\\t\\tComparator<String> comp = new Comparator<String>(){\\n\\t\\t    @Override\\n\\t\\t    public int compare(String str1, String str2){\\n\\t\\t        String s1 = str1 + str2;\\n\\t\\t\\tString s2 = str2 + str1;\\n\\t\\t\\treturn s2.compareTo(s1); // reverse order here, so we can do append() later\\n\\t\\t    }\\n\\t        };\\n\\t\\t\\n\\t\\tArrays.sort(s_num, comp);\\n                // An extreme edge case by lc, say you have only a bunch of 0 in your int array\\n                if(s_num[0].charAt(0) == '0')\\n                    return \"0\";\\n            \\n\\t\\tStringBuilder sb = new StringBuilder();\\n\\t\\tfor(String s: s_num)\\n\\t            sb.append(s);\\n\\t\\t\\n\\t\\treturn sb.toString();\\n\\t\\t\\n\\t}\\n}\\n```\\n\\nIn terms of Time and Space Complexity:\\nLet's assume:\\nthe length of input array is n,\\naverage length of Strings in s_num is k,\\nThen, compare 2 strings will take O(k).\\nSorting will take O(nlgn)\\nAppending to StringBuilder takes O(n).\\nSo total will be O(n*k*lgnk) + O(n) = O(n*k*lgnk).\\n\\nSpace is pretty straight forward: O(n)."
		},
		{
			"lc_ans_id":"53157",
			"view":"14353",
			"top":"1",
			"title":"A simple C++ solution",
			"vote":"94",
			"content":"    class Solution {\\n    public:\\n        string largestNumber(vector<int> &num) {\\n            vector<string> arr;\\n            for(auto i:num)\\n                arr.push_back(to_string(i));\\n            sort(begin(arr), end(arr), [](string &s1, string &s2){ return s1+s2>s2+s1; });\\n            string res;\\n            for(auto s:arr)\\n                res+=s;\\n            while(res[0]=='0' && res.length()>1)\\n                res.erase(0,1);\\n            return  res;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"53162",
			"view":"14470",
			"top":"2",
			"title":"My 3-lines code in Java and Python",
			"vote":"61",
			"content":"The logic is pretty straightforward. Just compare number by convert it to string.\\n\\nThanks for Java 8, it makes code beautiful.\\n\\nJava:\\n\\n    public class Solution {\\n        public String largestNumber(int[] num) {\\n            String[] array = Arrays.stream(num).mapToObj(String::valueOf).toArray(String[]::new);\\n            Arrays.sort(array, (String s1, String s2) -> (s2 + s1).compareTo(s1 + s2));\\n            return Arrays.stream(array).reduce((x, y) -> x.equals(\"0\") ? y : x + y).get();\\n        }\\n    }\\n\\nPython:\\n\\n    class Solution:\\n        # @param num, a list of integers\\n        # @return a string\\n        def largestNumber(self, num):\\n            num = [str(x) for x in num]\\n            num.sort(cmp=lambda x, y: cmp(y+x, x+y))\\n            return ''.join(num).lstrip('0') or '0'"
		},
		{
			"lc_ans_id":"53160",
			"view":"5051",
			"top":"3",
			"title":"Share a short code in c++",
			"vote":"41",
			"content":"    class Solution {\\n    public:\\n        string largestNumber(vector<int> &num) {\\n            sort(num.begin(), num.end(), [](int a, int b){\\n                return to_string(a)+to_string(b) > to_string(b)+to_string(a);\\n            });\\n            string ans;\\n            for(int i=0; i<num.size(); i++){\\n                ans += to_string(num[i]);\\n            }\\n            return ans[0]=='0' ? \"0\" : ans;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"53159",
			"view":"8938",
			"top":"4",
			"title":"Share my fast JAVA solution, beat 98.64%!",
			"vote":"35",
			"content":"    public class Solution {\\n        public String largestNumber(int[] nums) {\\n            if (nums == null || nums.length == 0) return \"\";\\n            String[] strs = new String[nums.length];\\n            for (int i = 0; i < nums.length; i++) {\\n                strs[i] = nums[i]+\"\";\\n            }\\n            Arrays.sort(strs, new Comparator<String>() {\\n                @Override\\n                public int compare(String i, String j) {\\n                    String s1 = i+j;\\n                    String s2 = j+i;\\n                    return s1.compareTo(s2);\\n                }\\n            });\\n            if (strs[strs.length-1].charAt(0) == '0') return \"0\";\\n            String res = new String();\\n            for (int i = 0; i < strs.length; i++) {\\n                res = strs[i]+res;\\n            }\\n            return res;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"53270",
			"view":"3892",
			"top":"5",
			"title":"Python simple solution in 4 lines",
			"vote":"31",
			"content":"It's all about comparison . We define a func that compares two strings a ,b. we consider a bigger than b if a+b > b+a . then we sort the numbers and concatenate them .\\n\\n\\n    class Solution:\\n    # @param num, a list of integers\\n    # @return a string\\n    def largestNumber(self, num):\\n        comp=lambda a,b:1 if a+b>b+a else -1 if a+b<b+a else 0\\n        num=map(str,num)\\n        num.sort(cmp=comp,reverse=True)\\n        return str(int(\"\".join(num)))\\n\\n\\n**UPDATE**\\n\\nMore explanation \\n\\n1-we define a function that compares two string (a,b) . we consider a bigger than b if a+b>b+a\\nfor example : (a=\"2\",b=\"11\") a is bigger than b because \"211\" >\"112\"\\n\\n2-convert all elements of the list from int to string\\n\\n3-sort the list descendingly using the comparing function we defined\\nfor example sorting this list [\"2\",\"11\",\"13\"] using the function defined in step 1 would produce [\"2\",\"13\",\"11\"]\\n\\n4-we concatatenate the list \"21311\""
		},
		{
			"lc_ans_id":"53331",
			"view":"3529",
			"top":"6",
			"title":"Simple 10-line C++ Solution",
			"vote":"27",
			"content":" \\n\\n     class Solution {\\n        public:\\n            string largestNumber(vector<int>& nums) {\\n                string ret;\\n                sort(nums.begin(),nums.end(),\\n                    [](const int &m,const int&n){\\n                        return to_string(m)+to_string(n)>to_string(n)+to_string(m);});\\n                for(int i=0;i<nums.size();++i){\\n                    ret+=to_string(nums[i]);\\n                }\\n                if(ret[0]=='0') //for the case nums are all zeros\\n                    return \"0\";\\n                return ret;\\n            }  \\n        };"
		},
		{
			"lc_ans_id":"53195",
			"view":"1977",
			"top":"7",
			"title":"Mathematical proof of correctness of sorting method",
			"vote":"25",
			"content":"    string largestNumber(vector<int>& nums) {\\n            vector<string> vs;\\n            string s=\"\";\\n            for(int &num:nums)  vs.push_back(to_string(num));\\n            sort(vs.begin(),vs.end(),[](string a,string b){return a+b>b+a;});\\n            if(vs[0][0]=='0') return \"0\"; //deal with all \"0\" value\\n            for(string & ss:vs)  s+=ss;\\n            return s;\\n        }\\n\\n\\nWhy does this solution work?\\n\\nFirst, we need to show the comparator works, or the array is sortable. Meaning if A comes before B and B comes before C, then A must comes before C.\\n\\nNext, we must prove after sorting, by concatenating the array,we get the largest number.\\n\\nThe first proof is by @19thhell.\\n\\nLet A, B, C be the integer given. To concatenate A and B into AB, we need to know how many digits are there in B, then multiply power of 10 with A, add B to the result. Example: 12312 = 123 * 100 + 12. The number of digits in B is lgB + 1, therefore we need to multiply A with 10^(lgB + 1), then add the result with B to get AB. Now we can start our proof.\\n\\n    Proof:\\n    \\n        Let us define f(X) = 10^(lgX + 1), then XY = f(Y)X + Y\\n    \\n        If AB <= BA, then we have\\n        f(B)A + B <= f(A)B + A\\n        (f(B) - 1)A <= (f(A) - 1)B\\n        that is\\n        A <= B\\xb7(f(A) - 1) / (f(B) - 1)   (1)\\n    \\n        If BC <= CB, then we have\\n        f(C)B + C <= f(B)C + B\\n        (f(C) - 1)B <= (f(B) - 1)C\\n        that is\\n        B <= C\\xb7(f(B) - 1) / (f(C) - 1)   (2)\\n    \\n        Combine (1), (2), we have\\n        A <= C\\xb7(f(A) - 1) / (f(C) - 1)\\n        (f(C) - 1)A <= (f(A) - 1)C\\n        f(C)A + C <= f(A)C + A\\n        AC <= CA\\n\\nThe second proof:\\n\\nFirst, some properties. (IF THE IMAGE BELOW IS NOT SHOWN PROPERLY, OPEN IT IN ANOTHER WINDOW OR DOWNLOAD IT) \\n![enter image description here][1]\\n\\n\\n![enter image description here][2]\\n\\n\\n  [1]: https://i.imgsafe.org/8de935e.png\\n  [2]: https://i.imgsafe.org/90816ce.png"
		},
		{
			"lc_ans_id":"53347",
			"view":"2838",
			"top":"8",
			"title":"Simple solution with java (O(NlogN) and no need for  BigInteger)",
			"vote":"20",
			"content":"    class StringComparator implements Comparator<String> {\\n        public int compare(String a, String b) {\\n            if (a.length() == b.length()) {\\n                return b.compareTo(a);\\n            } else {\\n                String ab = a + b;\\n                String ba = b + a;\\n                return ba.compareTo(ab);\\n            }\\n        }\\n    }\\n    \\n    public class Solution {\\n        public String largestNumber(int[] num) {\\n            StringBuffer sbuf = new StringBuffer();\\n            ArrayList<String> numstrings = new ArrayList<String>(num.length);\\n            \\n            for (int i : num) numstrings.add(String.valueOf(i));\\n            Collections.sort(numstrings,  new StringComparator());\\n            \\n            for (String s : numstrings) sbuf.append(s);\\n            \\n            String res = sbuf.toString();\\n            if (res.length() > 0 && res.charAt(0) == '0') return \"0\";\\n            \\n            return res;\\n        }\\n    }\\n\\n\\nJust write a `Comparator`  to sort the list with `Collections.sort`."
		},
		{
			"lc_ans_id":"53184",
			"view":"1983",
			"top":"9",
			"title":"C++ solution. Simple compare function.",
			"vote":"18",
			"content":"    class Solution { \\n    public:\\n    string largestNumber(vector<int> &num) {\\n        string result;\\n        vector<string> str;\\n        for (auto n : num) {\\n            str.push_back(to_string(n));\\n        }\\n        sort(str.begin(), str.end(), compareNum);\\n        for (auto s: str) {\\n            result += s;\\n        }\\n        \\n        int pos = 0;\\n        while (result[pos] == '0' && pos + 1 < result.size()) pos++; \\n        return result.substr(pos);\\n    } \\n    private:\\n    static bool compareNum(string a, string b) {\\n        return a + b > b + a;\\n    }\\n    };"
		}
	],
	"id":"179",
	"title":"Largest Number",
	"content":"<p>Given a list of non negative integers, arrange them such that they form the largest number.</p>\r\n\r\n<p>For example, given <code>[3, 30, 34, 5, 9]</code>, the largest formed number is <code>9534330</code>.</p>\r\n\r\n<p>Note: The result may be very large, so you need to return a string instead of an integer.</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/ts\">@ts</a> for adding this problem and creating all test cases.</p>",
	"frequency":"508",
	"ac_num":"87509"
}