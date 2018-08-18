{
	"difficulty":"2",
	"submit_num":"442452",
	"show_id":"142",
	"leetcode_id":"142",
	"answers":[
		{
			"lc_ans_id":"44793",
			"view":"44704",
			"top":"0",
			"title":"O(n) solution by using two pointers without change anything",
			"vote":"205",
			"content":"my solution is like this: using two pointers, one of them one step at a time. another pointer each take two steps. Suppose the first meet at step ***k***,the length of the Cycle is ***r***.   so..**2k-k=nr,k=nr**\\nNow, the distance between the start node of list and the start node of cycle is  ***s***. the distance between the start of list and the first meeting node is ***k***(the pointer which wake one step at a time waked k steps).the distance between the start node of cycle and the first meeting node is ***m***, so...**s=k-m,\\ns=nr-m=(n-1)r+(r-m),here we takes n = 1**..so, using one pointer start from the start node of list, another pointer start from the first meeting node, all of them wake one step at a time, the first time they meeting each other is the start of the cycle.\\n\\n        ListNode *detectCycle(ListNode *head) {\\n        if (head == NULL || head->next == NULL) return NULL;\\n        \\n        ListNode* firstp = head;\\n        ListNode* secondp = head;\\n        bool isCycle = false;\\n        \\n        while(firstp != NULL && secondp != NULL) {\\n            firstp = firstp->next;\\n            if (secondp->next == NULL) return NULL;\\n            secondp = secondp->next->next;\\n            if (firstp == secondp) { isCycle = true; break; }\\n        }\\n        \\n        if(!isCycle) return NULL;\\n        firstp = head;\\n        while( firstp != secondp) {\\n            firstp = firstp->next;\\n            secondp = secondp->next;\\n        }\\n\\n        return firstp;\\n    }"
		},
		{
			"lc_ans_id":"44781",
			"view":"14785",
			"top":"1",
			"title":"Concise O(n) solution by using C++ with Detailed Alogrithm Description",
			"vote":"149",
			"content":"**Alogrithm Description:**\\n================================================================\\n**Step 1: Determine whether there is a cycle**\\n\\n1.1) Using a slow pointer that move forward 1 step  each time\\n\\n1.2) Using a fast  pointer that move forward 2 steps each time\\n\\n1.3) If the slow pointer and fast pointer both point to the same location after several moving steps, there is a cycle;\\n\\n1.4) Otherwise, if (fast->next == NULL || fast->next->next == NULL), there has no cycle.\\n\\n**Step 2: If there is a cycle, return the entry location of the cycle**\\n\\n2.1) L1 is defined as the distance between the head point and entry point\\n\\n2.2) L2 is defined as the distance between the entry point and the meeting point\\n\\n2.3) C   is defined as the length of the cycle\\n\\n2.4) n   is defined as the travel times of the fast pointer around the cycle When the first encounter of the slow pointer and the fast pointer\\n\\n**According to the definition of L1, L2 and C, we can obtain:**\\n\\n - the total distance of the slow pointer traveled when encounter is L1 + L2\\n\\n - the total distance of the fast  pointer traveled when encounter is L1 + L2 + n * C\\n\\n - Because the total distance the fast pointer traveled is twice as the slow pointer, Thus:\\n\\n - 2 * (L1+L2) = L1 + L2 + n * C => L1 + L2 = n * C => **L1 = (n - 1)* C + (C - L2)**\\n\\n**It can be concluded that the distance between the head location and entry location is equal to the distance between the meeting location and the entry location along the direction of forward movement.**\\n\\nSo, when the slow pointer and the fast pointer encounter in the cycle, we can define a pointer \"entry\" that point to the head, this \"entry\" pointer moves one step each time so as the slow pointer. When this \"entry\" pointer and the slow pointer both point to the same location, this location is the node where the cycle begins.\\n\\n================================================================\\n\\nHere is the code:\\n\\n    ListNode *detectCycle(ListNode *head) {\\n        if (head == NULL || head->next == NULL)\\n            return NULL;\\n        \\n        ListNode *slow  = head;\\n        ListNode *fast  = head;\\n        ListNode *entry = head;\\n        \\n        while (fast->next && fast->next->next) {\\n            slow = slow->next;\\n            fast = fast->next->next;\\n            if (slow == fast) {                      // there is a cycle\\n                while(slow != entry) {               // found the entry location\\n                    slow  = slow->next;\\n                    entry = entry->next;\\n                }\\n                return entry;\\n            }\\n        }\\n        return NULL;                                 // there has no cycle\\n    }"
		},
		{
			"lc_ans_id":"44774",
			"view":"19138",
			"top":"2",
			"title":"Java O(1) space solution with detailed explanation.",
			"vote":"90",
			"content":"Define two pointers slow and fast. Both start at head node, fast is twice as fast as slow. If it reaches the end it means there is no cycle, otherwise eventually it will eventually catch up to slow pointer somewhere in the cycle.\\n\\nLet the distance from the first node to the the node where cycle begins be A, and let say the slow pointer travels travels A+B.  The fast pointer must travel 2A+2B to catch up.  The cycle size is N.  Full cycle is also how much more fast pointer has traveled than slow pointer at meeting point.\\n\\n    A+B+N = 2A+2B\\n    N=A+B\\n\\nFrom our calculation slow pointer traveled exactly full cycle when it meets fast pointer, and since originally it travled A before starting on a cycle, it must travel A to reach the point where cycle begins! We can start another slow pointer at head node, and move both pointers until they meet at the beginning of a cycle.\\n\\n    public class Solution {\\n                public ListNode detectCycle(ListNode head) {\\n                    ListNode slow = head;\\n                    ListNode fast = head;\\n            \\n                    while (fast!=null && fast.next!=null){\\n                        fast = fast.next.next;\\n                        slow = slow.next;\\n                        \\n                        if (fast == slow){\\n                            ListNode slow2 = head; \\n                            while (slow2 != slow){\\n                                slow = slow.next;\\n                                slow2 = slow2.next;\\n                            }\\n                            return slow;\\n                        }\\n                    }\\n                    return null;\\n                }\\n            }"
		},
		{
			"lc_ans_id":"44777",
			"view":"7023",
			"top":"3",
			"title":"Concise JAVA solution based on slow fast pointers",
			"vote":"37",
			"content":"**Explanations**\\n\\nDefinitions: \\nCycle = length of the cycle, if exists.\\n        C is the beginning of Cycle, S is the distance of slow pointer from C when slow pointer meets fast pointer.\\n\\nDistance(slow) = C + S, Distance(fast) = 2 * Distance(slow) = 2 * (C + S). To let slow poiner meets fast pointer,  only if fast pointer run 1 cycle more than slow pointer.  Distance(fast) - Distance(slow) = Cycle \\n           =>   2 * (C + S)    - (C + S)\\t\\t= Cycle\\n           =>\\tC + S = Cycle   \\n           =>\\tC = Cycle - S \\n           => This means if slow pointer runs (Cycle - S) more, it will reaches C. So at this time, if there's another point2 running from head\\n           =>  After C distance, point2 will meet slow pointer at C, where is the beginning of the cycle.\\n\\n\\n\\n    public ListNode detectCycle(ListNode head) {\\n    \\tListNode slow = head, fast = head;\\n    \\twhile(fast != null && fast.next != null) {\\n    \\t\\tfast = fast.next.next;\\n    \\t\\tslow = slow.next;\\n    \\t\\tif (slow == fast) {\\n    \\t\\t\\twhile (head != slow) {\\n    \\t\\t\\t\\thead = head.next;\\n    \\t\\t\\t\\tslow = slow.next;\\n    \\t\\t\\t}\\n    \\t\\t\\treturn slow;\\t\\t\\t\\t\\n    \\t\\t}\\n    \\t}\\t\\t\\t\\n    \\treturn null;\\n    }"
		},
		{
			"lc_ans_id":"44783",
			"view":"3612",
			"top":"4",
			"title":"Share my python solution with detailed explanation",
			"vote":"27",
			"content":"My solution consists of two parts. The first one checks if a cycle exists or not. The second one determines the entry of the cycle if it exists.\\nThe first part is inspired by [this post][1]. about Linked List Cycle I\\nThe logic behind the 2nd part is like this:\\n\\n \\n           Consider the following linked list, where E is the cylce entry and X, the crossing point of fast and slow.\\n            H: distance from head to cycle entry E\\n            D: distance from E to X\\n            L: cycle length\\n                              _____\\n                             /     \\\\\\n            head_____H______E       \\\\\\n                            \\\\       /\\n                             X_____/   \\n            \\n        \\n            If fast and slow both start at head, when fast catches slow, slow has traveled H+D and fast 2(H+D). \\n            Assume fast has traveled n loops in the cycle, we have:\\n            2H + 2D = H + D + L  -->  H + D = nL  --> H = nL - D\\n            Thus if two pointers start from head and X, respectively, one first reaches E, the other also reaches E. \\n            In my solution, since fast starts at head.next, we need to move slow one step forward in the beginning of part 2\\n \\n    class Solution:\\n        # @param head, a ListNode\\n        # @return a list node\\n        def detectCycle(self, head):\\n            try:\\n                fast = head.next\\n                slow = head\\n                while fast is not slow:\\n                    fast = fast.next.next\\n                    slow = slow.next\\n            except:\\n                # if there is an exception, we reach the end and there is no cycle\\n                return None\\n    \\n            # since fast starts at head.next, we need to move slow one step forward\\n            slow = slow.next\\n            while head is not slow:\\n                head = head.next\\n                slow = slow.next\\n    \\n            return head\\n\\n  [1]: https://leetcode.com/discuss/40120/except-ionally-fast-python"
		},
		{
			"lc_ans_id":"44848",
			"view":"2960",
			"top":"5",
			"title":"Java solution without extra space with explanation",
			"vote":"21",
			"content":" \\n\\n   First Step:\\n    Assume the first pointer runs from head at a speed of 1-by-1 step, as S, and the second pointer runs at a speed of 2-by-2 step, as 2S, then two pointers will meet at MEET-POINT, using the same time. Define outer loop is A, the distance from CIRCLE-START-POINT to MEET-POINT is B, and the distance from MEET-POINT to CIRCLE-START-POINT is C (Apparently, C=loop-B), then (n*loop+a+b)/2S = (a+b)/S, n=1,2,3,4,5,.... \\n\\nConverting that equation can get A/S=nloop/S-B/S. Since C=loop-B, get A/S = ((n-1)loop+C)/S. \\n\\nThat means, as second step, assuming a pointer running from head and another pointer running from MEET-POINT both at a speed S will meet at CIRCLE-START-POINT;\\n    \\n        (CIRCLE-START-POINT)\\n                |\\n    -------A----@----------------\\n                |               |\\n                |               |\\n                C               B\\n                |               |\\n                |-------@-------|\\n                        |\\n                   (MEET-POINT)\\n    \\n    \\n    public ListNode detectCycle(ListNode head) {\\n        if(head==null || head.next==null || head.next.next==null)  return null;\\n        ListNode pointer1 = head.next;\\n        ListNode pointer2 = head.next.next;\\n        //Step 1\\n        while(pointer1!=pointer2){\\n            if(pointer2.next==null || pointer2.next.next==null)   return null;\\n            pointer1 = pointer1.next;\\n            pointer2 = pointer2.next.next;\\n        }\\n        pointer1 = head;\\n        //Step 2\\n        while(pointer1!=pointer2){\\n            pointer1 = pointer1.next;\\n            pointer2 = pointer2.next;\\n        }\\n        return pointer1;\\n    }"
		},
		{
			"lc_ans_id":"44820",
			"view":"1954",
			"top":"6",
			"title":"C++ implementation with much more clear and strict explanation ! any one can give  more clear ?",
			"vote":"17",
			"content":"Just use the dummy head pointer and why first find the meeting point and then set the result-pointer at the dummy and move forward to find the result position.\\nThere are the reasons :\\n\\nset the \\n\\n       [#cycle length = C ]  \\n\\n       [#length-from-head-to-cycle-start-point = L] \\n\\n       [#cycle-start-point-meeting-point=S] \\n\\n       [#meeting-point-clock-direction-to-cycle-start-point=Y]\\n\\n       [#step needed to meeting=T]\\n\\nThen when they meet, we have \\n\\n       2 * T = T + N1 * C    N1=0,1,2...\\n\\nso we get \\n\\n       T = N1 * C\\n\\nAlso we have \\n\\n       2 * T = L + N2 * C + S    N2=0,1,2...\\n\\nwe can get \\n\\n       N3 * C = L + S  with C = S + Y   N3 = 2 * N1 - N2\\n\\nso we have \\n\\n      (N3 - 1) * C + S + Y = L + S\\n\\nthen we have\\n\\n      (N3 - 1) * C + Y = L\\n\\njust means that we can do the things that have been explained by others.\\n\\nWe can move a node from head and node from the meeting point, then when they meet, it is the \\n\\nstart point of the cycle.\\n\\nHere is the code :\\n\\n    class Solution {\\n        public:\\n            ListNode *detectCycle(ListNode *head) {\\n                ListNode* dummy=new ListNode(-1);\\n                dummy->next=head;\\n                ListNode *slow=dummy, *fast=dummy;\\n                bool flag=false;\\n                while(fast && fast->next){\\n                    slow=slow->next;\\n                    fast=fast->next->next;\\n                    if(fast==slow)  { flag=true; break; }\\n                }\\n                if(!flag)   return NULL;\\n                ListNode* result=dummy;\\n                while(result != slow){\\n                    result=result->next;\\n                    slow=slow->next;**strong text**\\n                }\\n                return result;\\n            }\\n        };"
		},
		{
			"lc_ans_id":"44893",
			"view":"1316",
			"top":"7",
			"title":"My two cents - still O(1) memory and O(n) time",
			"vote":"17",
			"content":"The most elegant solution involves a little bit maths.  However if you've got a headache on maths, the following thoughts will probably be a good alternative.\\n\\nThe solution to the problem can be stacked on the solutions to the existing questions: [Linked List Cycle][1] and [Intersection of Two Linked Lists][2].  If properly crafted, both of them requires linear running time and constant memory.  Hence we still get O(1) memory and O(n) time.\\n\\nDetails:\\n\\n1. Determine if there exists a cycle, return *nullptr* if not, otherwise return the ListNode where the fast pointer and the slow pointer meet, denoted as **tail**.\\n1. Get intersection of the two linked list: *head --> ... --> tail* and *tail->next --> ... --> tail*\\n\\nThat solves the problem.\\n\\n  [1]: https://leetcode.com/problems/linked-list-cycle/\\n  [2]: https://leetcode.com/problems/intersection-of-two-linked-lists/"
		},
		{
			"lc_ans_id":"44902",
			"view":"1200",
			"top":"8",
			"title":"Sharing my Python solution",
			"vote":"13",
			"content":"Same idea as many other posts, just the python version:\\n     \\n    \\n    def detectCycle(self, head):\\n        slow = fast = head\\n        while fast and fast.next:\\n            slow = slow.next\\n            fast = fast.next.next\\n            if slow == fast:\\n                break\\n        else:\\n            return None\\n        while head != slow:\\n            slow = slow.next\\n            head = head.next\\n        return head"
		},
		{
			"lc_ans_id":"44891",
			"view":"1086",
			"top":"9",
			"title":"Java O(n) time, O(1) space solution. Really easy to understand",
			"vote":"9",
			"content":"\\n\\n    public class Solution {\\n        public ListNode detectCycle(ListNode head) {\\n            if(head==null) return head;\\n            ListNode cur = head;\\n            ListNode fast = head.next;\\n            // same as idea as LinkedList Cycle I, try to detect a loop\\n            while(fast != null && fast.next != null) {\\n                if(fast == cur) { // loop detected.\\n                    fast = fast.next;\\n                    int loopSize = 1;\\n                    while(fast!=cur) { // find the loop size\\n                        fast = fast.next;\\n                        loopSize++;\\n                    }\\n                    fast = head;  // start from head again\\n                    cur = head;\\n                    for(int i = loopSize; i > 0; i--) { //this time, put fast node \"loopSize\" ahead\\n                        fast = fast.next;\\n                    }\\n                    while(cur!=fast){\\n                        cur=cur.next;\\n                        fast = fast.next;\\n                    }\\n                    return cur;\\n                }\\n                fast = fast.next.next;\\n                cur = cur.next;\\n            }\\n            return null;\\n        }\\n    }"
		}
	],
	"id":"142",
	"title":"Linked List Cycle II",
	"content":"<p>\r\nGiven a linked list, return the node where the cycle begins. If there is no cycle, return <code>null</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b> Do not modify the linked list.</p>\r\n\r\n<p>\r\n<b>Follow up</b>:<br>\r\nCan you solve it without using extra space?\r\n</p>",
	"frequency":"483",
	"ac_num":"136389"
}