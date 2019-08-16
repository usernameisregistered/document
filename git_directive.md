### 创建
> git clone ssh://user@domain.com/repo.git  克隆一个已存在的项目

> git init  初始化一个项目

### 本地修改
> git status 查看工作去的文件变化

> git diff 比较跟踪的文件变化

> git add . 将所有修改的文件添加暂存区

> git commit -m -a 将所有的本地变化提交到工作区

> git commit --amend 修改最后一次提交的注释


### 提交历史
> git log 查看所有的提交记录

> git log -p <file> 表示每次提交的内容差异
  
> git blame <file> 查看文件的每个部分是谁修改的
  

### 分支和标签
> git branch 列出所有的分支

> git checkout <branchname> 切换到分支
  
> git branch <branchname> 创建分支
  
> git checkout -d <branchname> 删除本地分支
  
> git tag <tagname> 创建标签

### 更新和publish
> git remote -v 列出所有的远程网址

> git remote show <remote> 显示某个remote的详细信息
  
> git remote add <shortname> <url> 添加远程网址
  
> git fetch <remote> 下载所有更改，但不合并
  
> git pull <remote> <branch> 下载所有并合并
  
> git push <remote> <branch> 推送变化到远程
  
> git branch -dr <remote/branch> 删除远程分支

> git push -tags 推送所有的标签

### 合并
> git merge <branch> 合并分支
  
> git rm <file> 删除文件
  
> git add <file> 添加文件

### 回退
> git reset --hard HEAD 回退到指定的版本

> git checkout HEAD <file> 丢弃特定版本文件中的本地更改
  
> git revert <commitid> 回退到某个提交的记录
  
> git reflog 查看回退的历史记录
