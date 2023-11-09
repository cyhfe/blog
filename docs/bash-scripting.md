# bash scripting

## alias

alias 持久化

```bash
# ~/.zshrc
alias c="clear"
```

## the bash shebang

shebang 是一种特殊的注释语法，通常用于指定脚本文件的解释器。

```bash
#!/bin/bash
#!/bin/node
```

## environment variables

系统变量对整个操作系统和所有用户都是可见的，而 Shell 变量仅对当前的 shell 会话或者脚本执行环境可见。

`set`, `env`, `printenv`

```bash
export abc="123"

abc=123
```

## user input

```bash
read age
18
echo  $age
```

## positional parameters

```bash
./myscript.sh arg1 arg2 arg3

```

在这个例子中：

$0 是脚本的名称（myscript.sh）。
$1 是第一个位置参数（arg1）。
$2 是第二个位置参数（arg2）。
$3 是第三个位置参数（arg3）。
