{
	"difficulty":"2",
	"submit_num":"38315",
	"show_id":"379",
	"leetcode_id":"379",
	"answers":[
		{
			"lc_ans_id":"85328",
			"view":"13299",
			"top":"0",
			"title":"Java AC solution using queue and set",
			"vote":"36",
			"content":"```\\n    Set<Integer> used = new HashSet<Integer>();\\n    Queue<Integer> available = new LinkedList<Integer>();\\n    int max;\\n    public PhoneDirectory(int maxNumbers) {\\n        max = maxNumbers;\\n        for (int i = 0; i < maxNumbers; i++) {\\n            available.offer(i);\\n        }\\n    }\\n    \\n    public int get() {\\n        Integer ret = available.poll();\\n        if (ret == null) {\\n            return -1;\\n        }\\n        used.add(ret);\\n        return ret;\\n    }\\n    \\n    public boolean check(int number) {\\n        if (number >= max || number < 0) {\\n            return false;\\n        }\\n        return !used.contains(number);\\n    }\\n    \\n    public void release(int number) {\\n        if (used.remove(number)) {\\n            available.offer(number);\\n        }\\n    }\\n```"
		},
		{
			"lc_ans_id":"85335",
			"view":"4025",
			"top":"1",
			"title":"Java AC solution with Bitset and efficient get() + comments",
			"vote":"18",
			"content":"The idea is to use java's bitset and use smallestFreeIndex/max to keep track of the limit.\\n   Also, by keeping track of the updated smallestFreeIndex all the time, the run time of get()\\n   is spared from scanning the entire bitset every time.\\n```\\npublic class PhoneDirectory {\\n\\n    BitSet bitset;\\n    int max; // max limit allowed\\n    int smallestFreeIndex; // current smallest index of the free bit\\n\\n    public PhoneDirectory(int maxNumbers) {\\n        this.bitset = new BitSet(maxNumbers);\\n        this.max = maxNumbers;\\n    }\\n\\n    public int get() {\\n        // handle bitset fully allocated\\n        if(smallestFreeIndex == max) {\\n            return -1;\\n        }\\n        int num = smallestFreeIndex;\\n        bitset.set(smallestFreeIndex);\\n        //Only scan for the next free bit, from the previously known smallest free index\\n        smallestFreeIndex = bitset.nextClearBit(smallestFreeIndex);\\n        return num;\\n    }\\n\\n    public boolean check(int number) {\\n        return bitset.get(number) == false;\\n    }\\n\\n    public void release(int number) {\\n        //handle release of unallocated ones\\n        if(bitset.get(number) == false)\\n            return;\\n        bitset.clear(number);\\n        if(number < smallestFreeIndex) {\\n            smallestFreeIndex = number;\\n        }\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85341",
			"view":"3786",
			"top":"2",
			"title":"4-line Python solution using only 1 set and no queue",
			"vote":"12",
			"content":"```\\n   def __init__(self, maxNumbers):\\n        self.available = set(range(maxNumbers))\\n\\n    def get(self):\\n        return self.available.pop() if self.available else -1\\n\\n    def check(self, number):\\n        return number in self.available\\n\\n    def release(self, number):\\n        self.available.add(number)"
		},
		{
			"lc_ans_id":"85365",
			"view":"2257",
			"top":"3",
			"title":"C++, two array solution.",
			"vote":"11",
			"content":"Use vector<int> to store free list and use vector<bool> to check if the number is in free list.\\nall functions take O(1) except initialization.\\n...\\n\\n    vector<int> freeList;\\n    vector<bool> freeHT;\\n    int index, count;\\n\\n    /** Initialize your data structure here\\n        @param maxNumbers - The maximum numbers that can be stored in the phone directory. */\\n    PhoneDirectory(int maxNumbers) : index(0), count(maxNumbers), freeList(maxNumbers), freeHT(maxNumbers, true){\\n        for (int i = 0; i < maxNumbers; ++i) {\\n            freeList[i] = i;\\n        }\\n    }\\n    \\n    /** Provide a number which is not assigned to anyone.\\n        @return - Return an available number. Return -1 if none is available. */\\n    int get() {\\n        int n = -1;\\n        if (index < count) {\\n            n = freeList[index++];\\n            freeHT[n] = false;\\n        }\\n        return n;\\n    }\\n    \\n    /** Check if a number is available or not. */\\n    bool check(int number) {\\n        if (number < 0 || number >= count) {\\n            return false;\\n        }\\n        return freeHT[number];\\n    }\\n    \\n    /** Recycle or release a number. */\\n    void release(int number) {\\n        if (number < 0 || number >= count || freeHT[number]) {\\n            return;\\n        }\\n        freeList[--index] = number;\\n        freeHT[number] = true;\\n    }"
		},
		{
			"lc_ans_id":"85354",
			"view":"2801",
			"top":"4",
			"title":"All C++ solutions got LTE?",
			"vote":"8",
			"content":"I spent more than 2 hours, and I was mad because all of my solutions got LTE. Then I gave up, and tried to see others' solutions, but they were almost the same as mine. I thought maybe my implementation was bad. However, after I copied and pasted their ACCEPTED code, I still got LTE.\\n\\n**I tried almost every c++ solution posted by the others. All of them got LTE.** (Maybe when the author posted it, it could pass, but after that, something was wrong with the OJ)."
		},
		{
			"lc_ans_id":"85340",
			"view":"723",
			"top":"5",
			"title":"The problem description seems to  be ambiguous for the get() function.",
			"vote":"6",
			"content":"The problem states that get() provides a number which is not assigned to anyone. It does not state the order of the number can be given.\\nHowever, the test cases are expecting a certain order from get() function's returns.\\nIf this specific order is expected, it should be stated in the problem statement."
		},
		{
			"lc_ans_id":"85332",
			"view":"521",
			"top":"6",
			"title":"Java AC solution using LinkedHashSet - clear code and easy to understand",
			"vote":"5",
			"content":"I first used HashSet as the supported data structure - as of now 8/3/2016 10:43AM(PST) the test cases couldn't be passed due to TLE.\\n\\nTried using LinkedHashSet and got AC in 571ms. According to other answers in the thread, bitset is also a good candidate to use as base structure.\\n```\\n\\tSet<Integer> set;\\n\\t    /** Initialize your data structure here\\n\\t        @param maxNumbers - The maximum numbers that can be stored in the phone directory. */\\n\\t    public PhoneDirectory(int maxNumbers) {\\n\\t        set = new LinkedHashSet<>();\\n\\t        \\n\\t        for(int i=0; i<maxNumbers; i++){\\n\\t            set.add(i);\\n\\t        }\\n\\t    }\\n\\t    \\n\\t    /** Provide a number which is not assigned to anyone.\\n\\t        @return - Return an available number. Return -1 if none is available. */\\n\\t    public int get() {\\n\\t    \\tIterator iter = set.iterator();\\n\\t    \\t\\n\\t        if(!set.isEmpty()){\\n\\t        \\tint val = (int) iter.next();\\n\\t        \\tset.remove(val);\\n\\t        \\treturn val;\\n\\t        }\\n\\t        return -1;\\n\\t    }\\n\\t    \\n\\t    /** Check if a number is available or not. */\\n\\t    public boolean check(int number) {\\n\\t       return set.contains(number);\\n\\t    }\\n\\t    \\n\\t    /** Recycle or release a number. */\\n\\t    public void release(int number) {\\n\\t    \\tset.add(number);\\n\\t    }\\n```"
		},
		{
			"lc_ans_id":"85342",
			"view":"177",
			"top":"7",
			"title":"Python segment tree implementation",
			"vote":"3",
			"content":"Segment tree implementation. \\nSpace complexity: O(2n)\\nTime complexity: get O(2logn); check: O(1); release: O(logn).\\n\\n```\\nclass PhoneDirectory(object):\\n\\n    def __init__(self, max_number):\\n        self.tree = [True] * 2 * max_number\\n        self.max_number = max_number\\n        \\n    \\n    def get(self):\\n        if self.tree[1] == False: return -1\\n        i = 1\\n        while i < len(self.tree)/2:\\n            if 2 * i < len(self.tree) and self.tree[2 * i]:\\n                i = 2 * i\\n            if 2 * i + 1 < len(self.tree) and self.tree[2 * i + 1]:\\n                i = 2 * i + 1\\n                \\n        ret = i - self.max_number\\n       \\n        # update the tree\\n        self.tree[i] = False\\n        i /= 2\\n        while i > 0:\\n            self.tree[i] = self.tree[2 * i] or self.tree[2 * i + 1]\\n            i /= 2\\n        \\n        return ret\\n            \\n    def check(self, number):\\n        return number >= 0 and number < self.max_number and self.tree[number + self.max_number]\\n        \\n    def release(self, number):\\n        i = self.max_number + number\\n        while i > 0:\\n            self.tree[i] = True\\n            i /= 2\\n\\n```"
		},
		{
			"lc_ans_id":"85377",
			"view":"765",
			"top":"8",
			"title":"One set solution",
			"vote":"3",
			"content":"use set to save released number\\n\\n```\\npublic class PhoneDirectory {\\n\\n    private int index = 0;\\n    private int max;\\n    private TreeSet<Integer> set = new TreeSet<>();\\n    \\n    public PhoneDirectory(int maxNumbers) {\\n        max = maxNumbers;\\n    }\\n    \\n    /** Provide a number which is not assigned to anyone.\\n        @return - Return an available number. Return -1 if none is available. */\\n    public int get() {\\n        if (!set.isEmpty()) {\\n            return set.pollFirst();\\n        } else if (index < max) {\\n            return index++;\\n        } \\n        return -1;\\n    }\\n    \\n    /** Check if a number is available or not. */\\n    public boolean check(int number) {\\n        return (number >= index && number < max) || set.contains(number);\\n    }\\n    \\n    /** Recycle or release a number. */\\n    public void release(int number) {\\n        if (number >= index || set.contains(number)) return;\\n        set.add(number);\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85379",
			"view":"1032",
			"top":"9",
			"title":"Java two arrays solution 320 ms, O(1) for each operation.",
			"vote":"2",
			"content":"The key idea is to cache and reuse the released numbers.\\nUsing a boolean array to indicate which numbers are used instead of using Set.\\nAnother array is served as a \"stack\" to cache the released numbers.\\nThe logic of my design is to give out all the numbers during the first round and then \"recycle\" from the stack afterward.  \\n\\n```\\npublic class PhoneDirectory {\\n    /** Initialize your data structure here\\n        @param maxNumbers - The maximum numbers that can be stored in the phone directory. */\\n    int max;\\n    int size;\\n    int cache_idx;\\n    int[] cache;\\n    boolean[] used;\\n    int count;\\n    public PhoneDirectory(int maxNumbers) {\\n        max = maxNumbers;\\n        size = 0;\\n        count = 0;\\n        used = new boolean[max];\\n        cache = new int[max];\\n        cache_idx = -1;\\n    }\\n    \\n    /** Provide a number which is not assigned to anyone.\\n        @return - Return an available number. Return -1 if none is available. */\\n    public int get() {\\n        int ret=-1;\\n        if ( count >= max ) return ret;\\n        if (size < max) {\\n            ret = size++;\\n        } else {\\n            ret = cache[cache_idx--];\\n        }\\n        used[ret]=true;\\n        count++;\\n        return ret;\\n    }\\n    \\n    /** Check if a number is available or not. */\\n    public boolean check(int number) {\\n        return ! used[number];\\n    }\\n    \\n    /** Recycle or release a number. */\\n    public void release(int number) {\\n        if (number < max && ! check(number) ){\\n            cache[++cache_idx]=number;\\n            used[number] = false;\\n            count--;\\n        }\\n    }\\n}\\n```"
		}
	],
	"id":"379",
	"title":"Design Phone Directory",
	"content":"<p>Design a Phone Directory which supports the following operations:</p>\r\n\r\n<p>\r\n<ol>\r\n<li><code>get</code>: Provide a number which is not assigned to anyone.</li>\r\n<li><code>check</code>: Check if a number is available or not.</li>\r\n<li><code>release</code>: Recycle or release a number.</li>\r\n</ol>\r\n</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n// Init a phone directory containing a total of 3 numbers: 0, 1, and 2.\r\nPhoneDirectory directory = new PhoneDirectory(3);\r\n\r\n// It can return any available phone number. Here we assume it returns 0.\r\ndirectory.get();\r\n\r\n// Assume it returns 1.\r\ndirectory.get();\r\n\r\n// The number 2 is available, so return true.\r\ndirectory.check(2);\r\n\r\n// It returns 2, the only number that is left.\r\ndirectory.get();\r\n\r\n// The number 2 is no longer available, so return false.\r\ndirectory.check(2);\r\n\r\n// Release number 2 back to the pool.\r\ndirectory.release(2);\r\n\r\n// Number 2 is available again, return true.\r\ndirectory.check(2);\r\n</pre>\r\n</p>",
	"frequency":"88",
	"ac_num":"13460"
}