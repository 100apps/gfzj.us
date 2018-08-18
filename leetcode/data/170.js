{
	"difficulty":"1",
	"submit_num":"132998",
	"show_id":"170",
	"leetcode_id":"170",
	"answers":[
		{
			"lc_ans_id":"52005",
			"view":"13604",
			"top":"0",
			"title":"Trade off in this problem should be considered",
			"vote":"94",
			"content":"The big data test only have the condition that lots of add and few find. In fact, there has to be one operation's time complexity is O(n) and the other is O(1), no matter add or find. So clearly there's trade off when solve this problem, prefer quick find or quick add.   \\n\\nIf consider more find and less add or we only care time complexity in finding.For example, add operation can be pre-done.\\n \\n\\n    public class TwoSum {\\n            Set<Integer> sum;\\n            Set<Integer> num;\\n            \\n            TwoSum(){\\n                sum = new HashSet<Integer>();\\n                num = new HashSet<Integer>();\\n            }\\n            // Add the number to an internal data structure.\\n        \\tpublic void add(int number) {\\n        \\t    if(num.contains(number)){\\n        \\t        sum.add(number * 2);\\n        \\t    }else{\\n        \\t        Iterator<Integer> iter = num.iterator();\\n        \\t        while(iter.hasNext()){\\n        \\t            sum.add(iter.next() + number);\\n        \\t        }\\n        \\t        num.add(number);\\n        \\t    }\\n        \\t}\\n        \\n            // Find if there exists any pair of numbers which sum is equal to the value.\\n        \\tpublic boolean find(int value) {\\n        \\t    return sum.contains(value);\\n        \\t}\\n        }\\n\\nOn the other side\\n\\n    public class TwoSum {\\n        Map<Integer,Integer> hm;\\n        \\n        TwoSum(){\\n            hm = new HashMap<Integer,Integer>();\\n        }\\n        // Add the number to an internal data structure.\\n    \\tpublic void add(int number) {\\n    \\t    if(hm.containsKey(number)){\\n    \\t        hm.put(number,2);\\n    \\t    }else{\\n    \\t        hm.put(number,1);\\n    \\t    }\\n    \\t}\\n    \\n        // Find if there exists any pair of numbers which sum is equal to the value.\\n    \\tpublic boolean find(int value) {\\n    \\t    Iterator<Integer> iter = hm.keySet().iterator();\\n    \\t    while(iter.hasNext()){\\n    \\t        int num1 = iter.next();\\n    \\t        int num2 = value - num1;\\n    \\t        if(hm.containsKey(num2)){\\n    \\t            if(num1 != num2 || hm.get(num2) == 2){\\n    \\t                return true;\\n    \\t            }\\n    \\t        }\\n    \\t    }\\n    \\t    return false;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"52035",
			"view":"16029",
			"top":"1",
			"title":"My solutions in Java, C++, and Python. O(1) time for add, O(n) time for find, O(n) space",
			"vote":"39",
			"content":"I use HashMap to store times of number be added.\\n\\nWhen find be called, we iterate the keys of HashMap, then find another number minus by value.\\nThen combine the detections together.\\n\\nJava:\\n\\n    public class TwoSum {\\n        private HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();\\n    \\n        public void add(int number) {\\n            map.put(number, map.containsKey(number) ? map.get(number) + 1 : 1);\\n        }\\n    \\n        public boolean find(int value) {\\n            for (Map.Entry<Integer, Integer> entry : map.entrySet()) {\\n                int i = entry.getKey();\\n                int j = value - i;\\n                if ((i == j && entry.getValue() > 1) || (i != j && map.containsKey(j))) {\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n    }\\n\\nC++:\\n\\n    class TwoSum {\\n        unordered_map<int,int> map;\\n    public:\\n        void add(int number) {\\n            map[number]++;\\n        }\\n    \\n        bool find(int value) {\\n            for (unordered_map<int,int>::iterator it = map.begin(); it != map.end(); it++) {\\n                int i = it->first;\\n                int j = value - i;\\n                if ((i == j && it->second > 1) || (i != j && map.find(j) != map.end())) {\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n    };\\n\\nPython:\\n\\n    class TwoSum:\\n    \\n        # initialize your data structure here\\n        def __init__(self):\\n            self.table = dict()\\n    \\n        # @return nothing\\n        def add(self, number):\\n            self.table[number] = self.table.get(number, 0) + 1;\\n    \\n        # @param value, an integer\\n        # @return a Boolean\\n        def find(self, value):\\n            for i in self.table.keys():\\n                j = value - i\\n                if i == j and self.table.get(i) > 1 or i != j and self.table.get(j, 0) > 0:\\n                    return True\\n            return False"
		},
		{
			"lc_ans_id":"52015",
			"view":"9636",
			"top":"2",
			"title":"Beats 100% Java Code",
			"vote":"27",
			"content":"Achieved by only maintaining a list with distinct elements.\\n\\n    public class TwoSum {\\n        private List<Integer> list = new ArrayList<Integer>();\\n        private Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n    \\n        // Add the number to an internal data structure.\\n    \\tpublic void add(int number) {\\n    \\t    if (map.containsKey(number)) map.put(number, map.get(number) + 1);\\n    \\t    else {\\n    \\t        map.put(number, 1);\\n    \\t        list.add(number);\\n    \\t    }\\n    \\t}\\n    \\n        // Find if there exists any pair of numbers which sum is equal to the value.\\n    \\tpublic boolean find(int value) {\\n    \\t    for (int i = 0; i < list.size(); i++){\\n    \\t        int num1 = list.get(i), num2 = value - num1;\\n    \\t        if ((num1 == num2 && map.get(num1) > 1) || (num1 != num2 && map.containsKey(num2))) return true;\\n    \\t    }\\n    \\t    return false;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"52029",
			"view":"2840",
			"top":"3",
			"title":"Fast and concise C++ multiset solution",
			"vote":"17",
			"content":"    class TwoSum {\\n        unordered_multiset<int> nums;\\n    public:\\n        void add(int number) {\\n            nums.insert(number);\\n        }\\n        bool find(int value) {\\n            for (int i : nums) {\\n                int count = i == value - i ? 1 : 0;\\n                if (nums.count(value - i) > count) {\\n                    return true;\\n                }\\n            }\\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"52034",
			"view":"2945",
			"top":"4",
			"title":"Fast and simple AC Python",
			"vote":"8",
			"content":"Just submitted this five times, got accepted in 560, 564, 580, 580 and 560 ms. Much faster than all other recent accepted Python submissions, which range from 704 to 836 ms (and apparently the time limit is shortly after that).\\n\\n    class TwoSum:\\n    \\n        def __init__(self):\\n            self.ctr = {}\\n    \\n        def add(self, number):\\n            if number in self.ctr:\\n                self.ctr[number] += 1\\n            else:\\n                self.ctr[number] = 1\\n    \\n        def find(self, value):\\n            ctr = self.ctr\\n            for num in ctr:\\n                if value - num in ctr and (value - num != num or ctr[num] > 1):\\n                    return True\\n            return False\\n\\n---\\n\\n**My previous, nicer solution and some thoughts**\\n\\nI submitted this five times and got it accepted in 760, 736, 708, 712 and 732 ms:\\n\\n    class TwoSum:\\n    \\n        def __init__(self):\\n            self.ctr = collections.defaultdict(int)\\n    \\n        def add(self, number):\\n            self.ctr[number] += 1\\n    \\n        def find(self, value):\\n            ctr = self.ctr\\n            return any(value - num in ctr and (value - num != num or ctr[num] > 1)\\n                       for num in ctr)\\n\\nThe following comments refer to this previous solution, but are still relevant:\\n\\n- As I wrote previously, [test order matters](https://leetcode.com/discuss/50800/short-and-fast-c). For example, switching the order to  \\n`(value - num != num or ctr[num] > 1) and value - num in ctr`  \\nmakes me get TLE consistently.\\n- `collections.Counter` would be a more obvious choice, but `collections.defaultdict` is faster. Using `Counter`, I consistently get TLE.\\n- I don't shortcut `ctr = self.ctr` just to make the rest prettier but also to make it faster. Looks like that saves ~70 ms on average.\\n\\nYou can see in my new even faster solution I did a few more changes, which all helped.\\n\\nI also recommend [Guido van Rossum's essay about optimization](https://www.python.org/doc/essays/list2str/), which includes the local variable optimization. Even Guido himself got surprised at one point :-)"
		},
		{
			"lc_ans_id":"52056",
			"view":"2606",
			"top":"5",
			"title":"Short and fast C++",
			"vote":"8",
			"content":"    class TwoSum {\\n      unordered_map<int, int> ctr;\\n    public:\\n      void add(int number) {\\n        ctr[number]++;\\n      }\\n    \\n      bool find(int value) {\\n        for (auto nc : ctr)\\n          if (ctr.count(value - nc.first) && (nc.first != value - nc.first || nc.second > 1))\\n            return true;\\n        return false;\\n      }\\n    };\\n\\nI submitted it several times and most of the time it was faster than all other C++ submissions on the submission detail page. My best was 1292 ms, and the record on the detail page was 1360 ms, achieved by one out of 30 submissions.\\n\\nUsing `count` instead of `find != end` is not only shorter and neater but also significantly faster, and I think the order of the tests also matters a bit. I go through the number/count pairs and *first* check whether we also have the complementary number. Check whether it's really valid only afterwards. I have to look up the complement anyway, and it almost always fails, so I almost never have to do the rest of the test. The only two times the complement test can succeed are:\\n\\n- The rest of the test also succeeds. In this case, we actually have a solution and immediately return.\\n- The rest of the test fails. This can only happen once: when the current number is half the target number.\\n\\n**Update:** `any_of` is kinda neat, but slightly slower:\\n\\n    bool find(int value) {\\n      return any_of(ctr.begin(), ctr.end(), [&](pair<int, int> nc){\\n        return ctr.count(value - nc.first) && (nc.first != value - nc.first || nc.second > 1);\\n      });\\n    }"
		},
		{
			"lc_ans_id":"52069",
			"view":"2383",
			"top":"6",
			"title":"My Beats 99.49% Java Submission",
			"vote":"6",
			"content":"    public class TwoSum {\\n    List<Integer> list = new ArrayList<Integer>();\\n    Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n    \\n    // Add the number to an internal data structure.\\n\\tpublic void add(int number) {\\n\\t    list.add(number);\\n\\t    if (map.containsKey(number)) \\n\\t        map.put(number, map.get(number)+1);\\n\\t    else \\n\\t        map.put(number, 1);\\n\\t}\\n\\n    // Find if there exists any pair of numbers which sum is equal to the value.\\n\\tpublic boolean find(int value) {\\n\\t    for (int i = 0; i < list.size(); i++) {\\n\\t        int num1 = list.get(i);\\n\\t        int num2 = value - num1;\\n\\t        if ((num1 == num2 && map.get(num1) > 1) || (num1 != num2 && map.containsKey(num2)))\\n\\t            return true;\\n\\t    }\\n\\t    return false;\\n\\t}\\n}"
		},
		{
			"lc_ans_id":"52075",
			"view":"626",
			"top":"7",
			"title":"Simple idea to speed up the look-up using c++",
			"vote":"5",
			"content":"The idea is very simple, but very effective in speeding up the code to `beat' more than 99% of the submissions.  By adding the condition elem.first < value - elem.first, it avoids checking whether a pair of values twice compared with the condition elem.first != value - elem.first.\\nFor example, if target = 3, and we have added 1 and 3 in the hash table. Then we don't need to check 3, because if 3 can be a candidate for the pair summing up to 3, then we should be able to check 0 instead. \\nThis can save roughly half of the time when no pairs exist for the target.\\n\\n\\n    class TwoSum {\\n    public:\\n    \\tvoid add(int number) {\\n    \\t    elemCount[number]++;\\n    \\t}\\n    \\n    \\tbool find(int value) {\\n    \\t    for (auto elem : elemCount) {\\n    \\t        if ( (elem.first< value-elem.first && elemCount.count(value - elem.first))||\\n    \\t        (elem.first == value - elem.first && elem.second > 1)) {\\n    \\t            return true;\\n    \\t        }\\n    \\t    }\\n    \\t    return false;\\n    \\t}\\n    private:\\n        unordered_map<int, int> elemCount;\\n    };"
		},
		{
			"lc_ans_id":"52052",
			"view":"1470",
			"top":"8",
			"title":"Share my \"beats 93.97% runtime submissions\" Java solution",
			"vote":"5",
			"content":"    public class TwoSum {\\n        List<Integer> list = new ArrayList<Integer>();\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n    \\tpublic void add(int number) {\\n    \\t    list.add(number);\\n    \\t    if(!map.containsKey(number)) map.put(number, 1);\\n    \\t    else map.put(number, map.get(number) + 1);\\n    \\t}\\n    \\n    \\tpublic boolean find(int value) {\\n    \\t    if(list.size() > 1){\\n    \\t        boolean ret = false;\\n    \\t        for(Integer cur : list){\\n    \\t            map.put(cur, map.get(cur) - 1);\\n    \\t            if(map.containsKey(value - cur) && map.get(value - cur) > 0) ret = true;\\n    \\t            map.put(cur, map.get(cur) + 1);\\n    \\t            if(ret) return true;\\n    \\t        }\\n    \\t    }\\n    \\t    return false;\\n    \\t}\\n    }"
		},
		{
			"lc_ans_id":"52081",
			"view":"1320",
			"top":"9",
			"title":"Solution from Handbook returns TLE",
			"vote":"5",
			"content":"I copied and pasted solution directly from Handbook, but it returns TLE for the long input test case. The test case is too long to paste here. Please fix it."
		}
	],
	"id":"170",
	"title":"Two Sum III - Data structure design",
	"content":"<p>Design and implement a TwoSum class. It should support the following operations: <code>add</code> and <code>find</code>.</p>\r\n\r\n<p>\r\n<code>add</code> - Add the number to an internal data structure.<br />\r\n<code>find</code> - Find if there exists any pair of numbers which sum is equal to the value.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\n<pre>\r\nadd(1); add(3); add(5);\r\nfind(4) -> true\r\nfind(7) -> false\r\n</pre>\r\n</p>",
	"frequency":"238",
	"ac_num":"34551"
}