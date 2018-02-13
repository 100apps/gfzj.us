{
	"difficulty":"2",
	"submit_num":"416647",
	"show_id":"92",
	"leetcode_id":"92",
	"answers":[
		{
			"lc_ans_id":"30666",
			"view":"32087",
			"top":"0",
			"title":"Simple Java solution with clear explanation",
			"vote":"227",
			"content":"Simply just reverse the list along the way using 4 pointers: dummy, pre, start, then\\n\\n    public ListNode reverseBetween(ListNode head, int m, int n) {\\n        if(head == null) return null;\\n        ListNode dummy = new ListNode(0); // create a dummy node to mark the head of this list\\n        dummy.next = head;\\n        ListNode pre = dummy; // make a pointer pre as a marker for the node before reversing\\n        for(int i = 0; i<m-1; i++) pre = pre.next;\\n        \\n        ListNode start = pre.next; // a pointer to the beginning of a sub-list that will be reversed\\n        ListNode then = start.next; // a pointer to a node that will be reversed\\n        \\n        // 1 - 2 -3 - 4 - 5 ; m=2; n =4 ---> pre = 1, start = 2, then = 3\\n        // dummy-> 1 -> 2 -> 3 -> 4 -> 5\\n        \\n        for(int i=0; i<n-m; i++)\\n        {\\n            start.next = then.next;\\n            then.next = pre.next;\\n            pre.next = then;\\n            then = start.next;\\n        }\\n        \\n        // first reversing : dummy->1 - 3 - 2 - 4 - 5; pre = 1, start = 2, then = 4\\n        // second reversing: dummy->1 - 4 - 3 - 2 - 5; pre = 1, start = 2, then = 5 (finish)\\n        \\n        return dummy.next;\\n        \\n    }"
		},
		{
			"lc_ans_id":"30744",
			"view":"10401",
			"top":"1",
			"title":"Share my 14 lines C++ solution",
			"vote":"45",
			"content":"     ListNode *reverseBetween(ListNode *head, int m, int n) {\\n        if(m==n)return head;\\n\\t\\tn-=m;\\n        ListNode prehead(0);\\n        prehead.next=head;\\n        ListNode* pre=&prehead;\\n        while(--m)pre=pre->next;        \\n        ListNode* pstart=pre->next;\\n        while(n--)\\n        {\\n            ListNode *p=pstart->next;\\n            pstart->next=p->next;\\n            p->next=pre->next;\\n            pre->next=p;\\n        }\\n        return prehead.next;\\n    }"
		},
		{
			"lc_ans_id":"30668",
			"view":"8681",
			"top":"2",
			"title":"12-lines 4ms C++",
			"vote":"35",
			"content":"The basic idea is as follows:\\n\\n(1) Create a `new_head` that points to `head` and use it to locate the immediate node before the `m`-th (notice that it is `1`-indexed) node `pre`;\\n \\n(2) Set `cur` to be the immediate node after `pre` and at each time move the immediate node after `cur` (named `move`) to be the immediate node after `pre`. Repeat it for `n - m` times.\\n\\n    class Solution {  \\n    public:\\n        ListNode* reverseBetween(ListNode* head, int m, int n) {\\n            ListNode* new_head = new ListNode(0);\\n            new_head -> next = head;\\n            ListNode* pre = new_head;\\n            for (int i = 0; i < m - 1; i++)\\n                pre = pre -> next;\\n            ListNode* cur = pre -> next;\\n            for (int i = 0; i < n - m; i++) {\\n                ListNode* move = cur -> next; \\n                cur -> next = move -> next;\\n                move -> next = pre -> next;\\n                pre -> next = move;\\n            }\\n            return new_head -> next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"30876",
			"view":"8603",
			"top":"3",
			"title":"Share my Java code",
			"vote":"25",
			"content":"The basic idea is to build a sub-list when we hit Node m by adding the subsequent nodes to the head of the sub-list one by one until we hit Node n. Then connect the nodes before Node m, the sub-list and the nodes following Node n. \\n\\n    public ListNode reverseBetween(ListNode head, int m, int n) {\\n    \\tListNode dummyhead = new ListNode(0);\\n    \\tdummyhead.next = head;\\n    \\tListNode sublisthead = new ListNode(0);\\n    \\tListNode sublisttail = new ListNode(0);\\n    \\tint count = 1;\\n    \\tListNode pre_cur = dummyhead, cur = head;\\n    \\twhile(count <=n){\\n\\t\\t\\tListNode temp = cur.next;\\n    \\t\\tif (count < m)\\n    \\t\\t\\tpre_cur = cur;\\n    \\t\\telse if (count == m){\\n    \\t\\t\\tsublisttail = cur;\\n    \\t\\t\\tsublisthead.next = cur;\\n    \\t\\t}else if (count > m){\\n    \\t\\t\\tcur.next = sublisthead.next;\\n    \\t\\t\\tsublisthead.next = cur;\\n    \\t\\t}\\n    \\t\\tcur = temp;\\n    \\t\\t++count;\\n    \\t}\\n    \\tpre_cur.next = sublisthead.next;\\n    \\tsublisttail.next = cur;\\n    \\treturn dummyhead.next;\\n    }"
		},
		{
			"lc_ans_id":"30672",
			"view":"5058",
			"top":"4",
			"title":"Python one pass iterative solution",
			"vote":"23",
			"content":"The idea is simple and intuitive: find linkedlist [m, n], reverse it, then connect m with n+1, connect n with m-1\\n\\n    \\n    class Solution:\\n        # @param head, a ListNode\\n        # @param m, an integer\\n        # @param n, an integer\\n        # @return a ListNode\\n        def reverseBetween(self, head, m, n):\\n            if m == n:\\n                return head\\n    \\n            dummyNode = ListNode(0)\\n            dummyNode.next = head\\n            pre = dummyNode\\n    \\n            for i in range(m - 1):\\n                pre = pre.next\\n            \\n            # reverse the [m, n] nodes\\n            reverse = None\\n            cur = pre.next\\n            for i in range(n - m + 1):\\n                next = cur.next\\n                cur.next = reverse\\n                reverse = cur\\n                cur = next\\n    \\n            pre.next.next = cur\\n            pre.next = reverse\\n    \\n            return dummyNode.next"
		},
		{
			"lc_ans_id":"30873",
			"view":"1969",
			"top":"5",
			"title":"240ms Java Solution",
			"vote":"15",
			"content":"    public class Solution {\\n        public ListNode reverseBetween(ListNode head, int m, int n) {\\n            ListNode dummy=new ListNode(0);\\n            dummy.next=head;\\n            ListNode pre=dummy; //pre is the node before orignal M\\n            ListNode M=head;    //M is after pre\\n            \\n            for(int i=1;i<m;i++){ //Move pre and M to orignal place\\n                pre=pre.next;\\n                M=M.next;\\n            }\\n            \\n            for(int i=0;i<n-m;i++){ \\n                ListNode current=M.next; //Both pre and M are all fixed, only current is assigned every time to M.next. M is pushed back everytime\\n                M.next=current.next;     //Move current to the position after pre\\n                current.next=pre.next;\\n                pre.next=current;\\n            }\\n            \\n            return dummy.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"30732",
			"view":"1258",
			"top":"6",
			"title":"Python implementation and detailed explanation",
			"vote":"14",
			"content":"For List with [1, 2, 3, 4, 5], supposed m ==  2 and n == 4\\n\\n**Step1:**\\nThe part I need to reversed is node 2 to node 4, which has `n - m + 1` = 3 nodes.\\nTherefore, I would like to maintain a window with `n - m + 1` nodes with the window's head `whead` and window's tail `wtail`, then if `whead` is head,  `wtail` would be the next `n-m` node from head.\\n\\n-  [123]45 => `whead` is 1 and `wtail` is 3\\n\\n**Step2:**\\nAnd to get to the right reversed portion we want, we need to shift the window `m-1` times\\n\\n- 1[234]5 => `whead` is 2 and `wtail` is 4\\n\\n**Step3:** Isolate the nodes inside the window, reverse the window as [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)\\n\\n**Step4:** combine the outside node with reversed node.\\nTo do so, I need to record the head outside the window `ohead`, and the tail outside the window `otail` \\n\\n- `ohead` is 1, `otail` is 5\\n- 1-[432]-5\\n\\n**Implementation detail:** Since in **step 4**, you need to let `ohead.next = reversed_head`If you create a dummy node, you can save some lines for m == 1 cases, where `ohead` would be `None` and `ohead.next` would fail the program.\\n\\n\\n    class Solution(object):\\n        def reverseBetween(self, head, m, n):\\n            if m >= n:\\n                return head\\n            #Step 1#    \\n            ohead = dummy = ListNode(0)\\n            whead = wtail = head\\n            dummy.next = head\\n            for i in range(n-m):\\n                wtail = wtail.next\\n            #Step 2#  \\n            for i in range(m-1):\\n                ohead, whead, wtail = whead, whead.next, wtail.next\\n            #Step 3#  \\n            otail, wtail.next = wtail.next, None\\n            revhead, revtail = self.reverse(whead)\\n            #Step 4#  \\n            ohead.next, revtail.next = revhead, otail\\n            return dummy.next\\n                \\n        def reverse(self, head):\\n            pre, cur, tail = None, head, head\\n            while cur:\\n                cur.next, pre, cur = pre, cur, cur.next\\n            return pre, tail"
		},
		{
			"lc_ans_id":"30667",
			"view":"1663",
			"top":"7",
			"title":"Easy understanding java solution",
			"vote":"13",
			"content":"    /**\\n     * Definition for singly-linked list.\\n     * public class ListNode {\\n     *     int val;\\n     *     ListNode next;\\n     *     ListNode(int x) { val = x; }\\n     * }\\n     */\\n    public class Solution {\\n        public ListNode reverseBetween(ListNode head, int m, int n) {\\n            ListNode dummy = new ListNode(0);\\n            dummy.next = head;\\n            //first part\\n            ListNode cur1 = dummy;\\n            ListNode pre1 = null;\\n            for(int i=0;i<m;i++){\\n                pre1 = cur1;\\n                cur1 = cur1.next;\\n            }\\n            \\n            //reverse\\n            ListNode cur2 = cur1;\\n            ListNode pre2 = pre1;\\n            ListNode q2;\\n            for(int i=m;i<=n;i++){\\n                q2 = cur2.next;\\n                cur2.next = pre2;\\n                pre2 = cur2;\\n                cur2 = q2;\\n            }\\n            \\n            //connect \\n            pre1.next = pre2;\\n            cur1.next = cur2;\\n            \\n            return dummy.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"30827",
			"view":"1485",
			"top":"8",
			"title":"C++ in 14 lines",
			"vote":"12",
			"content":"    class Solution {\\n    public:\\n        ListNode* reverseBetween(ListNode* head, int m, int n) {\\n            ListNode dummy(0);\\n            dummy.next = head;\\n            ListNode *slow = &dummy;\\n            n -= m;\\n            while (--m)\\n                slow = slow->next;\\n            ListNode *fast = slow->next, *tmp;\\n            while (n--) {\\n                tmp = fast->next;\\n                fast->next = fast->next->next;\\n                tmp->next = slow->next;\\n                slow->next = tmp;\\n            }\\n            return dummy.next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"30831",
			"view":"1565",
			"top":"9",
			"title":"Short Java Solution for Reverse Linked List II",
			"vote":"9",
			"content":"    public class Solution {\\n        public ListNode reverseBetween(ListNode head, int m, int n) {\\n            ListNode curr = new ListNode(0);\\n            curr.next = head;\\n            int k = n - m;\\n            int j = m;\\n            while(j > 1){\\n                curr = curr.next;\\n                j--;\\n            }\\n            ListNode reve = curr.next;\\n            while(k > 0){\\n                ListNode temp = reve.next;\\n                reve.next = reve.next.next;\\n                temp.next = curr.next;\\n                curr.next = temp;\\n                k--;\\n            }\\n            if(m == 1){\\n                head = curr.next;\\n            }\\n            return head;\\n        }\\n    }"
		}
	],
	"id":"92",
	"title":"Reverse Linked List II",
	"content":"<p>\r\nReverse a linked list from position <i>m</i> to <i>n</i>. Do it in-place and in one-pass.\r\n</p>\r\n\r\n<p>\r\nFor example:<br />\r\nGiven <code>1->2->3->4->5->NULL</code>, <i>m</i> = 2 and <i>n</i> = 4,\r\n</p>\r\n<p>\r\nreturn <code>1->4->3->2->5->NULL</code>.\r\n</p>\r\n<p>\r\n<b>Note:</b><br />\r\nGiven <i>m</i>, <i>n</i> satisfy the following condition:<br />\r\n1 &le; <i>m</i> &le; <i>n</i> &le; length of list.\r\n</p>",
	"frequency":"365",
	"ac_num":"129909"
}