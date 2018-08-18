{
	"difficulty":"2",
	"submit_num":"28983",
	"show_id":"194",
	"leetcode_id":"194",
	"answers":[
		{
			"lc_ans_id":"55502",
			"view":"7772",
			"top":"0",
			"title":"AC solution using awk and statement just like C.",
			"vote":"39",
			"content":"Just feel free to use `for` and `if`.  \\nYou can append string easily, for example, `s = s a` to append `a` with `s`. \\n\\n\\n    awk '\\n    {\\n        for (i = 1; i <= NF; i++) {\\n            if(NR == 1) {\\n                s[i] = $i;\\n            } else {\\n                s[i] = s[i] \" \" $i;\\n            }\\n        }\\n    }\\n    END {\\n        for (i = 1; s[i] != \"\"; i++) {\\n            print s[i];\\n        }\\n    }' file.txt"
		},
		{
			"lc_ans_id":"55501",
			"view":"5275",
			"top":"1",
			"title":"Simple BASH solution that OJ hates",
			"vote":"15",
			"content":"My solution in BASH. It works fine on my computer and I think it's conceptually straightforward. OJ complains exceeding memory.\\n\\n    ncol=`head -n1 file.txt | wc -w`\\n    \\n    for i in `seq 1 $ncol`\\n    do\\n        echo `cut -d' ' -f$i file.txt`\\n    done"
		},
		{
			"lc_ans_id":"55514",
			"view":"2946",
			"top":"2",
			"title":"My 28ms awk solution",
			"vote":"8",
			"content":"    # Read from the file file.txt and print its transposed content to stdout.\\n    \\n    # using awk for this purpose\\n    awk '\\n        {\\n            for(i=1; i<=NF; i++)\\n            {   \\n                if(line[i] == \"\")\\n                {\\n                    line[i] = $i\\n                }\\n                else\\n                {\\n                    line[i] = line[i]\" \"$i\\n                }\\n            }\\n        }\\n        END{\\n             for(i=1; i<=NF; i++)\\n             {\\n                 print line[i]\\n             }\\n           }\\n        ' file.txt"
		},
		{
			"lc_ans_id":"55524",
			"view":"2046",
			"top":"3",
			"title":"Building matrix with awk",
			"vote":"5",
			"content":"\\nI had to use \\n\\n - NF!=0 to remove any blank lines and  save rows and \\n - cols=NF to be used in END{} block.\\n\\n    awk 'NF!=0 {for(c=1;c<=NF;c++) mtx[NR,c]=$c; rows++; cols=NF;} END{for(c=1;c<=cols;c++) { line=mtx[1,c]; for(r=2;r<=rows;r++) { line=line\" \"mtx[r,c]}; print line; }}' file.txt"
		},
		{
			"lc_ans_id":"55520",
			"view":"1447",
			"top":"4",
			"title":"Simple solution with awk",
			"vote":"4",
			"content":"Simple solution with awk using associative array\\n\\nawk '{ for(i=1; i<=NF; ++i) {if (word[i] == \"\") {word[i] = $i} else{word[i] = word[i]\" \"$i}}} END{for(i=1; i<=NF; ++i) {print word[i]}}' file.txt"
		},
		{
			"lc_ans_id":"55511",
			"view":"2267",
			"top":"5",
			"title":"Memory Limit Exceeded",
			"vote":"4",
			"content":"    # Read from the file file.txt and print its transposed content to stdout.\\n    A=$(head -1 file.txt | tr ' ' '\\\\n' | wc -l)\\n    COUNTER=1\\n    while [  $COUNTER -le $A ]; do\\n    \\tawk -v temp=$COUNTER '{ printf(\"%s \", $temp) }' file.txt\\n    \\techo \"\"\\n    \\tlet COUNTER=COUNTER+1 \\n    done"
		},
		{
			"lc_ans_id":"55512",
			"view":"1323",
			"top":"6",
			"title":"Solution using associative array - Transpose File",
			"vote":"2",
			"content":"    # Read from the file file.txt and print its transposed content to stdout.\\n    #!/bin/bash\\n    \\n    declare -A matrix\\n    col=1\\n    row=1\\n    \\n    while read line; do\\n        col=1\\n        for word in $line; do\\n                matrix[$row,$col]=$word\\n                ((col++))\\n        done\\n        ((row++))\\n    done < file.txt\\n    \\n    for ((i=1;i<col;i++)) do\\n        echo -n ${matrix[1,$i]} \\n        for((j=2;j<row;j++)) do\\n                echo -n ' '${matrix[$j,$i]}\\n        done\\n        echo\\n    done"
		},
		{
			"lc_ans_id":"55528",
			"view":"433",
			"top":"7",
			"title":"Anyone has solutions with LESS THAN O(n*n) space?",
			"vote":"2",
			"content":"Is O(n) or O(nlogn) space can solve this problem?  \\n\\nI have a idea:  \\n**Record the \"current position\" of every line and loop.**  \\n\\nBut I don't know how to implement it.  \\n\\nIs there an implement or other ideas?"
		},
		{
			"lc_ans_id":"55510",
			"view":"743",
			"top":"8",
			"title":"bash, sort, no array/matrix",
			"vote":"1",
			"content":"I print the words with coordinates `i` and `j`, then sort by `j` and `i`, then print in that order.\\n\\nInput:\\n```\\nname age\\nalice 21\\nryan 30\\n```\\nThe words with coordinates:\\n```\\n1 1 name\\n1 2 age\\n2 1 alice\\n2 2 21\\n3 1 ryan\\n3 2 30\\n```\\nSorted by `j` and `i`:\\n```\\n1 1 name\\n2 1 alice\\n3 1 ryan\\n1 2 age\\n2 2 21\\n3 2 30\\n```\\nFinal output:\\n```\\nname alice ryan\\nage 21 30\\n```\\nThe code:\\n```\\nm=`wc -l file.txt | cut -d' ' -f1`\\ni=0\\nwhile read line\\ndo\\n    let i++\\n    j=0\\n    for a in $line\\n    do\\n        let j++\\n        echo $i $j $a\\n    done\\ndone < file.txt | sort -n -k2 -k1 | while read i j a\\ndo\\n    if [ \"$i\" == \"$m\" ]\\n    then\\n        echo $a\\n    else\\n        echo -n \"$a \"\\n    fi\\ndone\\n```\\nIt's very slow, though, takes about 750 ms."
		},
		{
			"lc_ans_id":"55515",
			"view":"505",
			"top":"9",
			"title":"My 24ms unreadable solution",
			"vote":"1",
			"content":"    #! /bin/bash\\n    export LC_ALL=C\\n    col_num=$(awk -F' ' 'NR==1{print NF}' file.txt)\\n    awk -F' ' -v n_col=$col_num 'BEGIN{for(i=1;i<=n_col;++i) line[i]=\"\"}{for(i=1;i<=NF;++i){line[i]=sprintf(\"%s %s\", line[i], $i)}}END{for(i=1;i<=n_col;++i) print line[i]}'  file.txt | sed \"s;^ ;;g\""
		}
	],
	"id":"194",
	"title":"Transpose File",
	"content":"<p>Given a text file <code>file.txt</code>, transpose its content.</p>\r\n\r\n<p>You may assume that each row has the same number of columns and each field is separated by the <code>' '</code> character.</p>\r\n\r\n<p>\r\nFor example, if <code>file.txt</code> has the following content:\r\n<pre>\r\nname age\r\nalice 21\r\nryan 30\r\n</pre>\r\n</p>\r\n\r\n<p>\r\nOutput the following:\r\n<pre>\r\nname alice ryan\r\nage 21 30\r\n</pre>\r\n</p>",
	"frequency":"571",
	"ac_num":"6213"
}