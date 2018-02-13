{
	"difficulty":"3",
	"submit_num":"13949",
	"show_id":"679",
	"leetcode_id":"679",
	"answers":[
		{
			"lc_ans_id":"107673",
			"view":"4687",
			"top":"1",
			"title":"[JAVA] Easy to understand. Backtracking.",
			"vote":"19",
			"content":"```\\nclass Solution {\\n\\n    boolean res = false;\\n    final double eps = 0.001;\\n\\n    public boolean judgePoint24(int[] nums) {\\n        List<Double> arr = new ArrayList<>();\\n        for(int n: nums) arr.add((double) n);\\n        helper(arr);\\n        return res;\\n    }\\n\\n    private void helper(List<Double> arr){\\n        if(res) return;\\n        if(arr.size() == 1){\\n            if(Math.abs(arr.get(0) - 24.0) < eps)\\n                res = true;\\n            return;\\n        }\\n        for (int i = 0; i < arr.size(); i++) {\\n            for (int j = 0; j < i; j++) {\\n                List<Double> next = new ArrayList<>();\\n                Double p1 = arr.get(i), p2 = arr.get(j);\\n                next.addAll(Arrays.asList(p1+p2, p1-p2, p2-p1, p1*p2));\\n                if(Math.abs(p2) > eps)  next.add(p1/p2);\\n                if(Math.abs(p1) > eps)  next.add(p2/p1);\\n                \\n                arr.remove(i);\\n                arr.remove(j);\\n                for (Double n: next){\\n                    arr.add(n);\\n                    helper(arr);\\n                    arr.remove(arr.size()-1);\\n                }\\n                arr.add(j, p2);\\n                arr.add(i, p1);\\n            }\\n        }\\n    }\\n}\\n\\n```"
		},
		{
			"lc_ans_id":"107678",
			"view":"1816",
			"top":"2",
			"title":"C++, Concise code",
			"vote":"14",
			"content":"```\\nclass Solution {\\npublic:\\n    bool judgePoint24(vector<int>& nums) {\\n        sort(nums.begin(), nums.end());\\n        do {\\n            if (valid(nums)) return true;\\n        } while(next_permutation(nums.begin(), nums.end()));\\n        return false;\\n    }\\nprivate:\\n    bool valid(vector<int>& nums) {\\n        double a = nums[0], b = nums[1], c = nums[2], d = nums[3];\\n        if (valid(a+b, c, d) || valid(a-b, c, d) || valid(a*b, c, d) || valid(a/b, c, d)) return true;\\n        if (valid(a, b+c, d) || valid(a, b-c, d) || valid(a, b*c, d) || valid(a, b/c, d)) return true;\\n        if (valid(a, b, c+d) || valid(a, b, c-d) || valid(a, b, c*d) || valid(a, b, c/d)) return true;\\n        return false;\\n    }\\n    bool valid(double a, double b, double c) {\\n        if (valid(a+b, c) || valid(a-b, c) || valid(a*b, c) || b&&valid(a/b, c)) return true;\\n        if (valid(a, b+c) || valid(a, b-c) || valid(a, b*c) || c&&valid(a, b/c)) return true;\\n        return false;\\n    }\\n    bool valid(double a, double b) {\\n        if (abs(a+b-24.0) < 0.0001 || abs(a-b-24.0) < 0.0001 || abs(a*b-24.0) < 0.0001 || b&&abs(a/b-24.0) < 0.0001) \\n            return true;\\n        return false;\\n    }\\n};\\n```"
		},
		{
			"lc_ans_id":"107675",
			"view":"2642",
			"top":"3",
			"title":"Short Python",
			"vote":"10",
			"content":"    def judgePoint24(self, nums):\\n        if len(nums) == 1:\\n            return math.isclose(nums[0], 24)\\n        return any(self.judgePoint24([x] + rest)\\n                   for a, b, *rest in itertools.permutations(nums)\\n                   for x in {a+b, a-b, a*b, b and a/b})\\n\\nJust go through all pairs of numbers `a` and `b` and replace them with `a+b`, `a-b`, `a*b` and `a/b`, . Use recursion for the now smaller list. Positive base case is the list being `[24]` (or close enough).\\n\\nI prevent division-by-zero by using `b and a/b` instead of just `a/b`. If `b` is zero, then `b and a/b` is zero. And it's ok to have that zero, since `a*b` is zero as well. It's not even a *second* zero, because I'm creating a *set* of the up to four operation results, so duplicates are ignored immediately.\\n\\nOh and note that I'm using Python 3, so `/` is \"true\" division, not integer division like in Python 2. And it would be better to use `fractions.Fraction` instead of floats. I actually just realized that there is in fact an input where simple floats fail, namely `[3, 3, 8, 8]`. Floats calculate 23.999999999999989341858963598497211933135986328125 instead of 24. It's not in the judge's test suite, but it should be soon (Edit: it now is). Using `Fraction` however made my solution exceed the time limit, so I settled for the above approximation solution."
		},
		{
			"lc_ans_id":"107695",
			"view":"1732",
			"top":"4",
			"title":"java recursive solution",
			"vote":"8",
			"content":"Repeatedly select 2 numbers (all combinations) and compute, until there is only one number, check if it's 24.\\n```\\nclass Solution {\\n    public boolean judgePoint24(int[] nums) {\\n        return f(new double[] {nums[0], nums[1], nums[2], nums[3]});\\n    }\\n    \\n    private boolean f(double[] a) {\\n        if (a.length == 1) {\\n            return a[0] == 24;\\n        }\\n        for (int i = 0; i < a.length; i++) {\\n            for (int j = i + 1; j < a.length; j++) {\\n                double[] b = new double[a.length - 1];\\n                for (int k = 0, l = 0; k < a.length; k++) {\\n                    if (k != i && k != j) {\\n                        b[l++] = a[k];\\n                    }\\n                }\\n                for (double k : compute(a[i], a[j])) {\\n                    b[a.length - 2] = k;\\n                    if (f(b)) {\\n                        return true;\\n                    }\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n    \\n    private double[] compute(double a, double b) {\\n        return new double[] {a + b, a - b, b - a, a * b, a / b, b / a};\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"107705",
			"view":"842",
			"top":"5",
			"title":"Python with explanation - Generate All Possibilities",
			"vote":"3",
			"content":"1. Use `itertools.permutations` to generate all the possible operands and operators to form an array of length 7, representing an equation of 4 operands and 3 operators.\\n2. The `possible` function tries to evaluate the equation with different combinations of brackets, terminating as soon as an equation evaluates to 24. Each time `evaluate` is called, it reduces the length of the equation by 2, as it takes a triplet (operand, operator, operand) and evaluates into a value.\\n3. Compare the final result of the equation with a small delta because of floating point inaccuracies.\\n\\n*- Yangshun*\\n\\n```\\nclass Solution(object):\\n    def judgePoint24(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: bool\\n        \"\"\"\\n        import itertools\\n        TARGET = 24\\n        EQN_LEN = 3 # (Operand, Operator, Operand) triplet.\\n        # Generate all possible number sequences. Convert to float string so that\\n        # division does not result in truncation.\\n        number_orders = set(tuple(itertools.permutations([str(num) + '.0' for num in nums])))\\n        # Generate all possible operator sequences.\\n        operator_orders = set(tuple(itertools.permutations('***///+++---', len(nums) - 1)))\\n\\n        # Evaluate an equation with different permutation of brackets\\n        # and return True if any of them evaluate to the target.\\n        def possible(equation):\\n            found = [False]\\n            def evaluate(eqn):\\n                # Reduces an equation by length 2 each time:\\n                # An equation of ['1.0', '*', '2.0', '+', '3.0', '/', '4.0'] becomes:\\n                # - [2.0', '+', '3.0', '/', '4.0'] (1.0 * 2.0 reduced to 2.0)\\n                # - [1.0', '*', '5.0', '/', '4.0'] (2.0 + 3.0 reduced to 5.0)\\n                # - [1.0', '*', '2.0', '+', '0.75'] (3.0 / 4.0 reduced to 0.75)\\n                if found[0]:\\n                    return\\n                if len(eqn) == EQN_LEN:\\n                    val = eval(''.join(eqn))\\n                    # Compare against a delta because of floating point inaccuracies.\\n                    if abs(val - TARGET) < 0.0001:\\n                        found[0] = True\\n                    return\\n                # Recursively try different permutations\\n                # of operands + operators triplets, simulating brackets.\\n                for i in range(0, len(eqn) - 1, 2):\\n                    try:\\n                        # Wrap in try/except as there can be a division by 0 error.\\n                        evaluate(eqn[:i] + [str(eval(''.join(eqn[i:i + EQN_LEN])))] + eqn[i + EQN_LEN:])\\n                    except:\\n                        pass\\n            evaluate(equation)\\n            return found[0]\\n\\n        for number_order in number_orders:\\n            for operator_order in operator_orders:\\n                equation = [None] * (len(number_order) + len(operator_order))\\n                for i, number in enumerate(number_order):\\n                    equation[0 + i * 2] = number\\n                for i, operator in enumerate(operator_order):\\n                    equation[1 + i * 2] = operator\\n                # Generate an equation to test whether it is possible to get 24 using it.\\n                # Example equation: ['1.0', '*', '2.0', '+', '3.0', '/', '4.0']\\n                if possible(equation):\\n                    return True\\n        return False\\n```"
		},
		{
			"lc_ans_id":"107685",
			"view":"431",
			"top":"6",
			"title":"[679. 24 Game] C++ Recursive",
			"vote":"2",
			"content":"Search for all possible cases.\\nLooks like backtracking...\\n\\n    class Solution {\\n    public:\\n    double elipson = pow(10.0, -5);\\n    vector<char> operations = {'+','-','*','/'};\\n    bool judgePoint24(vector<int>& nums) {\\n        vector<double> vec;\\n        for(auto n : nums){\\n            vec.push_back(n*1.0);\\n        }\\n        return find24(vec);\\n    }\\n    \\n    bool find24(vector<double> vec){\\n        if(vec.size() == 1){\\n            return abs(vec[0] - 24.0) <= elipson;\\n        }\\n        for(int i = 0; i < vec.size(); ++i){//each time we pick up two number for computation\\n            for(int j = 0; j < vec.size(); ++j){\\n                if(i == j) continue;\\n                vector<double> res;\\n                for(int k = 0; k < vec.size(); ++k){\\n                    if(k != i && k != j) res.push_back(vec[k]);\\n                }\\n                for(auto op : operations){\\n                    if((op == '+' || op == '*') && i > j) continue;//no need to re-calculate\\n                    if(op =='/'  && vec[j] == 0.0) continue;\\n                    switch(op){\\n                        case '+': res.push_back(vec[i] + vec[j]); break;\\n                        case '-': res.push_back(vec[i] - vec[j]); break;\\n                        case '*': res.push_back(vec[i] * vec[j]); break;\\n                        case '/': res.push_back(vec[i] / vec[j]); break;\\n                    }\\n                    if(find24(res)) return true;\\n                    res.pop_back();//!!!important\\n                }\\n            }\\n        }\\n        return false;\\n    }\\n    };"
		},
		{
			"lc_ans_id":"107704",
			"view":"161",
			"top":"7",
			"title":"Simple python dfs + memorization",
			"vote":"2",
			"content":"added precision check fix\\n\\n```\\nclass Solution(object):\\n    def judgePoint24(self, nums):\\n        \"\"\"\\n        :type nums: List[int]\\n        :rtype: bool\\n        \"\"\"\\n        hs = {}\\n        return self.helper(nums, hs)\\n    \\n    def helper(self, nums, hs):\\n        #print \"debug\", nums\\n        if len(nums) == 1:\\n            if 23.9 <= nums[0] <= 24.1:\\n                return True\\n            else:\\n                return False\\n        \\n        nums = sorted(nums)\\n        if \"\".join(str(nums) + \",\") in hs:\\n            return False\\n        \\n        for i in range(len(nums) - 1):\\n            for j in range(i + 1, len(nums)):\\n                a = nums[i]\\n                b = nums[j]\\n                if self.helper(nums[:i] + nums[i + 1:j] + nums[j + 1:] + [a + b], hs) == True:\\n                    return True\\n                if self.helper(nums[:i] + nums[i + 1:j] + nums[j + 1:] + [a * b], hs) == True:\\n                    return True\\n                if b != 0 and self.helper(nums[:i] + nums[i + 1:j] + nums[j + 1:] + [float(a) / b], hs) == True:\\n                    return True\\n                if self.helper(nums[:i] + nums[i + 1:j] + nums[j + 1:] + [a - b], hs) == True:\\n                    return True\\n                if a != 0 and self.helper(nums[:i] + nums[i + 1:j] + nums[j + 1:] + [float(b) / a], hs) == True:\\n                    return True\\n                if self.helper(nums[:i] + nums[i + 1:j] + nums[j + 1:] + [b - a], hs) == True:\\n                    return True\\n        \\n        hs[\"\".join(str(nums) + \",\")] = True\\n        return False\\n```"
		},
		{
			"lc_ans_id":"107699",
			"view":"546",
			"top":"8",
			"title":"Python, Functional style",
			"vote":"2",
			"content":"We write a function `apply` that takes two sets of possibilities for A and B and returns all possible results `operator(A, B)` or `operator(B, A)` for all possible operators.\\n\\nIgnoring reflection, there are only two ways we can apply the operators: (AB)(CD) or ((AB)C)D.  When C and D are ordered, this becomes three ways - the third way is ((AB)D)C.\\n\\nThis solution is a little slow because it has to manage sets - my article has a solution that is almost 10x faster.  I think this one is cool though.\\n\\n```\\ndef judgePoint24(self, nums):\\n    from operator import truediv, mul, add, sub\\n    from fractions import Fraction\\n\\n    def apply(A, B):\\n        ans = set()\\n        for x, y, op in itertools.product(A, B, (truediv, mul, add, sub)):\\n            if op is not truediv or y: ans.add(op(x, y))\\n            if op is not truediv or x: ans.add(op(y, x))\\n        return ans\\n    \\n    A = [{x} for x in map(Fraction, nums)]\\n    for i, j in itertools.combinations(range(4), 2):\\n        r1 = apply(A[i], A[j])\\n        k, l = {0, 1, 2, 3} - {i, j}\\n        if 24 in apply(apply(r1, A[k]), A[l]): return True\\n        if 24 in apply(apply(r1, A[l]), A[k]): return True\\n        if 24 in apply(r1, apply(A[k], A[l])): return True\\n    \\n    return False\\n```"
		},
		{
			"lc_ans_id":"107668",
			"view":"53",
			"top":"9",
			"title":"Javascript recursive solution",
			"vote":"1",
			"content":"```\\nvar judgePoint24 = function(cards) {\\n  if(cards.length===1) {\\n    var roundValue = Math.round(cards[0]*100)/100;\\n    return roundValue === 24;\\n  }\\n\\n  for(var i=0; i<cards.length; i++) {\\n    for(var j=0; j<cards.length; j++) {\\n      if(i===j) continue;\\n      var small = Math.min(i,j);\\n      var large = Math.max(i,j);\\n      var thisCards = cards.slice();\\n      thisCards.splice(large,1);\\n      thisCards.splice(small,1);\\n\\n      var iValue = cards[i];\\n      var jValue = cards[j];\\n      var isValid = false;\\n      isValid = isValid || judgePoint24( [iValue+jValue, ...thisCards] );\\n      isValid = isValid || judgePoint24( [iValue-jValue, ...thisCards] );\\n      isValid = isValid || judgePoint24( [iValue*jValue, ...thisCards] );\\n      if(jValue !==0) {\\n        isValid = isValid || judgePoint24( [iValue/jValue, ...thisCards] );\\n      }\\n      if(isValid) return true;\\n    }\\n  }\\n  return false;\\n};\\n```"
		}
	],
	"id":"656",
	"title":"24 Game",
	"content":"<p>\r\nYou have 4 cards each containing a number from 1 to 9.  You need to judge whether they could operated through <code>*</code>, <code>/</code>, <code>+</code>, <code>-</code>, <code>(</code>, <code>)</code> to get the value of 24.\r\n</p>\r\n\r\n<p><b>Example 1:</b><br />\r\n<pre>\r\n<b>Input:</b> [4, 1, 8, 7]\r\n<b>Output:</b> True\r\n<b>Explanation:</b> (8-4) * (7-1) = 24\r\n</pre>\r\n</p>\r\n\r\n<p><b>Example 2:</b><br />\r\n<pre>\r\n<b>Input:</b> [1, 2, 1, 2]\r\n<b>Output:</b> False\r\n</pre>\r\n</p>\r\n\r\n<p><b>Note:</b><br>\r\n<ol>\r\n<li>The division operator <code>/</code> represents real division, not integer division.  For example, 4 / (1 - 2/3) = 12.</li>\r\n<li>Every operation done is between two numbers.  In particular, we cannot use <code>-</code> as a unary operator.  For example, with <code>[1, 1, 1, 1]</code> as input, the expression <code>-1 - 1 - 1 - 1</code> is not allowed.</li>\r\n<li>You cannot concatenate numbers together.  For example, if the input is <code>[1, 2, 1, 2]</code>, we cannot write this as 12 + 12.</li>\r\n</ol>\r\n</p>\r\n</p>",
	"frequency":"217",
	"ac_num":"5439"
}