{
	"difficulty":"1",
	"submit_num":"56497",
	"show_id":"193",
	"leetcode_id":"193",
	"answers":[
		{
			"lc_ans_id":"55481",
			"view":"13946",
			"top":"0",
			"title":"Three different solutions using grep, sed, and awk",
			"vote":"50",
			"content":"Using `grep`:\\n\\n    grep -P '^(\\\\d{3}-|\\\\(\\\\d{3}\\\\) )\\\\d{3}-\\\\d{4}$' file.txt\\n\\nUsing `sed`:\\n\\n    sed -n -r '/^([0-9]{3}-|\\\\([0-9]{3}\\\\) )[0-9]{3}-[0-9]{4}$/p' file.txt\\n\\nUsing `awk`:\\n\\n    awk '/^([0-9]{3}-|\\\\([0-9]{3}\\\\) )[0-9]{3}-[0-9]{4}$/' file.txt"
		},
		{
			"lc_ans_id":"55478",
			"view":"2692",
			"top":"1",
			"title":"Grep -e solution with detailed explanation, good for those new to regex",
			"vote":"26",
			"content":"    grep -e '\\\\(^[0-9]\\\\{3\\\\}-[0-9]\\\\{3\\\\}-[0-9]\\\\{4\\\\}$\\\\)' -e '\\\\(^([0-9]\\\\{3\\\\})[ ]\\\\{1\\\\}[0-9]\\\\{3\\\\}-\\\\([0-9]\\\\{4\\\\}\\\\)$\\\\)'  file.txt\\n\\n1. In Bash, we use `\\\\` to escape next one trailing character;\\n2. `^` is used to denote the beginning of a line\\n3. `$` is used to denote the end of a line\\n4. `{M}` is used to denote to match exactly `M` times of the previous occurence/regex\\n5. `(...)` is used to group pattern/regex together\\n\\nBack to this problem: it requires us to match two patterns, for better readability, I used -e and separate the two patterns into two regexes, the first one matches this case: `xxx-xxx-xxxx` and the second one matches this case: `(xxx) xxx-xxxx`\\n\\nPlease vote this post up if you find it helpful for your understanding!\\n\\nCheers!"
		},
		{
			"lc_ans_id":"55492",
			"view":"2755",
			"top":"2",
			"title":"My \"grep -E\" solution",
			"vote":"3",
			"content":"    # Read from the file file.txt and output all valid phone numbers to stdout.\\n    \\n    # use grep -P\\n    grep -P '^\\\\([0-9]{3}\\\\)\\\\s[0-9]{3}-[0-9]{4}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$' file.txt"
		},
		{
			"lc_ans_id":"55474",
			"view":"328",
			"top":"3",
			"title":"Simple solution using awk",
			"vote":"2",
			"content":"```\\nawk '/^(\\\\([0-9]{3}\\\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/' file.txt\\n```"
		},
		{
			"lc_ans_id":"55485",
			"view":"953",
			"top":"4",
			"title":"Memory Limit Exceeded,why?",
			"vote":"1",
			"content":"awk '/^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$|^\\\\([0-9][0-9][0-9]\\\\) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/' file.txt"
		},
		{
			"lc_ans_id":"55475",
			"view":"76",
			"top":"5",
			"title":"my solution",
			"vote":"0",
			"content":"here is my solution\\n\\n```\\ncat file.txt |grep -e \"^[0-9]\\\\{3\\\\}-[0-9]\\\\{3\\\\}-[0-9]\\\\{4\\\\}$\" -e \"^([0-9]\\\\{3\\\\}) [0-9]\\\\{3\\\\}-[0-9]\\\\{4\\\\}$\"\\n```"
		},
		{
			"lc_ans_id":"55476",
			"view":"80",
			"top":"6",
			"title":"Use grep -P",
			"vote":"0",
			"content":"grep -P '^([0-9]{3}-|\\\\([0-9]{3}\\\\) )[0-9]{3}-[0-9]{4}$' file.txt"
		},
		{
			"lc_ans_id":"55477",
			"view":"100",
			"top":"7",
			"title":"whereis wrong with my pattern? ask for help",
			"vote":"0",
			"content":"my grep solution, the code is like:\\n```\\ngrep \"\\\\(?\\\\d{3}\\\\)?[- ]\\\\d{3}-\\\\d{4}\" file.txt\\n```\\nbut when it came across test case \"123-456-7891\", it didn't print out anything. could someone tell me why please?\\nYet I put test case \"123-456-7891\" into a file, and open it with notepad++ on windows, using the same pattern to find matched lines, and it worked! That really makes me confused"
		},
		{
			"lc_ans_id":"55479",
			"view":"109",
			"top":"8",
			"title":"My grep -w solution",
			"vote":"0",
			"content":"```\\ncat file.txt | grep -w '^[[:digit:]]\\\\{3\\\\}-[[:digit:]]\\\\{3\\\\}-[[:digit:]]\\\\{4\\\\}$\\\\|^([[:digit:]]\\\\{3\\\\}) [[:digit:]]\\\\{3\\\\}-[[:digit:]]\\\\{4\\\\}$'\\n```"
		},
		{
			"lc_ans_id":"55480",
			"view":"78",
			"top":"9",
			"title":"Does leetcode not support grep -E option?",
			"vote":"0",
			"content":"\\nI run the following shell script in Mac and the result is OK. But it output nothing when tested by leetcode.......\\n$ grep -o -E '(\\\\\\\\(\\\\d{3}\\\\\\\\) |\\\\d{3}-)\\\\d{3}-\\\\d{4}' file.txt"
		}
	],
	"id":"193",
	"title":"Valid Phone Numbers",
	"content":"<p>Given a text file <code>file.txt</code> that contains list of phone numbers (one per line), write a one liner bash script to print all valid phone numbers.</p>\r\n\r\n<p>You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)</p>\r\n\r\n<p>You may also assume each line in the text file must not contain leading or trailing white spaces.</p>\r\n\r\n<p>For example, assume that <code>file.txt</code> has the following content:</p>\r\n<pre>\r\n987-123-4567\r\n123 456 7890\r\n(123) 456-7890\r\n</pre>\r\n\r\nYour script should output the following valid phone numbers:\r\n<pre>\r\n987-123-4567\r\n(123) 456-7890\r\n</pre>",
	"frequency":"575",
	"ac_num":"14012"
}