{
	"difficulty":"2",
	"submit_num":"650762",
	"show_id":"19",
	"leetcode_id":"19",
	"answers":[
		{
			"lc_ans_id":"8804",
			"view":"36727",
			"top":"0",
			"title":"Simple Java solution in one pass",
			"vote":"182",
			"content":"A one pass solution can be done using  pointers. Move one pointer **fast** -->  **n+1** places forward, to maintain a gap of n between the two pointers and then move both at the same speed. Finally, when the fast pointer reaches the end, the slow pointer will be **n+1** places behind - just the right spot for it to be able to skip the next node.\\n\\nSince the question gives that **n** is valid, not too many checks have to be put in place. Otherwise, this would be necessary.\\n\\n    public ListNode removeNthFromEnd(ListNode head, int n) {\\n        \\n        ListNode start = new ListNode(0);\\n        ListNode slow = start, fast = start;\\n        slow.next = head;\\n        \\n        //Move fast in front so that the gap between slow and fast becomes n\\n        for(int i=1; i<=n+1; i++)   {\\n            fast = fast.next;\\n        }\\n        //Move fast to the end, maintaining the gap\\n        while(fast != null) {\\n            slow = slow.next;\\n            fast = fast.next;\\n        }\\n        //Skip the desired node\\n        slow.next = slow.next.next;\\n        return start.next;\\n\\t}"
		},
		{
			"lc_ans_id":"8812",
			"view":"20439",
			"top":"1",
			"title":"My short C++ solution",
			"vote":"73",
			"content":"    class Solution\\n    {\\n    public:\\n        ListNode* removeNthFromEnd(ListNode* head, int n)\\n        {\\n            ListNode** t1 = &head, *t2 = head;\\n            for(int i = 1; i < n; ++i)\\n            {\\n                t2 = t2->next;\\n            }\\n            while(t2->next != NULL)\\n            {\\n                t1 = &((*t1)->next);\\n                t2 = t2->next;\\n            }\\n            *t1 = (*t1)->next;\\n            return head;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"8802",
			"view":"8074",
			"top":"2",
			"title":"3 short Python solutions",
			"vote":"45",
			"content":"**Value-Shifting - AC in 64 ms**\\n\\nMy first solution is \"cheating\" a little. Instead of really removing the nth *node*, I remove the nth *value*. I recursively determine the indexes (counting from back), then shift the values for all indexes larger than n, and then always drop the head.\\n\\n    class Solution:\\n        def removeNthFromEnd(self, head, n):\\n            def index(node):\\n                if not node:\\n                    return 0\\n                i = index(node.next) + 1\\n                if i > n:\\n                    node.next.val = node.val\\n                return i\\n            index(head)\\n            return head.next\\n\\n---\\n\\n**Index and Remove - AC in 56 ms**\\n\\nIn this solution I recursively determine the indexes again, but this time my helper function removes the nth node. It returns two values. The index, as in my first solution, and the possibly changed head of the remaining list.\\n\\n    class Solution:\\n        def removeNthFromEnd(self, head, n):\\n            def remove(head):\\n                if not head:\\n                    return 0, head\\n                i, head.next = remove(head.next)\\n                return i+1, (head, head.next)[i+1 == n]\\n            return remove(head)[1]\\n\\n---\\n\\n**n ahead - AC in 48 ms**\\n\\nThe standard solution, but without a dummy extra node. Instead, I simply handle the special case of removing the head right after the fast cursor got its head start.\\n\\n    class Solution:\\n        def removeNthFromEnd(self, head, n):\\n            fast = slow = head\\n            for _ in range(n):\\n                fast = fast.next\\n            if not fast:\\n                return head.next\\n            while fast.next:\\n                fast = fast.next\\n                slow = slow.next\\n            slow.next = slow.next.next\\n            return head"
		},
		{
			"lc_ans_id":"8806",
			"view":"9093",
			"top":"3",
			"title":"My one pass solution",
			"vote":"38",
			"content":"    public ListNode RemoveNthFromEnd(ListNode head, int n) {\\n        ListNode h1=head, h2=head;\\n        while(n-->0) h2=h2.next;\\n        if(h2==null)return head.next;  // The head need to be removed, do it.\\n        h2=h2.next;\\n        \\n        while(h2!=null){\\n            h1=h1.next;\\n            h2=h2.next;\\n        }\\n        h1.next=h1.next.next;   // the one after the h1 need to be removed\\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"8843",
			"view":"7914",
			"top":"4",
			"title":"C++ solution, easy to understand with explanations.",
			"vote":"31",
			"content":"<h1>Renewed Solution</h1>\\n\\nThe difference between the final node and the `to_be_delete` node is N. And here the assumption is that n is <b>always</b> valid.\\n\\n`fast` pointer points to the node which is N step away from the `to_be_delete` node.<br>\\n`slow` pointer points to the `to_be_delete` node.\\n\\nThe algorithms is described as below:\\n\\n<b>Firstly</b>, move `fast` pointer N step forward.<br>\\n<b>Secondly</b>,move `fast` and `slow` pointers simultaneously <b>one step a time</b> forward till the `fast` pointer reach the end, which will cause the `slow` pointer points to the previous node of the `to_be_delete` node.\\n\\n<b>Finally</b>, `slow->next = slow->next->next`.\\n\\n    ListNode *removeNthFromEnd(ListNode *head, int n) \\n    {\\n        if (!head)\\n            return nullptr;\\n    \\n        ListNode new_head(-1);\\n        new_head.next = head;\\n\\n        ListNode *slow = &new_head, *fast = &new_head;\\n\\n        for (int i = 0; i < n; i++)\\n            fast = fast->next;\\n\\n        while (fast->next) \\n        {\\n            fast = fast->next;\\n            slow = slow->next;\\n        }\\n\\n        ListNode *to_de_deleted = slow->next;\\n        slow->next = slow->next->next;\\n        \\n        delete to_be_deleted;\\n\\n        return new_head.next;\\n    }\\n**Fixed : Added code for deleting the N-th node.**"
		},
		{
			"lc_ans_id":"8822",
			"view":"4976",
			"top":"5",
			"title":"Java solution 1ms \\u5bb9\\u6613\\u7406\\u89e3",
			"vote":"20",
			"content":"    //\\u8fd8\\u662f\\u8d70\\u7684\\u5feb\\u7684\\u70b9(fastNode)\\u4e0e\\u8d70\\u5f97\\u6162\\u7684\\u70b9(slowNode)\\u8def\\u7a0b\\u5dee\\u7684\\u95ee\\u9898\\n    \\tpublic static ListNode removeNthFromEnd(ListNode head, int n) {\\n            ListNode headNode = new ListNode(9527);\\n            headNode.next = head;\\n            ListNode fastNode = headNode;\\n            ListNode slowNode = headNode;\\n            while(fastNode.next != null){\\n            \\tif(n <= 0)\\n            \\t\\tslowNode = slowNode.next;\\n            \\tfastNode = fastNode.next;\\n            \\tn--;\\n            }\\n            if(slowNode.next != null)\\n            \\tslowNode.next = slowNode.next.next;\\n            return headNode.next;\\n        }"
		},
		{
			"lc_ans_id":"9090",
			"view":"2401",
			"top":"6",
			"title":"My simple Java solution in one pass",
			"vote":"16",
			"content":"     public ListNode removeNthFromEnd(ListNode head, int n) {\\n        ListNode dummy=new ListNode(0);\\n        dummy.next=head;\\n        ListNode fast=dummy;\\n        ListNode slow=dummy;\\n        int temp=n;\\n        for(;fast.next!=null;temp--){\\n            if(temp<=0){ //control\\n                slow=slow.next;\\n            }\\n            fast=fast.next;\\n        }\\n        slow.next=slow.next.next;//delete Nth\\n        return dummy.next;\\n    }"
		},
		{
			"lc_ans_id":"9000",
			"view":"1628",
			"top":"7",
			"title":"A simple 2ms C solution",
			"vote":"16",
			"content":"struct ListNode *removeNthFromEnd(struct ListNode *head, int n) {\\n\\n    struct ListNode* front = head;\\n    struct ListNode* behind = head;\\n    \\n    while (front != NULL) {\\n        front = front->next;\\n        \\n        if (n-- < 0) behind = behind->next;\\n    }\\n    if (n == 0) head = head->next;\\n    else behind->next = behind->next->next;\\n    return head;\\n}"
		},
		{
			"lc_ans_id":"9028",
			"view":"1277",
			"top":"8",
			"title":"My Java Solution",
			"vote":"11",
			"content":"    public ListNode removeNthFromEnd(ListNode head, int n) {\\n        ListNode voidHead = new ListNode(-1);\\n        voidHead.next = head;\\n        ListNode p1 = voidHead;\\n        ListNode p2 = voidHead;\\n        while (p1.next!=null){\\n            p1=p1.next;\\n            if (n--<=0)p2=p2.next;\\n        }\\n        if (p2.next!=null) p2.next=p2.next.next;\\n        return voidHead.next;\\n    }"
		},
		{
			"lc_ans_id":"9040",
			"view":"1584",
			"top":"9",
			"title":"Simple one pass 4ms C++ implementation",
			"vote":"9",
			"content":"    class Solution {\\n    public:\\n        ListNode* removeNthFromEnd(ListNode* head, int n) {\\n            ListNode realHead(0);\\n            realHead.next = head;\\n            head = &realHead;\\n            ListNode *curr = &realHead;\\n            while (n-- > 0)\\n                curr = curr->next;\\n            while (curr->next != nullptr) {\\n                curr = curr->next;\\n                head = head->next;\\n            }\\n    \\n            head->next = head->next->next;\\n            return realHead.next;\\n        }\\n    };"
		}
	],
	"id":"19",
	"title":"Remove Nth Node From End of List",
	"content":"<p>Given a linked list, remove the <em>n</em><sup>th</sup> node from the end of list and return its head.</p>\r\n\r\n<p>For example,</p>\r\n\r\n<pre>\r\n   Given linked list: <strong>1-&gt;2-&gt;3-&gt;4-&gt;5</strong>, and <strong><em>n</em> = 2</strong>.\r\n\r\n   After removing the second node from the end, the linked list becomes <strong>1-&gt;2-&gt;3-&gt;5</strong>.\r\n</pre>\r\n\r\n<p><strong>Note:</strong><br />\r\nGiven <em>n</em> will always be valid.<br />\r\nTry to do this in one pass.</p>\r\n",
	"frequency":"462",
	"ac_num":"222412"
}