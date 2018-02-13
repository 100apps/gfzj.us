{
	"difficulty":"2",
	"submit_num":"327970",
	"show_id":"134",
	"leetcode_id":"134",
	"answers":[
		{
			"lc_ans_id":"42568",
			"view":"36661",
			"top":"0",
			"title":"Share some of my ideas.",
			"vote":"244",
			"content":"I have thought for a long time and got two ideas:\\n\\n - If car starts at A and can not reach B. Any station between A and B \\n    can not reach B.(B is the first station that A can not reach.)\\n - If the total number of gas is bigger than the total number of cost. There must be a solution. \\n - (Should I prove them?)\\n\\nHere is my solution based on those ideas:\\n\\n    class Solution {\\n    public:\\n        int canCompleteCircuit(vector<int> &gas, vector<int> &cost) {\\n            int start(0),total(0),tank(0);\\n            //if car fails at 'start', record the next station\\n            for(int i=0;i<gas.size();i++) if((tank=tank+gas[i]-cost[i])<0) {start=i+1;total+=tank;tank=0;}\\n            return (total+tank<0)? -1:start;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"42565",
			"view":"18995",
			"top":"1",
			"title":"My AC is O(1) space O(n) running time solution. Does anybody have posted this solution?",
			"vote":"119",
			"content":"I have got one solution to this problem. I am not sure whether somebody has already posted this solution.\\n\\n    class Solution {\\n    public:\\n        int canCompleteCircuit(vector<int> &gas, vector<int> &cost) {\\n    \\n           int start = gas.size()-1;\\n           int end = 0;\\n           int sum = gas[start] - cost[start];\\n           while (start > end) {\\n              if (sum >= 0) {\\n                 sum += gas[end] - cost[end];\\n                 ++end;\\n              }\\n              else {\\n                 --start;\\n                 sum += gas[start] - cost[start];\\n              }\\n           }\\n           return sum >= 0 ? start : -1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"42572",
			"view":"8907",
			"top":"2",
			"title":"Proof of \"if total gas is greater than total cost, there is a solution\". C++",
			"vote":"62",
			"content":"We prove the following statement. \\nIf sum of all `gas[i]-cost[i]` is greater than or equal to `0`, then there is a start position you can travel the whole circle. \\nLet `i` be the index such that the the partial sum \\n\\n    gas[0]-cost[0]+gas[1]-cost[1]+...+gas[i]-cost[i]\\n\\nis the smallest, then the start position should be `start=i+1` ( `start=0` if `i=n-1`). Consider any other partial sum, for example,\\n\\n    gas[0]-cost[0]+gas[1]-cost[1]+...+gas[i]-cost[i]+gas[i+1]-cost[i+1]\\n\\nSince `gas[0]-cost[0]+gas[1]-cost[1]+...+gas[i]-cost[i]` is the smallest, we must have \\n\\n    gas[i+1]-cost[i+1]>=0\\n\\nin order for `gas[0]-cost[0]+gas[1]-cost[1]+...+gas[i]-cost[i]+gas[i+1]-cost[i+1]` to be greater.\\nThe same reasoning gives that \\n\\n     gas[i+1]-cost[i+1]>=0\\n     gas[i+1]-cost[i+1]+gas[i+2]-cost[i+2]>=0\\n     .......\\n     gas[i+1]-cost[i+1]+gas[i+2]-cost[i+2]+...+gas[n-1]-cost[n-1]>=0\\nWhat about for the partial sums that wraps around?\\n\\n    gas[0]-cost[0]+gas[1]-cost[1]+...+gas[j]-cost[j] + gas[i+1]-cost[i+1]+...+gas[n-1]-cost[n-1]\\n    >=\\n    gas[0]-cost[0]+gas[1]-cost[1]+...+gas[i]-cost[i] + gas[i+1]-cost[i+1]+...+gas[n-1]-cost[n-1]\\n    >=0\\nThe last inequality is due to the assumption that the entire sum of `gas[k]-cost[k]` is greater than or equal to 0.\\nSo we have that all the partial sums \\n\\n    gas[i+1]-cost[i+1]>=0,\\n    gas[i+1]-cost[i+1]+gas[i+2]-cost[i+2]>=0,\\n    gas[i+1]-cost[i+1]+gas[i+2]-cost[i+2]+...+gas[n-1]-cost[n-1]>=0,\\n    ...\\n    gas[i+1]-cost[i+1]+...+gas[n-1]-cost[n-1] + gas[0]-cost[0]+gas[1]-cost[1]+...+gas[j]-cost[j]>=0,\\n    ...\\nThus `i+1` is the position to start. Coding using this reasoning is as follows:\\n\\n    class Solution {\\n    public:\\n        int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\\n            int n = gas.size();\\n            int total(0), subsum(INT_MAX), start(0);\\n            for(int i = 0; i < n; ++i){\\n                total += gas[i] - cost[i];\\n                if(total < subsum) {\\n                    subsum = total;\\n                    start = i + 1;\\n                }\\n            }\\n            return (total < 0) ?  -1 : (start%n); \\n        }\\n    };"
		},
		{
			"lc_ans_id":"42594",
			"view":"6101",
			"top":"3",
			"title":"Fully-commented O(n) C++ solution enabled by a single observation of mine",
			"vote":"42",
			"content":"    class Solution {\\n    public:\\n        int canCompleteCircuit(vector<int> &gas, vector<int> &cost) {\\n            int i, j, n = gas.size();\\n    \\n            /*\\n             * If start from i, stop before station x -> no station k from i + 1 to x - 1 can reach x.\\n             * Bcoz if so, i can reach k and k can reach x, then i reaches x. Contradiction.\\n             * Thus i can jump directly to x instead of i + 1, bringing complexity from O(n^2) to O(n).\\n             */\\n            // start from station i\\n            for (i = 0; i < n; i += j) {\\n                int gas_left = 0;\\n                // forward j stations\\n                for (j = 1; j <= n; j++) {\\n                    int k = (i + j - 1) % n;\\n                    gas_left += gas[k] - cost[k];\\n                    if (gas_left < 0)\\n                        break;\\n                }\\n                if (j > n)\\n                    return i;\\n            }\\n    \\n            return -1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"42648",
			"view":"7548",
			"top":"4",
			"title":"My one pass solution.",
			"vote":"32",
			"content":"    class Solution {\\n    public:\\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\\n        int size=gas.size();\\n        int sum=0;\\n        int res=0;\\n        int total=0;\\n        for(int i=0; i<size; ++i){\\n            sum+=gas[i]-cost[i];\\n            if(sum<0){\\n                total+=sum;\\n                sum=0;\\n                res=i+1;\\n            }\\n        }\\n        total+=sum;\\n        return total<0?-1:res;\\n    }};\\n\\nThe idea is simple. \\n\\n 1. Whenever the sum is negative, reset it and let the car start from next point. \\n 2. In the mean time, add up all of the left gas to total. If it's negative finally, return -1 since it's impossible to finish.\\n 3.  If it's non-negative, return the last point saved in res;"
		},
		{
			"lc_ans_id":"42600",
			"view":"3626",
			"top":"5",
			"title":"My O(N) time, O(1) extra space solution.",
			"vote":"24",
			"content":"    public class Solution {\\n    public int canCompleteCircuit(int[] gas, int[] cost) {\\n        for(int i = 0; i < gas.length; i++) {\\n            gas[i] -= cost[i];\\n        }\\n        int sum = 0;\\n        int result = 0;\\n        int n = gas.length;\\n        for(int i = 0; i < n * 2 - 1; i++) {\\n            sum += gas[i % n];\\n            if(sum < 0) {\\n                result = i + 1;\\n                if(result >= n) {\\n                    return -1;\\n                }\\n                sum = 0;\\n            }\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"42667",
			"view":"3193",
			"top":"6",
			"title":"Straightforward Java Linear Solution with O(1) space, explanation and Math proof",
			"vote":"20",
			"content":"The algorithm is pretty easy to understand. Imagine we take a tour around this circle, the only condition that we can complete this trip is to have more fuel provided than costed in total. That's what the first loop does.\\n\\nIf we do have more fuel provided than costed, that means we can always find a start point around this circle that we could complete the journey with an empty tank. Hence, we check from the beginning of the array, if we can gain more fuel at the current station, we will maintain the start point, else, which means we will burn out of oil before reaching to the next station, we will start over at the next station.\\n\\n    public int canCompleteCircuit(int[] gas, int[] cost) {\\n        int tank = 0;\\n        for(int i = 0; i < gas.length; i++)\\n            tank += gas[i] - cost[i];\\n        if(tank < 0)\\n            return - 1;\\n            \\n        int start = 0;\\n        int accumulate = 0;\\n        for(int i = 0; i < gas.length; i++){\\n            int curGain = gas[i] - cost[i];\\n            if(accumulate + curGain < 0){\\n                start = i + 1;\\n                accumulate = 0;\\n            }\\n            else accumulate += curGain;\\n        }\\n        \\n        return start;\\n    }"
		},
		{
			"lc_ans_id":"42685",
			"view":"1691",
			"top":"7",
			"title":"Concise 8ms C++ solution with explanation",
			"vote":"15",
			"content":"The idea is to keep track of how much gas we are carrying as we enter each city. When a complete circuit is made, if the amount we're carrying is less than 0, making a circuit without running out of gas is impossible (the route takes more gas than it provides overall). However, if the carry is nonnegative at the end, the route is possible, so we just need to know where to start: we should start where the carry amount was at a minimum, because it will never be less than that on the rest of the route.\\n\\n    class Solution {\\n    public:\\n        int canCompleteCircuit(vector<int> &gas, vector<int> &cost) {\\n            int carry = 0;\\n            pair<size_t, int> city_carry(0, 0);\\n            for (size_t i = 1; i < gas.size(); ++i) {\\n                carry += gas[i - 1] - cost[i - 1];\\n                if (carry < city_carry.second) {\\n                    city_carry = {i, carry};\\n                }\\n            }\\n            carry += gas[gas.size()-1] - cost[gas.size()-1];\\n            return carry >= 0 ? city_carry.first : -1;\\n        }\\n    };"
		},
		{
			"lc_ans_id":"42661",
			"view":"1756",
			"top":"8",
			"title":"Possibly the MOST easiest approach, O(N), one variable, Python",
			"vote":"13",
			"content":"    def canCompleteCircuit(self, gas, cost):\\n        \"\"\"\\n        :type gas: List[int]\\n        :type cost: List[int]\\n        :rtype: int\\n        \"\"\"\\n        if len(gas) == 0 or len(cost) == 0 or sum(gas) < sum(cost):\\n            return -1\\n        position = 0\\n        balance = 0 # current tank balance\\n        for i in range(len(gas)):\\n            balance += gas[i] - cost[i] # update balance\\n            if balance < 0: # balance drops to negative, reset the start position\\n                balance = 0\\n                position = i+1\\n        return position"
		},
		{
			"lc_ans_id":"42702",
			"view":"1077",
			"top":"9",
			"title":"11ms - c++ solution. visiting each station once.",
			"vote":"10",
			"content":"        \\n    class Solution\\n    {\\n    public:\\n        int canCompleteCircuit(vector<int> &gas, vector<int> &cost)\\n        {\\n            // Start from an arbitrarily chosen index, let's say 0.\\n            // Accumulate the remaining gas (gas - cost).\\n            //\\n            // If there is enough gas to advance to the next station \\n            // then advance to the next station (i++). Continue to do this\\n            // expanding the range of traveled stations until we have \\n            // circled back to the starting point(found a solution)\\n            // or we have ran out of gas.\\n            // \\n            // If we ran out of gas it means that we should have entered the\\n            // range with more gas, so we expand the current range to the left\\n            // in hope to accumulate enough gas.\\n            // \\n            // And so on, expand to the right if we have gas, expand to the \\n            // left if we don't have gas.\\n            // \\n            // Once we completed a circle we have the left side of the range (j)\\n            // as the starting station index.\\n            //\\n    \\n            if (gas.size() == 0 || cost.size() == 0 || gas.size() != cost.size())\\n            {\\n                return -1;\\n            }\\n    \\n            int i = 0; // Right side of the range. \\n            int j = gas.size(); // Left side of the range\\n            int crt = 0; // Current index to be added to the range.\\n            // It might be confusing that the right side of the range starts\\n            // at 0 and the left side starts at gas.size(). \\n            // The range of stations is given by the indexes:\\n            // j, j+1, j+2, ... , gas.size() - 1, 0, 1, 2, ..., i.\\n    \\n            int gasSum = 0; // Remaining gas in the tank\\n    \\n            while (i != j)\\n            {\\n                gasSum += gas[crt] - cost[crt];\\n    \\n                if (gasSum >= 0)\\n                {\\n                    // Move right\\n                    i = i + 1;\\n                    crt = i;\\n                }\\n                else\\n                {\\n                    // Move left\\n                    j = j - 1;\\n                    crt = j;\\n                }\\n            }\\n    \\n            if (gasSum >= 0)\\n            {\\n                j = j % gas.size();\\n                return j;\\n            }\\n            else\\n            {\\n                return -1;\\n            }\\n        }\\n    };"
		}
	],
	"id":"134",
	"title":"Gas Station",
	"content":"<p>\r\nThere are <i>N</i> gas stations along a circular route, where the amount of gas at station <i>i</i> is <code>gas[i]</code>.\r\n</p>\r\n\r\n<p>\r\nYou have a car with an unlimited gas tank and it costs <code>cost[i]</code> of gas to travel from station <i>i</i> to its next station (<i>i</i>+1). You begin the journey with an empty tank at one of the gas stations.\r\n</p>\r\n\r\n<p>\r\nReturn the starting gas station's index if you can travel around the circuit once, otherwise return -1.\r\n</p>\r\n\r\n<p>\r\n<b>Note:</b><br>\r\nThe solution is guaranteed to be unique.\r\n</p>",
	"frequency":"445",
	"ac_num":"97818"
}