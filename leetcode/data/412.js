{
	"difficulty":"1",
	"submit_num":"173636",
	"show_id":"412",
	"leetcode_id":"412",
	"answers":[
		{
			"lc_ans_id":"89931",
			"view":"23109",
			"top":"0",
			"title":"Java 4ms solution , Not using \"%\" operation",
			"vote":"80",
			"content":"```\\npublic class Solution {\\n    public List<String> fizzBuzz(int n) {\\n        List<String> ret = new ArrayList<String>(n);\\n        for(int i=1,fizz=0,buzz=0;i<=n ;i++){\\n            fizz++;\\n            buzz++;\\n            if(fizz==3 && buzz==5){\\n                ret.add(\"FizzBuzz\");\\n                fizz=0;\\n                buzz=0;\\n            }else if(fizz==3){\\n                ret.add(\"Fizz\");\\n                fizz=0;\\n            }else if(buzz==5){\\n                ret.add(\"Buzz\");\\n                buzz=0;\\n            }else{\\n                ret.add(String.valueOf(i));\\n            }\\n        } \\n        return ret;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"89928",
			"view":"11506",
			"top":"1",
			"title":"Python Golf",
			"vote":"34",
			"content":"Using [my old CheckiO solution](https://py.checkio.org/mission/fizz-buzz/publications/StefanPochmann/python-27/shortest-52-kill-me-now/):\\n\\n    def fizzBuzz(self, n):\\n        return['FizzBuzz'[i%-3&-4:i%-5&8^12]or`i`for i in range(1,n+1)]\\n\\nMaybe I could shorten it to use `range(n)`, but as you can tell from my above link, that was exhausting enough :-)\\n\\nAnd a cleaner one I once saw somewhere:\\n\\n    def fizzBuzz(self, n):\\n        return ['Fizz' * (not i % 3) + 'Buzz' * (not i % 5) or str(i) for i in range(1, n+1)]"
		},
		{
			"lc_ans_id":"89941",
			"view":"12277",
			"top":"2",
			"title":"Java easy iterative solution",
			"vote":"17",
			"content":"```\\npublic class Solution {\\n    public List<String> fizzBuzz(int n) {\\n        List<String> list = new ArrayList<>();\\n        for (int i = 1; i <= n; i++) {\\n            if (i % 3 == 0 && i % 5 == 0) {\\n                list.add(\"FizzBuzz\");\\n            } else if (i % 3 == 0) {\\n                list.add(\"Fizz\");\\n            } else if (i % 5 == 0) {\\n                list.add(\"Buzz\");\\n            } else {\\n                list.add(String.valueOf(i));\\n            }\\n        }\\n        return list;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"90037",
			"view":"3180",
			"top":"3",
			"title":"One-line c# solution",
			"vote":"9",
			"content":"    public class Solution {\\n        public IList<string> FizzBuzz(int n) {\\n            return Enumerable.Range(1,n).Select(i => i % 15 == 0 ? \"FizzBuzz\" : i % 3 == 0 ? \"Fizz\" : i % 5 == 0 ? \"Buzz\" : i.ToString()).ToList();\\n        }   \\n    }"
		},
		{
			"lc_ans_id":"90002",
			"view":"9590",
			"top":"4",
			"title":"C++ solution, 3ms",
			"vote":"8",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<string> fizzBuzz(int n) {\\n        vector<string> ret_vec(n);\\n        for(int i=1; i<=n; ++i)\\n        {\\n            if(0 == i%3)\\n            {\\n                ret_vec[i-1] += \"Fizz\";\\n            }\\n            if(0 == i%5)\\n            {\\n                ret_vec[i-1] += \"Buzz\";\\n            }\\n            if(ret_vec[i-1].empty())\\n            {\\n                ret_vec[i-1] += to_string(i);\\n            }\\n        }\\n        return ret_vec;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"89936",
			"view":"1029",
			"top":"5",
			"title":"Java, Fuzz Buzz--Follow up(no if else, and extendable)",
			"vote":"7",
			"content":"Last week, I was asked a follow up questions about FizzBuzz: how do you optimize your code to make it more concise and extendable. \\n// I give out the first version code as follows:\\n   \\n\\n    //easy for gc\\n    private String FIZZ = \"Fizz\";\\n    private String BUZZ = \"Buzz\";\\n    private String FIZZ_BUZZ = \"FizzBuzz\";\\n    \\n    public List<String> fizzBuzz(int n) {\\n        List<String> res = new ArrayList();\\n        for(int i = 1; i <= n; i++){\\n            //remove if else, make code shorter\\n            String temp = i % 15 == 0 ? FIZZ_BUZZ : (i % 3 == 0 ? FIZZ : (i % 5 == 0 ?  BUZZ : String.valueOf(i)));\\n            res.add(temp);\\n        }\\n        return res;\\n    }\\n\\nHowever, If there are more conditions, for example if i % 7 == 0 print xxx,  it seems our method is not convenient for extension, then I come up with using composite design pattern. The first thing I need is to design a action interface:\\n\\n~~~\\ninterface Rule{\\n     boolean apply(int i);\\n}\\n~~~\\nThe multiple conditions are actually all kinds of rules. we use the following code to abstract our rule. \\n\\n~~~\\n    private Map<Rule, String> ruleContainers = new HashMap();\\n    private Set<Rule> rules  = new HashSet();\\n\\n    public RuleContainer() {\\n        addRule(i -> i % 15 == 0, \"FizzBuzz\");\\n        addRule(i -> i % 3 == 0, \"Fizz\");\\n        addRule(i -> i % 5 == 0, \"Buzz\");\\n    }\\n\\n    public void addRule(Rule rule, String res) {\\n        rules.add(rule);\\n        ruleContainers.put(rule, res);\\n    }\\n\\n    public String getValue(int i) {\\n        for (Rule rule : rules) {\\n            if (rule.apply(i)) {\\n                return ruleContainers.get(rule);\\n            }\\n        }\\n        return String.valueOf(i);\\n    }\\n\\n  //then the origin code should be as follows:\\n   public List<String> fizzBuzz(int n) {\\n        List<String> res = new ArrayList();\\n        for(int i = 1; i <= n; i++){\\n            res.add(getValue(i));\\n        }\\n        return res;\\n    }\\n~~~"
		},
		{
			"lc_ans_id":"90007",
			"view":"2938",
			"top":"6",
			"title":"Python 1 line solution",
			"vote":"6",
			"content":"```\\nreturn [str(i) if (i%3!=0 and i%5!=0) else (('Fizz'*(i%3==0)) + ('Buzz'*(i%5==0))) for i in range(1,n+1)]\\n```"
		},
		{
			"lc_ans_id":"89973",
			"view":"1129",
			"top":"7",
			"title":"Javascript 89 ms solution",
			"vote":"5",
			"content":"```\\nvar fizzBuzz = function(n) {\\n    var result = [],\\n        str, i=1;\\n    while( i <= n ){\\n        str = \"\";\\n        if( i%3===0 ) str = 'Fizz';\\n        if( i%5===0 ) str += 'Buzz';\\n        if(!str) str += i;\\n        result.push( str );\\n        i++;\\n    }\\n    return result;\\n};\\n```"
		},
		{
			"lc_ans_id":"89950",
			"view":"1682",
			"top":"8",
			"title":"3ms c solution simple to understand",
			"vote":"4",
			"content":"```\\n/**\\n * Return an array of size *returnSize.\\n * Note: The returned array must be malloced, assume caller calls free().\\n */\\n\\nchar** fizzBuzz(int n, int* returnSize) {\\n    *returnSize = n;\\n    char buf[11];\\n    char** re_p = (char**)malloc(sizeof(char*)*n);\\n    int i = 0;\\n    for(i=0;i<n;i++)\\n    {\\n        if(((i+1)%3==0)&&((i+1)%5==0))\\n        {\\n            sprintf(buf,\"%s\",\"FizzBuzz\");\\n        }else if((i+1)%3==0){\\n            sprintf(buf,\"%s\",\"Fizz\");\\n        }else if((i+1)%5==0){\\n            sprintf(buf,\"%s\",\"Buzz\");\\n        }else{\\n            sprintf(buf,\"%d\",i+1);\\n        }\\n        re_p[i]=malloc(sizeof(buf));\\n        memcpy(re_p[i],buf,strlen(buf)+1);\\n        memset(buf,\"\",11);\\n    }\\n\\n    return re_p;\\n}\\n```"
		},
		{
			"lc_ans_id":"89999",
			"view":"2284",
			"top":"9",
			"title":"Java Solution with 3 if conditions",
			"vote":"4",
			"content":"````\\npublic List<String> fizzBuzz(int n) {\\n        \\n        List<String> ls = new ArrayList<String>();\\n        StringBuffer sb = new StringBuffer();\\n        for(int i=1;i<=n;i++){\\n            sb.setLength(0);\\n            if(i%3==0){\\n                sb.append(\"Fizz\");\\n            }\\n            if(i%5==0){\\n                sb.append(\"Buzz\");\\n            }\\n            if(sb.length()==0){\\n                sb.append(String.valueOf(i));\\n            }\\n            ls.add(sb.toString());\\n        }\\n        return ls;\\n    }\\n````"
		}
	],
	"id":"412",
	"title":"Fizz Buzz",
	"content":"<p>Write a program that outputs the string representation of numbers from 1 to <i>n</i>.</p>\n\n<p>But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.</p>\n\n<p><b>Example:</b>\n<pre>\nn = 15,\n\nReturn:\n[\n    \"1\",\n    \"2\",\n    \"Fizz\",\n    \"4\",\n    \"Buzz\",\n    \"Fizz\",\n    \"7\",\n    \"8\",\n    \"Fizz\",\n    \"Buzz\",\n    \"11\",\n    \"Fizz\",\n    \"13\",\n    \"14\",\n    \"FizzBuzz\"\n]\n</pre>\n</p>",
	"frequency":"578",
	"ac_num":"101202"
}