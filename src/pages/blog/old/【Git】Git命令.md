---
layout: ../../../layouts/BlogPost.astro
title: "【Git】Git命令"
uuid: bd67c708-4897-11ed-a53e-e64c03c09981
version: 3
created: Sun, 13 Jun 2021 14:40:49 +0000
tags:
- imported/evernote
---

git add <file>    添加\
git init    初始化\
git commit -m <message>    提交\
git status    状态\
git diff <file>    工作区(work dict)和暂存区(stage)的比较\
git diff --cached <file>    暂存区(stage)和分支(master)的比较\
git reset HEAD <file>    把暂存区的修改撤销掉（unstage），重新放回工作区\
git commit --amend    修改最后一次提交的内容，可以仅修改message，也可以添加新的文件（按正常步骤add，然后输入该命令提交）\
head    指向的版本就是当前版本\
git reset --hard commit_id    回到某历史版本\
git log    查看提交历史，以便确定要回退到哪个版本\
git reflog    查看命令历史，以便确定要回到未来的哪个版本\
git remote add origin git@server-name:path/repo-name.git    关联一个远程库\
git remote -v    查看远程库信息\
git remote rm origin    删除已有的GitHub远程库\
git remote rename origin mine    重命名origin为mine\
git push -u origin master    第一次推送master分支的所有内容\
git push origin master    推送最新修改\
git branch dev    创建dev分支\
git checkout -b dev    创建并切换一个新分支dev\
git branch    查看当前分支\
git checkout dev    切换到dev\
git merge dev    合并dev分支到当前分支\
git branch -d dev    删除dev分支,如果有未提交的内容， 需要用-D强制删除\
git log --graph    分支合并图\
git merge --no-ff -m "merge with no-ff" dev    禁用Fast forward，然后合并\
git stash    存储当天工作现场，等以后恢复现场后继续工作\
git stash list    \
git stash apply    恢复存储的工作现场\
git stash drop    删除存储的工作现场\
git stash pop    恢复的同时并删除\
git pull origin master    从远程origin抓取最新的分支master的commit，并合并master和origin/master分支\
git fetch origin master    origin/master分支和远程同步，但master分支不动，可自行merge合并（主要用在，本地和远程都有各自的新commit，这种情况下，无法pull，所以要先fetch，然后merge合并修改，最后把本地最新 版本push到远程）\
git branch -b dev origin/dev    在本地创建和远程分支对应的分支\
git branch --set-upstream-to=origin/dev  dev    把本地dev和远程dev链接\
git rebase    把本地未push的分叉提交历史整理成直线\
git tag v1.0    为当前分支的commit打标签"v1.0"\
git tag    查看所有标签\
git log --pretty=oneline --abbrev-commit    历史提交的commit id\
git tag v0.9 f52c634    为commit id为f52c634打标签v0.9\
git show v0.9    查看标签信息\
git tag -a v0.1 -m "version 0.1 released" 1094adb    添加标签说明\
git tag -d v0.1    删除标签\
git push origin v0.1    推送标签到远程\
git push origin --tags    推送所有标签到远程\
git push origin :refs/tags/v0.9    删除远程标签\
git revert 2724e05    撤销该commit的修改，并创建新的commit，记录该还原\
git reflog    查看所有记录日志\
git reset HEAD    ~--mixed（默认参数） 将HEAD~的commit（最新的提交）恢复到工作区--soft  恢复到暂存区--hard  删除更改^ – 表示父 commit\~ – 表示第一个父 commit\
git shortlog    每位贡献者在此仓库中添加了多少 commit , -s 仅显示数量-n 按数量排序\
多人协作的工作模式通常是这样：

1. 首先，可以试图用git push origin <branch-name>推送自己的修改；

1. 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；

1. 如果合并有冲突，则解决冲突，并在本地提交；

1. 没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！\
如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。\
这就是多人协作的工作模式，一旦熟悉了，就非常简单