{
	"difficulty":"1",
	"submit_num":"757015",
	"show_id":"21",
	"leetcode_id":"21",
	"answers":[
		{
			"lc_ans_id":"9713",
			"view":"47902",
			"top":"0",
			"title":"A recursive solution",
			"vote":"210",
			"content":"    class Solution {\\n    public:\\n        ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {\\n            if(l1 == NULL) return l2;\\n            if(l2 == NULL) return l1;\\n            \\n            if(l1->val < l2->val) {\\n                l1->next = mergeTwoLists(l1->next, l2);\\n                return l1;\\n            } else {\\n                l2->next = mergeTwoLists(l2->next, l1);\\n                return l2;\\n            }\\n        }\\n    };\\n\\n\\nThis solution is not a tail-recursive, the stack will overflow while the list is too long :)\\nhttp://en.wikipedia.org/wiki/Tail_call"
		},
		{
			"lc_ans_id":"9714",
			"view":"30396",
			"top":"1",
			"title":"14 line clean C++ Solution",
			"vote":"128",
			"content":"    class Solution {\\n    public:\\n        ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {\\n            ListNode dummy(INT_MIN);\\n            ListNode *tail = &dummy;\\n            \\n            while (l1 && l2) {\\n                if (l1->val < l2->val) {\\n                    tail->next = l1;\\n                    l1 = l1->next;\\n                } else {\\n                    tail->next = l2;\\n                    l2 = l2->next;\\n                }\\n                tail = tail->next;\\n            }\\n    \\n            tail->next = l1 ? l1 : l2;\\n            return dummy.next;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"9716",
			"view":"26178",
			"top":"2",
			"title":"My recursive way to solve this problem(JAVA, easy understanding)",
			"vote":"105",
			"content":"Hello every one, here is my code, simple but works well:\\n\\n    public class Solution {\\n        public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\\n            if(l1 == null){\\n                return l2;\\n            }\\n            if(l2 == null){\\n                return l1;\\n            }\\n            \\n            ListNode mergeHead;\\n            if(l1.val < l2.val){\\n                mergeHead = l1;\\n                mergeHead.next = mergeTwoLists(l1.next, l2);\\n            }\\n            else{\\n                mergeHead = l2;\\n                mergeHead.next = mergeTwoLists(l1, l2.next);\\n            }\\n            return mergeHead;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"9715",
			"view":"23929",
			"top":"3",
			"title":"Java, 1 ms, 4 lines codes, using recursion",
			"vote":"95",
			"content":"    public ListNode mergeTwoLists(ListNode l1, ListNode l2){\\n    \\t\\tif(l1 == null) return l2;\\n    \\t\\tif(l2 == null) return l1;\\n    \\t\\tif(l1.val < l2.val){\\n    \\t\\t\\tl1.next = mergeTwoLists(l1.next, l2);\\n    \\t\\t\\treturn l1;\\n    \\t\\t} else{\\n    \\t\\t\\tl2.next = mergeTwoLists(l1, l2.next);\\n    \\t\\t\\treturn l2;\\n    \\t\\t}\\n    }"
		},
		{
			"lc_ans_id":"9735",
			"view":"20135",
			"top":"4",
			"title":"Python solutions (iteratively, recursively, iteratively in-place).",
			"vote":"94",
			"content":"        \\n    \\n    # iteratively\\n    def mergeTwoLists1(self, l1, l2):\\n        dummy = cur = ListNode(0)\\n        while l1 and l2:\\n            if l1.val < l2.val:\\n                cur.next = l1\\n                l1 = l1.next\\n            else:\\n                cur.next = l2\\n                l2 = l2.next\\n            cur = cur.next\\n        cur.next = l1 or l2\\n        return dummy.next\\n        \\n    # recursively    \\n    def mergeTwoLists2(self, l1, l2):\\n        if not l1 or not l2:\\n            return l1 or l2\\n        if l1.val < l2.val:\\n            l1.next = self.mergeTwoLists(l1.next, l2)\\n            return l1\\n        else:\\n            l2.next = self.mergeTwoLists(l1, l2.next)\\n            return l2\\n            \\n    # in-place, iteratively        \\n    def mergeTwoLists(self, l1, l2):\\n        if None in (l1, l2):\\n            return l1 or l2\\n        dummy = cur = ListNode(0)\\n        dummy.next = l1\\n        while l1 and l2:\\n            if l1.val < l2.val:\\n                l1 = l1.next\\n            else:\\n                nxt = cur.next\\n                cur.next = l2\\n                tmp = l2.next\\n                l2.next = nxt\\n                l2 = tmp\\n            cur = cur.next\\n        cur.next = l1 or l2\\n        return dummy.next"
		},
		{
			"lc_ans_id":"9858",
			"view":"8602",
			"top":"5",
			"title":"Java solution for reference",
			"vote":"41",
			"content":"Similar to array, the difference is if any of two listnode is not null after first loop, we only need to add it as previous node's next and no need to add them one by one.\\n\\n\\n    public class Solution {\\n        public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\\n            if (l1 == null && l2 == null) {\\n                return null;\\n            }\\n            if (l1 == null) {\\n                return l2;\\n            }\\n            if (l2 == null) {\\n                return l1;\\n            }\\n            ListNode result = new ListNode(0);\\n            ListNode prev = result;\\n            while (l1 != null && l2 != null) {\\n                if (l1.val <= l2.val) {\\n                    prev.next = l1;\\n                    l1 = l1.next;\\n                } else {\\n                    prev.next = l2;\\n                    l2 = l2.next;\\n                }\\n                prev = prev.next;\\n            }\\n            if (l1 != null) {\\n                prev.next = l1;\\n            }\\n            if (l2 != null) {\\n                prev.next = l2;\\n            }\\n            return result.next;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"10065",
			"view":"5038",
			"top":"6",
			"title":"Clean, simple O(n+m) C++ Solution, without dummy head and recurtion",
			"vote":"40",
			"content":"Please refer to the comments inline.\\n\\n    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {\\n        \\n        if(NULL == l1) return l2;\\n        if(NULL == l2) return l1;\\n        \\n        ListNode* head=NULL;    // head of the list to return\\n        \\n        // find first element (can use dummy node to put this part inside of the loop)\\n        if(l1->val < l2->val)       { head = l1; l1 = l1->next; }\\n        else                        { head = l2; l2 = l2->next; }\\n        \\n        ListNode* p = head;     // pointer to form new list\\n        \\n        // I use && to remove extra IF from the loop\\n        while(l1 && l2){\\n            if(l1->val < l2->val)   { p->next = l1; l1 = l1->next; }\\n            else                    { p->next = l2; l2 = l2->next; }\\n            p=p->next;\\n        }\\n        \\n        // add the rest of the tail, done!\\n        if(l1)  p->next=l1;\\n        else    p->next=l2;\\n        \\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"9944",
			"view":"2382",
			"top":"7",
			"title":"Java recursive solution in 6 lines",
			"vote":"30",
			"content":"    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\\n        if (l1 == null) return l2;\\n        if (l2 == null) return l1;\\n        ListNode head = l1.val < l2.val ? l1 : l2;\\n        ListNode nonHead = l1.val < l2.val ? l2 : l1;\\n        \\n        head.next = mergeTwoLists(head.next, nonHead);\\n        \\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"9771",
			"view":"3280",
			"top":"8",
			"title":"Simple 5 lines Python",
			"vote":"28",
			"content":"**Solution 1**\\n\\nIf both lists are non-empty, I first make sure `a` starts smaller, use its head as result, and merge the remainders behind it. Otherwise, i.e., if one or both are empty, I just return what's there.\\n\\n    class Solution:\\n        def mergeTwoLists(self, a, b):\\n            if a and b:\\n                if a.val > b.val:\\n                    a, b = b, a\\n                a.next = self.mergeTwoLists(a.next, b)\\n            return a or b\\n\\n---\\n\\n**Solution 2**\\n\\nFirst make sure that `a` is the \"better\" one (meaning `b` is None or has larger/equal value). Then merge the remainders behind `a`.\\n\\n    def mergeTwoLists(self, a, b):\\n        if not a or b and a.val > b.val:\\n            a, b = b, a\\n        if a:\\n            a.next = self.mergeTwoLists(a.next, b)\\n        return a"
		},
		{
			"lc_ans_id":"9942",
			"view":"1822",
			"top":"9",
			"title":"Simple Recursive Java Solution",
			"vote":"23",
			"content":"    public class Solution {\\n    \\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\\n        if(l1 == null) return l2;\\n        if(l2 == null) return l1;\\n        \\n        if(l1.val < l2.val){\\n            l1.next = mergeTwoLists(l1.next, l2);\\n            return l1;\\n        }else{\\n            l2.next = mergeTwoLists(l1, l2.next);\\n            return l2;\\n        }\\n        \\n    }\\n}"
		}
	],
	"id":"21",
	"title":"Merge Two Sorted Lists",
	"content":"<p>Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\n<b>Input:</b> 1->2->4, 1->3->4\r\n<b>Output:</b> 1->1->2->3->4->4\r\n</pre>\r\n</p>",
	"frequency":"604",
	"ac_num":"303811"
}