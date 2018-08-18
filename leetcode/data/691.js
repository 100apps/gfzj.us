{
	"difficulty":"2",
	"submit_num":"13469",
	"show_id":"725",
	"leetcode_id":"725",
	"answers":[
		{
			"lc_ans_id":"109296",
			"view":"1592",
			"top":"0",
			"title":"[Java/C++] Clean Code",
			"vote":"15",
			"content":"**Java**\\n```\\nclass Solution {\\n    public ListNode[] splitListToParts(ListNode root, int k) {\\n        ListNode[] parts = new ListNode[k];\\n        int len = 0;\\n        for (ListNode node = root; node != null; node = node.next)\\n            len++;\\n        int n = len / k, r = len % k; // n : minimum guaranteed part size; r : extra nodes spread to the first r parts;\\n        ListNode node = root, prev = null;\\n        for (int i = 0; node != null && i < k; i++, r--) {\\n            parts[i] = node;\\n            for (int j = 0; j < n + (r > 0 ? 1 : 0); j++) {\\n                prev = node;\\n                node = node.next;\\n            }\\n            prev.next = null;\\n        }\\n        return parts;        \\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<ListNode*> splitListToParts(ListNode* root, int k) {\\n        vector<ListNode*> parts(k, nullptr);\\n        int len = 0;\\n        for (ListNode* node = root; node; node = node->next)\\n            len++;\\n        int n = len / k, r = len % k; // n : minimum guaranteed part size; r : extra nodes spread to the first r parts;\\n        ListNode* node = root, *prev = nullptr;\\n        for (int i = 0; node && i < k; i++, r--) {\\n            parts[i] = node;\\n            for (int j = 0; j < n + (r > 0); j++) {\\n                prev = node;\\n                node = node->next;\\n            }\\n            prev->next = nullptr;\\n        }\\n        return parts;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109284",
			"view":"393",
			"top":"1",
			"title":"Elegant Python with Explanation - 45ms",
			"vote":"3",
			"content":"This question can be split into two parts:\\n\\n1. Count the length of the linked list\\n2. Determine the length of nodes in each chunk\\n3. Splitting the linked list up\\n\\nAt the end of step 2, `res` will look something like this, for a list of length 10 and k of 3: `[4, 4, 3]`.\\n\\nStep 3 iterates through `res` using the values in `res` and replaces the value at each index with each chunk's head node. We have to keep a reference to `prev` in order to slice up the chunks nicely by setting `prev.next = None`.\\n\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def splitListToParts(self, root, k):\\n        # Count the length of the linked list\\n        curr, length = root, 0\\n        while curr:\\n            curr, length = curr.next, length + 1\\n        # Determine the length of each chunk\\n        chunk_size, longer_chunks = length // k, length % k\\n        res = [chunk_size + 1] * longer_chunks + [chunk_size] * (k - longer_chunks)\\n        # Split up the list\\n        prev, curr = None, root\\n        for index, num in enumerate(res):\\n            if prev:\\n                prev.next = None\\n            res[index] = curr\\n            for i in range(num):\\n                prev, curr = curr, curr.next\\n        return res\\n```"
		},
		{
			"lc_ans_id":"109305",
			"view":"302",
			"top":"2",
			"title":"C++ Solution O(1) Space 9ms",
			"vote":"3",
			"content":"```\\nclass Solution {\\npublic:\\n    vector<ListNode*> splitListToParts(ListNode* root, int k) {\\n        int len = 0;\\n        for (ListNode *x = root; x; ++len, x = x->next);\\n\\n        int n = len / k, r = len % k;\\n        vector<ListNode*> ret(k);\\n        for (int i = 0; i < k && root; ++i) {\\n            ret[i] = root;\\n            for (int j = 1; j < n + (i < r); ++j)\\n                root = root->next;\\n            ListNode *next = root->next;\\n            root->next = nullptr;\\n            root = next;\\n        }\\n        return ret;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109298",
			"view":"84",
			"top":"3",
			"title":"Easy to Follow Python Solution",
			"vote":"1",
			"content":"    def splitListToParts(self, root, k):\\n        n = 0\\n        curr = root\\n        while curr != None:\\n            n += 1\\n            curr = curr.next\\n        \\n        # determine part length and any leftover length\\n        length = n / k\\n        leftover_length = n % k\\n        curr = root\\n        parts = []\\n        for i in xrange(k):\\n            part = []\\n            for j in xrange(length):\\n                part.append(curr.val)\\n                curr = curr.next\\n            if leftover_length > 0:\\n                part.append(curr.val)\\n                curr = curr.next\\n                leftover_length -= 1\\n            parts.append(part)\\n        return parts"
		},
		{
			"lc_ans_id":"109297",
			"view":"359",
			"top":"4",
			"title":"Simple C++ with Explanation",
			"vote":"1",
			"content":"Find the size of the linked list and store that in ```n```.  Divide ```n``` by ```k``` to find out the size of each individual linked list ```chunk``` of the original linked list.  ```leftover``` is the remainder of ```n/k``` and is ```> 0``` when ```n``` is NOT evenly divisible by ```k```.  These ```leftover```s are evenly distributed one at a time onto the end of each of the linked list ```chunk```s (starting at the beginning, not all chunks may be modified ).  If a ```chunk``` contains a ```leftover``` then that ```chunk``` size is a usual ```chunk``` size plus 1.  Otherwise, the usual ```chunk``` size is used.  Then iterate through the linked list, keeping track of the ```head``` of each ```chunk```, using ```prev``` to follow ```curr``` in order to set the last ```LinkNode```'s ```next``` pointer to ```nullptr``` and keep track of where the next iteration of the original linked list should re-occur.  Push each ```head``` of each ```chunk``` into the vector ```res```, which is the result to be returned.  Lastly for the corner case ( my one bug which cost me 5 minutes time in this contest ) if k is larger than n, then append empty linked lists onto the end of ```res```.\\n\\n```\\nclass Solution {\\npublic:\\n    vector<ListNode*> splitListToParts(ListNode* root, int k) {\\n        vector<ListNode*> res;\\n        int n=0,chunk=0,leftover=0;\\n        ListNode* itr=root;\\n        while(itr){\\n            ++n;\\n            itr=itr->next;\\n        }\\n        chunk=n/k;\\n        leftover=n%k;\\n        itr=root;\\n        while(itr){\\n            int size=leftover-- > 0 ? chunk+1 : chunk;\\n            ListNode *head=itr, *prev=nullptr, *curr=itr;\\n            while(size){\\n                prev=curr;\\n                curr=curr->next;\\n                --size;\\n            }\\n            prev->next=nullptr;\\n            itr=curr;\\n            res.push_back(head);\\n        }\\n        while (k>n){\\n            res.push_back(nullptr);\\n            --k;\\n        }\\n        return res;\\n    }\\n};\\n```\\n\\n**More concise solution:** initialize the vector with k nullptrs\\n```\\nclass Solution {\\npublic:\\n    vector<ListNode*> splitListToParts(ListNode* root, int k) {\\n        vector<ListNode*> res(k,nullptr);\\n        int n=0,chunk=0,leftover=0;\\n        ListNode* itr=root;\\n        while(itr){\\n            ++n;\\n            itr=itr->next;\\n        }\\n        chunk=n/k;\\n        leftover=n%k;\\n        itr=root;\\n        for (int i=0; itr; ++i){\\n            int size=leftover-- > 0 ? chunk+1 : chunk;\\n            ListNode *head=itr, *prev=nullptr, *curr=itr;\\n            for (int j=0; j<size; ++j){\\n                prev=curr;\\n                curr=curr->next;\\n            }\\n            prev->next=nullptr;\\n            itr=curr;\\n            res[i]=head;\\n        }\\n        return res;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109313",
			"view":"474",
			"top":"5",
			"title":"Easy Java Solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\n    public ListNode[] splitListToParts(ListNode root, int k) {\\n        int m=0;\\n        ListNode temp=root;\\n        while(root!=null){\\n            root=root.next;\\n        m++;\\n        }\\n        ListNode[] res= new ListNode[k];\\n        int size=m/k;\\n        int l= m%k;\\n        \\n        for(int i=0;i<k;i++){\\n            ListNode ans= temp;\\n            int j=size;\\n            while(temp!=null && j>1){\\n                temp=temp.next;j--;\\n            }\\n            if(size!=0 && l>0 && temp!=null){ temp=temp.next;  l--;}\\n            ListNode temp1=temp;\\n            if(temp!=null) temp=temp.next;\\n            if(temp1!=null) temp1.next=null;\\n            res[i]=ans;\\n        }\\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109276",
			"view":"26",
			"top":"6",
			"title":"Python: really short and clean solution",
			"vote":"0",
			"content":"\\n`base_block_length` - is a shortest length of nested arrays, based on `n div k`. For example, for a queue of length `7` and `k = 3`, our minimum length will be `2`, because `7 div 3 == 2`\\n\\n`long_block_idx` - is an `index + 1` of last nested array with a length `base_block_length + 1` (In our example it's `3 = 2 + 1`). And it is calculated as `n mod k`. In our previous example it is `1`, because `7 mod 3 == 1`. Since it is an `index + 1`, our last longest block index is `1 - 1 = 0`. *Please note: because of the implementation we operate with `index + 1` instead of `index`*\\n\\nBack to our example: first nested array has `3` elements and the rest ones have `2`. `k = 3 => [[X X X], [X X], [X X]]`  \\n```\\nclass Solution(object):\\n    def splitListToParts(self, root, k):\\n        result = []\\n\\n        n = 0\\n        cur = root\\n        while cur:\\n            n += 1\\n            cur = cur.next\\n\\n        cur = root\\n        base_block_length, long_block_idx = divmod(n, k)\\n\\n        for block_idx in range(0, k):\\n            block = []\\n\\n            for i in range(0, base_block_length + int(block_idx < long_block_idx)):\\n                block.append(cur.val)\\n                cur = cur.next\\n\\n            result.append(block)\\n\\n        return result\\n```"
		},
		{
			"lc_ans_id":"109277",
			"view":"11",
			"top":"7",
			"title":"Java Accepted O(n) Solution",
			"vote":"0",
			"content":"```\\n/**\\n * Definition for singly-linked list.\\n * public class ListNode {\\n *     int val;\\n *     ListNode next;\\n *     ListNode(int x) { val = x; }\\n * }\\n */\\nclass Solution {\\n    public ListNode[] splitListToParts(ListNode root, int k) {\\n        int n=0;\\n        ListNode head=root;\\n        while(head!=null){\\n        \\tn++;\\n        \\thead=head.next;\\n        }\\n        int y=n/k;\\n        int r=(y!=0)?n-y*k:0;\\n        //System.out.println(\"y \"+y+\" r \"+r);\\n        ListNode[] res=new ListNode[k];\\n        int i=0;\\n        head=root;\\n        while(i<k){\\n        \\tif(head!=null) {\\n            res[i]=head;\\n        \\tint c=y; \\n        \\tif(r!=0) {\\n        \\t\\tc+=1;\\n        \\t\\tr-=1;\\n        \\t}\\n        \\t//System.out.println(\"c \"+c); c is size of every block\\n        \\twhile(--c>0){ // --c, decrease first because one node is already assigned here res[i]=head;\\n        \\t\\thead=head.next;\\n        \\t\\tif(head==null) break;\\t\\n        \\t}\\n        \\tif(head!=null){ // slicing the rest\\n        \\t\\tListNode temp=head.next;\\n        \\t\\thead.next=null;\\n        \\t\\thead=temp;\\n        \\t}\\n        \\telse break;\\n        }\\n        i++;\\n    }\\n    return res;\\n    }\\n}\\n\\n```\\ngoing step wise, \\n1. assign head to i-th block,  traverse c units and then slice\\n2. repeat step 1."
		},
		{
			"lc_ans_id":"109279",
			"view":"17",
			"top":"8",
			"title":"Straight forward python solution with comments",
			"vote":"0",
			"content":"# We find how many elements each sub-list would have and then traverse the linkedlist and assign elements to each sub-list\\n\\n\\n    def splitListToParts(self, root, k):\\n        #step-1: find len \\n        curr, l = root, 0 \\n        while curr:\\n            l+=1 \\n            curr= curr.next \\n        \\n        \\n        #step2: top gets each+1 \\n        if l%k==0:\\n            each = int(l/k)\\n            top  = 0 \\n        else:\\n            top= l%k \\n            each = int(l/k)\\n        \\n        ans= [[] for x in range(k)]\\n        curr= root \\n        for i in range(k):\\n            each= int(l/k)+1 if top>0 else int(l/k)\\n            top-=1 \\n            while curr and each>0:\\n                ans[i].append(curr.val)\\n                curr= curr.next \\n                each-=1\\n        \\n        return ans"
		},
		{
			"lc_ans_id":"109280",
			"view":"14",
			"top":"9",
			"title":"My java solution -- split input list",
			"vote":"0",
			"content":"```\\nclass Solution {\\n    public ListNode[] splitListToParts(ListNode root, int k) {\\n        ListNode temp = root;\\n        int count = 0;\\n        while (temp != null) {\\n            temp = temp.next;\\n            count++;\\n        }\\n        \\n        int team = count / k;\\n        int left = count % k;\\n        \\n        ListNode[] result = new ListNode[k];\\n        for (int i = 0; i < k; i++) {\\n            result[i] = root;\\n            for (int j = 0; j < team - 1 && root != null; j++) {\\n                root = root.next;\\n            }\\n            if (left > 0 && root != null && team > 0) {\\n                root = root.next;\\n                left--;\\n            }\\n            if (root != null) {\\n                ListNode record = root.next;\\n                root.next = null;\\n                root = record;\\n            }  \\n        }\\n        return result;\\n    }\\n}\\n```"
		}
	],
	"id":"691",
	"title":"Split Linked List in Parts",
	"content":"<p>Given a (singly) linked list with head node <code>root</code>, write a function to split the linked list into <code>k</code> consecutive linked list \"parts\".\r\n</p><p>\r\nThe length of each part should be as equal as possible: no two parts should have a size differing by more than 1.  This may lead to some parts being null.\r\n</p><p>\r\nThe parts should be in order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal parts occurring later.\r\n</p><p>\r\nReturn a List of ListNode's representing the linked list parts that are formed.\r\n</p>\r\n\r\nExamples\r\n1->2->3->4, k = 5 // 5 equal parts\r\n[ [1], \r\n[2],\r\n[3],\r\n[4],\r\nnull ]\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre style=\"white-space: pre-line\">\r\n<b>Input:</b> \r\nroot = [1, 2, 3], k = 5\r\n<b>Output:</b> [[1],[2],[3],[],[]]\r\n<b>Explanation:</b>\r\nThe input and each element of the output are ListNodes, not arrays.\r\nFor example, the input root has root.val = 1, root.next.val = 2, \\root.next.next.val = 3, and root.next.next.next = null.\r\nThe first element output[0] has output[0].val = 1, output[0].next = null.\r\nThe last element output[4] is null, but it's string representation as a ListNode is [].\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nroot = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 3\r\n<b>Output:</b> [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]\r\n<b>Explanation:</b>\r\nThe input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The length of <code>root</code> will be in the range <code>[0, 1000]</code>.</li>\r\n<li>Each value of a node in the input will be an integer in the range <code>[0, 999]</code>.</li>\r\n<li><code>k</code> will be an integer in the range <code>[1, 50]</code>.</li>\r\n</p>",
	"frequency":"125",
	"ac_num":"6500"
}