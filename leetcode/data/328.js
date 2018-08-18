{
	"difficulty":"2",
	"submit_num":"191022",
	"show_id":"328",
	"leetcode_id":"328",
	"answers":[
		{
			"lc_ans_id":"78079",
			"view":"26265",
			"top":"0",
			"title":"Simple O(N) time, O(1), space Java solution.",
			"vote":"159",
			"content":"    public class Solution {\\n    public ListNode oddEvenList(ListNode head) {\\n        if (head != null) {\\n        \\n            ListNode odd = head, even = head.next, evenHead = even; \\n        \\n            while (even != null && even.next != null) {\\n                odd.next = odd.next.next; \\n                even.next = even.next.next; \\n                odd = odd.next;\\n                even = even.next;\\n            }\\n            odd.next = evenHead; \\n        }\\n        return head;\\n    }}"
		},
		{
			"lc_ans_id":"78120",
			"view":"6164",
			"top":"1",
			"title":"Straigntforward Java solution, O(1) space, O(n) time",
			"vote":"44",
			"content":"    public ListNode oddEvenList(ListNode head) {\\n        if(head==null||head.next==null) return head;\\n        ListNode odd=head,ehead=head.next,even=ehead;\\n        while(even!=null&&even.next!=null){\\n            odd.next=even.next;\\n            odd=odd.next;\\n            even.next=odd.next;\\n            even=even.next;\\n        }\\n        odd.next=ehead;\\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"78078",
			"view":"6337",
			"top":"2",
			"title":"Simple C++ solution, O(n) time, O(1) space",
			"vote":"31",
			"content":"        ListNode* oddEvenList(ListNode* head) \\n        {\\n            if(!head) return head;\\n            ListNode *odd=head, *evenhead=head->next, *even = evenhead;\\n            while(even && even->next)\\n            {\\n                odd->next = odd->next->next;\\n                even->next = even->next->next;\\n                odd = odd->next;\\n                even = even->next;\\n            }\\n            odd->next = evenhead;\\n            return head;\\n        }"
		},
		{
			"lc_ans_id":"78197",
			"view":"4142",
			"top":"3",
			"title":"1ms Java Solution",
			"vote":"30",
			"content":"\\n    public class Solution {\\n        public ListNode oddEvenList(ListNode head) {\\n            if(head == null || head.next == null)\\n                return head;\\n            ListNode odd = head;\\n            ListNode even = head.next;\\n            ListNode evenHead = even;\\n            while(odd.next != null && even.next != null){\\n                odd.next = even.next;\\n                odd = odd.next;\\n                even.next = odd.next;\\n                even = even.next;\\n            }\\n            odd.next = evenHead;\\n            return head;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"78095",
			"view":"4842",
			"top":"4",
			"title":"Clear Python Solution",
			"vote":"23",
			"content":"    def oddEvenList(self, head):\\n        dummy1 = odd = ListNode(0)\\n        dummy2 = even = ListNode(0)\\n        while head:\\n            odd.next = head\\n            even.next = head.next\\n            odd = odd.next\\n            even = even.next\\n            head = head.next.next if even else None\\n        odd.next = dummy2.next\\n        return dummy1.next"
		},
		{
			"lc_ans_id":"78231",
			"view":"2167",
			"top":"5",
			"title":"Simple Java Solution with Explanation",
			"vote":"17",
			"content":"We just need to form a linked list of all odd nodes(X) and another linked list of all even nodes(Y). Afterwards, we link Y to the end of X, and return the head of X.\\n\\n    public ListNode oddEvenList(ListNode head) {\\n        if(head == null || head.next == null){\\n            return head;\\n        }\\n        ListNode odd = head;\\n        ListNode even = head.next;\\n        ListNode even_head = head.next;\\n        while(even != null && even.next != null){\\n            odd.next = odd.next.next;\\n            even.next = even.next.next;\\n            odd = odd.next;\\n            even = even.next;\\n        }\\n        odd.next = even_head;\\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"78274",
			"view":"1543",
			"top":"6",
			"title":"My c++ solution",
			"vote":"12",
			"content":"class Solution {\\npublic:\\n    ListNode* oddEvenList(ListNode* head) {\\n\\n\\n        if(head == NULL || head->next == NULL)\\n            return head;\\n        ListNode *odd = head;\\n        ListNode *even_head = head->next;\\n        ListNode *even = even_head;\\n        \\n        while(even != NULL && even->next != NULL)\\n        {\\n            odd->next = even->next;\\n            odd = odd->next;\\n            even->next = odd->next;\\n            even = even->next;\\n        }\\n        odd->next = even_head;\\n        return head;\\n    }\\n};"
		},
		{
			"lc_ans_id":"78190",
			"view":"836",
			"top":"7",
			"title":"Java in-place solution.",
			"vote":"8",
			"content":"        \\n    public ListNode oddEvenList(ListNode head) {\\n        if (head == null || head.next == null) {\\n            return head;\\n        }\\n        ListNode p1 = head, p2 = head.next, pre = p2;\\n        while (p2 != null && p2.next != null) {\\n            p1.next = p2.next;\\n            p1 = p1.next;\\n            p2.next = p1.next;\\n            p2 = p2.next;\\n        }\\n        p1.next = pre;\\n        return head;\\n    }"
		},
		{
			"lc_ans_id":"78123",
			"view":"1718",
			"top":"8",
			"title":"Python solution with two pointers O(N)",
			"vote":"8",
			"content":"    # Definition for singly-linked list.\\n    # class ListNode(object):\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.next = None\\n    \\n    class Solution(object):\\n        def oddEvenList(self, head):\\n            \"\"\"\\n            :type head: ListNode\\n            :rtype: ListNode\\n            \"\"\"\\n            if not head:\\n                return head\\n            odd=head\\n            even=head.next\\n            while even and even.next!=None:\\n                temp = even.next\\n                even.next = even.next.next\\n                temp.next = odd.next\\n                odd.next = temp\\n                odd=odd.next\\n                even=even.next\\n            return head\\n\\n\\nread in two node at a time: \\n\\nfirst node(odd) goes into odd.next \\n2nd node(even).next = next even node (node.next.next) \\n\\nrinse and repeat\\n\\nso basically\\n\\n1 - 2 - 3 - 4- 5- 6 -7-null \\nodd = 1 even = 2\\ntemp = 3 \\neven(2).next = even.next.next(4) \\ntemp(3).next=odd(1).next(2) \\n(this makes sure the end of odd always points to start of even) \\nodd(1).next = temp(3) \\nodd = odd.next(3) move the pointer \\neven = even.next(4) move the pointer\\n\\n1-3(odd)-2-4(even)-5-null\\n\\n1-3-5(odd)-2-4-null(even)\\n\\n1-3-5-7(odd)-2-4-6-null(even)"
		},
		{
			"lc_ans_id":"78194",
			"view":"1333",
			"top":"9",
			"title":"Java Solution better than 98% of solutions",
			"vote":"6",
			"content":"    /**\\n     * Definition for singly-linked list.\\n     * public class ListNode {\\n     *     int val;\\n     *     ListNode next;\\n     *     ListNode(int x) { val = x; }\\n     * }\\n     */\\n    public class Solution {\\n        public ListNode oddEvenList(ListNode head) {\\n            if(head != null){\\n                if(head.next == null || head.next.next == null){\\n                    return head;\\n                }\\n                else {\\n                    ListNode odd = head;\\n                    ListNode even = head.next;\\n                    ListNode even1 = head.next;\\n                    while (even != null && even.next != null) {\\n                        odd.next = even.next;\\n                        odd = odd.next;\\n                        even.next = odd.next;\\n                        even = even.next;\\n                    }\\n                    odd.next = even1 ;\\n                }\\n            }\\n            return head;\\n        }\\n    }"
		}
	],
	"id":"328",
	"title":"Odd Even Linked List",
	"content":"<p>Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes.</p>\r\n\r\n<p>You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.<p>\r\n\r\n<p>\r\n<b>Example:</b><br />\r\nGiven <code>1->2->3->4->5->NULL</code>,<br />\r\nreturn <code>1->3->5->2->4->NULL</code>.\r\n</p>\r\n<p>\r\n<b>Note:</b><br />\r\nThe relative order inside both the even and odd groups should remain as it was in the input. <br/>\r\nThe first node is considered odd, the second node even and so on ...\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://leetcode.com/discuss/user/DjangoUnchained\">@DjangoUnchained</a> for adding this problem and creating all test cases.</p>",
	"frequency":"546",
	"ac_num":"84875"
}