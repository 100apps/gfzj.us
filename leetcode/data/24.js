{
	"difficulty":"2",
	"submit_num":"510365",
	"show_id":"24",
	"leetcode_id":"24",
	"answers":[
		{
			"lc_ans_id":"11030",
			"view":"27630",
			"top":"0",
			"title":"My accepted java code. used recursion.",
			"vote":"154",
			"content":"    public class Solution {\\n        public ListNode swapPairs(ListNode head) {\\n            if ((head == null)||(head.next == null))\\n                return head;\\n            ListNode n = head.next;\\n            head.next = swapPairs(head.next.next);\\n            n.next = head;\\n            return n;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"11046",
			"view":"23734",
			"top":"1",
			"title":"My simple JAVA solution for share",
			"vote":"131",
			"content":"    public ListNode swapPairs(ListNode head) {\\n        ListNode dummy = new ListNode(0);\\n        dummy.next = head;\\n        ListNode current = dummy;\\n        while (current.next != null && current.next.next != null) {\\n            ListNode first = current.next;\\n            ListNode second = current.next.next;\\n            first.next = second.next;\\n            current.next = second;\\n            current.next.next = first;\\n            current = current.next.next;\\n        }\\n        return dummy.next;\\n    }"
		},
		{
			"lc_ans_id":"11019",
			"view":"20159",
			"top":"2",
			"title":"7-8 lines C++ / Python / Ruby",
			"vote":"82",
			"content":"Three different implementations of the same algorithm, taking advantage of different strengths of the three languages. I suggest reading all three, even if you don't know all three languages.\\n\\nAll three of course work swap the current node with the next node by rearranging pointers, then move on to the next pair, and repeat until the end of the list.\\n\\n---\\n\\n**C++**\\n\\nPointer-pointer `pp`  points to the pointer to the current node. So at first, `pp` points to `head`, and later it points to the `next` field of ListNodes. Additionally, for convenience and clarity, pointers `a` and `b` point to the current node and the next node.\\n\\nWe need to go from `*pp == a -> b -> (b->next)` to `*pp == b -> a -> (b->next)`. The first three lines inside the loop do that, setting those three pointers (from right to left). The fourth line moves `pp` to the next pair.\\n\\n    ListNode* swapPairs(ListNode* head) {\\n        ListNode **pp = &head, *a, *b;\\n        while ((a = *pp) && (b = a->next)) {\\n            a->next = b->next;\\n            b->next = a;\\n            *pp = b;\\n            pp = &(a->next);\\n        }\\n        return head;\\n    }\\n\\n---\\n\\n**Python**\\n\\nHere, `pre` is the previous node. Since the head doesn't have a previous node, I just use `self` instead. Again, `a` is the current node and `b` is the next node.\\n\\nTo go from `pre -> a -> b -> b.next` to `pre -> b -> a -> b.next`, we need to change those three references. Instead of thinking about in what order I change them, I just change all three at once.\\n\\n    def swapPairs(self, head):\\n        pre, pre.next = self, head\\n        while pre.next and pre.next.next:\\n            a = pre.next\\n            b = a.next\\n            pre.next, b.next, a.next = b, a, b.next\\n            pre = a\\n        return self.next\\n\\n---\\n\\n**Ruby**\\n\\nAgain, `pre` is the previous node, but here I create a dummy as previous node of the head. And again, `a` is the current node and `b` is the next node. This time I go one node further and call it `c`.\\n\\nTo go from `pre -> a -> b -> c` to `pre -> b -> a -> c`, we need to change those three references. Here I chain the assignments, pretty much directly saying \"`pre` points to `b`, which points to `a`, which points to `c`\".\\n\\n    def swap_pairs(head)\\n        pre = dummy = ListNode.new 0\\n        pre.next = head\\n        while a = pre.next and b = a.next\\n            c = b.next\\n            ((pre.next = b).next = a).next = c\\n            pre = a\\n        end\\n        dummy.next\\n    end"
		},
		{
			"lc_ans_id":"11111",
			"view":"4152",
			"top":"3",
			"title":"Java simple recursive solution",
			"vote":"28",
			"content":"Starting to see that recursion is the perfect tool for (many) linked list problems (this one + merging list problem).\\n\\n    /**\\n     * Definition for singly-linked list.\\n     * public class ListNode {\\n     *     int val;\\n     *     ListNode next;\\n     *     ListNode(int x) { val = x; }\\n     * }\\n     */\\n    public class Solution {\\n        public ListNode swapPairs(ListNode head) {\\n            if (head == null || head.next == null) return head;\\n            ListNode second = head.next;\\n            ListNode third = second.next;\\n            \\n            second.next = head;\\n            head.next = swapPairs(third);\\n            \\n            return second;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"11320",
			"view":"4390",
			"top":"4",
			"title":"My simple recursive solution",
			"vote":"21",
			"content":"My solution is quite simple. Just find the reverse job is the same for every 2 nodes.\\n\\n    public ListNode swapPairs(ListNode head) {\\n            if (head == null || head.next == null) {\\n                return head;\\n            }\\n            \\n            ListNode newhd = head.next;\\n            head.next = swapPairs(newhd.next);\\n            newhd.next = head;\\n            return newhd;\\n    }"
		},
		{
			"lc_ans_id":"11028",
			"view":"3003",
			"top":"5",
			"title":"My straight-forward Java solution without recursion or dummy nodes (0ms)",
			"vote":"20",
			"content":"- The idea is straightforward: use two pointers and swap\\n - `a.next = b.next`, `b.next = a`.\\n - Then continue the next pair, `b = a.next.next`, `a=a.next`\\n - Remember to check `null`\\n - Remember to track new `head`\\n - Remember to link the new pair after the prior nodes. \\n\\nAttached is the accepted code.\\n\\n\\n    public class Solution {\\n      public ListNode swapPairs(ListNode head) {\\n        if(head==null || head.next==null) return head;\\n        ListNode newHead = head.next, a=head,b=a.next,pre = null;\\n        while(a!=null && b!=null){\\n          a.next = b.next;\\n          b.next = a;\\n          if(pre!=null) pre.next = b;\\n          if(a.next==null) break;\\n          b = a.next.next;\\n          pre = a;\\n          a = a.next;\\n        }\\n        return newHead;\\n      }\\n    }\\n\\n- AC, 0ms"
		},
		{
			"lc_ans_id":"11271",
			"view":"3502",
			"top":"6",
			"title":"Simple implementation with C++",
			"vote":"19",
			"content":"    class Solution {\\n    public:\\n        ListNode* swapPairs(ListNode* head) {\\n            if(head == NULL)\\n                return NULL;\\n            if(head->next == NULL)\\n                return head;\\n            \\n            ListNode* next = head->next;\\n            head->next = swapPairs(next->next);\\n            next->next = head;\\n            \\n            return next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"11236",
			"view":"1996",
			"top":"7",
			"title":"Very easy solution",
			"vote":"10",
			"content":"    class Solution {\\n    public:\\n        ListNode* swapPairs(ListNode* head) {\\n            ListNode *l=head;\\n            if(head&&head->next){\\n                l=head->next;\\n                head->next=swapPairs(l->next);\\n                l->next=head;\\n            }\\n            return l;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"11361",
			"view":"1595",
			"top":"8",
			"title":"Share my accepted Java solution",
			"vote":"10",
			"content":"    public class Solution {\\n        public ListNode swapPairs(ListNode head) {\\n            if (head == null || head.next == null) {\\n                return head;\\n            }\\n            ListNode first = head, last = head.next;\\n            first.next = swapPairs(last.next);\\n            last.next = first;\\n            return last;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"11216",
			"view":"2130",
			"top":"9",
			"title":"My accepted solution in Python, quite fast",
			"vote":"10",
			"content":"    class Solution:\\n        # @param a ListNode\\n        # @return a ListNode\\n        def swapPairs(self, head):\\n            p1 = guard = ListNode(0)\\n            guard.next = head\\n            \\n            try:\\n                while True:\\n                    p0, p1, p2 = p1, p1.next, p1.next.next\\n                    p0.next, p1.next, p2.next = p2, p2.next, p1\\n            except:\\n                return guard.next"
		}
	],
	"id":"24",
	"title":"Swap Nodes in Pairs",
	"content":"<p>\r\nGiven a linked list, swap every two adjacent nodes and return its head.\r\n</p>\r\n\r\n<p>\r\nFor example,<br />\r\nGiven <code>1->2->3->4</code>, you should return the list as <code>2->1->4->3</code>.\r\n</p>\r\n\r\n<p>\r\nYour algorithm should use only constant space. You may <b>not</b> modify the values in the list, only nodes itself can be changed.\r\n</p>",
	"frequency":"468",
	"ac_num":"198709"
}