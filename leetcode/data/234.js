{
	"difficulty":"1",
	"submit_num":"424077",
	"show_id":"234",
	"leetcode_id":"234",
	"answers":[
		{
			"lc_ans_id":"64493",
			"view":"59351",
			"top":"0",
			"title":"Reversing a list is not considered \"O(1) space\"",
			"vote":"215",
			"content":"It is a common misunderstanding that the space complexity of a program is just how much the size of additional memory space being used besides input. An important prerequisite is neglected the above definition: [the input has to be read-only][1]. By definition, changing the input and change it back is not allowed (or the input size should be counted when doing so). Another way of determining the space complexity of a program is to simply look at how much space it has written to. Reversing a singly linked list requires writing to O(n) memory space, thus the space complexities for all \"reverse-the-list\"-based approaches are O(n), not O(1).\\n\\nSolving this problem in O(1) space is theoretically impossible due to two simple facts: (1) a program using O(1) space is computationally equivalent to a finite automata, or a regular expression checker; (2) [the pumping lemma][2] states that the set of palindrome strings does not form a regular set.\\n\\nPlease change the incorrect problem statement.\\n\\n\\n  [1]: https://en.wikipedia.org/wiki/DSPACE#Machine_models\\n  [2]: https://en.wikipedia.org/wiki/Pumping_lemma_for_regular_languages"
		},
		{
			"lc_ans_id":"64500",
			"view":"36684",
			"top":"1",
			"title":"11 lines, 12 with restore, O(n) time, O(1) space",
			"vote":"117",
			"content":"O(n) time, O(1) space. The second solution restores the list after changing it.\\n\\n---\\n\\n**Solution 1: *Reversed first half == Second half?***\\n\\nPhase 1: Reverse the first half while finding the middle.  \\nPhase 2: Compare the reversed first half with the second half.\\n\\n    def isPalindrome(self, head):\\n        rev = None\\n        slow = fast = head\\n        while fast and fast.next:\\n            fast = fast.next.next\\n            rev, rev.next, slow = slow, rev, slow.next\\n        if fast:\\n            slow = slow.next\\n        while rev and rev.val == slow.val:\\n            slow = slow.next\\n            rev = rev.next\\n        return not rev\\n\\n---\\n\\n**Solution 2: *Play Nice***\\n\\nSame as the above, but while comparing the two halves, restore the list to its original state by reversing the first half back. Not that the OJ or anyone else cares.\\n\\n    def isPalindrome(self, head):\\n        rev = None\\n        fast = head\\n        while fast and fast.next:\\n            fast = fast.next.next\\n            rev, rev.next, head = head, rev, head.next\\n        tail = head.next if fast else head\\n        isPali = True\\n        while rev:\\n            isPali = isPali and rev.val == tail.val\\n            head, head.next, rev = rev, head, rev.next\\n            tail = tail.next\\n        return isPali"
		},
		{
			"lc_ans_id":"64489",
			"view":"36309",
			"top":"2",
			"title":"Share my C++ solution, O(n) time and O(1) memory",
			"vote":"114",
			"content":"    class Solution {\\n    public:\\n        bool isPalindrome(ListNode* head) {\\n            if(head==NULL||head->next==NULL)\\n                return true;\\n            ListNode* slow=head;\\n            ListNode* fast=head;\\n            while(fast->next!=NULL&&fast->next->next!=NULL){\\n                slow=slow->next;\\n                fast=fast->next->next;\\n            }\\n            slow->next=reverseList(slow->next);\\n            slow=slow->next;\\n            while(slow!=NULL){\\n                if(head->val!=slow->val)\\n                    return false;\\n                head=head->next;\\n                slow=slow->next;\\n            }\\n            return true;\\n        }\\n        ListNode* reverseList(ListNode* head) {\\n            ListNode* pre=NULL;\\n            ListNode* next=NULL;\\n            while(head!=NULL){\\n                next=head->next;\\n                head->next=pre;\\n                pre=head;\\n                head=next;\\n            }\\n            return pre;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"64501",
			"view":"31821",
			"top":"3",
			"title":"Java, easy to understand",
			"vote":"100",
			"content":"This can be solved by reversing the 2nd half and compare the two halves. Let's start with an example `[1, 1, 2, 1]`.\\n\\nIn the beginning, set two pointers `fast` and `slow` starting at the head.\\n\\n    1 -> 1 -> 2 -> 1 -> null \\n    sf\\n\\n(1) **Move:** `fast` pointer goes to the end, and `slow` goes to the middle.\\n\\n    1 -> 1 -> 2 -> 1 -> null \\n              s          f\\n(2) **Reverse:** the right half is reversed, and `slow` pointer becomes the 2nd head.\\n\\n    1 -> 1    null <- 2 <- 1           \\n    h                      s\\n\\n(3) **Compare:** run the two pointers `head` and `slow` together and compare.\\n\\n    1 -> 1    null <- 2 <- 1             \\n         h            s\\n\\n<hr>\\n\\n    public boolean isPalindrome(ListNode head) {\\n        ListNode fast = head, slow = head;\\n        while (fast != null && fast.next != null) {\\n            fast = fast.next.next;\\n            slow = slow.next;\\n        }\\n        if (fast != null) { // odd nodes: let right half smaller\\n            slow = slow.next;\\n        }\\n        slow = reverse(slow);\\n        fast = head;\\n        \\n        while (slow != null) {\\n            if (fast.val != slow.val) {\\n                return false;\\n            }\\n            fast = fast.next;\\n            slow = slow.next;\\n        }\\n        return true;\\n    }\\n    \\n    public ListNode reverse(ListNode head) {\\n        ListNode prev = null;\\n        while (head != null) {\\n            ListNode next = head.next;\\n            head.next = prev;\\n            prev = head;\\n            head = next;\\n        }\\n        return prev;\\n    }"
		},
		{
			"lc_ans_id":"64490",
			"view":"8525",
			"top":"4",
			"title":"My easy understand C++ solution",
			"vote":"79",
			"content":"    class Solution {\\n    public:\\n        ListNode* temp;\\n        bool isPalindrome(ListNode* head) {\\n            temp = head;\\n            return check(head);\\n        }\\n        \\n        bool check(ListNode* p) {\\n            if (NULL == p) return true;\\n            bool isPal = check(p->next) & (temp->val == p->val);\\n            temp = temp->next;\\n            return isPal;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"64573",
			"view":"24892",
			"top":"5",
			"title":"Easy understand JAVA solution (O(1) space cost)",
			"vote":"58",
			"content":"    /**\\n     * Definition for singly-linked list.\\n     * public class ListNode {\\n     *     int val;\\n     *     ListNode next;\\n     *     ListNode(int x) { val = x; }\\n     * }\\n     */\\n    public class Solution {\\n        public boolean isPalindrome(ListNode head) {\\n            if(head == null) {\\n                return true;\\n            }\\n            ListNode p1 = head;\\n            ListNode p2 = head;\\n            ListNode p3 = p1.next;\\n            ListNode pre = p1;\\n            //find mid pointer, and reverse head half part\\n            while(p2.next != null && p2.next.next != null) {\\n                p2 = p2.next.next;\\n                pre = p1;\\n                p1 = p3;\\n                p3 = p3.next;\\n                p1.next = pre;\\n            }\\n    \\n            //odd number of elements, need left move p1 one step\\n            if(p2.next == null) {\\n                p1 = p1.next;\\n            }\\n            else {   //even number of elements, do nothing\\n                \\n            }\\n            //compare from mid to head/tail\\n            while(p3 != null) {\\n                if(p1.val != p3.val) {\\n                    return false;\\n                }\\n                p1 = p1.next;\\n                p3 = p3.next;\\n            }\\n            return true;\\n            \\n        }\\n    }"
		},
		{
			"lc_ans_id":"64689",
			"view":"4650",
			"top":"6",
			"title":"Python easy to understand solution with comments (operate nodes directly).",
			"vote":"33",
			"content":"    def isPalindrome(self, head):\\n        fast = slow = head\\n        # find the mid node\\n        while fast and fast.next:\\n            fast = fast.next.next\\n            slow = slow.next\\n        # reverse the second half\\n        node = None\\n        while slow:\\n            nxt = slow.next\\n            slow.next = node\\n            node = slow\\n            slow = nxt\\n        # compare the first and second half nodes\\n        while node: # while node and head:\\n            if node.val != head.val:\\n                return False\\n            node = node.next\\n            head = head.next\\n        return True"
		},
		{
			"lc_ans_id":"64679",
			"view":"4935",
			"top":"7",
			"title":"If you want O(n) time and O(1) space, this problem should not be an 'easy' one.",
			"vote":"17",
			"content":"For an O(n)-O(1) answer, the common idea can be summarized as:\\n\\n1.  find the middle.\\n2.  reverse half of the list (reverse the latter half would be more comprehensible).\\n3.  easily check for palindromic-ness as if it's a double-link list.\\n4.  restore the reversed half\\n\\n\\n\\n    class Solution {\\npublic:\\n    inline void reverse(ListNode* head) {\\n        ListNode *node1, *node2, *node3;\\n        node1 = head;\\n        node2 = node1->next;\\n        node1->next = NULL;\\n        while(node2)\\n        {\\n            node3 = node2->next;\\n            node2->next = node1;\\n            node1 = node2;\\n            node2 = node3;\\n        }\\n    }\\n    \\n    bool isPalindrome(ListNode* head) {\\n        \\n        // lengths 0, 1 are palindrome\\n        if(!head || !head->next)\\n        {\\n            return true;\\n        }\\n        \\n        // length 2 goes simple judging\\n        if(!head->next->next)\\n        {\\n            return head->val == head->next->val;\\n        }\\n\\n        // step 1: find middle and tail nodes\\n        ListNode *middle, *rbegin;\\n        middle = rbegin = head;\\n        while(rbegin->next)\\n        {\\n            if(rbegin->next->next)\\n            {\\n                middle = middle->next;\\n                rbegin = rbegin->next->next;\\n            }\\n            else\\n            {\\n                rbegin = rbegin->next;\\n            }\\n        }\\n        \\n        // step 2: reverse the latter half\\n        reverse(middle->next);\\n\\n        // step 3: check for palindrome\\n        bool result = true;\\n        ListNode* node1 = head;\\n        ListNode* node2 = rbegin;\\n        while(node2)\\n        {\\n            if(node1->val != node2->val)\\n            {\\n                result = false;\\n                break;\\n            }\\n            \\n            node1 = node1->next;\\n            node2 = node2->next;\\n        }\\n        \\n        // step 4: restore the reversed latter half\\n        reverse(rbegin);\\n\\n        return result;\\n    }\\n};"
		},
		{
			"lc_ans_id":"64532",
			"view":"3286",
			"top":"8",
			"title":"Share my Java answer",
			"vote":"15",
			"content":"    public class Solution {\\n        ListNode h;\\n        public boolean isPalindrome(ListNode head) {\\n            if (head == null) return true;\\n        \\n            if (h == null) h = head;\\n\\n            boolean tmp = true;        \\n            if (head.next != null) tmp &= isPalindrome(head.next);\\n        \\n            tmp &= (head.val == h.val);\\n            h = h.next;\\n            return tmp;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"64533",
			"view":"4624",
			"top":"9",
			"title":"Concise O(N), O(N) Java Solution without reversing the list",
			"vote":"13",
			"content":"***Sorry, Since it's a recursive algorithm, it uses O(N) space. Thanks for pointing out this.***\\n\\n  \\n\\n    public class Solution {\\n    public ListNode root;\\n    public boolean isPalindrome(ListNode head) {\\n        root = head;\\n        return (head == null) ? true : _isPalindrome(head);\\n    }\\n    \\n    public boolean _isPalindrome(ListNode head) {\\n        boolean flag = true;\\n        if (head.next != null) {\\n            flag = _isPalindrome(head.next);\\n        }\\n        if (flag && root.val == head.val) {\\n            root = root.next;\\n            return true;\\n        }\\n        return false;\\n    }\\n}"
		}
	],
	"id":"234",
	"title":"Palindrome Linked List",
	"content":"<p>Given a singly linked list, determine if it is a palindrome.</p>\r\n\r\n<p><b>Follow up:</b><br>\r\nCould you do it in O(n) time and O(1) space?</p>",
	"frequency":"533",
	"ac_num":"141355"
}