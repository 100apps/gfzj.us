{
	"difficulty":"2",
	"submit_num":"81289",
	"show_id":"251",
	"leetcode_id":"251",
	"answers":[
		{
			"lc_ans_id":"67652",
			"view":"20827",
			"top":"0",
			"title":"7-9 lines added, Java and C++, O(1) space.",
			"vote":"91",
			"content":"Since the OJ does `while (i.hasNext()) cout << i.next();`, i.e., always calls `hasNext` before `next`, I don't really have to call it myself so I could save that line in `next`. But I think that would be bad, we shouldn't rely on that.\\n\\n**C++**\\n\\n    class Vector2D {\\n        vector<vector<int>>::iterator i, iEnd;\\n        int j = 0;\\n    public:\\n        Vector2D(vector<vector<int>>& vec2d) {\\n            i = vec2d.begin();\\n            iEnd = vec2d.end();\\n        }\\n    \\n        int next() {\\n            hasNext();\\n            return (*i)[j++];\\n        }\\n    \\n        bool hasNext() {\\n            while (i != iEnd && j == (*i).size())\\n                i++, j = 0;\\n            return i != iEnd;\\n        }\\n    };\\n\\n**Java**\\n\\n    public class Vector2D {\\n    \\n        private Iterator<List<Integer>> i;\\n        private Iterator<Integer> j;\\n    \\n        public Vector2D(List<List<Integer>> vec2d) {\\n            i = vec2d.iterator();\\n        }\\n    \\n        public int next() {\\n            hasNext();\\n            return j.next();\\n        }\\n    \\n        public boolean hasNext() {\\n            while ((j == null || !j.hasNext()) && i.hasNext())\\n                j = i.next().iterator();\\n            return j != null && j.hasNext();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67656",
			"view":"6510",
			"top":"1",
			"title":"Java Solution, Beats 60.10%",
			"vote":"27",
			"content":"    public class Vector2D {\\n        int indexList, indexEle;\\n        List<List<Integer>> vec; \\n        \\n        public Vector2D(List<List<Integer>> vec2d) {\\n            indexList = 0;\\n            indexEle = 0;\\n            vec = vec2d;\\n        }\\n    \\n        public int next() {\\n            return vec.get(indexList).get(indexEle++);\\n        }\\n    \\n        public boolean hasNext() {\\n            while(indexList < vec.size()){\\n                if(indexEle < vec.get(indexList).size())\\n                    return true;\\n                else{\\n                    indexList++;\\n                    indexEle = 0;\\n                }\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67669",
			"view":"2948",
			"top":"2",
			"title":"Java Iterator Solution - Explained",
			"vote":"14",
			"content":"I first hold the 2D List inside a Iterator of List this allows me to operate on the subsequent list once needed. I then remove the first list from the 2D List and store as `row` which is evaluated when `next()` & `hasNext()` are called. I then want to ensure `row` iterator is pointing to a none empty list so i call the `getNextRow()` method. `next()` and `hashNext()` are now very simple. `next()` returns the next element of the current list then ensures `row` isn't empty. `hasNext()` checks `row` isn't null and has a next value.\\n\\n    public class Vector2D {\\n        Iterator<List<Integer>> itrs;\\n        Iterator<Integer> row;\\n        public Vector2D(List<List<Integer>> vec2d) {\\n            if(vec2d == null || vec2d.size() == 0) return;\\n            itrs = vec2d.iterator();\\n            row = itrs.next().iterator();\\n            getNextRow();\\n        }\\n        \\n        private void getNextRow(){\\n            while(!row.hasNext() && itrs.hasNext()) row = itrs.next().iterator();\\n        }\\n    \\n        public int next() {\\n            int next = row.next();\\n            getNextRow();\\n            return next;\\n        }\\n    \\n        public boolean hasNext() {\\n            return row != null && row.hasNext();\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67708",
			"view":"5389",
			"top":"3",
			"title":"Simple and short JAVA solution with iterator",
			"vote":"14",
			"content":"  \\n\\n - Put all iterator in a queue\\n - Keep track of the current iterator\\n - Check hasNext() and next() of current\\n\\n  \\n\\n    public class Vector2D {\\n        \\n        Queue<Iterator<Integer>> queue;\\n        Iterator<Integer> current = null;\\n        \\n        public Vector2D(List<List<Integer>> vec2d) {\\n            queue = new LinkedList<Iterator<Integer>>();\\n            for (int i = 0; i < vec2d.size(); i++){\\n                queue.add(vec2d.get(i).iterator());\\n            }\\n            current = queue.poll(); // first\\n        }\\n    \\n        public int next() {\\n            if (!current.hasNext()) return -1;\\n            \\n            return current.next();\\n        }\\n    \\n        public boolean hasNext() {\\n            if (current == null) return false;\\n            \\n            while (!current.hasNext()) {\\n                if (!queue.isEmpty()) {\\n                    current = queue.poll();\\n                } else return false;\\n            }\\n            \\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"67737",
			"view":"585",
			"top":"4",
			"title":"Clean and simple C++ solution",
			"vote":"8",
			"content":"    class Vector2D {\\n    public:\\n        Vector2D(vector<vector<int>>& vec2d) {\\n            x = vec2d.begin(), e = vec2d.end();\\n            if (x != e)\\n                y = x->begin();\\n        }\\n    \\n        int next() {\\n            return *y++;\\n        }\\n    \\n        bool hasNext() {\\n            while (x != e && y == x->end()) {\\n                ++x;\\n                y = x->begin();\\n            }\\n            return x != e;\\n        }\\n    \\n    private:\\n        vector<vector<int>>::iterator x, e;\\n        vector<int>::iterator y;\\n    };"
		},
		{
			"lc_ans_id":"67653",
			"view":"1256",
			"top":"5",
			"title":"My Python Solution",
			"vote":"7",
			"content":"    class Vector2D:\\n        # Initialize your data structure here.\\n        # @param {integer[][]} vec2d\\n        def __init__(self, vec2d):\\n            self.col = 0\\n            self.row = 0\\n            self.vec = vec2d\\n            \\n        # @return {integer}\\n        def next(self):\\n            result = self.vec[self.row][self.col]\\n            self.col += 1\\n            return result\\n    \\n        # @return {boolean}\\n        def hasNext(self):\\n            while self.row < len(self.vec):\\n                if self.col < len(self.vec[self.row]):\\n                    return True\\n                \\n                self.col = 0\\n                self.row += 1\\n                \\n            return False"
		},
		{
			"lc_ans_id":"67744",
			"view":"1496",
			"top":"6",
			"title":"About space complexity in Python. Can we actually use O(1) space?",
			"vote":"6",
			"content":"Because we don't pass vec2d into next function. so if we want to track row or column in 2 variables, we still need to store the whole vec2d into a list, which is O(n). In this case, it is easier we just use O(n) to store the flatten vec2d and track the index...\\n\\nCan we really use O(1) space in Python?\\n\\nThis is my O(n) space solution.\\n\\n    def __init__(self, vec2d):\\n        self.vec = [x for row in vec2d for x in row]\\n        self.now = 0\\n        \\n    def next(self):\\n        self.now += 1\\n        return self.vec[self.now-1]\\n\\n    def hasNext(self):\\n        if self.now < len(self.vec):\\n            return True\\n        return False\\n\\n\\nThis is using 2 variable for row and column, but it still need O(n) space\\n\\n\\n    def __init__(self, vec2d):\\n        self.row = 0\\n        self.col = 0\\n        self.vec = vec2d\\n        \\n    def next(self):\\n        val = self.vec[self.row][self.col]\\n        self.col += 1\\n        return val\\n\\n    def hasNext(self):\\n        while self.row < len(self.vec):\\n            while self.col < len(self.vec[self.row]):\\n                return True\\n            self.row += 1\\n            self.col = 0\\n        return False"
		},
		{
			"lc_ans_id":"67748",
			"view":"2553",
			"top":"7",
			"title":"2 Short C++ solution",
			"vote":"6",
			"content":"//1. with positions of vectors\\n\\n    class Vector2D {\\n       int row;\\n       int col;\\n       vector<vector<int>> data;\\n    \\n    public:\\n       Vector2D(vector<vector<int>>& vec2d) {\\n           data = vec2d;\\n           row = 0;\\n           col = 0;\\n       }\\n\\n       int next() {\\n           return data[row][col++];\\n       }\\n\\n       bool hasNext() {\\n           while(row < data.size() && data[row].size() == col)\\n               row++, col = 0;\\n           return row < data.size();\\n       }\\n    };\\n\\n\\n\\n\\n\\n//2. with Iterator\\n\\n    class Vector2D {\\n       vector<vector<int>> data;\\n       vector<vector<int>>::iterator rowIter;\\n       vector<int>::iterator colIter;\\n    \\n    public:\\n       Vector2D(vector<vector<int>>& vec2d) {\\n           data = vec2d;\\n           rowIter = data.begin();\\n           if(rowIter != data.end())\\n               colIter = rowIter->begin();\\n       }\\n\\n       int next() {\\n           int r = *colIter;\\n           colIter++;\\n           return r;\\n       }\\n\\n       bool hasNext() {\\n           while(rowIter != data.end() && colIter == rowIter->end()) {\\n               rowIter++;\\n               if(rowIter != data.end())\\n                    colIter = rowIter->begin();\\n           }\\n        \\n           return rowIter != data.end();\\n       }\\n     };"
		},
		{
			"lc_ans_id":"67725",
			"view":"484",
			"top":"8",
			"title":"Python 6 lines",
			"vote":"3",
			"content":"```\\nclass Vector2D(object):\\n\\n    def __init__(self, vec2d):\\n        self.row, self.col, self.vec2d = 0, 0, vec2d\\n        \\n    def next(self):\\n        self.col += 1\\n        return self.vec2d[self.row][self.col-1]\\n        \\n    def hasNext(self):\\n        while self.row < len(self.vec2d) and self.col >= len(self.vec2d[self.row]):\\n            self.row, self.col = self.row + 1, 0\\n        return self.row < len(self.vec2d)\\n```"
		},
		{
			"lc_ans_id":"67729",
			"view":"610",
			"top":"9",
			"title":"In the interview situation, is it assumed that hasNext() is always called before next()?",
			"vote":"3",
			"content":"With these iterator problems i always wonder how they want you to handle it if next() is called when there are no available values"
		}
	],
	"id":"251",
	"title":"Flatten 2D Vector",
	"content":"<p>\r\nImplement an iterator to flatten a 2d vector.\r\n</p>\r\n\r\n<p>For example,<br>\r\nGiven 2d vector = \r\n<pre>\r\n[\r\n  [1,2],\r\n  [3],\r\n  [4,5,6]\r\n]\r\n</pre>\r\n</p>\r\n<p>\r\nBy calling <i>next</i> repeatedly until <i>hasNext</i> returns false, the order of elements returned by <i>next</i> should be: <code>[1,2,3,4,5,6]</code>.\r\n</p>\r\n\r\n<p>\r\n<b>Follow up:</b><br>\r\nAs an added challenge, try to code it using only <a href=\"http://www.cplusplus.com/reference/iterator/iterator/\" target=\"_blank\">iterators in C++</a> or <a href=\"http://docs.oracle.com/javase/7/docs/api/java/util/Iterator.html\" target=\"_blank\">iterators in Java</a>.\r\n</p>",
	"frequency":"280",
	"ac_num":"33486"
}