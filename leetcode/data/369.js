{
	"difficulty":"2",
	"submit_num":"36629",
	"show_id":"369",
	"leetcode_id":"369",
	"answers":[
		{
			"lc_ans_id":"84125",
			"view":"9448",
			"top":"0",
			"title":"Iterative Two-Pointers with dummy node Java O(n) time, O(1) space",
			"vote":"83",
			"content":"    public class Solution {\\n        public ListNode plusOne(ListNode head) {\\n            ListNode dummy = new ListNode(0);\\n            dummy.next = head;\\n            ListNode i = dummy;\\n            ListNode j = dummy;\\n            \\n            while (j.next != null) {\\n                j = j.next;\\n                if (j.val != 9) {\\n                    i = j;\\n                }\\n            }\\n            \\n            if (j.val != 9) {\\n                j.val++;\\n            } else {\\n                i.val++;\\n                i = i.next;\\n                while (i != null) {\\n                    i.val = 0;\\n                    i = i.next;\\n                }\\n            }\\n            \\n            if (dummy.val == 0) {\\n                return dummy.next;\\n            }\\n            \\n            return dummy;\\n        }\\n    }\\n\\n- i stands for the most significant digit that is going to be incremented if there exists a carry\\n- dummy node can handle cases such as \"9->9>-9\" automatically"
		},
		{
			"lc_ans_id":"84130",
			"view":"5242",
			"top":"1",
			"title":"Java recursive solution",
			"vote":"30",
			"content":"At the first glance, I want to reverse the inputs, add one, then reverse back. But that is too intuitive and I don't think this is an expected solution. Then what kind of alg would adding one in reverse way for list?\\n\\nRecursion! With recursion, we can visit list in reverse way! So here is my recursive solution.\\n\\n\\n    public ListNode plusOne(ListNode head) {\\n        if( DFS(head) == 0){\\n            return head;\\n        }else{\\n            ListNode newHead = new ListNode(1);\\n            newHead.next = head;\\n            return newHead;\\n        }\\n    }\\n    \\n    public int DFS(ListNode head){\\n        if(head == null) return 1;\\n        \\n        int carry = DFS(head.next);\\n        \\n        if(carry == 0) return 0;\\n        \\n        int val = head.val + 1;\\n        head.val = val%10;\\n        return val/10;\\n    }"
		},
		{
			"lc_ans_id":"84150",
			"view":"2893",
			"top":"2",
			"title":"Two-Pointers Java Solution: O(n) time, O(1) space",
			"vote":"24",
			"content":"    public class Solution {\\n        public ListNode plusOne(ListNode head) {\\n            ListNode dummy = new ListNode(0);\\n            dummy.next = head;\\n            ListNode i = dummy;\\n            ListNode j = dummy;\\n    \\n            while (j.next != null) {\\n                j = j.next;\\n                if (j.val != 9) {\\n                    i = j;\\n                }\\n            }\\n            // i = index of last non-9 digit\\n        \\n            i.val++;\\n            i = i.next;\\n            while (i != null) {\\n                i.val = 0;\\n                i = i.next;\\n            }\\n            \\n            if (dummy.val == 0) return dummy.next;\\n            return dummy;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"84139",
			"view":"3095",
			"top":"3",
			"title":"Short reverse+increase+reverse",
			"vote":"10",
			"content":"Inspired by others I had to try it myself...\\n\\n---\\n\\nSolution 1, reverse and then increase while reversing back\\n-\\n\\n    def plusOne(self, head):\\n        tail = None\\n        while head:\\n            head.next, head, tail = tail, head.next, head\\n        carry = 1\\n        while tail:\\n            carry, tail.val = divmod(carry + tail.val, 10)\\n            if carry and not tail.next:\\n                tail.next = ListNode(0)\\n            tail.next, tail, head = head, tail.next, tail\\n        return head\\n\\n---\\n\\nSolution 2, with pure reverse helper\\n-\\n\\n    def plusOne(self, head):\\n        def reverse(head):\\n            rev = None\\n            while head:\\n                head.next, head, rev = rev, head.next, head\\n            return rev\\n        head = node = reverse(head)\\n        while node.val == 9:\\n            node.val = 0\\n            node.next = node = node.next or ListNode(0)\\n        node.val += 1\\n        return reverse(head)\\n\\n---\\n\\nIf you don't like that bottom while-loop, here's a more normal way I guess:\\n\\n        while node.val == 9:\\n            node.val = 0\\n            if not node.next:\\n                node.next = ListNode(0)\\n            node = node.next"
		},
		{
			"lc_ans_id":"84145",
			"view":"1212",
			"top":"4",
			"title":"Python simple iterative solution beats 95%, no reverse, O(1) space",
			"vote":"7",
			"content":"Here is the code:\\n\\n\\n    def plusOne(self, head):\\n        \"\"\"\\n        :type head: ListNode\\n        :rtype: ListNode\\n        \"\"\"\\n        start = None\\n        \\n        node = head\\n        while node:\\n            if node.val < 9:\\n                start = node\\n            node = node.next\\n        \\n        if start:\\n            start.val += 1\\n            node = start.next\\n        else:\\n            new = ListNode(1)\\n            new.next = head\\n            node = head\\n            head = new\\n                \\n        while node:\\n            node.val = 0\\n            node = node.next\\n        \\n        return head"
		},
		{
			"lc_ans_id":"84118",
			"view":"2436",
			"top":"5",
			"title":"9 lines recursive *without* helper",
			"vote":"6",
			"content":"If the +1 was already handled without further carry, then the result is the given head node. Otherwise it's a new node (with carry value 1). In other words, a carry-node is created at the end and gets carried towards the front until it has been fully integrated.\\n\\n---\\n\\n**Python**\\n\\n    def plusOne(self, head):\\n        if not head:\\n            return ListNode(1)\\n        plused = self.plusOne(head.next)\\n        head.val += plused != head.next\\n        if head.val <= 9:\\n            return head\\n        head.val = 0\\n        plused.next = head\\n        return plused\\n\\n---\\n\\n**C++**\\n\\n    ListNode* plusOne(ListNode* head) {\\n        if (!head)\\n            return new ListNode(1);\\n        auto plused = plusOne(head->next);\\n        head->val += plused != head->next;\\n        if (head->val <= 9)\\n            return head;\\n        head->val = 0;\\n        plused->next = head;\\n        return plused;\\n    }\\n\\n---\\n\\n**Java**\\n\\n    public ListNode plusOne(ListNode head) {\\n        if (head == null)\\n            return new ListNode(1);\\n        ListNode plused = plusOne(head.next);\\n        if (plused != head.next)\\n            head.val++;\\n        if (head.val <= 9)\\n            return head;\\n        head.val = 0;\\n        plused.next = head;\\n        return plused;\\n    }\\n\\n---\\n\\n**Ruby**\\n\\n    def plus_one(head)\\n      head or return ListNode.new(1)\\n      plused = plus_one(head.next)\\n      head.val += 1 if plused != head.next\\n      return head if head.val <= 9\\n      head.val = 0\\n      plused.next = head\\n      plused\\n    end"
		},
		{
			"lc_ans_id":"84172",
			"view":"783",
			"top":"6",
			"title":"No-reverse, Simple'n'Clean Recursive Python solution",
			"vote":"3",
			"content":"    class Solution(object):\\n        def plusOne(self, head):\\n            def add(head):\\n                if not head:\\n                    return 1\\n                head.val += add(head.next)\\n                carry, head.val = divmod(head.val, 10)\\n                return carry\\n                \\n            carry = add(head)\\n            if carry and head:\\n                addc = ListNode(1)\\n                addc.next = head\\n                head = addc\\n            return head"
		},
		{
			"lc_ans_id":"84191",
			"view":"1181",
			"top":"7",
			"title":"Reverse, plus one, then reverse",
			"vote":"2",
			"content":"easy understanding and fast\\n\\n    public class Solution {\\n        public ListNode plusOne(ListNode head) {\\n            head = reverse(head);\\n            ListNode dummy = new ListNode(0);\\n            dummy.next = head;\\n            ListNode x = dummy;\\n            int carry = 1;\\n            while (carry > 0 || x.next != null) {\\n                if (x.next != null) {\\n                    x = x.next;\\n                    carry += x.val;\\n                    x.val = carry % 10;\\n                    carry /= 10;\\n                }\\n                else {\\n                    x.next = new ListNode(carry);\\n                    x = x.next;\\n                    carry = 0;\\n                }\\n            }\\n            return reverse(dummy.next);\\n        }\\n        \\n        private ListNode reverse(ListNode head) {\\n            ListNode tail = null;\\n            while (head != null) {\\n                ListNode temp = head.next;\\n                head.next = tail;\\n                tail = head;\\n                head = temp;\\n            }\\n            return tail;\\n        }\\n\\n}"
		},
		{
			"lc_ans_id":"84186",
			"view":"481",
			"top":"8",
			"title":"Java elegant backtracking O(n) time O(n) stack space with comments",
			"vote":"2",
			"content":" No extra space is allocated except for the stack space for recursive calls\\n.No need to reverse the linked list or change its next pointer, the structure of the list might be immutable.\\n\\n       public class Solution {\\n            public ListNode plusOne(ListNode head) {\\n                if (plusOneHelper(head) == 0) {\\n                    return head;\\n                }\\n                //need addtional node\\n                ListNode newHead = new ListNode(1);\\n                newHead.next = head;\\n                return newHead;\\n            }\\n            \\n            // plus one for the rest of the list starting from node and return carry\\n         //because last node.next is null, let null return 1 and it is equivalent to  \"plus one\" to the least significant digit\\n       \\n            private int plusOneHelper(ListNode node) {\\n                if (node == null) {\\n                    return 1;\\n                }\\n                int sum = node.val + plusOneHelper(node.next);\\n                node.val = sum % 10;\\n                return sum / 10;\\n            }\\n        }"
		},
		{
			"lc_ans_id":"84117",
			"view":"82",
			"top":"9",
			"title":"Reverse list, add, Reverse list / T : O(N), S : O(1)",
			"vote":"1",
			"content":"```\\npublic ListNode plusOne(ListNode head) {\\n        // Reverse linkedlist\\n        ListNode newhead = reverse(head);\\n        ListNode cur = newhead;\\n        cur.val = cur.val + 1;\\n        while(cur.val > 9) {\\n            cur.val = 0;\\n            if(cur.next == null) cur.next = new ListNode(0);\\n            cur = cur.next;\\n            cur.val += 1;\\n        }\\n        \\n        return reverse(newhead);\\n    }\\n    \\n    public ListNode reverse(ListNode head){\\n        ListNode pre = null;\\n        while(head != null){\\n            ListNode next = head.next;\\n            head.next = pre;\\n            pre = head;\\n            head = next;\\n        }\\n        return pre;\\n    }\\n```"
		}
	],
	"id":"369",
	"title":"Plus One Linked List",
	"content":"<p>Given a non-negative integer represented as <b>non-empty</b> a singly linked list of digits, plus one to the integer.</p>\r\n\r\n<p>You may assume the integer do not contain any leading zero, except the number 0 itself.</p>\r\n\r\n<p>The digits are stored such that the most significant digit is at the head of the list.</p>\r\n\r\n<p><b>Example:</b><br />\r\n<pre>\r\nInput:\r\n1->2->3\r\n\r\nOutput:\r\n1->2->4\r\n</pre>\r\n</p>",
	"frequency":"63",
	"ac_num":"20171"
}