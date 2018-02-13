{
	"difficulty":"1",
	"submit_num":"645338",
	"show_id":"141",
	"leetcode_id":"141",
	"answers":[
		{
			"lc_ans_id":"44489",
			"view":"44960",
			"top":"0",
			"title":"O(1) Space Solution",
			"vote":"178",
			"content":"```\\npublic boolean hasCycle(ListNode head) {\\n    if(head==null) return false;\\n    ListNode walker = head;\\n    ListNode runner = head;\\n    while(runner.next!=null && runner.next.next!=null) {\\n        walker = walker.next;\\n        runner = runner.next.next;\\n        if(walker==runner) return true;\\n    }\\n    return false;\\n}\\n```\\n 1. Use two pointers, **walker** and **runner**.\\n 2. **walker** moves step by step. **runner** moves two steps at time.\\n 3. if the Linked List has a cycle **walker** and **runner** will meet at some\\n    point."
		},
		{
			"lc_ans_id":"44494",
			"view":"11769",
			"top":"1",
			"title":"Except-ionally fast Python",
			"vote":"83",
			"content":"Took 88 ms and the \"Accepted Solutions Runtime Distribution\" doesn't show any faster Python submissions. The \"trick\" is to not check all the time whether we have reached the end but to handle it via an exception. [\"Easier to ask for forgiveness than permission.\"](https://docs.python.org/3/glossary.html#term-eafp)\\n\\nThe algorithm is of course [Tortoise and hare](https://en.wikipedia.org/wiki/Cycle_detection#Tortoise_and_hare).\\n\\n    def hasCycle(self, head):\\n        try:\\n            slow = head\\n            fast = head.next\\n            while slow is not fast:\\n                slow = slow.next\\n                fast = fast.next.next\\n            return True\\n        except:\\n            return False"
		},
		{
			"lc_ans_id":"44604",
			"view":"15390",
			"top":"2",
			"title":"My faster and slower runner solution",
			"vote":"46",
			"content":"    /**\\n     * Definition for singly-linked list.\\n     * struct ListNode {\\n     *     int val;\\n     *     ListNode *next;\\n     *     ListNode(int x) : val(x), next(NULL) {}\\n     * };\\n     */\\n     /**\\n     use faster and lower runner solution. (2 pointers)\\n     the faster one move 2 steps, and slower one move only one step.\\n     if there's a circle, the faster one will finally \"catch\" the slower one. \\n     (the distance between these 2 pointers will decrease one every time.)\\n     \\n     if there's no circle, the faster runner will reach the end of linked list. (NULL)\\n     */\\n    class Solution {\\n    public:\\n        bool hasCycle(ListNode *head) {\\n            if(head == NULL || head -> next == NULL)    \\n                return false;\\n     \\n            ListNode *fast = head;\\n            ListNode *slow = head;\\n            \\n            while(fast -> next && fast -> next -> next){\\n                fast = fast -> next -> next;\\n                slow = slow -> next;\\n                if(fast == slow)\\n                    return true;\\n            }\\n     \\n            return false;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"44502",
			"view":"9291",
			"top":"3",
			"title":"By saying using no extra space, does it mean O(0) in space?",
			"vote":"31",
			"content":"I cannot give a solution to make it possible. I can only do it in O(1) space using the two runner solution, which I think is the best one.\\n\\n    \\n\\n    // set two runners\\n    ListNode slow = head;\\n    ListNode fast = head;\\n    \\n    // fast runner move 2 steps at one time while slow runner move 1 step,\\n    // if traverse to a null, there must be no loop\\n    while (fast != null && fast.next != null) {\\n    \\tslow = slow.next;\\n    \\tfast = fast.next.next;\\n    \\tif (slow == fast) {\\n    \\t\\treturn true;\\n    \\t}\\n    }\\n    return false;"
		},
		{
			"lc_ans_id":"44485",
			"view":"9510",
			"top":"4",
			"title":"Simple and easy understanding java solution, Time  o(n) ,Space O(1)",
			"vote":"29",
			"content":"    public class Solution {\\n        public boolean hasCycle(ListNode head) {\\n        \\tListNode p = head,pre = head;\\n        \\twhile(p != null && p.next != null){\\n        \\t\\tif (p.next == head) return true;\\n        \\t\\tp = p.next;\\n        \\t\\tpre.next = head;\\n        \\t\\tpre = p;\\n        \\t}\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"44603",
			"view":"4470",
			"top":"5",
			"title":"Shorter Solution in Java",
			"vote":"24",
			"content":"    class HasCycleInLinkedList{\\n       public boolean hasCycle(ListNode head){\\n           if(head == null || head.next == null) return false;\\n           if(head.next == head) return true;\\n           ListNode nextNode = head.next; \\n           head.next = head;\\n           boolean isCycle = hasCycle(nextNode);\\n           return isCycle;\\n       }\\n    }"
		},
		{
			"lc_ans_id":"44636",
			"view":"1418",
			"top":"6",
			"title":"Accepted 6-line code in C",
			"vote":"16",
			"content":"    bool hasCycle(struct ListNode *head) {\\n        struct ListNode *fast=head, *slow=head;\\n        while( slow && fast && fast->next ){\\n            fast=fast->next->next;\\n            slow=slow->next;\\n            if(fast==slow) return true;\\n        }\\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"44539",
			"view":"1804",
			"top":"7",
			"title":"AC Python 76ms Floyd loop detection in 7 lines",
			"vote":"15",
			"content":"    def hasCycle(self, head):\\n        slow = fast = head\\n        while fast and fast.next:\\n            fast = fast.next.next\\n            slow = slow.next\\n            if slow == fast:\\n                return True\\n        return False\\n\\n    # 16 / 16 test cases passed.\\n    # Status: Accepted\\n    # Runtime: 76 ms\\n    # 96.56%\\n\\n\\nThis way we do not need to check if head is null."
		},
		{
			"lc_ans_id":"44690",
			"view":"2761",
			"top":"8",
			"title":"My easy 12ms C++ solution sharing.",
			"vote":"14",
			"content":"    bool hasCycle(ListNode *head) \\n    {\\n        ListNode *fast;\\n        fast = head;\\n        while (head)\\n        {\\n            head = head->next;\\n            if (fast->next && fast->next->next)\\n                fast = fast->next->next;\\n            else\\n                return false;\\n                \\n            if (fast == head)\\n                return true;\\n        }\\n        \\n        return false;\\n    }"
		},
		{
			"lc_ans_id":"44498",
			"view":"2236",
			"top":"9",
			"title":"Just reverse the list",
			"vote":"13",
			"content":"    ListNode* reverseList(ListNode* head) \\n    {\\n    \\tListNode* prev = NULL;\\n    \\tListNode* follow = NULL;\\n    \\twhile (head)\\n    \\t{\\n    \\t\\tfollow = head->next;\\n    \\t\\thead->next = prev;\\n    \\t\\tprev = head;\\n    \\t\\thead = follow;\\n    \\t}\\n\\t    return prev;\\n    }\\n    bool hasCycle(ListNode *head)\\n    {\\n    \\tListNode* rev = reverseList(head);\\n    \\tif (head && head->next && rev == head)\\n    \\t{\\n    \\t\\treturn true;\\n    \\t}\\n    \\treturn false;\\n    }\\n\\nif the list has got a loop, then its reversed version must have got the same head pointer as its self;"
		}
	],
	"id":"141",
	"title":"Linked List Cycle",
	"content":"<p>\r\nGiven a linked list, determine if it has a cycle in it.\r\n</p>\r\n\r\n<p>\r\nFollow up:<br />\r\nCan you solve it without using extra space?\r\n</p>",
	"frequency":"588",
	"ac_num":"227040"
}