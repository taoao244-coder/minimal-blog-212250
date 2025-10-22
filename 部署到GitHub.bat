@echo off
chcp 65001 >nul
echo ================================
echo     GitHub Pages 部署脚本
echo ================================
echo.

echo 正在检查Git状态...
git status

echo.
echo 正在推送代码到GitHub...
echo 注意：如果是首次推送，可能需要输入GitHub用户名和密码
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ================================
    echo     推送成功！
    echo ================================
    echo.
    echo 接下来请手动完成以下步骤：
    echo.
    echo 1. 访问: https://github.com/taoao244-coder/minimal-blog-212250
    echo 2. 点击 Settings 选项卡
    echo 3. 在左侧菜单中找到 Pages
    echo 4. 在 Source 下拉菜单中选择 "GitHub Actions"
    echo 5. 保存设置
    echo.
    echo 部署完成后，您的网站将在以下地址可用：
    echo https://taoao244-coder.github.io/minimal-blog-212250/
    echo.
    echo 注意：首次部署可能需要几分钟时间
) else (
    echo.
    echo ================================
    echo     推送失败！
    echo ================================
    echo.
    echo 可能的原因：
    echo 1. GitHub仓库尚未创建
    echo 2. 需要GitHub认证
    echo 3. 网络连接问题
    echo.
    echo 请先在GitHub上创建仓库：
    echo https://github.com/new
    echo 仓库名：minimal-blog-212250
)

echo.
pause