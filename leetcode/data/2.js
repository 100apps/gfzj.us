{
	"difficulty":"2",
	"submit_num":"1505652",
	"show_id":"2",
	"leetcode_id":"2",
	"answers":[
		{
			"lc_ans_id":"1010",
			"view":"81654",
			"top":"0",
			"title":"Is this Algorithm optimal or what?",
			"vote":"297",
			"content":"    public class Solution {\\n        public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n            ListNode c1 = l1;\\n            ListNode c2 = l2;\\n            ListNode sentinel = new ListNode(0);\\n            ListNode d = sentinel;\\n            int sum = 0;\\n            while (c1 != null || c2 != null) {\\n                sum /= 10;\\n                if (c1 != null) {\\n                    sum += c1.val;\\n                    c1 = c1.next;\\n                }\\n                if (c2 != null) {\\n                    sum += c2.val;\\n                    c2 = c2.next;\\n                }\\n                d.next = new ListNode(sum % 10);\\n                d = d.next;\\n            }\\n            if (sum / 10 == 1)\\n                d.next = new ListNode(1);\\n            return sentinel.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"997",
			"view":"36749",
			"top":"1",
			"title":"[c++] Sharing my 11-line c++ solution, can someone make it even more concise?",
			"vote":"129",
			"content":"    ListNode *addTwoNumbers(ListNode *l1, ListNode *l2) {\\n        ListNode preHead(0), *p = &preHead;\\n        int extra = 0;\\n        while (l1 || l2 || extra) {\\n            int sum = (l1 ? l1->val : 0) + (l2 ? l2->val : 0) + extra;\\n            extra = sum / 10;\\n            p->next = new ListNode(sum % 10);\\n            p = p->next;\\n            l1 = l1 ? l1->next : l1;\\n            l2 = l2 ? l2->next : l2;\\n        }\\n        return preHead.next;\\n    }"
		},
		{
			"lc_ans_id":"1003",
			"view":"17470",
			"top":"2",
			"title":"Don't understand the question",
			"vote":"71",
			"content":"Look at the example input : (2->4->3)+(5->6->4), why the output is the single link list 7->0->8. How do those numbers calculated?"
		},
		{
			"lc_ans_id":"1059",
			"view":"41991",
			"top":"3",
			"title":"My accepted Java solution",
			"vote":"69",
			"content":"Two things to make the code simple:\\n\\n 1. Whenever one of the two *ListNode* is null, replace it with 0.\\n 2. Keep the while loop going when at least one of the three conditions is met.\\n\\nLet me know if there is something wrong. Thanks.\\n\\n    public class Solution {\\n        public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n            ListNode prev = new ListNode(0);\\n            ListNode head = prev;\\n            int carry = 0;\\n            while (l1 != null || l2 != null || carry != 0) {\\n                ListNode cur = new ListNode(0);\\n                int sum = ((l2 == null) ? 0 : l2.val) + ((l1 == null) ? 0 : l1.val) + carry;\\n                cur.val = sum % 10;\\n                carry = sum / 10;\\n                prev.next = cur;\\n                prev = cur;\\n                \\n                l1 = (l1 == null) ? l1 : l1.next;\\n                l2 = (l2 == null) ? l2 : l2.next;\\n            }\\n            return head.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"1016",
			"view":"31605",
			"top":"4",
			"title":"Clear python code, straight forward",
			"vote":"57",
			"content":"    class Solution:\\n    # @return a ListNode\\n    def addTwoNumbers(self, l1, l2):\\n        carry = 0\\n        root = n = ListNode(0)\\n        while l1 or l2 or carry:\\n            v1 = v2 = 0\\n            if l1:\\n                v1 = l1.val\\n                l1 = l1.next\\n            if l2:\\n                v2 = l2.val\\n                l2 = l2.next\\n            carry, val = divmod(v1+v2+carry, 10)\\n            n.next = ListNode(val)\\n            n = n.next\\n        return root.next"
		},
		{
			"lc_ans_id":"1032",
			"view":"6273",
			"top":"5",
			"title":"Python concise solution.",
			"vote":"32",
			"content":"        \\n    def addTwoNumbers(self, l1, l2):\\n        dummy = cur = ListNode(0)\\n        carry = 0\\n        while l1 or l2 or carry:\\n            if l1:\\n                carry += l1.val\\n                l1 = l1.next\\n            if l2:\\n                carry += l2.val\\n                l2 = l2.next\\n            cur.next = ListNode(carry%10)\\n            cur = cur.next\\n            carry //= 10\\n        return dummy.next"
		},
		{
			"lc_ans_id":"1044",
			"view":"4627",
			"top":"6",
			"title":"Java concise solution.",
			"vote":"28",
			"content":"        \\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n        int carry = 0;\\n        ListNode p, dummy = new ListNode(0);\\n        p = dummy;\\n        while (l1 != null || l2 != null || carry != 0) {\\n            if (l1 != null) {\\n                carry += l1.val;\\n                l1 = l1.next;\\n            }\\n            if (l2 != null) {\\n                carry += l2.val;\\n                l2 = l2.next;\\n            }\\n            p.next = new ListNode(carry%10);\\n            carry /= 10;\\n            p = p.next;\\n        }\\n        return dummy.next;\\n    }"
		},
		{
			"lc_ans_id":"1102",
			"view":"3864",
			"top":"7",
			"title":"Python for the win",
			"vote":"28",
			"content":"Python supports arbitrarily large integers, so I can safely turn the two lists into ints, add them, and turn the sum into a list.\\n\\n    class Solution:\\n        def addTwoNumbers(self, l1, l2):\\n            def toint(node):\\n                return node.val + 10 * toint(node.next) if node else 0\\n            def tolist(n):\\n                node = ListNode(n % 10)\\n                if n > 9:\\n                    node.next = tolist(n / 10)\\n                return node\\n            return tolist(toint(l1) + toint(l2))\\n\\nIterative `tolist` instead of recursive:\\n\\n    class Solution:\\n        def addTwoNumbers(self, l1, l2):\\n            def toint(node):\\n                return node.val + 10 * toint(node.next) if node else 0\\n            n = toint(l1) + toint(l2)\\n            first = last = ListNode(n % 10)\\n            while n > 9:\\n                n /= 10\\n                last.next = last = ListNode(n % 10)\\n            return first\\n\\nAnd a very different solution that could sum arbitrarily many addends, not just two:\\n\\n    class Solution:\\n        def addTwoNumbers(self, l1, l2):\\n            addends = l1, l2\\n            dummy = end = ListNode(0)\\n            carry = 0\\n            while addends or carry:\\n                carry += sum(a.val for a in addends)\\n                addends = [a.next for a in addends if a.next]\\n                end.next = end = ListNode(carry % 10)\\n                carry /= 10\\n            return dummy.next"
		},
		{
			"lc_ans_id":"1182",
			"view":"13288",
			"top":"8",
			"title":"4ms 11lines java solution",
			"vote":"27",
			"content":"    public class Solution {\\n        public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\\n            ListNode ln1 = l1, ln2 = l2, head = null, node = null;\\n            int carry = 0, remainder = 0, sum = 0;\\n            head = node = new ListNode(0);\\n            \\n            while(ln1 != null || ln2 != null || carry != 0) {\\n                sum = (ln1 != null ? ln1.val : 0) + (ln2 != null ? ln2.val : 0) + carry;\\n                carry = sum / 10;\\n                remainder = sum % 10;\\n                node = node.next = new ListNode(remainder);\\n                ln1 = (ln1 != null ? ln1.next : null);\\n                ln2 = (ln2 != null ? ln2.next : null);\\n            }\\n            return head.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"1519",
			"view":"4240",
			"top":"9",
			"title":"C++ solution, easy to understand",
			"vote":"21",
			"content":"The trick is, when two lists are not equally long, pad the shorter one with zero values. In this way, you don't have to handle the remaining sublist.\\n\\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\\n        ListNode *head = NULL, *prev = NULL;\\n        int carry = 0;\\n        while (l1 || l2) {\\n            int v1 = l1? l1->val: 0;\\n            int v2 = l2? l2->val: 0;\\n            int tmp = v1 + v2 + carry;\\n            carry = tmp / 10;\\n            int val = tmp % 10;\\n            ListNode* cur = new ListNode(val);\\n            if (!head) head = cur;\\n            if (prev) prev->next = cur;\\n            prev = cur;\\n            l1 = l1? l1->next: NULL;\\n            l2 = l2? l2->next: NULL;\\n        }\\n        if (carry > 0) {\\n            ListNode* l = new ListNode(carry);\\n            prev->next = l;\\n        }\\n        return head;\\n    }"
		}
	],
	"id":"2",
	"title":"Add Two Numbers",
	"content":"<p>You are given two <b>non-empty</b> linked lists representing two non-negative integers. The digits are stored in <b>reverse order</b> and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.</p>\r\n\r\n<p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>\r\n\r\n<p>\r\n<b>Example</b>\r\n<pre>\r\n<b>Input:</b> (2 -> 4 -> 3) + (5 -> 6 -> 4)\r\n<b>Output:</b> 7 -> 0 -> 8\r\n<b>Explanation:</b> 342 + 465 = 807.\r\n</pre>\r\n</p>",
	"frequency":"630",
	"ac_num":"427097"
}