@echo off

echo 正在部署到Vercel...

REM 检查Vercel CLI是否已安装
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo Vercel CLI未安装，请先执行 npm install -g vercel 进行安装。
    exit /b 1
)

REM 登录Vercel（首次需要邮箱验证码）
vercel login

REM 从frontend目录部署到生产环境，自动确认默认选项
vercel --cwd frontend --prod --yes

echo.
echo 部署完成！