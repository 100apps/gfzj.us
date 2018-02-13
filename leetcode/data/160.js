{
	"difficulty":"1",
	"submit_num":"551217",
	"show_id":"160",
	"leetcode_id":"160",
	"answers":[
		{
			"lc_ans_id":"49785",
			"view":"53741",
			"top":"0",
			"title":"Java solution without knowing the difference in len!",
			"vote":"604",
			"content":"I found most solutions here preprocess linkedlists to get the difference in len. \\nActually we don't care about the \"value\" of difference, we just want to make sure two pointers reach the intersection node at the same time.\\n\\nWe can use two iterations to do that. In the first iteration, we will reset the pointer of one linkedlist to the head of another linkedlist after it reaches the tail node. In the second iteration, we will move two pointers until they points to the same node. Our operations in first iteration will help us counteract the difference. So if two linkedlist intersects, the meeting point in second iteration must be the intersection point. If the two linked lists have no intersection at all, then the meeting pointer in second iteration must be the tail node of both lists, which is null\\n\\nBelow is my commented Java code:\\n\\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\\n        //boundary check\\n        if(headA == null || headB == null) return null;\\n        \\n        ListNode a = headA;\\n        ListNode b = headB;\\n        \\n        //if a & b have different len, then we will stop the loop after second iteration\\n        while( a != b){\\n        \\t//for the end of first iteration, we just reset the pointer to the head of another linkedlist\\n            a = a == null? headB : a.next;\\n            b = b == null? headA : b.next;    \\n        }\\n        \\n        return a;\\n    }"
		},
		{
			"lc_ans_id":"49789",
			"view":"32323",
			"top":"1",
			"title":"My accepted simple and shortest C++ code with comments explaining the algorithm.  Any comments or improvements?",
			"vote":"384",
			"content":"    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) \\n    {\\n        ListNode *p1 = headA;\\n        ListNode *p2 = headB;\\n            \\n        if (p1 == NULL || p2 == NULL) return NULL;\\n    \\n        while (p1 != NULL && p2 != NULL && p1 != p2) {\\n            p1 = p1->next;\\n            p2 = p2->next;\\n\\n            //\\n            // Any time they collide or reach end together without colliding \\n            // then return any one of the pointers.\\n            //\\n            if (p1 == p2) return p1;\\n\\n            //\\n            // If one of them reaches the end earlier then reuse it \\n            // by moving it to the beginning of other list.\\n            // Once both of them go through reassigning, \\n            // they will be equidistant from the collision point.\\n            //\\n            if (p1 == NULL) p1 = headB;\\n            if (p2 == NULL) p2 = headA;\\n        }\\n            \\n        return p1;\\n    }"
		},
		{
			"lc_ans_id":"49792",
			"view":"25761",
			"top":"2",
			"title":"Concise JAVA solution, O(1) memory O(n) time",
			"vote":"141",
			"content":"1, Get the length of the two lists.\\n\\n2, Align them to the same start point.\\n\\n3, Move them together until finding the intersection point, or the end null\\n\\n\\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\\n        int lenA = length(headA), lenB = length(headB);\\n        // move headA and headB to the same start point\\n        while (lenA > lenB) {\\n            headA = headA.next;\\n            lenA--;\\n        }\\n        while (lenA < lenB) {\\n            headB = headB.next;\\n            lenB--;\\n        }\\n        // find the intersection until end\\n        while (headA != headB) {\\n            headA = headA.next;\\n            headB = headB.next;\\n        }\\n        return headA;\\n    }\\n    \\n    private int length(ListNode node) {\\n        int length = 0;\\n        while (node != null) {\\n            node = node.next;\\n            length++;\\n        }\\n        return length;\\n    }"
		},
		{
			"lc_ans_id":"49799",
			"view":"14978",
			"top":"3",
			"title":"Simple C++ solution (5 lines)",
			"vote":"98",
			"content":"Move cur1 (cur2) forward from headA (headB) and loop back to headB (headA), eventually cur1 and cur2 will meet at the intersection point or nullptr.\\n\\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\\n        ListNode *cur1 = headA, *cur2 = headB;\\n        while(cur1 != cur2){\\n            cur1 = cur1?cur1->next:headB;\\n            cur2 = cur2?cur2->next:headA;\\n        }\\n        return cur1;\\n    }"
		},
		{
			"lc_ans_id":"49798",
			"view":"10106",
			"top":"4",
			"title":"Concise python code with comments",
			"vote":"87",
			"content":"    class Solution:\\n        # @param two ListNodes\\n        # @return the intersected ListNode\\n        def getIntersectionNode(self, headA, headB):\\n            if headA is None or headB is None:\\n                return None\\n    \\n            pa = headA # 2 pointers\\n            pb = headB\\n    \\n            while pa is not pb:\\n                # if either pointer hits the end, switch head and continue the second traversal, \\n                # if not hit the end, just move on to next\\n                pa = headB if pa is None else pa.next\\n                pb = headA if pb is None else pb.next\\n    \\n            return pa # only 2 ways to get out of the loop, they meet or the both hit the end=None\\n    \\n    # the idea is if you switch head, the possible difference between length would be countered. \\n    # On the second traversal, they either hit or miss. \\n    # if they meet, pa or pb would be the node we are looking for, \\n    # if they didn't meet, they will hit the end at the same iteration, pa == pb == None, return either one of them is the same,None"
		},
		{
			"lc_ans_id":"49805",
			"view":"7472",
			"top":"5",
			"title":"Share my simple java solution O(n) time, O(1) space",
			"vote":"65",
			"content":"1. Scan both lists\\n2. For each list once it reaches the end, continue scanning the other list\\n3. Once the two runner equal to each other, return the position\\n\\nTime O(n+m), space O(1)\\n\\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\\n    \\t\\tif( null==headA || null==headB )\\n    \\t\\t\\treturn null;\\n    \\t\\t\\n    \\t\\tListNode curA = headA, curB = headB;\\n    \\t\\twhile( curA!=curB){\\n    \\t\\t\\tcurA = curA==null?headB:curA.next;\\n    \\t\\t\\tcurB = curB==null?headA:curB.next;\\n    \\t\\t}\\n    \\t\\treturn curA;\\n        }"
		},
		{
			"lc_ans_id":"50030",
			"view":"3192",
			"top":"6",
			"title":"My C++ Accepted Solution with O(n) time and O(1) memory (72ms)",
			"vote":"34",
			"content":"The main idea of this solution is using the values of the intersecting nodes.\\n\\nFirst, calculate the total amount of value of nodes in listB.\\n\\nSecond, add 1 to all the nodes in listA.\\n\\nThird, re-calculate the total amount of value in listB.\\n\\nIf there exists some nodes intersecting, the re-calculated amount must be different from the previous one, otherwise, there is no any node intersecting. And we can also derive the first intersecting node through the difference between two amounts.\\n\\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\\n        ListNode *tmp = headB;\\n        int amoutB = 0,lengthB=0;\\n    \\n        //calculate the amount of values in listB and get the length of listB\\n        while (tmp!=NULL)\\n        {\\n            amoutB += tmp->val;\\n            lengthB ++;\\n            tmp = tmp->next;\\n        }\\n        \\n        //add 1 value to all nodes in listA\\n        tmp = headA;\\n        while (tmp!=NULL)\\n        {\\n            tmp->val++;\\n            tmp = tmp->next;\\n        }\\n        \\n        //re-calculate the amount of values in listB again\\n        tmp = headB;\\n        int newamoutB = 0;\\n        while (tmp!=NULL)\\n        {\\n            newamoutB += tmp->val;\\n            tmp = tmp->next;\\n        }\\n        tmp = headA;\\n    \\n        //subtract 1 from all the nodes in listA\\n        while (tmp!=NULL)\\n        {\\n            tmp->val--;\\n            tmp = tmp->next;\\n        }\\n        \\n        //if two amounts are the same, there is no node intersecting\\n        if(newamoutB==amoutB)\\n           return NULL;\\n        //the difference of two amounts means the number of intersecting nodes, \\n        //we can get the first one by comparing it with number of nodes in listB\\n        else\\n        {\\n            tmp = headB;\\n            for(int i=0; i<lengthB-(newamoutB-amoutB);i++)\\n                tmp = tmp->next;\\n            return tmp;\\n        }\\n    \\n    }"
		},
		{
			"lc_ans_id":"49800",
			"view":"1670",
			"top":"7",
			"title":"[recommend for beginners]clean C++ implementation with detailed explaination",
			"vote":"30",
			"content":"At the first glance, the problem seems a bit hard for me. Because I have no idea how to locate the meeting point of the 2 different linked-list. After seeing some related implementation. \\nI got the idea and let me explain the details for you:\\nWe set 2 pointers \"curA\" and \"curB\" to point to linked-list headA and headB.\\nThen set the \\n\\n         [#length of linked-list headA]=L1\\n\\n         [#length of linked-list headB]=L2\\n\\n         assuming that L1<L2\\n\\nso, the curA will first move the tail of the headA, we have moved step T=L1\\n\\nby setting the curA to headB we move the curA and the curB at the same time\\n\\n           [#distance-from-curB-to-tail]=L2-L1\\n\\nwhen we move the curB to the tail of the headB then we set the curB to the headA, at the same time, \\n\\n            [#distance-from-headB-to-curA]=L2-L1\\n\\nSo we have the\\n  \\n            [#distance-from-curB-to-meet-point] ==  [#distance-from-curA-to-meet-point]\\n\\nWe just move the curA and curB at the same time, then we get the meeting point .\\n\\nThe only corner cases happen when the 2 linked-list do not meet, so we need to return NULL once the \\n\\n          curA==NULL and curB==NULL before to change the curA and curB\\n\\nHere is my implementation .\\n\\n   \\n\\n     class Solution {\\n        public:\\n            ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\\n                if(!headA || !headB)    return NULL;\\n                ListNode *curA=headA, *curB=headB;\\n                while(curA && curB){\\n                    if(curA==curB)  return curA;\\n                    curA=curA->next;\\n                    curB=curB->next;\\n                    /*corner cases for my code :\\n                    when the 2 linked-list do not meet, all the 2 pointers will be NULL at the same time.\\n                    the 2 pointers can be NULL at the same time, if we continue processing, the loop will\\n                    never end*/\\n                    if(curA==curB)  return curA;\\n                    if(curA==NULL)  curA=headB;\\n                    if(curB==NULL)  curB=headA;\\n                }\\n                return curA;\\n            }\\n        };\\n\\n\\nPS: This post deserves your up votes !"
		},
		{
			"lc_ans_id":"49846",
			"view":"7764",
			"top":"8",
			"title":"Python solution for intersection of two singly linked lists",
			"vote":"30",
			"content":"    # Definition for singly-linked list.\\n    # class ListNode:\\n    #     def __init__(self, x):\\n    #         self.val = x\\n    #         self.next = None\\n    \\n    class Solution:\\n        # @param two ListNodes\\n        # @return the intersected ListNode\\n        def getIntersectionNode(self, headA, headB):\\n            curA,curB = headA,headB\\n            lenA,lenB = 0,0\\n            while curA is not None:\\n                lenA += 1\\n                curA = curA.next\\n            while curB is not None:\\n                lenB += 1\\n                curB = curB.next\\n            curA,curB = headA,headB\\n            if lenA > lenB:\\n                for i in range(lenA-lenB):\\n                    curA = curA.next\\n            elif lenB > lenA:\\n                for i in range(lenB-lenA):\\n                    curB = curB.next\\n            while curB != curA:\\n                curB = curB.next\\n                curA = curA.next\\n            return curA\\n\\n\\nThe solution is straightforward: maintaining two pointers in the lists under the constraint that both lists have the same number of nodes starting from the pointers. We need to calculate the length of each list though. So O(N) for time and O(1) for space."
		},
		{
			"lc_ans_id":"50020",
			"view":"2529",
			"top":"9",
			"title":"Stupid and short c++ solution without any list cycles O(N) time, O(1) memory",
			"vote":"22",
			"content":"Just  store addition information in 'next' pointers.\\nIt's work because memory alignment\\n\\n    \\x01ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\\n        for (ListNode *cur = headA; cur;) {\\n            unsigned long *ptr = (unsigned long *)&cur->next;\\n            cur = cur->next;\\n            *ptr |= 1;\\n        }\\n    \\n        ListNode *result = nullptr;\\n        for (ListNode *cur = headB; cur; cur = cur->next) {\\n            unsigned long ptr = (unsigned long)cur->next;\\n            if (ptr & 1) {\\n                result = cur;\\n                break;\\n            }\\n        }\\n        \\n        for (ListNode *cur = headA; cur; cur = cur->next) {\\n            unsigned long *ptr = (unsigned long *)&cur->next;\\n            *ptr &= (~0ULL << 1);\\n        }\\n    \\n        return result;\\n    }"
		}
	],
	"id":"160",
	"title":"Intersection of Two Linked Lists",
	"content":"<p>Write a program to find the node at which the intersection of two singly linked lists begins.</p>\n</br>\n<p>For example, the following two linked lists: </p>\n<pre>\nA:          a1 → a2\n                   ↘\n                     c1 → c2 → c3\n                   ↗            \nB:     b1 → b2 → b3\n</pre>\n<p>begin to intersect at node c1.</p>\n</br>\n<p><b>Notes:</b>\n<ul>\n<li>If the two linked lists have no intersection at all, return <code>null</code>.</li>\n<li>The linked lists must retain their original structure after the function returns. </li>\n<li>You may assume there are no cycles anywhere in the entire linked structure.</li>\n<li>Your code should preferably run in O(n) time and use only O(1) memory.</li>\n</ul>\n</p>\n\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://oj.leetcode.com/discuss/user/stellari\">@stellari</a> for adding this problem and creating all test cases.</p>",
	"frequency":"531",
	"ac_num":"170249"
}