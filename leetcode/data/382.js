{
	"difficulty":"2",
	"submit_num":"73980",
	"show_id":"382",
	"leetcode_id":"382",
	"answers":[
		{
			"lc_ans_id":"85659",
			"view":"26055",
			"top":"0",
			"title":"Brief explanation for Reservoir Sampling",
			"vote":"124",
			"content":"### Problem:\\n  - Choose <code>k</code> entries from <code>n</code> numbers. Make sure each number is selected with the probability of <code>k/n</code>\\n\\n### Basic idea:\\n  - Choose <code>1, 2, 3, ..., k</code> first and put them into the reservoir.\\n  - For <code>k+1</code>, pick it with a probability of <code>k/(k+1)</code>, and randomly replace a number in the reservoir.\\n  - For <code>k+i</code>, pick it with a probability of <code>k/(k+i)</code>, and randomly replace a number in the reservoir.\\n  - Repeat until <code>k+i</code> reaches <code>n</code>\\n\\n### Proof:\\n  - For <code>k+i</code>, the probability that it is selected and will replace a number in the reservoir is <code>k/(k+i)</code>\\n  - For a number in the reservoir before (let's say <code>X</code>), the probability that it keeps staying in the reservoir is \\n    - <code>P(X was in the reservoir last time)</code> \\xd7 <code>P(X is not replaced by k+i)</code>\\n    - = <code>P(X was in the reservoir last time)</code> \\xd7 (<code>1</code> - <code>P(k+i is selected and replaces X)</code>)\\n    - = <code>k/(k+i-1)</code> \\xd7 \\uff08<code>1</code> - <code>k/(k+i)</code> \\xd7 <code>1/k</code>\\uff09\\n    - = <code>k/(k+i)</code>\\n  - When <code>k+i</code> reaches <code>n</code>, the probability of each number staying in the reservoir is <code>k/n</code>\\n\\n### Example\\n  - Choose <code>3</code> numbers from <code>[111, 222, 333, 444]</code>. Make sure each number is selected with a probability of <code>3/4</code>\\n  - First, choose <code>[111, 222, 333]</code> as the initial reservior\\n  - Then choose <code>444</code> with a probability of <code>3/4</code>\\n  - For <code>111</code>, it stays with a probability of \\n    - <code>P(444 is not selected)</code> + <code>P(444 is selected but it replaces 222 or 333)</code>\\n    - = <code>1/4</code> + <code>3/4</code>*<code>2/3</code> \\n    - = <code>3/4</code>\\n  - The same case with <code>222</code> and <code>333</code>\\n  - Now all the numbers have the probability of <code>3/4</code> to be picked\\n\\n### This Problem <Linked List Random Node>\\n  - This problem is the sp case where <code>k=1</code>\\n\\n___\\nP.S. Thanks for @WKVictor for pointing out my mistake!"
		},
		{
			"lc_ans_id":"85662",
			"view":"17225",
			"top":"1",
			"title":"Java Solution with cases explain",
			"vote":"98",
			"content":"When I first got this question, I went through some articles, but it is painful for me to understand abstract notations like i, k, m, n, n-1, k+1...\\n\\nAfter I read this one: [http://blog.jobbole.com/42550/](http://blog.jobbole.com/42550), it comes with a simple example and I understood suddenly, and write the code by myself. I translate it to English, so more people can benefit from it.\\n\\nStart...\\nWhen we read the first node ```head```, if the stream ```ListNode``` stops here, we can just return the ```head.val```. The possibility is ```1/1```.\\n\\nWhen we read the second node, we can decide if we replace the result ```r``` or not. The possibility is ```1/2```. So we just generate a random number between ```0``` and ```1```, and check if it is equal to ```1```. If it is ```1```, replace ```r``` as the value of the current node, otherwise we don't touch ```r```, so its value is still the value of head.\\n\\nWhen we read the third node, now the result ```r``` is one of value in the head or second node. We just decide if we replace ```the value of r``` as ```the value of current node(third node)```. The possibility of replacing it is ```1/3```, namely the possibility of we don't touch ```r``` is ```2/3```. So we just generate a random number between ```0 ~ 2```, and if the result is ```2``` we replace ```r```.\\n\\nWe can continue to do like this until the end of stream ```ListNode```.\\n\\nHere is the Java code:\\n```\\npublic class Solution {\\n    \\n    ListNode head;\\n    Random random;\\n    \\n    public Solution(ListNode h) {\\n        head = h;       \\n        random = new Random();        \\n    }\\n    \\n    public int getRandom() {\\n        \\n        ListNode c = head;\\n        int r = c.val;\\n        for(int i=1;c.next != null;i++){\\n            \\n            c = c.next;\\n            if(random.nextInt(i + 1) == i) r = c.val;                        \\n        }\\n        \\n        return r;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85701",
			"view":"15365",
			"top":"2",
			"title":"O(n) Time & O(1) Space Java Solution",
			"vote":"29",
			"content":"```\\nimport java.util.*;\\npublic class Solution {\\n\\n    /** @param head The linked list's head. Note that the head is guanranteed to be not null, so it contains at least one node. */\\n    ListNode head = null;\\n    Random randomGenerator = null;\\n    public Solution(ListNode head) {\\n        this.head = head;\\n        this.randomGenerator = new Random();\\n\\n    }\\n    \\n    /** Returns a random node's value. */\\n    public int getRandom() {\\n        ListNode result = null;\\n        ListNode current = head;\\n        \\n        for(int n = 1; current!=null; n++) {\\n            if (randomGenerator.nextInt(n) == 0) {\\n                result = current;\\n            }\\n            current = current.next;\\n        }\\n        \\n        return result.val;\\n        \\n    }\\n}\\n\\n/**\\n * Your Solution object will be instantiated and called as such:\\n * Solution obj = new Solution(head);\\n * int param_1 = obj.getRandom();\\n */\\n```"
		},
		{
			"lc_ans_id":"85690",
			"view":"7853",
			"top":"3",
			"title":"using \"Reservoir sampling\" O(1) space, O(n) time complexity\\uff0cc++",
			"vote":"24",
			"content":"according  to the wiki https://en.wikipedia.org/wiki/Reservoir_sampling\\nhere is sudo code for k size reservoir:\\n```\\n/*\\n  S has items to sample, R will contain the result\\n*/\\nReservoirSample(S[1..n], R[1..k])\\n  // fill the reservoir array\\n  for i = 1 to k\\n      R[i] := S[i]\\n\\n  // replace elements with gradually decreasing probability\\n  for i = k+1 to n\\n    j := random(1, i)   // important: inclusive range\\n    if j <= k\\n        R[j] := S[i]\\n```\\nyou need to remember  the range [ 0, i ] should be inclusive.\\n```\\nclass Solution {\\nprivate:\\n    ListNode* head;\\npublic:\\n    /** @param head The linked list's head. Note that the head is guanranteed to be not null, so it contains at least one node. */\\n    Solution(ListNode* head) {\\n        this->head = head;\\n    }\\n    \\n    /** Returns a random node's value. */\\n    int getRandom() {\\n        int res = head->val;\\n        ListNode* node = head->next;\\n        int i = 2;\\n        while(node){\\n            int j = rand()%i;\\n            if(j==0)\\n                res = node->val;\\n            i++;\\n            node = node->next;\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"85673",
			"view":"5191",
			"top":"4",
			"title":"\"buffered\" reservoir sampling",
			"vote":"13",
			"content":"As I pointed out [earlier](https://discuss.leetcode.com/topic/53795/reservoir-sampling-seems-inefficient), reservoir sampling can seem inefficient presumably due to the many requests to the random number generator. My naive count+pick took about 180 ms, much faster than the reservoir sampling solutions taking about 400 ms or more. So I created a buffered way, where I update the random pick only every 100 nodes. Takes about 200 ms now. So still slower than the naive count+pick, but might be advantageous in some situations because it doesn't traverse the list twice.\\n```\\nclass Solution(object):\\n\\n    def __init__(self, head):\\n        self.head = head\\n\\n    def getRandom(self):\\n        node = self.head\\n        before = 0\\n        buffer = [None] * 100\\n        while node:\\n            now = 0\\n            while node and now < 100:\\n                buffer[now] = node\\n                node = node.next\\n                now += 1\\n            r = random.randrange(now + before)\\n            if r < now:\\n                pick = buffer[r]\\n            before += now\\n        return pick.val\\n```\\n\\n**C++ version:** (takes about 61 ms)\\n```\\nclass Solution {\\npublic:\\n    Solution(ListNode* head) : head(head) {}\\n    \\n    int getRandom() {\\n        ListNode *node = head, *buffer[100], *pick;\\n        for (int before=0; node; before+=100) {\\n            int now = 0;\\n            while (node && now < 100) {\\n                buffer[now++] = node;\\n                node = node->next;\\n            }\\n            int r = rand() % (now + before);\\n            if (r < now)\\n                pick = buffer[r];\\n        }\\n        return pick->val;\\n    }\\nprivate:\\n    ListNode* head;\\n};\\n```"
		},
		{
			"lc_ans_id":"85718",
			"view":"1683",
			"top":"5",
			"title":"Python reservoir sampling solution (when the length of linked list changes dynamically)",
			"vote":"10",
			"content":"The problem is a little ambiguous. In the interview, you should ask clearly whether the list length is unknown but static or it is unknown and dynamically changing. In the first case, you can simply precompute the length and generate random indices based on that. It is faster than the reservior sampling solution.\\n\\nIf the list length changes dynamically, reservior sampling is a good choice. If you are not familiar with it, check [here](http://www.geeksforgeeks.org/reservoir-sampling/).\\n\\n```\\nclass Solution(object):\\n\\n    def __init__(self, head):\\n        self.head = head\\n\\n    def getRandom(self):\\n        result, node, index = self.head, self.head.next, 1\\n        while node:\\n            if random.randint(0, index) is 0:\\n                result = node\\n            node = node.next\\n            index += 1\\n        return result.val\\n```"
		},
		{
			"lc_ans_id":"85755",
			"view":"1264",
			"top":"6",
			"title":"Reservoir Sampling Java Solution",
			"vote":"5",
			"content":"```\\nimport java.util.Random;\\n\\npublic class Solution {\\n    ListNode head;\\n    Random random;\\n    /** @param head The linked list's head. Note that the head is guanranteed to be not null, so it contains at least one node. */\\n    public Solution(ListNode head) {\\n        this.head = head;\\n        random = new Random();\\n    }\\n    \\n    /** Returns a random node's value. */\\n    public int getRandom() {\\n        ListNode result = head;\\n        ListNode cur = head;\\n        int size = 1;\\n        while (cur != null) {\\n            if (random.nextInt(size) == 0) {\\n                result = cur;\\n            }\\n            size++;\\n            cur = cur.next;\\n        }\\n        \\n        return result.val;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"85663",
			"view":"3347",
			"top":"7",
			"title":"\"Reservoir sampling\" seems inefficient",
			"vote":"4",
			"content":"> **\"What if the linked list is extremely large and its length is unknown to you?\"**\\n\\nWell, then I simply count first. Silly question :-P\\n\\nThe solution below takes about 180 ms while the \"reservoir sampling\" Python solutions posted by others all take about 400 ms or more, presumably due to the many costly requests to the random number generator. So they seem rather inefficient.\\n```\\nclass Solution(object):\\n\\n    def __init__(self, head):\\n        self.head = head\\n\\n    def getRandom(self):\\n        n = 0\\n        node = self.head\\n        while node:\\n            n += 1\\n            node = node.next\\n        node = self.head\\n        for _ in xrange(random.randrange(n)):\\n            node = node.next\\n        return node.val\\n```"
		},
		{
			"lc_ans_id":"85705",
			"view":"678",
			"top":"8",
			"title":"Java two solutions, easy to understand",
			"vote":"3",
			"content":"The first solution is the trivial one, \\n\\nwe just count the length of the list, and then return a random number \"r\" between 0 and length,\\n\\nthen we traverse the list again and stop at\"r\" steps and then return the value of that ListNode.\\n\\n```\\npublic class Solution {\\n\\n    /** @param head The linked list's head.\\n        Note that the head is guaranteed to be not null, so it contains at least one node. */\\n    int count = 0;\\n    ListNode head;\\n    public Solution(ListNode head) {\\n        this.head = head;\\n        ListNode tem = head;\\n        while(tem != null) {\\n            count++;\\n            tem = tem.next;\\n        }\\n    }\\n    \\n    /** Returns a random node's value. */\\n    public int getRandom() {\\n        ListNode fakehead = head;\\n        Random r = new Random();\\n        int random = r.nextInt(count);\\n        for (int i = 0; i < random; i++) {\\n            fakehead = fakehead.next;\\n        }\\n        return fakehead.val;\\n    }\\n}\\n```\\nAnother one only traverse the list once, and we don't need to know the length of the list.\\n```\\npublic class Solution {\\n\\n    /** @param head The linked list's head.\\n        Note that the head is guaranteed to be not null, so it contains at least one node. */\\n    ListNode head;\\n    Random random;\\n    public Solution(ListNode head) {\\n        this.head = head;\\n        random = new Random();\\n    }\\n    \\n    /** Returns a random node's value. */\\n    public int getRandom() {\\n        int count = 0;\\n        int result = -1;\\n        ListNode dummyhead = head;\\n        while(dummyhead != null) {\\n            if(random.nextInt(++count) == 0) {\\n                result = dummyhead.val;\\n            }\\n            dummyhead = dummyhead.next;\\n        }\\n        return result;\\n    }\\n}\\n```\\nprof: for example: we have 3 numbers : 1,2,3.\\nstep 1:  we pick 1 probability 1/1 .\\nstep 2: we have 1/2 probability to pick 2, so there are 1/2 chance we return 1 and 1/2 chance return 2.\\nstep 3: we have 1/3 probability to pick 3, and the probability that we return 2 is that we pick 2 in step 2 and don't pick 3 and step 3, so the probability of returning 2 is 1/2 * (1- 1/3) = 1/3.  so in step 3 we have 1/3 chance to return 1, 1/3 chance to return 2, and 1/3 chance to return 3."
		},
		{
			"lc_ans_id":"85686",
			"view":"1503",
			"top":"9",
			"title":"How is this problem tested?",
			"vote":"3",
			"content":"I'm just curious how does the OJ test this question.\\n\\nGenerate n random numbers and see if the distribution of all numbers are almost equal? But what is the threshold for \"almost\"? \\n\\nI mean, since it has randomness, any distribution is possible, right?"
		}
	],
	"id":"382",
	"title":"Linked List Random Node",
	"content":"<p>Given a singly linked list, return a random node's value from the linked list. Each node must have the <b>same probability</b> of being chosen.</p>\r\n\r\n<p><b>Follow up:</b><br />\r\nWhat if the linked list is extremely large and its length is unknown to you? Could you solve this efficiently without using extra space?\r\n</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n// Init a singly linked list [1,2,3].\r\nListNode head = new ListNode(1);\r\nhead.next = new ListNode(2);\r\nhead.next.next = new ListNode(3);\r\nSolution solution = new Solution(head);\r\n\r\n// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.\r\nsolution.getRandom();\r\n</pre>\r\n</p>",
	"frequency":"264",
	"ac_num":"35082"
}