{
	"difficulty":"1",
	"submit_num":"2098068",
	"show_id":"1",
	"leetcode_id":"1",
	"answers":[
		{
			"lc_ans_id":"3",
			"view":"178605",
			"top":"0",
			"title":"Accepted Java O(n) Solution",
			"vote":"316",
			"content":"Hi, this is my accepted JAVA solution. It only go through the list once. It's shorter and easier to understand. Hope this can help someone. Please tell me if you know how to make this better :)\\n\\n\\n    public int[] twoSum(int[] numbers, int target) {\\n        int[] result = new int[2];\\n        Map<Integer, Integer> map = new HashMap<Integer, Integer>();\\n        for (int i = 0; i < numbers.length; i++) {\\n            if (map.containsKey(target - numbers[i])) {\\n                result[1] = i + 1;\\n                result[0] = map.get(target - numbers[i]);\\n                return result;\\n            }\\n            map.put(numbers[i], i + 1);\\n        }\\n        return result;\\n    }"
		},
		{
			"lc_ans_id":"13",
			"view":"105689",
			"top":"1",
			"title":"Accepted C++ O(n) Solution",
			"vote":"254",
			"content":"    vector<int> twoSum(vector<int> &numbers, int target)\\n    {\\n        //Key is the number and value is its index in the vector.\\n    \\tunordered_map<int, int> hash;\\n    \\tvector<int> result;\\n    \\tfor (int i = 0; i < numbers.size(); i++) {\\n    \\t\\tint numberToFind = target - numbers[i];\\n\\n                //if numberToFind is found in map, return them\\n    \\t\\tif (hash.find(numberToFind) != hash.end()) {\\n                        //+1 because indices are NOT zero based\\n    \\t\\t\\tresult.push_back(hash[numberToFind] + 1);\\n    \\t\\t\\tresult.push_back(i + 1);\\t\\t\\t\\n    \\t\\t\\treturn result;\\n    \\t\\t}\\n\\n                //number was not found. Put it in the map.\\n    \\t\\thash[numbers[i]] = i;\\n    \\t}\\n    \\treturn result;\\n    }"
		},
		{
			"lc_ans_id":"17",
			"view":"89031",
			"top":"2",
			"title":"Here is a Python solution in O(n) time",
			"vote":"171",
			"content":"    class Solution(object):\\n        def twoSum(self, nums, target):\\n            if len(nums) <= 1:\\n                return False\\n            buff_dict = {}\\n            for i in range(len(nums)):\\n                if nums[i] in buff_dict:\\n                    return [buff_dict[nums[i]], i]\\n                else:\\n                    buff_dict[target - nums[i]] = i"
		},
		{
			"lc_ans_id":"6",
			"view":"23818",
			"top":"3",
			"title":"My (short) Java solution [O(n) + HashMap!]",
			"vote":"56",
			"content":"Hello! At first glance, this can easily be solved through a quadratic algorithm BUT it can actually be done in linear time. The idea here is to use a map to keep track of the needed RIGHT operand in order for the sum to meet its target. So, we iterate through the array, and store the index of the LEFT operand as the value in the map whereas the NEEDED RIGHT operand is used as the key. When we do encounter the right operand somewhere in the array, the answer is considered to be found! We just return the indices as instructed. :]\\n\\nFeel free to let me know should you have any queries for me OR if this can be improved upon!\\n\\n    public int[] twoSum(int[] nums, int target) {\\n            HashMap<Integer, Integer> tracker = new HashMap<Integer, Integer>();\\n            int len = nums.length;\\n            for(int i = 0; i < len; i++){\\n                if(tracker.containsKey(nums[i])){\\n                    int left = tracker.get(nums[i]);\\n                    return new int[]{left+1, i+1};\\n                }else{\\n                    tracker.put(target - nums[i], i);\\n                }\\n            }\\n            return new int[2];\\n        }"
		},
		{
			"lc_ans_id":"141",
			"view":"43787",
			"top":"4",
			"title":"Very short and simple Java code for Two Sum",
			"vote":"45",
			"content":"    public class Solution {\\n        public int[] twoSum(int[] numbers, int target) {\\n            \\n            HashMap<Integer,Integer> hash = new HashMap<Integer,Integer>();\\n            for(int i = 0; i < numbers.length; i++){\\n\\n                Integer diff = (Integer)(target - numbers[i]);\\n                if(hash.containsKey(diff)){\\n                    int toReturn[] = {hash.get(diff)+1, i+1};\\n                    return toReturn;\\n                }\\n\\n                hash.put(numbers[i], i);\\n\\n            }\\n            \\n            return null;\\n            \\n        }\\n    }\\n\\nSo the simplest solution using a HashMap is to simply throw all the data in there to start with, then iterate through all of the numbers to see if (target-num) is in there, and if it is, return {lower index, higher index}.\\n\\nHowever, we can cut down on some runtime and code length by doing it in a single for loop.\\n\\nWe know that the first number is strictly less than the second number (implying not equal), so if we are returning {value found in HashMap, current loop iteration} then we can be certain that we will never have to insert a value in the HashMap before we check if its difference is. Because of this fact, we can do the inserting and checking in the same loop with no issues. This saves a bit on runtime and memory because it means that you are not guaranteed to have to save all of the data in the HashTable at the start."
		},
		{
			"lc_ans_id":"19",
			"view":"13735",
			"top":"5",
			"title":"Accepted C solution of HashMap in 4ms",
			"vote":"40",
			"content":"    typedef struct HashNode {\\n        int key;\\n        int val;\\n    } HashNode;\\n    \\n    typedef struct HashMap {\\n        int size;\\n        HashNode** storage;\\n    } HashMap;\\n    \\n    HashMap* hash_create(int size);\\n    void hash_destroy(HashMap* hashMap);\\n    void hash_set(HashMap* hashMap, int key, int value);\\n    HashNode* hash_get(HashMap* hashMap, int key);\\n    \\n    HashMap* hash_create(int size){\\n        HashMap* hashMap = malloc(sizeof(HashMap));\\n        hashMap->size = size;\\n        hashMap->storage = calloc(size, sizeof(HashNode*));\\n        return hashMap;\\n    }\\n    \\n    void hash_destroy(HashMap* hashMap) {\\n        for(int i=0; i < hashMap->size; i++) {\\n            HashNode *node;\\n            if((node = hashMap->storage[i])) {\\n                free(node);\\n            }\\n        }\\n        free(hashMap->storage);\\n        free(hashMap);\\n    }\\n    \\n    void hash_set(HashMap *hashMap, int key, int value) {\\n        int hash = abs(key) % hashMap->size;\\n        HashNode* node;\\n        while ((node = hashMap->storage[hash])) {\\n            if (hash < hashMap->size - 1) {\\n                hash++;\\n            } else {\\n                hash = 0;\\n            }\\n        }\\n        node = malloc(sizeof(HashNode));\\n        node->key = key;\\n        node->val = value;\\n        hashMap->storage[hash] = node;\\n    }\\n    \\n    HashNode* hash_get(HashMap *hashMap, int key) {\\n        int hash = abs(key) % hashMap->size;\\n        HashNode* node;\\n        while ((node = hashMap->storage[hash])) {\\n            if (node->key == key) {\\n                return node;\\n            }\\n    \\n            if (hash < hashMap->size - 1) {\\n                hash++;\\n            } else {\\n                hash = 0;\\n            }\\n        }\\n    \\n        return NULL;\\n    }\\n    \\n    int* twoSum(int* nums, int numsSize, int target) {\\n        HashMap* hashMap;\\n        HashNode* node;\\n        int rest, i;\\n        \\n        // make the hashMap 2x size of the numsSize\\n        hashMap = hash_create(numsSize * 2);\\n        for(i = 0; i < numsSize; i++) {\\n            rest = target - nums[i];\\n            node = hash_get(hashMap, rest);\\n            if (node) {\\n                int* result = malloc(sizeof(int)*2);\\n                result[0] = node->val + 1;\\n                result[1] = i + 1;\\n                hash_destroy(hashMap);\\n                return result;\\n            } else {\\n                hash_set(hashMap, nums[i], i);\\n            }\\n        }\\n    }"
		},
		{
			"lc_ans_id":"2",
			"view":"9307",
			"top":"6",
			"title":"Python solution using hash",
			"vote":"36",
			"content":"    class Solution:\\n        # @return a tuple, (index1, index2)\\n        # 8:42\\n        def twoSum(self, num, target):\\n            map = {}\\n            for i in range(len(num)):\\n                if num[i] not in map:\\n                    map[target - num[i]] = i + 1\\n                else:\\n                    return map[num[i]], i + 1\\n    \\n            return -1, -1"
		},
		{
			"lc_ans_id":"583",
			"view":"4356",
			"top":"7",
			"title":"TwoSum Java code using HashMap",
			"vote":"31",
			"content":"    public int[] twoSum(int[] nums, int target) {\\n         HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();\\n    \\t\\tint[] defaultResult = {0, 0};\\n    \\t\\tfor (int i = 0; i < nums.length; i++) {\\n    \\t\\t\\tif (map.get(target-nums[i]) != null ) {\\n    \\t\\t\\t\\tint[] result = {map.get(target-nums[i]) + 1, i + 1 };\\n    \\t\\t\\t\\treturn result;\\n    \\t\\t\\t}\\n    \\t\\t\\tmap.put(nums[i], i);\\n    \\t\\t}\\n    \\t\\treturn defaultResult;\\n        }"
		},
		{
			"lc_ans_id":"7",
			"view":"10671",
			"top":"8",
			"title":"Java, O(nlogn), beats  98.85%",
			"vote":"28",
			"content":"The general idea is:\\n\\nstep1 : copy an array, and sort it using quick sort, O(nlogn) \\n\\nstep2 : using start and end points to find a, b which satifys `a+b==target`, O(n)\\n\\nstep3 : find the index of a, b from origin array, O(n)\\n\\n`note: in step3, you should judge whethour a==b, if true, you must find the second index of b.`\\n\\nif you have any higher efficiency solution, contact me, please.\\n[https://github.com/yangliguang][1]\\n\\nAs follows:\\n\\n    //O(nlogn)\\n    \\t    public int[] twoSum_n2(int[] nums, int target) {\\n    \\t    \\tif(nums == null)\\n    \\t    \\t\\treturn null;\\n    \\t    \\tint[] nums2 = Arrays.copyOf(nums, nums.length);\\n    \\t    \\tArrays.sort(nums2);\\n    \\t    \\tint a = 0, b = 0;\\n    \\t    \\tint start = 0, end = nums2.length-1;\\n    \\t    \\t//find two nums\\n    \\t    \\twhile(start<end){\\n    \\t    \\t\\tint sum = nums2[start] + nums2[end];\\n    \\t    \\t\\tif(sum < target)\\n    \\t    \\t\\t\\tstart++;\\n    \\t    \\t\\telse if(sum > target)\\n    \\t    \\t\\t\\tend--;\\n    \\t    \\t\\telse{\\n    \\t    \\t\\t\\ta = nums2[start]; b = nums2[end];\\n    \\t    \\t\\t\\tbreak;\\n    \\t    \\t\\t}\\n    \\t    \\t}\\n    \\t    \\t//find the index of two numbers\\n    \\t    \\tint[] res = new int[2];\\n    \\t    \\tfor(int i = 0; i < nums.length; i++){\\n    \\t    \\t\\tif(nums[i] == a){\\n    \\t    \\t\\t\\tres[0] = i;\\n    \\t    \\t\\t\\tbreak;\\n    \\t    \\t\\t}\\n    \\t    \\t}\\n    \\t    \\tif(a != b){\\n    \\t    \\t\\tfor(int i = 0; i < nums.length; i++){\\n    \\t\\t    \\t\\tif(nums[i] == b){\\n    \\t\\t    \\t\\t\\tres[1] = i;\\n    \\t\\t    \\t\\t\\tbreak;\\n    \\t\\t    \\t\\t}\\n    \\t\\t    \\t}\\n    \\t    \\t} else{\\n    \\t    \\t\\tfor(int i = 0; i < nums.length; i++){\\n    \\t\\t    \\t\\tif(nums[i] == b && i != res[0]){\\n    \\t\\t    \\t\\t\\tres[1] = i;\\n    \\t\\t    \\t\\t\\tbreak;\\n    \\t\\t    \\t\\t}\\n    \\t\\t    \\t}\\n    \\t    \\t}\\n    \\t    \\t\\n    \\t    \\treturn res;\\n    \\t    }\\n\\n\\n  [1]: https://github.com/yangliguang"
		},
		{
			"lc_ans_id":"126",
			"view":"9206",
			"top":"9",
			"title":"Accepted C++ in 11 lines",
			"vote":"27",
			"content":"    class Solution {\\n    public:\\n        vector<int> twoSum(vector<int>& nums, int target) {\\n            unordered_map<int, int> map;\\n            int n = (int)nums.size();\\n            for (int i = 0; i < n; i++) {\\n                auto p = map.find(target-nums[i]);\\n                if (p!=map.end()) {\\n                    return {p->second+1, i+1};\\n                }\\n                map[nums[i]]=i;\\n            }\\n        }\\n    };"
		}
	],
	"id":"1",
	"title":"Two Sum",
	"content":"<p>Given an array of integers, return <b>indices</b> of the two numbers such that they add up to a specific target.</p>\r\n\r\n<p>You may assume that each input would have <b><i>exactly</i></b> one solution, and you may not use the <i>same</i> element twice.</p>\r\n\r\n<p>\r\n<b>Example:</b><br />\r\n<pre>\r\nGiven nums = [2, 7, 11, 15], target = 9,\r\n\r\nBecause nums[<b>0</b>] + nums[<b>1</b>] = 2 + 7 = 9,\r\nreturn [<b>0</b>, <b>1</b>].\r\n</pre>\r\n</p>",
	"frequency":"631",
	"ac_num":"775823"
}