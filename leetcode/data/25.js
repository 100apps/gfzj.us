{
	"difficulty":"3",
	"submit_num":"372797",
	"show_id":"25",
	"leetcode_id":"25",
	"answers":[
		{
			"lc_ans_id":"11423",
			"view":"30646",
			"top":"0",
			"title":"Short but recursive Java code with comments",
			"vote":"156",
			"content":"Hi, guys!\\nDespite the fact that the approach is recursive, the code is less than 20 lines. :)\\n\\n    public ListNode reverseKGroup(ListNode head, int k) {\\n        ListNode curr = head;\\n        int count = 0;\\n        while (curr != null && count != k) { // find the k+1 node\\n            curr = curr.next;\\n            count++;\\n        }\\n        if (count == k) { // if k+1 node is found\\n            curr = reverseKGroup(curr, k); // reverse list with k+1 node as head\\n            // head - head-pointer to direct part, \\n            // curr - head-pointer to reversed part;\\n            while (count-- > 0) { // reverse current k-group: \\n                ListNode tmp = head.next; // tmp - next head in direct part\\n                head.next = curr; // preappending \"direct\" head to the reversed list \\n                curr = head; // move head of reversed part to a new node\\n                head = tmp; // move \"direct\" head to the next node in direct part\\n            }\\n            head = curr;\\n        }\\n        return head;\\n    }\\n\\nHope it helps!"
		},
		{
			"lc_ans_id":"11413",
			"view":"14663",
			"top":"1",
			"title":"Share my Java Solution with comments in line",
			"vote":"56",
			"content":"      \\n      public class Solution {\\n            public ListNode reverseKGroup(ListNode head, int k) {\\n                if (head==null||head.next==null||k<2) return head;\\n        \\n                ListNode dummy = new ListNode(0);\\n                dummy.next = head;\\n                \\n                ListNode tail = dummy, prev = dummy,temp;\\n                int count;\\n                while(true){\\n                    count =k;\\n                    while(count>0&&tail!=null){\\n                        count--;\\n                        tail=tail.next;\\n                    } \\n                    if (tail==null) break;//Has reached the end\\n                    \\n        \\n                    head=prev.next;//for next cycle\\n                // prev-->temp-->...--->....--->tail-->....\\n                // Delete @temp and insert to the next position of @tail\\n                // prev-->...-->...-->tail-->head-->...\\n                // Assign @temp to the next node of @prev\\n                // prev-->temp-->...-->tail-->...-->...\\n                // Keep doing until @tail is the next node of @prev\\n                    while(prev.next!=tail){\\n                        temp=prev.next;//Assign\\n                        prev.next=temp.next;//Delete\\n                        \\n                        temp.next=tail.next;\\n                        tail.next=temp;//Insert\\n                        \\n                    }\\n                    \\n                    tail=head;\\n                    prev=head;\\n                    \\n                }\\n                return dummy.next;\\n                \\n            }\\n        }"
		},
		{
			"lc_ans_id":"11457",
			"view":"12113",
			"top":"2",
			"title":"20-line iterative C++ solution",
			"vote":"48",
			"content":"    -1 -> 1 -> 2 -> 3 -> 4 -> 5\\n     |    |    |    | \\n    pre  cur  nex  tmp\\n\\n    -1 -> 2 -> 1 -> 3 -> 4 -> 5\\n     |         |    |    | \\n    pre       cur  nex  tmp\\n\\n    -1 -> 3 -> 2 -> 1 -> 4 -> 5\\n     |              |    |    | \\n    pre            cur  nex  tmp\\n\\n\\nAbove is how it works inside one group iteration(for example, k=3)\\n\\n    class Solution {\\n    public:\\n        ListNode *reverseKGroup(ListNode *head, int k) {\\n            if(head==NULL||k==1) return head;\\n            int num=0;\\n            ListNode *preheader = new ListNode(-1);\\n            preheader->next = head;\\n            ListNode *cur = preheader, *nex, *tmp, *pre = preheader;\\n            while(cur = cur->next) \\n                num++;\\n            while(num>=k) {\\n                cur = pre->next;\\n                nex = cur->next;\\n                for(int i=1;i<k;i++) {\\n                    tmp= nex->next;\\n                    nex->next = pre->next;\\n                    pre->next = nex;\\n                    cur->next = tmp;\\n                    nex = tmp;\\n                }\\n                pre = cur;\\n                num-=k;\\n            }\\n            return preheader->next;\\n        }\\n    };\\n\\nThanks to ciaoliang1992, the tmp pointer is no necessary, so the more concise solution is \\n\\n    class Solution {\\n    public:\\n        ListNode *reverseKGroup(ListNode *head, int k) {\\n            if(head==NULL||k==1) return head;\\n            int num=0;\\n            ListNode *preheader = new ListNode(-1);\\n            preheader->next = head;\\n            ListNode *cur = preheader, *nex, *pre = preheader;\\n            while(cur = cur->next) \\n                num++;\\n            while(num>=k) {\\n                cur = pre->next;\\n                nex = cur->next;\\n                for(int i=1;i<k;++i) {\\n                    cur->next=nex->next;\\n                    nex->next=pre->next;\\n                    pre->next=nex;\\n                    nex=cur->next;\\n                }\\n                pre = cur;\\n                num-=k;\\n            }\\n            return preheader->next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"11435",
			"view":"5490",
			"top":"3",
			"title":"C++ Elegant and Small",
			"vote":"30",
			"content":"    class Solution \\n    {\\n    public:\\n        \\n        ListNode* reverse(ListNode* first, ListNode* last)\\n        {\\n            ListNode* prev = last;\\n            \\n            while ( first != last )\\n            {\\n                auto tmp = first->next;\\n                first->next = prev;\\n                prev = first;\\n                first = tmp;\\n            }\\n            \\n            return prev;\\n        }\\n        \\n        ListNode* reverseKGroup(ListNode* head, int k) \\n        {\\n            auto node=head;\\n            for (int i=0; i < k; ++i)\\n            {\\n                if ( ! node  )\\n                    return head; // nothing to do list too sort\\n                node = node->next;\\n            }\\n    \\n            auto new_head = reverse( head, node);\\n            head->next = reverseKGroup( node, k);\\n            return new_head;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"11440",
			"view":"7440",
			"top":"4",
			"title":"Non-recursive Java solution and idea",
			"vote":"26",
			"content":"Reference: \\nhttp://www.cnblogs.com/lichen782/p/leetcode_Reverse_Nodes_in_kGroup.html\\n\\nFirst, build a function reverse() to reverse the ListNode between begin and end. See the explanation below:\\n\\n       /**\\n         * Reverse a link list between begin and end exclusively\\n         * an example:\\n         * a linked list:\\n         * 0->1->2->3->4->5->6\\n         * |           |   \\n         * begin       end\\n         * after call begin = reverse(begin, end)\\n         * \\n         * 0->3->2->1->4->5->6\\n         *          |  |\\n         *      begin end\\n         * @return the reversed list's 'begin' node, which is the precedence of node end\\n         */\\n\\nThen walk thru the linked list and apply reverse() iteratively. See the code below.\\n\\n    public ListNode reverseKGroup(ListNode head, int k) {\\n        ListNode begin;\\n        if (head==null || head.next ==null || k==1)\\n        \\treturn head;\\n        ListNode dummyhead = new ListNode(-1);\\n        dummyhead.next = head;\\n        begin = dummyhead;\\n        int i=0;\\n        while (head != null){\\n        \\ti++;\\n        \\tif (i%k == 0){\\n        \\t\\tbegin = reverse(begin, head.next);\\n        \\t\\thead = begin.next;\\n        \\t} else {\\n        \\t\\thead = head.next;\\n        \\t}\\n        }\\n        return dummyhead.next;\\n        \\n    }\\n    \\n    public ListNode reverse(ListNode begin, ListNode end){\\n    \\tListNode curr = begin.next;\\n    \\tListNode next, first;\\n    \\tListNode prev = begin;\\n    \\tfirst = curr;\\n    \\twhile (curr!=end){\\n    \\t\\tnext = curr.next;\\n    \\t\\tcurr.next = prev;\\n    \\t\\tprev = curr;\\n    \\t\\tcurr = next;\\n    \\t}\\n    \\tbegin.next = prev;\\n    \\tfirst.next = curr;\\n    \\treturn first;\\n    }"
		},
		{
			"lc_ans_id":"11491",
			"view":"2345",
			"top":"5",
			"title":"Succinct iterative Python, O(n) time O(1) space",
			"vote":"22",
			"content":"Use a dummy head, and\\n\\nl, r :          define reversing range\\n\\npre, cur :  used in reversing, standard reverse linked linked list method\\n\\njump :      used to connect last node in previous k-group to first node in following k-group\\n\\n    def reverseKGroup(self, head, k):\\n        dummy = jump = ListNode(0)\\n        dummy.next = l = r = head\\n        \\n        while True:\\n            count = 0\\n            while r and count < k:   # use r to locate the range\\n                r = r.next\\n                count += 1\\n            if count == k:  # if size k satisfied, reverse the inner linked list\\n                pre, cur = r, l\\n                for _ in range(k):\\n                    cur.next, cur, pre = pre, cur.next, cur  # standard reversing\\n                jump.next, jump, l = pre, l, r  # connect two k-groups\\n            else:\\n                return dummy.next"
		},
		{
			"lc_ans_id":"11543",
			"view":"2416",
			"top":"6",
			"title":"24ms Easy C++ Iterative Solution with Explanations",
			"vote":"13",
			"content":"Well, since the `head` pointer may also be modified, we create a `new_head` that points to it to facilitate the reverse process. \\n\\nFor the example list `1 -> 2 -> 3 -> 4 -> 5` in the problem statement, it will become `0 -> 1 -> 2 -> 3 -> 4 -> 5` (we init `new_head -> val` to be `0`). Then we set a pointer `pre` to `new_head` and another `cur` to `head`. Then we insert `cur -> next` after `pre` for `k - 1` times if the current node `cur` has at least `k` nodes after it (including itself). After reversing one `k`-group, we update `pre` to be `cur` and `cur` to be `pre -> next` to reverse the next `k`-group. \\n \\nThe code is as follows.\\n\\n    class Solution { \\n    public: \\n        ListNode* reverseKGroup(ListNode* head, int k) {\\n            if (!hasKNodes(head, k)) return head;\\n            ListNode* new_head = new ListNode(0);\\n            new_head -> next = head;\\n            ListNode* pre = new_head;\\n            ListNode* cur = head;\\n            while (hasKNodes(cur, k)) {\\n                for (int i = 0; i < k - 1; i++) {\\n                    ListNode* temp = pre -> next;\\n                    pre -> next = cur -> next;\\n                    cur -> next = cur -> next -> next;\\n                    pre -> next -> next = temp; \\n                }\\n                pre = cur;\\n                cur = pre -> next;\\n            }\\n            return new_head -> next;\\n        }\\n    private:\\n        bool hasKNodes(ListNode* node, int k) {\\n            int cnt = 0;\\n            while (node) {\\n                cnt++;\\n                if (cnt >= k) return true;\\n                node = node -> next;\\n            }\\n            return false; \\n        }\\n    };"
		},
		{
			"lc_ans_id":"11638",
			"view":"1478",
			"top":"7",
			"title":"Java O(n) elegant code solution",
			"vote":"10",
			"content":"  why use while(true) loop? We don't know if there is k nodes left out in advance. So we advance tail for k steps to check for that. If there is no k nodes, the program exits from there.\\n\\n \\n\\n     public class Solution {\\n            public ListNode reverseKGroup(ListNode head, int k) {\\n                if (k <= 1 || head == null || head.next == null)\\n                    return head;\\n                ListNode newHead = new ListNode(0);\\n                newHead.next = head;\\n                ListNode prev, start, then, tail;\\n                tail = prev = newHead;\\n                start = prev.next;\\n                while (true) {\\n                    // check if there's k nodes left-out\\n                    for (int i = 0; i < k; i++) {\\n                        tail = tail.next;\\n                        if (tail == null)\\n                            return newHead.next;\\n                    }\\n                    // reverse k nodes\\n                    for (int i = 0; i < k - 1; i++) {\\n                        then = start.next;\\n                        start.next = then.next;\\n                        then.next = prev.next;\\n                        prev.next = then;\\n                    }\\n                    tail = prev = start;\\n                    start = prev.next;\\n                }\\n            }\\n        }"
		},
		{
			"lc_ans_id":"11425",
			"view":"2350",
			"top":"8",
			"title":"Simple Python solution, one pass, no additional space, 109ms",
			"vote":"8",
			"content":"The key idea is to keep track of the `next_head` while reversing the group, `tail` of the current group is always the start node of the group, once the group reversing is done, `next_head` is available, simply connect it to `tail`. \\n\\n     \\n    def reverseKGroup(self, head, k):\\n        if head is None or k < 2:\\n            return head\\n        \\n        next_head = head\\n        for i in range(k - 1):\\n            next_head = next_head.next\\n            if next_head is None:\\n                return head\\n        ret = next_head\\n        \\n        current = head\\n        while next_head:\\n            tail = current\\n            prev = None\\n            for i in range(k):\\n                if next_head:\\n                    next_head = next_head.next\\n                _next = current.next\\n                current.next = prev\\n                prev = current\\n                current = _next\\n            tail.next = next_head or current\\n                \\n        return ret"
		},
		{
			"lc_ans_id":"11602",
			"view":"1092",
			"top":"9",
			"title":"4ms C Solution O(n) time and O(1) space",
			"vote":"7",
			"content":"Use a scout pointer to scan ahead. Once scout has passed k nodes, reverse this chain of k nodes just passed by scout. Initially, both first and current point to the beginning node of this chain. As each node in the chain following current is placed to the beginning of the chain, first is adjusted to always point to the beginning of the chain, while current moves down the chain (since nodes are placed before it). (k-1) nodes need to be moved during each chain reversing. The reversed chain is connected to the previous node (which always points to the one node before the just reversed chain). current (which points to the end of the chain now) is moved forward to the place of scout, count is reset to 0, and scout can now resume scanning forward. : )\\n\\n    struct ListNode* reverseKGroup(struct ListNode* head, int k) {\\n        \\n        struct ListNode *current, *previous, *scout;\\n        int count;\\n        \\n        scout = current = head;\\n        previous = NULL;\\n        count = 0;\\n    \\n        while (scout) {\\n            \\n            ++count;\\n    \\n            if (k > 1 && count == k) {\\n                \\n                scout = scout->next;\\n                struct ListNode *first, *following;\\n                first = current;\\n                \\n                while (count-- > 1) {\\n                    \\n                    following = current->next;\\n                    current->next = following->next;\\n                    following->next = first;\\n                    first = following;\\n                }\\n                \\n                if (previous)\\n                    previous->next = first;\\n                else\\n                    head = first;\\n                    \\n                previous = current;\\n                current = scout;\\n                count = 0;\\n            }\\n            else\\n                scout = scout->next;\\n        }\\n        \\n        return head;\\n    }"
		}
	],
	"id":"25",
	"title":"Reverse Nodes in k-Group",
	"content":"<p>\r\nGiven a linked list, reverse the nodes of a linked list <i>k</i> at a time and return its modified list.\r\n</p>\r\n\r\n<p>\r\n<i>k</i> is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of <i>k</i> then left-out nodes in the end should remain as it is.</p>\r\n\r\n<p>You may not alter the values in the nodes, only nodes itself may be changed.</p>\r\n\r\n<p>Only constant memory is allowed.</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven this linked list: <code>1->2->3->4->5</code>\r\n</p>\r\n\r\n<p>\r\nFor <i>k</i> = 2, you should return: <code>2->1->4->3->5</code>\r\n</p>\r\n\r\n<p>\r\nFor <i>k</i> = 3, you should return: <code>3->2->1->4->5</code>\r\n</p>",
	"frequency":"369",
	"ac_num":"116440"
}