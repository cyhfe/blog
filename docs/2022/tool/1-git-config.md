---
sidebar_position: 1
---

# github, gitlab 同电脑多账号配置

## SSH 配置

创建 2 个 SSH 秘钥/公钥对
具体参考 [github doc](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/about-ssh)

配置不同host时使用不同的ssh.


```text title="~/.ssh/config"

Host github.com
	HostName github.com
	User git
	IdentityFile ~/.ssh/github
	IdentitiesOnly=yes
  AddKeysToAgent=yes

Host gitlab.com
	Hostname gitlab.com
	User git
	IdentityFile ~/.ssh/id_ed25519
	IdentitiesOnly=yes
  AddKeysToAgent=yes
  
```

## username, email 配置

[git-pro](https://git-scm.com/docs/git-config#_conditional_includes)

[https://gist.github.com/bgauduch/06a8c4ec2fec8fef6354afe94358c89e](https://gist.github.com/bgauduch/06a8c4ec2fec8fef6354afe94358c89e)

```text title="~/.gitconfig"
[includeIf "gitdir:~/work/"]
	path = ~/.gitconfig-work

[includeIf "gitdir:~/personal/"]
	path = ~/.gitconfig-personal
```

```text title="~/.gitconfig-personal"
[user]
	name = chenyuhao
	email = chenyuhao@gmail.com
```


