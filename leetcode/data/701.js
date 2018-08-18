{
	"difficulty":"2",
	"submit_num":"12815",
	"show_id":"735",
	"leetcode_id":"735",
	"answers":[
		{
			"lc_ans_id":"109694",
			"view":"1212",
			"top":"0",
			"title":"[Java/C++] Clean Code",
			"vote":"7",
			"content":"[735. Asteroid Collision](https://leetcode.com/problems/asteroid-collision/)\\n- at the end, all the negative star has to be on the left, and all the positive star has to be on the right.\\n- from the left, a negative star will pass through if no positive star on the left;\\n- keep track of all the positive stars moving to the right, the right most one will be the 1st confront the challenge of any future negative star.\\n- if it survives, keep going, otherwise, any past positive star will be exposed to the challenge, by being popped out of the stack.\\n\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<int> asteroidCollision(vector<int>& a) {\\n        vector<int> s; // use vector to simulate stack.\\n        for (int i = 0; i < a.size(); i++) {\\n            if (a[i] > 0 || s.empty() || s.back() < 0) // a[i] is positive star or a[i] is negative star and there is no positive on stack\\n                s.push_back(a[i]);\\n            else if (s.back() <= -a[i]) { // a[i] is negative star and stack top is positive star\\n                if(s.back() < -a[i]) i--; // only positive star on stack top get destroyed, stay on i to check more on stack.\\n                s.pop_back(); // destroy positive star on the frontier;\\n            } // else : positive on stack bigger, negative star destroyed.\\n        }\\n        return s;\\n    }\\n};\\n```\\n**java**\\n```\\nclass Solution {\\n    public int[] asteroidCollision(int[] a) {\\n        LinkedList<Integer> s = new LinkedList<>(); // use LinkedList to simulate stack so that we don't need to reverse at end.\\n        for (int i = 0; i < a.length; i++) {\\n            if (a[i] > 0 || s.isEmpty() || s.getLast() < 0)\\n                s.add(a[i]);\\n            else if (s.getLast() <= -a[i])\\n                if (s.pollLast() < -a[i]) i--;\\n        }\\n        return s.stream().mapToInt(i->i).toArray();\\n    }\\n}\\n```\\n\\n**More Intuitive Solution**\\nThe above approach is short but not intuitive, because it handles positive stars on the stack top with less mess than the incoming negative star once a time each loop.\\nMore intuitively we can pop all positive star with less mass right away using a while loop in side the for loop.\\n**Java**\\n```\\nclass Solution {\\n    public int[] asteroidCollision(int[] a) {\\n        LinkedList<Integer> s = new LinkedList<>();\\n        for (int i : a) {\\n            if (i > 0)\\n                s.add(i);\\n            else {\\n                while (!s.isEmpty() && s.getLast() > 0 && s.getLast() < -i)\\n                    s.pollLast();\\n                if (!s.isEmpty() && s.getLast() == -i)\\n                    s.pollLast();\\n                else if (s.isEmpty() || s.getLast() < 0)\\n                    s.add(i);\\n            }\\n        }\\n        return s.stream().mapToInt(i->i).toArray();\\n    }\\n}\\n```\\n```\\nclass Solution {\\n    public int[] asteroidCollision(int[] a) {\\n        LinkedList<Integer> s = new LinkedList<>(); // use LinkedList to simulate stack so that we don't need to reverse at end.\\n        for (int i : a) {\\n            while (!s.isEmpty() && s.getLast() > 0 && s.getLast() < -i)\\n                s.pollLast();\\n            if (s.isEmpty() || i > 0 || s.getLast() < 0)\\n                s.add(i);\\n            else if (i < 0 && s.getLast() == -i)\\n                s.pollLast();\\n        }\\n        return s.stream().mapToInt(i->i).toArray();\\n    }\\n}\\n```\\n**C++**\\n```\\nclass Solution {\\npublic:\\n    vector<int> asteroidCollision(vector<int>& a) {\\n        vector<int> s; // use vector to simulate stack.\\n        for (int i : a) {\\n            while (!s.empty() && s.back() > 0 && s.back() < -i)\\n                s.pop_back();\\n            if (s.empty() || i > 0 || s.back() < 0)\\n                s.push_back(i);\\n            else if (i < 0 && s.back() == -i)\\n                s.pop_back();\\n        }\\n        return s;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"109666",
			"view":"390",
			"top":"1",
			"title":"Python O(n) Stack-based with explanation",
			"vote":"5",
			"content":"Not as clean as the given solution, but perhaps easier to understand.\\n\\nSome observations:\\n\\n1. Negative asteroids without any positive asteroids on the left can be ignored as they will never interact with the upcoming asteroids regardless of their direction.\\n2. Positive asteroids (right-moving) may interact with negative asteroids (left-moving) that come later.\\n\\nWe can use a stack called `res` to efficiently simulate the collisions. We can iterate through the list of `asteroids` and handle the following scenarios as such:\\n\\n1. If `res` is empty, we push that `asteroid` into it regardless of directions. Because negative asteroids will be part of the final result while positive asteroids may interact with future negative asteroids.\\n2. If the `asteroid` is positive, push it into `res`. It will never interact with existing asteroids in `res` but may interact with future negative asteroids.\\n3. If the `asteroid` is negative, we need to simulating the collision process by repeatedly popping the positive asteroids from the top of the stack and compare to see which asteroid survives the collision. We may or may not need to push the negative `asteroid` to `res` depending on the value of the positive asteroids it encounters. Push the negative `asteroid` if it survives all the collisions.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def asteroidCollision(self, asteroids):\\n        res = []\\n        for asteroid in asteroids:\\n            if len(res) == 0 or asteroid > 0:\\n                res.append(asteroid)\\n            elif asteroid < 0:\\n                # While top of the stack is positive.\\n                while len(res) and res[-1] > 0:\\n                    # Both asteroids are equal, destroy both.\\n                    if res[-1] == -asteroid: \\n                        res.pop()\\n                        break\\n                    # Stack top is smaller, remove the +ve asteroid \\n                    # from the stack and continue the comparison.\\n                    elif res[-1] < -asteroid:\\n                        res.pop()\\n                        continue\\n                    # Stack top is larger, -ve asteroid is destroyed.\\n                    elif res[-1] > -asteroid:\\n                        break\\n                else:\\n                    # -ve asteroid made it all the way to the \\n                    # bottom of the stack and destroyed all asteroids.\\n                    res.append(asteroid)\\n        return res\\n```"
		},
		{
			"lc_ans_id":"109674",
			"view":"334",
			"top":"2",
			"title":"Iterative python solution",
			"vote":"4",
			"content":"The idea is to go through the asteroids by looking at them in pairs and reducing whenever applicable.\\nThe above procedure needs to be done recursively until no more reductions are possible.\\n\\n```\\ndef asteroidCollision(self, a):\\n    while True:\\n        i, prev_len, res = 0, len(a), []\\n        while i < len(a)-1:\\n            if (a[i] > 0 and a[i+1] > 0) or (a[i] < 0 and a[i+1] < 0) or (a[i] < 0 < a[i+1]):\\n                res.append(a[i])\\n                i += 1\\n            elif abs(a[i]) > abs(a[i+1]):\\n                del a[i+1]\\n            elif abs(a[i]) == abs(a[i + 1]):\\n                del a[i]\\n                del a[i]\\n            else:\\n                i += 1\\n        if i < len(a): res.append(a[i])\\n        if len(res) == prev_len:\\n            break\\n        a = res\\n    return a\\n```"
		},
		{
			"lc_ans_id":"109678",
			"view":"209",
			"top":"3",
			"title":"Java ArrayDeque solution with explanation",
			"vote":"3",
			"content":"Here is my Java solution. I wrote a helper method to check and see if we will have a problem called isOk. Note that we are in trouble only if we have a positive number followed by a negative number. So we keep adding to the ArrayDeque and once we notice is not ok then we remove from ArrayDeque until we are stable and there is no more collisions.\\n```\\npublic static int[] asteroidCollision(int[] a) {\\n\\tArrayDeque<Integer> deq = new ArrayDeque<>();\\n\\tint[] res;\\n\\tif (a.length <= 1) {\\n\\t\\treturn a;\\n\\t}\\n\\tdeq.push(a[0]);\\n\\touter: for (int i = 1; i < a.length; i++) {\\n\\t\\tint cur = a[i];\\n\\t\\tif (deq.isEmpty()) {\\n\\t\\t\\tdeq.push(cur);\\n\\t\\t\\tcontinue;\\n\\t\\t}\\n\\t\\tint prev = deq.peek();\\n\\t\\twhile (!deq.isEmpty() && !isOk(prev, cur)) {\\n\\t\\t\\tif (Math.abs(prev) < Math.abs(cur)) {\\n\\t\\t\\t\\tdeq.pop();\\n\\t\\t\\t\\tif(!deq.isEmpty()){\\n\\t\\t\\t\\t\\tprev = deq.peek();\\n\\t\\t\\t\\t}\\t\\t\\t\\t\\t\\n\\t\\t\\t} else if (Math.abs(prev) == Math.abs(cur)) {\\n\\t\\t\\t\\tdeq.pop();\\n\\t\\t\\t\\tcontinue outer;\\n\\t\\t\\t} else {\\n\\t\\t\\t\\tcontinue outer;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tdeq.push(cur);\\n\\t}\\n\\tint size = deq.size();\\n\\tres = new int[size];\\n\\tfor (int i = 0; i < size; i++) {\\n\\t\\tres[i] = deq.pollLast();\\n\\t}\\n\\treturn res;\\n}\\n\\npublic static boolean isOk(int i, int j) {\\n\\treturn (((i >> 31) ^ (j >> 31)) == 0 || (i < 0 && j >= 0));\\n}\\n```"
		},
		{
			"lc_ans_id":"109692",
			"view":"270",
			"top":"4",
			"title":"Easy Java AC with LinkedList",
			"vote":"3",
			"content":"```\\npublic int[] asteroidCollision(int[] asteroids) {\\n        LinkedList<Integer> list = new LinkedList<>();\\n        for(int a : asteroids) {\\n            // keep popping out the destroyed asteroids\\n            while(!list.isEmpty() && a < 0 && list.peekLast() > 0 && Math.abs(list.peekLast()) < Math.abs(a)) {\\n                list.pollLast();\\n            }\\n            // check the current and the top asteroid \\n            if(list.isEmpty() || a > 0 || list.peekLast() < 0) { \\n                list.offerLast(a);\\n            } else if(Math.abs(list.peekLast()) == Math.abs(a)){\\n                list.pollLast();\\n            }\\n        }\\n        return list.stream().mapToInt(i -> i).toArray();\\n    }\\n```"
		},
		{
			"lc_ans_id":"109703",
			"view":"193",
			"top":"5",
			"title":"Java solution, Stack",
			"vote":"2",
			"content":"Time complexity: O(n), space complexity: O(n). n is number of asteroids.\\n```\\nclass Solution {\\n    public int[] asteroidCollision(int[] a) {\\n        Stack<Integer> stack = new Stack<>();\\n        for (int i = 0; i < a.length; i++) {\\n            if (stack.isEmpty() || a[i] > 0) {\\n                stack.push(a[i]);\\n                continue;\\n            }\\n            \\n            while (true) {\\n                int prev = stack.peek();\\n                if (prev < 0) {\\n                    stack.push(a[i]);\\n                    break;\\n                }\\n                if (prev == -a[i]) {\\n                    stack.pop();\\n                    break;\\n                }\\n                if (prev > -a[i]) {\\n                    break;\\n                }\\n                stack.pop();\\n                if (stack.isEmpty()) {\\n                    stack.push(a[i]);\\n                    break;\\n                }\\n            }\\n        }\\n        \\n        int[] res = new int[stack.size()];\\n        for (int i = stack.size() - 1; i >= 0; i--) {\\n            res[i] = stack.pop();\\n        }\\n        \\n        return res;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"109680",
			"view":"57",
			"top":"6",
			"title":"Stack based Java Solution---37ms",
			"vote":"1",
			"content":" ```\\npublic int[] asteroidCollision(int[] asteroids) {\\n        Stack<Integer> stack = new Stack<>();\\n        int n = asteroids.length;\\n        \\n        for(int i = 0; i < n; i++){\\n            if (asteroids[i] < 0){\\n                while(!stack.isEmpty() && stack.peek() > 0 && stack.peek() < -asteroids[i]){\\n                    stack.pop();\\n                }\\n                \\n                if (stack.isEmpty() || stack.peek() < 0){\\n                    stack.push(asteroids[i]);\\n                } else if (stack.peek() == -asteroids[i]){\\n                    stack.pop();\\n                }  \\n            } else {\\n                stack.push(asteroids[i]);\\n            }\\n        }\\n        \\n        int[] res = new int[stack.size()];\\n        int i = 0;\\n        \\n        for(int e : stack){\\n            res[i++] = e;\\n        }\\n        \\n        return res;\\n    }"
		},
		{
			"lc_ans_id":"109667",
			"view":"100",
			"top":"7",
			"title":"Java, using stack",
			"vote":"1",
			"content":"```\\nclass Solution {\\n\\tpublic int[] asteroidCollision(int[] asteroids) {\\n\\t\\tArrayList < Integer > res = new ArrayList < > ();\\n\\t\\tStack < Integer > s = new Stack();\\n\\t\\tfor (int i = 0; i < asteroids.length; i++) {\\n\\t\\t\\tif (asteroids[i] > 0) {\\n\\t\\t\\t\\ts.push(asteroids[i]);\\n\\t\\t\\t} \\n\\n\\t\\t\\twhile ((!s.isEmpty()) && (s.peek() < -(asteroids[i]))) {\\n\\t\\t\\t\\ts.pop();\\n\\t\\t\\t}\\n\\n\\t\\t\\tif (((!s.isEmpty()) && (s.peek() > Math.abs(asteroids[i])))) {\\n\\t\\t\\t\\tcontinue;\\n\\t\\t\\t} \\n\\n\\t\\t\\tif ((!s.isEmpty()) && (asteroids[i] + s.peek() == 0)) {\\n\\t\\t\\t\\ts.pop();\\n\\t\\t\\t\\tcontinue;\\n\\t\\t\\t}\\n\\n\\t\\t\\tif (asteroids[i] < 0) {\\n\\t\\t\\t\\tres.add(asteroids[i]);\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\tres.addAll(s);\\n\\t\\tint[] result = new int[res.size()];\\n\\n\\t\\tfor (int j = 0; j < res.size(); j++) {\\n\\t\\t\\tresult[j] = res.get(j);\\n\\t\\t}\\n\\t\\treturn result;\\n\\t}\\n}\\n```"
		},
		{
			"lc_ans_id":"109695",
			"view":"47",
			"top":"8",
			"title":"Simple Java Solution",
			"vote":"1",
			"content":"```\\nclass Solution {\\n    public int[] asteroidCollision(int[] asteroids) {\\n        int l = asteroids.length;                      \\n        Stack<Integer> st = new Stack<>();\\n               \\n        for(int i=0;i<l;i++){\\n            int curr = asteroids[i];\\n            if(st.isEmpty()){\\n                st.push(curr);\\n            }else{\\n                if(curr > 0){\\n                    st.push(curr);\\n                    continue;\\n                }                   \\n                int prev = st.peek(), abs = Math.abs(curr);\\n                \\n                while(!st.isEmpty() && st.peek() > 0 && st.peek() < abs){\\n                    st.pop();\\n                }\\n                if(st.isEmpty()){\\n                    st.push(curr);\\n                    continue;\\n                }\\n                if(st.peek() == abs){\\n                    st.pop();\\n                    continue;\\n                }\\n                if(st.peek() > 0){\\n                    continue;\\n                }else{\\n                    st.push(curr);\\n                }                             \\n                \\n            }\\n            \\n        }\\n        List<Integer> list = new ArrayList<>(st);\\n        \\n        int[] res = list.stream().mapToInt(i->i).toArray();\\n        \\n        return res;\\n    }\\n    \\n\\n}\\n```"
		},
		{
			"lc_ans_id":"109705",
			"view":"86",
			"top":"9",
			"title":"wrong expected answer  [-2,-2,-2,1]",
			"vote":"1",
			"content":"input :- [-2,-2,-2,1]\\nExpected output:- [-2,-2,-2,1]\\nmy solution failed as actual output is [-2,-2,-2], can any one help me to understand how it is?"
		}
	],
	"id":"701",
	"title":"Asteroid Collision",
	"content":"<p>\r\nWe are given an array <code>asteroids</code> of integers representing asteroids in a row.\r\n</p><p>\r\nFor each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left).  Each asteroid moves at the same speed.\r\n</p><p>\r\nFind out the state of the asteroids after all collisions.  If two asteroids meet, the smaller one will explode.  If both are the same size, both will explode.  Two asteroids moving in the same direction will never meet.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nasteroids = [5, 10, -5]\r\n<b>Output:</b> [5, 10]\r\n<b>Explanation:</b> \r\nThe 10 and -5 collide resulting in 10.  The 5 and 10 never collide.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nasteroids = [8, -8]\r\n<b>Output:</b> []\r\n<b>Explanation:</b> \r\nThe 8 and -8 collide exploding each other.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 3:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nasteroids = [10, 2, -5]\r\n<b>Output:</b> [10]\r\n<b>Explanation:</b> \r\nThe 2 and -5 collide resulting in -5.  The 10 and -5 collide resulting in 10.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 4:</b><br />\r\n<pre>\r\n<b>Input:</b> \r\nasteroids = [-2, -1, 1, 2]\r\n<b>Output:</b> [-2, -1, 1, 2]\r\n<b>Explanation:</b> \r\nThe -2 and -1 are moving left, while the 1 and 2 are moving right.\r\nAsteroids moving the same direction never meet, so no asteroids will meet each other.\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b>\r\n<li>The length of <code>asteroids</code> will be at most <code>10000</code>.</li>\r\n<li>Each asteroid will be a non-zero integer in the range <code>[-1000, 1000].</code>.</li>\r\n</p>",
	"frequency":"55",
	"ac_num":"4780"
}