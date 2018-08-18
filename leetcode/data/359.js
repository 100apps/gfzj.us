{
	"difficulty":"1",
	"submit_num":"37905",
	"show_id":"359",
	"leetcode_id":"359",
	"answers":[
		{
			"lc_ans_id":"83273",
			"view":"11663",
			"top":"0",
			"title":"Short C++/Java/Python, bit different",
			"vote":"48",
			"content":"Instead of logging print times, I store when it's ok for a message to be printed again. Should be slightly faster, because I don't always have to add or subtract (e.g., `timestamp < log[message] + 10`) but only do in the `true` case. Also, it leads to a shorter/simpler longest line of code. Finally, C++ has 0 as default, so I can just use `ok[message]`.\\n\\n---\\n\\n**C++**\\n\\n    class Logger {\\n    public:\\n    \\n        map<string, int> ok;\\n\\n        bool shouldPrintMessage(int timestamp, string message) {\\n            if (timestamp < ok[message])\\n                return false;\\n            ok[message] = timestamp + 10;\\n            return true;\\n        }\\n    };\\n\\n---\\n\\n**Python**\\n\\n    class Logger(object):\\n    \\n        def __init__(self):\\n            self.ok = {}\\n    \\n        def shouldPrintMessage(self, timestamp, message):\\n            if timestamp < self.ok.get(message, 0):\\n                return False\\n            self.ok[message] = timestamp + 10\\n            return True\\n\\n---\\n\\n**Java**\\n\\n    public class Logger {\\n    \\n        private Map<String, Integer> ok = new HashMap<>();\\n    \\n        public boolean shouldPrintMessage(int timestamp, String message) {\\n            if (timestamp < ok.getOrDefault(message, 0))\\n                return false;\\n            ok.put(message, timestamp + 10);\\n            return true;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83284",
			"view":"4413",
			"top":"1",
			"title":"A solution that only keeps part of the messages",
			"vote":"24",
			"content":"A typical (accepted) solution is to keep a hash map of String that maps to the recent time stamp.\\nBut this way, it needs to keep the record of the entire messages, even when the message is rare.\\n\\nAlternatively, I keep a heap to get rid of the old message and set of String to keep the recent messages only. This approach would make sense when the number of logs within 10 minutes time window is not too large and when we have lots of different messages.\\n\\n    class Log {\\n        int timestamp;\\n        String message;\\n        public Log(int aTimestamp, String aMessage) {\\n            timestamp = aTimestamp;\\n            message = aMessage;\\n        }\\n    }\\n    \\n    public class Logger {\\n        PriorityQueue<Log> recentLogs;\\n        Set<String> recentMessages;   \\n        \\n        /** Initialize your data structure here. */\\n        public Logger() {\\n            recentLogs = new PriorityQueue<Log>(10, new Comparator<Log>() {\\n                public int compare(Log l1, Log l2) {\\n                    return l1.timestamp - l2.timestamp;\\n                }\\n            });\\n            \\n            recentMessages = new HashSet<String>();\\n        }\\n        \\n        /** Returns true if the message should be printed in the given timestamp, otherwise returns false.\\n            If this method returns false, the message will not be printed.\\n            The timestamp is in seconds granularity. */\\n        public boolean shouldPrintMessage(int timestamp, String message) {\\n            while (recentLogs.size() > 0)   {\\n                Log log = recentLogs.peek();\\n                // discard the logs older than 10 minutes\\n                if (timestamp - log.timestamp >= 10) {\\n                    recentLogs.poll();\\n                    recentMessages.remove(log.message);\\n                } else \\n                \\tbreak;\\n            }\\n            boolean res = !recentMessages.contains(message);\\n            if (res) {\\n                recentLogs.add(new Log(timestamp, message));\\n                recentMessages.add(message);\\n            }\\n            return res;\\n        }\\n    }\\n    /**\\n     * Your Logger object will be instantiated and called as such:\\n     * Logger obj = new Logger();\\n     * boolean param_1 = obj.shouldPrintMessage(timestamp,message);\\n     */"
		},
		{
			"lc_ans_id":"83270",
			"view":"4124",
			"top":"2",
			"title":"A Java Solution",
			"vote":"12",
			"content":"     public class Logger {\\n    HashMap<String,Integer> map;\\n    /** Initialize your data structure here. */\\n    public Logger() {\\n        map=new HashMap<>();\\n    }\\n    \\n    /** Returns true if the message should be printed in the given timestamp, otherwise returns false. The timestamp is in seconds granularity. */\\n    public boolean shouldPrintMessage(int timestamp, String message) {\\n    //update timestamp of the message if the message is coming in for the first time,or the last coming time is earlier than 10 seconds from now\\n        if(!map.containsKey(message)||timestamp-map.get(message)>=10){\\n            map.put(message,timestamp);\\n            return true;\\n        }\\n        return false;\\n    }\\n}"
		},
		{
			"lc_ans_id":"83254",
			"view":"1050",
			"top":"3",
			"title":"Java, with a LinkedHashMap and using removeEldestEntry",
			"vote":"10",
			"content":"    public class Logger {\\n    \\n        public Map<String, Integer> map;\\n        int lastSecond = 0;\\n        \\n        /** Initialize your data structure here. */\\n        public Logger() {\\n            map = new java.util.LinkedHashMap<String, Integer>(100, 0.6f, true) {\\n                protected boolean removeEldestEntry(Map.Entry<String, Integer> eldest) {\\n                    return lastSecond - eldest.getValue() > 10;\\n                }\\n            };\\n        }\\n        \\n        /** Returns true if the message should be printed in the given timestamp, otherwise returns false.\\n            If this method returns false, the message will not be printed.\\n            The timestamp is in seconds granularity. */\\n        public boolean shouldPrintMessage(int timestamp, String message) {\\n            lastSecond = timestamp;\\n            if(!map.containsKey(message)||timestamp - map.get(message) >= 10){\\n                map.put(message,timestamp);\\n                return true;\\n            }\\n            return false;\\n        }\\n    }"
		},
		{
			"lc_ans_id":"83300",
			"view":"1954",
			"top":"4",
			"title":"Java ConcurrentHashMap solution",
			"vote":"5",
			"content":"    import java.util.concurrent.*;\\n    \\n    public class Logger {\\n        ConcurrentHashMap<String, Integer> lastPrintTime;\\n    \\n        /** Initialize your data structure here. */\\n        public Logger() {\\n            lastPrintTime = new ConcurrentHashMap<String, Integer>();\\n        }\\n        \\n        /** Returns true if the message should be printed in the given timestamp, otherwise returns false. The timestamp is in seconds granularity. */\\n        public boolean shouldPrintMessage(int timestamp, String message) {\\n    \\t\\tInteger last = lastPrintTime.get(message);\\n    \\n    \\t\\treturn last == null && lastPrintTime.putIfAbsent(message, timestamp) == null\\n    \\t\\t\\t\\t|| last != null && timestamp - last >= 10 && lastPrintTime.replace(message, last, timestamp);\\n    \\n        }\\n    }"
		},
		{
			"lc_ans_id":"83293",
			"view":"785",
			"top":"5",
			"title":"Java: Beats 99.55%",
			"vote":"3",
			"content":"```\\npublic class Logger {\\n    private Map<String, Integer> map;\\n    \\n    public Logger() {\\n        map = new HashMap<>();\\n    }\\n    \\n    public boolean shouldPrintMessage(int timestamp, String message) {\\n        if(map.containsKey(message) && timestamp - map.get(message) < 10) \\n            return false;\\n        map.put(message, timestamp);\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"83294",
			"view":"498",
			"top":"6",
			"title":"Straight forward Python solution",
			"vote":"3",
			"content":"```\\n\\nclass Logger(object):\\n\\n    def __init__(self):\\n        \"\"\"\\n        Initialize your data structure here.\\n        \"\"\"\\n        self._d = {}\\n\\n    def shouldPrintMessage(self, timestamp, message):\\n        \"\"\"\\n        Returns true if the message should be printed in the given timestamp, otherwise returns false.\\n        If this method returns false, the message will not be printed.\\n        The timestamp is in seconds granularity.\\n        :type timestamp: int\\n        :type message: str\\n        :rtype: bool\\n        \"\"\"\\n\\n        if message in self._d and timestamp - self._d[message] < 10:\\n            return False\\n        else:\\n            self._d[message] = timestamp\\n            return True\\n```"
		},
		{
			"lc_ans_id":"83303",
			"view":"1838",
			"top":"7",
			"title":"Super easy Java HashMap solution",
			"vote":"3",
			"content":"Suggestions are welcome!\\n\\n    private Map<String, Integer> map;\\n    \\n    /** Initialize your data structure here. */\\n    public Logger() {\\n        map = new HashMap<>();\\n    }\\n    \\n    /** Returns true if the message should be printed in the given timestamp, otherwise returns false. The timestamp is in seconds granularity. */\\n    public boolean shouldPrintMessage(int timestamp, String message) {\\n        if (map.containsKey(message) && (timestamp - map.get(message)) < 10) {\\n            return false;\\n        } \\n        map.put(message, timestamp);\\n        return true;\\n    }"
		},
		{
			"lc_ans_id":"83256",
			"view":"331",
			"top":"8",
			"title":"Java Circular Buffer  Solution, similar to Hit Counter",
			"vote":"2",
			"content":"We only need to store past 10s informtion\\n```\\npublic class Logger {\\n    private int[] buckets;\\n    private Set[] sets;\\n    /** Initialize your data structure here. */\\n    public Logger() {\\n        buckets = new int[10];\\n        sets = new Set[10];\\n        for (int i = 0; i < sets.length; ++i) {\\n            sets[i] = new HashSet<String>();\\n        }\\n    }\\n    \\n    /** Returns true if the message should be printed in the given timestamp, otherwise returns false.\\n        If this method returns false, the message will not be printed.\\n        The timestamp is in seconds granularity. */\\n    public boolean shouldPrintMessage(int timestamp, String message) {\\n        int idx = timestamp % 10;\\n        if (timestamp != buckets[idx]) {\\n            sets[idx].clear();\\n            buckets[idx] = timestamp;\\n        }\\n        for (int i = 0; i < buckets.length; ++i) {\\n            if (timestamp - buckets[i] < 10) {\\n                if (sets[i].contains(message)) {\\n                    return false;\\n                }\\n            }\\n        } \\n        sets[idx].add(message);\\n        return true;\\n    }\\n}\\n```"
		},
		{
			"lc_ans_id":"83259",
			"view":"384",
			"top":"9",
			"title":"C++ solution that controls HashMap size",
			"vote":"2",
			"content":"```\\nclass Logger {\\npublic:\\n    /** Initialize your data structure here. */\\n    Logger() {\\n        \\n    }\\n    \\n    /** Returns true if the message should be printed in the given timestamp, otherwise returns false.\\n        If this method returns false, the message will not be printed.\\n        The timestamp is in seconds granularity. */\\n    bool shouldPrintMessage(int timestamp, string message) {\\n        \\n\\t// Remove messages that are older than 10s than the passed-in timestamp\\n\\tfor (auto i = myMap.begin(); i != myMap.end();)\\n\\t{\\n\\t\\tauto temp = i; \\n\\t\\ti++;\\n\\n\\t\\tif (temp->second <= timestamp - 10)\\n\\t\\t{\\n\\t\\t\\tmyMap.erase(temp);\\n\\t\\t}\\n\\t}\\n       \\n        if (myMap.find(message) == myMap.end())\\n        {\\n            myMap[message] = timestamp;\\n            return true;\\n        }\\n        \\n        return false;\\n    }\\n    \\nprivate:\\n\\n    unordered_map<string, int> myMap;\\n};\\n```"
		}
	],
	"id":"359",
	"title":"Logger Rate Limiter",
	"content":"<p>Design a logger system that receive stream of messages along with its timestamps, each message should be printed if and only if it is <b>not printed in the last 10 seconds</b>.</p>\r\n\r\n<p>Given a message and a timestamp (in seconds granularity), return true if the message should be printed in the given timestamp, otherwise returns false.</p>\r\n\r\n<p>It is possible that several messages arrive roughly at the same time.</p>\r\n\r\n<p><b>Example:</b>\r\n<pre>\r\nLogger logger = new Logger();\r\n\r\n// logging string \"foo\" at timestamp 1\r\nlogger.shouldPrintMessage(1, \"foo\"); returns true; \r\n\r\n// logging string \"bar\" at timestamp 2\r\nlogger.shouldPrintMessage(2,\"bar\"); returns true;\r\n\r\n// logging string \"foo\" at timestamp 3\r\nlogger.shouldPrintMessage(3,\"foo\"); returns false;\r\n\r\n// logging string \"bar\" at timestamp 8\r\nlogger.shouldPrintMessage(8,\"bar\"); returns false;\r\n\r\n// logging string \"foo\" at timestamp 10\r\nlogger.shouldPrintMessage(10,\"foo\"); returns false;\r\n\r\n// logging string \"foo\" at timestamp 11\r\nlogger.shouldPrintMessage(11,\"foo\"); returns true;\r\n</pre>\r\n</p>\r\n\r\n<p><b>Credits:</b><br />Special thanks to <a href=\"https://discuss.leetcode.com/user/memoryless\">@memoryless</a> for adding this problem and creating all test cases.</p>",
	"frequency":"143",
	"ac_num":"22938"
}